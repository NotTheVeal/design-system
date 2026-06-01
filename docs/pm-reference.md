# PartsSource Design System — Product Manager Reference

> **How to use this guide:** Each section covers one component. For every component you'll find: what it is, when to use it (and when not to), available states, accessibility notes, a product requirement example, and a link to the live Storybook.

---

## Button

**What it is:** The primary action trigger. Used to submit forms, open modals, confirm decisions, or navigate to a key next step.

**When to use:** When the user needs to take an action that has a meaningful consequence — submitting, saving, confirming, or proceeding.

**When NOT to use:** For navigation between pages (use a Link instead). For low-stakes toggles (use a Toggle or Checkbox instead).

**Available states:** Default, Hover, Focus (WCAG 2.4.7), Disabled (aria-disabled), Loading (aria-busy spinner)

**Variants:** Primary (blue fill), Secondary (white/bordered), Tertiary (pill/neutral), Danger (red)

**Sizes:** Large (50px), Small (32px)

**Accessibility:** Always provide a meaningful label. Use aria-label when button has only an icon. Never remove the focus ring.

**Product requirement example:**
> OK: "The Submit button should show a loading state while the form is being submitted and disable re-clicks."
> NOT OK: "Add a blue button."

---

## Input (Text Field)

**What it is:** A single-line text entry field used to collect user input such as names, search terms, part numbers, or quantities.

**When to use:** Any time the user needs to type free-form text. Use the large variant (80px) for prominent search or primary inputs.

**When NOT to use:** For long-form text (use Textarea). For selecting from a list (use Select/Dropdown).

**Available states:** Default, Focused (label floats up, blue border), Filled, Error (red border + message via aria-describedby), Disabled

**Accessibility:** Label must always be present. Error messages must be programmatically associated. Never use placeholder as the only label.

**Product requirement example:**
> OK: "If the part number field is left empty on submit, show an error: 'Part number is required.'"
> NOT OK: "Make the input turn red if empty."

---

## Select / Dropdown

**What it is:** A form control that lets users choose one option from a predefined list.

**When to use:** When the user must choose from 5 or more options and free-text entry is not appropriate.

**When NOT to use:** Fewer than 4 options (use Radio). Multi-select (use Checkbox list).

**Available states:** Closed, Open, Option hovered, Option selected, Searchable, Disabled, Error

**Accessibility:** ARIA listbox pattern. Keyboard: arrow keys, Enter to select, Escape to close.

**Product requirement example:**
> OK: "Users must select a facility from a dropdown before submitting the order request."
> NOT OK: "Add a dropdown for facility."

---

## Checkbox

**What it is:** A binary selection control for yes/no or selecting multiple items from a list.

**When to use:** When the user can select multiple options independently. For agreement/consent.

**When NOT to use:** Mutually exclusive choices (use Radio). Immediate on/off settings (use Toggle).

**Available states:** Unchecked, Checked (brand primary fill), Indeterminate (dash), Disabled, Focus (blue glow)

**Accessibility:** Always paired with a visible label. aria-checked reflects state.

**Product requirement example:**
> OK: "Users can select multiple equipment types. Selecting a parent category automatically checks all children."
> NOT OK: "Add checkboxes for the filters."

---

## Radio

**What it is:** A mutually exclusive selection control. Only one radio in a group can be selected.

**When to use:** When the user must choose exactly one option from 2-6 visible options.

**When NOT to use:** More than 6 options (use Select). Independent on/off options (use Checkbox).

**Available states:** Unselected, Selected (brand primary fill + white dot), Disabled, Focus (blue glow)

**Accessibility:** Must be grouped in a fieldset with a legend. Arrow keys move between options.

**Product requirement example:**
> OK: "Users must choose one priority level: Low, Medium, or High. The selection cannot be skipped."
> NOT OK: "Add a radio button for priority."

---

## Toggle

**What it is:** An immediate on/off switch. Toggling takes effect right away without a submit action.

**When to use:** Settings that take immediate effect — enabling notifications, turning on a feature flag.

**When NOT to use:** When change requires save/submit (use Checkbox). Non-binary options.

**Available states:** Off, On (brand primary fill), Disabled, Focus (blue glow)

**Accessibility:** Uses role="switch" and aria-checked. Label must describe what the toggle controls.

**Product requirement example:**
> OK: "The 'Receive email alerts' setting should toggle immediately without a separate Save button."
> NOT OK: "Add a toggle for email alerts."

