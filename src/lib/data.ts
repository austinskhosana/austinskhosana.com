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
};

export const playgroundItems: PlaygroundItem[] = [];

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
  gallery?: { src: string; alt: string; width: number; height: number }[];
  sections: {
    heading: string;
    body: string[];
    images?: { src: string; alt: string; width: number; height: number }[];
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
        heading: "DX in the Coding Sandbox",
        body: [
          "This screen was really interesting to design because I had to think very intentionally about developer experience and polish. I was using Claude Sonnet, and initially the UI was just plain text with no context, no hierarchy, and no colour. So I added structure, visual cues, and AI hints, because whenever I'm in one of these online coding sandboxes I always miss the IDE plugins that give you a similar experience.",
        ],
        images: [
          {
            src: "/images/pixelvault-coding-sandbox.png",
            alt: "Pixel Vault coding sandbox showing the Animated Gradient Text component",
            width: 4320,
            height: 2960,
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
      },
      {
        heading: "Vibe Coded Design Tools",
        body: [
          "In the age of democratised software creation, designers are creating their own tools — plugins, micro-apps, and internal utilities — and I wanted this to be a place where those tools can be shared and stored within teams.",
        ],
        images: [
          {
            src: "/images/pixelvault-design-tools.png",
            alt: "Pixel Vault Design Tools page with Type Scale Generator and Spacing Visualizer",
            width: 4320,
            height: 2960,
          },
        ],
      },
      {
        heading: "Learnings & Outcomes",
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
    imageAlt: "The Spectator gift subscription flow",
    imageWidth: 4228,
    imageHeight: 2960,
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
            src: "/images/spectator-user-flows.png",
            alt: "The Spectator gift subscription user flows for fixed term and auto renewing gifts",
            width: 4320,
            height: 2960,
          },
        ],
      },
      {
        heading: "Wireframes",
        body: [
          "This is where collaboration began. We started wireframing the experience to clarify what we wanted the UI to look and feel like, without yet focusing on brand identity. This helped us align early and commit to a clear direction for layout and interaction.",
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
            width: 4320,
            height: 2960,
          },
          {
            src: "/images/spectator-ui-terms-bestvalue.png",
            alt: "Gift subscription terms screen with annual one-off payment as best value",
            width: 4320,
            height: 2960,
          },
          {
            src: "/images/spectator-ui-gift-type.png",
            alt: "Gift subscription type screen with digital only selected",
            width: 4320,
            height: 2960,
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
    imageWidth: 4228,
    imageHeight: 2960,
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
        heading: "CSS Animations & the Loader",
        body: [
          "Starting with an open-source loader, I adapted it for light-mode compatibility. The design used colour as a visual signal: a classic set of colours for approvals and acceptances, and a pink-and-blue colourway for the primary loading state.",
        ],
        images: [
          {
            src: "/images/coeditor-css-spinner-code.png",
            alt: "CSS code for the pink and blue gradient loader animation",
            width: 2200,
            height: 1507,
          },
        ],
      },
      {
        heading: "Tradeoffs and Direction Change",
        body: [
          "The colorful loader clashed with various publisher brands. The team pivoted to a simple open-source search icon, with colours edited to better adapt to different brand environments.",
        ],
        images: [
          {
            src: "/images/coeditor-loader-final.png",
            alt: "Final monochrome moderating feedback loader in the comment editor",
            width: 2200,
            height: 1507,
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
            width: 2200,
            height: 1507,
          },
        ],
      },
      {
        heading: "UX Writing Challenge",
        body: [
          "This proved most difficult: delivering AI-based feedback that is both contextual and non-deterministic, while maintaining an empathetic tone across diverse publishers.",
        ],
        images: [
          {
            src: "/images/coeditor-moderation-feedback.png",
            alt: "Comment editor showing AI moderation feedback on a flagged comment",
            width: 2200,
            height: 1507,
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
            width: 2200,
            height: 1507,
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
            width: 780,
            height: 532,
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
    image: "/images/cover-spectra-2.png",
    imageAlt: "Spectra — series and movies with infinite possibilities",
    imageWidth: 4228,
    imageHeight: 2960,
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
        images: [
          {
            src: "/images/spectra-onboarding.png",
            alt: "Spectra welcome screen with sign up options",
            width: 4320,
            height: 2960,
          },
        ],
      },
      {
        heading: "Prompt Input & Featured Content",
        body: [
          "The home screen features a prompt input area where users can start generating a movie or series in their own words. Below the prompt, users can scroll through featured content generated by others, showcasing community creativity and providing inspiration for new stories.",
        ],
        images: [
          {
            src: "/images/spectra-home.png",
            alt: "Spectra home screen with prompt input and featured content",
            width: 4320,
            height: 2960,
          },
        ],
      },
      {
        heading: "AI Video Aesthetic Builder UI Workflow",
        body: [
          "In the movie curation experience, users start by selecting the visual aesthetic, ranging from realism to anime and other stylized looks. A rich set of options is presented in a visual grid, and users can click refresh to generate a new set of aesthetics if they don't find something they like. This keeps exploration lightweight and fun while still feeling curated.",
        ],
        images: [
          {
            src: "/images/spectra-aesthetic-selector.png",
            alt: "Spectra select a visual aesthetic screen",
            width: 4320,
            height: 2960,
          },
        ],
      },
      {
        heading: "Movie/Show Description",
        body: [
          "The movie/show description screen allows users to watch the selected film or episode, read a concise description of the story and characters, and discover similar titles through tailored recommendations. This deepens engagement by helping users understand the narrative context and quickly jump into related content they might enjoy.",
        ],
        images: [
          {
            src: "/images/spectra-movie-description.png",
            alt: "Spectra movie description screen for Boys Love Aspen",
            width: 4320,
            height: 2960,
          },
        ],
      },
      {
        heading: "Generated Character Selector Screen",
        body: [
          "This Tinder-style swiping screen lets users easily curate their movie by swiping right on characters, styling options, or locations they want to include, and left to dismiss those they don't. The familiar interaction pattern lowers friction and turns the customization process into an engaging, game-like experience.",
        ],
        images: [
          {
            src: "/images/spectra-character-selector.png",
            alt: "Spectra character selector screen with swipeable character cards",
            width: 4320,
            height: 2960,
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
            width: 4320,
            height: 2960,
          },
        ],
      },
      {
        heading: "Movie Playback Screen",
        body: [
          "The movie playback screen features a visually engaging blur effect on the video, embracing glassmorphism for a sleek, modern aesthetic. This treatment draws attention to the content while providing a stylish and contemporary backdrop for playback controls and metadata.",
        ],
        images: [
          {
            src: "/images/spectra-playback.png",
            alt: "Spectra movie playback screen with glassmorphism controls",
            width: 4320,
            height: 2960,
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
            width: 2560,
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
};

export const blogPosts: BlogPost[] = [
  {
    slug: "vibe-coding-101-and-figma-make-2",
    title: "Vibe Coding 101 and Figma Make",
    date: "2026-03-08",
    excerpt:
      "Figma Make is like a sketchbook you interact with using English, that moves at the speed of AI generation.",
    video: "/videos/figma-make-widget.mp4",
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
    video: "/videos/tailwind-widget.mp4",
    body: [
      "You open up your coding tool of choice, you have some insane idea that you think will optimise your morning routine and maybe just maybe change the world. You tell your agent to have a go at it and it gets to work. You take a look at the syntax because you want to tweak some of the styling yourself so you don't burn through too many tokens on tasks that don't feel worth it — \"taste is the moat\" you whisper to yourself as you obsess over border radius. So there you are, tweaking utility classes instead of vanilla CSS. How did we get here? Models default to this framework for the art of styling the internet.",
      "The conversation needs us to go back to basics. What is Tailwind? Tailwind is what happened when someone got tired of naming things. Instead of inventing class names and writing CSS in a separate file, you describe your layout inline, in your HTML, using small utility classes that do exactly one thing each. It's verbose in a way that somehow ends up feeling like clarity. It's a design system that speaks like a designer — a set of syntax as rules for quick styling.",
      "So why do models default to Tailwind, and what does this mean for the underlying architecture underneath English as programming abstraction in a new world of programming? Well, there are a couple of reasons. For one, it's everywhere — Laravel, Vue, Rails, React, even email and React Native. When a model is trained on the collective output of the web, Tailwind shows up more than almost anything else in the styling layer. Statistical likelihood increases; the model reaches for this as the logical prediction, the thing most likely to work, the thing that will make sense to whoever reads the code next.",
      "But the more interesting reason is why Tailwind became popular in the first place, pre-AI — and that's legibility. Tailwind's utility classes map almost directly to design intent. flex, items-center, gap-4 — that reads less like code and more like a design tool in syntax. A model doesn't have to invent a styling language or guess at conventions; it just reaches for the one that already sounds like design thinking, or at the very least the pattern that has been culturally determined as directionally correct.",
      "And then there's the social reason, the one that matters most. Tailwind solved the problem that no CSS framework before it could — it gave teams a shared vocabulary for styling. The death of obligatory arguing about class names, just a common language everyone agrees on that is as beautiful as it reads. Turns out that's exactly what you need when one of your teammates is a robot.",
    ],
  },
];
