import React, { useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const storyId = new URLSearchParams(window.location.search).get('id') ?? '';

function ButtonPrimary() {
  const [clicked, setClicked] = useState(false);
  return (
    <button type="button" onClick={() => setClicked(true)}>
      {clicked ? 'Clicked!' : 'Add to Cart'}
    </button>
  );
}

function InputDefault() {
  const [value, setValue] = useState('');
  return (
    <div>
      <label htmlFor="test-input">Part Number</label>
      <input
        id="test-input"
        type="text"
        placeholder="e.g. MRI-7842"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
}

function CheckboxDefault() {
  const [checked, setChecked] = useState(false);
  return (
    <div
      role="checkbox"
      aria-checked={checked ? 'true' : 'false'}
      aria-disabled="false"
      tabIndex={0}
      onClick={() => setChecked(c => !c)}
    >
      Patient Monitoring Equipment
    </div>
  );
}

function CheckboxChecked() {
  return (
    <div role="checkbox" aria-checked="true" aria-disabled="false" tabIndex={0}>
      Infusion Therapy Supplies
    </div>
  );
}

function CheckboxDisabled() {
  return (
    <div role="checkbox" aria-checked="false" aria-disabled="true" tabIndex={-1}>
      Unavailable Category
    </div>
  );
}

function ModalOpenByDefault() {
  return (
    <div role="dialog" aria-modal="true" aria-label="Approve Purchase Order">
      <h2>Approve Purchase Order</h2>
      <p>PO-2025-0755 from Siemens Healthineers for $12,400 is awaiting your approval.</p>
      <button type="button">Approve</button>
      <button type="button">Reject</button>
    </div>
  );
}

function TabsDefault() {
  const [active, setActive] = useState(0);
  const tabs = ['Overview', 'Line Items', 'History'];
  return (
    <div>
      <div role="tablist">
        {tabs.map((label, i) => (
          <button
            key={label}
            role="tab"
            aria-selected={i === active ? 'true' : 'false'}
            onClick={() => setActive(i)}
          >
            {label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{tabs[active]} content</div>
    </div>
  );
}

function PaginationDefault() {
  const [page, setPage] = useState(1);
  return (
    <div aria-label="Pagination">
      <button type="button" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
        Previous
      </button>
      <span>Page {page} of 10</span>
      <button type="button" onClick={() => setPage(p => Math.min(10, p + 1))} disabled={page === 10}>
        Next
      </button>
    </div>
  );
}

function SelectDefault() {
  const [val, setVal] = useState('');
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        role="combobox"
        aria-expanded={open ? 'true' : 'false'}
        aria-haspopup="listbox"
        onClick={() => setOpen(o => !o)}
      >
        {val || 'Equipment Category'}
      </button>
      {open && (
        <ul role="listbox">
          {['MRI Systems', 'CT Scanners', 'Ultrasound'].map(opt => (
            <li key={opt} role="option" onClick={() => { setVal(opt); setOpen(false); }}>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ToggleOff() {
  const [checked, setChecked] = useState(false);
  return (
    <div
      role="switch"
      aria-checked={checked ? 'true' : 'false'}
      tabIndex={0}
      onClick={() => setChecked(c => !c)}
    >
      Email notifications
    </div>
  );
}

function ToggleOn() {
  const [checked, setChecked] = useState(true);
  return (
    <div
      role="switch"
      aria-checked={checked ? 'true' : 'false'}
      tabIndex={0}
      onClick={() => setChecked(c => !c)}
    >
      Email notifications
    </div>
  );
}

const STORIES: Record<string, React.FC> = {
  'components-button--primary': ButtonPrimary,
  'components-input--default': InputDefault,
  'components-checkbox--default': CheckboxDefault,
  'components-checkbox--checked': CheckboxChecked,
  'components-checkbox--disabled': CheckboxDisabled,
  'components-modal--open-by-default': ModalOpenByDefault,
  'components-tabs--default': TabsDefault,
  'components-pagination--default': PaginationDefault,
  'components-select--default': SelectDefault,
  'components-toggle--off': ToggleOff,
  'components-toggle--on': ToggleOn,
};

function Story() {
  const Component = STORIES[storyId];
  if (!Component) {
    return <div data-story-not-found="true">Story not found: {storyId}</div>;
  }
  return (
    <div data-story-id={storyId}>
      <Component />
    </div>
  );
}

const rootEl = document.getElementById('storybook-root')!;
createRoot(rootEl).render(
  <StrictMode>
    <Story />
  </StrictMode>
);
