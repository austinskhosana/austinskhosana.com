"use client";

import {
  Children,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import styles from "./offer.module.css";

export function OfferCarousel({ children }: { children: ReactNode }) {
  const railRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
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
        tabIndex={0}
        aria-label="Selected work carousel"
      >
        {children}
      </div>

      <div className={styles.carouselControls} aria-label="Carousel controls">
        <button
          type="button"
          className={styles.carouselControl}
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous project"
        >
          <ChevronLeftIcon aria-hidden="true" />
        </button>
        <button
          type="button"
          className={styles.carouselControl}
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex === itemCount - 1}
          aria-label="Next project"
        >
          <ChevronRightIcon aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
