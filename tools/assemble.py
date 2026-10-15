"""Composites captured frames into README assets (needs Pillow with WebP).
   python3 tools/assemble.py hero        -> assets/hero.webp (+ assets/hero.jpg still)
   python3 tools/assemble.py plate NAME  -> assets/plate-NAME.jpg from tools/.frames/plates/NAME.png
"""
import sys, glob, os
from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
F = os.path.join(ROOT, 'tools', '.frames')
A = os.path.join(ROOT, 'assets')
os.makedirs(A, exist_ok=True)

def hero(fade=16, fps=15, quality=70):
    files = sorted(glob.glob(os.path.join(F, 'hero', 'f*.png')))
    frames = [Image.open(f).convert('RGB') for f in files]
    overlay = Image.open(os.path.join(F, 'hero-overlay.png')).convert('RGBA')
    n = len(frames); m = n - fade
    out = []
    # seamless loop: the last `fade` frames dissolve into the first ones
    for i in range(m):
        f = frames[i]
        if i < fade:
            f = Image.blend(frames[m + i], frames[i], i / fade)
        out.append(Image.alpha_composite(f.convert('RGBA'), overlay).convert('RGB'))
    out[0].save(os.path.join(A, 'hero.webp'), save_all=True, append_images=out[1:], duration=int(1000 / fps), loop=0, quality=quality, method=6)
    out[fade + 8].save(os.path.join(A, 'hero.jpg'), quality=86, optimize=True, progressive=True)
    print('hero', len(out), 'frames', os.path.getsize(os.path.join(A, 'hero.webp')) // 1024, 'kB')

def plate(name, quality=84):
    im = Image.open(os.path.join(F, 'plates', name + '.png')).convert('RGB')
    path = os.path.join(A, 'plate-' + name + '.jpg')
    im.save(path, quality=quality, optimize=True, progressive=True)
    print(name, im.size, os.path.getsize(path) // 1024, 'kB')

if __name__ == '__main__':
    if sys.argv[1] == 'hero': hero()
    else:
        for n in sys.argv[2:]: plate(n)
