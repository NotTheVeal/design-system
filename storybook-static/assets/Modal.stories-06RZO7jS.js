import{i as e}from"./preload-helper-xPQekRTU.js";import{k as t}from"./iframe-3lkUr0nI.js";import{t as n}from"./jsx-runtime-CaZkqeYb.js";var r,i,a=e((()=>{t(),r=n(),i=({isOpen:e,title:t,onClose:n,children:i,className:a})=>e?(0,r.jsx)(`div`,{className:`modal-overlay`,role:`dialog`,"aria-modal":`true`,"aria-labelledby":`modal-title`,onKeyDown:e=>{e.key===`Escape`&&n()},children:(0,r.jsxs)(`div`,{className:`modal ${a}`,children:[(0,r.jsxs)(`header`,{className:`modal-header`,children:[(0,r.jsx)(`h2`,{id:`modal-title`,children:t}),(0,r.jsx)(`button`,{className:`modal-close`,onClick:n,"aria-label":`Close modal`,children:`×`})]}),(0,r.jsx)(`div`,{className:`modal-body`,children:i}),(0,r.jsx)(`footer`,{className:`modal-footer`,children:(0,r.jsx)(`button`,{className:`modal-footer-button`,onClick:n,children:`Close`})})]})}):null})),o,s,c,l;e((()=>{a(),o={title:`Components/Modal`,component:i,tags:[`autodocs`],argTypes:{isOpen:{control:`boolean`},title:{control:`text`},onClose:{action:`closed`},children:{control:`text`}}},s={args:{isOpen:!0,title:`Sample Title`,onClose:()=>{},children:`Modal body content goes here.`}},c={args:{...s.args,isOpen:!1}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    title: 'Sample Title',
    onClose: () => {},
    children: 'Modal body content goes here.'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    isOpen: false
  }
}`,...c.parameters?.docs?.source}}},l=[`Default`,`Closed`]}))();export{c as Closed,s as Default,l as __namedExportsOrder,o as default};