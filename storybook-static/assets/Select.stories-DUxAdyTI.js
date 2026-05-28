import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{k as n}from"./iframe-3lkUr0nI.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";var i,a,o,s=e((()=>{i=t(n()),a=r(),o=({options:e,value:t,onChange:n,className:r,disabled:o=!1,placeholder:s=`Select an option`})=>{let[c,l]=i.useState(!1),u=()=>{o||l(!c)},d=e=>{n(e),l(!1)};return(0,a.jsxs)(`div`,{className:`select-container ${r}`,onClick:u,role:`combobox`,"aria-haspopup":`listbox`,"aria-expanded":c,"aria-label":s,children:[(0,a.jsx)(`div`,{className:`select-value ${o?`disabled`:``}`,tabIndex:0,"aria-disabled":o,children:t||s}),c&&(0,a.jsx)(`ul`,{className:`select-dropdown`,role:`listbox`,"aria-label":`Select options`,children:e.map(e=>(0,a.jsx)(`li`,{className:`select-dropdown-item`,onClick:()=>d(e),role:`option`,"aria-selected":t===e,children:e},e))})]})}})),c,l,u,d;e((()=>{s(),c={title:`Components/Select`,component:o,tags:[`autodocs`],argTypes:{options:{control:`text`},value:{control:`text`},onChange:{action:`called`},className:{control:`text`},disabled:{control:`boolean`},placeholder:{control:`text`}}},l={args:{options:[],value:`value`,onChange:()=>{},className:`className`,disabled:!0,placeholder:`Enter value...`}},u={args:{...l.args,disabled:!0}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    options: [],
    value: 'value',
    onChange: () => {},
    className: 'className',
    disabled: true,
    placeholder: 'Enter value...'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    disabled: true
  }
}`,...u.parameters?.docs?.source}}},d=[`Default`,`Disabled`]}))();export{l as Default,u as Disabled,d as __namedExportsOrder,c as default};