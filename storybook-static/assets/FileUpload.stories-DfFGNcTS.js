import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{k as n}from"./iframe-3lkUr0nI.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";var i,a,o,s=e((()=>{i=t(n()),a=r(),o=({className:e,label:t,onFileChange:n})=>{let[r,o]=(0,i.useState)(null);return(0,a.jsxs)(`div`,{className:`file-upload ${e}`,children:[(0,a.jsx)(`label`,{className:`file-upload-label`,htmlFor:`file-upload`,children:t}),(0,a.jsxs)(`div`,{className:`file-upload-zone`,role:`button`,tabIndex:0,onClick:()=>document.getElementById(`file-upload`)?.click(),onKeyDown:e=>e.key===`Enter`&&document.getElementById(`file-upload`)?.click(),children:[(0,a.jsx)(`input`,{type:`file`,id:`file-upload`,className:`file-upload-input`,onChange:e=>{let t=e.target.files;o(t),n(t)}}),(0,a.jsx)(`span`,{className:`file-upload-drag-text`,children:`Drag and drop files here or click to upload`})]}),r&&Array.from(r).map((e,t)=>(0,a.jsxs)(`div`,{className:`file-item`,children:[(0,a.jsx)(`span`,{className:`file-item-name`,children:e.name}),(0,a.jsx)(`button`,{className:`file-item-remove`,onClick:()=>o(null),children:`Remove`})]},t)),(0,a.jsx)(`style`,{jsx:!0,children:`
        :root {
          --ps-font: 'Source Sans Pro', sans-serif;
          --ps-blue: #005BA6;
          --ps-midnight: #002F48;
          --ps-neutral-50: #f6f6f6;
          --ps-border-default: #dcdcdc;
          --ps-error: #fc3b3b;
          --ps-shadow-focused: 0 0 0 3px rgba(0, 147, 244, 0.3);
          --ps-shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .file-upload {
          font-family: var(--ps-font);
        }
        .file-upload-label {
          margin-bottom: 8px;
          display: block;
        }
        .file-upload-zone {
          background: var(--ps-neutral-50);
          border: 2px dashed var(--ps-border-default);
          border-radius: 8px;
          padding: 32px 24px;
          text-align: center;
          cursor: pointer;
          transition: border 0.3s;
        }
        .file-upload-zone:hover {
          border-color: var(--ps-blue);
        }
        .file-upload-input {
          display: none;
        }
        .file-upload-drag-text {
          color: var(--ps-blue);
          font-size: 16px;
        }
        .file-item {
          background: var(--ps-neutral-50);
          border: 1px solid var(--ps-border-default);
          border-radius: 4px;
          padding: 8px 12px;
          margin-top: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .file-item-name {
          color: var(--ps-blue);
        }
        .file-item-remove {
          background: none;
          border: none;
          color: var(--ps-error);
          cursor: pointer;
        }
        .file-item-remove:hover {
          color: var(--ps-error);
        }
      `})]})}})),c,l,u;e((()=>{s(),c={title:`Components/FileUpload`,component:o,tags:[`autodocs`],argTypes:{className:{control:`text`},label:{control:`text`},onFileChange:{action:`called`}}},l={args:{className:`className`,label:`Label`,onFileChange:()=>{}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    className: 'className',
    label: 'Label',
    onFileChange: () => {}
  }
}`,...l.parameters?.docs?.source}}},u=[`Default`]}))();export{l as Default,u as __namedExportsOrder,c as default};