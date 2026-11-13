"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./offer.module.css";

const testimonials = [
  {
    quote:
      "Austin has been a massive asset to the team. He has a brilliant knack for taking complex technical requirements and turning them into a polished interface that actually makes sense for the user.",
    name: "Brittany Campbell-Akers",
    role: "Senior Product & Delivery Manager, Coeditor",
    image: "/images/testimonial-brittany.png",
  },
  {
    quote:
      "Such a valuable asset in beginning my company’s visual journey, delivering polished visuals that made me feel differentiated and providing design support that helped me land major clients like Apple Music and Netflix with sleek presentation decks. Great strategic thinking for a cohesive visual world of identity assets.",
    name: "Mpumelelo Ngwenya",
    role: "Founder and CEO, Dropshot Media Solutions",
    image: "/images/testimonial-mpumi.png",
  },
  {
    quote:
      "Austin has been a design partner for projects with quick turnaround, lots of dedication to getting the job done, and is always happy to help with design support and assets delivered with speed and intention. A great asset to have for teams who need to move fast.",
    name: "Kamvelihle Gwana",
    role: "Senior Public Relations Officer, Kamva Gwana",
    image: "/images/testimonial-kamva.png",
  },
];

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const slides = [
    testimonials[testimonials.length - 1],
    ...testimonials,
    testimonials[0],
  ];

  useEffect(() => {
    if (transitionEnabled) return;

    const firstFrame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setTransitionEnabled(true));
    });

    return () => cancelAnimationFrame(firstFrame);
  }, [transitionEnabled]);

  const move = (direction: -1 | 1) => {
    setTransitionEnabled(true);
    setTrackIndex((current) => current + direction);
    setActiveIndex(
      (current) =>
        (current + direction + testimonials.length) % testimonials.length,
    );
  };

  const handleTransitionEnd = () => {
    if (trackIndex === 0) {
      setTransitionEnabled(false);
      setTrackIndex(testimonials.length);
    } else if (trackIndex === testimonials.length + 1) {
      setTransitionEnabled(false);
      setTrackIndex(1);
    }
  };

  const showTestimonial = (index: number) => {
    if (index === activeIndex) return;
    setTransitionEnabled(true);
    setActiveIndex(index);
    setTrackIndex(index + 1);
  };

  return (
    <div className={styles.testimonialCarousel}>
      <button
        type="button"
        className={`${styles.testimonialArrow} ${styles.testimonialArrowPrevious}`}
        onClick={() => move(-1)}
        aria-label="Previous testimonial"
      >
        <ChevronLeftIcon aria-hidden="true" />
      </button>

      <div className={styles.testimonialViewport} aria-live="polite">
        <div
          className={`${styles.testimonialTrack} ${
            transitionEnabled ? "" : styles.testimonialTrackInstant
          }`}
          style={{
            transform: `translate3d(calc(-${trackIndex * 100}% - ${trackIndex * 16}px), 0, 0)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((testimonial, index) => {
            const originalIndex =
              index === 0
                ? testimonials.length - 1
                : index === slides.length - 1
                  ? 0
                  : index - 1;
            const isActive = originalIndex === activeIndex;

            return (
            <figure
              className={`${styles.testimonialCard} ${
                isActive
                  ? styles.testimonialCardActive
                  : styles.testimonialCardInactive
              }`}
              key={`${testimonial.name}-${index}`}
              aria-hidden={!isActive}
            >
              <blockquote className={styles.quote}>“{testimonial.quote}”</blockquote>
              <figcaption className={styles.quoteAuthor}>
                <Image
                  className={styles.avatar}
                  src={testimonial.image}
                  alt=""
                  width={40}
                  height={40}
                  aria-hidden="true"
                />
                <span>
                  <span className={styles.authorName}>{testimonial.name}</span>
                  <span className={styles.authorRole}>{testimonial.role}</span>
                </span>
              </figcaption>
            </figure>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className={`${styles.testimonialArrow} ${styles.testimonialArrowNext}`}
        onClick={() => move(1)}
        aria-label="Next testimonial"
      >
        <ChevronRightIcon aria-hidden="true" />
      </button>

      <div className={styles.testimonialDots} aria-label="Choose testimonial">
        {testimonials.map((item, index) => (
          <button
            type="button"
            key={item.name}
            className={index === activeIndex ? styles.testimonialDotActive : undefined}
            onClick={() => showTestimonial(index)}
            aria-label={`Show testimonial from ${item.name}`}
            aria-current={index === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
