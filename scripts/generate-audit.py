import os, datetime

r = {
    'Validate Tokens':   os.environ.get('VALIDATE_RESULT', 'unknown'),
    'Build Tokens':      os.environ.get('BUILD_RESULT', 'unknown'),
    'Lint & TypeScript': os.environ.get('LINT_RESULT', 'unknown'),
    'Unit Tests':        os.environ.get('TEST_RESULT', 'unknown'),
    'Build Storybook':   os.environ.get('STORYBOOK_RESULT', 'unknown'),
    'Chromatic':         os.environ.get('CHROMATIC_RESULT', 'unknown'),
}

overall = 'PASS' if all(v in ('success', 'skipped', 'unknown') for v in r.values()) else 'FAIL'
bc = '#17AB78' if overall == 'PASS' else '#FF0000'
now = datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')

rows = ''
for name, status in r.items():
    if status == 'success':   col, lbl = '#17AB78', 'PASS'
    elif status == 'failure': col, lbl = '#FF0000', 'FAIL'
    elif status == 'skipped': col, lbl = '#949494', 'SKIP'
    else:                     col, lbl = '#E3A92D', 'WARN'
    rows += (
        f'<tr>'
        f'<td style="padding:10px 16px;border-bottom:1px solid #DCDCDC">{name}</td>'
        f'<td style="padding:10px 16px;border-bottom:1px solid #DCDCDC;text-align:center">'
        f'<span style="background:{col};color:#fff;padding:2px 10px;border-radius:4px;font-size:12px;font-weight:700">{lbl}</span>'
        f'</td></tr>'
    )

html = (
    f'<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Audit {now}</title>'
    f'<link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap" rel="stylesheet">'
    f'<style>'
    f'body{{font-family:Source Sans Pro,sans-serif;background:#FAFAFA;margin:0;padding:32px}}'
    f'.card{{background:#fff;border:1px solid #DCDCDC;border-radius:4px;max-width:720px;margin:0 auto}}'
    f'.hdr{{background:#005BA6;color:#fff;padding:24px 32px;border-radius:4px 4px 0 0}}'
    f'.hdr h1{{margin:0;font-size:24px;font-weight:300}}'
    f'.badge{{display:inline-block;background:{bc};color:#fff;padding:4px 16px;border-radius:4px;font-size:14px;font-weight:700;margin-top:12px}}'
    f'table{{width:100%;border-collapse:collapse}}'
    f'th{{text-align:left;padding:10px 16px;background:#F1F1F1;font-size:12px;font-weight:600;color:#777;text-transform:uppercase}}'
    f'</style></head>'
    f'<body><div class="card">'
    f'<div class="hdr"><h1>Design System Pipeline Audit</h1>'
    f'<div style="font-size:13px;opacity:.8;margin-top:4px">Generated {now}</div>'
    f'<div class="badge">{overall}</div></div>'
    f'<table><thead><tr><th>Job</th><th style="text-align:center">Status</th></tr></thead>'
    f'<tbody>{rows}</tbody></table>'
    f'</div></body></html>'
)

os.makedirs('docs/audit', exist_ok=True)
open('docs/audit/index.html', 'w').write(html)
print(f'Audit report written: {overall}')
