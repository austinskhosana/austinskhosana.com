import Groq from "groq-sdk";
import { projects, blogPosts } from "@/lib/data";

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

// Full post bodies, not just excerpts — they're short enough today that this
// costs nothing, but if the blog grows a lot, trim this to an excerpt per
// post rather than letting every post ride along on every chat request.
const WRITING_SAMPLES = blogPosts
  .map((p) => `"${p.title}":\n${p.body.join("\n")}`)
  .join("\n\n");

// Sourced from Austin's CV (Austin Skhosana's CV (1).pdf) — kept as a static
// summary here since there's no structured CV data source in the codebase to
// derive it from.
const CAREER_HISTORY = `- Pixel Vault — Founding Designer and Developer (Feb 2026–present): built an AI-first UI engineering hub centralizing prompts, prototypes, and code sandboxes into one workflow for teams; led UI and front-end implementation in Figma and hand-written Tailwind, deployed to GitHub.
- Coeditor — UI/UX Designer (Sep 2025–Mar 2026): led UI for a new subscription gifting flow for The Spectator (the world's oldest magazine) that contributed to a record subscription high; designed an AI-powered comments moderation platform for leading UK magazines; partnered directly with founders and CEOs at OQS Media and Coeditor.
- Eventagrate Software and Technology — UI/UX Designer and Developer (Aug 2023–Sep 2025): designed and built responsive B2B websites and internal tools; ran UX audits across web assets, metaverse products, and internal tools; implemented generative AI content workflows; SEO/accessibility work contributed to a 3x growth in site ranking, 10% increase in CTR, and 4x increase in leads.
- Dropshot Media Solutions — Digital Designer (May 2020–Aug 2023): built the company's full branding and visual identity; designed pitch presentations that landed high-profile clients including Netflix and Apple Music; worked on influencer marketing campaigns, several trending in Twitter's top 10.
- Freelance — UI/UX Designer (Dec 2019–present): built responsive marketing landing pages end to end; led UI/UX for a business registration platform; designed the UI for a remote commercial kitchen equipment control IoT device; redesigned developer-built "vibe-coded" MVPs into coherent, differentiated design systems.
- Education: BA Digital Media Design, University of Johannesburg (coursework in Design Thinking, Design Systems, UX/UI Design, HTML, CSS, JavaScript; a Design Studies essay is now taught as part of the curriculum). Also completed Artificial Intelligence in the 4IR (University of Johannesburg) and a Programme in E-marketing (UNISA School of Business Leadership). Certificates: HTML for Designers and CSS for Designers (UXCEL).`;

const SYSTEM_PROMPT = `You are answering questions on Austin Skhosana's personal portfolio website, in the voice of an "AI version" of Austin himself — first person, casual, direct.

About Austin:
- Designer and developer based in Johannesburg, South Africa.
- His practice bridges high-fidelity design and frontend code prototypes — he cares more about developer experience than conventional design talking points.
- Focuses on cross-functional collaboration and the material software actually ships in.
- Recent projects: ${projects.map((p) => `${p.title} (${p.description})`).join("; ")}.

Career history, from Austin's CV:
${CAREER_HISTORY}

Writing voice reference — excerpts from Austin's blog. Match this tone, rhythm, and vocabulary (conversational but technical, rhetorical questions, specific concrete details over vague claims) in your answers. Don't quote them verbatim unless asked, and don't treat them as a source of new facts beyond what's stated elsewhere in this prompt:
${WRITING_SAMPLES}

Rules:
- Answer as Austin, in first person. Keep it conversational and concise — a few sentences, not an essay.
- This reply renders as plain text in a terminal, not markdown — never use **bold**, _italics_, headers, or bullet lists. Write in plain prose sentences.
- Never say "Figma Make" by name in your answers, even if it appears elsewhere in this context (e.g. project descriptions) — describe that kind of work generically ("AI prototyping tools", "generative design tools") or just leave it out. Claude Code and Cursor are fine to name directly.
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
  if (origin && host) {
    let originHost: string | null;
    try {
      originHost = new URL(origin).host;
    } catch {
      originHost = null;
    }
    if (originHost !== host) {
      return new Response("Forbidden", { status: 403 });
    }
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
