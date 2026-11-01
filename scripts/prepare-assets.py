"""One-time, local preparation. Requires Pillow and PyMuPDF; original files stay unchanged."""
from pathlib import Path
import argparse
import sys
import re

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / ".tools"))
from PIL import Image, ImageDraw, ImageFont
import pymupdf

parser = argparse.ArgumentParser()
parser.add_argument("--source-dir", required=True)
args = parser.parse_args()
source = Path(args.source_dir)
images = ROOT / "public/images"
pdfs = ROOT / "public/resume"
qa = ROOT / ".qa"
for folder in [images, pdfs, qa]:
    folder.mkdir(parents=True, exist_ok=True)

# Only resize / encode. Face, colours and features are not retouched.
portrait = Image.open(next(source.glob("*.jpg"))).convert("RGB")
portrait.thumbnail((800, 1067), Image.Resampling.LANCZOS)
portrait.save(images / "ruslan-portrait.webp", quality=88, method=6)

font_regular = "C:/Windows/Fonts/segoeui.ttf"
font_bold = "C:/Windows/Fonts/segoeuib.ttf"
cover = Image.new("RGB", (1200, 630), "#0b1420")
draw = ImageDraw.Draw(cover)
draw.text((65, 65), "ENGINEERING PORTFOLIO", font=ImageFont.truetype(font_regular, 17), fill="#83c8ed")
draw.text((65, 155), "Руслан Эхтибаров", font=ImageFont.truetype(font_regular, 31), fill="#b6cbdc")
draw.text((60, 225), "Инженер-", font=ImageFont.truetype(font_bold, 66), fill="#f1f5f8")
draw.text((60, 303), "конструктор", font=ImageFont.truetype(font_bold, 66), fill="#f1f5f8")
draw.text((65, 447), "3D-модели. Испытания. Производство.", font=ImageFont.truetype(font_regular, 21), fill="#a6b7c8")
draw.line((65, 530, 645, 530), fill="#2b3c4d", width=1)
draw.text((65, 551), "Санкт-Петербург  /  Опыт в НПП «ЭПРО» с 2021 года", font=ImageFont.truetype(font_regular, 17), fill="#a6b7c8")
photo = portrait.copy()
photo.thumbnail((405, 540), Image.Resampling.LANCZOS)
cover.paste(photo, (750, 45))
draw.rectangle((744, 39, 1161, 591), outline="#64869d", width=1)
cover.save(images / "og-cover.jpg", quality=88, optimize=True)
icon = Image.new("RGB", (180, 180), "#101e2d")
icon_draw = ImageDraw.Draw(icon)
icon_draw.rectangle((20, 20, 160, 160), outline="#51687a", width=2)
icon_draw.text((33, 42), "РЭ", font=ImageFont.truetype(font_bold, 70), fill="#83c8ed")
icon.save(ROOT / "public/apple-touch-icon.png")

# Redaction removes the text from PDF streams; it is not a visual overlay.
doc = pymupdf.open(next(source.glob("*.pdf")))
p = doc[0]
dark = (16/255, 25/255, 37/255)
light = (244/255, 245/255, 250/255)
ink = (17/255, 25/255, 35/255)
p.add_redact_annot(pymupdf.Rect(46, 371, 177, 402), fill=False)
p.add_redact_annot(pymupdf.Rect(226, 142, 565, 237), fill=(1, 1, 1))
p.add_redact_annot(pymupdf.Rect(233, 258, 290, 279), fill=light)
p.add_redact_annot(pymupdf.Rect(424, 622, 559, 646), fill=False)
p.apply_redactions(images=0, graphics=0)
p.insert_font(fontname="publicfont", fontfile=font_regular)
p.insert_font(fontname="publicbold", fontfile=font_bold)
summary = "Инженер с опытом работы в НПП силовой электроники для электротранспорта с февраля 2021 года. Прошёл путь от выездного техника до инженера-конструктора: диагностика на объекте, испытания, электрические схемы, 3D-моделирование и КД. Сопровождаю изделия на производстве, участвую в корректировке конструкции при первой сборке. Есть опыт руководства сервисной группой."
remaining = p.insert_textbox(pymupdf.Rect(226.8, 144, 562, 237), summary, fontname="publicfont", fontsize=9.4, lineheight=1.55, color=ink)
assert remaining >= 0, "Summary overflows"
p.insert_text((235, 274), "с 2021", fontname="publicbold", fontsize=14, color=ink)
p.insert_text((47.6, 382), "С февраля 2021", fontname="publicfont", fontsize=8, color=(.82, .86, .9))
p.insert_text((47.6, 394), "работа в НПП «ЭПРО»", fontname="publicfont", fontsize=7, color=(.57, .65, .72))
p.insert_text((461, 638), "рост внутри компании", fontname="publicfont", fontsize=7.5, color=(.67, .73, .81))
# Remove stale driving duration as well; unrelated hobby information is preserved.
for page in doc:
    for rect in page.search_for("стаж вождения 1 год 5 месяцев"):
        page.add_redact_annot(rect + (-1, -1, 1, 1), fill=False)
    page.apply_redactions(images=0, graphics=0)
doc.set_metadata({"title": "Руслан Эхтибаров — инженер-конструктор", "author": "Руслан Эхтибаров", "subject": "Публичная версия резюме без даты рождения и возраста"})
doc.subset_fonts()
destination = pdfs / "ruslan-ekhtibarov.pdf"
doc.save(destination, garbage=4, deflate=True)
doc.close()
with pymupdf.open(destination) as checked:
    text = "\n".join(page.get_text() for page in checked)
    assert not re.search(r"\b\d{2}\.\d{2}\.\d{4}\b", text), "Unexpected full personal date"
    for forbidden in ["дата рождения", "4,7 года", "4 года 8 месяцев", "почти 5-летним", "стаж вождения 1 год 5 месяцев"]:
        assert forbidden not in text, forbidden
    assert "с февраля 2021 года" in text
    for i, page in enumerate(checked):
        page.get_pixmap(matrix=pymupdf.Matrix(1.4, 1.4)).save(qa / f"public-resume-{i+1}.png")
print("Prepared portrait, Open Graph cover, touch icon and redacted public PDF; source files unchanged.")
