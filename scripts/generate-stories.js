const fs = require('fs'), path = require('path');
const DIR = path.join(__dirname, '..', 'src', 'components');

function parseProps(src) {
  const m = src.match(/interface\s+\w+Props\s*\{([^}]+)\}/s);
  if (!m) return [];
  return m[1].split('\n').flatMap(l => {
    const r = l.match(/^\s+(\w+)(\?)?: (.+?);?\s*$/);
    return r ? [{ n: r[1], o: !!r[2], t: r[3].trim() }] : [];
  });
}

function dflt(n, t) {
  const tl = t.toLowerCase();
  if (n === 'children') return "'Content goes here'";
  if (n === 'title') return "'Sample Title'";
  if (n === 'label') return "'Label'";
  if (n === 'placeholder') return "'Enter value...'";
  if (n === 'description') return "'A brief description.'";
  if (n === 'errorMessage') return "'This field is required.'";
  if (n === 'href') return "'#'";
  if (n === 'src') return "'https://via.placeholder.com/40'";
  if (tl === 'boolean') return 'true';
  if (tl === 'number') return '1';
  if (tl.startsWith('() =>') || tl.includes('=>')) return '() => {}';
  if (tl.includes('reactnode')) return "'Sample content'";
  if (tl.includes("'") && tl.includes('|')) return tl.split('|')[0].trim();
  return `'${n}'`;
}

function ctrl(t) {
  const tl = t.toLowerCase();
  if (tl === 'boolean') return "{ control: 'boolean' }";
  if (tl === 'number') return "{ control: 'number' }";
  if (tl.startsWith('() =>') || tl.includes('=>')) return "{ action: 'called' }";
  if (tl.includes("'") && tl.includes('|')) {
    const opts = tl.split('|').map(s => s.trim().replace(/'/g, ''));
    return `{ control: 'select', options: ${JSON.stringify(opts)} }`;
  }
  return "{ control: 'text' }";
}

let created = 0;
fs.readdirSync(DIR, { withFileTypes: true })
  .filter(e => e.isDirectory())
  .forEach(e => {
    const name = e.name;
    const Name = name[0].toUpperCase() + name.slice(1);
    const src = path.join(DIR, name, `${name}.tsx`);
    const out = path.join(DIR, name, `${Name}.stories.tsx`);
    if (!fs.existsSync(src) || fs.existsSync(out)) return;
    const props = parseProps(fs.readFileSync(src, 'utf8'));
    const argTypes = props.map(p => `    ${p.n}: ${ctrl(p.t)},`).join('\n');
    const args = props.map(p => `    ${p.n}: ${dflt(p.n, p.t)},`).join('\n');
    const extras = [];
    const dis = props.find(p => p.n === 'disabled');
    if (dis) extras.push(`\nexport const Disabled: Story = { args: { ...Default.args, disabled: true } };`);
    const vrnt = props.find(p => p.n === 'variant');
    if (vrnt && vrnt.t.includes('|')) {
      vrnt.t.split('|').map(s => s.trim().replace(/'/g,'')).forEach(v => {
        const sn = v[0].toUpperCase()+v.slice(1);
        extras.push(`\nexport const ${sn}: Story = { args: { ...Default.args, variant: '${v}' } };`);
      });
    }
    const story = `import type { Meta, StoryObj } from '@storybook/react';\nimport ${Name} from './${name}';\n\nconst meta: Meta<typeof ${Name}> = {\n  title: 'Components/${Name}',\n  component: ${Name},\n  tags: ['autodocs'],\n  argTypes: {\n${argTypes}\n  },\n};\n\nexport default meta;\ntype Story = StoryObj<typeof ${Name}>;\n\nexport const Default: Story = {\n  args: {\n${args}\n  },\n};\n${extras.join('\n')}\n`;
    fs.writeFileSync(out, story, 'utf8');
    console.log(`✓ ${Name}.stories.tsx (${props.length} props)`);
    created++;
  });
console.log(`\nDone — ${created} stories created.`);