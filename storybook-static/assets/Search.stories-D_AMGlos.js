import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{k as n}from"./iframe-3lkUr0nI.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";var i,a,o,s=e((()=>{i=t(n()),a=r(),o=({placeholder:e=`Search...`,onSearch:t,className:n})=>{let[r,o]=i.useState(``);return(0,a.jsxs)(`form`,{onSubmit:e=>{e.preventDefault(),t(r)},className:`search-form ${n}`,children:[(0,a.jsx)(`label`,{htmlFor:`search-input`,className:`sr-only`,children:`Search`}),(0,a.jsx)(`input`,{id:`search-input`,type:`text`,value:r,onChange:e=>{o(e.target.value)},onKeyDown:e=>{e.key===`Enter`&&t(r)},placeholder:e,className:`search-input`,"aria-label":`Search`}),(0,a.jsx)(`button`,{type:`submit`,className:`search-submit`,"aria-label":`Submit search`,children:(0,a.jsx)(`span`,{children:`🔍`})}),(0,a.jsx)(`style`,{jsx:!0,children:`
        :root {
          --ps-primary-color: #005BA6;
          --ps-border-color-default: #DCDCDC;
          --ps-border-color-hover: #005BA6;
          --ps-radius: 4px;
          --ps-spacing: 4px;
        }
        .search-form {
          display: flex;
          align-items: center;
        }
        .search-input {
          height: 48px;
          border: 1px solid var(--ps-border-color-default);
          border-radius: var(--ps-radius);
          padding: var(--ps-spacing) 12px;
          flex: 1;
          outline: none;
          transition: border-color 0.2s;
        }
        .search-input:focus {
          border-color: var(--ps-border-color-hover);
          box-shadow: 0 0 0 3px rgba(0,147,244,0.3);
        }
        .search-input::placeholder {
          color: var(--ps-border-color-default);
        }
        .search-submit {
          width: 48px;
          height: 48px;
          background: var(--ps-primary-color);
          color: white;
          border: none;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          transition: background 0.2s;
        }
        .search-submit:hover {
          background: darken(var(--ps-primary-color), 10%);
        }
      `})]})}})),c,l,u;e((()=>{s(),c={title:`Components/Search`,component:o,tags:[`autodocs`],argTypes:{placeholder:{control:`text`},onSearch:{action:`called`},className:{control:`text`}}},l={args:{placeholder:`Enter value...`,onSearch:()=>{},className:`className`}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter value...',
    onSearch: () => {},
    className: 'className'
  }
}`,...l.parameters?.docs?.source}}},u=[`Default`]}))();export{l as Default,u as __namedExportsOrder,c as default};