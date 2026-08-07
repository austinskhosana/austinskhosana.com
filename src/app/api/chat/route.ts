import Groq from "groq-sdk";
import { projects } from "@/lib/data";

let client: Groq | undefined;

function getClient(): Groq {
  client ??= new Groq();
  return client;
}

const MODEL = "openai/gpt-oss-120b";
const MAX_QUESTION_LENGTH = 300;
const MAX_ANSWER_LENGTH = 2000;
const MAX_HISTORY_TURNS = 6;
const MAX_OUTPUT_TOKENS = 400;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 6;

const rateLimitBuckets = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitBuckets.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitBuckets.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  rateLimitBuckets.set(ip, timestamps);
  return false;
}

const SYSTEM_PROMPT = `You are answering questions on Austin Skhosana's personal portfolio website, in the voice of an "AI version" of Austin himself — first person, casual, direct.

About Austin:
- Designer and developer based in Johannesburg, South Africa.
- His practice bridges high-fidelity design and frontend code prototypes — he cares more about developer experience than conventional design talking points.
- Focuses on cross-functional collaboration and the material software actually ships in.
- Recent projects: ${projects.map((p) => `${p.title} (${p.description})`).join("; ")}.

Rules:
- Answer as Austin, in first person. Keep it conversational and concise — a few sentences, not an essay.
- If asked something you don't know about Austin specifically, say so honestly rather than making it up.
- This is a portfolio website widget, not a general assistant — steer off-topic requests (coding help unrelated to Austin, unrelated tasks) back to questions about Austin, his work, or his background.
- Never claim to be a real person outside this context, and don't pretend to take real-world actions.`;

type HistoryTurn = { question: string; answer: string };

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && !origin.endsWith(host)) {
    return new Response("Forbidden", { status: 403 });
  }

  if (isRateLimited(ip)) {
    return new Response(
      "slow down a little — try again in a minute.",
      { status: 429 },
    );
  }

  let body: { question?: unknown; history?: unknown };
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid request", { status: 400 });
  }

  const question =
    typeof body.question === "string" ? body.question.trim() : "";
  if (!question || question.length > MAX_QUESTION_LENGTH) {
    return new Response("Invalid question", { status: 400 });
  }

  const history: HistoryTurn[] = Array.isArray(body.history)
    ? body.history
        .filter(
          (t): t is HistoryTurn =>
            typeof t === "object" &&
            t !== null &&
            typeof (t as HistoryTurn).question === "string" &&
            typeof (t as HistoryTurn).answer === "string",
        )
        .slice(-MAX_HISTORY_TURNS)
    : [];

  const messages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.flatMap(
      (turn): Groq.Chat.Completions.ChatCompletionMessageParam[] => [
        {
          role: "user",
          content: turn.question.slice(0, MAX_QUESTION_LENGTH),
        },
        {
          role: "assistant",
          content: turn.answer.slice(0, MAX_ANSWER_LENGTH),
        },
      ],
    ),
    { role: "user", content: question },
  ];

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const completion = await getClient().chat.completions.create({
          model: MODEL,
          max_tokens: MAX_OUTPUT_TOKENS,
          stream: true,
          messages,
        });
        for await (const chunk of completion) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) controller.enqueue(encoder.encode(delta));
        }
      } catch {
        controller.enqueue(
          encoder.encode("something went wrong on my end — try again."),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
