import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{k as n}from"./iframe-3lkUr0nI.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";var i,a,o,s=e((()=>{i=t(n()),a=r(),o=({steps:e,className:t,currentStep:n})=>(0,a.jsxs)(`div`,{className:`progress-indicator ${t}`,children:[(0,a.jsx)(`style`,{jsx:!0,children:`
        :root {
          --ps-primary-color: #005BA6;
          --ps-background-color: #ffffff;
          --ps-border-color: #DCDCDC;
          --ps-text-secondary: #6B6B6B;
          --ps blue: #005BA6;
          --ps-font-family: 'Source Sans Pro', sans-serif;
          --ps-progress-height: 8px;
          --ps-progress-radius: 100px;
          --ps-label-color: var(--ps-text-secondary);
          --ps-label-font-size: 13px;
          --ps-label-font-weight: 400;
          --ps-label-gap: 8px;
        }

        .progress-indicator {
          font-family: var(--ps-font-family);
          width: 100%;
          display: flex;
          align-items: center;
        }

        .step {
          position: relative;
          flex: 1;
          text-align: center;
        }

        .step-label {
          color: var(--ps-label-color);
          font-size: var(--ps-label-font-size);
          font-weight: var(--ps-label-font-weight);
          margin-bottom: var(--ps-label-gap);
        }

        .step-node {
          width: var(--ps-progress-height);
          height: var(--ps-progress-height);
          border-radius: 100px;
          display: inline-block;
          transition: background 0.3s;
        }

        .connector {
          height: 2px;
          background-color: var(--ps-border-color);
          flex: 1;
          margin: auto 0;
        }

        .step.complete .step-node {
          background-color: var(--ps-primary-color);
        }

        .step.active .step-node {
          background-color: var(--ps-background-color);
          border: 2px solid var(--ps-primary-color);
        }

        .step.inactive .step-node {
          background-color: var(--ps-border-color);
        }
      `}),e.map((t,n)=>(0,a.jsxs)(i.Fragment,{children:[(0,a.jsxs)(`div`,{className:`step ${t.status}`,children:[(0,a.jsx)(`div`,{className:`step-node`}),(0,a.jsx)(`div`,{className:`step-label`,children:t.label})]}),n<e.length-1&&(0,a.jsx)(`div`,{className:`connector`})]},n))]})})),c,l,u;e((()=>{s(),c={title:`Components/ProgressIndicator`,component:o,tags:[`autodocs`],argTypes:{value:{control:`number`},max:{control:`number`},variant:{control:`select`,options:[`linear`,`circular`]}}},l={args:{value:60,max:100}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    value: 60,
    max: 100
  }
}`,...l.parameters?.docs?.source}}},u=[`Default`]}))();export{l as Default,u as __namedExportsOrder,c as default};