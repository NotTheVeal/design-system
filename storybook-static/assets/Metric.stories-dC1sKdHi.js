import{i as e}from"./preload-helper-xPQekRTU.js";import{k as t}from"./iframe-3lkUr0nI.js";import{t as n}from"./jsx-runtime-CaZkqeYb.js";var r,i,a=e((()=>{t(),r=n(),i=({value:e,label:t,trend:n,className:i})=>(0,r.jsxs)(`div`,{className:`metric ${i}`,role:`metric`,"aria-label":`${t}: ${e}`,children:[(0,r.jsx)(`style`,{children:`
          :root {
            --ps-font: 'Source Sans Pro', sans-serif;
            --ps-color-primary: #005BA6;
            --ps-color-midnight: #002F48;
            --ps-color-background: var(--ps-metric-color-background);
            --ps-color-border: var(--ps-metric-color-border);
            --ps-spacing-padding: 16px;
            --ps-border-radius: 4px;
            --ps-border-width: 1px;
            --ps-shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.1);
            --ps-focus-ring: 0 0 0 3px rgba(0, 147, 244, 0.3);
          }
          .metric {
            font-family: var(--ps-font);
            background: var(--ps-color-background);
            padding: var(--ps-spacing-padding);
            border-radius: var(--ps-border-radius);
            border: var(--ps-border-width) solid var(--ps-color-border);
            transition: box-shadow 0.2s;
          }
          .metric:hover {
            box-shadow: var(--ps-shadow-hover);
          }
          .value {
            font-size: var(--ps-metric-typography-value-fontSize);
            font-weight: var(--ps-metric-typography-value-fontWeight);
            color: var(--ps-metric-color-text-primary);
          }
          .label {
            font-size: var(--ps-metric-typography-label-fontSize);
            font-weight: var(--ps-metric-typography-label-fontWeight);
            color: var(--ps-metric-color-label);
          }
          .trend-positive {
            color: var(--ps-metric-color-trend-positive);
          }
          .trend-negative {
            color: var(--ps-metric-color-trend-negative);
          }
          .trend-neutral {
            color: var(--ps-metric-color-trend-neutral);
          }
        `}),(0,r.jsx)(`span`,{className:`value ${n?`trend-${n}`:``}`,children:e}),(0,r.jsx)(`span`,{className:`label`,children:t})]})})),o,s,c;e((()=>{a(),o={title:`Components/Metric`,component:i,tags:[`autodocs`],argTypes:{value:{control:`text`},label:{control:`text`},trend:{control:`select`,options:[`positive`,`negative`,`neutral`]},className:{control:`text`}}},s={args:{value:`value`,label:`Label`,trend:`positive`,className:`className`}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'value',
    label: 'Label',
    trend: 'positive',
    className: 'className'
  }
}`,...s.parameters?.docs?.source}}},c=[`Default`]}))();export{s as Default,c as __namedExportsOrder,o as default};