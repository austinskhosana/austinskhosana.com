export type ToolStackItem = {
  label: string;
  bg: string;
  fg: string;
};

export const toolStack: ToolStackItem[] = [
  { label: "Ae", bg: "#1F0A47", fg: "#B79EFF" },
  { label: "Ai", bg: "#33020C", fg: "#FF9A00" },
  { label: "5", bg: "#E44D26", fg: "#ffffff" },
  { label: "3", bg: "#1572B6", fg: "#ffffff" },
  { label: "◇", bg: "#0A0A0A", fg: "#ffffff" },
];

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  role: string;
  tools: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  gallery?: { src: string; alt: string }[];
  sections: { heading: string; body: string[] }[];
};

export const projects: Project[] = [
  {
    slug: "pixelvault",
    title: "Pixel Vault",
    description:
      "Building a UI Engineering resource hub for designers who code, using Figma Make and Claude Code.",
    tags: ["Frontend Development", "UI Design", "UX Research", "DX Design"],
    role: "Self-led Project",
    tools: "UI/UX Design, Code Prototype, TailwindCSS",
    sections: [
      {
        heading: "The Challenge",
        body: [
          "Sharing AI-assisted code prototypes is messy and fragmented, with resources scattered across multiple platforms and environments.",
        ],
      },
      {
        heading: "The Solution",
        body: [
          "Pixel Vault is a resource base for all things UI engineering within a team — built for organizing design work, curating AI-generated interfaces, and connecting prompts to prototypes.",
        ],
      },
      {
        heading: "Key Features",
        body: [
          "UI Components — staggered card animations plus a coding sandbox to explore components in their actual context, complete with a comments section for collaborative work within the team.",
          "Coding Sandbox DX — adds structure, visual cues, and AI hints to replace traditional IDE capabilities.",
          "Prototypes — enables iteration tracking and team remixing of exploratory work.",
          "Prompts & Templates — showcases unconventional interaction patterns designed to create small moments of joy in how we interact with computers.",
          "Vibe Coded Design Tools — centralizes internally-built utilities, plugins, and micro-applications.",
        ],
      },
      {
        heading: "Key Learning",
        body: [
          "While AI prototyping helps designers move faster, skills stack on top of each other — token management requires thoughtful delegation.",
        ],
      },
    ],
  },
  {
    slug: "thespectator",
    title: "The Spectator",
    description:
      "Creating a subscription flow that drove record highs for the world's oldest magazine.",
    tags: ["Product Design", "Strategy", "UX Research"],
    role: "UI Designer",
    tools: "UI/UX Design",
    image: "/images/6ImrjoK7aed6NhmL8Pk41tKeHrc.png",
    imageAlt: "The Spectator gift subscription flow",
    imageWidth: 6048,
    imageHeight: 3928,
    sections: [
      {
        heading: "The Challenge",
        body: [
          "The oldest running magazine in the world needed a flow for their gifting feature for the busiest time of the year for gifts — the holiday season.",
          "The objective was clear: move users smoothly through the subscription flow while clearly communicating the value and payment options of each offer.",
        ],
      },
      {
        heading: "The Solution",
        body: [
          "I translated existing UX work into high-fidelity, fully annotated Figma designs that were ready for developer handoff.",
        ],
      },
      {
        heading: "The Process",
        body: [
          "User Flows — created by the team before the design phase.",
          "Wireframes — a collaborative stage establishing layout and interaction without brand focus.",
          "UI Design — leading the effort to evolve wireframes into high-fidelity screens that expressed the final vision.",
        ],
      },
      {
        heading: "The Results",
        body: [
          "The Spectator hit record subscription highs after this flow went live — a direct correlation between design implementation and revenue growth, and a strong example of successful cross-functional teamwork.",
        ],
      },
    ],
  },
  {
    slug: "comments-moderation",
    title: "Coeditor",
    description: "Creating an AI-powered comments moderation platform.",
    tags: [
      "UI Design",
      "Product Design",
      "Frontend Development",
      "UX Research",
      "Interaction Design",
    ],
    role: "Product Designer",
    tools: "Product Design, CSS",
    image: "/images/CX64iJFNd4K5fwyvcUf5QrknS0.png",
    imageAlt: "Coeditor detailed comment view",
    imageWidth: 5774,
    imageHeight: 3591,
    sections: [
      {
        heading: "The Challenge",
        body: [
          "News platforms struggle with comments containing harmful content. The team needed a system that can exist as a plug-in for different magazines, while maintaining publisher control over moderation parameters.",
        ],
      },
      {
        heading: "The Solution",
        body: [
          "The platform analyzes comments against defined parameters and provides contextual feedback aligned with community guidelines, aiming to maintain safety without heavy-handedness.",
        ],
      },
      {
        heading: "The Process",
        body: [
          "The team followed standard UX methodology: user flow mapping, workshops, critiques, then wireframes and Figma designs. I contributed CSS animations to guide engineering implementation.",
        ],
      },
      {
        heading: "CSS Animations & the Loader",
        body: [
          "Starting with an open-source loader, I adapted it for light-mode compatibility. The design used colour as a visual signal: a classic set of colours for approvals and acceptances, and a pink-and-blue colourway.",
        ],
      },
      {
        heading: "Tradeoffs and Direction Change",
        body: [
          "The colorful loader clashed with various publisher brands. The team pivoted to a simple open-source search icon, with colours edited to better adapt to different brand environments.",
        ],
      },
      {
        heading: "Success State",
        body: [
          "Approved comments display a clear message confirming that their comment had been successfully published — without unnecessary flourishes.",
        ],
      },
      {
        heading: "UX Writing Challenge",
        body: [
          "This proved most difficult: delivering AI-based feedback that is both contextual and non-deterministic, while maintaining an empathetic tone across diverse publishers.",
        ],
      },
      {
        heading: "The Dashboard & Modal",
        body: [
          "The moderation interface displays comment context — article, user details, history — in a compact format, enabling moderators to make rapid, confident decisions.",
        ],
      },
      {
        heading: "The Results",
        body: [
          "The MVP delivered contextual feedback that felt intelligent and contextual, enabling publishing teams to moderate efficiently while maintaining safe communities.",
        ],
      },
    ],
  },
  {
    slug: "spectra-2",
    title: "Spectra",
    description: "Transforming storytelling with AI-generated content.",
    tags: ["Product Design", "Strategy", "UX Research"],
    role: "Self-led Project",
    tools: "UI/UX Design",
    image: "/images/onivFblOwHUTrzdIRuz3LzJKVEc.png",
    imageAlt: "Spectra — series and movies with infinite possibilities",
    imageWidth: 1572,
    imageHeight: 3408,
    gallery: [
      {
        src: "/images/onivFblOwHUTrzdIRuz3LzJKVEc.png",
        alt: "Spectra home screen",
      },
      {
        src: "/images/nY6XqWc8DMpg12a5A6B3b9XzNak.png",
        alt: "Spectra visual aesthetic selector",
      },
      {
        src: "/images/M8XX2ZLG9C9EhZF3Q7StOiShESE.png",
        alt: "Spectra generated movie screen",
      },
    ],
    sections: [
      {
        heading: "The Challenge",
        body: [
          "Users struggle to bring their unique storytelling visions to life due to the high cost, technical barriers, and inaccessibility of traditional filmmaking tools.",
        ],
      },
      {
        heading: "The Solution",
        body: [
          "Spectra aims to revolutionize storytelling by allowing users to create their own movies and TV series, democratizing filmmaking through accessible creative tools.",
        ],
      },
      {
        heading: "Key Features",
        body: [
          "A prompt input area for story generation.",
          "A visual aesthetic builder with grid-based style selection.",
          "A Tinder-style character and location swiping interface.",
          "A minimalistic loading experience.",
          "A glassmorphism-styled playback screen.",
        ],
      },
      {
        heading: "The Process",
        body: [
          "The UX methodology progressed through persona development, empathy mapping, information architecture, wireframing, and high-fidelity design — focusing on a seamless user experience that encourages creativity and exploration.",
        ],
      },
      {
        heading: "Key Reflections",
        body: [
          "The project highlighted insights about generative AI's empowerment potential, the importance of intuitive design, and balancing aesthetic appeal with functionality to inspire and support users.",
        ],
      },
    ],
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "vibe-coding-101-and-figma-make-2",
    title: "Vibe Coding 101 and Figma Make",
    date: "2026-03-08",
    excerpt:
      "Figma Make is like a sketchbook you interact with using English, that moves at the speed of AI generation.",
    body: [
      "Figma Make is like a sketchbook you interact with using English, that moves at the speed of AI generation. Wireframes have historically served as rapid entry points for visual alignment, but generative AI is fundamentally reshaping design workflows.",
      "Natural language now functions as a prototyping interface, democratizing what was once restricted to those with advanced technical skills. This shift creates tension around what constitutes \"high fidelity\" — questioning whether a polished AI prototype or a wireframe with clearer design intent holds more value.",
      "Pixel Vault is a good example of this evolution — a tool I built in three days during the Figma Make hackathon. Rather than remaining a prototype, it became functional code, representing a more abstracted yet tangible artifact of modern UI engineering.",
      "Figma Make fulfils a long-held aspiration among designers: the ability to ship with taste, intent and consideration, while leveraging advanced generative capabilities.",
    ],
  },
  {
    slug: "tailwind-the-last-css-framework-3",
    title: "Tailwind, the last CSS Framework?",
    date: "2026-02-24",
    excerpt:
      "Models default to this framework for the art of styling the internet. How did we get here?",
    body: [
      "You open up your coding tool of choice, you have some insane idea that you think will optimise your morning routine and maybe just maybe change the world. You tell your agent to have a go at it and it gets to work. You take a look at the syntax because you want to tweak some of the styling yourself so you don't burn through too many tokens on tasks that don't feel worth it — \"taste is the moat\" you whisper to yourself as you obsess over border radius. So there you are, tweaking utility classes instead of vanilla CSS. How did we get here? Models default to this framework for the art of styling the internet.",
      "The conversation needs us to go back to basics. What is Tailwind? Tailwind is what happened when someone got tired of naming things. Instead of inventing class names and writing CSS in a separate file, you describe your layout inline, in your HTML, using small utility classes that do exactly one thing each. It's verbose in a way that somehow ends up feeling like clarity. It's a design system that speaks like a designer — a set of syntax as rules for quick styling.",
      "So why do models default to Tailwind, and what does this mean for the underlying architecture underneath English as programming abstraction in a new world of programming? Well, there are a couple of reasons. For one, it's everywhere — Laravel, Vue, Rails, React, even email and React Native. When a model is trained on the collective output of the web, Tailwind shows up more than almost anything else in the styling layer. Statistical likelihood increases; the model reaches for this as the logical prediction, the thing most likely to work, the thing that will make sense to whoever reads the code next.",
      "But the more interesting reason is why Tailwind became popular in the first place, pre-AI — and that's legibility. Tailwind's utility classes map almost directly to design intent. flex, items-center, gap-4 — that reads less like code and more like a design tool in syntax. A model doesn't have to invent a styling language or guess at conventions; it just reaches for the one that already sounds like design thinking, or at the very least the pattern that has been culturally determined as directionally correct.",
      "And then there's the social reason, the one that matters most. Tailwind solved the problem that no CSS framework before it could — it gave teams a shared vocabulary for styling. The death of obligatory arguing about class names, just a common language everyone agrees on that is as beautiful as it reads. Turns out that's exactly what you need when one of your teammates is a robot.",
    ],
  },
];
