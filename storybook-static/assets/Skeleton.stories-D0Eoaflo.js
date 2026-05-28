import{i as e}from"./preload-helper-xPQekRTU.js";import{k as t}from"./iframe-3lkUr0nI.js";import{t as n}from"./jsx-runtime-CaZkqeYb.js";var r,i,a=e((()=>{t(),r=n(),i=({className:e,height:t=24,width:n=`100%`,style:i,animate:a=!0})=>(0,r.jsx)(`div`,{className:`skeleton ${e}`,style:{...i,height:`${t}px`,width:typeof n==`number`?`${n}px`:n,backgroundColor:`var(--ps-skeleton-background)`,borderRadius:`var(--ps-skeleton-radius.text)`,animation:a?`skeleton-loading var(--ps-skeleton-animation-duration) var(--ps-skeleton-animation-easing) infinite`:void 0},role:`status`,"aria-label":`Loading content`,tabIndex:0,children:(0,r.jsx)(`style`,{children:`
          :root {
            --ps-skeleton-background: #f0f0f0;
            --ps-skeleton-radius: 4px;
            --ps-skeleton-animation-duration: 1400ms;
            --ps-skeleton-animation-easing: ease-in-out;
          }
          .skeleton {
            display: inline-block;
            overflow: hidden;
            position: relative;
            background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
            background-size: 200% 100%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          @keyframes skeleton-loading {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: 0 0;
            }
          }
        `})})})),o,s,c;e((()=>{a(),o={title:`Components/Skeleton`,component:i,tags:[`autodocs`],argTypes:{className:{control:`text`},height:{control:`number`},width:{control:`number`},style:{control:`text`},animate:{control:`boolean`}}},s={args:{className:`className`,height:1,width:1,style:{},animate:!0}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    className: 'className',
    height: 1,
    width: 1,
    style: {},
    animate: true
  }
}`,...s.parameters?.docs?.source}}},c=[`Default`]}))();export{s as Default,c as __namedExportsOrder,o as default};