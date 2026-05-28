import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{k as n}from"./iframe-3lkUr0nI.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";var i,a,o,s=e((()=>{i=t(n()),a=r(),o=({steps:e,currentStep:t,className:n})=>(0,a.jsxs)(`div`,{className:`stepper ${n}`,style:{padding:`var(--ps-stepper-padding)`,background:`var(--ps-stepper-container-background)`},children:[(0,a.jsx)(`style`,{children:`
          :root {
            --ps-font-family: 'Source Sans Pro', sans-serif;
            --ps-primary-color: #005BA6;
            --ps-midnight-color: #002F48;
            --ps-spacing-4: 4px;
            --ps-spacing-8: 8px;
            --ps-spacing-12: 12px;
            --ps-spacing-16: 16px;
            --ps-spacing-20: 20px;
            --ps-spacing-24: 24px;
            --ps-spacing-32: 32px;
            --ps-spacing-40: 40px;
            --ps-spacing-48: 48px;
            --ps-spacing-64: 64px;
            --ps-border-radius: 4px;
            --ps-modal-border-radius: 8px;
            --ps-pill-border-radius: 100px;
          }
          .stepper {
            display: flex;
            align-items: center;
            padding: var(--ps-spacing-24);
            gap: var(--ps-spacing-8);
          }
          .step {
            position: relative;
            flex: 1;
            text-align: center;
          }
          .step-label {
            font-family: var(--ps-font-family);
            color: var(--ps-step-label-current);
          }
          .step-indicator {
            width: var(--ps-indicator-size);
            height: var(--ps-indicator-size);
            border-radius: var(--ps-indicator-radius);
            border: 2px solid transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }
          .step-completed {
            background-color: var(--ps-step-indicator-finished-background);
            border-color: var(--ps-step-indicator-finished-border);
          }
          .step-current {
            background-color: var(--ps-step-indicator-current-background);
            border-color: var(--ps-step-indicator-current-border);
            box-shadow: var(--ps-step-indicator-current-shadow);
          }
          .connector {
            height: var(--ps-connector-height);
            background-color: var(--ps-step-connector-incomplete);
            flex: 1;
          }
          .connector-complete {
            background-color: var(--ps-step-connector-complete);
          }
        `}),e.map((n,r)=>(0,a.jsxs)(i.Fragment,{children:[(0,a.jsx)(`div`,{className:`step-indicator ${n.completed?`step-completed`:``} ${t===r?`step-current`:``}`,role:`step`,children:n.completed?(0,a.jsx)(`span`,{children:`✔`}):r+1}),(0,a.jsx)(`div`,{className:`step`,"aria-label":n.label,tabIndex:0,children:(0,a.jsx)(`div`,{className:`step-label`,children:n.label})}),r<e.length-1&&(0,a.jsx)(`div`,{className:`connector ${n.completed?`connector-complete`:``}`})]},r))]})})),c,l,u;e((()=>{s(),c={title:`Components/Stepper`,component:o,tags:[`autodocs`],argTypes:{steps:{control:`text`},currentStep:{control:`number`},className:{control:`text`}}},l={args:{steps:[],currentStep:1,className:`className`}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    steps: [],
    currentStep: 1,
    className: 'className'
  }
}`,...l.parameters?.docs?.source}}},u=[`Default`]}))();export{l as Default,u as __namedExportsOrder,c as default};