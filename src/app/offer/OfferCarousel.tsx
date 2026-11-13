"use client";

import {
  Children,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./offer.module.css";

export function OfferCarousel({ children }: { children: ReactNode }) {
  const railRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const dragStateRef = useRef<{ pointerId: number; startX: number; scrollLeft: number } | null>(null);
  const mouseDragRef = useRef<{ startX: number; scrollLeft: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemCount = Children.count(children);

  const getSlides = useCallback(() => {
    return Array.from(
      railRef.current?.querySelectorAll<HTMLElement>("[data-carousel-slide]") ??
        [],
    );
  }, []);

  const updateActiveIndex = useCallback(() => {
    const rail = railRef.current;
    const slides = getSlides();

    if (!rail || slides.length === 0) return;

    const railCenter = rail.scrollLeft + rail.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - railCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex(nearestIndex);
  }, [getSlides]);

  const handleScroll = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const rail = railRef.current;
      const slides = getSlides();
      const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
      const slide = slides[nextIndex];

      if (!rail || !slide) return;

      rail.scrollTo({
        left: slide.offsetLeft - (rail.clientWidth - slide.offsetWidth) / 2,
        behavior: "smooth",
      });
    },
    [getSlides],
  );

  const settleAfterDrag = useCallback(() => {
    const rail = railRef.current;
    const slides = getSlides();
    if (!rail || slides.length === 0) return;

    const railCenter = rail.scrollLeft + rail.clientWidth / 2;
    const nearestSlide = slides.reduce((nearest, slide) => {
      const nearestDistance = Math.abs(
        nearest.offsetLeft + nearest.offsetWidth / 2 - railCenter,
      );
      const slideDistance = Math.abs(
        slide.offsetLeft + slide.offsetWidth / 2 - railCenter,
      );
      return slideDistance < nearestDistance ? slide : nearest;
    });
    const targetLeft =
      nearestSlide.offsetLeft - (rail.clientWidth - nearestSlide.offsetWidth) / 2;

    rail.dataset.settling = "true";
    rail.scrollTo({ left: targetLeft, behavior: "smooth" });
    window.setTimeout(() => {
      if (railRef.current === rail) delete rail.dataset.settling;
    }, 420);
  }, [getSlides]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(activeIndex + 1);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const rail = railRef.current;
    if (!rail) return;

    event.preventDefault();
    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: rail.scrollLeft,
    };
    rail.setPointerCapture(event.pointerId);
    rail.dataset.dragging = "true";
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;
    const rail = railRef.current;
    if (!dragState || !rail || dragState.pointerId !== event.pointerId) return;

    event.preventDefault();
    rail.scrollLeft = dragState.scrollLeft - (event.clientX - dragState.startX);
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;
    const rail = railRef.current;
    if (!dragState || !rail || dragState.pointerId !== event.pointerId) return;

    if (rail.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }
    dragStateRef.current = null;
    delete rail.dataset.dragging;
    settleAfterDrag();
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    const rail = railRef.current;
    if (!rail) return;

    event.preventDefault();
    mouseDragRef.current = { startX: event.clientX, scrollLeft: rail.scrollLeft };
    rail.dataset.dragging = "true";
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const dragState = mouseDragRef.current;
    const rail = railRef.current;
    if (!dragState || !rail || event.buttons !== 1) return;

    event.preventDefault();
    rail.scrollLeft = dragState.scrollLeft - (event.clientX - dragState.startX);
  };

  const finishMouseDrag = () => {
    const rail = railRef.current;
    mouseDragRef.current = null;
    if (rail) {
      delete rail.dataset.dragging;
      settleAfterDrag();
    }
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    updateActiveIndex();
    const resizeObserver = new ResizeObserver(updateActiveIndex);
    resizeObserver.observe(rail);

    return () => {
      resizeObserver.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [updateActiveIndex]);

  return (
    <div className={styles.carousel}>
      <div
        ref={railRef}
        className={styles.workRail}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={finishMouseDrag}
        onMouseLeave={finishMouseDrag}
        tabIndex={0}
        aria-label="Selected work carousel"
      >
        {children}
      </div>

      <div className={styles.scrollHint} aria-label="Choose a project">
        {Array.from({ length: itemCount }, (_, index) => (
          <button
            type="button"
            key={index}
            className={index === activeIndex ? styles.activeDot : undefined}
            onClick={() => scrollToIndex(index)}
            aria-label={`Show project ${index + 1} of ${itemCount}`}
            aria-current={index === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
