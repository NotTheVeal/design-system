import{i as e}from"./preload-helper-xPQekRTU.js";import{k as t}from"./iframe-3lkUr0nI.js";import{t as n}from"./jsx-runtime-CaZkqeYb.js";var r,i,a=e((()=>{t(),r=n(),i=({className:e=``,size:t=`md`,ariaLabel:n=`Loading...`})=>{let i=t===`sm`?`var(--ps-loading-spinner-sizing-sm)`:t===`lg`?`var(--ps-loading-spinner-sizing-lg)`:`var(--ps-loading-spinner-sizing-md)`;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(`style`,{children:`
          :root {
            --ps-font: 'Source Sans Pro', sans-serif;
            --ps-blue: #005BA6;
            --ps-midnight: #002F48;
            --ps-loading-spinner-sizing-sm: 16px;
            --ps-loading-spinner-sizing-md: 20px;
            --ps-loading-spinner-sizing-lg: 32px;
            --ps-loading-button-background: #005BA6;
            --ps-loading-button-border: #005BA6;
            --ps-loading-button-text: #FFFFFF;
            --ps-loading-skeleton-color-base: #F1F1F1;
            --ps-loading-skeleton-color-highlight: #FAFAFA;
          }
          .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: var(--ps-font);
            color: var(--ps-blue);
            min-height: 48px;
          }
          .spinner {
            width: ${i};
            height: ${i};
            border: 4px solid var(--ps-loading-button-border);
            border-top: 4px solid var(--ps-loading-button-text);
            border-radius: 50%;
            animation: spin var(--ps-loading-spinner-animation-duration) var(--ps-loading-spinner-animation-timing) var(--ps-loading-spinner-animation-iteration);
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}),(0,r.jsx)(`div`,{className:`loading ${e}`,role:`status`,"aria-label":n,children:(0,r.jsx)(`div`,{className:`spinner`,"aria-hidden":`true`})})]})}})),o,s,c;e((()=>{a(),o={title:`Components/Loading`,component:i,tags:[`autodocs`],argTypes:{className:{control:`text`},size:{control:`select`,options:[`sm`,`md`,`lg`]},ariaLabel:{control:`text`}}},s={args:{className:`className`,size:`sm`,ariaLabel:`ariaLabel`}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    className: 'className',
    size: 'sm',
    ariaLabel: 'ariaLabel'
  }
}`,...s.parameters?.docs?.source}}},c=[`Default`]}))();export{s as Default,c as __namedExportsOrder,o as default};