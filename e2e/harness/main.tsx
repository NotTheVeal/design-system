import React, { useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Button from '../../src/components/button/button';
import Input from '../../src/components/input/input';
import Checkbox from '../../src/components/checkbox/checkbox';
import Modal from '../../src/components/modal/modal';
import Tabs from '../../src/components/tabs/tabs';
import Pagination from '../../src/components/pagination/pagination';
import Select from '../../src/components/select/select';
import Toggle from '../../src/components/toggle/toggle';

const storyId = new URLSearchParams(window.location.search).get('id') ?? '';

// ─── Individual story components ──────────────────────────────────────────

function ButtonPrimary() {
  return <Button variant="primary" size="lg">Add to Cart</Button>;
}

function InputDefault() {
  return (
    <div style={{ width: 360 }}>
      <Input label="Part Number" placeholder="e.g. MRI-7842" />
    </div>
  );
}

function CheckboxDefault() {
  return <Checkbox label="Patient Monitoring Equipment" checked={false} disabled={false} onChange={() => {}} />;
}

function CheckboxChecked() {
  return <Checkbox label="Infusion Therapy Supplies" checked={true} disabled={false} onChange={() => {}} />;
}

function CheckboxDisabled() {
  return <Checkbox label="Unavailable Category" checked={false} disabled={true} onChange={() => {}} />;
}

function ModalOpenByDefault() {
  return (
    <div>
      <Modal
        isOpen={true}
        title="Approve Purchase Order"
        primaryLabel="Approve"
        secondaryLabel="Reject"
        onClose={() => {}}
        onPrimary={() => {}}
        onSecondary={() => {}}
      >
        PO-2025-0755 from Siemens Healthineers for $12,400 is awaiting your approval.
      </Modal>
    </div>
  );
}

function TabsDefault() {
  return (
    <Tabs
      tabs={[
        { label: 'Overview', content: <div>Overview content</div> },
        { label: 'Line Items', content: <div>Line items content</div> },
        { label: 'History', content: <div>History content</div> },
      ]}
      defaultActiveIndex={0}
    />
  );
}

function PaginationDefault() {
  const [page, setPage] = useState(1);
  return <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />;
}

function SelectDefault() {
  const [val, setVal] = useState('');
  return (
    <div style={{ width: 360 }}>
      <Select
        label="Equipment Category"
        options={['MRI Systems', 'CT Scanners', 'Ultrasound', 'X-Ray', 'Patient Monitoring', 'Lab Equipment']}
        value={val}
        onChange={setVal}
      />
    </div>
  );
}

function ToggleOff() {
  return <Toggle checked={false} label="Email notifications" onChange={() => {}} />;
}

function ToggleOn() {
  return <Toggle checked={true} label="Email notifications" onChange={() => {}} />;
}

// ─── Story registry ────────────────────────────────────────────────────────

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

// ─── Mount ────────────────────────────────────────────────────────────────

const rootEl = document.getElementById('storybook-root')!;
createRoot(rootEl).render(
  <StrictMode>
    <Story />
  </StrictMode>,
);
