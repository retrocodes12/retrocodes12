// Catalogue data for the realm. Keep copy specific: nouns and numbers from the actual projects.
export const GH = 'https://github.com/retrocodes12';
export const great = [
  { key: 'machine-room', name: 'machine-room', url: `${GH}/machine-room`, live: 'https://retrocodes12.github.io/machine-room/', liveText: 'Insert a cartridge', device: 'cartridge',
    desc: "a Game Boy emulator: SM83, scanline PPU, four-voice sound, in 1,164 lines with no dependencies. Passes Blargg's CPU tests and renders dmg-acid2 pixel-perfect.", meta: '2026 · ZERO DEPENDENCIES · HARDWARE-TEST VERIFIED' },
  { key: 'sculpture-hall', name: 'sculpture-hall', url: `${GH}/sculpture-hall`, live: 'https://retrocodes12.github.io/sculpture-hall/', liveText: 'Walk the hall', device: 'cube',
    desc: 'a 3D renderer with no GPU: matrices, near-plane clipping, z-buffer, perspective-correct texturing, written longhand.', tail: ', or drop your own .obj onto the plinth.', meta: '2026 · ZERO DEPENDENCIES · ZERO WEBGL · 36 TESTS' },
  { key: 'nebulastreams', name: 'NebulaStreams V2', url: `${GH}/NebulaStreams-V2`, device: 'play',
    desc: 'hybrid streaming server: torrent streaming, HTTP proxying, and a disk-backed cache.', meta: '2026 · JAVASCRIPT · ★ 8' },
  { key: 'nebula-player', name: 'Nebula Player', url: `${GH}/nebula-player`, device: 'rooms',
    desc: 'one streaming player, four rooms: web, Android, desktop, and a shared watch-party.', meta: '2026 · TYPESCRIPT + KOTLIN · ★ 2',
    links: [['web', 'https://retrocodes12.github.io/nebula-player/'], ['Android', `${GH}/nebula-android`], ['desktop', `${GH}/nebula-desktop`], ['watch-party', `${GH}/nebula-party`]] },
  { key: 'trustpacket', name: 'TrustPacket', url: `${GH}/trustpacket`, device: 'scales',
    desc: 'three-way trust reconciliation for law-firm client accounts. Two exports in, a signed packet out.', meta: '2026 · NODE + SQLITE · NO EXTERNAL SERVICES' },
  { key: 'flowwatch', name: 'FlowWatch', url: `${GH}/flowwatch`, live: 'https://retrocodes12.github.io/flowwatch-site/', liveText: 'site', device: 'eye',
    desc: 'cross-client monitoring for n8n and Make automations, with white-label monthly reports.', meta: '2026 · JAVASCRIPT · ZERO DEPENDENCIES' },
  { key: 'last-samurai', name: 'The Last Samurai', url: `${GH}/the-last-samurai-film`, device: 'blade',
    desc: 'a wordless cinematic scroll film in six movements. No dialogue, no chrome; the scrollbar is the projector.', meta: '2026 · HTML · ONE PAGE' },
  { key: 'monochrome', name: 'Monochrome for Android', url: `${GH}/monochrome-android`, device: 'half',
    desc: 'a Spotify-style Monochrome client packaged as an Android app.', meta: '2026 · JAVASCRIPT · ★ 2' },
];
export const council = [
  { key: 'graph-graffiti', name: 'graph-graffiti', url: `${GH}/graph-graffiti`, device: 'grid',
    desc: 'draw text and sprites on a contribution graph in backdated empty commits. The studio behind the arcade wing, cleaned up and handed to visitors.', meta: '2026 · NODE · ONE FILE · ZERO DEPENDENCIES' },
  { key: 'arcade-cabinet', name: 'arcade-cabinet', url: `${GH}/arcade-cabinet`, device: 'invader',
    desc: 'Space Invaders in the terminal. The invaders on the graph don\'t move; these do.', meta: '2026 · NODE · 385 LINES · ONE COLOR SPENT ON BULLETS', links: [['the graph', `${GH}/arcade-wing`]] },
  { key: 'print-room', name: 'print-room', url: `${GH}/print-room`, live: 'https://retrocodes12.github.io/print-room/', liveText: 'visit', device: 'fold',
    desc: 'a poster press. Every visit prints a numbered edition from the collection\'s identity; the number in the URL is the poster.', meta: '2026 · ONE HTML FILE · EDITION OF ONE' },
  { key: 'the-vault', name: 'the-vault', url: `${GH}/the-vault`, device: 'keyhole',
    desc: 'the storage basement, navigable entirely in markdown. The receiving books run to 27. This page says 26. Someone should look into that.', meta: '2026 · NO CODE · 17 ROOMS · ONE MISSING EXHIBIT' },
];
export const storage = 'North of the Wall, in storage: an emergency-line triage engine, an app that locks a phone against its owner\'s worse instincts, an invoice tool on its second payment processor, an intent radar for a noisy social network, and a reorder planner for shopkeepers.';
export const storageSub = 'STORAGE IS NOT EXILE · PIECES RETURN';
export const raven = 'The realm is kept by one person. Every holding accepts issues and pull requests; that is how a raven is sent. New pieces appear without banners.';
export const ravenSub = 'THE GATES ARE ALWAYS OPEN · NO TOLL';
