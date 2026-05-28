import{i as e}from"./preload-helper-xPQekRTU.js";import{k as t}from"./iframe-3lkUr0nI.js";import{t as n}from"./jsx-runtime-CaZkqeYb.js";var r,i,a=e((()=>{t(),r=n(),i=({currentPage:e,totalPages:t,onPageChange:n,className:i=``})=>{let a=e=>{e>=1&&e<=t&&n(e)};return(0,r.jsxs)(`div`,{className:`pagination ${i}`,role:`navigation`,"aria-label":`Pagination`,children:[(0,r.jsx)(`button`,{onClick:()=>a(e-1),disabled:e===1,"aria-label":`Previous`,children:`<`}),Array.from({length:t},(t,n)=>(0,r.jsx)(`button`,{onClick:()=>a(n+1),className:e===n+1?`active`:``,"aria-label":`Go to page ${n+1}`,children:n+1},n+1)),(0,r.jsx)(`button`,{onClick:()=>a(e+1),disabled:e===t,"aria-label":`Next`,children:`>`}),(0,r.jsx)(`style`,{jsx:!0,children:`
        :root {
          --ps-font: 'Source Sans Pro', sans-serif;
          --ps-primary-color: #005BA6;
          --ps-midnight: #002F48;
          --ps-pagination-gap: 4px;
          --ps-pagination-item-size: 32px;
          --ps-pagination-item-radius: 4px;
          --ps-pagination-item-background-default: transparent;
          --ps-pagination-item-background-hover: #f0f0f0;
          --ps-pagination-item-background-active: #005BA6;
          --ps-pagination-item-border-default: transparent;
          --ps-pagination-item-border-hover: #DCDCDC;
          --ps-pagination-item-border-active: #005BA6;
          --ps-pagination-item-border-width: 1px;
          --ps-pagination-item-text-default: #000;
          --ps-pagination-item-text-hover: #005BA6;
          --ps-pagination-item-text-active: #fff;
          --ps-pagination-item-text-disabled: #DCDCDC;
          --ps-pagination-arrow-color: #999;
          --ps-pagination-arrow-color-hover: #005BA6;
          --ps-pagination-arrow-color-disabled: #DCDCDC;
          --ps-pagination-arrow-size: 16px;
          --ps-pagination-ellipsis-color: #ccc;
          --ps-pagination-per-page-font-size: 13px;
          --ps-pagination-per-page-color: #999;
        }

        .pagination {
          display: flex;
          gap: var(--ps-pagination-gap);
        }
        button {
          width: var(--ps-pagination-item-size);
          height: var(--ps-pagination-item-size);
          border-radius: var(--ps-pagination-item-radius);
          border: var(--ps-pagination-item-border-width) solid var(--ps-pagination-item-border-default);
          background: var(--ps-pagination-item-background-default);
          color: var(--ps-pagination-item-text-default);
          font-size: var(--ps-pagination-item-text-font-size);
          font-weight: var(--ps-pagination-item-text-font-weight);
          cursor: pointer;
          transition: background 0.3s, color 0.3s;
        }
        button:hover {
          background: var(--ps-pagination-item-background-hover);
          color: var(--ps-pagination-item-text-hover);
        }
        button:disabled {
          cursor: not-allowed;
          color: var(--ps-pagination-item-text-disabled);
        }
        .active {
          background: var(--ps-pagination-item-background-active);
          color: var(--ps-pagination-item-text-active);
        }
      `})]})}})),o,s,c;e((()=>{a(),o={title:`Components/Pagination`,component:i,tags:[`autodocs`],argTypes:{currentPage:{control:`number`},totalPages:{control:`number`},onPageChange:{action:`called`},className:{control:`text`}}},s={args:{currentPage:1,totalPages:1,onPageChange:()=>{},className:`className`}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: () => {},
    className: 'className'
  }
}`,...s.parameters?.docs?.source}}},c=[`Default`]}))();export{s as Default,c as __namedExportsOrder,o as default};