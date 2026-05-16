import os
from docx import Document
from docx.opc.constants import RELATIONSHIP_TYPE as RT

def inspect_docx(filepath):
    print(f"--- Inspecting: {os.path.basename(filepath)} ---")
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return

    try:
        doc = Document(filepath)
    except Exception as e:
        print(f"Error opening file: {e}")
        return

    # 1 & 2: Count images via relationships
    rels = doc.part.rels
    image_parts = []
    for rel in rels.values():
        if "image" in rel.target_ref:
            image_parts.append(rel.target_part)

    print(f"Contains images: {'Yes' if image_parts else 'No'}")
    print(f"Image count: {len(image_parts)}")

    # 4: Placement context
    print("\nPlacement Context (Paragraph text near images):")
    found_any = False
    for p in doc.paragraphs:
        if 'w:drawing' in p._element.xml or 'w:pict' in p._element.xml:
            found_any = True
            text = p.text.strip()
            context = text if text else "[Image-only paragraph]"
            print(f"Context: {context[:100]}...")
            
    if not found_any and image_parts:
         print("Images found in relationships but not detected in main paragraph body (could be in headers/footers/etc).")

# Using filenames found by Get-ChildItem
inspect_docx(r"C:\Users\sharlote\Documents\Izglītojošas Izklaides spēles mājaslapa .docx")
print("\n" + "="*30 + "\n")
inspect_docx(r"C:\Users\sharlote\Documents\Izglītojošas izklaides spēles mājaslapa (3).docx")
