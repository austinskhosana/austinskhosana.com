# TODO

Working list for austinskhosana.com. Check items off as they're done.

## Executable now

### Other

- [ ] **Next up** — LLM version of me — the biggest chunk of work. Groq-backed chat route (`src/app/api/chat/route.ts`) and streaming chat UI in the About Me terminal already exist (unlock-command gate, rate limiting, system prompt); needs finishing/polish
- [ ] ASCII art for all the terminals — Playground and About Me have drafts but need polish, far from done; Blog terminal still needs one

### Responsiveness

- [ ] Adapt the whole site for mobile and iPad — the desktop-window UI, terminals, and layouts need a responsive pass across the whole site, not just one feature. **Do this last, after all content is in.**

## Blocked by content

- [ ] Add the memoji video to the circle in the header — waiting on the file from another device
- [ ] Content for the images in the blog articles component/widget
- [ ] Add images to the case study covers — thespectator, comments-moderation, spectra-2 now have covers (homepage grid + case study header both wired to `project.image`); pixelvault still needs one
- [ ] Work on the "Pixel Vault" case study
- [ ] Work on the "The Spectator" case study
- [ ] Work on the "Coeditor" case study
- [ ] Work on the "Spectra" case study
- [ ] Add real items to `playgroundItems` in `lib/data.ts` — categories are wired up but the array is empty, so each section currently shows "nothing here yet"
- [ ] Add more blog articles

## Done

- [x] Copy email button in the header
- [x] Add the correct logos to the tool stack section
- [x] Right icon for the tool stack section copy
- [x] Playground page — create different sections for the different exploration items: illustration, design, and code
