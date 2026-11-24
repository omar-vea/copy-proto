(()=>{
const SVC={
  copy: {tab:'Печать',tag:'',search:'Визитки, фото, переплёт',nav:[['Копицентры','contacts/','map'],['Статус заказа','home.html#status','box']],icons:['user','cart'],cta:''},
  ai:   {tab:'Нейродизайн',tag:'AI',nav:[['Стикерпак'],['3D-стикеры'],['Футболка'],['Кружка'],['Реставрация']],icons:['user'],cta:'Попробовать бесплатно'},
  gifts:{tab:'Сувениры',tag:'ПОДАРКИ',search:'Поиск по каталогу',nav:[['Новинки'],['Виды нанесения'],['Портфолио']],icons:['heart','user','cart'],cta:'Оставить заявку'},
  pro:  {tab:'Дизайнерам',tag:'PRO',nav:[['Требования к макетам'],['Оплата и доставка'],['Контакты']],icons:['user'],cta:'Рассчитать'},
  b2b:  {tab:'Бизнесу',tag:'B2B',nav:[['Преимущества'],['Калькулятор'],['Скидки'],['С кем работаем']],icons:[],cta:'Стать B2B-клиентом'},
  api:  {tab:'Разработчикам',tag:'API',nav:[['Документация']],icons:['user'],cta:'Оставить заявку'},
  fr:   {tab:'Франшиза',tag:'Франшиза',nav:[['Условия','#usl'],['Что входит','#sost'],['Партнёры','#prt'],['Города','#goroda']],icons:[],cta:'',lp:true,tel:['+7 495 156-10-00','+74951561000']},
};
const CITIES=[
  ['Москва',25, 'M12.00 1.10L13.06 3.94L16.09 4.07L13.71 5.96L14.53 8.88L12.00 7.20L9.47 8.88L10.29 5.96L7.91 4.07L10.94 3.94ZM12 10v1.5M12 11.5 8 22h8z'],
  ['Екатеринбург',2,'m8 3 4 8 5-5 5 15H2L8 3zM4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19'],
  ['Нижний Новгород',2,'M9 22V10l3-7 3 7v12M9 10h6M2 22v-8h2v1.5h1.5V14h1.5v1.5H9M22 22v-8h-2v1.5h-1.5V14H17v1.5h-2M1.5 22h21'],
  ['Сочи',2,'M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14'],
  ['Тюмень',1,'M9 22l3-12 3 12M3 9l18-3M3 6.5c-1.3 1-1.3 3.5 0 4.5M4 11v11M2 22h20M12 8.5v.01'],
  ['Ярославль',1,'M10 9h4M12 7v5M14 22v-4a2 2 0 0 0-4 0v4M18 22V5.618a1 1 0 0 0-.553-.894l-4.553-2.277a2 2 0 0 0-1.788 0L6.553 4.724A1 1 0 0 0 6 5.618V22M18 7l3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.618a1 1 0 0 1 .553-.894L6 7']
];

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
  chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
};
const LBL={search:'Поиск',user:'Войти',cart:'Корзина',heart:'Избранное',menu:'Меню'};
const ico=(n,c='ico')=>`<svg class="${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const iconLink=n=>`<a href="#"${n==='user'?' class="u"':''}>${ico(n)}<span class="lbl">${LBL[n]}</span></a>`;
const mBtn=(n,id)=>`<button class="m" id="${id}" type="button">${ico(n)}<span class="lbl">${LBL[n]}</span></button>`;

const me=document.currentScript, k=me.dataset.svc||'copy', s=SVC[k];
me.insertAdjacentHTML('beforebegin',`<div class="eco"><div class="wrap">
  <nav>${Object.keys(SVC).filter(o=>!SVC[o].lp).map(o=>`<a href="#"${o===k?' class="on" aria-current="page"':''}>${SVC[o].tab}</a>`).join('')}</nav>
  <div class="r">
    <button class="cty" id="cityBtn" type="button" aria-haspopup="dialog" aria-expanded="false">${ico('pin','')}<span data-city>Москва</span>${ico('down','chev')}</button>
    <a class="elogo" href="home.html" aria-label="COPY.RU"><svg class="wm" viewBox="69 0 480 196" aria-hidden="true"><use href="#wm" width="618" height="196"/></svg></a>
    <a class="cty tel" data-ct="tel" href="tel:+74951561000">+7 495 156-10-00</a>
    <button class="cty" id="msgBtn" type="button" aria-haspopup="dialog" aria-expanded="false">${ico('phone','ph')}${ico('chat','ch')}<span class="lbl">Связаться</span>${ico('down','chev')}</button>
    <button class="theme" id="themeBtn" type="button">Тёмная тема</button>
  </div>
</div></div>
<header class="hdr${s.lp?' lp':''}"><div class="wrap">
  <a class="logo" href="home.html" aria-label="${s.lp?'COPY.RU, на главную':'COPY.RU'+(s.tag?' '+s.tag:'')}">${s.lp?ico('back'):''}<svg class="wm" viewBox="69 0 480 196"><use href="#wm" width="618" height="196"/></svg>${s.tag&&!s.lp?`<span class="tag">${s.tag}</span>`:''}</a>
  ${s.lp?`<span class="ltitle">${s.tag}</span>`:''}
  ${s.search?`<button class="btn btn-p btn-sm" id="catBtn" type="button" aria-haspopup="dialog" aria-expanded="false">${ico('menu','kb')}Каталог</button><form class="search" role="search" action="#" data-todo>${ico('search')}<input type="search" name="q" placeholder="${s.search}" aria-label="Поиск по сайту" autocomplete="off" enterkeyhint="search"><button class="clr" type="reset" aria-label="Очистить">${ico('x','')}</button></form><button class="scl" type="button">Отмена</button>`:''}
  <nav class="links">${s.nav.map(([t,h,i])=>`<a href="${h||'#'}">${i?ico(i):''}${t}</a>`).join('')}</nav>
  <div class="hicons">${s.search?mBtn('search','sBtn'):''}${s.icons.map(iconLink).join('')}${mBtn('menu','mnBtn')}</div>
  ${s.tel?`<a class="ltel" data-ct="tel" href="tel:${s.tel[1]}" aria-label="Позвонить ${s.tel[0]}">${ico('phone')}<span class="n">${s.tel[0]}</span><span class="c">Позвонить</span></a>`:''}
  ${s.cta?`<a class="btn btn-p btn-sm cta" href="#">${s.cta}</a>`:''}
</div></header>`);

const sf=document.querySelector('.hdr .search');if(sf)sf.onreset=()=>setTimeout(()=>sf.q.focus());

const th=document.getElementById('themeBtn'), tip=()=>th.title=th.textContent;
tip();new MutationObserver(tip).observe(th,{childList:true});
{const r=document.documentElement,cur=()=>r.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'),
  lbl=()=>{th.textContent=cur()==='dark'?'Светлая тема':'Тёмная тема'};lbl();
  th.onclick=()=>{r.dataset.theme=cur()==='dark'?'light':'dark';try{localStorage.setItem('copy-theme',r.dataset.theme)}catch(e){}lbl();dispatchEvent(new Event('copy:theme'))}}

const paintBar=()=>{const c=getComputedStyle(document.body).backgroundColor;
  document.querySelectorAll('meta[name=theme-color]').forEach(m=>{m.content=c;m.removeAttribute('media')})};
document.getElementById('themeBtn').addEventListener('click',()=>setTimeout(()=>{try{const L=localStorage,now=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  if(L.getItem('copy-theme')===now){L.removeItem('copy-theme');L.removeItem('copy-theme-sys')}else L.setItem('copy-theme-sys',now)}catch(e){}}));
document.getElementById('themeBtn').addEventListener('click',()=>{if(!matchMedia('(hover:none)').matches)return;
  {const hm=document.querySelector('.hdr.mopen');if(hm)try{sessionStorage.setItem('copy-menu',hm.dataset.y||'0')}catch(e){}}
  setTimeout(()=>location.reload())});
paintBar();new MutationObserver(paintBar).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',paintBar);

const veil=document.createElement('div');veil.className='cveil';veil.hidden=true;document.body.append(veil);
let shown=null;
function dropdown(btn,id,label,html,focusSel){
  const pop=document.createElement('div');pop.className='cpop';pop.id=id;pop.hidden=true;
  pop.setAttribute('role','dialog');pop.setAttribute('aria-label',label);pop.innerHTML=html;
  btn.after(pop);btn.setAttribute('aria-controls',id);
  const d={pop,btn,open(v,mouse){if(v&&shown&&shown!==d)shown.open(false);
    const mob=matchMedia('(max-width:980px)').matches;
    pop.hidden=!v;veil.hidden=!v||(mob&&'anchor' in pop.dataset);btn.setAttribute('aria-expanded',v);shown=v?d:null;
    if(!v)return;
    pop.style.left=pop.style.top=pop.style.minWidth='';pop.classList.remove('rt');
    if(!matchMedia('(max-width:980px)').matches){const r=btn.parentElement.getBoundingClientRect(),b=btn.getBoundingClientRect(),bl=b.left-r.left;
      pop.style.minWidth=b.width+'px';pop.style.top=(b.bottom-r.top-1)+'px';
      const rt=bl+pop.offsetWidth>r.width;pop.classList.toggle('rt',rt);
      pop.style.left=(rt?bl+b.width-pop.offsetWidth:bl)+'px'}
    else if('anchor' in pop.dataset)d.place();
    (pop.querySelector(focusSel)||pop.querySelector('a,button')).focus({focusVisible:!mouse})}};
  {const bs=()=>['cityBtn','msgBtn'].map(i=>document.getElementById(i)).filter(Boolean).map(x=>x.getBoundingClientRect());
    d.place=()=>{const r=bs(),L=Math.min(...r.map(x=>x.left)),R=Math.max(...r.map(x=>x.right)),B=Math.max(...r.map(x=>x.bottom));
      pop.style.setProperty('--pt',(B+4)+'px');pop.style.setProperty('--pr',(document.documentElement.clientWidth-R)+'px');pop.style.setProperty('--pw',(R-L)+'px')};
    let q=0;addEventListener('scroll',()=>{if(!pop.hidden&&'anchor' in pop.dataset&&!q)q=requestAnimationFrame(()=>{q=0;d.place()})},{passive:true})}
  btn.onclick=e=>d.open(pop.hidden,e.detail>0);
  return d;
}
veil.onclick=()=>shown&&shown.open(false);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&shown){const b=shown.btn;shown.open(false);b.focus()}});
document.addEventListener('click',e=>{if(shown&&!shown.pop.contains(e.target)&&!shown.btn.contains(e.target))shown.open(false)});

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
const needCat=cb=>{if(window.COPY_CATALOG)return cb();
  const sc=document.createElement('script');sc.src=new URL('catalog-data.js?v=3',me.src).href;sc.onload=cb;document.head.append(sc)};
const kBtn=document.getElementById('catBtn');
if(kBtn){
  const kp=document.createElement('div');kp.className='kpop';kp.id='catPop';kp.hidden=true;
  kp.setAttribute('role','dialog');kp.setAttribute('aria-label','Каталог');
  kp.innerHTML='<div class="wrap"><ul class="kside"></ul><div class="kmain"></div></div>';
  document.querySelector('.hdr').append(kp);kBtn.setAttribute('aria-controls','catPop');
  const side=kp.querySelector('.kside'),main=kp.querySelector('.kmain'),MORE=5;
  let C=null,act=-1,tm;
  const esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;');
  const url=h=>C.url(h);
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
    if(!v){veil.style.top='';removeEventListener('scroll',vtop);return}
    vtop();addEventListener('scroll',vtop,{passive:true});
    needCat(()=>shown===cat&&go(mouse))}};
  kBtn.onclick=e=>cat.open(kp.hidden,e.detail>0);
  kp.addEventListener('focusout',e=>{if(shown===cat&&e.relatedTarget&&!kp.contains(e.relatedTarget)&&e.relatedTarget!==kBtn)cat.open(false)});
}

const cBtn=document.getElementById('cityBtn'), nameEl=cBtn.querySelector('[data-city]');
const plural=n=>n%10===1&&n%100!==11?'копицентр':n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?'копицентра':'копицентров';
let cur='Москва';try{const c=localStorage.getItem('copy-city');if(CITIES.some(x=>x[0]===c))cur=c}catch(e){}
const city=dropdown(cBtn,'cityPop','Выбор города',
  '<h3>Ваш город</h3><ul>'+CITIES.map(([c,n,d])=>`<li><button type="button" data-c="${c}"><svg class="mi" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>${c}<span>${n}<i> ${plural(n)}</i></span></button></li>`).join('')+
  '</ul>','[aria-current="true"]');
city.pop.dataset.anchor='';
const SHORT={'Нижний Новгород':'Н. Новгород'};
const paint=()=>{nameEl.innerHTML=SHORT[cur]?`<span class="full">${cur}</span><span class="short" aria-hidden="true">${SHORT[cur]}</span>`:cur;city.pop.querySelectorAll('button').forEach(b=>b.setAttribute('aria-current',b.dataset.c===cur))};
const ecoFit=()=>{const e=cBtn.closest('.eco'),l=e&&e.querySelector('.elogo');if(!l)return;e.classList.remove('tight');
  if(l.offsetWidth&&cBtn.getBoundingClientRect().left-l.getBoundingClientRect().right<12)e.classList.add('tight')};
addEventListener('resize',ecoFit);document.addEventListener('copy:city',ecoFit);
paint();ecoFit();document.fonts?.ready.then(ecoFit);
document.addEventListener('copy:city-set',e=>{const c=e.detail?.c;if(!CITIES.some(x=>x[0]===c)||c===cur)return;cur=c;
  if(e.detail.save){try{localStorage.setItem('copy-city',cur)}catch(e){}}paint();document.dispatchEvent(new CustomEvent('copy:city',{detail:cur}))});
city.pop.onclick=e=>{const b=e.target.closest('button');if(!b)return;cur=b.dataset.c;try{localStorage.setItem('copy-city',cur)}catch(e){}
  paint();city.open(false);cBtn.focus();document.dispatchEvent(new CustomEvent('copy:city',{detail:cur}))};

const MSG=`<li class="mfast"><a href="fast-order.html">${ico('zap','mi')}Быстрый заказ<span>перезвоним</span></a></li>
  <li class="mcall"><a data-ct="tel" href="tel:+74951561000">${ico('phone','mi')}Позвонить<span data-ct="tel-t">+7 495 156-10-00</span></a></li>
  <li><a href="#" data-todo="бот Telegram"><img src="icons/telegram.svg" alt="" width="20" height="20">Telegram<span>откроется чат</span></a></li>
  <li><a href="#" data-todo="WhatsApp"><img src="icons/whatsapp.svg" alt="" width="20" height="20">WhatsApp<span>откроется чат</span></a></li>
  <li><a href="#" data-todo="чат MAX"><img src="icons/max-flat.svg?v=2" alt="" width="20" height="20">MAX<span>откроется чат</span></a></li>
  <li><a data-ct="mail" href="mailto:zakaz@copy.ru">${ico('mail','mi')}Почта<span data-ct="mail-t">zakaz@copy.ru</span></a></li>`;
const msg=dropdown(document.getElementById('msgBtn'),'msgPop','Связаться',`<h3>Связаться · <span data-ct="city">Москва</span></h3><ul>${MSG}</ul>`);
msg.pop.dataset.anchor='';
const CT={'Москва':['+7 495 156-10-00','zakaz@copy.ru']};
const ctPaint=()=>{const ok=!!CT[cur],[t,m]=CT[cur]||['номер уточняем','почту уточняем'];
  document.querySelectorAll('[data-ct="tel"]').forEach(a=>{a.href=ok?'tel:'+t.replace(/[^+\d]/g,''):'#';if(a.classList.contains('tel'))a.textContent=t});
  document.querySelectorAll('[data-ct="tel-t"]').forEach(e=>e.textContent=t);
  document.querySelectorAll('[data-ct="mail"]').forEach(a=>a.href=ok?'mailto:'+m:'#');
  document.querySelectorAll('[data-ct="mail-t"]').forEach(e=>e.textContent=m);
  document.querySelectorAll('[data-ct="city"]').forEach(e=>e.textContent=cur)};
ctPaint();document.addEventListener('DOMContentLoaded',ctPaint);document.addEventListener('copy:city',ctPaint);

const sBtn=document.getElementById('sBtn');
if(sBtn){const h=document.querySelector('.hdr'),f=h.querySelector('.search'),sc=h.querySelector('.scl');
  const res=document.createElement('div');res.className='hsr';res.id='hsr';res.setAttribute('role','region');res.setAttribute('aria-label','Результаты поиска');h.append(res);
  f.q.setAttribute('aria-controls','hsr');
  const B='https://copy.ru',esc=t=>t.replace(/[&<>"]/g,c=>'&#'+c.charCodeAt(0)+';');
  const norm=t=>t.toLowerCase().replace(/ё/g,'е').replace(/[^a-zа-я0-9]+/g,' ').trim();
  let IX=null;const index=()=>{const C=window.COPY_CATALOG,seen=new Set(),a=[];
    const add=(t,u,k,w)=>{const n=norm(t);if(seen.has(n))return;seen.add(n);a.push({t,u:C.url(u),k,w:n.split(' ')})};
    C.items.forEach(([t,u,g])=>{add(t,u,'Раздел');g.forEach(([gt,gu,it])=>{add(gt,gu,'');it.forEach(([st,su])=>add(st,su,''))})});return a};
  const ed1=(a,b)=>{if(a===b)return true;if(Math.abs(a.length-b.length)>1)return false;let i=0,j=0,d=0;
    while(i<a.length&&j<b.length){if(a[i]===b[j]){i++;j++;continue}if(++d>1)return false;
      if(a.length>b.length)i++;else if(b.length>a.length)j++;else if(a[i+1]===b[j]&&a[i]===b[j+1]){i+=2;j+=2}else{i++;j++}}return d+(a.length-i)+(b.length-j)<=1};
  const wsc=(q,w)=>{if(w===q)return 3;if(w.startsWith(q))return 2;
    if(q.length>=4){const st=q.slice(0,q.length>5?-2:-1);if(w.startsWith(st))return 1.5;if(q.length>=5&&(ed1(q,w.slice(0,q.length))||ed1(q,w)))return 1}return 0};
  const STOP=new Set(['на','в','для','и','с','по','из','печать','распечатать','заказать','сделать']);
  const find=(q,all)=>{const qw=norm(q).split(' ').filter(Boolean);if(!qw.length)return[];
    return IX.map(x=>{let s=0,hit=0;for(const w of qw){const b=Math.max(0,...x.w.map(v=>wsc(w,v)));
        if(!b){if(all)return null;continue}if(all||!STOP.has(w))hit++;s+=b}
      if(!hit)return null;if(x.w[0].startsWith(qw[0]))s+=1;if(x.k)s+=.5;return{...x,s:s-x.w.length*.05}})
      .filter(Boolean).sort((a,b)=>b.s-a.s)};
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
    if(city||/^(копи|адрес|где )/.test(cq))top.push(row('contacts/','Копицентры',{i:'map',m:esc((city||CITIES.find(x=>x[0]===cur)||[cur])[0])}));
    let r=find(q,true),fix='';
    if(!r.length&&/[a-z\[\];',.`]/i.test(q)){const sq=swap(q),sr=find(sq,true);if(sr.length){r=sr;fix=sq}}
    if(r.length){res.innerHTML=(top.length?list(top):'')+(fix?`<p class="hfix">Показаны результаты по «${esc(fix)}»</p>`:'')+
        list(r.slice(0,6).map(x=>row(x.u,esc(x.t),{m:x.k}))) +list([all(fix||q)]);return}
    if(top.length){res.innerHTML=list(top);return}
    const rel=find(q,false).slice(0,4);
    res.innerHTML=`<p class="hfix">По запросу «${esc(q)}» ничего не нашли</p>`+fast(q)+(rel.length?'<h3>Похожее</h3>'+list(rel.map(x=>row(x.u,esc(x.t),{m:x.k}))):'')+chips()};
  f.addEventListener('reset',()=>setTimeout(render));
  f.querySelector('.clr').addEventListener('pointerdown',e=>e.preventDefault());
  document.addEventListener('touchmove',e=>{if(!h.classList.contains('sopen')||f.contains(e.target))return;
    if(!res.contains(e.target)||res.scrollHeight<=res.clientHeight)e.preventDefault()},{passive:false});
  f.onsubmit=e=>{e.preventDefault();const q=f.q.value.trim();if(!q)return;const a=res.querySelector('a');
    location.href=ORDER.test(q)&&a?a.href:B+'/?s='+encodeURIComponent(q)};
  const so=v=>{if(v)render();h.classList.toggle('sopen',v);setPh();sBtn.setAttribute('aria-expanded',v);if(v)f.q.focus();else f.q.blur()};
  sBtn.setAttribute('aria-expanded',false);sBtn.onclick=()=>so(true);sc.onclick=()=>so(false);
  const mq=matchMedia('(max-width:980px)'),mq320=matchMedia('(max-width:359px)'),ph=f.q.placeholder,
    setPh=()=>f.q.placeholder=mq320.matches?'Поиск':mq.matches&&!h.classList.contains('sopen')?'Найти услугу':ph;
  setPh();mq.addEventListener('change',setPh);mq320.addEventListener('change',setPh);
  const place=()=>{const a=f.getBoundingClientRect(),b=h.getBoundingClientRect();res.style.setProperty('--sl',a.left-b.left+'px');res.style.setProperty('--st',a.bottom-b.top+6+'px');res.style.setProperty('--sw',a.width+'px')};
  const drop=v=>{if(v){render();place()}h.classList.toggle('sdrop',v)};
  const toS=()=>{if(mq.matches){if(!h.classList.contains('sopen'))so(true)}else drop(true)};f.q.addEventListener('focus',toS);f.onclick=toS;
  f.q.addEventListener('input',()=>{if(!mq.matches&&!h.classList.contains('sdrop'))drop(true);else render()});
  addEventListener('resize',()=>{if(h.classList.contains('sdrop'))place()});
  document.addEventListener('pointerdown',e=>{if(!mq.matches&&!f.contains(e.target)&&!res.contains(e.target))drop(false)});
  h.addEventListener('focusout',()=>setTimeout(()=>{if(!mq.matches&&!f.contains(document.activeElement)&&!res.contains(document.activeElement))drop(false)}));
  h.addEventListener('keydown',e=>{if(!f.contains(e.target)&&!res.contains(e.target))return;
    if(e.key==='Escape'){if(mq.matches)so(false);else{drop(false);f.q.blur()}return}
    if(e.key!=='ArrowDown'&&e.key!=='ArrowUp')return;const L=[...res.querySelectorAll('a')],i=L.indexOf(document.activeElement);
    if(!L.length)return;e.preventDefault();const n=e.key==='ArrowDown'?i+1:i-1;(n<0?f.q:L[Math.min(n,L.length-1)]).focus()})}
