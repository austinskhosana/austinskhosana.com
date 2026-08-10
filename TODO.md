# TODO

Working list for austinskhosana.com. Check items off as they're done.

## Left to do

- [ ] Polish up case study written content
- [ ] Polish up About Me
- [ ] Sound design — UI sound effects across interactions (window open/close, clicks, terminal typing, etc.)

## Done

- [x] Add more blog articles
- [x] LLM version of me — Groq-backed chat route (`src/app/api/chat/route.ts`) and streaming chat UI in the About Me terminal (unlock-command gate, rate limiting, system prompt); fixed origin-check bypass, markdown leaking into the plain-text terminal, and a flexbox spacing bug in the live prompt row
- [x] ASCII art for all the terminals
- [x] Compress/convert `memoji.mov` to `.mp4` — 12MB → 2MB via macOS's built-in `avconvert`, same resolution
- [x] Improve case study project image quality — Next.js 16 defaulted the Image Optimization API to quality 75 with no `images.qualities` override; added `images.qualities: [100]` to `next.config.ts` and `quality={100}` on every `next/image` usage so screenshots match the uploaded source fidelity
- [x] Adapt the whole site for mobile and iPad — responsive pass across the desktop-window UI, terminals, and layouts
- [x] Add the memoji video to the circle in the header
- [x] Content for the images in the blog articles component/widget — both posts have looping videos in the widget icon slot
- [x] Add images to the case study covers — thespectator, comments-moderation, spectra-2, and pixelvault all have covers (homepage grid + case study header wired to `project.image`)
- [x] Finish the "Pixel Vault" case study — sections fleshed out with real copy; all video files in place
- [x] Work on the "The Spectator" case study
- [x] Work on the "Coeditor" case study — full section copy + all 6 screenshots wired in
- [x] Work on the "Spectra" case study — full section copy + all 11 screenshots wired in
- [x] Add real items to `playgroundItems` in `lib/data.ts`
- [x] Copy email button in the header
- [x] Add the correct logos to the tool stack section
- [x] Right icon for the tool stack section copy
- [x] Playground page — create different sections for the different exploration items: illustration, design, and code
