import json, sys, os

metadata_path = 'tokens/$metadata.json'
if not os.path.exists(metadata_path):
    print(f'ERROR: {metadata_path} not found')
    sys.exit(1)

with open(metadata_path) as f:
    m = json.load(f)

sets = m.get('tokenSetOrder', [])
print(f'Checking {len(sets)} token sets...')
errors = []
for s in sets:
    p = f'tokens/{s}.json'
    if not os.path.exists(p):
        errors.append(f'Missing: {p}')
    else:
        try:
            json.load(open(p))
            print(f'  ok {p}')
        except Exception as e:
            errors.append(f'Invalid JSON {p}: {e}')

if errors:
    print('\nERRORS:')
    for e in errors:
        print(f'  {e}')
    sys.exit(1)

print(f'All {len(sets)} token files valid')
