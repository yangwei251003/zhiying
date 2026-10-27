from PIL import Image
import os
import argparse
from pathlib import Path

parser = argparse.ArgumentParser(description="Split an input icon sheet into five project icons")
parser.add_argument("image", type=Path, help="Input icon sheet; not included in this repository")
parser.add_argument("--output", type=Path, default=Path(__file__).resolve().parents[1] / "public/assets/icons")
args = parser.parse_args()

img = Image.open(args.image)
w, h = img.size
print(f'Image size: {w}x{h}')

n = 5
slice_w = w // n
top = int(h * 0.25)
bottom = int(h * 0.62)
out_dir = args.output
os.makedirs(out_dir, exist_ok=True)
names = ['icon-knowledge.png', 'icon-jd.png', 'icon-match.png', 'icon-resume.png', 'icon-interview.png']
for i, name in enumerate(names):
    left = i * slice_w
    right = left + slice_w if i < n - 1 else w
    slice_img = img.crop((left, top, right, bottom))
    slice_img.save(os.path.join(out_dir, name))
    print(f'Saved {name} ({slice_img.size})')
