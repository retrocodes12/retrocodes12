// Catalogue data. Only PUBLIC repos go here: a visitor who clicks must land on something.
// Keep copy specific: nouns and numbers from the actual projects.
export const GH = 'https://github.com/retrocodes12';
const io = (p) => `https://retrocodes12.github.io/${p}/`;

// Flagships: each gets a plate (a real frame from the project + a name band).
// `frame` is a capture in tools/.frames/plates (see tools/capture/plates.mjs). `crop` is [x, y, w] in frame
// pixels; the height follows from the plate's 1600×760 window, and anything past the frame edge is `bg`.
export const flagships = [
  { key: 'ultracraft', name: 'Ultracraft', kind: 'Voxel engine', url: `${GH}/ultracraft`, frame: 'ultracraft.png', crop: [0, 120, 1600],
    md: `A Minecraft-style sandbox in one HTML file, pushed toward real light: procedural PBR textures, a physical sky, cascaded shadows, reflective water. [Play it in the browser](${io('ultracraft')}).`,
    meta: 'THREE.JS · NO TEXTURE FILES · 4,600 LINES' },
  { key: 'nebula', name: 'Nebula Player', kind: 'Streaming player', url: `${GH}/nebula-player`, frame: 'nebula-promo.png', crop: [33, 200, 1853], bg: '#07080b',
    md: `A free player for the TV, the desktop and the phone. Add a source and it becomes a library with artwork, episode lists, subtitles, and your place kept across screens. One shared player for the web and LG webOS, plus native apps for [Android and Android TV](${GH}/nebula-android), [Windows](${GH}/nebula-desktop) and [macOS](${GH}/nebula-mac). [play.rifflehq.in](https://play.rifflehq.in)`,
    meta: 'TYPESCRIPT · KOTLIN · SWIFT · ★ 12 ACROSS FOUR REPOS' },
  { key: 'evolution-sim', name: 'Evolution Sim', kind: 'Simulation', url: `${GH}/evolution-sim`, frame: 'evolution-sim.png', crop: [90, 70, 1000], bg: '#0a0c0e',
    md: `Creatures with energy budgets and heritable genes, and nothing scripted past that. Predator–prey arms races, genealogies and new species emerge on their own; rewind, branch and compare timelines. [Run it](${io('evolution-sim')}).`,
    meta: 'VANILLA JS · ZERO DEPENDENCIES · MULTI-SEED TESTS' },
  { key: 'terminus', name: 'Terminus', kind: 'A clock for the decade', url: `${GH}/terminus`, frame: 'terminus.png', crop: [-231, 20, 2063], bg: '#101113',
    md: `The 522 weeks of the 2020s as a wall of lights. One goes out every week until 00:00 UTC, 1 January 2030, and a daily Action commits the count. [Watch it happen](${io('terminus')}).`,
    meta: 'ONE PAGE · ONE ACTION · 522 LIGHTS' },
  { key: 'print-room', name: 'Print Room', kind: 'Poster press', url: `${GH}/print-room`, frame: 'print-room.png', crop: [-42, 90, 1684], bg: '#0a0a0a',
    md: `Every [visit](${io('print-room')}) prints a numbered poster from the collection's identity. The edition number in the URL is the poster: same number, same print, forever.`,
    meta: 'ONE HTML FILE · NO BUILD · NO LIBRARIES' },
];

// Smaller pieces: plain markdown, no plates.
export const shelf = [
  ['graph-graffiti', `${GH}/graph-graffiti`, `Draws text and sprites on a contribution graph with backdated empty commits. [arcade-wing](${GH}/arcade-wing) is five invaders drawn that way, in 2,100 commits.`],
  ['context-relay', `${GH}/context-relay`, 'A Claude Code mod that hands your work to a fresh session before a long context wears the model down, and keeps going there.'],
  ['rigor', `${GH}/rigor`, 'A fact-checking protocol for AI chatbots, with explicit countermeasures for the usual reasoning biases.'],
  ['sleeve', `${GH}/sleeve`, `A Spotify-shaped music player, painted orange. [Open it](${io('sleeve')}).`],
  ['NebulaStreams', `${GH}/NebulaStreams`, 'A Node streaming server: torrent streaming, HTTP proxying, and a disk-backed cache.'],
];