---

## Badge

**What it is:** A small visual label used to communicate status, category, or a count at a glance.

**When to use:** To show status (Active, Pending, Approved), category tags, or notification counts.

**When NOT to use:** As a primary action trigger. For long text (use a Tag or Label component).

**Variants:** Status (Success/green, Danger/red, Warning/yellow, Info/blue, Neutral/gray), Pill (category labels)

**Accessibility:** Text must be readable by screen readers. Never convey meaning through color alone.

**Product requirement example:**
> OK: "Each order shows its status as a badge: Pending (yellow), Approved (green), Rejected (red)."
> NOT OK: "Color code the status."

---

## Alert

**What it is:** An inline message that communicates feedback, warnings, errors, or informational context.

**When to use:** After form submission, to warn before a destructive action, or for system-level info.

**When NOT to use:** Persistent navigation (use Banner). Transient messages (use Toast).

**Variants:** Success (green), Error/Danger (red), Warning (amber), Info (blue)

**Accessibility:** role="alert" for errors/warnings. role="status" for success/info.

**Product requirement example:**
> OK: "If a PO submission fails, show a red error alert at the top of the form with the specific API error message."
> NOT OK: "Show an error if it fails."

---

## Modal

**What it is:** An overlay dialog that interrupts the current flow to present critical information or require a decision.

**When to use:** Confirmations before destructive actions, multi-step flows, focused data entry.

**When NOT to use:** Non-critical info (use Alert). Too-complex content (use a page or Drawer).

**Sizes:** Small, Medium, Large, Fullscreen

**Accessibility:** Focus trap while open. Escape closes. Focus returns to trigger element on close.

**Product requirement example:**
> OK: "Clicking 'Delete Order' opens: 'Are you sure? This cannot be undone.' with Cancel and Delete buttons."
> NOT OK: "Add a popup for delete confirmation."

---

## Drawer / Sheet

**What it is:** A panel that slides in from the right to display supplemental content without leaving the current page.

**When to use:** Filters, detail views, settings panels, secondary actions that do not warrant a full page.

**When NOT to use:** Critical confirmations (use Modal). Content that needs its own URL (use a page).

**Accessibility:** Focus trap, Escape to close, focus return — same as Modal.

**Product requirement example:**
> OK: "Clicking a part in results opens a drawer with details, pricing, and Add to Cart — without navigating away."
> NOT OK: "Show part details in a side panel."

---

## Table

**What it is:** A structured data display component with rows, columns, headers, and optional sorting.

**When to use:** To display structured tabular data where users need to compare values across rows.

**When NOT to use:** Simple lists (use List). Non-comparative content (use Cards).

**Features:** Sortable columns, row selection, pagination support, empty state

**Accessibility:** Proper th scope headers. Sortable columns announce sort direction via aria-sort.

**Product requirement example:**
> OK: "Order history: Order #, Date, Vendor, Status, Total. Sort by Date or Status. Empty state: 'No orders found.'"
> NOT OK: "Show orders in a table."

---

## Pagination

**What it is:** Navigation controls for moving through multi-page data sets.

**When to use:** When a data set exceeds the page size limit.

**Features:** Previous/next arrows, page numbers, ellipsis for large ranges, optional page size selector

**Accessibility:** aria-label="Pagination" on nav. Active page via aria-current="page".

**Product requirement example:**
> OK: "Parts catalog shows 25 results per page. Users can jump to a page or change to 50/100 per page."
> NOT OK: "Add pagination to the catalog."

---

## Tabs

**What it is:** A navigation pattern organizing related content into selectable panels within the same view.

**When to use:** To organize 2-7 related content sections users switch between without leaving the page.

**When NOT to use:** More than 7 tabs (use sidebar nav). Sequential steps (use Stepper).

**Accessibility:** role="tablist", role="tab", role="tabpanel". Arrow keys move between tabs.

**Product requirement example:**
> OK: "Vendor detail page tabs: Overview, Contracts, Orders, Contacts. Switching tabs should not reload the page."
> NOT OK: "Add tabs to the vendor page."

---

## Tooltip

**What it is:** A small floating label appearing on hover or focus to provide brief additional context.

**When to use:** To explain icon-only buttons, clarify jargon, or surface helper text not always visible.

**When NOT to use:** Critical information. Long explanations (use Popover). On mobile (no hover).

**Accessibility:** Triggered by aria-describedby linking tooltip text to trigger element.

