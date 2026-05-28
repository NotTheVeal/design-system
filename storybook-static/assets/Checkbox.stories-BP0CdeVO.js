import{i as e}from"./preload-helper-xPQekRTU.js";import{k as t}from"./iframe-3lkUr0nI.js";import{t as n}from"./jsx-runtime-CaZkqeYb.js";var r,i,a=e((()=>{t(),r=n(),i=({label:e,checked:t,indeterminate:n,disabled:i,className:a,...o})=>(0,r.jsxs)(`label`,{className:`checkbox ${a}`,children:[(0,r.jsx)(`input`,{type:`checkbox`,checked:t,"aria-checked":n?`mixed`:t,disabled:i,...o}),(0,r.jsx)(`span`,{className:`custom-checkbox`}),(0,r.jsx)(`span`,{className:`label`,children:e}),(0,r.jsx)(`style`,{jsx:!0,children:`
        :root {
          --ps-blue: #005BA6;
          --ps-midnight: #002F48;
          --ps-border-radius: 4px;
          --ps-background-default: #fff;
          --ps-border-color: #DCDCDC;
          --ps-hover-border: #005BA6;
          --ps-checked-background: #ff9505;
          --ps-checked-border: #ec8000;
          --ps-disabled-background: #f0f0f0;
          --ps-disabled-border: #DCDCDC;
          --ps-focus-shadow: 0 0 10px 5px rgba(0, 91, 166, 0.5);
        }
        .checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        input[type='checkbox'] {
          appearance: none;
          width: 24px;
          height: 24px;
          border: 1px solid var(--ps-border-color);
          border-radius: var(--ps-border-radius);
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        }
        input[type='checkbox']:focus {
          box-shadow: var(--ps-focus-shadow);
        }
        input[type='checkbox']:hover {
          border-color: var(--ps-hover-border);
        }
        input[type='checkbox']:checked {
          background: var(--ps-checked-background);
          border-color: var(--ps-checked-border);
        }
        .custom-checkbox {
          display: inline-block;
          width: 24px;
          height: 24px;
          background-color: var(--ps-background-default);
          border: 1px solid var(--ps-border-color);
          border-radius: var(--ps-border-radius);
          position: relative;
        }
        .custom-checkbox::after {
          content: '';
          display: ${t?`block`:`none`};
          width: 10px;
          height: 10px;
          background-color: var(--ps-checked-background);
          border-radius: var(--ps-border-radius);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .label {
          font-family: 'Source Sans Pro', sans-serif;
          color: var(--ps-midnight);
        }
        input[type='checkbox']:disabled {
          cursor: not-allowed;
          background: var(--ps-disabled-background);
          border: var(--ps-disabled-border);
        }
      `})]})})),o,s,c;e((()=>{a(),o={title:`Components/Checkbox`,component:i,tags:[`autodocs`],argTypes:{}},s={args:{}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...s.parameters?.docs?.source}}},c=[`Default`]}))();export{s as Default,c as __namedExportsOrder,o as default};