import{i as e}from"./preload-helper-xPQekRTU.js";import{k as t}from"./iframe-3lkUr0nI.js";import{t as n}from"./jsx-runtime-CaZkqeYb.js";var r,i,a=e((()=>{t(),r=n(),i=({title:e,description:t,primaryButtonLabel:n,secondaryButtonLabel:i,onPrimaryButtonClick:a,onSecondaryButtonClick:o,className:s})=>(0,r.jsxs)(`div`,{className:`cta-bar ${s}`,role:`banner`,"aria-labelledby":`ctaBarTitle`,children:[(0,r.jsx)(`style`,{jsx:!0,children:`
        :root {
          --ps-color-background-default: #ffffff;
          --ps-color-background-sticky: #ffffff;
          --ps-color-border: #dcdcdc;
          --ps-color-text-primary: #000000;
          --ps-color-text-secondary: #586067;
          --ps-spacing-padding-x: 24px;
          --ps-spacing-padding-y: 16px;
          --ps-spacing-button-gap: 12px;
          --ps-border-width: 1px;
          --ps-border-radius: 4px;
          --ps-shadow-sticky: 0 4px 12px rgba(0,0,0,0.1);
          --ps-sizing-min-height: 72px;
        }
        .cta-bar {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: var(--ps-color-background-default);
          padding: var(--ps-spacing-padding-y) var(--ps-spacing-padding-x);
          min-height: var(--ps-sizing-min-height);
          border-radius: var(--ps-border-radius);
          box-shadow: var(--ps-shadow-sticky);
          border: var(--ps-border-width) solid var(--ps-color-border);
        }
        .cta-bar__title {
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: bold;
          color: var(--ps-color-text-primary);
          margin-bottom: var(--ps-spacing-button-gap);
        }
        .cta-bar__description {
          font-family: 'Source Sans Pro', sans-serif;
          color: var(--ps-color-text-secondary);
          margin-bottom: var(--ps-spacing-button-gap);
        }
        .cta-bar__button {
          height: 48px;
          padding: 0 16px;
          border: 1px solid #005BA6;
          background: white;
          color: #005BA6;
          border-radius: var(--ps-border-radius);
          cursor: pointer;
          transition: background 0.3s;
        }
        .cta-bar__button:hover {
          background: #005BA6;
          color: white;
        }
        .cta-bar__button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 147, 244, 0.3);
        }
      `}),(0,r.jsx)(`h2`,{id:`ctaBarTitle`,className:`cta-bar__title`,children:e}),t&&(0,r.jsx)(`p`,{className:`cta-bar__description`,children:t}),(0,r.jsxs)(`div`,{className:`cta-bar__button-container`,style:{gap:`var(--ps-spacing-button-gap)`,display:`flex`},children:[(0,r.jsx)(`button`,{className:`cta-bar__button`,onClick:a,"aria-label":n,children:n}),i&&o&&(0,r.jsx)(`button`,{className:`cta-bar__button`,onClick:o,"aria-label":i,children:i})]})]})})),o,s,c;e((()=>{a(),o={title:`Components/CtaBar`,component:i,tags:[`autodocs`],argTypes:{title:{control:`text`},description:{control:`text`},primaryButtonLabel:{control:`text`},secondaryButtonLabel:{control:`text`},onPrimaryButtonClick:{action:`called`},onSecondaryButtonClick:{action:`called`},className:{control:`text`}}},s={args:{title:`Sample Title`,description:`A brief description.`,primaryButtonLabel:`primaryButtonLabel`,secondaryButtonLabel:`secondaryButtonLabel`,onPrimaryButtonClick:()=>{},onSecondaryButtonClick:()=>{},className:`className`}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Sample Title',
    description: 'A brief description.',
    primaryButtonLabel: 'primaryButtonLabel',
    secondaryButtonLabel: 'secondaryButtonLabel',
    onPrimaryButtonClick: () => {},
    onSecondaryButtonClick: () => {},
    className: 'className'
  }
}`,...s.parameters?.docs?.source}}},c=[`Default`]}))();export{s as Default,c as __namedExportsOrder,o as default};