**Product requirement example:**
> OK: "The info icon next to 'Lead Time' shows a tooltip: 'Estimated days from order to delivery based on vendor history.'"
> NOT OK: "Add a tooltip to the info icon."

---

## Breadcrumb

**What it is:** A secondary navigation trail showing the user's location within the site hierarchy.

**When to use:** On any page 2 or more levels deep in the navigation hierarchy.

**Accessibility:** nav aria-label="Breadcrumb". Current page marked with aria-current="page".

**Product requirement example:**
> OK: "Part detail page: Home > Catalog > [Category] > [Part Name]. Each crumb except current is a clickable link."
> NOT OK: "Add breadcrumbs."

---

## Loading / Spinner

**What it is:** An animated indicator that communicates an in-progress async operation.

**When to use:** While data is loading, a form is submitting, or a background process is running.

**When NOT to use:** Operations under 300ms. Use Skeleton loaders for page-level content loads.

**Sizes:** Small, Medium, Large. Overlay mode available for blocking operations.

**Accessibility:** aria-busy="true" on loading container. Screen reader text via visually-hidden span.

**Product requirement example:**
> OK: "While order is submitting, show full-screen loading overlay so user cannot interact until response returns."
> NOT OK: "Add a spinner while loading."

---

## Avatar

**What it is:** A circular image or initials fallback representing a user or entity.

**When to use:** User profile sections, comment threads, assigned-to fields.

**Sizes:** XS, SM, MD, LG, XL. Status indicators: Online (green), Offline (gray), Busy (red), Away (yellow).

**Fallback:** If image fails, shows initials in a brand-colored circle.

**Product requirement example:**
> OK: "Approval workflow shows approver's avatar next to their decision. No photo? Show initials."
> NOT OK: "Show the user's photo."

---

## Skeleton

**What it is:** Placeholder shapes that mimic the layout of content while it loads.

**When to use:** Page-level content loads where multiple elements load simultaneously.

**Variants:** Text lines, circles (avatars), rectangles (images/cards)

**Accessibility:** aria-hidden="true" decorative only. Container should have aria-busy="true".

**Product requirement example:**
> OK: "While vendor list is loading, show skeleton placeholders — vendor name line and status badge line per row."
> NOT OK: "Show a loading state for the vendor list."

---

## Accordion

**What it is:** A vertically stacked set of expandable/collapsible content sections.

**When to use:** FAQs, settings groups, or progressive disclosure of detailed content.

**When NOT to use:** If all sections should be visible by default.

**Accessibility:** Each header is a button with aria-expanded. Arrow keys navigate between items.

**Product requirement example:**
> OK: "Product specs use an accordion so users can expand/collapse Dimensions, Compatibility, Warranty independently."
> NOT OK: "Use a collapsible section for specs."

---

## File Upload

**What it is:** A drag-and-drop or click-to-browse file input component.

**When to use:** Document attachment, image uploads, or any file input requirement.

**States:** Idle (dashed dropzone), Drag-over (brand border), Uploading (progress bar), Error, Success

**Product requirement example:**
> OK: "Users can upload a PDF or image of their service contract. Max 10MB. Show progress bar; error if file type unsupported."
> NOT OK: "Add a file upload."

---

## Navigation (Top Nav / Left Nav)

**What it is:** The primary navigation structure — top horizontal bar or left vertical sidebar.

**When to use:** Top Nav for application-level navigation. Left Nav for section-level within a module.

**Accessibility:** nav landmark with aria-label. Active page via aria-current="page". Keyboard navigable.

**Product requirement example:**
> OK: "Left nav highlights active section. Collapsed state shows icons with tooltips. Keyboard navigable via Tab and arrow keys."
> NOT OK: "Add a left sidebar."

---

## Metric / Stat Card

**What it is:** A compact card displaying a single KPI or data point with optional trend indicator.

**When to use:** Dashboards, summary views, or reporting sections where key numbers need to stand out.

**Accessibility:** Numbers and labels readable without relying on color alone for trend meaning.

**Product requirement example:**
> OK: "Dashboard shows 4 metric cards: Total Orders, Open POs, Average Lead Time, Cost Savings. Each shows value and trend vs. last month."
> NOT OK: "Show some stats on the dashboard."

---

*This reference is maintained by the UX/Design Systems team. To suggest updates or report a gap, open a GitHub issue in the design-system repository with the label pm-reference.*

*Last updated: June 2026*
