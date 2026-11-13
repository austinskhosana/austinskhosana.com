import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { SVGProps } from "react";
import {
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/data";
import { CalEmbed } from "./CalEmbed";
import { LiquidMetalIcon, type LiquidMetalIconName } from "./LiquidMetalIcon";
import { OfferCarousel } from "./OfferCarousel";
import { TestimonialCarousel } from "./TestimonialCarousel";
import styles from "./offer.module.css";

export const metadata: Metadata = {
  title: "Design subscription — Austin Skhosana",
  description:
    "Senior product design support for funded teams, without the full-time hiring overhead.",
};

const featuredProjects = projects.filter((project) => !project.hiddenFromHome);

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <rect x="3.5" y="9" width="3.5" height="11.5" rx="0.5" />
      <circle cx="5.25" cy="4.75" r="2" />
      <path d="M11 20.5V9h3.3v1.6c.6-1 1.7-1.85 3.4-1.85 2.5 0 4.3 1.65 4.3 5.2v6.55h-3.5v-6.1c0-1.6-.6-2.6-1.95-2.6-1.1 0-1.75.75-2.05 1.45-.1.25-.13.6-.13.95v6.3H11Z" />
    </svg>
  );
}

const process: {
  icon: LiquidMetalIconName;
  title: string;
  copy: string;
}[] = [
  {
    icon: "start",
    title: "Start your subscription",
    copy: "Subscribe, share context, and you’re in. No long onboarding cycle.",
  },
  {
    icon: "queue",
    title: "Fill your board",
    copy: "Add as many requests as you need, from product flows to polished UI.",
  },
  {
    icon: "approve",
    title: "Review and approve",
    copy: "Give feedback, approve the work, then move straight to the next request.",
  },
];

const benefits: {
  icon: LiquidMetalIconName;
  title: string;
  copy: string;
}[] = [
  {
    icon: "updates",
    title: "Stay in the loop, always.",
    copy: "Get 2–3 progress updates every week. No radio silence.",
  },
  {
    icon: "pricing",
    title: "Fixed rate, no surprises.",
    copy: "Know exactly what you’re paying before the month begins.",
  },
  {
    icon: "pause",
    title: "Pause or cancel anytime.",
    copy: "No contracts, awkward conversations, or lock-in.",
  },
];

const features = [
  "One active request",
  "Pause anytime",
  "Unlimited requests",
  "Cancel anytime",
  "2–3 updates a week",
  "Figma source files",
  "Framer development",
  "No contracts",
];

const faqs = [
  {
    question: "Why not just hire a full-time designer?",
    answer:
      "A full-time senior designer comes with recruiting time, a long-term salary commitment, benefits, and management overhead. This gives a funded team senior design capacity when it needs it, without adding permanent headcount.",
  },
  {
    question: "How fast will I receive my designs?",
    answer:
      "Most requests receive a first pass within two to four working days. Larger product flows are broken into clear milestones so you can review progress continuously.",
  },
  {
    question: "How does onboarding work?",
    answer:
      "We start with a short call, collect your product context and design files, then set up a shared request board. You can add your first request immediately.",
  },
  {
    question: "Is there a limit to how many requests I can make?",
    answer:
      "No. Add as many requests as you like. I work through one active priority at a time so focus and quality stay high.",
  },
  {
    question: "How do you handle larger requests?",
    answer:
      "Larger projects are divided into smaller deliverables: typically flows, screens, states, and implementation passes, so there is always something concrete to review.",
  },
  {
    question: "What if I don’t like the design?",
    answer:
      "Feedback and revisions are part of the subscription. We keep iterating within the active request until the direction is ready to move forward.",
  },
  {
    question: "How does the pause feature work?",
    answer:
      "If you do not have enough work for a full month, pause the subscription and keep the unused time. Resume when the next set of priorities is ready.",
  },
  {
    question: "What programs do you design in?",
    answer:
      "I work at the intersection of design and code, primarily using Claude Code and Codex to shape and build digital experiences. I also use Figma for branding, social assets, and other visual design work.",
  },
  {
    question: "Are there any requests you don’t support?",
    answer:
      "The service is focused on digital product design, design systems, websites, prototypes, and frontend implementation. Illustration-heavy branding and long-form video production are outside the offer.",
  },
  {
    question: "Are there any refunds?",
    answer:
      "Because time is reserved when a subscription starts, completed subscription periods are not refundable. You can pause or cancel before the next billing period.",
  },
];