document.addEventListener('DOMContentLoaded',()=>{const p=new URLSearchParams(location.search),o=p.get('order'),q=p.get('q'),sn=document.getElementById('stNum'),fw=document.getElementById('foWhat');
  if(o&&sn)sn.value=o;if(q&&fw&&!fw.value)fw.value=q});

{const TOP={copy:[['Плакаты','/catalog/pechat-plakatov/'],['Листовки','/catalog/pechat-listovok/'],['Фотопечать','/catalog/pechat-fotografij/'],
    ['Кружки','/catalog/pechat-na-kruzhkah/'],['Визитки','/catalog/pechat-vizitok/'],['Чертежи','/catalog/pechat-proektnoj-dokumentaczii/']]};
  const h=document.querySelector('.hdr'),ql=document.createElement('nav');ql.className='qlinks';ql.setAttribute('aria-label','Быстрые ссылки');
  const ic=d=>`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  ql.innerHTML=s.nav.map(([t,hr,i])=>`<a href="${hr||'#'}">${i?ic(I[i]):''}${i==='map'?`<span data-cc>${t}</span>`:t}</a>`).join('')+(TOP[k]||[]).map(([t,u])=>`<a href="${window.COPY_CATALOG?.url?window.COPY_CATALOG.url(u):u==='/catalog/pechat-vizitok/'?'vizitki.html':'catalog/'+u.split('/')[2]+'/'}">${t}</a>`).join('');
  h.append(ql);
  const ccW=n=>{const a=n%10,b=n%100;return a===1&&b!==11?'копицентр':a>=2&&a<=4&&(b<12||b>14)?'копицентра':'копицентров'};
  const cc=()=>ql.querySelectorAll('[data-cc]').forEach(e=>{const n=(CITIES.find(x=>x[0]===cur)||[])[1];e.textContent=n?n+' '+ccW(n):'Копицентры'});cc();document.addEventListener('copy:city',cc);
  let y0=scrollY;addEventListener('scroll',()=>{const y=scrollY;if(Math.abs(y-y0)<10)return;h.classList.toggle('qhide',y>y0&&y>120);y0=y},{passive:true});}

{const pb=document.createElement('div');pb.className='pblur';pb.setAttribute('aria-hidden','true');pb.innerHTML='<i></i>'.repeat(5);
  document.body.prepend(pb);const hh=document.querySelector('.hdr'),ql=hh.querySelector('.qlinks');let last='';
  const set=()=>{const b=hh.getBoundingClientRect().bottom-(hh.classList.contains('qhide')&&ql?ql.offsetHeight:0),v=Math.max(0,Math.round(b))+'px';
    if(v!==last){last=v;document.documentElement.style.setProperty('--hb',v)}};
  set();new ResizeObserver(set).observe(hh);new MutationObserver(set).observe(hh,{attributes:true,attributeFilter:['class']});}

const mn=document.getElementById('mnBtn');
if(mn){
  const h=document.querySelector('.hdr'),mp=document.createElement('nav');
  mp.className='mpop';mp.id='mPop';mp.hidden=true;mp.setAttribute('aria-label','Меню');
  document.body.append(mp);mn.setAttribute('aria-controls','mPop');mn.setAttribute('aria-expanded',false);
  mn.insertAdjacentHTML('beforeend','<i class="mbadge" aria-hidden="true"></i>');
  const esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;'),B='https://copy.ru';
  const svg=(d,c='')=>`<svg class="ico${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const go=(t,inner,ico)=>`<li><button type="button" data-go="${t}">${ico?svg(ico):''}${inner}${svg(I.chev,' ch')}</button></li>`;
  const lnk=(href,inner,ico,cur)=>`<li><a href="${href}"${cur?' aria-current="page"':''}>${ico?svg(ico):''}${inner}</a></li>`;
  const DESC={copy:'копицентры и типография',ai:'стикерпаки, футболки, кружки',gifts:'с логотипом компании',pro:'калькулятор и требования',b2b:'для компаний',api:'API и интеграции'};
  const BUY=[['Требования к макетам','technical-requirements/',I.file],
    ['Оплата и доставка','payment-delivery/',I.truck] ,['Приложение','/app/',I.mobile]];
  const MORE=[['Компания',[['О нас','/about/'],['Новости','/news/'],['Блог','/blog/'],['Портфолио','/portfolio/'],['Управляющая компания','/upravlyayushhaya-kompania/']]],
    ['Клиентам',[['Клуб привилегий','club/'] ,['Генератор QR-кодов','/qr/'],['Написать директору','/director/']]],
    ['Партнёрам',[['Франшиза','franchise/'], ['Арендодателям','/landlord/']]],
    ['Работа и учёба',[['Вакансии','vakansii/'] ,['Записаться на практику','/zapisatsya-na-praktiku/'],['Записаться на экскурсию','/zapisatsya-na-ekskursiyu/']]]];
  const TOP=[['Плакаты','pechat-plakatov'],['Листовки','pechat-listovok'],['Фото','pechat-fotografij'],['Кружки','pechat-na-kruzhkah'],['Визитки','pechat-vizitok'],['Проектная документация','pechat-proektnoj-dokumentaczii'],['Наклейки','pechat-nakleek'],['Футболки','pechat-na-futbolkah']];
  const th=document.getElementById('themeBtn');
  const isDark=()=>(document.documentElement.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'))==='dark';
  const hd=(t,href,go,bt)=>`<button class="mbk" type="button" data-go="${go}">${svg(I.back)}${esc(bt)}</button><div class="mh"><h2>${href?`<a href="${href}">${esc(t).replace(/(\S+)$/,'<span class="nw">$1'+svg(I.chev,' ch')+'</span>')}</a>`:esc(t)}</h2></div>`;
  const views={
    root:()=>{const C=window.COPY_CATALOG;return `<div class="mtop2"><b>${svg(I.flame)}Топ</b>${TOP.map(([t,u])=>`<a href="${C.url('/catalog/'+u+'/')}">${t}</a>`).join('')}</div><ul class="mcat">${C.items.map(([t,,,k],i)=>go('s'+i,esc(t),KICO[k])).join('')}</ul>`+
      `<ul class="mgrp"><li><a class="mfast" href="fast-order.html">${svg(I.zap)}Быстрый заказ</a></li>${s.nav.map(([t,hr,ic])=>lnk(hr||'#',t,I[ic])).join('')}${BUY.map(([t,u,ic])=>lnk(u[0]==='/'?B+u:u,t,ic)).join('')}${go('svc','Сервисы COPY.RU',I.grid)}</ul>`+
      `<ul>${go('co','О компании',I.bld)}<li><button type="button" role="switch" aria-checked="${isDark()}" data-theme>${svg(I.moon)}Тёмная тема<i class="tsw" aria-hidden="true"></i></button></li></ul>`},
    co:()=>hd('О компании','','root','Меню')+`${MORE.map(([h,l])=>`<h3>${h}</h3><ul>${l.map(([t,u])=>lnk(u[0]==='/'?B+u:u,t)).join('')}</ul>`).join('')}`,
    svc:()=>hd('Сервисы COPY.RU','','root','Меню')+`<ul>${Object.keys(SVC).filter(o=>!SVC[o].lp).map(o=>`<li><a class="msvc" href="#"${o===k?' aria-current="page"':''}><b>${SVC[o].tab}<small>${DESC[o]}</small></b>${o===k?svg(I.check,' mchk'):''}</a></li>`).join('')}</ul>`,
    sec:i=>{const C=window.COPY_CATALOG,[t,hr,g]=C.items[i];
      return hd(t,C.url(hr),'root','Меню')+'<ul>'+
        g.map(([gt,gh,it],j)=>it.length?go(`g${i}_${j}`,esc(gt)):lnk(C.url(gh),esc(gt))).join('')+'</ul>'},
    grp:(i,j)=>{const C=window.COPY_CATALOG,[t,,g]=C.items[i],[gt,gh,it]=g[j];
      return hd(gt,C.url(gh),'s'+i,t)+'<ul>'+
        it.map(([n,u])=>lnk(C.url(u),esc(n))).join('')+'</ul>'}};
  const show=(v,kb)=>{mp.innerHTML=/^s\d+$/.test(v)?views.sec(+v.slice(1)):/^g\d+_\d+$/.test(v)?views.grp(...v.slice(1).split('_').map(Number)):views[v]();scrollTo(0,0);
    const f=mp.querySelector('[aria-current="true"]')||mp.querySelector('a,button');f&&f.focus({focusVisible:kb})};
  let y=0;
  const open=(v,kb)=>{if(v&&shown)shown.open(false);
    if(v)h.dataset.y=y=scrollY;
    h.classList.toggle('mopen',v);mp.hidden=!v;scrollTo(0,v?0:y);
    mn.setAttribute('aria-expanded',v);
    if(v)needCat(()=>!mp.hidden&&show('root',kb));else mn.focus()};
  mn.onclick=e=>open(mp.hidden,!e.detail);
  addEventListener('scroll',()=>h.classList.toggle('mscr',!mp.hidden&&scrollY>0),{passive:true});
  try{const fy=sessionStorage.getItem('copy-menu');if(fy!==null){sessionStorage.removeItem('copy-menu');open(true,false);h.dataset.y=y=+fy||0;
    const end=()=>mp.childElementCount?scrollTo(0,document.documentElement.scrollHeight):setTimeout(end,50);end()}}catch(e){}
  mp.onclick=e=>{const b=e.target.closest('button');if(!b)return;const kb=!e.detail;
    if(b.dataset.go)return show(b.dataset.go,kb);
    if(b.hasAttribute('data-theme')){th.click();b.setAttribute('aria-checked',isDark())}};
  mp.addEventListener('keydown',e=>{if(e.key==='Escape')open(false)});
  matchMedia('(max-width:980px)').addEventListener('change',q=>{if(!q.matches&&!mp.hidden)open(false)});
}
{const fInit=()=>{const ft=document.querySelector('footer');if(!ft)return;const R=document.documentElement;let q=0;
  const upd=()=>{q=0;const fr=ft.getBoundingClientRect(),t=fr.top,hb=parseFloat(getComputedStyle(R).getPropertyValue('--hb'))||document.querySelector('.hdr')?.getBoundingClientRect().bottom||0;
    const typing=document.activeElement?.matches('input:not([type=checkbox],[type=radio]),textarea,select');
    R.classList.toggle('at-foot',(t<hb||fr.bottom<=innerHeight+1)&&!typing);R.classList.toggle('hdr-foot',t<hb)};
  addEventListener('scroll',()=>{if(!q)q=requestAnimationFrame(upd)},{passive:true});addEventListener('resize',upd);
  addEventListener('focusin',upd);addEventListener('focusout',()=>setTimeout(upd));upd()};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fInit):fInit()}


