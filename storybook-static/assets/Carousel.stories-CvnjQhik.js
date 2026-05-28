import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{k as n}from"./iframe-3lkUr0nI.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";var i,a,o,s=e((()=>{i=t(n()),a=r(),o=({items:e,className:t})=>{let[n,r]=i.useState(0),o=()=>{r(t=>(t+1)%e.length)},s=()=>{r(t=>(t-1+e.length)%e.length)};return i.useEffect(()=>{let e=e=>{e.key===`ArrowRight`&&o(),e.key===`ArrowLeft`&&s()};return window.addEventListener(`keydown`,e),()=>{window.removeEventListener(`keydown`,e)}},[]),(0,a.jsxs)(`div`,{className:`carousel ${t}`,children:[(0,a.jsx)(`style`,{children:`
        :root {
          --ps-carousel-background: #fff;
          --ps-carousel-border: #DCDCDC;
          --ps-carousel-border-width: 1px;
          --ps-carousel-radius: 8px;
          --ps-carousel-slide-padding-v: 24px;
          --ps-carousel-slide-padding-h: 24px;
          --ps-carousel-slide-gap: 16px;
          --ps-carousel-navigation-arrow-background: #fff;
          --ps-carousel-navigation-arrow-background-hover: #f4f4f4;
          --ps-carousel-navigation-arrow-border: #DCDCDC;
          --ps-carousel-navigation-arrow-border-width: 1px;
          --ps-carousel-navigation-arrow-radius: 50%;
          --ps-carousel-navigation-arrow-size: 32px;
          --ps-carousel-navigation-arrow-icon: #999;
          --ps-carousel-navigation-arrow-icon-hover: #005BA6;
          --ps-carousel-navigation-dot-size: 8px;
          --ps-carousel-navigation-dot-size-active: 24px;
          --ps-carousel-navigation-dot-radius: 100px;
          --ps-carousel-navigation-dot-color: #ccc;
          --ps-carousel-navigation-dot-color-active: #005BA6;
          --ps-carousel-navigation-dot-gap: 6px;
          --ps-carousel-animation-duration: 300ms;
          --ps-carousel-animation-easing: ease-in-out;
        }
        .carousel {
          background: var(--ps-carousel-background);
          border: var(--ps-carousel-border) solid var(--ps-carousel-border-width);
          border-radius: var(--ps-carousel-radius);
          overflow: hidden;
          position: relative;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .carousel-slide {
          display: flex;
          padding: var(--ps-carousel-slide-padding-v) var(--ps-carousel-slide-padding-h);
          transition: transform var(--ps-carousel-animation-duration) var(--ps-carousel-animation-easing);
          transform: translateX(-${n*100}%);
        }
        .carousel-navigation {
          position: absolute;
          top: 50%;
          width: 100%;
          display: flex;
          justify-content: space-between;
          transform: translateY(-50%);
        }
        .arrow {
          background: var(--ps-carousel-navigation-arrow-background);
          border: var(--ps-carousel-navigation-arrow-border) solid var(--ps-carousel-navigation-arrow-border-width);
          border-radius: var(--ps-carousel-navigation-arrow-radius);
          width: var(--ps-carousel-navigation-arrow-size);
          height: var(--ps-carousel-navigation-arrow-size);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s;
        }
        .arrow:hover {
          background: var(--ps-carousel-navigation-arrow-background-hover);
        }
        .dot-container {
          text-align: center;
          margin-top: 16px;
        }
        .dot {
          display: inline-block;
          width: var(--ps-carousel-navigation-dot-size);
          height: var(--ps-carousel-navigation-dot-size);
          border-radius: var(--ps-carousel-navigation-dot-radius);
          background: var(--ps-carousel-navigation-dot-color);
          margin: var(--ps-carousel-navigation-dot-gap);
          cursor: pointer;
          transition: width .3s, height .3s, background .3s;
        }
        .dot-active {
          width: var(--ps-carousel-navigation-dot-size-active);
          height: var(--ps-carousel-navigation-dot-size-active);
          background: var(--ps-carousel-navigation-dot-color-active);
        }
      `}),(0,a.jsx)(`div`,{className:`carousel-slide`,role:`region`,"aria-label":`Image carousel`,tabIndex:0,children:e.map((e,t)=>(0,a.jsx)(`div`,{className:`carousel-item`,style:{minWidth:`100%`},children:e},t))}),(0,a.jsxs)(`div`,{className:`carousel-navigation`,"aria-label":`Carousel navigation`,children:[(0,a.jsx)(`div`,{className:`arrow`,onClick:s,"aria-label":`Previous slide`,role:`button`,tabIndex:0,onKeyPress:e=>e.key===`Enter`&&s(),children:`◀`}),(0,a.jsx)(`div`,{className:`arrow`,onClick:o,"aria-label":`Next slide`,role:`button`,tabIndex:0,onKeyPress:e=>e.key===`Enter`&&o(),children:`▶`})]}),(0,a.jsx)(`div`,{className:`dot-container`,children:e.map((e,t)=>(0,a.jsx)(`div`,{className:`dot ${n===t?`dot-active`:``}`,onClick:()=>r(t),"aria-label":`Go to slide ${t+1}`,role:`button`,tabIndex:0,onKeyPress:e=>e.key===`Enter`&&r(t)},t))})]})}})),c,l,u;e((()=>{s(),c={title:`Components/Carousel`,component:o,tags:[`autodocs`],argTypes:{items:{control:`text`},className:{control:`text`}}},l={args:{items:`Sample content`,className:`className`}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    items: 'Sample content',
    className: 'className'
  }
}`,...l.parameters?.docs?.source}}},u=[`Default`]}))();export{l as Default,u as __namedExportsOrder,c as default};