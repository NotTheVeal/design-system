import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{k as n}from"./iframe-3lkUr0nI.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";var i,a,o,s=e((()=>{i=t(n()),a=r(),o=({className:e,label:t,error:n,disabled:r,value:o,placeholder:s,onChange:c,onFocus:l,onBlur:u})=>{let[d,f]=i.useState(!1);return(0,a.jsxs)(`div`,{className:`input-container ${e}`,children:[(0,a.jsx)(`label`,{className:`input-label ${d||o?`floating`:``} ${n?`error`:``}`,htmlFor:`input-element`,children:t}),(0,a.jsx)(`input`,{id:`input-element`,className:`input-element ${d?`focused`:``} ${n?`error`:``}`,type:`text`,value:o,placeholder:s,onChange:c,onFocus:e=>{f(!0),l&&l(e)},onBlur:e=>{f(!1),u&&u(e)},disabled:r,"aria-label":t}),n&&(0,a.jsx)(`span`,{className:`helper-text error`,children:n}),(0,a.jsx)(`style`,{jsx:!0,children:`
        :root {
          --ps-font: 'Source Sans Pro', sans-serif;
          --ps-blue: #005BA6;
          --ps-midnight: #002F48;
          --ps-input-height: 48px;
          --ps-input-padding-h: 16px;
          --ps-input-padding-v: 12px;
          --ps-input-border-color: #DCDCDC;
          --ps-input-focused-border-color: #005BA6;
          --ps-input-error-border-color: #FF4D4F;
          --ps-shadow-focus: 0 0 0 3px rgba(0,147,244,0.3);
          --ps-spacing-16: 16px;
        }
        .input-container {
          margin-bottom: var(--ps-spacing-16);
          position: relative;
          font-family: var(--ps-font);
        }
        .input-label {
          position: absolute;
          left: var(--ps-input-padding-h);
          top: 12px;
          font-size: 16px;
          color: var(--ps-blue);
          transition: transform 0.2s ease, font-size 0.2s ease;
        }
        .input-label.floating {
          transform: translateY(-20px);
          font-size: 12px;
          font-weight: 600;
          color: var(--ps-blue);
        }
        .input-element {
          height: var(--ps-input-height);
          padding: var(--ps-input-padding-v) var(--ps-input-padding-h);
          border: 1px solid var(--ps-input-border-color);
          border-radius: 4px;
          width: 100%;
          box-shadow: 0 0 0 transparent;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .input-element:focus {
          border-color: var(--ps-input-focused-border-color);
          box-shadow: var(--ps-shadow-focus);
        }
        .input-element.error {
          border-color: var(--ps-input-error-border-color);
        }
        .helper-text {
          font-size: 12px;
          color: var(--ps-input-error-border-color);
          margin-top: 4px;
        }
      `})]})}})),c,l,u,d;e((()=>{s(),c={title:`Components/Input`,component:o,tags:[`autodocs`],argTypes:{className:{control:`text`},label:{control:`text`},error:{control:`text`},disabled:{control:`boolean`},value:{control:`text`},placeholder:{control:`text`},onChange:{action:`called`},onFocus:{control:`text`},onBlur:{control:`text`}}},l={args:{className:`className`,label:`Label`,error:`error`,disabled:!0,value:`value`,placeholder:`Enter value...`,onChange:()=>{},onFocus:`onFocus`,onBlur:`onBlur`}},u={args:{...l.args,disabled:!0}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    className: 'className',
    label: 'Label',
    error: 'error',
    disabled: true,
    value: 'value',
    placeholder: 'Enter value...',
    onChange: () => {},
    onFocus: 'onFocus',
    onBlur: 'onBlur'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    disabled: true
  }
}`,...u.parameters?.docs?.source}}},d=[`Default`,`Disabled`]}))();export{l as Default,u as Disabled,d as __namedExportsOrder,c as default};