function onReady(f){document.readyState==='loading'?addEventListener('DOMContentLoaded',f):f()}

{const t=document.createElement('template');t.innerHTML=`<div class="pbar" id="pbar" data-id="ny-calendars" hidden>
  <a href="#promo"><svg class="pbar-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg><span>Календари 2027 с логотипом</span><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></a>
  <button type="button" aria-label="Закрыть"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
</div>`;
 document.querySelector('.eco').before(t.content.firstElementChild);
(()=>{const b=document.getElementById('pbar'),k='pbar:'+b.dataset.id;let off=false;try{if(/[?&]promo\b/.test(location.search))localStorage.removeItem(k);off=localStorage.getItem(k)==='1'}catch(e){}b.hidden=off; 
b.querySelector('button').onclick=()=>{b.hidden=true;try{localStorage.setItem(k,'1')}catch(e){}}})();}

(()=>{const K='copy-ny',V=['ball','garland','both','none'],L={ball:'Шар',garland:'Гирлянда',both:'Оба',none:'Нет'};
let v='garland';try{const x=localStorage.getItem(K);if(V.includes(x))v=x}catch(e){}
const set=n=>{v=n;document.documentElement.dataset.ny=n;try{localStorage.setItem(K,n)}catch(e){}
  document.querySelectorAll('.ny-set button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ny===n))};
document.documentElement.dataset.ny=v;
onReady(()=>{const mp=document.querySelector('.mpop');if(!mp)return;
  const add=()=>{const t=mp.querySelector('[data-theme]');if(!t||mp.querySelector('.ny-set'))return;
    t.closest('li').insertAdjacentHTML('afterend',`<li class="ny-set"><p><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v3M10.5 6h3"/><circle cx="12" cy="14" r="7"/><path d="M8.5 12.5c1.2-1.4 2.2-1.6 3.5-.5s2.3.9 3.5-.5"/></svg><span>Новогоднее украшение <small>(демо, переключателя не&nbsp;будет)</small></span></p><div class="seg" role="group" aria-label="Новогоднее украшение">${V.map(n=>`<button type="button" data-ny="${n}" aria-pressed="${n===v}">${L[n]}</button>`).join('')}</div></li>`)};
  new MutationObserver(add).observe(mp,{childList:true,subtree:true});add();
  mp.addEventListener('click',e=>{const b=e.target.closest('.ny-set button');if(b)set(b.dataset.ny)})})})();

onReady(()=>{const l=document.querySelector('.eco .elogo'),ps=[...document.querySelectorAll('#wm path')];if(!l||ps.length<6)return;
const d=i=>ps[i].getAttribute('d'),S=.78,cx=100,cy=112,r=96,rx=cx+r+22;
l.insertAdjacentHTML('beforeend',`<svg class="wm-ny" viewBox="0 -14 ${Math.round(rx+(549-227)*S+4)} 222" aria-hidden="true">
<defs><radialGradient id="nyBallR" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#FF6A5C"/><stop offset=".55" stop-color="#E02A20"/><stop offset="1" stop-color="#9C1410"/></radialGradient><radialGradient id="nyBallV" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#8F89FF"/><stop offset=".55" stop-color="#4844D7"/><stop offset="1" stop-color="#2A2490"/></radialGradient>
<linearGradient id="nyThr" gradientUnits="userSpaceOnUse" x1="0" y1="-48" x2="0" y2="2"><stop offset="0" stop-color="currentColor" stop-opacity="0"/><stop offset=".75" stop-color="currentColor" stop-opacity=".45"/></linearGradient>
<linearGradient id="nyCap" x1="0" x2="1"><stop offset="0" stop-color="#8b8b90"/><stop offset=".45" stop-color="#e2e2e6"/><stop offset="1" stop-color="#7d7d82"/></linearGradient></defs>
<path d="M${cx} -48V2" stroke="url(#nyThr)" stroke-width="6"/>
<circle cx="${cx}" cy="4" r="7" fill="none" stroke="url(#nyCap)" stroke-width="4"/>
<rect x="${cx-16}" y="9" width="32" height="12" rx="3" fill="url(#nyCap)"/>
<g class="ny-ball"><circle class="ball" cx="${cx}" cy="${cy}" r="${r}"/>
<ellipse cx="${cx-52}" cy="${cy-56}" rx="17" ry="8" transform="rotate(-40 ${cx-52} ${cy-56})" fill="#fff" opacity=".4"/>
<path d="${d(5)}" fill="#fff" transform="translate(${cx} ${cy}) scale(${S}) translate(-139 -98.5)"/></g>
<g fill="currentColor" transform="translate(${rx} ${cy}) scale(${S}) translate(-227 -98.5)">${[0,1,2,3,4].map(i=>`<path d="${d(i)}"/>`).join('')}</g></svg>`);
l.classList.add('ny-logo');const sv=l.querySelector('.wm-ny');

l.addEventListener('click',e=>{const b=sv.querySelector('.ball').getBoundingClientRect(),dx=e.clientX-(b.left+b.width/2),dy=e.clientY-(b.top+b.height/2),R=b.width/2+6; 
if(dx*dx+dy*dy>R*R)return;e.preventDefault();sv.classList.toggle('red')})});

onReady(()=>{const q=document.querySelector('.qlinks'),hd=document.querySelector('.hdr');if(!q||!hd)return;q.classList.add('ny-on');
const F=document.createElement('div');F.className='ny-g';F.setAttribute('aria-hidden','true');hd.append(F);
const C=['c','m','y','k'];let mk=null;
const holes=()=>{if(!mk)return;const o=F.getBoundingClientRect(),r=parseFloat(getComputedStyle(q.querySelector('a')).borderRadius)||8;
mk.innerHTML='<rect width="100%" height="100%" fill="#fff"/>'+[...q.querySelectorAll('a')].map(a=>{const b=a.getBoundingClientRect();return b.right<o.left||b.left>o.right?'':`<rect x="${(b.left-o.left).toFixed(1)}" y="${(b.top-o.top).toFixed(1)}" width="${b.width.toFixed(1)}" height="${b.height.toFixed(1)}" rx="${r}"/>`}).join('')};
const draw=()=>{let z=20261231;const R=()=>(z=(z*1664525+1013904223)>>>0)/4294967296;
const W=hd.clientWidth,H=q.offsetHeight,top=3,bot=45;F.style.top=q.offsetTop+'px';F.style.height=H+'px';
const T=[];let x=-10;while(x<W+80){const u=R(),P=u<.3?30+R()*22:u<.8?58+R()*44:108+R()*44; 
T.push({x,P,f:.42+R()*.2,y0:-1+R()*6,y1:43+R()*6,sg:R()*7});x+=P}
let fr='',bk='',b='',k=0;const bulb=(px,py,L,ang)=>{const cl=C[k++%4];L=Math.max(0,Math.min(L,H-13-py));
return `<g class="${cl}" transform="translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${ang.toFixed(0)})">${L>2?`<path class="w" d="M0 0q${(R()-.5)*3} ${L/2} 0 ${L.toFixed(1)}"/>`:''}<g transform="translate(0 ${L.toFixed(1)})"><circle class="glow" cy="8" r="7.5"/><rect class="cap" x="-2" y="-.5" width="4" height="3.2" rx="1"/><ellipse class="bulb" cy="7.4" rx="3.4" ry="4.8"/></g></g>`};
T.forEach((t,i)=>{const n=T[i+1]||{x:t.x+t.P,y0:t.y0},ex=t.x+t.P*t.f,dx=ex-t.x;

const c1x=t.x+dx*(.25+R()*.2),c1y=t.y0+3+t.sg*.4,c2x=ex-dx*(.15+R()*.2),c2y=t.y1+t.sg*.6;
fr+=`M${t.x.toFixed(1)} ${t.y0.toFixed(1)}C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${ex.toFixed(1)} ${t.y1.toFixed(1)}`;
const bx=n.x-ex;bk+=`M${ex.toFixed(1)} ${t.y1.toFixed(1)}C${(ex+bx*(.2+R()*.2)).toFixed(1)} ${(t.y1+2).toFixed(1)} ${(n.x-bx*(.3+R()*.2)).toFixed(1)} ${(n.y0+4).toFixed(1)} ${n.x.toFixed(1)} ${n.y0.toFixed(1)}`;

if(R()<.72)b+=bulb(ex,t.y1,R()*7,(R()-.5)*26);
if(t.P>90&&R()<.5){const q2=.45+R()*.2,v=1-q2,px=v*v*v*t.x+3*v*v*q2*c1x+3*v*q2*q2*c2x+q2*q2*q2*ex,py=v*v*v*t.y0+3*v*v*q2*c1y+3*v*q2*q2*c2y+q2*q2*q2*t.y1;b+=bulb(px,py,4+R()*8,(R()-.5)*14)}});
F.innerHTML=`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><mask id="nyM" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"></mask></defs><path class="w bk" d="${bk}" mask="url(#nyM)"/><path class="w" d="${fr}"/>${b}</svg>`;
mk=F.querySelector('#nyM');holes()};
draw();addEventListener('resize',draw);let raf=0;q.addEventListener('scroll',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(holes)},{passive:true})});
})();
