import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{k as n}from"./iframe-3lkUr0nI.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";var i,a,o,s=e((()=>{i=t(n()),a=r(),o=({value:e,min:t=0,max:n=100,onChange:r,className:o,disabled:s=!1})=>{let[c,l]=(0,i.useState)(!1);return(0,a.jsxs)(`div`,{className:`slider-container ${o}`,role:`slider`,"aria-valuemin":t,"aria-valuemax":n,"aria-valuenow":e,tabIndex:0,"aria-label":`Slider`,onMouseEnter:()=>{l(!0)},onMouseLeave:()=>{l(!1)},children:[(0,a.jsx)(`style`,{children:`
          :root {
            --ps-primary-color: #005BA6;
            --ps-midnight: #002F48;
            --ps-slider-track-height: 4px;
            --ps-slider-track-radius: 100px;
            --ps-slider-thumb-size: 20px;
            --ps-slider-thumb-radius: 50%;
            --ps-slider-label-color: #6B6B6B;
            --ps-slider-tooltip-background: #003366;
            --ps-slider-tooltip-text: #FFFFFF;
            --ps-slider-disabled-track: #E0E0E0;
            --ps-slider-disabled-fill: #C0C0C0;
            --ps-slider-disabled-thumb: #C0C0C0;
          }

          .slider-container {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .slider {
            appearance: none;
            width: 100%;
            height: var(--ps-slider-track-height);
            border-radius: var(--ps-slider-track-radius);
            background: var(--ps-primary-color);
            outline: none;
            margin: 0;
          }

          .slider:focus {
            box-shadow: 0 0 0 3px rgba(0,147,244,0.3);
          }

          .slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: var(--ps-slider-thumb-size);
            height: var(--ps-slider-thumb-size);
            border-radius: var(--ps-slider-thumb-radius);
            background: var(--ps-slider-thumb-background);
            border: 2px solid var(--ps-slider-thumb-border);
            cursor: pointer;
            transition: background 0.3s;
          }

          .slider-thumb:hover {
            background: var(--ps-slider-thumb-backgroundHover);
          }

          .slider:disabled {
            background: var(--ps-slider-disabled-track);
          }

          .slider:disabled .slider-thumb {
            background: var(--ps-slider-disabled-thumb);
            cursor: not-allowed;
          }
        `}),(0,a.jsx)(`input`,{type:`range`,min:t,max:n,value:e,onChange:e=>{r(Number(e.target.value))},className:`slider ${s?`disabled`:``}`,disabled:s,style:{position:`relative`,cursor:s?`not-allowed`:`pointer`}}),(0,a.jsxs)(`label`,{style:{color:`var(--ps-slider-label-color)`,fontSize:`13px`,marginBottom:`8px`},children:[`Value: `,e]})]})}})),c,l,u,d;e((()=>{s(),c={title:`Components/Slider`,component:o,tags:[`autodocs`],argTypes:{value:{control:`number`},min:{control:`number`},max:{control:`number`},onChange:{action:`called`},className:{control:`text`},disabled:{control:`boolean`}}},l={args:{value:1,min:1,max:1,onChange:()=>{},className:`className`,disabled:!0}},u={args:{...l.args,disabled:!0}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    value: 1,
    min: 1,
    max: 1,
    onChange: () => {},
    className: 'className',
    disabled: true
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    disabled: true
  }
}`,...u.parameters?.docs?.source}}},d=[`Default`,`Disabled`]}))();export{l as Default,u as Disabled,d as __namedExportsOrder,c as default};