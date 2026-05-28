import{i as e}from"./preload-helper-xPQekRTU.js";import{k as t}from"./iframe-3lkUr0nI.js";import{t as n}from"./jsx-runtime-CaZkqeYb.js";var r,i,a=e((()=>{t(),r=n(),i=({checked:e,onChange:t,disabled:n=!1,label:i,className:a})=>(0,r.jsxs)(`div`,{className:`toggle-container ${a}`,children:[(0,r.jsx)(`style`,{children:`
        :root {
          --ps-primary-color: #005BA6;
          --ps-track-off-color: #DCDCDC;
          --ps-track-on-color: var(--ps-primary-color);
          --ps-thumb-color: #ffffff;
          --ps-thumb-disabled-color: var(--ps-track-off-color);
          --ps-label-color: #002F48;
          --ps-label-disabled-color: var(--ps-track-off-color);
          --ps-track-width: 44px;
          --ps-track-height: 24px;
          --ps-thumb-size: 18px;
          --ps-thumb-offset: 3px;
          --ps-label-gap: 8px;
          --ps-border-radius-track: 30px;
          --ps-border-radius-thumb: 50%;
          --ps-transition-duration: 200ms;
        }
        .toggle-container {
          display: flex;
          align-items: center;
          cursor: ${n?`not-allowed`:`pointer`};
          opacity: ${n?`0.5`:`1`};
        }
        .toggle-label {
          margin-left: var(--ps-label-gap);
          color: ${n?`var(--ps-label-disabled-color)`:`var(--ps-label-color)`};
        }
        .toggle-track {
          width: var(--ps-track-width);
          height: var(--ps-track-height);
          background-color: ${e?`var(--ps-track-on-color)`:`var(--ps-track-off-color)`};
          border-radius: var(--ps-border-radius-track);
          position: relative;
          transition: background-color var(--ps-transition-duration);
        }
        .toggle-thumb {
          width: var(--ps-thumb-size);
          height: var(--ps-thumb-size);
          background-color: ${n?`var(--ps-thumb-disabled-color)`:`var(--ps-thumb-color)`};
          border-radius: var(--ps-border-radius-thumb);
          position: absolute;
          top: 50%;
          left: ${e?`calc(100% - var(--ps-thumb-size) - var(--ps-thumb-offset))`:`0`};
          transform: translateY(-50%);
          transition: left var(--ps-transition-duration);
        }
        .toggle-track:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 147, 244, 0.3);
        }
        .toggle-track:hover {
          background-color: ${e?`var(--ps-primary-color)`:`var(--ps-track-off-color)`};
        }
      `}),(0,r.jsx)(`div`,{className:`toggle-track`,role:`switch`,"aria-checked":e,"aria-label":i,tabIndex:0,onClick:()=>!n&&t(!e),onKeyDown:r=>{(r.key===`Enter`||r.key===` `)&&(r.preventDefault(),!n&&t(!e))},disabled:n,children:(0,r.jsx)(`div`,{className:`toggle-thumb`})}),(0,r.jsx)(`span`,{className:`toggle-label`,children:i})]})})),o,s,c,l;e((()=>{a(),o={title:`Components/Toggle`,component:i,tags:[`autodocs`],argTypes:{checked:{control:`boolean`},onChange:{action:`called`},disabled:{control:`boolean`},label:{control:`text`},className:{control:`text`}}},s={args:{checked:!0,onChange:()=>{},disabled:!0,label:`Label`,className:`className`}},c={args:{...s.args,disabled:!0}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true,
    onChange: () => {},
    disabled: true,
    label: 'Label',
    className: 'className'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    disabled: true
  }
}`,...c.parameters?.docs?.source}}},l=[`Default`,`Disabled`]}))();export{s as Default,c as Disabled,l as __namedExportsOrder,o as default};