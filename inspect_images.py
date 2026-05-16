import os
from docx import Document
from docx.opc.constants import RELATIONSHIP_TYPE as RT

def inspect_docx(filepath):
    print(f"--- Inspecting: {filepath} ---")
    if not os.path.exists(filepath):
        print("File not found.")
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

    # 3: Image filenames
    if image_parts:
        print("Image filenames (internal):")
        for part in image_parts:
            print(f" - {part.partname}")

    # 4: Placement context
    print("\nPlacement Context (First 50 chars of paragraph containing images):")
    found_any = False
    for p in doc.paragraphs:
        # Check if the paragraph has a run with a drawing or picture
        # python-docx doesn't easily map runs to specific images via high-level API
        # but we can look for 'drawing' or 'picture' elements in the xml
        if 'w:drawing' in p._element.xml or 'w:pict' in p._element.xml:
            found_any = True
            text = p.text.strip()
            # If no text in the paragraph itself, check surrounding paragraphs
            context = text if text else "[Image-only paragraph]"
            print(f"Context: {context[:100]}...")
            
    if not found_any and image_parts:
         print("Images found in relationships but not detected in main paragraph body (could be in headers/footers/etc).")

inspect_docx(r"C:\Users\sharlote\Documents\Izglītojošas Izklaides spēles mājaslapa  (1).docx")
print("\n" + "="*30 + "\n")
inspect_docx(r"C:\Users\sharlote\Documents\Izglītojošas izklaides spēles mājaslapa (3).docx")
