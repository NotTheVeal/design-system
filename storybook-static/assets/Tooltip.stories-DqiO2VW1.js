import{i as e}from"./preload-helper-xPQekRTU.js";import{k as t}from"./iframe-3lkUr0nI.js";import{t as n}from"./jsx-runtime-CaZkqeYb.js";var r,i,a=e((()=>{t(),r=n(),i=({content:e,className:t,children:n})=>(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(`style`,{jsx:!0,children:`
        :root {
          --ps-tooltip-background: #323232;
          --ps-tooltip-text: var(--semantic-color-surface-default);
          --ps-tooltip-border: transparent;
          --ps-tooltip-radius: 4px;
          --ps-tooltip-shadow: var(--semantic-shadow-md);
          --ps-tooltip-padding-v: 6px;
          --ps-tooltip-padding-h: 10px;
          --ps-tooltip-max-width: 240px;
          --ps-tooltip-z-index: 500;
          --ps-tooltip-font-size: 12px;
          --ps-tooltip-font-weight: 400;
          --ps-tooltip-line-height: 16px;
          --ps-tooltip-arrow-size: 6px;
          --ps-tooltip-arrow-color: #323232;
          --ps-tooltip-animation-duration: 150ms;
          --ps-tooltip-animation-easing: ease;
        }

        .tooltip {
          position: relative;
          display: inline-block;
          z-index: var(--ps-tooltip-z-index);
        }

        .tooltip-content {
          visibility: hidden;
          width: var(--ps-tooltip-max-width);
          background-color: var(--ps-tooltip-background);
          color: var(--ps-tooltip-text);
          text-align: center;
          border-radius: var(--ps-tooltip-radius);
          padding: var(--ps-tooltip-padding-v) var(--ps-tooltip-padding-h);
          position: absolute;
          z-index: var(--ps-tooltip-z-index);
          bottom: 125%; /* Position above the tooltip */
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          transition: opacity var(--ps-tooltip-animation-duration) var(--ps-tooltip-animation-easing);
          box-shadow: var(--ps-tooltip-shadow);
        }

        .tooltip:hover .tooltip-content,
        .tooltip:focus .tooltip-content {
          visibility: visible;
          opacity: 1;
        }

        .tooltip-arrow {
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -3px;
          border-width: var(--ps-tooltip-arrow-size);
          border-style: solid;
          border-color: var(--ps-tooltip-arrow-color) transparent transparent transparent;
        }
      `}),(0,r.jsxs)(`div`,{className:`tooltip ${t||``}`,role:`tooltip`,"aria-label":e,children:[n,(0,r.jsxs)(`div`,{className:`tooltip-content`,children:[e,(0,r.jsx)(`div`,{className:`tooltip-arrow`})]})]})]})})),o,s,c;e((()=>{a(),o={title:`Components/Tooltip`,component:i,tags:[`autodocs`],argTypes:{content:{control:`text`},className:{control:`text`},children:{control:`text`}}},s={args:{content:`content`,className:`className`,children:`Content goes here`}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    content: 'content',
    className: 'className',
    children: 'Content goes here'
  }
}`,...s.parameters?.docs?.source}}},c=[`Default`]}))();export{s as Default,c as __namedExportsOrder,o as default};