
(()=>{
const DAY=['в пн','во вт','в ср','в чт','в пт','в сб','в вс'];
const fmt=h=>{const H=Math.floor(h),M=Math.round((h-H)*60);return H+':'+String(M).padStart(2,'0')};
const TZ={'Екатеринбург':'Asia/Yekaterinburg','Тюмень':'Asia/Yekaterinburg'},WD={Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6};
function cityNow(c){const o={};for(const x of new Intl.DateTimeFormat('en-GB',{timeZone:TZ[c]||'Europe/Moscow',weekday:'short',hour:'numeric',minute:'numeric',hourCycle:'h23'}).formatToParts(new Date()))o[x.type]=x.value;return{wd:WD[o.weekday],t:+o.hour+o.minute/60}}
const cap=t=>t.replace(/^./,c=>c.toUpperCase());
function until(p){const {wd}=cityNow(p.c);for(let i=0;i<7;i++){const x=p.h[(wd+i)%7];if(x)return 'до '+fmt(x[1])}return ''}
function st(p){
  const {wd,t}=cityNow(p.c),h=p.h[wd];
  if(h&&h[0]===0&&h[1]===24)return{on:1,t:'Круглосуточно'};
  if(h&&t>=h[0]&&t<h[1])return{on:1,t:'Открыто до '+fmt(h[1])};
  if(h&&t<h[0])return{on:0,t:'Откроется в '+fmt(h[0])};
  for(let i=1;i<8;i++){const x=p.h[(wd+i)%7];if(x)return{on:0,t:'Откроется '+(i===1?'завтра':DAY[(wd+i)%7])+' в '+fmt(x[0])}}
  return{on:0,t:'Закрыто'};
}
window.CCH={fmt,cityNow,until,st,cap};
const cc=document.getElementById('cc');if(!cc)return;
if(!document.getElementById('ccpin'))document.body.insertAdjacentHTML('afterbegin',`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="ccpin" viewBox="0 0 54 67"><path d="M27 0C12.09 0 0 12.09 0 27c0 9.1 4.5 17.15 11.42 22.05 8.08 4.45 11.78 10.75 13.68 15.85.5 1.4 1.2 2.1 1.9 2.1s1.4-.7 1.9-2.1c1.9-5.1 5.6-11.4 13.68-15.85C49.5 44.15 54 36.1 54 27 54 12.09 41.91 0 27 0Z" fill="currentColor"/><path d="M209.04,69.43v57.15c0,6.82-1.31,12.91-4.07,18.42-2.76,5.51-6.53,9.72-11.47,12.76-4.94,3.05-10.74,4.64-17.13,4.64s-12.05-1.6-17.13-4.64c-4.94-3.05-8.86-7.4-11.47-12.76-2.32-4.5-3.63-9.57-3.92-14.94,0-.29,0-.58.14-.87l20.62-43.22c.29-.44,1.02-.29,1.02.29v39.89c0,4.79,1.02,8.56,2.9,11.31,1.89,2.9,4.65,4.21,7.98,4.21s6.24-1.45,8.13-4.21c1.89-2.9,2.76-6.67,2.76-11.31v-56.13c0-4.79-.87-8.56-2.76-11.31-1.89-2.9-4.5-4.35-8.13-4.35-3.34,0-6.1,1.45-7.98,4.35-.73,1.16-1.45,2.47-1.89,3.92l-22.79,48.15-14.23,29.88-3.77,7.98v.14c-2.32,3.63-5.37,6.67-8.86,8.99-4.79,3.05-10.31,4.64-16.55,4.64s-11.76-1.6-16.41-4.64c-4.79-3.05-8.42-7.25-11.03-12.76-2.61-5.37-3.92-11.6-3.92-18.42v-57.15c0-6.96,1.31-13.05,3.92-18.42,2.61-5.37,6.24-9.57,11.03-12.76,4.79-3.05,10.31-4.64,16.41-4.64s11.61,1.6,16.26,4.79c4.65,3.19,8.28,7.4,10.89,12.76,2.61,5.37,3.77,11.46,3.77,18.27v5.8c0,.87-.73,1.6-1.6,1.6h-18.58c-.87,0-1.6-.73-1.6-1.6v-5.22c0-4.93-.73-8.85-2.32-11.6-1.45-2.76-3.77-4.06-6.82-4.06s-5.52,1.45-7.11,4.21c-1.6,2.76-2.47,6.67-2.47,11.46v55.99c0,4.79.87,8.7,2.47,11.46,1.6,2.76,4.06,4.21,7.11,4.21s5.52-1.45,7.11-4.21c.44-.73.73-1.45,1.02-2.32l8.42-17.84,29.91-64.11,1.02-2.18c2.76-5.51,6.53-9.72,11.47-12.76,4.94-3.05,10.6-4.64,17.13-4.64s12.2,1.6,17.13,4.64c4.94,3.05,8.86,7.4,11.47,12.76,2.61,5.51,3.92,11.6,3.92,18.42Z" fill="#fff" transform="translate(-4.79 4.59) scale(0.2286)"/></symbol><symbol id="ccpin0" viewBox="0 0 54 67"><path d="M27 0C12.09 0 0 12.09 0 27c0 9.1 4.5 17.15 11.42 22.05 8.08 4.45 11.78 10.75 13.68 15.85.5 1.4 1.2 2.1 1.9 2.1s1.4-.7 1.9-2.1c1.9-5.1 5.6-11.4 13.68-15.85C49.5 44.15 54 36.1 54 27 54 12.09 41.91 0 27 0Z" fill="currentColor"/></symbol></svg>`);
if(!document.getElementById('chr'))document.body.insertAdjacentHTML('afterbegin','<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="chr" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol></svg>');
const PICK=cc.dataset.only==='pickup',ONE=cc.dataset.one?CC.find(p=>p.id===cc.dataset.one):null,
  W=PICK?['пункт выдачи','пункта выдачи','пунктов выдачи']:['копицентр','копицентра','копицентров'];
const list=document.getElementById('ccList'),card=document.getElementById('ccCard'),sum=document.getElementById('ccSum'),loc=document.getElementById('ccLoc');
const IN={'Москва':'в Москве','Екатеринбург':'в Екатеринбурге','Нижний Новгород':'в Нижнем Новгороде','Сочи':'в Сочи','Тюмень':'в Тюмени','Ярославль':'в Ярославле'};
const IN_S={'Нижний Новгород':'в Н. Новгороде'};
const plural=(n,a,b,c)=>n%10===1&&n%100!==11?a:n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?b:c;
let city='Москва';try{const c=localStorage.getItem('copy-city');if(IN[c])city=c}catch(e){}
if(ONE)city=ONE.c;
let me=null,sel=null,all=false,map=null,meMk=null;const mk={};
const box=card.parentElement;

const km=p=>{if(!me)return null;const R=6371,r=Math.PI/180,[a,b]=me,[c,d]=p.ll,x=Math.sin((c-a)*r/2)**2+Math.cos(a*r)*Math.cos(c*r)*Math.sin((d-b)*r/2)**2;return 2*R*Math.asin(Math.sqrt(x))};
const kmT=p=>{const k=km(p);return k==null?'':k<1?Math.round(k*10)*100+' м':k.toFixed(1).replace('.',',')+' км'};
const pts=()=>CC.filter(p=>p.a&&(PICK?p.pk:p.c===city)).sort((a,b)=>me?km(a)-km(b):(st(b).on-st(a).on)||a.n.localeCompare(b.n,'ru'));
const line=p=>city==='Москва'&&p.w?`<i class="ln" data-c="${p.line}" aria-hidden="true"></i>`:'<i class="ln ln-x" aria-hidden="true"></i>';
const walk=p=>p.w&&p.w<=20?p.w:0;
const meta=p=>{const s=st(p);return `<span class="${s.on?'on':''}">${s.t}</span>${walk(p)?' · '+walk(p)+' мин от метро':''}${me?' · '+kmT(p):''}`};

function paintSum(){if(PICK||ONE)return;document.getElementById('ccH').innerHTML='Копицентры <span>'+(IN_S[city]?`<span class="cc-full">${IN[city]}</span><span class="cc-short">${IN_S[city]}</span>`:IN[city])+'</span>';
 const P=pts(),o=P.filter(p=>st(p).on).length;sum.textContent=`${P.length} ${plural(P.length,'копицентр','копицентра','копицентров')} ${IN[city]} · открыто сейчас ${o}`}

function paintList(){
  const P=pts();
  const H=list.offsetHeight||parseFloat(getComputedStyle(list).minHeight)||480,cols=getComputedStyle(list).gridTemplateColumns.split(' ').length,fit=Math.floor((H-56+8)/72)*cols;
  const N=all||P.length<=Math.floor((H+8)/72)*cols?P.length:fit;
  const row=p=>{const s=st(p),x=cap(s.on?(s.t==='Круглосуточно'?'24/7':s.t.replace('Открыто ','')):until(p));
    return `<button type="button" class="pt${s.on?'':' off'}" data-id="${p.id}">${line(p)}<span class="pt-n"><span>${nm(p)}</span>${walk(p)?`<span class="pt-m"> · ${walk(p)} мин<span class="vh"> пешком от метро</span></span>`:''}</span><span class="pt-s${s.on?' on':''}">${x}</span><span class="pt-a">${[me?kmT(p):'',p.a].filter(Boolean).join(' · ')}</span><svg class="pt-g" aria-hidden="true"><use href="#chr"/></svg></button>`};
  list.innerHTML=P.slice(0,N).map(row).join('')
    +(N<P.length?`<button type="button" class="btn btn-p cc-more">Показать все ${P.length} ${plural(P.length,...W)}</button>`:'');
}
list.onclick=e=>{
  if(e.target.closest('.cc-more')){all=true;paintList();return}
  const b=e.target.closest('.pt');if(!b)return;view('map');pick(CC.find(p=>p.id===b.dataset.id));
};

const short=p=>{const t=st(p).t,on=st(p).on;const x=cap(on?(t==='Круглосуточно'?'24/7':t.replace('Открыто ','')):until(p));return `<small class="${on?'on':''}">${x}</small>`};
let cl=[];
function cluster(){
  if(!map)return;cl.forEach(m=>m.remove());cl=[];
  const G=[];
  pts().forEach(p=>{
    const q=map.project(LL(p.ll));
    const nr=map.getZoom()>=13,g=sel&&sel.id===p.id?null:G.find(g=>g.q&&(nr?Math.abs(g.q.x-q.x)<170&&Math.abs(g.q.y-q.y)<44:Math.hypot(g.q.x-q.x,g.q.y-q.y)<40));
    if(g)g.push(p);else{const n=[p];if(!(sel&&sel.id===p.id))n.q=q;G.push(n)}
  });
  G.forEach(g=>{
    g.forEach(p=>{const e=mk[p.id]?.getElement();if(e)e.classList.toggle('in-cl',g.length>1)});
    if(g.length<2)return;
    const el=document.createElement('div');
    el.innerHTML=`<button type="button" class="cc-pin cc-grp" aria-label="${g.length} ${plural(g.length,...W)} рядом — приблизить"><svg aria-hidden="true"><use href="#ccpin0"/></svg><b>${g.length}</b></button>`;
    el.firstChild.onclick=e=>{e.stopPropagation();map.fitBounds(bounds(g),{padding:88,maxZoom:15,duration:500})};
    const c=[g.reduce((a,p)=>a+p.ll[0],0)/g.length,g.reduce((a,p)=>a+p.ll[1],0)/g.length];
    cl.push(new maplibregl.Marker({element:el,anchor:'bottom'}).setLngLat(LL(c)).addTo(map));
  });
}
const DN=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
const byAddr=p=>p.n===p.c&&!!p.a,street=a=>{const x=a.split(',')[0].replace(/\s+\d\S*$/,'').replace(/^ул\.\s*/,'');return x[0].toUpperCase()+x.slice(1)},nm=p=>byAddr(p)?street(p.a):p.n;
function hours(p){
  const f=h=>!h?'выходной':h[0]===0&&h[1]===24?'круглосуточно':'<span class="tm">'+fmt(h[0])+'–'+fmt(h[1])+'</span>',G=[];
  p.h.forEach((h,i)=>{const v=f(h),g=G[G.length-1];g&&g.v===v?g.b=i:G.push({a:i,b:i,v})});
  if(G.length===1)return G[0].v==='круглосуточно'?'':'Без выходных, '+G[0].v;
  return G.map(g=>(g.a===g.b?DN[g.a]:DN[g.a]+'–'+DN[g.b])+' '+g.v).join(', ');
}
const MS=[...(document.querySelector('.ct-l')?.querySelectorAll('a:not(.m-tel)')||[])].map(a=>a.outerHTML).join('');
const ccUrl=p=>{const s=(p.url||'').split('/').filter(Boolean).pop();return s?'copycenter/'+s+'/':p.url};
function fill(p){
  const el=mk[p.id]?.getElement();if(!el)return null;
  const route=`https://yandex.ru/maps/?rtext=${me?me.join(','):''}~${p.ll.join(',')}&rtt=pd`;
  el.querySelector('.cc-pop').innerHTML=`<button class="x" type="button" aria-label="Закрыть"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
    <div class="cc-n">${line(p)}${nm(p)}</div><p class="cc-st">${meta(p)}</p>${p.a?`<p class="cc-ad">${p.a}</p>`:''}
    ${hours(p)?`<p class="cc-hr">${hours(p)}</p>`:''}
    ${p.t||p.m?`<p class="cc-ct">${p.t?`<a href="tel:${p.tel}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>${p.t}</a>`:''}${p.m?`<a href="mailto:${p.m}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>${p.m}</a>`:''}</p>`:''}
    <div class="cc-act"><a class="btn btn-p btn-sm" href="${route}" target="_blank" rel="noopener">Маршрут</a><div class="cc-ms">${MS}</div></div>
    <p class="cc-lk"><a class="cc-link" href="https://yandex.ru/maps/?text=${encodeURIComponent('COPY.RU '+p.c+', '+p.a)}" target="_blank" rel="noopener" data-todo="ID организации в Яндекс Бизнесе → бейдж рейтинга и прямая ссылка на карточку">Отзывы на Картах</a><a class="cc-link" href="${ccUrl(p)}">О копицентре →</a></p>`;
  el.querySelector('.cc-pop .x').onclick=e=>{e.stopPropagation();pick(null)};
  el.classList.add('open');el.querySelector('.cc-pin').setAttribute('aria-expanded','true');
  return el;
}
function pick(p){
  card.hidden=true;
  if(sel&&mk[sel.id]){const o=mk[sel.id].getElement();o.classList.remove('open');o.querySelector('.cc-pin').setAttribute('aria-expanded','false')}
  sel=p;cluster();if(!p)return;
  const el=fill(p);if(!el||!map)return;
  const h=el.querySelector('.cc-pop').offsetHeight;
  map.easeTo({center:LL(p.ll),zoom:Math.min(Math.max(map.getZoom(),13),14.5),padding:{top:h+72,bottom:24,left:0,right:0},duration:600});
  el.querySelector('.cc-pop .x').focus({preventScroll:true});
}

const LL=a=>[a[1],a[0]];
const isDark=()=>{const t=document.documentElement.dataset.theme;return t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches};
const PAL={
  light:{bg:'#ECEAE4',park:'#E1E3D6',water:'#D3DCE2',bld:'#E3E0D9',road:'#FFFFFF',cas:'#DDD9D0',rail:'#CFCBC2',txt:'#7A7972',halo:'#ECEAE4'},
  dark:{bg:'#1F1E23',park:'#212622',water:'#192028',bld:'#27262C',road:'#313037',cas:'#1F1E23',rail:'#3A3940',txt:'#8E8C85',halo:'#1F1E23'}};
let base=null;
function styleFor(P){
  const s=structuredClone(base);delete s.sources.ne2_shaded;
  s.layers=s.layers.filter(l=>l.source!=='ne2_shaded'&&!/shield|airport|aeroway|boundary|ice_shelf|glacier|highway_path|pier|label_country|label_state|waterway_line_label|highway-name-path/.test(l.id));
  for(const l of s.layers){const id=l.id,p=l.paint||(l.paint={});
    if(id==='background')p['background-color']=P.bg;
    else if(id==='park'||id==='landcover_wood'){p['fill-color']=P.park;p['fill-opacity']=1}
    else if(id==='water')p['fill-color']=P.water;
    else if(id==='waterway')p['line-color']=P.water;
    else if(id==='landuse_residential'){p['fill-color']=P.bg;p['fill-opacity']=1}
    else if(id==='building'){p['fill-color']=P.bld;delete p['fill-outline-color']}
    else if(/casing/.test(id))p['line-color']=P.cas;
    else if(/railway/.test(id))p['line-color']=P.rail;
    else if(l.type==='line'&&/^(highway|tunnel)/.test(id))p['line-color']=P.road;
    if(l.type==='symbol'){if(l.layout?.['text-field'])l.layout['text-field']=['coalesce',['get','name:ru'],['get','name']];p['text-color']=P.txt;p['text-halo-color']=P.halo;p['text-halo-width']=1.2}
  }
  if(window.METRO){
    s.sources.metro={type:'geojson',data:METRO};s.sources.metroL={type:'geojson',data:METRO_LABELS};
    s.layers.push({id:'metro-dot',type:'circle',source:'metro',minzoom:13,paint:{'circle-radius':7,'circle-color':['get','c'],'circle-stroke-width':1.5,'circle-stroke-color':P.halo}});
    s.layers.push({id:'metro-m',type:'symbol',source:'metro',minzoom:13,layout:{'text-field':'М','text-font':['Noto Sans Bold'],'text-size':9,'text-allow-overlap':true,'text-ignore-placement':true},paint:{'text-color':['get','t']}});
    s.layers.push({id:'metro-name',type:'symbol',source:'metroL',minzoom:13,filter:['!',['in',['get','n'],['literal',CC.map(p=>p.n)]]], layout:{'text-field':['get','n'],'text-font':['Noto Sans Regular'],'text-size':11,'text-anchor':'left','text-offset':[1.1,0],'text-optional':true},paint:{'text-color':P.txt,'text-halo-color':P.halo,'text-halo-width':1.2}});
  }
  return s;
}
const restyle=()=>{map&&base&&map.setStyle(styleFor(PAL[isDark()?'dark':'light']))};
function bounds(P){const b=new maplibregl.LngLatBounds();P.forEach(p=>b.extend(LL(p.ll)));return b}
const PAD=()=>matchMedia('(max-width:560px)').matches?{top:150,bottom:110,left:32,right:72}:{top:48,bottom:48,left:48,right:72};
function fitAll(P){if(!map)return;if(ONE)return map.jumpTo({center:LL(ONE.ll),zoom:15});P.length>1?map.fitBounds(bounds(P),{padding:PAD(),maxZoom:12,duration:0}):map.jumpTo({center:LL(P[0].ll),zoom:12})}

async function paintMap(fit){
  if(!window.maplibregl)return;
  const P=pts();
  if(!map){
    if(!base){try{base=await (await fetch('https://tiles.openfreemap.org/styles/positron')).json()}catch(e){return}}
    map=new maplibregl.Map({container:'ccMap',style:styleFor(PAL[isDark()?'dark':'light']),bounds:bounds(P),fitBoundsOptions:{padding:PAD(),maxZoom:12},
      attributionControl:{compact:true},dragRotate:false,pitchWithRotate:false,cooperativeGestures:true,
      locale:{'CooperativeGesturesHandler.WindowsHelpText':'Ctrl + колесо — приблизить','CooperativeGesturesHandler.MacHelpText':'⌘ + колесо — приблизить','CooperativeGesturesHandler.MobileHelpText':'Двигайте карту двумя пальцами','NavigationControl.ZoomIn':'Приблизить','NavigationControl.ZoomOut':'Отдалить'}});
    map.touchZoomRotate.disableRotation();
    {const c=map.getCanvasContainer(),stop=e=>{if(!e.touches||e.touches.length>1)e.preventDefault()};c.addEventListener('touchmove',stop,{passive:false});c.addEventListener('gesturestart',stop)}
    map.addControl(new maplibregl.NavigationControl({showCompass:false}),'top-left');
    map.on('click',()=>pick(null));
    const near=()=>box.classList.toggle('near',map.getZoom()>=13);map.on('zoom',near);near();
    map.on('zoomend',cluster);map.on('resize',cluster);
    map.once('load',()=>document.querySelector('#ccMap .maplibregl-ctrl-attrib')?.classList.remove('maplibregl-compact-show'));
    new MutationObserver(restyle).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change',restyle);
  }
  Object.values(mk).forEach(m=>m.remove());for(const k in mk)delete mk[k];
  P.forEach(p=>{
    const el=document.createElement('div');el.className='cc-mk';el.innerHTML=`<div class="cc-pop" role="dialog" aria-label="${p.n}"></div><button type="button" aria-expanded="false" class="cc-pin${st(p).on?'':' off'}${(sel&&sel.id===p.id)||ONE===p?' sel':''}" aria-label="${p.n}"><svg aria-hidden="true"><use href="#ccpin"/></svg><span class="tg">${line(p)}${p.n===p.c?(p.a||p.n).split(',')[0]:p.n}${short(p)}</span></button>`;
    el.querySelector('.cc-pin').onclick=e=>{e.stopPropagation();pick(sel===p?null:p)};el.querySelector('.cc-pop').onclick=e=>e.stopPropagation();
    mk[p.id]=new maplibregl.Marker({element:el,anchor:'bottom'}).setLngLat(LL(p.ll)).addTo(map);
  });
  if(sel)fill(sel);
  cluster();
  meMk&&meMk.remove();meMk=null;
  if(me){const el=document.createElement('div');el.className='cc-me';meMk=new maplibregl.Marker({element:el}).setLngLat(LL(me)).addTo(map)}
  if(fit)fitAll(P);
}

function view(v){
  cc.dataset.view=v;cc.closest('section').querySelectorAll('.seg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));
  if(!ONE)try{localStorage.setItem('cc-view',v)}catch(e){}
  if(v==='map'&&map){map.resize();if(!sel)fitAll(pts())}
  if(v==='list')paintList();
}
const sg=cc.closest('section').querySelector('.seg');if(sg)sg.onclick=e=>{const b=e.target.closest('button');if(b)view(b.dataset.v)};

const near=()=>{let b=null,d=Infinity;for(const p of CC.filter(p=>!PICK||p.pk)){const k=km(p);if(k<d){d=k;b=p}}return[b,d]};
const msg=document.getElementById('ccMsg');let msgT;
function say(t){msg.textContent=t;msg.classList.add('on');clearTimeout(msgT);msgT=setTimeout(()=>msg.classList.remove('on'),100)}
function locate(auto){
  const fail=t=>{loc.removeAttribute('aria-busy');if(!auto)say(t)};
  if(!navigator.geolocation){fail('Браузер не умеет определять местоположение');return}
  loc.setAttribute('aria-busy','true');
  navigator.geolocation.getCurrentPosition(async g=>{
    me=[g.coords.latitude,g.coords.longitude];loc.removeAttribute('aria-busy');loc.setAttribute('aria-pressed','true');
    let chosen=null;try{chosen=localStorage.getItem('copy-city')}catch(e){}
    const[n,d]=near();
    if(!PICK&&!ONE&&n&&n.c!==city&&d<80&&(!auto||!chosen))document.dispatchEvent(new CustomEvent('copy:city-set',{detail:{c:n.c,save:false}}));
    paintSum();paintList();await paintMap();
    const P=pts();
    if(ONE){if(map)map.fitBounds(bounds([{ll:me},ONE]),{padding:64,maxZoom:15,duration:auto?0:600});return}
    if(auto){if(map&&P[0])map.fitBounds(bounds([{ll:me},P[0]]),{padding:64,maxZoom:15,duration:0})}
    else pick(P.find(p=>st(p).on&&km(p)<km(P[0])+1.5)||P[0]);
  },e=>fail(e.code===1?(isSecureContext?'Нет доступа к местоположению. Разрешите его в настройках браузера':'Местоположение работает только на защищённой странице (https)'):'Не получилось определить местоположение. Попробуйте ещё раз'),
  {timeout:10000,maximumAge:300000});
}
loc.onclick=()=>locate(false);
navigator.permissions?.query({name:'geolocation'}).then(r=>{if(r.state==='granted')locate(true)}).catch(()=>{});

function paintAll(fit){paintSum();paintList();paintMap(fit)}
document.addEventListener('copy:city',e=>{if(PICK||ONE)return;city=IN[e.detail]?e.detail:city;sel=null;card.hidden=true;all=false;paintAll(true)});
let v0='map';try{v0=!ONE&&localStorage.getItem('cc-view')==='list'?'list':'map'}catch(e){}
view(v0);paintAll(true);
})();
