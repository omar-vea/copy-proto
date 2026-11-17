// Общая шапка экосистемы COPY.RU (прототип).
// Страница вставляет <script src="hdr.js" data-svc="copy"></script> там, где нужна шапка.
// Скрипт берёт запись сервиса из SVC и собирает шапку на этом месте. Поменял шаблон, поменялось везде.
// В бою этот же HTML отдаёт сервер, а скрипт только оживляет город, тему и меню (см. ecosystem.html, раздел 06).
(()=>{
// Записи сервисов. tab: название сайта в верхней полосе, по смыслу для человека, до 14 знаков. Пункты меню с живых сайтов на 10.11.2026, не больше пяти.
const SVC={
  // TODO(бой): «Статус заказа» после входа ведёт в «Мои заказы» (https://copy.ru/account/orders), без входа — на форму по номеру заказа
  copy: {tab:'Печать',tag:'',search:'Визитки, фото, переплёт',nav:[['Копицентры','https://copy.ru/contacts/','map'],['Статус заказа','home.html#status','box']],icons:['user','cart'],cta:''},
  ai:   {tab:'Нейродизайн',tag:'AI',nav:[['Стикерпак'],['3D-стикеры'],['Футболка'],['Кружка'],['Реставрация']],icons:['user'],cta:'Попробовать бесплатно'},
  gifts:{tab:'Сувениры',tag:'ПОДАРКИ',search:'Поиск по каталогу',nav:[['Новинки'],['Виды нанесения'],['Портфолио']],icons:['heart','user','cart'],cta:'Оставить заявку'},
  pro:  {tab:'Дизайнерам',tag:'PRO',nav:[['Требования к макетам'],['Оплата и доставка'],['Контакты']],icons:['user'],cta:'Рассчитать'},
  b2b:  {tab:'Бизнесу',tag:'B2B',nav:[['Преимущества'],['Калькулятор'],['Скидки'],['С кем работаем']],icons:[],cta:'Стать B2B-клиентом'},
  api:  {tab:'Разработчикам',tag:'API',nav:[['Документация']],icons:['user'],cta:'Оставить заявку'},
};
// Число копицентров с copy.ru на 10.11.2026.
// знаки городов по правилам Lucide (сетка 24, линия 1,8, круглые концы): Екатеринбург mountain-snow, Сочи tree-palm, Ярославль church — из Lucide 0.460.0;
// Москва (звезда на шатре Спасской башни), Нижний (башня кремля между стенами с зубцами), Тюмень (станок-качалка) нарисованы по тем же правилам
const CITIES=[
  ['Москва',28,'M12.00 1.10L13.06 3.94L16.09 4.07L13.71 5.96L14.53 8.88L12.00 7.20L9.47 8.88L10.29 5.96L7.91 4.07L10.94 3.94ZM12 10v1.5M12 11.5 8 22h8z'],
  ['Екатеринбург',2,'m8 3 4 8 5-5 5 15H2L8 3zM4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19'],
  ['Нижний Новгород',2,'M9 22V10l3-7 3 7v12M9 10h6M2 22v-8h2v1.5h1.5V14h1.5v1.5H9M22 22v-8h-2v1.5h-1.5V14H17v1.5h-2M1.5 22h21'],
  ['Сочи',2,'M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14'],
  ['Тюмень',1,'M9 22l3-12 3 12M3 9l18-3M3 6.5c-1.3 1-1.3 3.5 0 4.5M4 11v11M2 22h20M12 8.5v.01'],
  ['Ярославль',1,'M10 9h4M12 7v5M14 22v-4a2 2 0 0 0-4 0v4M18 22V5.618a1 1 0 0 0-.553-.894l-4.553-2.277a2 2 0 0 0-1.788 0L6.553 4.724A1 1 0 0 0 6 5.618V22M18 7l3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.618a1 1 0 0 1 .553-.894L6 7']
];

// Значки шапки — Lucide 0.460.0 (ISC, icons/LICENSE-lucide.txt), сетка 24, линия 1,8, концы и стыки круглые (задаёт ico)
const I={
  search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  pin:'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  box:'<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"/><path d="m7.5 4.27 9 5.15"/>',
  user:'<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
  cart:'<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  menu:'<path class="k1" d="M4 6h16M4 12h16M4 18h16"/><path class="k2" d="M18 6 6 18M6 6l12 12"/>',
  chev:'<path d="m9 18 6-6-6-6"/>',
  back:'<path d="m15 18-6-6 6-6"/>',
  down:'<path d="m6 9 6 6 6-6"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  flame:'<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  file:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/>',
  truck:'<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  mobile:'<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
  grid:'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  bld:'<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
  moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  zap:'<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  map:'<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
  phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>', // Lucide message-square: круглый пузырь похож на знак WhatsApp (решение по hdr-empty, PROGRESS)
  mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
};
const LBL={search:'Поиск',user:'Войти',cart:'Корзина',heart:'Избранное',menu:'Меню'};
const ico=(n,c='ico')=>`<svg class="${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
// иконка с подписью; подпись прячется на узких экранах, но остаётся для читалок
// «Войти» (класс u) на телефоне остаётся значком между поиском и меню; остальные значки-ссылки на телефоне скрыты
const iconLink=n=>`<a href="#"${n==='user'?' class="u"':''}>${ico(n)}<span class="lbl">${LBL[n]}</span></a>`;
// кнопки только для телефона (до 980): поиск, меню
const mBtn=(n,id)=>`<button class="m" id="${id}" type="button">${ico(n)}<span class="lbl">${LBL[n]}</span></button>`;

const me=document.currentScript, k=me.dataset.svc||'copy', s=SVC[k];
me.insertAdjacentHTML('beforebegin',`<div class="eco"><div class="wrap">
  <nav>${Object.keys(SVC).map(o=>`<a href="#"${o===k?' class="on" aria-current="page"':''}>${SVC[o].tab}</a>`).join('')}</nav>
  <div class="r">
    <button class="cty" id="cityBtn" type="button" aria-haspopup="dialog" aria-expanded="false">${ico('pin','')}<span data-city>Москва</span>${ico('down','chev')}</button>
    <a class="elogo" href="home.html" aria-label="COPY.RU"><svg class="wm" viewBox="69 0 480 196" aria-hidden="true"><use href="#wm" width="618" height="196"/></svg></a>
    <a class="cty tel" data-ct="tel" href="tel:+74951561000">+7 495 156-10-00</a>
    <button class="cty" id="msgBtn" type="button" aria-haspopup="dialog" aria-expanded="false">${ico('phone','ph')}${ico('chat','ch')}<span class="lbl">Связаться</span>${ico('down','chev')}</button>
    <button class="theme" id="themeBtn" type="button">Тёмная тема</button>
  </div>
</div></div>
<header class="hdr"><div class="wrap">
  <a class="logo" href="home.html" aria-label="COPY.RU${s.tag?' '+s.tag:''}"><svg class="wm" viewBox="69 0 480 196"><use href="#wm" width="618" height="196"/></svg>${s.tag?`<span class="tag">${s.tag}</span>`:''}</a>
  ${s.search?`<button class="btn btn-p btn-sm" id="catBtn" type="button" aria-haspopup="dialog" aria-expanded="false">${ico('menu','kb')}Каталог</button><form class="search" role="search" action="#" data-todo>${ico('search')}<input type="search" name="q" placeholder="${s.search}" aria-label="Поиск по сайту" autocomplete="off" enterkeyhint="search"><button class="clr" type="reset" aria-label="Очистить">${ico('x','')}</button></form><button class="scl" type="button">Отмена</button>`:''}
  <nav class="links">${s.nav.map(([t,h,i])=>`<a href="${h||'#'}">${i?ico(i):''}${t}</a>`).join('')}</nav>
  <div class="hicons">${s.search?mBtn('search','sBtn'):''}${s.icons.map(iconLink).join('')}${mBtn('menu','mnBtn')}</div>
  ${s.cta?`<a class="btn btn-p btn-sm cta" href="#">${s.cta}</a>`:''}
</div></header>`);

// после «Очистить» курсор остаётся в поле, чтобы сразу печатать заново
const sf=document.querySelector('.hdr .search');if(sf)sf.onreset=()=>setTimeout(()=>sf.q.focus());

// подсказка у иконки темы повторяет текст кнопки (текст меняет скрипт страницы)
const th=document.getElementById('themeBtn'), tip=()=>th.title=th.textContent;
tip();new MutationObserver(tip).observe(th,{childList:true});

// статус-бар телефона цвета шапки (--surface), в том числе после ручной смены темы.
// Цвет берём с body (его фон-цвет = --surface): у .hdr на телефоне фона нет (под ним размытие), там прозрачный
const paintBar=()=>{const c=getComputedStyle(document.body).backgroundColor;
  document.querySelectorAll('meta[name=theme-color]').forEach(m=>{m.content=c;m.removeAttribute('media')})};
// Safari iOS 26 берёт цвет статус-бара только при загрузке и на лету не перекрашивает (проверено на iPhone:
// ни theme-color, ни сплошная полоса у верха не помогли). Поэтому на сенсорных экранах смена темы перезагружает страницу;
// тема уже сохранена, место прокрутки Safari возвращает сам. setTimeout — после обработчика страницы, который сохраняет тему
// выбор темы: запоминаем, какой была система (ранний скрипт в <head> сбросит выбор, когда система переключится сама);
// выбрал то же, что в системе, — это «авто», ничего не храним. setTimeout — после обработчика страницы, который сохраняет тему
document.getElementById('themeBtn').addEventListener('click',()=>setTimeout(()=>{try{const L=localStorage,now=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  if(L.getItem('copy-theme')===now){L.removeItem('copy-theme');L.removeItem('copy-theme-sys')}else L.setItem('copy-theme-sys',now)}catch(e){}}));
document.getElementById('themeBtn').addEventListener('click',()=>{if(!matchMedia('(hover:none)').matches)return;
  // тему меняли из меню — после перезагрузки откроем его снова (флаг на одну загрузку)
  // значение флага — где была страница под меню (меню прокручивает её в 0), чтобы после перезагрузки закрытие меню вернуло туда же
  {const hm=document.querySelector('.hdr.mopen');if(hm)try{sessionStorage.setItem('copy-menu',hm.dataset.y||'0')}catch(e){}}
  setTimeout(()=>location.reload())});
paintBar();new MutationObserver(paintBar).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',paintBar);

// выпадающие списки: город, «Связаться». На ≤980 открываются шторкой снизу.
const veil=document.createElement('div');veil.className='cveil';veil.hidden=true;document.body.append(veil);
let shown=null;
function dropdown(btn,id,label,html,focusSel){
  const pop=document.createElement('div');pop.className='cpop';pop.id=id;pop.hidden=true;
  pop.setAttribute('role','dialog');pop.setAttribute('aria-label',label);pop.innerHTML=html;
  btn.after(pop);btn.setAttribute('aria-controls',id);
  const d={pop,btn,open(v,mouse){if(v&&shown&&shown!==d)shown.open(false);
    pop.hidden=veil.hidden=!v;btn.setAttribute('aria-expanded',v);shown=v?d:null;
    if(!v)return;
    // вкладкой из кнопки: верх по низу кнопки (нахлёст 1px), не уже кнопки; не влезает вправо — прижать к правому краю кнопки.
    // На ≤980 это шторка снизу, позицию задаёт CSS
    pop.style.left=pop.style.top=pop.style.minWidth='';pop.classList.remove('rt');
    if(!matchMedia('(max-width:980px)').matches){const r=btn.parentElement.getBoundingClientRect(),b=btn.getBoundingClientRect(),bl=b.left-r.left;
      pop.style.minWidth=b.width+'px';pop.style.top=(b.bottom-r.top-1)+'px';
      const rt=bl+pop.offsetWidth>r.width;pop.classList.toggle('rt',rt);
      pop.style.left=(rt?bl+b.width-pop.offsetWidth:bl)+'px'}
    // телефон, меню под кнопкой (data-anchor): левый край по кнопке, не дальше правого поля 16
    else if('anchor' in pop.dataset){const b=btn.getBoundingClientRect();const l=Math.max(16,Math.min(b.left,innerWidth-16-pop.offsetWidth));
      pop.style.setProperty('--pt',(b.bottom-1)+'px');pop.style.setProperty('--pl',l+'px');pop.classList.toggle('lt',Math.abs(l-b.left)<1)} // вкладкой: верх по низу кнопки, lt — левые края совпали, угол прямой // через переменные: у шторки top/left с !important
    // фокус в список всегда, рамка фокуса только при открытии с клавиатуры
    (pop.querySelector(focusSel)||pop.querySelector('a,button')).focus({focusVisible:!mouse})}};
  btn.onclick=e=>d.open(pop.hidden,e.detail>0);
  return d;
}
veil.onclick=()=>shown&&shown.open(false);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&shown){const b=shown.btn;shown.open(false);b.focus()}});
document.addEventListener('click',e=>{if(shown&&!shown.pop.contains(e.target)&&!shown.btn.contains(e.target))shown.open(false)});

// значки разделов каталога: Lucide 0.460.0 (lucide.dev), лицензия ISC (текст в icons/LICENSE-lucide.txt), © Lucide Contributors; линия у нас 1.8 вместо 2
const KICO={
  'printer':'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/> <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/> <rect x="6" y="14" width="12" height="8" rx="1"/>',
  'image':'<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/> <circle cx="9" cy="9" r="2"/> <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  'id-card':'<path d="M16 10h2"/> <path d="M16 14h2"/> <path d="M6.17 15a3 3 0 0 1 5.66 0"/> <circle cx="9" cy="11" r="2"/> <rect x="2" y="5" width="20" height="14" rx="2"/>',
  'presentation':'<path d="M2 3h20"/> <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/> <path d="m7 21 5-5 5 5"/>',
  'book-open':'<path d="M12 7v14"/> <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  'pen-tool':'<path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"/> <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"/> <path d="m2.3 2.3 7.286 7.286"/> <circle cx="11" cy="11" r="2"/>',
  'gift':'<rect x="3" y="8" width="18" height="4" rx="1"/> <path d="M12 8v13"/> <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/> <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
  'tags':'<path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19"/> <path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z"/> <circle cx="6.5" cy="9.5" r=".5" fill="currentColor"/>',
  'layers':'<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/> <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/> <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  'laptop':'<path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>'
};
// каталог: слева разделы, справа группы наведённого раздела. Данные в catalog-data.js, грузятся при первом открытии.
// Пункты слева — ссылки на страницу раздела: наведение и фокус переключают правую часть; клик по ещё не открытому разделу (тач) только переключает.
// Клавиатура: ↑↓ по разделам, → или Tab в группы, ← обратно. На ≤980 правой части нет, разделы сразу ведут на страницу.
const needCat=cb=>{if(window.COPY_CATALOG)return cb();
  const sc=document.createElement('script');sc.src=new URL('catalog-data.js?v=2',me.src).href;sc.onload=cb;document.head.append(sc)};
const kBtn=document.getElementById('catBtn');
if(kBtn){
  const kp=document.createElement('div');kp.className='kpop';kp.id='catPop';kp.hidden=true;
  kp.setAttribute('role','dialog');kp.setAttribute('aria-label','Каталог');
  kp.innerHTML='<div class="wrap"><ul class="kside"></ul><div class="kmain"></div></div>';
  document.querySelector('.hdr').append(kp);kBtn.setAttribute('aria-controls','catPop');
  const side=kp.querySelector('.kside'),main=kp.querySelector('.kmain'),MORE=5;
  let C=null,act=-1,tm;
  const esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;');
  const url=h=>C.base+h;
  const pick=i=>{if(i===act)return;act=i;
    side.querySelectorAll('a').forEach((a,j)=>a.setAttribute('aria-current',j===i));
    const [t,h,g]=C.items[i];
    main.innerHTML=`<h2 class="khead"><a href="${url(h)}">${esc(t)}</a></h2><div class="kcols">`+
      g.map(([gt,gh,it])=>`<div class="kg"><a class="kh" href="${url(gh)}">${esc(gt)}</a>${it.length?'<ul>'+it.slice(0,MORE).map(([n,u])=>`<li><a href="${url(u)}">${esc(n)}</a></li>`).join('')+
        (it.length>MORE?`<li><a class="kmore" href="${url(gh)}">Ещё ${it.length-MORE}</a></li>`:'')+'</ul>':''}</div>`).join('')+'</div>';
    main.scrollTop=0};
  const build=()=>{side.innerHTML=C.items.map(([t,h,,k])=>`<li><a href="${url(h)}">${KICO[k]?`<svg viewBox="0 0 24 24" aria-hidden="true">${KICO[k]}</svg>`:''}${esc(t)}</a></li>`).join('');
    const L=[...side.querySelectorAll('a')];
    L.forEach((a,i)=>{
      a.onmouseenter=()=>{clearTimeout(tm);tm=setTimeout(()=>pick(i),act<0?0:90)};
      a.onmouseleave=()=>clearTimeout(tm);
      a.onfocus=()=>pick(i);
      a.onclick=e=>{if(wide()&&i!==act){e.preventDefault();pick(i)}};
      a.onkeydown=e=>{const k=e.key;
        if(k==='ArrowDown'||k==='ArrowUp'){e.preventDefault();L[(i+(k==='ArrowDown'?1:L.length-1))%L.length].focus()}
        else if((k==='ArrowRight'||k==='Tab'&&!e.shiftKey)&&wide()){e.preventDefault();main.querySelector('a').focus()}}});
    main.onkeydown=e=>{if(e.key==='ArrowLeft'||e.key==='Tab'&&e.shiftKey&&e.target===main.querySelector('a')){e.preventDefault();L[act].focus()}};
    pick(0)};
  const hdr=document.querySelector('.hdr'),vtop=()=>veil.style.top=hdr.getBoundingClientRect().bottom+'px';
  const wide=()=>!matchMedia('(max-width:980px)').matches;
  const go=mouse=>{if(!C)C=window.COPY_CATALOG;if(!side.firstChild)build();
    (side.querySelector('[aria-current="true"]')||side.querySelector('a')).focus({focusVisible:!mouse})};
  const cat={pop:kp,btn:kBtn,open(v,mouse){if(v&&shown&&shown!==cat)shown.open(false);
    kp.hidden=veil.hidden=!v;veil.classList.toggle('k',v);hdr.classList.toggle('kopen',v);kBtn.setAttribute('aria-expanded',v);shown=v?cat:null;
    // затемнение начинается под шапкой: обе полосы шапки остаются чистыми; при прокрутке край шапки едет, следим за ним
    if(!v){veil.style.top='';removeEventListener('scroll',vtop);return}
    vtop();addEventListener('scroll',vtop,{passive:true});
    needCat(()=>shown===cat&&go(mouse))}};
  kBtn.onclick=e=>cat.open(kp.hidden,e.detail>0);
  // фокус ушёл из каталога табом — закрыть, чтобы панель не висела над страницей
  kp.addEventListener('focusout',e=>{if(shown===cat&&e.relatedTarget&&!kp.contains(e.relatedTarget)&&e.relatedTarget!==kBtn)cat.open(false)});
}

// город. В прототипе в localStorage, в бою в cookie на .copy.ru.
const cBtn=document.getElementById('cityBtn'), nameEl=cBtn.querySelector('[data-city]');
const plural=n=>n%10===1&&n%100!==11?'копицентр':n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?'копицентра':'копицентров';
let cur='Москва';try{const c=localStorage.getItem('copy-city');if(CITIES.some(x=>x[0]===c))cur=c}catch(e){}
const city=dropdown(cBtn,'cityPop','Выбор города',
  '<h3>Ваш город</h3><ul>'+CITIES.map(([c,n,d])=>`<li><button type="button" data-c="${c}"><svg class="mi" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>${c}<span>${n}<i> ${plural(n)}</i></span></button></li>`).join('')+
  '</ul>','[aria-current="true"]');
city.pop.dataset.anchor=''; // на телефоне — меню под плашкой, а не шторка снизу
// на телефоне в полосе мало места: длинное название коротко, в шторке и на компьютере полностью
const SHORT={'Нижний Новгород':'Н. Новгород'};
const paint=()=>{nameEl.innerHTML=SHORT[cur]?`<span class="full">${cur}</span><span class="short" aria-hidden="true">${SHORT[cur]}</span>`:cur;city.pop.querySelectorAll('button').forEach(b=>b.setAttribute('aria-current',b.dataset.c===cur))};
// телефон: если плашка «город | Связаться» подходит к логотипу ближе 12 px, прячем подпись «Связаться» (остаются трубка и стрелка)
const ecoFit=()=>{const e=cBtn.closest('.eco'),l=e&&e.querySelector('.elogo');if(!l)return;e.classList.remove('tight');
  if(l.offsetWidth&&cBtn.getBoundingClientRect().left-l.getBoundingClientRect().right<12)e.classList.add('tight')};
addEventListener('resize',ecoFit);document.addEventListener('copy:city',ecoFit);
paint();ecoFit();document.fonts?.ready.then(ecoFit);
// ВРЕМЕННО: на телефоне системный выбор города («Москва · 28») поверх кнопки; своя выпадашка отложена до полировки, на компьютере остаётся.
// Прозрачный select лежит в .r над кнопкой города, выбор отдаём в обработчик своей выпадашки
const csel=document.createElement('select');csel.className='csel';csel.setAttribute('aria-label','Город');
csel.innerHTML=CITIES.map(([c,n])=>`<option value="${c}">${c} · ${n}</option>`).join('');csel.value=cur;
cBtn.parentElement.append(csel);
// прозрачный select ровно над кнопкой, зона как у кнопки: 6 сверху, 8 снизу
const overBtn=(sel,b)=>{const st=sel.style;st.left=b.offsetLeft+'px';st.width=b.offsetWidth+'px';st.top=(b.offsetTop-6)+'px';st.height=(b.offsetHeight+14)+'px'};
const placeSel=()=>overBtn(csel,cBtn);
csel.onchange=()=>{city.pop.querySelector(`[data-c="${csel.value}"]`).click();city.open(false)};
document.addEventListener('copy:city',()=>{csel.value=cur;placeSel()});addEventListener('resize',placeSel);placeSel();document.fonts?.ready.then(placeSel);
// город, определённый не человеком (по местоположению на карте; в бою — по IP): save:false — не запоминаем, выбор человека в шапке важнее
document.addEventListener('copy:city-set',e=>{const c=e.detail?.c;if(!CITIES.some(x=>x[0]===c)||c===cur)return;cur=c;
  if(e.detail.save){try{localStorage.setItem('copy-city',cur)}catch(e){}}paint();document.dispatchEvent(new CustomEvent('copy:city',{detail:cur}))});
city.pop.onclick=e=>{const b=e.target.closest('button');if(!b)return;cur=b.dataset.c;try{localStorage.setItem('copy-city',cur)}catch(e){}
  paint();city.open(false);cBtn.focus();document.dispatchEvent(new CustomEvent('copy:city',{detail:cur}))};

// «Связаться». Значки: Telegram из Simple Icons (CC0), WhatsApp свой упрощённый (заменить официальным), MAX с max.ru/favicon.svg (72 КБ, разработчикам ужать). Ссылки на бота Telegram и чат MAX пока неизвестны: заглушки (см. DECISIONS.md).
// «Быстрый заказ» первым: заявка — тоже способ связаться (дубль строки меню). ведёт на fast-order.html
const MSG=`<li class="mfast"><a href="fast-order.html">${ico('zap','mi')}Быстрый заказ<span>перезвоним</span></a></li>
  <li class="mcall"><a data-ct="tel" href="tel:+74951561000">${ico('phone','mi')}Позвонить<span data-ct="tel-t">+7 495 156-10-00</span></a></li>
  <li><a href="#" data-todo="бот Telegram"><img src="icons/telegram.svg" alt="" width="20" height="20">Telegram<span>откроется чат</span></a></li>
  <li><a href="#" data-todo="WhatsApp"><img src="icons/whatsapp.svg" alt="" width="20" height="20">WhatsApp<span>откроется чат</span></a></li>
  <li><a href="#" data-todo="чат MAX"><img src="icons/max-flat.svg?v=2" alt="" width="20" height="20">MAX<span>откроется чат</span></a></li>
  <li><a data-ct="mail" href="mailto:zakaz@copy.ru">${ico('mail','mi')}Почта<span data-ct="mail-t">zakaz@copy.ru</span></a></li>`;
dropdown(document.getElementById('msgBtn'),'msgPop','Связаться',`<h3>Связаться · <span data-ct="city">Москва</span></h3><ul>${MSG}</ul>`);
// ВРЕМЕННО: на телефоне «Связаться» тоже системным списком. Пункты собираем из ссылок шторки (контакты города уже подставлены),
// выбор = нажатие этой ссылки (tel:, mailto:, чат). Первый пункт «Связаться» — заголовок, после выбора возвращаемся к нему
{const mb=document.getElementById('msgBtn'),links=[...document.querySelectorAll('#msgPop a')],ms=document.createElement('select');
  ms.className='csel';ms.setAttribute('aria-label','Связаться');mb.parentElement.append(ms);
  const fill=()=>{ms.innerHTML='<option value="" disabled selected>Связаться</option>'+links.map((a,i)=>{
      const t=[...a.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim(),v=a.dataset.ct?a.querySelector('span').textContent:'';
      return `<option value="${i}"${a.getAttribute('href')==='#'&&a.dataset.ct?' disabled':''}>${t}${v?' · '+v:''}</option>`}).join('');overBtn(ms,mb)};
  ms.onchange=()=>{const a=links[+ms.value];ms.value='';a&&a.click()};
  // copy:city — через setTimeout: ctPaint подписан позже и сначала должен подставить контакты города
  fill();document.addEventListener('copy:city',()=>setTimeout(fill));addEventListener('resize',()=>overBtn(ms,mb));document.fonts?.ready.then(()=>overBtn(ms,mb))}
// контакты зависят от города: у регионов свой телефон и почта (пользователь, 2026-11-11). Чаты общие.
// TODO данные: номера и почты регионов уточнить у клиента; пока заглушка «уточняем», чтобы в демо не звонили в Москву
const CT={'Москва':['+7 495 156-10-00','zakaz@copy.ru']};
const ctPaint=()=>{const ok=!!CT[cur],[t,m]=CT[cur]||['номер уточняем','почту уточняем'];
  document.querySelectorAll('[data-ct="tel"]').forEach(a=>{a.href=ok?'tel:'+t.replace(/[^+\d]/g,''):'#';if(a.classList.contains('tel'))a.textContent=t});
  document.querySelectorAll('[data-ct="tel-t"]').forEach(e=>e.textContent=t);
  document.querySelectorAll('[data-ct="mail"]').forEach(a=>a.href=ok?'mailto:'+m:'#');
  document.querySelectorAll('[data-ct="mail-t"]').forEach(e=>e.textContent=m);
  document.querySelectorAll('[data-ct="city"]').forEach(e=>e.textContent=cur)};
ctPaint();document.addEventListener('copy:city',ctPaint);

// ПОИСК. Телефон: шапка остаётся, кнопки уходят, страница гаснет под белым, под полем панель .hsr во весь экран.
// Компьютер: та же панель выпадает под полем, пока поле в фокусе.
// Пустое поле или 1 знак — «Часто ищут». С 2 знаков — результаты по мере набора: до 6 строк и «Все результаты».
// Ничего не нашли — помогаем: другая раскладка, номер заказа → статус, город → копицентры, похожее, быстрый заказ с текстом запроса.
// Почему так: из 200 частых запросов 31 % ничего не находят на живом сайте (Метрика, 30 дней; _research/metrika-summary.md).
// TODO(бой): результаты отдаёт GET /api/search?s= (results, related, correction). Запрос через 250 мс после последней буквы,
//   прошлый запрос отменять (AbortController): API отвечает 0,3–0,9 с. Здесь, в прототипе, ищем по catalog-data.js
//   (API copy.ru не пускает запросы с чужого адреса). Раскладку, номер заказа и город фронт проверяет сам, бэк не нужен.
// TODO(бой): районы и метро («люберцы», «коньково») сверять с адресами копицентров — в прототипе только города.
const sBtn=document.getElementById('sBtn');
if(sBtn){const h=document.querySelector('.hdr'),f=h.querySelector('.search'),sc=h.querySelector('.scl');
  const res=document.createElement('div');res.className='hsr';res.id='hsr';res.setAttribute('role','region');res.setAttribute('aria-label','Результаты поиска');h.append(res);
  f.q.setAttribute('aria-controls','hsr');
  const B='https://copy.ru',esc=t=>t.replace(/[&<>"]/g,c=>'&#'+c.charCodeAt(0)+';');
  const norm=t=>t.toLowerCase().replace(/ё/g,'е').replace(/[^a-zа-я0-9]+/g,' ').trim();
  // указатель: все разделы, группы и услуги каталога одним списком, без повторов названий
  let IX=null;const index=()=>{const C=window.COPY_CATALOG,seen=new Set(),a=[];
    const add=(t,u,k,w)=>{const n=norm(t);if(seen.has(n))return;seen.add(n);a.push({t,u:C.base+u,k,w:n.split(' ')})};
    C.items.forEach(([t,u,g])=>{add(t,u,'Раздел');g.forEach(([gt,gu,it])=>{add(gt,gu,'');it.forEach(([st,su])=>add(st,su,''))})});return a};
  // слово запроса к слову названия: целиком 3, начало 2, без окончания 1,5 («наклейки» → «наклейк»), одна опечатка 1 (от 5 букв: короче опечатка цепляет чужое, «екат» → «шкатулки»)
  const ed1=(a,b)=>{if(a===b)return true;if(Math.abs(a.length-b.length)>1)return false;let i=0,j=0,d=0;
    while(i<a.length&&j<b.length){if(a[i]===b[j]){i++;j++;continue}if(++d>1)return false;
      if(a.length>b.length)i++;else if(b.length>a.length)j++;else if(a[i+1]===b[j]&&a[i]===b[j+1]){i+=2;j+=2}else{i++;j++}}return d+(a.length-i)+(b.length-j)<=1};
  const wsc=(q,w)=>{if(w===q)return 3;if(w.startsWith(q))return 2;
    if(q.length>=4){const st=q.slice(0,q.length>5?-2:-1);if(w.startsWith(st))return 1.5;if(q.length>=5&&(ed1(q,w.slice(0,q.length))||ed1(q,w)))return 1}return 0};
  const STOP=new Set(['на','в','для','и','с','по','из','печать','распечатать','заказать','сделать']);
  // all — все слова запроса должны найтись; иначе «похожее»: хватит одного значимого слова
  const find=(q,all)=>{const qw=norm(q).split(' ').filter(Boolean);if(!qw.length)return[];
    return IX.map(x=>{let s=0,hit=0;for(const w of qw){const b=Math.max(0,...x.w.map(v=>wsc(w,v)));
        if(!b){if(all)return null;continue}if(all||!STOP.has(w))hit++;s+=b}
      if(!hit)return null;if(x.w[0].startsWith(qw[0]))s+=1;if(x.k)s+=.5;return{...x,s:s-x.w.length*.05}})
      .filter(Boolean).sort((a,b)=>b.s-a.s)};
  // набрали не в той раскладке: ghbdtn → привет
  const EN="qwertyuiop[]asdfghjkl;'zxcvbnm,.`",RU='йцукенгшщзхъфывапролджэячсмитьбюё';
  const swap=q=>[...q.toLowerCase()].map(c=>{const i=EN.indexOf(c);return i<0?c:RU[i]}).join('');
  const ORDER=/^№?\s*\d{6,}(-\d{1,2}-\d{2})?$/;
  const row=(u,t,o={})=>`<li><a href="${u}"${o.c?` class="${o.c}"`:''}>${o.i?ico(o.i):''}<b>${t}</b>${o.m?`<span>${o.m}</span>`:''}</a></li>`;
  const list=a=>`<ul>${a.join('')}</ul>`;
  const chips=()=>{const a=[...h.querySelectorAll('.qlinks a')].filter(x=>!x.querySelector('svg'));
    return '<h3>Часто ищут</h3><div class="sch">'+a.map(x=>`<a href="${x.href}">${x.textContent}</a>`).join('')+'</div>'};
  const all=q=>row(B+'/?s='+encodeURIComponent(q),'Все результаты',{c:'hall',i:'chev'});
  const fast=q=>list([row('fast-order.html?q='+encodeURIComponent(q),'Быстрый заказ',{c:'mfast',i:'zap',m:'опишите, посчитаем'})]);
  const render=()=>{const q=f.q.value.trim();
    if(q.length<2){res.innerHTML=chips();return}
    if(!IX){needCat(()=>{IX=index();render()});return}
    const top=[];
    if(ORDER.test(q))top.push(row('home.html?order='+encodeURIComponent(q.replace(/\D+/g,m=>m==='-'?'-':''))+'#status','Статус заказа',{i:'box',m:esc(q.replace(/^№?\s*/,'№ '))}));
    const cq=norm(q),city=cq.length>=3&&CITIES.find(([c])=>norm(c).startsWith(cq));
    if(city||/^(копи|адрес|где )/.test(cq))top.push(row(B+'/contacts/','Копицентры',{i:'map',m:esc((city||CITIES.find(x=>x[0]===cur)||[cur])[0])}));
    let r=find(q,true),fix='';
    if(!r.length&&/[a-z\[\];',.`]/i.test(q)){const sq=swap(q),sr=find(sq,true);if(sr.length){r=sr;fix=sq}}
    if(r.length){res.innerHTML=(top.length?list(top):'')+(fix?`<p class="hfix">Показаны результаты по «${esc(fix)}»</p>`:'')+
        list(r.slice(0,6).map(x=>row(x.u,esc(x.t),{m:x.k}))) +list([all(fix||q)]);return}
    if(top.length){res.innerHTML=list(top);return}
    const rel=find(q,false).slice(0,4);
    res.innerHTML=`<p class="hfix">По запросу «${esc(q)}» ничего не нашли</p>`+fast(q)+(rel.length?'<h3>Похожее</h3>'+list(rel.map(x=>row(x.u,esc(x.t),{m:x.k}))):'')+chips()};
  f.addEventListener('reset',()=>setTimeout(render));
  // крестик не забирает фокус у поля: клавиатура на телефоне не прячется и не прыгает
  f.querySelector('.clr').addEventListener('pointerdown',e=>e.preventDefault());
  // телефон: пока открыт поиск, страница под ним не прокручивается. Тянут панель — прокручивается панель (у краёв её держит
  // overscroll-behavior), тянут шапку или короткую панель без прокрутки — ничего. Иначе Safari докручивает страницу у края
  document.addEventListener('touchmove',e=>{if(!h.classList.contains('sopen')||f.contains(e.target))return; // в поле жест — это курсор и выделение текста
    if(!res.contains(e.target)||res.scrollHeight<=res.clientHeight)e.preventDefault()},{passive:false});
  // Enter: номер заказа — сразу к статусу, остальное — на страницу всех результатов
  f.onsubmit=e=>{e.preventDefault();const q=f.q.value.trim();if(!q)return;const a=res.querySelector('a');
    location.href=ORDER.test(q)&&a?a.href:B+'/?s='+encodeURIComponent(q)};
  const so=v=>{if(v)render();h.classList.toggle('sopen',v);setPh();sBtn.setAttribute('aria-expanded',v);if(v)f.q.focus();else f.q.blur()};
  sBtn.setAttribute('aria-expanded',false);sBtn.onclick=()=>so(true);sc.onclick=()=>so(false);
  // на телефоне поле стоит в строке шапки: нажали — открываем поиск поверх страницы; подсказка короче, длинная не влезает
  const mq=matchMedia('(max-width:980px)'),mq320=matchMedia('(max-width:359px)'),ph=f.q.placeholder,
    // открытый поиск шире — подсказка с примерами, как на компьютере (на ≤359 не влезает)
    setPh=()=>f.q.placeholder=mq320.matches?'Поиск':mq.matches&&!h.classList.contains('sopen')?'Найти услугу':ph;
  setPh();mq.addEventListener('change',setPh);mq320.addEventListener('change',setPh);
  // компьютер: панель под полем, ширина поля; закрывается кликом мимо, Esc и уходом фокуса из поиска
  const place=()=>{const a=f.getBoundingClientRect(),b=h.getBoundingClientRect();res.style.setProperty('--sl',a.left-b.left+'px');res.style.setProperty('--st',a.bottom-b.top+6+'px');res.style.setProperty('--sw',a.width+'px')};
  const drop=v=>{if(v){render();place()}h.classList.toggle('sdrop',v)};
  const toS=()=>{if(mq.matches){if(!h.classList.contains('sopen'))so(true)}else drop(true)};f.q.addEventListener('focus',toS);f.onclick=toS;
  // печатают в поле — панель открыта, даже если её закрыли кликом мимо, а фокус остался в поле
  f.q.addEventListener('input',()=>{if(!mq.matches&&!h.classList.contains('sdrop'))drop(true);else render()});
  addEventListener('resize',()=>{if(h.classList.contains('sdrop'))place()});
  document.addEventListener('pointerdown',e=>{if(!mq.matches&&!f.contains(e.target)&&!res.contains(e.target))drop(false)});
  h.addEventListener('focusout',()=>setTimeout(()=>{if(!mq.matches&&!f.contains(document.activeElement)&&!res.contains(document.activeElement))drop(false)}));
  // стрелки: из поля в список и по строкам; Esc закрывает
  h.addEventListener('keydown',e=>{if(!f.contains(e.target)&&!res.contains(e.target))return;
    if(e.key==='Escape'){if(mq.matches)so(false);else{drop(false);f.q.blur()}return}
    if(e.key!=='ArrowDown'&&e.key!=='ArrowUp')return;const L=[...res.querySelectorAll('a')],i=L.indexOf(document.activeElement);
    if(!L.length)return;e.preventDefault();const n=e.key==='ArrowDown'?i+1:i-1;(n<0?f.q:L[Math.min(n,L.length-1)]).focus()})}
// поиск привёл на страницу с параметром: номер заказа — в поле статуса на главной, текст запроса — в «Что нужно» быстрого заказа
// шапка стоит выше этих полей — ждём, пока страница соберётся
document.addEventListener('DOMContentLoaded',()=>{const p=new URLSearchParams(location.search),o=p.get('order'),q=p.get('q'),sn=document.getElementById('stNum'),fw=document.getElementById('foWhat');
  if(o&&sn)sn.value=o;if(q&&fw&&!fw.value)fw.value=q});

// ряд ссылок под шапкой (≤980): копицентры и статус заказа со значками, дальше топ услуг по Метрике (визиты с телефона, 90 дней:
// плакаты 24 тыс., листовки 19, фото 12, кружки 10, визитки 7,7, чертежи 8,5). Прокрутка вбок. В бою список отдаёт админка.
// При прокрутке страницы вниз ряд прячется, вверх возвращается
{const TOP={copy:[['Плакаты','/catalog/pechat-plakatov/'],['Листовки','/catalog/pechat-listovok/'],['Фотопечать','/catalog/pechat-fotografij/'],
    ['Кружки','/catalog/pechat-na-kruzhkah/'],['Визитки','/catalog/pechat-vizitok/'],['Чертежи','/catalog/pechat-proektnoj-dokumentaczii/']]};
  const h=document.querySelector('.hdr'),ql=document.createElement('nav');ql.className='qlinks';ql.setAttribute('aria-label','Быстрые ссылки');
  const ic=d=>`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  ql.innerHTML=s.nav.map(([t,hr,i])=>`<a href="${hr||'#'}">${i?ic(I[i]):''}${i==='map'?`<span data-cc>${t}</span>`:t}</a>`).join('')+(TOP[k]||[]).map(([t,u])=>`<a href="https://copy.ru${u}">${t}</a>`).join('');
  h.append(ql);
  // «Копицентры» фразой с числом города: «28 копицентров», «2 копицентра», «1 копицентр». Число не отдельной деталью — не спорит с текстом по кеглю и цвету
  const ccW=n=>{const a=n%10,b=n%100;return a===1&&b!==11?'копицентр':a>=2&&a<=4&&(b<12||b>14)?'копицентра':'копицентров'};
  const cc=()=>ql.querySelectorAll('[data-cc]').forEach(e=>{const n=(CITIES.find(x=>x[0]===cur)||[])[1];e.textContent=n?n+' '+ccW(n):'Копицентры'});cc();document.addEventListener('copy:city',cc);
  // порог 10 — не дёргать ряд от дрожания пальца
  let y0=scrollY;addEventListener('scroll',()=>{const y=scrollY;if(Math.abs(y-y0)<10)return;h.classList.toggle('qhide',y>y0&&y>120);y0=y},{passive:true});}

// подложка шапки на телефоне: прогрессивный блюр (стили .pblur в hdr.css). Высота = низ шапки (без ряда ссылок, когда он спрятан).
// Пересчёт только когда шапка меняет размер или ряд прячется/появляется — не на каждом кадре прокрутки: иначе Safari перерисовывает все слои блюра
{const pb=document.createElement('div');pb.className='pblur';pb.setAttribute('aria-hidden','true');pb.innerHTML='<i></i>'.repeat(5);
  document.body.prepend(pb);const hh=document.querySelector('.hdr'),ql=hh.querySelector('.qlinks');let last='';
  const set=()=>{const b=hh.getBoundingClientRect().bottom-(hh.classList.contains('qhide')&&ql?ql.offsetHeight:0),v=Math.max(0,Math.round(b))+'px';
    if(v!==last){last=v;document.documentElement.style.setProperty('--hb',v)}};
  set();new ResizeObserver(set).observe(hh);new MutationObserver(set).observe(hh,{attributes:true,attributeFilter:['class']});}

// меню телефона (≤980): каталог (с переходом в раздел), ниже «Ещё»: копицентры, статус, помощь, сервисы, тема.
// Продолжение шапки: шапка остаётся сверху на белом, меню проявляется под ней во весь экран, страница под ним не прокручивается. Esc и ✕ закрывают.
const mn=document.getElementById('mnBtn');
if(mn){
  const h=document.querySelector('.hdr'),mp=document.createElement('nav');
  mp.className='mpop';mp.id='mPop';mp.hidden=true;mp.setAttribute('aria-label','Меню');
  // меню — отдельный слой под шапкой (а не внутри неё): между ними ложится размытие, пункты уходят под шапку при прокрутке
  document.body.append(mp);mn.setAttribute('aria-controls','mPop');mn.setAttribute('aria-expanded',false);
  // «Быстрый заказ» — отдельная страница fast-order.html (не всплывающее окно), в бою /fast-order/
  // метка-кружок на кнопке меню: внутри меню есть быстрый заказ
  mn.insertAdjacentHTML('beforeend','<i class="mbadge" aria-hidden="true"></i>');
  const esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;'),B='https://copy.ru';
  const svg=(d,c='')=>`<svg class="ico${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const go=(t,inner,ico)=>`<li><button type="button" data-go="${t}">${ico?svg(ico):''}${inner}${svg(I.chev,' ch')}</button></li>`;
  const lnk=(href,inner,ico,cur)=>`<li><a href="${href}"${cur?' aria-current="page"':''}>${ico?svg(ico):''}${inner}</a></li>`;
  // пояснения сервисов взяты из названий на живом copy.ru и пунктов их меню
  const DESC={copy:'копицентры и типография',ai:'стикерпаки, футболки, кружки',gifts:'с логотипом компании',pro:'калькулятор и требования',b2b:'для компаний',api:'API и интеграции'};
  // «Покупателям»: страницы, нужные для заказа. TODO(клиент): /app/ ведёт на приложение лояльности (com.copyru.loyaltyapp), а новость о приложении — на «онлайн-типографию» (com.pixlpark.copyru.android); какое продвигаем
  const BUY=[['Требования к макетам','/technical-requirements/',I.file],['Оплата и доставка','/payment-delivery/',I.truck],['Приложение','/app/',I.mobile]];
  // «О компании»: остальные разделы сайта (не каталог), по просмотрам Метрики 12.08–10.11; юридические документы — только в подвале
  const MORE=[['Компания',[['О нас','/about/'],['Новости','/news/'],['Блог','/blog/'],['Портфолио','/portfolio/'],['Управляющая компания','/upravlyayushhaya-kompania/']]],
    ['Клиентам',[['Клуб привилегий','/club/'],['Генератор QR-кодов','/qr/'],['Написать директору','/director/']]],
    ['Партнёрам',[['Франшиза','/franchise/'],['Арендодателям','/landlord/']]],
    ['Работа и учёба',[['Вакансии','/vakansii/'],['Записаться на практику','/zapisatsya-na-praktiku/'],['Записаться на экскурсию','/zapisatsya-na-ekskursiyu/']]]];
  // TODO(админка): «Топ» — самые просматриваемые услуги (Метрика 12.08–10.11, все устройства), в бою список отдаёт админка
  const TOP=[['Плакаты','pechat-plakatov'],['Листовки','pechat-listovok'],['Фото','pechat-fotografij'],['Кружки','pechat-na-kruzhkah'],['Визитки','pechat-vizitok'],['Проектная документация','pechat-proektnoj-dokumentaczii'],['Наклейки','pechat-nakleek'],['Футболки','pechat-na-futbolkah']];
  const th=document.getElementById('themeBtn');
  // тема строкой с переключателем: включён — тёмная (своя или системная)
  const isDark=()=>(document.documentElement.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'))==='dark';
  const hd=(t,href)=>`<div class="mh"><h2>${esc(t)}</h2><a href="${href}">Все услуги</a></div>`; // заголовок экрана + ссылка на страницу раздела/группы
  const views={
    // главное — каталог (без заголовка: и так понятно); ниже страницы для покупателей строками, как каталог (группы разделены отступом, без заголовков); разделы компании — одной строкой с подменю. Город и вход не дублируем: они в шапке над меню
    root:()=>{const C=window.COPY_CATALOG;return `<div class="mtop2"><b>${svg(I.flame)}Топ</b>${TOP.map(([t,u])=>`<a href="${C.base}/catalog/${u}/">${t}</a>`).join('')}</div><ul class="mcat">${C.items.map(([t,,,k],i)=>go('s'+i,esc(t),KICO[k])).join('')}</ul>`+
      `<ul class="mgrp"><li><a class="mfast" href="fast-order.html">${svg(I.zap)}Быстрый заказ</a></li>${s.nav.map(([t,hr,ic])=>lnk(hr||'#',t,I[ic])).join('')}${BUY.map(([t,u,ic])=>lnk(B+u,t,ic)).join('')}${go('svc','Сервисы COPY.RU',I.grid)}</ul>`+
      `<ul>${go('co','О компании',I.bld)}<li><button type="button" role="switch" aria-checked="${isDark()}" data-theme>${svg(I.moon)}Тёмная тема<i class="tsw" aria-hidden="true"></i></button></li></ul>`},
    co:()=>`<button class="mback" type="button" data-go="root">${svg(I.back)}Меню</button><h2>О компании</h2>${MORE.map(([h,l])=>`<h3>${h}</h3><ul>${l.map(([t,u])=>lnk(B+u,t)).join('')}</ul>`).join('')}`,
    svc:()=>`<button class="mback" type="button" data-go="root">${svg(I.back)}Меню</button><h2>Сервисы COPY.RU</h2><ul>${Object.keys(SVC).map(o=>`<li><a class="msvc" href="#"${o===k?' aria-current="page"':''}><b>${SVC[o].tab}<small>${DESC[o]}</small></b>${o===k?svg(I.check,' mchk'):''}</a></li>`).join('')}</ul>`, // текущий сервис — галочкой справа, как выбор в списке iOS; пояснение под названием
    // второй уровень — раздел: группы ведут на третий экран со списком услуг (цифра = сколько услуг внутри); «Все услуги» справа от заголовка
    sec:i=>{const C=window.COPY_CATALOG,[t,hr,g]=C.items[i];
      return `<button class="mback" type="button" data-go="root">${svg(I.back)}Меню</button>`+hd(t,C.base+hr)+'<ul>'+
        g.map(([gt,gh,it],j)=>it.length?go(`g${i}_${j}`,`${esc(gt)}<span>${it.length}</span>`):lnk(C.base+gh,esc(gt))).join('')+'</ul>'},
    // третий уровень — группа: назад в раздел, услуги списком
    grp:(i,j)=>{const C=window.COPY_CATALOG,[t,,g]=C.items[i],[gt,gh,it]=g[j];
      return `<button class="mback" type="button" data-go="s${i}">${svg(I.back)}${esc(t)}</button>`+hd(gt,C.base+gh)+'<ul>'+
        it.map(([n,u])=>lnk(C.base+u,esc(n))).join('')+'</ul>'}};
  const show=(v,kb)=>{mp.innerHTML=/^s\d+$/.test(v)?views.sec(+v.slice(1)):/^g\d+_\d+$/.test(v)?views.grp(...v.slice(1).split('_').map(Number)):views[v]();scrollTo(0,0);
    const f=mp.querySelector('[aria-current="true"]')||mp.querySelector('a,button');f&&f.focus({focusVisible:kb})};
  let y=0; // где была страница: меню занимает её место, при закрытии возвращаемся туда же
  const open=(v,kb)=>{if(v&&shown)shown.open(false);
    if(v)h.dataset.y=y=scrollY;
    h.classList.toggle('mopen',v);mp.hidden=!v;scrollTo(0,v?0:y);
    mn.setAttribute('aria-expanded',v);
    if(v)needCat(()=>!mp.hidden&&show('root',kb));else mn.focus()};
  mn.onclick=e=>open(mp.hidden,!e.detail);
  addEventListener('scroll',()=>h.classList.toggle('mscr',!mp.hidden&&scrollY>0),{passive:true}); // размытие под шапкой — только когда меню прокручено
  // после смены темы (перезагрузка) меню открывается снова, прокрученное к «Ещё», где кнопка темы
  try{const fy=sessionStorage.getItem('copy-menu');if(fy!==null){sessionStorage.removeItem('copy-menu');open(true,false);h.dataset.y=y=+fy||0;
    const end=()=>mp.childElementCount?scrollTo(0,document.documentElement.scrollHeight):setTimeout(end,50);end()}}catch(e){}
  mp.onclick=e=>{const b=e.target.closest('button');if(!b)return;const kb=!e.detail;
    if(b.dataset.go)return show(b.dataset.go,kb);
    if(b.hasAttribute('data-theme')){th.click();b.setAttribute('aria-checked',isDark())}};
  mp.addEventListener('keydown',e=>{if(e.key==='Escape')open(false)});
  // ушли на десктопную ширину — закрыть
  matchMedia('(max-width:980px)').addEventListener('change',q=>{if(!q.matches&&!mp.hidden)open(false)});
}
// футер под шапкой и за низом страницы (2026-11-18, «шапка на футере грязно», «внизу белая/серая полоса»):
// at-foot — футер на экране: подложка body (видна при оттягивании за низ и под панелью Safari) красится цветом футера;
// hdr-foot — верх футера дошёл до низа шапки: шапка и дымка под ней берут тёмные токены футера (hdr.css)
{const fInit=()=>{const ft=document.querySelector('footer');if(!ft)return;const R=document.documentElement;let q=0;
  const upd=()=>{q=0;const t=ft.getBoundingClientRect().top,hb=parseFloat(getComputedStyle(R).getPropertyValue('--hb'))||document.querySelector('.hdr')?.getBoundingClientRect().bottom||0;
    R.classList.toggle('at-foot',t<innerHeight);R.classList.toggle('hdr-foot',t<hb)};
  addEventListener('scroll',()=>{if(!q)q=requestAnimationFrame(upd)},{passive:true});addEventListener('resize',upd);upd()};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fInit):fInit()} // hdr.js подключён выше футера

})();
