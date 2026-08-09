"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";

const ASCII_ART = `          _____                    _____                    _____                _____                    _____                    _____
         /\\    \\                  /\\    \\                  /\\    \\              /\\    \\                  /\\    \\                  /\\    \\
        /::\\    \\                /::\\____\\                /::\\    \\            /::\\    \\                /::\\    \\                /::\\____\\
       /::::\\    \\              /:::/    /               /::::\\    \\           \\:::\\    \\               \\:::\\    \\              /::::|   |
      /::::::\\    \\            /:::/    /               /::::::\\    \\           \\:::\\    \\               \\:::\\    \\            /:::::|   |
     /:::/\\:::\\    \\          /:::/    /               /:::/\\:::\\    \\           \\:::\\    \\               \\:::\\    \\          /::::::|   |
    /:::/__\\:::\\    \\        /:::/    /               /:::/__\\:::\\    \\           \\:::\\    \\               \\:::\\    \\        /:::/|::|   |
   /::::\\   \\:::\\    \\      /:::/    /                \\:::\\   \\:::\\    \\          /::::\\    \\              /::::\\    \\      /:::/ |::|   |
  /::::::\\   \\:::\\    \\    /:::/    /      _____    ___\\:::\\   \\:::\\    \\        /::::::\\    \\    ____    /::::::\\    \\    /:::/  |::|   | _____
 /:::/\\:::\\   \\:::\\    \\  /:::/____/      /\\    \\  /\\   \\:::\\   \\:::\\    \\      /:::/\\:::\\    \\  /\\   \\  /:::/\\:::\\    \\  /:::/   |::|   |/\\    \\
/:::/  \\:::\\   \\:::\\____\\|:::|    /      /::\\____\\/::\\   \\:::\\   \\:::\\____\\    /:::/  \\:::\\____\\/::\\   \\/:::/  \\:::\\____\\/:: /    |::|   /::\\____\\
\\::/    \\:::\\  /:::/    /|:::|____\\     /:::/    /\\:::\\   \\:::\\   \\::/    /   /:::/    \\::/    /\\:::\\  /:::/    \\::/    /\\::/    /|::|  /:::/    /
 \\/____/ \\:::\\/:::/    /  \\:::\\    \\   /:::/    /  \\:::\\   \\:::\\   \\/____/   /:::/    / \\/____/  \\:::\\/:::/    / \\/____/  \\/____/ |::| /:::/    /
          \\::::::/    /    \\:::\\    \\ /:::/    /    \\:::\\   \\:::\\    \\      /:::/    /            \\::::::/    /                   |::|/:::/    /
           \\::::/    /      \\:::\\    /:::/    /      \\:::\\   \\:::\\____\\    /:::/    /              \\::::/____/                    |::::::/    /
           /:::/    /        \\:::\\__/:::/    /        \\:::\\  /:::/    /    \\::/    /                \\:::\\    \\                    |:::::/    /
          /:::/    /          \\::::::::/    /          \\:::\\/:::/    /      \\/____/                  \\:::\\    \\                   |::::/    /
         /:::/    /            \\::::::/    /            \\::::::/    /                                 \\:::\\    \\                  /:::/    /
        /:::/    /              \\::::/    /              \\::::/    /                                   \\:::\\____\\                /:::/    /
        \\::/    /                \\::/____/                \\::/    /                                     \\::/    /                \\::/    /
         \\/____/                  ~~                       \\/____/                                       \\/____/                  \\/____/
                                                                                                                                                  `;

const INTRO_COMMAND = "open about.md";
const TYPE_SPEED = 45;
const OUTPUT_DELAY = 300;
const MAX_QUESTION_LENGTH = 300;
const MAX_HISTORY_TURNS = 6;
const UNLOCK_COMMAND = "austin";
const GATE_HINT = `type "${UNLOCK_COMMAND}" to chat with the LLM version of me`;

type Exchange = {
  question: string;
  answer: string;
  streaming?: boolean;
  error?: boolean;
};

type GateAttempt = {
  command: string;
  unlocked: boolean;
};

function Cursor() {
  return (
    <span
      className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] bg-foreground align-middle"
      style={{ animation: "blink 1s step-end infinite" }}
      aria-hidden
    />
  );
}

function PromptPrefix() {
  return (
    <>
      <span className="text-accent">austin@portfolio</span>
      <span className="text-muted">:</span>
      <span className="text-muted">~/about-me</span>
      <span className="text-muted">$</span>{" "}
    </>
  );
}

