import docx
import sys

def get_docx_content(path):
    try:
        doc = docx.Document(path)
        content = []
        for p in doc.paragraphs:
            if p.text.strip():
                content.append(p.text.strip())
        return content
    except Exception as e:
        return [f'Error reading {path}: {str(e)}']

# Updated path based on Get-ChildItem results
file1 = r'C:\Users\sharlote\Documents\Izglītojošas Izklaides spēles mājaslapa .docx'
file2 = r'C:\Users\sharlote\Documents\Izglītojošas izklaides spēles mājaslapa (3).docx'

print('--- FILE 1 (Original) ---')
content1 = get_docx_content(file1)
for line in content1[:100]: # Print more to be sure
    print(line)

print('\n' + '='*50 + '\n')

print('--- FILE 2 (Rewritten) ---')
content2 = get_docx_content(file2)
for line in content2[:100]:
    print(line)