export default function OfferPage() {
  return (
    <div className={`${styles.offerPage} offer-page-root`}>
      <header className={`${styles.siteHeader} ${styles.shell}`}>
        <Link href="/" className={styles.wordmark}>
          <span aria-hidden="true" className={styles.wordmarkMark}>
            ✽
          </span>
          <span>Austin Skhosana</span>
        </Link>
      </header>

      <div>
        <section className={`${styles.hero} ${styles.shell}`}>
          <h1 className={styles.heroTitle}>
            <span>6 years of design experience.</span>
            <span>None of the hiring headache.</span>
          </h1>
          <p className={styles.heroCopy}>
            A monthly design subscription for funded startups. Fast, focused,
            and senior-led. Pause or cancel anytime.
          </p>
          <div className={styles.buttonRow}>
            <a href="#pricing" className={styles.primaryButton}>
              Subscribe
            </a>
            <a href="#book" className={styles.secondaryButton}>
              Book a call
            </a>
          </div>

          <div className={styles.brandProof}>
            <p className={styles.brandProofLabel}>A few brands I’ve worked with</p>
            <div className={styles.brandCloud} aria-label="Selected clients">
              <div className={styles.brandTrack}>
                <div className={styles.brandList}>
                <Image src="/logos/trace.png" alt="Trace" width={130} height={24} />
                <Image src="/logos/spectator.png" alt="The Spectator" width={130} height={24} />
                <Image src="/logos/unherd.png" alt="UnHerd" width={130} height={24} />
                <Image src="/logos/johnnie-walker.png" alt="Johnnie Walker" width={130} height={24} />
                <Image src="/logos/absa.png" alt="Absa" width={130} height={24} />
                </div>
                <div className={styles.brandList} aria-hidden="true">
                <Image src="/logos/trace.png" alt="" width={130} height={24} />
                <Image src="/logos/spectator.png" alt="" width={130} height={24} />
                <Image src="/logos/unherd.png" alt="" width={130} height={24} />
                <Image src="/logos/johnnie-walker.png" alt="" width={130} height={24} />
                <Image src="/logos/absa.png" alt="" width={130} height={24} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Selected work">
          <OfferCarousel>
            {featuredProjects.map((project) => (
              <div
                className={styles.projectSlide}
                key={project.slug}
                data-carousel-slide
              >
                <ProjectCard
                  project={project}
                  mediaClassName={styles.projectMedia}
                />
              </div>
            ))}
          </OfferCarousel>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              A flexible way to get design support.
            </h2>
          </div>
          <div className={styles.cardGrid}>
            {process.map((item) => (
              <article className={styles.iconCard} key={item.title}>
                <div className={styles.iconStage}>
                  <LiquidMetalIcon name={item.icon} label="" />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardCopy}>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.testimonialSection} ${styles.shell}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Trusted to untangle complexity.</h2>
          </div>
          <TestimonialCarousel />
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Everything a design hire gives you, minus the commitment.
            </h2>
          </div>
          <div className={styles.cardGrid}>
            {benefits.map((item) => (
              <article className={styles.iconCard} key={item.title}>
                <div className={styles.iconStage}>
                  <LiquidMetalIcon name={item.icon} label="" />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardCopy}>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`} id="pricing">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              One subscription. Endless possibilities.
            </h2>
          </div>
          <div className={styles.pricingCard}>
            <p className={styles.pricingLabel}>Monthly subscription</p>
            <p className={styles.price}>
              $2,500 <span>/ month</span>
            </p>
            <div className={styles.priceRule} />
            <ul className={styles.featureList}>
              {features.map((feature) => (
                <li key={feature}>
                  <span className={styles.featureCheck} aria-hidden="true">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.pricingActions}>
            <a
              href="https://austinskhosana.gumroad.com/l/xhrzvf?_gl=1*w44lmr*_ga*MTk3Mjc0NDE2Mi4xNzkxOTc0OTQw*_ga_6LJN6D94N6*czE3OTQ1NTQ2MzMkbzgkZzEkdDE3OTQ1NTU5MjYkajYwJGwwJGgw"
              className={styles.primaryButton}
              target="_blank"
              rel="noreferrer"
            >
              Subscribe
            </a>
            <a href="#book" className={styles.textLink}>
              Book a 15-min intro call instead
            </a>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              You might have some questions. Here are some answers.
            </h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details className={styles.faqItem} key={faq.question}>
                <summary className={styles.faqQuestion}>{faq.question}</summary>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.bookingSection} id="book">
          <div className={`${styles.sectionHeader} ${styles.shell}`}>
            <h2 className={styles.sectionTitle}>
              Book a call. Let’s see if this is the right fit for you.
            </h2>
            <p className={styles.sectionCopy}>
              Pick a 15-minute slot and bring the design problem you’re trying to
              solve.
            </p>
          </div>
          <div className={styles.calendarFrame}>
            <CalEmbed />
          </div>
        </section>
      </div>

      <footer className={`${styles.footer} ${styles.shell}`}>
        <p className={styles.footerNote}>Let’s build something great.</p>
        <nav className={styles.footerLinks} aria-label="Contact links">
          <a
            href="https://www.linkedin.com/in/austinskhosana/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon aria-hidden="true" />
          </a>
          <Link
            href="/"
            aria-label="Portfolio"
          >
            <UserIcon aria-hidden="true" />
          </Link>
          <a
            href="mailto:austin@austinskhosana.com"
            aria-label="Email"
          >
            <EnvelopeIcon aria-hidden="true" />
          </a>
        </nav>
      </footer>
    </div>
  );
}
