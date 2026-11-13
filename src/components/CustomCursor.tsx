"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointerPositionRef = useRef({ x: 0, y: 0, active: false });
  const scrollFrameRef = useRef<number | null>(null);
  const [label, setLabel] = useState("");
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateLabelFromTarget = (target: Element | null) => {
      const nextLabel = target
        ?.closest<HTMLElement>("[data-cursor-label]")
        ?.dataset.cursorLabel;

      setLabel((currentLabel) =>
        currentLabel === (nextLabel ?? "") ? currentLabel : (nextLabel ?? ""),
      );
    };

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

      pointerPositionRef.current = {
        x: event.clientX,
        y: event.clientY,
        active: true,
      };
      const target = event.target instanceof Element ? event.target : null;
      updateLabelFromTarget(target);
      setVisible(true);
    };

    const handleScroll = () => {
      if (!finePointer.matches || !pointerPositionRef.current.active) return;
      if (scrollFrameRef.current !== null) {
        cancelAnimationFrame(scrollFrameRef.current);
      }

      scrollFrameRef.current = requestAnimationFrame(() => {
        const { x, y } = pointerPositionRef.current;
        updateLabelFromTarget(document.elementFromPoint(x, y));
        scrollFrameRef.current = null;
      });
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (finePointer.matches && event.pointerType !== "touch") {
        setPressed(true);
      }
    };

    const handlePointerUp = () => setPressed(false);
    const handlePointerLeave = (event: MouseEvent) => {
      if (event.relatedTarget === null) {
        pointerPositionRef.current.active = false;
        setVisible(false);
      }
    };
    const handleBlur = () => {
      pointerPositionRef.current.active = false;
      setVisible(false);
      setPressed(false);
    };

    enable();
    finePointer.addEventListener("change", enable);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerUp, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    window.addEventListener("mouseout", handlePointerLeave);
    window.addEventListener("blur", handleBlur);

    return () => {
      disable();
      finePointer.removeEventListener("change", enable);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("scroll", handleScroll, { capture: true });
      window.removeEventListener("mouseout", handlePointerLeave);
      window.removeEventListener("blur", handleBlur);
      if (scrollFrameRef.current !== null) {
        cancelAnimationFrame(scrollFrameRef.current);
      }
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
