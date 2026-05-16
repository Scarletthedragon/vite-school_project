import os
from docx import Document

def extract_detailed_context(filepath):
    print(f"--- Detailed Context: {os.path.basename(filepath)} ---")
    doc = Document(filepath)
    paragraphs = list(doc.paragraphs)
    for i, p in enumerate(paragraphs):
        if 'w:drawing' in p._element.xml or 'w:pict' in p._element.xml:
            print(f"\n[Image found in paragraph {i}]")
            # Show previous paragraph
            if i > 0:
                print(f"PREV: {paragraphs[i-1].text[:150]}")
            # Show current text
            print(f"THIS: {p.text[:150]}")
            # Show next paragraph
            if i < len(paragraphs) - 1:
                print(f"NEXT: {paragraphs[i+1].text[:150]}")

extract_detailed_context(r"C:\Users\sharlote\Documents\Izglītojošas Izklaides spēles mājaslapa .docx")
