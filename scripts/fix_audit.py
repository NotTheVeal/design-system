import os, re

def read(p):
    if not os.path.exists(p): return None
    return open(p).read()

def write(p, c):
    open(p, 'w').write(c)
    print(f"  wrote {p}")

src = 'src'
changed = 0

for root, dirs, files in os.walk(src):
    for fname in files:
        if not fname.endswith(('.jsx', '.tsx', '.js', '.ts', '.stories.jsx', '.stories.tsx')):
            continue
        path = os.path.join(root, fname)
        orig = read(path)
        if orig is None: continue
        c = orig

        # Fix 1: colorScheme current -> future
        c = re.sub(r"colorScheme='current'", "colorScheme='future'", c)
        c = re.sub(r'colorScheme="current"', 'colorScheme="future"', c)
        c = re.sub(r"colorScheme:\s*'current'", "colorScheme: 'future'", c)
        c = re.sub(r'colorScheme:\s*"current"', 'colorScheme: "future"', c)

        # Fix 2: orange #FF9505 -> blue #005BA6
        c = c.replace('#FF9505', '#005BA6')
        c = c.replace('#ff9505', '#005BA6')

        # Fix 3: checkbox/radio size 20px -> 24px
        c = re.sub(r'(width|height):\s*20(?![0-9])', lambda m: m.group(0).replace('20', '24'), c)

        # Fix 4: pageShell height 56 -> 60
        c = re.sub(r'(height|minHeight):\s*56(?![0-9])', lambda m: m.group(0).replace('56', '60'), c)

        # Fix 5: select hover bg #F1F1F1 -> #DCEAED
        c = c.replace("'#F1F1F1'", "'#DCEAED'")
        c = c.replace('"#F1F1F1"', '"#DCEAED"')
        c = re.sub(r"(backgroundColor|background):\s*'#F1F1F1'", lambda m: m.group(0).replace('#F1F1F1', '#DCEAED'), c)

        # Fix 6: table stickyHeader - add if missing
        if 'Table' in fname and 'stickyHeader' not in c:
            c = re.sub(r'(<Table\b)', r'\1 stickyHeader', c)

        # Fix 7: modal maxWidth 600 -> 640
        c = re.sub(r'maxWidth:\s*600(?![0-9])', 'maxWidth: 640', c)
        c = re.sub(r"maxWidth:\s*'600px'", "maxWidth: '640px'", c)

        # Fix 8: ctaBar borderRadius 100 -> 4
        if 'cta' in fname.lower() or 'CtaBar' in fname:
            c = re.sub(r'borderRadius:\s*100(?![0-9])', 'borderRadius: 4', c)

        if c != orig:
            changed += 1
            write(path, c)

print(f"Done. {changed} files updated.")
