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

export type PlaygroundCategory =
  | "illustration"
  | "design"
  | "code"
  | "artificial-intelligence";

export type PlaygroundItem = {
  slug: string;
  name: string;
  category: PlaygroundCategory;
  description: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export const playgroundItems: PlaygroundItem[] = [
  {
    slug: "heart-futura",
    name: "[digital illustration] - heart futura <3",
    category: "illustration",
    description:
      "A heart wrapped in vines, suspended inside a glass bubble.",
    image: "/images/playground-heart-futura.png",
    imageAlt: "Digital illustration of a heart wrapped in vines inside a glass bubble",
    imageWidth: 3516,
    imageHeight: 1896,
  },
  {
    slug: "creatorshop-ui-bento-grid",
    name: "[ui design] - creatorshop ui bento grid",
    category: "design",
    description:
      "A bento grid exploring Creatorshop's UI — product cards, category selection, and a 'Pay With Influence' moment.",
    image: "/images/playground-creatorshop-ui-bento-grid.png",
    imageAlt: "Creatorshop UI bento grid showing product cards, category selection, and a Pay With Influence button",
    imageWidth: 1999,
    imageHeight: 1124,
  },
  {
    slug: "nimbus-logo-design",
    name: "[logo design] - nimbus logo design",
    category: "design",
    description: "A rounded, cloud-like app icon mark for Nimbus.",
    image: "/images/playground-nimbus-logo-design.png",
    imageAlt: "Nimbus app icon — a white cloud-petal mark on a blue rounded square",
    imageWidth: 6912,
    imageHeight: 4320,
  },
  {
    slug: "johnnie-walker-jet-tickets",
    name: "[brand design] - johnnie walker influencer private jet tickets.",
    category: "design",
    description:
      "A boarding pass mockup for Johnnie Walker's Destination Flavourcation influencer trip from JHB to CPT.",
    image: "/images/playground-johnnie-walker-jet-tickets.png",
    imageAlt: "Johnnie Walker Destination Flavourcation boarding pass, JHB to CPT",
    imageWidth: 3344,
    imageHeight: 1882,
  },
  {
    slug: "boring-office-people",
    name: "[character design] - boring office people",
    category: "illustration",
    description:
      "A set of flat, line-work office character cards — a woman in a blazer and skirt, and two men in suits.",
    image: "/images/playground-boring-office-people.png",
    imageAlt: "Three flat black-and-white illustrated office characters on card backgrounds with sun icons",
    imageWidth: 6912,
    imageHeight: 4320,
  },
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
  coverVideo?: string;
  coverVideoAlt?: string;
  coverVideoWidth?: number;
  coverVideoHeight?: number;
  // Edge-to-edge, cropped cover instead of the default padded grey tray
  // with a bordered/contained video.
  coverVideoFill?: boolean;
  // Overrides CoverVideo's default 1.25 crop-in scale — for clips that
  // don't need as tight a zoom to fill the frame.
  coverVideoScale?: number;
  gallery?: { src: string; alt: string; width: number; height: number }[];
  sections: {
    heading: string;
    // Shown in the case-study rail instead of `heading` when set — keeps
    // long section titles from overflowing/being truncated in the rail
    // while leaving the actual in-article heading text untouched.
    navLabel?: string;
    body: string[];
    images?: { src: string; alt: string; width: number; height: number }[];
    // Tighter stacking for image sets that read as one continuous sequence
    // (e.g. states of the same component) rather than standalone shots.
    tightImages?: boolean;
    // `framed` opts into the cover video's grey-tray + border/shadow
    // treatment (for raw, chrome-less clips); omit/false for clips that
    // already carry their own frame baked in, so they can go edge-to-edge.
    videos?: {
      src: string;
      alt: string;
      width: number;
      height: number;
      framed?: boolean;
      // Edge-to-edge, cropped, no border/shadow — same treatment as the
      // case study's cover video, for reusing that exact clip in-section.
      fill?: boolean;
      scale?: number;
    }[];
  }[];
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
    coverVideo: "/videos/pixelvault-prompts-templates.mp4",
    coverVideoAlt: "Pixel Vault Prompts & Templates folder and the Figma Make System Prompt detail",
    coverVideoWidth: 3408,
    coverVideoHeight: 2062,
    sections: [
      {
        heading: "The Challenges",
        body: [
          "AI-assisted UI engineering for teams is disjointed. There's a deployed link here, a Figma template there, and an experimental component running in another environment — maybe deployed somewhere, maybe only local. We live in an age where we can generate code with ease, but how do we actually curate and share all of this within a team?",
        ],
      },
      {
        heading: "The Solutions",
        body: [
          "Pixel Vault is a resource base for all things UI engineering within a team. It's built for sharing work, curating creative UI output, and connecting everything from prompts to prototypes and everything in between.",
        ],
      },
      {
        heading: "UI Components",
        body: [
          "The UI Components page has a subtle stagger animation across all the cards, and I built a coding sandbox to explore components in their actual context, complete with a comments section for collaborative work within the team.",
        ],
      },
      {
        heading: "Animated Components",
        navLabel: "Animated",
        body: [
          "A showcase of the interactive components available in Pixel Vault, from buttons and their hover and motion states to the animated navbar.",
        ],
        videos: [
          {
            src: "/videos/pixelvault-button-showcase.mp4",
            alt: "Pixel Vault animated button showcase with hover and motion states",
            width: 3412,
            height: 2056,
          },
          {
            src: "/videos/pixelvault-navbar-showcase.mp4",
            alt: "Pixel Vault animated navbar component",
            width: 3394,
            height: 2056,
          },
        ],
      },
      {
        heading: "DX in the Coding Sandbox",
        navLabel: "DX",
        body: [
          "This screen was really interesting to design because I had to think very intentionally about developer experience and polish. I was using Claude Sonnet, and initially the UI was just plain text with no context, no hierarchy, and no colour. So I added structure, visual cues, and AI hints, because whenever I'm in one of these online coding sandboxes I always miss the IDE plugins that give you a similar experience.",
        ],
        images: [
          {
            src: "/images/pixelvault-coding-sandbox.png",
            alt: "Pixel Vault coding sandbox showing the Magnetic Button component",
            width: 6912,
            height: 4320,
          },
        ],
      },
      {
        heading: "Prototypes",
        body: [
          "Users can upload prototypes, share them with teammates, and keep a record of iterations and explorations that can be borrowed and remixed across the team.",
        ],
      },
      {
        heading: "Prompts & Templates",
        body: [
          "This animation was one of my favourite parts of the project. I'm trying to get better at thinking through interfaces as interactive systems and exploring interaction patterns that aren't as conventional, just creating small moments of joy in how we interact with computers as humans.",
        ],
        videos: [
          {
            src: "/videos/pixelvault-prompts-templates.mp4",
            alt: "Pixel Vault Prompts & Templates folder and the Figma Make System Prompt detail",
            width: 3408,
            height: 2062,
            framed: true,
          },
        ],
      },
      {
        heading: "Vibe Coded Design Tools",
        navLabel: "Design Tools",
        body: [
          "In the age of democratised software creation, designers are creating their own tools — plugins, micro-apps, and internal utilities — and I wanted this to be a place where those tools can be shared and stored within teams.",
        ],
        images: [
          {
            src: "/images/pixelvault-design-tools.png",
            alt: "Pixel Vault Design Tools page with Color Palette Extractor, Type Scale Generator, and Spacing Visualizer",
            width: 6912,
            height: 4320,
          },
        ],
      },
      {
        heading: "Learnings & Outcomes",
        navLabel: "Learnings",
        body: [
          "I learnt that while AI prototyping helps designers move faster, skills stack on top of each other: my technical background was amplified by the tool. At the same time, relying on these tools introduces new constraints, like token management and being mindful about what you delegate to the agent.",
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
    image: "/images/cover-thespectator.png",
    imageAlt: "The Spectator gift subscription flow — choose your gift type",
    imageWidth: 6912,
    imageHeight: 4320,
    sections: [
      {
        heading: "The Challenge",
        body: [
          "The oldest running magazine in the world needed a flow for their gifting feature for the busiest time of the year for gifts — the holiday season.",
          "The PRD was simple: move users smoothly through the subscription flow while clearly communicating the value and payment options of each offer.",
        ],
      },
      {
        heading: "The Solution",
        body: [
          "I took the UX work the Spectator team had already completed and translated it into high-fidelity, fully annotated Figma designs that were ready for developer handoff.",
        ],
      },
      {
        heading: "The Process",
        body: [
          "The team began by creating user flows. I wasn't involved in this stage, but the flows were a key artefact for understanding the signed-off user experience and the constraints I needed to design within.",
        ],
        images: [
          {
            src: "/images/spectator-user-flow-fixed-term.png",
            alt: "The Spectator gift subscription user flow for fixed-term gifts",
            width: 12416,
            height: 5376,
          },
          {
            src: "/images/spectator-user-flow-auto-renewing.png",
            alt: "The Spectator gift subscription user flow for auto-renewing gifts",
            width: 13632,
            height: 6656,
          },
        ],
      },
      {
        heading: "Wireframes",
        body: [
          "This is where collaboration began. We started wireframing the experience to clarify what we wanted the UI to look and feel like, without yet focusing on brand identity. This helped us align early and commit to a clear direction for layout and interaction.",
        ],
        images: [
          {
            src: "/images/spectator-wireframes.png",
            alt: "Stacked low-fidelity wireframes of the gift subscription flow's four steps",
            width: 6912,
            height: 4320,
          },
        ],
      },
      {
        heading: "UI Design",
        body: [
          "This is where I led the design effort — evolving the wireframes into high-fidelity screens that expressed the final vision for the UI and all its key states.",
        ],
        images: [
          {
            src: "/images/spectator-ui-terms-recommended.png",
            alt: "Gift subscription terms screen with annual automatic renewal recommended",
            width: 6912,
            height: 4320,
          },
          {
            src: "/images/spectator-ui-terms-bestvalue.png",
            alt: "Gift subscription terms screen with annual one-off payment as best value",
            width: 6912,
            height: 4320,
          },
          {
            src: "/images/spectator-ui-gift-type.png",
            alt: "Gift subscription type screen with digital only selected",
            width: 6912,
            height: 4320,
          },
        ],
      },
      {
        heading: "The Outcome?",
        body: [
          "The Spectator hit record subscription highs after this flow went live — so teamwork really did make the dream work. It was especially satisfying to see my design work tied so directly to a clear revenue peak. All around, a great project.",
        ],
      },
    ],
  },
  {
    slug: "comments-moderation",
    title: "Coeditor",
    description:
      "Creating an AI-powered comments moderation platform for some of the UK's leading magazines.",
    tags: [
      "UI Design",
      "Product Design",
      "Frontend Development",
      "UX Research",
      "Interaction Design",
    ],
    role: "Product Designer",
    tools: "Product Design, CSS",
    image: "/images/cover-comments-moderation.png",
    imageAlt: "Coeditor detailed comment view",
    imageWidth: 6912,
    imageHeight: 4320,
    sections: [
      {
        heading: "The Challenge",
        body: [
          "News and politics platforms often struggle with comments sections filled with bigotry and behaviour that doesn't align with community guidelines. We built this for some of the UK's leading magazines — the challenge was creating a system that could exist as a plug-in across different publishers, while still giving teams fine-grained control over the parameters of AI-moderated analysis and feedback.",
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
          "The team followed standard UX methodology: user flow mapping, workshops, critiques, then wireframes and Figma designs. I contributed CSS animations to guide engineering implementation, working as the only designer on the project.",
        ],
      },
      {
        heading: "CSS Animations",
        body: [
          "We were moving quickly, and I wanted a loading state that felt unique but was still feasible to ship on deadline, with me as the only designer on the project. I started from an open-source loader and built on top of it to create a small visual system for the loading states.",
        ],
        images: [
          {
            src: "/images/coeditor-css-spinner-code.png",
            alt: "CSS code for the pink and blue gradient loader animation",
            width: 6912,
            height: 4320,
          },
        ],
      },
      {
        heading: "The Loader",
        body: [
          "I began by editing the styles, turning the orb from dark mode to light mode to match the visual direction of the MVP's light-mode widget. This gave us a distinct, friendly loading pattern without starting from scratch.",
        ],
        videos: [
          {
            src: "/videos/coeditor-loader-animation.mp4",
            alt: "Pink and blue gradient orb loader animation in motion",
            width: 800,
            height: 926,
            framed: true,
          },
        ],
      },
      {
        heading: "The Loader States in Context",
        navLabel: "Loader States",
        tightImages: true,
        body: [
          "The idea for the loader was that it would move between states using colour as a visual signal: a classic set of colours for approvals and acceptances, and a pink-and-blue colourway for the primary loading state. This made it easy for users to read system status at a glance.",
        ],
        images: [
          {
            src: "/images/coeditor-loader-context-success.png",
            alt: "Loader state: comment posted successfully",
            width: 6912,
            height: 4320,
          },
          {
            src: "/images/coeditor-loader-context-moderating.png",
            alt: "Loader state: comment being moderated",
            width: 6912,
            height: 4320,
          },
          {
            src: "/images/coeditor-loader-context-feedback.png",
            alt: "Loader state: moderation feedback",
            width: 6912,
            height: 4320,
          },
        ],
      },
      {
        heading: "Tradeoffs and Direction Change",
        navLabel: "Tradeoffs",
        body: [
          "The team was excited about the loader as a visual direction, but we realised it wouldn't work in all the contexts it needed to. The plugin needed to sit comfortably alongside the brand colours of any publisher using it, and the colourful orb risked clashing with existing visual systems.",
        ],
      },
      {
        heading: "New Loader Animation",
        navLabel: "New Loader",
        body: [
          "We shifted direction to something more neutral and flexible: a simple open-source search icon, with colours edited to better adapt to different brand environments. The animation and design felt more context-agnostic — something that could exist as a plugin multiple publishers could use without worrying whether it aligned perfectly with their visual language.",
        ],
        images: [
          {
            src: "/images/coeditor-loader-final.png",
            alt: "Final monochrome moderating feedback loader in the comment editor",
            width: 6912,
            height: 4320,
          },
        ],
        videos: [
          {
            src: "/videos/coeditor-new-loader-animation.mp4",
            alt: "New monochrome loader animation in motion",
            width: 898,
            height: 984,
            framed: true,
          },
        ],
      },
      {
        heading: "Success State",
        body: [
          "Approved comments display a clear message confirming that their comment had been successfully published — without unnecessary flourishes.",
        ],
        images: [
          {
            src: "/images/coeditor-success-state.png",
            alt: "Comment posted successfully confirmation state",
            width: 6912,
            height: 4320,
          },
        ],
      },
      {
        heading: "UX Writing Challenge",
        navLabel: "UX Writing",
        body: [
          "This proved most difficult: delivering AI-based feedback that is both contextual and non-deterministic, while maintaining an empathetic tone across diverse publishers.",
        ],
        images: [
          {
            src: "/images/coeditor-moderation-feedback.png",
            alt: "Comment editor showing AI moderation feedback on a flagged comment",
            width: 6912,
            height: 4320,
          },
        ],
      },
      {
        heading: "The Dashboard UI",
        body: [
          "The moderation dashboard is where moderators review comments that didn't pass the AI check, with enough context to approve, reject, or escalate quickly and confidently.",
        ],
        images: [
          {
            src: "/images/coeditor-dashboard.png",
            alt: "Comment moderation dashboard with a table of flagged comments",
            width: 6912,
            height: 4320,
          },
        ],
      },
      {
        heading: "The Modal",
        body: [
          "Designing the moderation modal was my favourite part of this project — it had to surface the article, the comment itself, user details, and comment history in one compact, high-signal view, without drowning moderators in noise.",
        ],
        images: [
          {
            src: "/images/coeditor-modal-compact.png",
            alt: "Detailed comment view modal within the moderation dashboard",
            width: 6912,
            height: 4320,
          },
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
    coverVideo: "/videos/spectra-cover.mp4",
    coverVideoAlt: "Spectra — series and movies with infinite possibilities",
    coverVideoWidth: 3332,
    coverVideoHeight: 1856,
    coverVideoFill: true,
    coverVideoScale: 1.15,
    sections: [
      {
        heading: "The Challenges",
        body: [
          "Users struggle to bring their unique storytelling visions to life due to the high cost, technical barriers, and inaccessibility of traditional filmmaking tools. Many people have ideas for films and series, but lack the skills, equipment, or resources to turn those ideas into something tangible.",
        ],
      },
      {
        heading: "The Solutions",
        body: [
          "To tackle Spectra's challenges, I designed an intuitive interface that simplified the movie-making process. Users can curate characters, locations, and styles through clear visual previews and interactive elements. This approach makes creating custom films and series accessible, playful, and enjoyable for a wide range of users.",
        ],
      },
      {
        heading: "Welcome to Spectra",
        body: [
          "The Spectra welcome screen features falling CDs against a vibrant backdrop, complemented by a looping hero video. This design blends nostalgia with a forward-thinking approach to media, offering an engaging entry point that immediately sets the tone for creative exploration.",
        ],
        videos: [
          {
            src: "/videos/spectra-cover.mp4",
            alt: "Spectra — series and movies with infinite possibilities",
            width: 3332,
            height: 1856,
            fill: true,
            scale: 1.15,
          },
        ],
      },
      {
        heading: "Prompt Input & Featured Content",
        navLabel: "Prompt Input",
        body: [
          "The home screen features a prompt input area where users can start generating a movie or series in their own words. Below the prompt, users can scroll through featured content generated by others, showcasing community creativity and providing inspiration for new stories.",
        ],
        images: [
          {
            src: "/images/spectra-home.png",
            alt: "Spectra home screen with prompt input and featured content",
            width: 6912,
            height: 4320,
          },
        ],
      },
      {
        heading: "AI Video Aesthetic Builder UI Workflow",
        navLabel: "Aesthetic Builder",
        body: [
          "In the movie curation experience, users start by selecting the visual aesthetic, ranging from realism to anime and other stylized looks. A rich set of options is presented in a visual grid, and users can click refresh to generate a new set of aesthetics if they don't find something they like. This keeps exploration lightweight and fun while still feeling curated.",
        ],
        images: [
          {
            src: "/images/spectra-aesthetic-selector.png",
            alt: "Spectra select a visual aesthetic screen",
            width: 6912,
            height: 4320,
          },
        ],
      },
      {
        heading: "Movie/Show Description",
        navLabel: "Show Description",
        body: [
          "The movie/show description screen allows users to watch the selected film or episode, read a concise description of the story and characters, and discover similar titles through tailored recommendations. This deepens engagement by helping users understand the narrative context and quickly jump into related content they might enjoy.",
        ],
        images: [
          {
            src: "/images/spectra-movie-description.png",
            alt: "Spectra movie description screen for Boys Love Aspen",
            width: 6912,
            height: 4320,
          },
        ],
      },
      {
        heading: "Generated Character Selector Screen",
        navLabel: "Character Selector",
        body: [
          "This Tinder-style swiping screen lets users easily curate their movie by swiping right on characters, styling options, or locations they want to include, and left to dismiss those they don't. The familiar interaction pattern lowers friction and turns the customization process into an engaging, game-like experience.",
        ],
        images: [
          {
            src: "/images/spectra-character-selector.png",
            alt: "Spectra character selector screen with swipeable character cards",
            width: 6912,
            height: 4320,
          },
        ],
      },
      {
        heading: "Generating Loader",
        body: [
          "During the movie generation process, a minimalistic loader appears with the message \"Generating.\" The simple, focused design keeps users informed without overwhelming them, building anticipation while the system constructs their custom film or series.",
        ],
        images: [
          {
            src: "/images/spectra-generating-loader.png",
            alt: "Spectra generating loader screen",
            width: 6912,
            height: 4320,
          },
        ],
      },
      {
        heading: "Movie Playback Screen",
        navLabel: "Playback Screen",
        body: [
          "The movie playback screen features a visually engaging blur effect on the video, embracing glassmorphism for a sleek, modern aesthetic. This treatment draws attention to the content while providing a stylish and contemporary backdrop for playback controls and metadata.",
        ],
        images: [
          {
            src: "/images/spectra-playback.png",
            alt: "Spectra movie playback screen with glassmorphism controls",
            width: 6912,
            height: 4320,
          },
        ],
      },
      {
        heading: "The Process",
        body: [
          "The UX process for Spectra began with defining a user persona and empathy maps to understand the target audience. From there, I crafted the information architecture to ensure a smooth end-to-end flow, which then informed the wireframes and final UI design. The goal at every step was to deliver a seamless experience for crafting AI-generated movies and series.",
        ],
      },
      {
        heading: "Persona",
        body: [
          "During the persona creation phase, I identified the diverse needs and motivations of Spectra's users. By gathering insights into their goals and frustrations, I developed a detailed persona representing creative individuals who love to experiment with technology, express themselves visually, and tell stories without needing a full production studio behind them.",
        ],
        images: [
          {
            src: "/images/spectra-persona.png",
            alt: "Spectra user persona card for Ben Patel",
            width: 4320,
            height: 2284,
          },
        ],
      },
      {
        heading: "Empathy Maps",
        body: [
          "In the empathy mapping phase, I aimed to deepen my understanding of Spectra's users by visually representing their thoughts, feelings, and behaviors. Using insights from user research, I mapped what users said, did, thought, and felt during their creative process. This highlighted key motivations, pain points, and desires, allowing me to empathize with their experiences and design around their real needs instead of assumptions.",
        ],
        images: [
          {
            src: "/images/spectra-empathy-map.png",
            alt: "Spectra empathy map for the Ben persona",
            width: 2560,
            height: 2416,
          },
        ],
      },
      {
        heading: "Ideation",
        body: [
          "In the ideation phase, I focused on developing a comprehensive information architecture for Spectra. By organizing content and defining core user pathways, I created a clear structure for intuitive navigation across the platform. This foundation allowed users to easily explore movie creation options, from style selection and character customization to playback and discovery.",
        ],
        images: [
          {
            src: "/images/spectra-user-flow.png",
            alt: "Spectra user flow diagram covering sign up, home, and profile paths",
            width: 2560,
            height: 2004,
          },
        ],
      },
      {
        heading: "Wireframes",
        body: [
          "In the wireframing phase, I translated the information architecture into low-fidelity layouts that showcased Spectra's core functionality. The focus was on creating a clean, user-friendly interface that simplified movie and TV series creation. Key interactions — such as writing prompts, selecting characters, customizing styles, and outlining plots — were prominently featured. This iterative approach enabled early testing of user flows and interactions before investing in high-fidelity visuals.",
          "1. The AI movie creation experience begins with the user writing a prompt.",
          "2. Once a visual aesthetic has been selected, the user selects various aspects of the movie experience through a swiping interface.",
          "3. Once all selections have been made, the movie is generated and begins playing.",
        ],
        images: [
          {
            src: "/images/spectra-wireframes-flow.png",
            alt: "Spectra wireframe flow from welcome screen through to movie playback",
            width: 2332,
            height: 6480,
          },
        ],
      },
      {
        heading: "Reflections",
        body: [
          "Generative AI Potential — The Spectra project demonstrated the potential of generative AI to empower users in creating their own stories and characters.",
          "User Experience Focus — Focused on developing a seamless user experience that encourages creativity and exploration.",
          "Intuitive Design Insights — Although the project remains a concept, insights from defining the information architecture highlighted the importance of intuitive design in engaging users.",
          "Balancing Aesthetics and Functionality — Learned the necessity of balancing aesthetic appeal with functionality to inspire and support users in crafting unique cinematic experiences.",
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
  video?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "vibe-coding-101-and-figma-make-2",
    title: "Vibe Coding 101 and Figma Make",
    date: "2026-03-08",
    excerpt:
      "Figma Make is like a sketchbook you interact with using English, that moves at the speed of AI generation.",
    video: "/videos/figma-make-widget.mp4",
    image: "/images/cover-vibe-coding-101.png",
    imageAlt: "Abstract chrome sculpture in the shape of a letter",
    imageWidth: 2560,
    imageHeight: 1312,
    body: [
      "If someone asked me to explain Figma Make to them I would tell them its like a sketchbook you interact with using English, that moves at the speed of AI generation.",
      "Wireframes used to be the base level, an entry point into our visual understanding of a piece of software's form and structure. The value of the pencil sketches and the grey boxes in figma has always been speed. \"It's faster than high-fidelity\" \"it can help teams align on ideas early\" all things we learnt in design school, before an era where wireframes would soon feel like more of a tool in a toolbox, and less like the definitive answer to the problem of creating a starting point to align on visual direction early in the design process.",
      "There were so many ideas around how we validate ideas and which tools we reached out for, it all begins to collapse under the rise of generative and agentic design workflows. Suddenly prototyping isn't hidden behind the guarded walls of syntax and advanced Figma or Origami workflows, suddenly English is the prototyping tool of choice, a chat based interaction pattern arguably even more democratic than the GUI as a design interface.",
      "Natural language becomes a tool that blurs, subverts and disrupts various paradigms and assumptions in our conception of how we design interfaces. And so artefacts like wireframes take on a new purpose in the product design process, visual context for an agent in an era where the ceiling for fidelity has been raised, and is being turned upside down and complicated. What's higher fidelity a one-shotted AI prototype with no polish or alignment to our design system or a wireframe with much more accurate design intent. The workflow is now cyborgian, an idea which is inherently postmodern and so lines blur and ideas collapse.",
      "In some workflows, the sketchbook metaphor completely falls apart, take for example how I built Pixel Vault, a tool to help teams store and share code, prompts and prototypes to a shared resource base, think of it as a teams shared second brain for modern UI engineering worklows. I built in 3 days for the Figma Make hackathon, and it's not just a prototype, it… works. It's actual code that works an artefact of a more abstracted workflow, but real nonetheless.",
      "So if you asked me what I thought about Figma Make I would tell you it's the natural conclusion to a shifting cultural context that presents itself as almost like a karmic gift to the designers who grew up on the \"developer ruined the designs\" ux memes and are now lucky enough to have the most high tech genies from frontier tech labs grant them their one and only true wish as product people. To ship with taste, intent and consideration.",
    ],
  },
  {
    slug: "tailwind-the-last-css-framework-3",
    title: "Tailwind the Last CSS Framework?",
    date: "2026-02-28",
    excerpt:
      "Models default to this framework for the art of styling the internet. How did we get here?",
    video: "/videos/tailwind-widget.mp4",
    image: "/images/cover-tailwind-the-last-css-framework.png",
    imageAlt: "Abstract chrome swirl shapes on a light grey background",
    imageWidth: 2560,
    imageHeight: 1312,
    body: [
      "You open up your coding tool of choice, you have some insane idea that you think will optimise your morning routine and maybe just maybe change the world. You tell your agent to have a go at it and it gets to work. You take a look at the syntax because you want to tweak some of the styling yourself so you don't burn through too many tokens on tasks that don't feel worth it \"taste is the moat\" you whisper to yourself as you obsess over border radius, so there you are tweaking utility classes instead of vanilla CSS, how did we get here? Models default to this framework for the art of styling the internet.",
      "The conversation needs us to go back to basics. What is Tailwind? Tailwind is what happened when someone got tired of naming things. Instead of inventing class names and writing CSS in a separate file, you describe your layout inline, in your HTML, using small utility classes that do exactly one thing each. It's verbose in a way that somehow ends up feeling like clarity. It's a design system that speaks like a designer, a set of syntax as rules for quick styling.",
      "So why do models default to Tailwind? and what does this mean for the underlying architecture underneath English as programming abstraction in a new world of programming. Well, there are a couple of reasons why models default to tailwind for one, it's everywhere. Laravel, Vue, Rails, React, even email and React Native. When a model is trained on the collective output of the web, Tailwind shows up more than almost anything else in the styling layer. Statistical likelihood increases, the model reaches for this as the logic prediction, the most likely to work, the thing that will make sense to whoever reads the code next.",
      "But the more interesting reason is why Tailwind became popular in the first place pre-AI, and that's legibility. Tailwind's utility classes map almost directly to design intent. flex, items-center, gap-4 — that reads less like code and more like a design tool in syntax. And so a models doesn't have to invent a styling language or guess at conventions, it just reaches for the one that already sounds like design thinking or at the very least the pattern that has been culturally determined as directionally correct.",
      "And then there's the social reason, the one that matters most. Tailwind solved the problem that no CSS framework before it could — it gave teams a shared vocabulary for styling. The death of obligatory arguing about class names, just a common language everyone agrees on that is as beautiful as it reads. Turns out that's exactly what you need when one of your teammates is a robot.",
    ],
  },
  {
    slug: "dx-as-the-final-ux-meta",
    title: "On Generative UI and DX as the final UX meta",
    date: "2026-03-28",
    excerpt:
      "Non-deterministic UX is an unsolved problem, and Generative UI is about to make it everyone's problem.",
    image: "/images/cover-dx-as-the-final-ux-meta.png",
    imageAlt: "Glowing orange triangle with a blue halo on a black background",
    imageWidth: 2560,
    imageHeight: 1312,
    body: [
      "I remember the first time I experienced good developer experience. I didn't know the term yet, but I felt it and I became obsessed. This was the first time I ever deployed a project to Vercel.",
      "It was so glaringly good and integrated into Git workflows and the UI was so well crafted with so much minimalist attention to detail and intentionality. I was enchanted, not only by the pretty pixels in my deployment platform but by the feeling of being empowered to create and share.",
      "Software is changing. It is now abundant and ubiquitous. A set of patterns and predictions algorithmically predictable to the state of the art intelligence systems. Enter the post chatbot UI hypothesis Generative UI, software that is in a constant state of flux, dynamic, designed with the deepest desire to solve very specific and contextual problems. But a problem arises. Non-deterministic UX is an unsolved pattern. A system in constant flux sounds glamorous, futuristic even, our obsession with \"more\" and novelty could not be more satiated by the idea.",
      "But a bleak reality remains. The socio-cultural artefacts we produce as designers have a massive impact take the $300 million button, a single registration form standing between a user and checkout cost one e-commerce company hundreds of millions before anyone noticed the friction. Or the infinite scroll swallowing whole the ambitions and dreams of millions, an addiction centre in your pocket. Likes and follower counts turn into depression and anxiety. So if humans are in even less control over the interfaces delivered to users, what does a world like that look like in a context where we've begun to understand the virtual can be tragic.",
      "And so in our quest for a more generative and contextual interaction pattern, how much freedom do we give to the opportunities of what could be the form of the interface.",
      "At the core of it all is a problem that spans three layers simultaneously — DX for the agents doing the building, UI for the interfaces they generate, and UX for the humans who ultimately use them. We've collapsed the entire design process into a set of parameters we haven't figured out how to write yet.",
      "New questions arise. What are the parameters for empowering agents to create these interfaces, assuming this is the future. And I guess the answer to that, like most things in life and in working with AI, will depend a whole lot on the context. We've just never had to design for that before.",
    ],
  },
  {
    slug: "on-design-and-the-spectrum-of-technical-ability",
    title: "On abstraction and the spectrum of technical ability",
    date: "2026-02-12",
    excerpt:
      "\"Should designers code?\" is the wrong question — abstraction turned technical ability into a spectrum, and English is its newest layer.",
    image: "/images/cover-spectrum-of-technical-ability.png",
    imageAlt: "Retro dithered green CRT computer illustration on a navy background",
    imageWidth: 2560,
    imageHeight: 1312,
    body: [
      "\"Should designers code?\" If you're anything like me and have been around this industry for a while now, I'm sure that's a question that brings about feelings akin to those you get when a fashion item becomes too trendy and you get visual fatigue from the 22nd pair of Adidas Sambas on your Instagram feed again.",
      "I think this is a conversation in my field that gives me a whole lot of discourse fatigue, because I think it's such a misguided question to begin with and the reality of creation is a bit more messy than the dichotomy of \"designers who code\" vs \"designers who don't\". I mean there are so many different types of developers and that alone tells us that code is a tool that does a lot of jobs, but if we look a bit closer one thing you'll realise is that to some extent it's all a spectrum.",
      "On one end you have designers who aren't interested in shipping any code, maybe they're more interested in other aspects of product design: mapping out flows, information hierarchy, brand identity in product, and so on. On the other end we have design and product engineers, shipping production code and thinking through UI details. In a lot of ways this exists outside of design culture as well, within a spectrum that runs from low level programming all the way up to vibe coders programming in English.",
      "But there is a messy middle that throws the whole notion on its head. To discuss that we first need to talk about abstraction. Abstraction is just a fancy word for how far removed you are from the actual machine. Every programming language ever written has been an attempt to speak less like a computer and more like a human. English is the logical conclusion of that, the final abstraction layer, the one we've been building toward the whole time without knowing it. If English is the hottest new programming language, then jargon becomes the hottest new framework.",
      "The specificity with which you can talk UI is a product design skill that will ultimately matter more, and it's a skill that throws the spectrum of technical ability on its head. If one designer remembers more Tailwind classes and another has a deep understanding of UI components and can prompt with richer context, who would you consider more technical, considering this new abstraction layer is now embedded into the technical paradigm?",
      "So the question shouldn't be whether designers should code or not, but rather how much technical fluency designers should acquire, be it in code or plain English, to create with as much contextual awareness as possible.",
    ],
  },
];
