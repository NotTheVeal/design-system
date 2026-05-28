import{i as e}from"./preload-helper-xPQekRTU.js";import{k as t}from"./iframe-3lkUr0nI.js";import{t as n}from"./jsx-runtime-CaZkqeYb.js";var r,i,a=e((()=>{t(),r=n(),i=({className:e})=>(0,r.jsxs)(`div`,{className:`cms ${e}`,children:[(0,r.jsx)(`style`,{jsx:!0,children:`
        :root {
          --ps-font: 'Source Sans Pro', sans-serif;
          --ps-primary-color: #005BA6;
          --ps-midnight-color: #002F48;
          --ps-banner-height: 93px;
          --ps-banner-gradient-start: #005BA6;
          --ps-banner-gradient-end: #009CF4;
          --ps-banner-overlay: rgba(0, 0, 0, 0.45);
          --ps-input-height: 48px;
          --ps-input-border: #DCDCDC;
          --ps-input-focus: #005BA6;
          --ps-card-hover-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          --ps-focus-ring: 0 0 0 3px rgba(0, 147, 244, 0.3);
          --ps-border-radius: 4px;
          --ps-modal-border-radius: 8px;
          --ps-pill-border-radius: 100px;
        }
        .cms {
          font-family: var(--ps-font);
        }
        .banner {
          height: var(--ps-banner-height);
          background: linear-gradient(to right, var(--ps-banner-gradient-start), var(--ps-banner-gradient-end));
          border-radius: var(--ps-border-radius);
          position: relative;
        }
        .banner::after {
          content: '';
          background: var(--ps-banner-overlay);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: var(--ps-border-radius);
        }
        .image-block {
          display: flex;
          gap: 24px;
        }
        .image-block img {
          height: 200px;
          border-radius: var(--ps-border-radius);
          object-fit: cover;
        }
        .text-block {
          max-width: 860px;
          padding: 32px;
          color: var(--ps-midnight-color);
        }
        .text-block h1 {
          font-size: 20px;
          font-weight: 600;
          color: var(--ps-midnight-color);
        }
        .text-block p {
          font-size: 14px;
          line-height: 1.6;
          color: #4A4A4A;
        }
        .cta-button {
          height: 40px;
          padding: 0 24px;
          font-size: 14px;
          font-weight: 600;
          border: 1px solid var(--ps-primary-color);
          background-color: white;
          color: var(--ps-primary-color);
          border-radius: var(--ps-border-radius);
          transition: background-color 0.3s;
        }
        .cta-button:hover {
          background-color: var(--ps-primary-color);
          color: white;
        }
        input {
          height: var(--ps-input-height);
          border: 1px solid var(--ps-input-border);
          outline: none;
          transition: border-color 0.3s;
        }
        input:focus {
          border-color: var(--ps-input-focus);
          box-shadow: var(--ps-focus-ring);
        }
      `}),(0,r.jsx)(`div`,{className:`banner`,role:`banner`,"aria-label":`CMS Banner`}),(0,r.jsx)(`div`,{className:`image-block`,role:`region`,"aria-label":`Image Block`,children:(0,r.jsx)(`img`,{src:`#`,alt:`Example`})}),(0,r.jsxs)(`div`,{className:`text-block`,children:[(0,r.jsx)(`h1`,{children:`Title goes here`}),(0,r.jsx)(`p`,{children:`Description goes here`}),(0,r.jsx)(`button`,{className:`cta-button`,"aria-label":`Call to Action`,children:`Click Me`})]})]})})),o,s,c;e((()=>{a(),o={title:`Components/Cms`,component:i,tags:[`autodocs`],argTypes:{className:{control:`text`}}},s={args:{className:`className`}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    className: 'className'
  }
}`,...s.parameters?.docs?.source}}},c=[`Default`]}))();export{s as Default,c as __namedExportsOrder,o as default};