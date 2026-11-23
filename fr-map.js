(()=>{
const box=document.getElementById('geoMap');if(!box||!window.CC)return;
const LL=a=>[a[1],a[0]];
const P={bg:'#ECEAE4',park:'#E1E3D6',water:'#D3DCE2',bld:'#E3E0D9',road:'#FFFFFF',cas:'#DDD9D0',rail:'#CFCBC2',txt:'#7A7972',halo:'#ECEAE4'};
const PTS=CC.filter(p=>p.a);
const cities=[];PTS.forEach(p=>{let c=cities.find(c=>c.n===p.c);if(!c)cities.push(c={n:p.c,P:[]});c.P.push(p)});
cities.sort((a,b)=>b.P.length-a.P.length);
const bounds=L=>{const b=new maplibregl.LngLatBounds();L.forEach(p=>b.extend(LL(p.ll)));return b};
const center=L=>bounds(L).getCenter();
const pad=()=>matchMedia('(max-width:560px)').matches?{top:170,bottom:150,left:88,right:88}:{top:88,bottom:56,left:120,right:120};
function style(base){
  const s=structuredClone(base);delete s.sources.ne2_shaded;
  s.layers=s.layers.filter(l=>l.source!=='ne2_shaded'&&!/shield|airport|aeroway|ice_shelf|glacier|highway_path|pier|label_state|waterway_line_label|highway-name-path/.test(l.id));
  for(const l of s.layers){const id=l.id,p=l.paint||(l.paint={});
    if(id==='background')p['background-color']=P.bg;
    else if(id==='park'||id==='landcover_wood'){p['fill-color']=P.park;p['fill-opacity']=1}
    else if(id==='water')p['fill-color']=P.water;
    else if(id==='waterway')p['line-color']=P.water;
    else if(id==='landuse_residential'){p['fill-color']=P.bg;p['fill-opacity']=1}
    else if(id==='building'){p['fill-color']=P.bld;delete p['fill-outline-color']}
    else if(/boundary/.test(id)){p['line-color']=P.cas}
    else if(/casing/.test(id))p['line-color']=P.cas;
    else if(/railway/.test(id))p['line-color']=P.rail;
    else if(l.type==='line'&&/^(highway|tunnel)/.test(id))p['line-color']=P.road;
    if(/^label_(city|town|country)/.test(id))
      l.filter=['all',l.filter||true,['!',['in',['coalesce',['get','name:ru'],['get','name']],['literal',[...cities.map(c=>c.n),'Россия']]]]];
    if(l.type==='symbol'){if(l.layout?.['text-field'])l.layout['text-field']=['coalesce',['get','name:ru'],['get','name']];p['text-color']=P.txt;p['text-halo-color']=P.halo;p['text-halo-width']=1.2}
  }
  return s;
}
if(!document.getElementById('ccpin'))document.body.insertAdjacentHTML('afterbegin',`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="ccpin" viewBox="0 0 54 67"><path d="M27 0C12.09 0 0 12.09 0 27c0 9.1 4.5 17.15 11.42 22.05 8.08 4.45 11.78 10.75 13.68 15.85.5 1.4 1.2 2.1 1.9 2.1s1.4-.7 1.9-2.1c1.9-5.1 5.6-11.4 13.68-15.85C49.5 44.15 54 36.1 54 27 54 12.09 41.91 0 27 0Z" fill="currentColor"/><path d="M209.04,69.43v57.15c0,6.82-1.31,12.91-4.07,18.42-2.76,5.51-6.53,9.72-11.47,12.76-4.94,3.05-10.74,4.64-17.13,4.64s-12.05-1.6-17.13-4.64c-4.94-3.05-8.86-7.4-11.47-12.76-2.32-4.5-3.63-9.57-3.92-14.94,0-.29,0-.58.14-.87l20.62-43.22c.29-.44,1.02-.29,1.02.29v39.89c0,4.79,1.02,8.56,2.9,11.31,1.89,2.9,4.65,4.21,7.98,4.21s6.24-1.45,8.13-4.21c1.89-2.9,2.76-6.67,2.76-11.31v-56.13c0-4.79-.87-8.56-2.76-11.31-1.89-2.9-4.5-4.35-8.13-4.35-3.34,0-6.1,1.45-7.98,4.35-.73,1.16-1.45,2.47-1.89,3.92l-22.79,48.15-14.23,29.88-3.77,7.98v.14c-2.32,3.63-5.37,6.67-8.86,8.99-4.79,3.05-10.31,4.64-16.55,4.64s-11.76-1.6-16.41-4.64c-4.79-3.05-8.42-7.25-11.03-12.76-2.61-5.37-3.92-11.6-3.92-18.42v-57.15c0-6.96,1.31-13.05,3.92-18.42,2.61-5.37,6.24-9.57,11.03-12.76,4.79-3.05,10.31-4.64,16.41-4.64s11.61,1.6,16.26,4.79c4.65,3.19,8.28,7.4,10.89,12.76,2.61,5.37,3.77,11.46,3.77,18.27v5.8c0,.87-.73,1.6-1.6,1.6h-18.58c-.87,0-1.6-.73-1.6-1.6v-5.22c0-4.93-.73-8.85-2.32-11.6-1.45-2.76-3.77-4.06-6.82-4.06s-5.52,1.45-7.11,4.21c-1.6,2.76-2.47,6.67-2.47,11.46v55.99c0,4.79.87,8.7,2.47,11.46,1.6,2.76,4.06,4.21,7.11,4.21s5.52-1.45,7.11-4.21c.44-.73.73-1.45,1.02-2.32l8.42-17.84,29.91-64.11,1.02-2.18c2.76-5.51,6.53-9.72,11.47-12.76,4.94-3.05,10.6-4.64,17.13-4.64s12.2,1.6,17.13,4.64c4.94,3.05,8.86,7.4,11.47,12.76,2.61,5.51,3.92,11.6,3.92,18.42Z" fill="#fff" transform="translate(-4.79 4.59) scale(0.2286)"/></symbol><symbol id="ccpin0" viewBox="0 0 54 67"><path d="M27 0C12.09 0 0 12.09 0 27c0 9.1 4.5 17.15 11.42 22.05 8.08 4.45 11.78 10.75 13.68 15.85.5 1.4 1.2 2.1 1.9 2.1s1.4-.7 1.9-2.1c1.9-5.1 5.6-11.4 13.68-15.85C49.5 44.15 54 36.1 54 27 54 12.09 41.91 0 27 0Z" fill="currentColor"/></symbol></svg>`);
const H=window.CCH,DN=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
const plural=(n,a,b,c)=>n%10===1&&n%100!==11?a:n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?b:c;
const byAddr=p=>p.n===p.c&&!!p.a,street=a=>{const x=a.split(',')[0].replace(/\s+\d\S*$/,'').replace(/^ул\.\s*/,'');return x[0].toUpperCase()+x.slice(1)},nm=p=>byAddr(p)?street(p.a):p.n;
const line=p=>p.c==='Москва'&&p.w?`<i class="ln" data-c="${p.line}" aria-hidden="true"></i>`:'<i class="ln ln-x" aria-hidden="true"></i>';
const walk=p=>p.w&&p.w<=20?p.w:0;
const short=p=>{const s=H.st(p),x=H.cap(s.on?(s.t==='Круглосуточно'?'24/7':s.t.replace('Открыто ','')):H.until(p));return `<small class="${s.on?'on':''}">${x}</small>`};
function hours(p){
  const f=h=>!h?'выходной':h[0]===0&&h[1]===24?'круглосуточно':'<span class="tm">'+H.fmt(h[0])+'–'+H.fmt(h[1])+'</span>',G=[];
  p.h.forEach((h,i)=>{const v=f(h),g=G[G.length-1];g&&g.v===v?g.b=i:G.push({a:i,b:i,v})});
  if(G.length===1)return G[0].v==='круглосуточно'?'':'Без выходных, '+G[0].v;
  return G.map(g=>(g.a===g.b?DN[g.a]:DN[g.a]+'–'+DN[g.b])+' '+g.v).join(', ');
}
const W=['копицентр','копицентра','копицентров'];
let Z0=0,mode=null;const far=()=>map.getZoom()<Z0-1;
let map,city=null,sel=null,pills=[],mk={},cl=[];const back=document.getElementById('geoAll');

function paintCities(){
  pills.forEach(m=>m.remove());pills=[];mode=far();
  if(city)return;
  if(far()){
    const el=document.createElement('div');el.className='geo-mk';
    el.innerHTML=`<button type="button" class="cc-pin cc-grp" aria-label="Россия: ${PTS.length} ${plural(PTS.length,...W)} — показать города"><svg aria-hidden="true"><use href="#ccpin0"/></svg><b>${PTS.length}</b></button><span class="geo-n" aria-hidden="true">Россия</span>`;
    el.onclick=e=>{e.stopPropagation();showAll()};
    pills.push(new maplibregl.Marker({element:el,anchor:'bottom'}).setLngLat(center(PTS)).addTo(map));return;
  }
  cities.forEach(c=>{
    const el=document.createElement('div');el.className='geo-mk';
    el.innerHTML=`<button type="button" class="cc-pin cc-grp" aria-label="${c.n}: ${c.P.length} ${plural(c.P.length,...W)} — показать на карте"><svg aria-hidden="true"><use href="#ccpin0"/></svg><b>${c.P.length}</b></button><span class="geo-n" aria-hidden="true">${c.n==='Нижний Новгород'?'<span class="geo-f">Нижний Новгород</span><span class="geo-s">Н. Новгород</span>':c.n}</span>`;
    el.onclick=e=>{e.stopPropagation();showCity(c)};
    pills.push(new maplibregl.Marker({element:el,anchor:'bottom'}).setLngLat(center(c.P)).addTo(map));
  });
  names();
}
function names(){
  const R=[],hit=(r,q)=>r.left<q.right+4&&r.right>q.left-4&&r.top<q.bottom+2&&r.bottom>q.top-2;
  pills.forEach(m=>R.push(m.getElement().querySelector('.cc-pin').getBoundingClientRect()));
  for(const m of [...pills].sort((a,b)=>a.getLngLat().lng-b.getLngLat().lng)){const n=m.getElement().querySelector('.geo-n');n.classList.remove('l','b','x');
    let r=n.getBoundingClientRect();if(R.some(q=>hit(r,q))){n.classList.add('l');r=n.getBoundingClientRect();if(R.some(q=>hit(r,q))){n.classList.replace('l','b');r=n.getBoundingClientRect();if(R.some(q=>hit(r,q))){n.classList.add('x');continue}}}R.push(r)}
}
function paintPoints(){
  Object.values(mk).forEach(m=>m.remove());mk={};
  if(!city)return;
  city.P.forEach(p=>{
    const el=document.createElement('div');el.className='cc-mk';
    el.innerHTML=`<div class="cc-pop" role="dialog" aria-label="${p.n}"></div><button type="button" aria-expanded="false" class="cc-pin${H.st(p).on?'':' off'}" aria-label="${p.n}"><svg aria-hidden="true"><use href="#ccpin"/></svg><span class="tg">${line(p)}${nm(p)}${short(p)}</span></button>`;
    el.querySelector('.cc-pin').onclick=e=>{e.stopPropagation();pick(sel===p?null:p)};el.querySelector('.cc-pop').onclick=e=>e.stopPropagation();
    mk[p.id]=new maplibregl.Marker({element:el,anchor:'bottom'}).setLngLat(LL(p.ll)).addTo(map);
  });
  cluster();
}
function cluster(){
  cl.forEach(m=>m.remove());cl=[];if(!city)return;
  const G=[],nr=map.getZoom()>=13;
  city.P.forEach(p=>{const q=map.project(LL(p.ll)),g=sel&&sel.id===p.id?null:G.find(g=>g.q&&(nr?Math.abs(g.q.x-q.x)<170&&Math.abs(g.q.y-q.y)<44:Math.hypot(g.q.x-q.x,g.q.y-q.y)<40));
    if(g)g.push(p);else{const n=[p];if(!(sel&&sel.id===p.id))n.q=q;G.push(n)}});
  G.forEach(g=>{
    g.forEach(p=>mk[p.id]?.getElement().classList.toggle('in-cl',g.length>1));
    if(g.length<2)return;
    const el=document.createElement('div');
    el.innerHTML=`<button type="button" class="cc-pin cc-grp" aria-label="${g.length} ${plural(g.length,...W)} рядом — приблизить"><svg aria-hidden="true"><use href="#ccpin0"/></svg><b>${g.length}</b></button>`;
    el.firstChild.onclick=e=>{e.stopPropagation();map.fitBounds(bounds(g),{padding:88,maxZoom:15,duration:500})};
    cl.push(new maplibregl.Marker({element:el,anchor:'bottom'}).setLngLat(LL([g.reduce((a,p)=>a+p.ll[0],0)/g.length,g.reduce((a,p)=>a+p.ll[1],0)/g.length])).addTo(map));
  });
}
function pick(p){
  if(sel&&mk[sel.id]){const o=mk[sel.id].getElement();o.classList.remove('open');o.querySelector('.cc-pin').setAttribute('aria-expanded','false')}
  sel=p;cluster();if(!p)return;
  const el=mk[p.id].getElement(),s=H.st(p),h=hours(p);
  el.querySelector('.cc-pop').innerHTML=`<button class="x" type="button" aria-label="Закрыть"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
    <div class="cc-n">${line(p)}${nm(p)}</div><p class="cc-st"><span class="${s.on?'on':''}">${s.t}</span>${walk(p)?' · '+walk(p)+' мин от метро':''}</p><p class="cc-ad">${p.a}</p>${h?`<p class="cc-hr">${h}</p>`:''}`;
  el.querySelector('.cc-pop .x').onclick=e=>{e.stopPropagation();pick(null)};
  el.classList.add('open');el.querySelector('.cc-pin').setAttribute('aria-expanded','true');
  const ph=el.querySelector('.cc-pop').offsetHeight;
  map.easeTo({center:LL(p.ll),zoom:Math.min(Math.max(map.getZoom(),13),14.5),padding:{top:ph+72,bottom:24,left:0,right:0},duration:600});
  el.querySelector('.cc-pop .x').focus({preventScroll:true});
}
const unpad=()=>map.setPadding({top:0,bottom:0,left:0,right:0});
function showCity(c){
  city=c;sel=null;unpad();paintCities();
  c.P.length>1?map.fitBounds(bounds(c.P),{padding:pad(),maxZoom:13,duration:700}):map.easeTo({center:LL(c.P[0].ll),zoom:13,duration:700});
  map.once('moveend',paintPoints);back.hidden=false;
}
function showAll(){
  city=null;sel=null;unpad();paintPoints();cl.forEach(m=>m.remove());cl=[];back.hidden=true;
  map.fitBounds(bounds(PTS),{padding:pad(),duration:600});map.once('moveend',()=>{Z0=map.getZoom();paintCities()});
}
async function init(){
  let base;try{base=await (await fetch('https://tiles.openfreemap.org/styles/positron')).json()}catch(e){box.classList.add('off');return}
  map=new maplibregl.Map({container:'geoCanvas',style:style(base),bounds:bounds(PTS),fitBoundsOptions:{padding:pad()},
    attributionControl:{compact:true},dragRotate:false,pitchWithRotate:false,cooperativeGestures:true,minZoom:2,maxZoom:17,
    locale:{'CooperativeGesturesHandler.WindowsHelpText':'Ctrl + колесо — приблизить','CooperativeGesturesHandler.MacHelpText':'⌘ + колесо — приблизить','CooperativeGesturesHandler.MobileHelpText':'Двигайте карту двумя пальцами','NavigationControl.ZoomIn':'Приблизить','NavigationControl.ZoomOut':'Отдалить'}});
  map.touchZoomRotate.disableRotation();
  {const c=map.getCanvasContainer(),stop=e=>{if(!e.touches||e.touches.length>1)e.preventDefault()};c.addEventListener('touchmove',stop,{passive:false});c.addEventListener('gesturestart',stop)}
  map.addControl(new maplibregl.NavigationControl({showCompass:false}),'top-left');
  map.once('load',()=>box.querySelector('.maplibregl-ctrl-attrib')?.classList.remove('maplibregl-compact-show'));
  const near=()=>box.classList.toggle('near',map.getZoom()>=13);map.on('zoom',near);near();
  map.on('zoomend',()=>{cluster();if(!city){if(mode!==far())paintCities();else names()}});map.on('resize',()=>{cluster();if(!city)names()});
  map.on('click',()=>sel&&pick(null));
  map.once('idle',()=>{Z0=map.getZoom();paintCities()});
  back.onclick=()=>showAll();
}
const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();init()}},{rootMargin:'400px'});io.observe(box);
})();
