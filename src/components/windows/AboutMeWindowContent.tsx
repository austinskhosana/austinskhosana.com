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

// The window layer unmounts this component whenever the About Me window is
// minimized or closed, so React state alone would lose the conversation.
// Stashing it in module scope survives that remount — safe because only one
// About Me window can ever be open at a time.
type PersistedState = {
  introTyped: string;
  introDone: boolean;
  chatUnlocked: boolean;
  gateLog: GateAttempt[];
  exchanges: Exchange[];
};

let persistedState: PersistedState | null = null;

function Cursor() {
  return (
    <span
      className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] bg-foreground align-middle"
      style={{ animation: "blink 1s step-end infinite" }}
      aria-hidden
    />
  );
}

const PROMPT_USER = "austin@portfolio";
const PROMPT_PATH = "~/about-me";
// Character width of the rendered prompt ("user:path$ "), used to indent
// just the first line of the chat textarea so it starts right after the
// prompt while wrapped lines fall back to the true left edge — ":", "$",
// and the 1ch margin after "$" account for the +3.
const PROMPT_CH = PROMPT_USER.length + PROMPT_PATH.length + 3;

function PromptPrefix() {
  return (
    <>
      <span className="text-accent">{PROMPT_USER}</span>
      <span className="text-muted">:</span>
      <span className="text-muted">{PROMPT_PATH}</span>
      <span className="text-muted mr-[1ch]">$</span>
    </>
  );
}

export function AboutMeWindowContent() {
  const [introTyped, setIntroTyped] = useState(() => persistedState?.introTyped ?? "");
  const [introDone, setIntroDone] = useState(() => persistedState?.introDone ?? false);
  const [chatUnlocked, setChatUnlocked] = useState(
    () => persistedState?.chatUnlocked ?? false,
  );
  const [gateLog, setGateLog] = useState<GateAttempt[]>(() => persistedState?.gateLog ?? []);
  const [exchanges, setExchanges] = useState<Exchange[]>(
    () => persistedState?.exchanges ?? [],
  );
  const [input, setInput] = useState("");
  const gateInputRef = useRef<HTMLInputElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const busy = exchanges.some((e) => e.streaming);

  useEffect(() => {
    persistedState = { introTyped, introDone, chatUnlocked, gateLog, exchanges };
  }, [introTyped, introDone, chatUnlocked, gateLog, exchanges]);

  // A response still streaming when the window closes never gets to finish —
  // its setExchanges calls land on this now-unmounted instance, not whatever
  // remounts later — so freeze it as interrupted instead of leaving a cursor
  // that blinks forever. Runs once the effect above has already synced the
  // latest render's state into persistedState.
  useEffect(() => {
    return () => {
      if (!persistedState) return;
      persistedState = {
        ...persistedState,
        exchanges: persistedState.exchanges.map((e) =>
          e.streaming
            ? { ...e, streaming: false, error: true, answer: e.answer || "interrupted. Try asking again." }
            : e,
        ),
      };
    };
  }, []);

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
    if (introDone && !busy) {
      (chatUnlocked ? chatInputRef : gateInputRef).current?.focus();
    }
  }, [introDone, busy, chatUnlocked, exchanges.length]);

  // Grows the chat textarea to fit wrapped content instead of scrolling
  // horizontally like the single-line gate input does.
  useEffect(() => {
    const el = chatInputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [input, chatUnlocked]);

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
            answer: message || "something went wrong. Try again.",
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
          answer: "connection error. Try again.",
          streaming: false,
          error: true,
        };
        return next;
      });
    }
  }

  function handleTerminalClick() {
    if (!introDone || busy) return;
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    (chatUnlocked ? chatInputRef : gateInputRef).current?.focus();
  }

  const suggestion =
    !chatUnlocked &&
    input.length > 0 &&
    input.length < UNLOCK_COMMAND.length &&
    UNLOCK_COMMAND.startsWith(input.toLowerCase())
      ? UNLOCK_COMMAND.slice(input.length)
      : "";

  function handleGateKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!suggestion) return;
    const atEnd = e.currentTarget.selectionStart === input.length;
    if (e.key === "Tab" || (e.key === "ArrowRight" && atEnd)) {
      e.preventDefault();
      setInput(UNLOCK_COMMAND);
    }
  }

  function submit() {
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

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    submit();
  }

  // The gate <input> submits its form on Enter natively; the chat <textarea>
  // needs Enter intercepted (its default is a newline) — Shift+Enter still
  // inserts one, for questions that want an explicit line break.
  function handleChatKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 overflow-x-hidden px-6 py-10">
      <div
        onClick={handleTerminalClick}
        className="flex flex-col gap-2 bg-white p-5 font-mono text-sm leading-relaxed"
      >
        <pre
          aria-hidden
          className="mb-10 hidden w-fit font-mono text-[5px] leading-[5px] whitespace-pre text-foreground/70 select-none sm:block"
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
              <p className="text-muted">
                Hi there! I&apos;m Austin Skhosana, a designer based in
                Johannesburg, South Africa. This is usually the point in the
                bio where I tell you I&apos;m sooo passionate about user
                empathy and pixel-perfect design, but at this point
                that&apos;s table stakes for designers. So let&apos;s talk
                about something else. I&apos;m obsessed with DX, otherwise
                known as developer experience.
              </p>
              <p className="text-muted">
                That&apos;s why my practice is fluid, existing somewhere
                between high-fidelity mocks and increasingly sharing syntax
                and code prototypes for frontend details Figma can&apos;t
                fully capture.
              </p>
              <p className="text-muted">
                A core idea in my practice is moving between disciplines to
                improve cross-functional collaboration, championing the
                material software exists in, and the people who help us
                designers ship it to users.
              </p>
              <p className="text-muted">
                That philosophy is best explained through Pixel Vault, a
                resource base I solo-built (in three days, for a hackathon)
                for teams to share prompts, prototypes and code: a shared
                second brain for modern UI engineering workflows. It aptly
                encapsulates the 3 C&apos;s that define my work: Code, Craft,
                and Collaboration.
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
              <p className="whitespace-pre-wrap text-foreground">
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
            {chatUnlocked ? (
              <form onSubmit={handleFormSubmit} className="relative">
                <span className="pointer-events-none absolute top-0 left-0">
                  <PromptPrefix />
                </span>
                <textarea
                  ref={chatInputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleChatKeyDown}
                  maxLength={MAX_QUESTION_LENGTH}
                  autoComplete="off"
                  spellCheck={false}
                  rows={1}
                  style={{ textIndent: `${PROMPT_CH}ch` }}
                  className="w-full resize-none overflow-hidden border-0 bg-transparent p-0 font-mono text-sm leading-relaxed text-foreground outline-none"
                />
              </form>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex items-baseline">
                <PromptPrefix />
                <input
                  ref={gateInputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleGateKeyDown}
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
            )}
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