export function AboutMeWindowContent() {
  const [introTyped, setIntroTyped] = useState("");
  const [introDone, setIntroDone] = useState(false);
  const [chatUnlocked, setChatUnlocked] = useState(false);
  const [gateLog, setGateLog] = useState<GateAttempt[]>([]);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const busy = exchanges.some((e) => e.streaming);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [gateLog, exchanges]);

  useEffect(() => {
    if (introDone) return;
    if (introTyped.length < INTRO_COMMAND.length) {
      const timeout = setTimeout(() => {
        setIntroTyped(INTRO_COMMAND.slice(0, introTyped.length + 1));
      }, TYPE_SPEED);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => setIntroDone(true), OUTPUT_DELAY);
    return () => clearTimeout(timeout);
  }, [introTyped, introDone]);

  useEffect(() => {
    if (introDone && !busy) inputRef.current?.focus();
  }, [introDone, busy, exchanges.length]);

  async function ask(question: string, priorExchanges: Exchange[]) {
    setExchanges((prev) => [...prev, { question, answer: "", streaming: true }]);

    const history = priorExchanges
      .filter((e) => !e.error)
      .slice(-MAX_HISTORY_TURNS)
      .map((e) => ({ question: e.question, answer: e.answer }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history }),
      });
      if (!res.ok) {
        const message = (await res.text().catch(() => "")).trim();
        setExchanges((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            question,
            answer: message || "something went wrong — try again.",
            streaming: false,
            error: true,
          };
          return next;
        });
        return;
      }
      if (!res.body) throw new Error("bad response");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        const snapshot = full;
        setExchanges((prev) => {
          const next = [...prev];
          next[next.length - 1] = { question, answer: snapshot, streaming: true };
          return next;
        });
      }
      setExchanges((prev) => {
        const next = [...prev];
        next[next.length - 1] = { question, answer: full, streaming: false };
        return next;
      });
    } catch {
      setExchanges((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          question,
          answer: "connection error — try again.",
          streaming: false,
          error: true,
        };
        return next;
      });
    }
  }

  const suggestion =
    !chatUnlocked &&
    input.length > 0 &&
    input.length < UNLOCK_COMMAND.length &&
    UNLOCK_COMMAND.startsWith(input.toLowerCase())
      ? UNLOCK_COMMAND.slice(input.length)
      : "";

  function handleInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!suggestion) return;
    const atEnd = e.currentTarget.selectionStart === input.length;
    if (e.key === "Tab" || (e.key === "ArrowRight" && atEnd)) {
      e.preventDefault();
      setInput(UNLOCK_COMMAND);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || busy) return;
    setInput("");

    if (!chatUnlocked) {
      const unlocked = trimmed.toLowerCase() === UNLOCK_COMMAND;
      setGateLog((prev) => [...prev, { command: trimmed, unlocked }]);
      if (unlocked) setChatUnlocked(true);
      return;
    }

    void ask(trimmed.slice(0, MAX_QUESTION_LENGTH), exchanges);
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-10">
      <div className="flex flex-col gap-2 bg-white p-5 font-mono text-sm leading-relaxed">
        <pre
          aria-hidden
          className="mb-10 w-fit font-mono text-[5px] leading-[5px] whitespace-pre text-foreground/70 select-none"
        >
          {ASCII_ART}
        </pre>

        <div className="flex flex-col gap-2">
          <p className="text-foreground">
            <PromptPrefix />
            {introDone ? INTRO_COMMAND : introTyped}
            {!introDone && <Cursor />}
          </p>
          {introDone && (
            <>
              <p className="text-foreground">
                Hi there! I&apos;m Austin Skhosana, a designer based in
                Johannesburg, South Africa.
              </p>
              <p className="text-muted">
                My practice bridges high-fidelity mocks and increasingly
                shares syntax and code prototypes for frontend work that
                Figma cannot fully capture. I care more about developer
                experience than conventional design talking points.
              </p>
              <p className="text-muted">
                I focus on cross-functional collaboration, championing the
                material software exists in, and the people who help us
                designers ship it to users.
              </p>
            </>
          )}
        </div>

        {introDone &&
          gateLog.map((g, i) => (
            <div key={i} className="flex flex-col gap-2">
              <p className="text-foreground">
                <PromptPrefix />
                {g.command}
              </p>
              {g.unlocked ? (
                <>
                  <p className="text-muted">chat unlocked — ask me anything.</p>
                  <p className="text-muted">
                    P.S. LLMs are non-deterministic, which is just a fancy
                    way of saying don&apos;t trust everything this guy says.
                  </p>
                </>
              ) : (
                <p className="text-muted">command not found. {GATE_HINT}.</p>
              )}
            </div>
          ))}

        {introDone &&
          chatUnlocked &&
          exchanges.map((ex, i) => (
            <div key={i} className="flex flex-col gap-2">
              <p className="text-foreground">
                <PromptPrefix />
                {ex.question}
              </p>
              <p
                className={`whitespace-pre-wrap ${ex.error ? "text-red-500" : "text-muted"}`}
              >
                {ex.answer}
                {ex.streaming && <Cursor />}
              </p>
            </div>
          ))}

        {introDone && !busy && (
          <div className="flex flex-col gap-2">
            {!chatUnlocked && <p className="text-muted">{GATE_HINT}.</p>}
            <form onSubmit={handleSubmit} className="flex items-baseline">
              <PromptPrefix />
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                maxLength={MAX_QUESTION_LENGTH}
                autoComplete="off"
                spellCheck={false}
                style={{ width: `${Math.max(input.length, 1)}ch` }}
                className="border-0 bg-transparent p-0 font-mono text-sm text-foreground caret-transparent outline-none"
              />
              <Cursor />
              {suggestion && (
                <span aria-hidden className="whitespace-pre text-muted/50">
                  {suggestion}
                </span>
              )}
            </form>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
