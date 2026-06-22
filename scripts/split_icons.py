from PIL import Image
import os

img = Image.open(r'C:\Users\yangwei\WorkBuddy\2026-06-21-04-31-50\网站功能图标.png')
w, h = img.size
print(f'Image size: {w}x{h}')

n = 5
slice_w = w // n
top = int(h * 0.25)
bottom = int(h * 0.62)
out_dir = r'C:\Users\yangwei\WorkBuddy\2026-06-21-04-31-50\zhiying-web\public\assets\icons'
os.makedirs(out_dir, exist_ok=True)
names = ['icon-knowledge.png', 'icon-jd.png', 'icon-match.png', 'icon-resume.png', 'icon-interview.png']
for i, name in enumerate(names):
    left = i * slice_w
    right = left + slice_w if i < n - 1 else w
    slice_img = img.crop((left, top, right, bottom))
    slice_img.save(os.path.join(out_dir, name))
    print(f'Saved {name} ({slice_img.size})')
