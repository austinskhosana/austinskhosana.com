# TODO

Working list for austinskhosana.com. Check items off as they're done.

## Executable now

### Other

- [ ] **Next up** — LLM version of me — the biggest chunk of work. Groq-backed chat route (`src/app/api/chat/route.ts`) and streaming chat UI in the About Me terminal already exist (unlock-command gate, rate limiting, system prompt); needs finishing/polish
- [x] ASCII art for all the terminals
- [x] Compress/convert `memoji.mov` to `.mp4` — 12MB → 2MB via macOS's built-in `avconvert`, same resolution
- [x] Improve case study project image quality — Next.js 16 defaulted the Image Optimization API to quality 75 with no `images.qualities` override; added `images.qualities: [100]` to `next.config.ts` and `quality={100}` on every `next/image` usage so screenshots match the uploaded source fidelity

### Responsiveness

- [ ] Adapt the whole site for mobile and iPad — the desktop-window UI, terminals, and layouts need a responsive pass across the whole site, not just one feature. **Do this last, after all content is in.**

## Blocked by content

- [x] Add the memoji video to the circle in the header
- [x] Content for the images in the blog articles component/widget — both posts now have looping videos in the widget icon slot
- [ ] Add images to the case study covers — thespectator, comments-moderation, spectra-2 now have covers (homepage grid + case study header both wired to `project.image`); pixelvault still needs one
- [ ] Finish the "Pixel Vault" case study — sections fleshed out with real copy; DX in the Coding Sandbox and Vibe Coded Design Tools have images; UI Components, Prototypes, and Prompts & Templates still need video files (coming from the other computer)
- [x] Work on the "The Spectator" case study
- [x] Work on the "Coeditor" case study — full section copy + all 6 screenshots wired in
- [x] Work on the "Spectra" case study — full section copy + all 11 screenshots wired in
- [ ] Add real items to `playgroundItems` in `lib/data.ts` — categories are wired up but the array is empty, so each section currently shows "nothing here yet"
- [ ] Add more blog articles

## Done

- [x] Copy email button in the header
- [x] Add the correct logos to the tool stack section
- [x] Right icon for the tool stack section copy
- [x] Playground page — create different sections for the different exploration items: illustration, design, and code
