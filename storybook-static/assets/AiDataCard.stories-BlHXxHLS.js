import{i as e}from"./preload-helper-xPQekRTU.js";import{k as t}from"./iframe-3lkUr0nI.js";import{t as n}from"./jsx-runtime-CaZkqeYb.js";var r,i,a=e((()=>{t(),r=n(),i=({title:e,manufacturer:t,tracking:n,costLabel:i,costAmount:a,imageSrc:o,className:s=``})=>(0,r.jsxs)(`div`,{className:`ai-data-card ${s}`,role:`presentation`,children:[(0,r.jsx)(`style`,{jsx:!0,children:`
        :root {
          --ps-color-background-default: #F5F5F5;
          --ps-color-background-hover: #E6F2FF;
          --ps-color-border-default: #E5E5E5;
          --ps-color-border-hover: #CCE5FF;
          --ps-color-text-title: #4A4A4A;
          --ps-color-text-manufacturer: #777777;
          --ps-color-text-tracking: #005BA6;
          --ps-color-text-costLabel: #949494;
          --ps-color-text-costAmount: #4A4A4A;
          --ps-color-divider: #E5E5E5;
          --ps-sizing-width: 348px;
          --ps-sizing-imageArea: 100px;
          --ps-spacing-padding: 16px;
          --ps-spacing-gap: 8px;
          --ps-spacing-dividerMargin: 12px;
          --ps-border-radius: 8px;
          --ps-border-width: 1px;
          --ps-shadow-default: 0 4px 12px rgba(0, 0, 0, 0.04);
          --ps-typography-title-fontSize: 16px;
          --ps-typography-title-fontWeight: 700;
          --ps-typography-manufacturer-fontSize: 14px;
          --ps-typography-manufacturer-fontWeight: 400;
          --ps-typography-tracking-fontSize: 14px;
          --ps-typography-tracking-fontWeight: 600;
          --ps-typography-costLabel-fontSize: 14px;
          --ps-typography-costAmount-fontSize: 16px;
          --ps-typography-costAmount-fontWeight: 700;
        }

        .ai-data-card {
          width: var(--ps-sizing-width);
          background: var(--ps-color-background-default);
          border-radius: var(--ps-border-radius);
          border: var(--ps-border-width) solid var(--ps-color-border-default);
          box-shadow: var(--ps-shadow-default);
          padding: var(--ps-spacing-padding);
          transition: background 0.3s, border-color 0.3s;

          &:hover {
            background: var(--ps-color-background-hover);
            border-color: var(--ps-color-border-hover);
          }
        }

        .title {
          font-size: var(--ps-typography-title-fontSize);
          font-weight: var(--ps-typography-title-fontWeight);
          color: var(--ps-color-text-title);
        }

        .manufacturer {
          font-size: var(--ps-typography-manufacturer-fontSize);
          font-weight: var(--ps-typography-manufacturer-fontWeight);
          color: var(--ps-color-text-manufacturer);
        }

        .tracking {
          font-size: var(--ps-typography-tracking-fontSize);
          font-weight: var(--ps-typography-tracking-fontWeight);
          color: var(--ps-color-text-tracking);
        }

        .cost {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: var(--ps-spacing-dividerMargin);
        }

        .cost-label {
          font-size: var(--ps-typography-costLabel-fontSize);
          color: var(--ps-color-text-costLabel);
        }

        .cost-amount {
          font-size: var(--ps-typography-costAmount-fontSize);
          font-weight: var(--ps-typography-costAmount-fontWeight);
          color: var(--ps-color-text-costAmount);
        }

        .image {
          width: var(--ps-sizing-imageArea);
          height: var(--ps-sizing-imageArea);
          background-image: url(${o});
          background-size: cover;
          border-radius: var(--ps-border-radius);
          margin-bottom: var(--ps-spacing-gap);
        }
      `}),(0,r.jsx)(`div`,{className:`image`}),(0,r.jsx)(`h2`,{className:`title`,"aria-label":`Title`,children:e}),(0,r.jsx)(`p`,{className:`manufacturer`,"aria-label":`Manufacturer`,children:t}),(0,r.jsx)(`p`,{className:`tracking`,"aria-label":`Tracking Number`,children:n}),(0,r.jsxs)(`div`,{className:`cost`,"aria-label":`Cost Information`,children:[(0,r.jsx)(`span`,{className:`cost-label`,children:i}),(0,r.jsx)(`span`,{className:`cost-amount`,children:a})]})]})})),o,s,c;e((()=>{a(),o={title:`Components/AiDataCard`,component:i,tags:[`autodocs`],argTypes:{title:{control:`text`},manufacturer:{control:`text`},tracking:{control:`text`},costLabel:{control:`text`},costAmount:{control:`text`},imageSrc:{control:`text`},className:{control:`text`}}},s={args:{title:`Sample Title`,manufacturer:`manufacturer`,tracking:`tracking`,costLabel:`costLabel`,costAmount:`costAmount`,imageSrc:`imageSrc`,className:`className`}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Sample Title',
    manufacturer: 'manufacturer',
    tracking: 'tracking',
    costLabel: 'costLabel',
    costAmount: 'costAmount',
    imageSrc: 'imageSrc',
    className: 'className'
  }
}`,...s.parameters?.docs?.source}}},c=[`Default`]}))();export{s as Default,c as __namedExportsOrder,o as default};