"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const disable = () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      setVisible(false);
      setPressed(false);
      setLabel("");
    };

    const enable = () => {
      if (!finePointer.matches) {
        disable();
        return;
      }

      document.documentElement.classList.add("custom-cursor-enabled");
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === "touch") return;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }

      const target = event.target instanceof Element ? event.target : null;
      const nextLabel = target
        ?.closest<HTMLElement>("[data-cursor-label]")
        ?.dataset.cursorLabel;

      setLabel((currentLabel) =>
        currentLabel === (nextLabel ?? "") ? currentLabel : (nextLabel ?? ""),
      );
      setVisible(true);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (finePointer.matches && event.pointerType !== "touch") {
        setPressed(true);
      }
    };

    const handlePointerUp = () => setPressed(false);
    const handlePointerLeave = (event: MouseEvent) => {
      if (event.relatedTarget === null) setVisible(false);
    };
    const handleBlur = () => {
      setVisible(false);
      setPressed(false);
    };

    enable();
    finePointer.addEventListener("change", enable);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerUp, { passive: true });
    window.addEventListener("mouseout", handlePointerLeave);
    window.addEventListener("blur", handleBlur);

    return () => {
      disable();
      finePointer.removeEventListener("change", enable);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("mouseout", handlePointerLeave);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      data-visible={visible}
      data-expanded={Boolean(label)}
      data-pressed={pressed}
      aria-hidden="true"
    >
      <div className="custom-cursor__press">
        <div className="custom-cursor__shape" />
        <span className="custom-cursor__label">{label}</span>
      </div>
    </div>
  );
}
