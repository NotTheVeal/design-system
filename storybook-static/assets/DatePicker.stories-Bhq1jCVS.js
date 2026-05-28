import{i as e}from"./preload-helper-xPQekRTU.js";import{k as t}from"./iframe-3lkUr0nI.js";import{t as n}from"./jsx-runtime-CaZkqeYb.js";var r,i,a=e((()=>{t(),r=n(),i=({className:e,selectedDate:t,onDateSelect:n,ariaLabel:i})=>{let a=new Date(t.getFullYear(),t.getMonth()+1,0).getDate(),o=new Date(t.getFullYear(),t.getMonth(),1).getDay(),s=[];for(let e=0;e<o;e++)s.push((0,r.jsx)(`div`,{className:`day empty`},`empty-${e}`));for(let e=1;e<=a;e++){let a=new Date(t.getFullYear(),t.getMonth(),e),o=a.toDateString()===t.toDateString(),c=a.toDateString()===new Date().toDateString();s.push((0,r.jsx)(`button`,{className:`day ${o?`selected`:``} ${c?`today`:``}`,onClick:()=>n(a),"aria-label":i?`${i} ${e}`:`${e}`,children:e},e))}return(0,r.jsxs)(`div`,{className:`date-picker ${e}`,children:[(0,r.jsx)(`div`,{className:`calendar`,children:(0,r.jsx)(`div`,{className:`days`,children:s})}),(0,r.jsx)(`style`,{jsx:!0,children:`
        :root {
          --ps-color-background-calendar: transparent;
          --ps-color-background-day-default: transparent;
          --ps-color-background-day-hover: #e0e0e0;
          --ps-color-background-day-selected: #005BA6;
          --ps-color-background-day-today: #DCE6F1;
          --ps-color-text-day-default: #000;
          --ps-color-text-day-selected: #fff;
          --ps-color-text-day-today: #005BA6;
          --ps-color-border-calendar: #DCDCDC;
          --ps-spacing-cell-size: 36px;
          --ps-spacing-calendar-padding: 16px;
          --ps-border-radius-day: 50%;
          --ps-shadow-calendar: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .date-picker {
          font-family: 'Source Sans Pro', sans-serif;
        }

        .calendar {
          padding: var(--ps-spacing-calendar-padding);
          border: 1px solid var(--ps-color-border-calendar);
          border-radius: 8px;
          box-shadow: var(--ps-shadow-calendar);
        }

        .days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: var(--ps-spacing-gap);
        }

        .day {
          display: flex;
          justify-content: center;
          align-items: center;
          height: var(--ps-spacing-cell-size);
          border-radius: var(--ps-border-radius-day);
          background-color: var(--ps-color-background-day-default);
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .day:hover {
          background-color: var(--ps-color-background-day-hover);
        }

        .day.selected {
          background-color: var(--ps-color-background-day-selected);
          color: var(--ps-color-text-day-selected);
        }

        .day.today {
          background-color: var(--ps-color-background-day-today);
          color: var(--ps-color-text-day-today);
        }
      `})]})}})),o,s,c;e((()=>{a(),o={title:`Components/DatePicker`,component:i,tags:[`autodocs`],argTypes:{className:{control:`text`},selectedDate:{control:`text`},onDateSelect:{action:`called`},ariaLabel:{control:`text`}}},s={args:{className:`className`,selectedDate:`selectedDate`,onDateSelect:()=>{},ariaLabel:`ariaLabel`}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    className: 'className',
    selectedDate: 'selectedDate',
    onDateSelect: () => {},
    ariaLabel: 'ariaLabel'
  }
}`,...s.parameters?.docs?.source}}},c=[`Default`]}))();export{s as Default,c as __namedExportsOrder,o as default};