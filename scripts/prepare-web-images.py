from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[1]/'dist'/'assets'
old_total=new_total=0
for i in range(10):
 src=root/f'recurso-{i}.png';old_total+=src.stat().st_size
 with Image.open(src) as original:
  for width in (800,1600):
   image=original.copy();image.thumbnail((width,width),Image.Resampling.LANCZOS)
   dst=root/f'recurso-{i}-{width}.webp';image.save(dst,'WEBP',quality=90,method=6)
  new_total+=(root/f'recurso-{i}-1600.webp').stat().st_size
for name,widths in [('logo.png',(320,)),('fluxo.png',(800,1200)),('thiago-mehl-retrato.jpeg',(640,960))]:
 with Image.open(root/name) as original:
  for width in widths:
   image=original.copy();image.thumbnail((width,round(width*original.height/original.width)),Image.Resampling.LANCZOS)
   image.save(root/f'{Path(name).stem}-{width}.webp','WEBP',quality=88,method=6)
print(f'Telas: {old_total:,} → {new_total:,} bytes no conjunto de imagens grandes ({(1-new_total/old_total)*100:.1f}% menor).')
