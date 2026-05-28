import{i as e}from"./preload-helper-xPQekRTU.js";import{k as t}from"./iframe-3lkUr0nI.js";import{t as n}from"./jsx-runtime-CaZkqeYb.js";var r,i,a,o=e((()=>{t(),r=n(),i=`
:root {
  --ps-font: 'Source Sans Pro', sans-serif;
  --ps-blue: #005BA6;
  --ps-midnight: #002F48;
  --ps-border-radius: 4px;
  --ps-border-radius-modal: 8px;
  --ps-border-radius-pill: 100px;
  --ps-nav-background: #002F48;
  --ps-nav-border: #005BA6;
  --ps-nav-divider: #DCDCDC;
  --ps-nav-width: 240px;
  --ps-nav-width-collapsed: 64px;
  --ps-user-badge-background: #005BA6;
  --ps-user-badge-text: #FFFFFF;
  --ps-user-badge-border: #DCDCDC;
  --ps-item-background: transparent;
  --ps-item-hover-background: #DCDCDC;
  --ps-item-active-background: #DCDCDC;
  --ps-item-disabled-background: transparent;
  --ps-item-disabled-text: #A0A0A0;
  --ps-padding-v: 16px;
  --ps-padding-h: 16px;
  --ps-item-height: 40px;
  --ps-item-gap: 4px;
  --ps-top-nav-background: #005BA6;
  --ps-top-nav-text: #FFFFFF;
  --ps-top-nav-border: #DCDCDC;
  --ps-top-nav-padding-h: 24px;
}

.navigation {
  font-family: var(--ps-font);
}

.left-nav {
  background: var(--ps-nav-background);
  border-right: 1px solid var(--ps-nav-border);
  width: var(--ps-nav-width);
  padding: var(--ps-padding-v) var(--ps-padding-h);
}

.left-nav-item {
  height: var(--ps-item-height);
  background: var(--ps-item-background);
  padding: var(--ps-padding-h);
  margin-bottom: var(--ps-item-gap);
  transition: background 0.3s;
}

.left-nav-item:hover {
  background: var(--ps-item-hover-background);
}

.left-nav-item.active {
  background: var(--ps-item-active-background);
}

.top-nav {
  background: var(--ps-top-nav-background);
  color: var(--ps-top-nav-text);
  height: 64px;
  padding: var(--ps-top-nav-padding-h);
  display: flex;
  align-items: center;
}

.user-badge {
  background: var(--ps-user-badge-background);
  color: var(--ps-user-badge-text);
  border: 1px solid var(--ps-user-badge-border);
  padding: 8px;
  border-radius: var(--ps-border-radius);
}

`,a=({className:e,userName:t,items:n})=>(0,r.jsxs)(`div`,{className:`navigation ${e}`,children:[(0,r.jsx)(`style`,{children:i}),(0,r.jsx)(`div`,{className:`top-nav`,role:`navigation`,"aria-label":`Main Navigation`,children:(0,r.jsx)(`div`,{className:`user-badge`,"aria-label":`Logged in as ${t}`,children:t})}),(0,r.jsx)(`div`,{className:`left-nav`,children:n.map((e,t)=>(0,r.jsx)(`div`,{className:`left-nav-item ${e.isActive?`active`:``} ${e.isDisabled?`disabled`:``}`,role:`menuitem`,"aria-disabled":e.isDisabled,tabIndex:e.isDisabled?-1:0,children:e.label},t))})]})})),s,c,l;e((()=>{o(),s={title:`Components/Navigation`,component:a,tags:[`autodocs`],argTypes:{className:{control:`text`},userName:{control:`text`},items:{control:`text`}}},c={args:{className:`className`,userName:`userName`,items:[]}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    className: 'className',
    userName: 'userName',
    items: []
  }
}`,...c.parameters?.docs?.source}}},l=[`Default`]}))();export{c as Default,l as __namedExportsOrder,s as default};