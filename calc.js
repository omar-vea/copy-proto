

(function(){
const NB=' ';
const fmt=n=>Math.round(n).toLocaleString('ru-RU').replace(/\s/g,NB)+NB+'₽';
const per=n=>(n<10?n.toFixed(1).replace('.',','):Math.round(n))+'⁠₽';
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const termSub=v=>v.hours?'за '+hours(v.hours):v.days?v.days.join('–')+' '+(Math.max(...v.days)<5?'рабочих дня':'рабочих дней'):'';
const hours=h=>h+' '+(h%10===1&&h%100!==11?'час':h%10>=2&&h%10<=4&&(h%100<12||h%100>14)?'часа':'часов');
const CHEV='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

function kindOf(f){
  if(f.kind)return f.kind;
  if(f.hidden||f.select==='hidden_frontend')return null;
  const v=f.values.filter(x=>x.enabled!==false);
  if(!v.length)return null;
  if(f.select==='option_with_field_text')return 'number';
  if(f.required&&v.length===1&&!f.multiple)return null;
  if(f.multiple||(f.select==='radio_checkbox'&&v.length>1))return 'checks';
  if(v.length===1)return 'switch';
  const n=v.length+(f.required?0:1);
  const want=f.view||VIEW[f.select];
  const seg=n>=2&&n<=4&&!v.some(x=>x.image)&&[...v.map(x=>x.short||x.title),...(f.required?[]:[f.noneLabel||'Без'])].every(t=>t.length<=SEG[n]);
  if(want==='list'||n>6)return 'list';
  if(want==='seg'&&seg)return 'seg';
  if(!want&&seg&&!v.some(x=>x.comment))return 'seg';
  return 'tiles';
}
const VIEW={radiobox:'seg',carousel:'tiles',select_block:'list'};
const SEG={2:18,3:12,4:8};
const pic=v=>v.image?`<span class="cf-ph"><img src="${esc(v.image)}" alt="" loading="lazy"></span>`:'';
const wide=v=>v.image&&v.imageW/v.imageH>=1.5;
const picT=v=>wide(v)?`<span class="cf-ph w"><img src="${esc(v.image)}" alt="" loading="lazy"></span>`:pic(v);
const OK='<svg class="cf-ok" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
const NONE='none';
const vars=n=>n+' '+(n%10===1&&n%100!==11?'вариант':n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?'варианта':'вариантов');
const ok=(w,st)=>!w||[].concat(st[w.f]).some(x=>w.v.includes(x));
function view(f,st){if(!ok(f.when,st))return null;return f.values?{...f,values:f.values.filter(v=>ok(v.when,st))}:f}
const opts=f=>{const v=f.values.filter(x=>x.enabled!==false);return f.required||!['tiles','list','seg'].includes(kindOf(f))?v:[{id:NONE,title:f.noneLabel||'Без'},...v]};

function initState(p){const st={};p.fields.forEach(f=>{const k=kindOf(f);if(!k)return;
  if(k==='qty')st[f.id]=f.def??f.tiles[0];
  else if(k==='number')st[f.id]=f.def??f.min??1;
  else if(k==='size')st[f.id]={v:(f.values.find(x=>x.selected)||f.values[0]).id,w:f.def?.w??90,h:f.def?.h??50};
  else if(k==='checks')st[f.id]=f.values.filter(x=>x.selected).map(x=>x.id);
  else if(k==='switch')st[f.id]=!!f.values[0].selected;
  else{const s=f.values.find(x=>x.selected&&x.enabled!==false);st[f.id]=s?s.id:opts(f)[0].id}});return st}

function price(p,st,q){const fields=p.fields.map(f=>view(f,st)).filter(Boolean);const qf=p.fields.find(f=>f.kind==='qty');q=q??st[qf.id];
  const steps=Object.keys(qf.prices).map(Number).sort((a,b)=>a-b);let k=steps.filter(s=>s<=q).pop()??steps[0];
  let base=qf.prices[k]/k*q,add=0,fixed=0;
  fields.forEach(f=>{const k=kindOf(f),s=st[f.id];if(!k||k==='qty')return;
    const pick=k==='checks'?f.values.filter(v=>s.includes(v.id)):k==='switch'?(s?[f.values[0]]:[]):k==='number'?[]:k==='size'?[f.values.find(v=>v.id===s.v)].filter(Boolean):[f.values.find(v=>v.id===s)].filter(Boolean);
    pick.forEach(v=>{if(v.mult)base*=v.mult;if(v.add)add+=v.add*q;if(v.fixed)fixed+=v.fixed});
    if(k==='number'&&f.add)add+=f.add*s;
    if(k==='size'&&s.v==='custom'&&f.areaRate)base*=Math.max(1,s.w*s.h/(f.baseArea||4500))});
  return base+add+fixed}

function mount(root,p,onChange){
  const st=initState(p);let open=null,qCustom=false,shown=null,fresh=new Set();
const GSM=/\s+(\d+\s?г\u2060?\/\u2060?м²)$/;
const split=v=>{const m=v.title.match(GSM);return m&&!v.comment&&v.title.length>m[0].length?{...v,title:v.title.slice(0,-m[0].length),comment:m[1]}:v};
const dims=t=>{const m=String(t).match(/(\d+(?:[.,]\d+)?)\s*[×xхXХ*]\s*(\d+(?:[.,]\d+)?)/);return m?[+m[1].replace(',','.'),+m[2].replace(',','.')]:null};
function shape(f,v){const d=dims(v.title);if(!d)return '';const all=f.values.map(x=>dims(x.title)).filter(Boolean);if(f.ref)all.push([f.ref.w,f.ref.h]);
  const W=Math.max(...all.filter((a,k)=>!f.ref||k<all.length-1).map(a=>a[0])),H=Math.max(...all.map(a=>a[1])),p=1.5,g=W*.1,VW=W+(f.ref?g+f.ref.w:0);
  return `<span class="cf-sh"><svg viewBox="0 0 ${VW+2*p} ${H+2*p}" aria-hidden="true"><rect class="cf-shc" x="${p}" y="${p+H-d[1]}" width="${d[0]}" height="${d[1]}" rx="1"/>${f.ref?`<rect class="cf-shr" x="${p+W+g}" y="${p+H-f.ref.h}" width="${f.ref.w}" height="${f.ref.h}" rx="${Math.min(3,f.ref.w*.04)}"/>`:''}</svg></span>`}
const side=on=>`<svg viewBox="0 0 90 50" aria-hidden="true"><rect class="cf-shc" x="1" y="1" width="88" height="48" rx="2"/>${on?'<rect class="cf-shi" x="10" y="12" width="30" height="7" rx="1"/><rect class="cf-shi" x="10" y="27" width="50" height="4" rx="1"/><rect class="cf-shi" x="10" y="35" width="40" height="4" rx="1"/>':''}</svg>`;
const isShape=f=>f.shape??(!!f.values&&f.values.length>1&&f.values.every(v=>dims(v.title)));
const sidesOf=(f,v)=>{if(v.sides!=null)return v.sides;if(!/печат|цветност|красочност/i.test(f.title))return 0;const t=v.title+' '+(v.comment||'');return /двух?сторон|с двух сторон/i.test(t)?2:/односторон|с одной стороны/i.test(t)?1:0};
const sides=(f,v)=>{const n=sidesOf(f,v);return n?`<span class="cf-sh">${side(1)}${side(n>1)}</span>`:''};
const tile=(f,v0,on,sub0)=>{const v=split(v0),sub=sub0??v.comment;return `<button type="button" class="cf-o${v.image?' ph':''}${isShape(f)||sidesOf(f,v)?' sh':''}" role="radio" aria-checked="${on}" data-f="${f.id}" data-v="${v.id}">${isShape(f)?shape(f,v):sidesOf(f,v)?sides(f,v):picT(v)}<span>${esc(v.title)}${sub?`<small${/₽/.test(sub)?' class="m"':''}>${sub}</small>`:''}</span>${OK}</button>`};
  const num=(f,val,cls='')=>`<div class="cf-num ${cls}"><button type="button" data-dec="${f.id}" aria-label="Меньше" ${val<= (f.min??1)?'disabled':''}>−</button><label><input type="number" inputmode="numeric" data-n="${f.id}" value="${val}" min="${f.min??1}" ${f.max?`max="${f.max}"`:''} step="${f.step??1}" aria-label="${esc(f.title)}">${f.unit?`<em>${esc(f.unit)}</em>`:''}</label><button type="button" data-inc="${f.id}" aria-label="Больше" ${f.max&&val>=f.max?'disabled':''}>+</button></div>`;
  const lim=f=>f.min!=null&&f.max?`от ${f.min} до ${f.max}`:f.min!=null?`от ${f.min}`:f.max?`до ${f.max}`:'';
  function field(f){const k=kindOf(f),s=st[f.id];if(!k)return '';
    const H=f.help?`<a class="cf-help" href="${esc(f.help.href)}" target="_blank" rel="noopener">${esc(f.help.t)}</a>`:'';
    const RF=isShape(f)&&f.ref?`<span class="cf-refl"><i></i>${esc(f.ref.title)}</span>`:'';
    const L=(extra='')=>`<div class="cf-l">${esc(f.title)}${H||RF||(extra?`<span>${extra}</span>`:'')}</div>`;
    if(k==='tiles'){const o=opts(f);return `<div class="cf-g">${L()}<div class="cf-tiles" data-n="${o.length}" role="radiogroup" aria-label="${esc(f.title)}">${o.map(v=>tile(f,v,v.id===s)).join('')}</div></div>`}
    if(k==='seg'){const o=opts(f),c=o.find(v=>v.id===s)?.comment,any=o.some(v=>v.comment);
      return `<div class="cf-g">${L()}<div class="cf-seg" data-n="${o.length}" data-i="${o.findIndex(v=>v.id===s)}" role="radiogroup" aria-label="${esc(f.title)}"><i class="cf-th" aria-hidden="true"></i>${o.map(v=>`<button type="button" role="radio" aria-checked="${v.id===s}" data-f="${f.id}" data-v="${v.id}"${v.short?` aria-label="${esc(v.title)}"`:''}>${esc(v.short||v.title)}</button>`).join('')}</div>${any&&c?`<p class="cf-hint">${esc(c)}</p>`:''}</div>`}
    if(k==='list'){const v=opts(f).find(x=>x.id===s);const o=open===String(f.id);
      return `<div class="cf-g">${L(vars(opts(f).length))}<div class="cf-sel"><button type="button" class="cf-f" aria-haspopup="listbox" aria-expanded="${o}" data-open="${f.id}">${pic(v)}<span>${esc(v.title)}${v.comment?`<small>${esc(v.comment)}</small>`:''}</span>${CHEV}</button>
        <div class="cf-dim" data-close ${o?'':'hidden'}></div><div class="cf-pop" role="listbox" aria-label="${esc(f.title)}" ${o?'':'hidden'}><div class="cf-hd"><span class="cf-gl" aria-hidden="true"><i></i><i></i><i></i><i></i></span><h3>${esc(f.title)}</h3><button type="button" class="cf-x" data-close aria-label="Закрыть"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div><div class="cf-ls">${opts(f).map(x=>`<button type="button" class="cf-r" role="option" aria-selected="${x.id===s}" data-f="${f.id}" data-v="${x.id}">${pic(x)}<span>${esc(x.title)}${x.comment?`<small>${esc(x.comment)}</small>`:''}</span>${OK}</button>`).join('')}</div></div></div></div>`}
    if(k==='switch'){const v=f.values[0],d=price(p,{...st,[f.id]:true})-price(p,{...st,[f.id]:false});
      return `<div class="cf-g"><button type="button" class="cf-sw" role="switch" aria-checked="${s}" data-sw="${f.id}"><span>${esc(f.title)}${v.comment?`<small>${esc(v.comment)}</small>`:''}</span>${d>0?`<b>+${fmt(d)}</b>`:''}<i></i></button></div>`}
    if(k==='checks'){const full=f.max&&s.length>=f.max;
      return `<div class="cf-g">${L(f.max?`до ${f.max}`:'можно несколько')}<div class="cf-chk" role="group" aria-label="${esc(f.title)}">${f.values.filter(v=>v.enabled!==false).map(v=>{const on=s.includes(v.id);return `<button type="button" class="cf-c" role="checkbox" aria-checked="${on}" data-c="${f.id}" data-v="${v.id}" ${full&&!on?'disabled':''}><i></i><span>${esc(v.title)}${v.comment?`<small>${esc(v.comment)}</small>`:''}</span></button>`}).join('')}</div></div>`}
    if(k==='number')return `<div class="cf-g">${L(lim(f))}${num(f,s)}</div>`;
    if(k==='qty'){const custom=qCustom||!f.tiles.includes(s);
      return `<div class="cf-g">${L(p.unit==='шт'?'':esc(p.unit))}<div class="cf-qty" role="radiogroup" aria-label="${esc(f.title)}">${f.tiles.map(n=>tile(f,{id:n,title:String(n)},n===s,per(price(p,st,n)/n)+'/'+p.unit)).join('')}${tile(f,{id:'custom',title:'Другой'},custom,custom?String(s):'')}</div>
        ${custom?`<div class="cf-sub${fresh.has('sub')?' cf-in':''}">${num({...f,title:'Тираж'},s)}<p class="cf-hint">${lim(f)}${f.step>1?`, шаг ${f.step}`:''}</p></div>`:''}</div>`}
    if(k==='size'){const c=s.v==='custom';
      return `<div class="cf-g">${L()}<div class="cf-tiles" data-n="${f.values.length+1}" role="radiogroup" aria-label="${esc(f.title)}">${[...f.values,{id:'custom',title:'Свой размер'}].map(v=>tile(f,v,v.id===s.v)).join('')}</div>
        ${c?`<div class="cf-sub cf-wh${fresh.has('sub')?' cf-in':''}">${num({id:f.id+'.w',title:'Ширина',unit:'мм',min:f.minW,max:f.maxW},s.w)}<span>×</span>${num({id:f.id+'.h',title:'Высота',unit:'мм',min:f.minH,max:f.maxH},s.h)}</div><p class="cf-hint">Ширина от ${f.minW} до ${f.maxW} мм, высота от ${f.minH} до ${f.maxH} мм</p>`:''}</div>`}
    if(k==='term'){const vs=f.values.filter(v=>v.enabled!==false);if(vs.length<2)return '';
      return `<div class="cf-g">${L()}<div class="cf-tiles" data-n="${vs.length}" role="radiogroup" aria-label="${esc(f.title)}">${vs.map(v=>{
        return tile(f,{id:v.id,title:v.hours||v.days?(v.mult?'Срочно':'Обычно'):v.title},v.id===s,[termSub(v),v.mult>1?'цена ×'+String(v.mult).replace('.',','):''].filter(Boolean).join(', '))}).join('')}</div></div>`}
    return ''}
  const approval=()=>p.fields.some(f=>f.values&&!f.kind&&f.values.some(v=>v.approval&&(Array.isArray(st[f.id])?st[f.id].includes(v.id):st[f.id]===v.id)));
  function result(){const qf=p.fields.find(f=>f.kind==='qty'),t=p.fields.find(f=>f.kind==='term');
    const tv=t&&(t.values.find(v=>v.id===st[t.id])||t.values[0]);
    const ready=!tv?'':tv.hours||tv.days?'Печать '+termSub(tv)+' после оплаты':'Срок: '+tv.title;
    const readySub=approval()?'оплата после согласования макета с дизайнером':'оплата после подтверждения заказа менеджером';
    if(!qf)return {st,ready,readySub};const q=st[qf.id];
    const full=price(p,st),fin=full*(1-(p.online||0));return {st,q,full,fin,per:fin/q,ready,readySub,fmt,per1:per}}
  function fix(){p.fields.forEach(f=>{const v=view(f,st),k=v&&kindOf(v);if(!k||!['tiles','list','seg'].includes(k))return;const o=opts(v);if(!o.some(x=>x.id===st[f.id]))st[f.id]=(o.find(x=>x.selected)||o[0]).id})}
  function leave(){if(!shown||matchMedia('(prefers-reduced-motion:reduce)').matches)return false;fix();
    const vis=p.fields.map(f=>view(f,st)).filter(Boolean),t=new Set(vis.map(f=>f.title));
    const gone=[...shown].filter(id=>!vis.some(f=>f.id===id)&&!t.has(F(id)?.title)).map(id=>root.querySelector(`.cf-g[data-id="${id}"]`)).filter(Boolean);
    if(!gone.length)return false;gone.forEach(g=>g.classList.add('cf-out'));setTimeout(render,300);return true}
  function render(){fix();const vis=p.fields.map(f=>view(f,st)).filter(Boolean);
    const dep=f=>f.when?.f??(f.values?.length&&f.values.every(v=>v.when&&v.when.f===f.values[0].when?.f)?f.values[0].when.f:null);
    const par=new Set(p.fields.map(dep).filter(id=>id!=null&&!F(id)?.kind));
    const out=[];vis.forEach(f=>{let h=field(f);if(!h)return;const d=dep(p.fields.find(x=>x.id===f.id));const c=[d!=null&&'cf-dep',shown&&!shown.has(f.id)&&'cf-in'].filter(Boolean).join(' ');h=h.replace('<div class="cf-g"',`<div data-id="${f.id}" class="cf-g${c?' '+c:''}"`);
      const prev=out.at(-1);if(d!=null&&prev&&prev.ids.includes(d)){prev.h+=h;prev.ids.push(f.id)}else out.push({h,ids:[f.id],grp:par.has(f.id)})});
    root.innerHTML=`<div class="cf">${out.map(o=>o.grp?`<div class="cf-grp">${o.h}</div>`:o.h).join('')}</div>`;
    shown=new Set(vis.map(f=>f.id));fresh.clear();onChange&&onChange(result())}
  function closePop(then){const pop=root.querySelector('.cf-pop:not([hidden])');if(!pop||matchMedia('(prefers-reduced-motion:reduce)').matches){open=null;then();return}
    pop.classList.add('out');pop.previousElementSibling.classList.add('out');pop.parentElement.querySelector('.cf-f').setAttribute('aria-expanded','false');
    setTimeout(()=>{open=null;then()},200)}
  const clamp=(f,n)=>{n=Math.round(+n||0);if(f.min!=null)n=Math.max(f.min,n);if(f.max)n=Math.min(f.max,n);if(f.step>1)n=Math.ceil(n/f.step)*f.step;return n};
  const F=id=>p.fields.find(f=>String(f.id)===String(id));
  function setNum(key,val){const [id,wh]=String(key).split('.');const f=F(id);
    if(wh){st[f.id]={...st[f.id],[wh]:clamp({min:wh==='w'?f.minW:f.minH,max:wh==='w'?f.maxW:f.maxH},val)}}else st[f.id]=clamp(f,val);render()}
  root.addEventListener('click',e=>{const b=e.target.closest('button,[data-close]');if(!b)return;const d=b.dataset;
    if('close' in d){closePop(render);return}
    if(d.open){if(open===d.open){closePop(render);return}open=d.open;render();if(open)root.querySelector(`[data-open="${open}"]`).parentElement.querySelector('[aria-selected="true"]')?.focus({focusVisible:e.detail===0});return}
    const later=()=>matchMedia('(prefers-reduced-motion:reduce)').matches?render():setTimeout(render,280);
    if(d.sw){st[d.sw]=!st[d.sw];b.setAttribute('aria-checked',st[d.sw]);later();return}
    if(d.c){const s=st[d.c],v=isNaN(d.v)?d.v:+d.v;st[d.c]=s.includes(v)?s.filter(x=>x!==v):[...s,v];b.setAttribute('aria-checked',st[d.c].includes(v));later();return}
    if(d.dec||d.inc){const key=d.dec||d.inc,inp=root.querySelector(`[data-n="${key}"]`);const f=F(key.split('.')[0]);const step=key.includes('.')?1:(f.step||1);setNum(key,+inp.value+(d.inc?step:-step));return}
    if(d.f&&b.parentElement.classList.contains('cf-seg')){const sg=b.parentElement,v=isNaN(d.v)?d.v:+d.v;if(st[d.f]===v)return;st[d.f]=v;
      sg.dataset.i=[...sg.querySelectorAll('button')].indexOf(b);sg.querySelectorAll('button').forEach(x=>x.setAttribute('aria-checked',x===b));if(!leave())later();return}
    if(d.f){const f=view(F(d.f),st),k=kindOf(f),v=d.v==='custom'||d.v===NONE||isNaN(d.v)?d.v:+d.v;
      if(k==='qty'){if(v==='custom'&&!qCustom)fresh.add('sub');qCustom=v==='custom';if(!qCustom)st[f.id]=v}
      else if(k==='size'){if(v==='custom'&&st[f.id].v!=='custom')fresh.add('sub');st[f.id]={...st[f.id],v}}
      else st[f.id]=v;
      if(k!=='list'&&leave())return;
      if(k==='list'){root.querySelectorAll(`.cf-r[data-f="${f.id}"]`).forEach(r=>r.setAttribute('aria-selected',r===b));closePop(()=>{render();root.querySelector(`[data-open="${f.id}"]`)?.focus()});return}
      render()}});
  root.addEventListener('change',e=>{const n=e.target.dataset.n;if(n)setNum(n,e.target.value)});
  root.addEventListener('scroll',e=>{const l=e.target;if(l.classList?.contains('cf-ls'))l.parentElement.classList.toggle('sc',l.scrollTop>4)},true);
  root.addEventListener('keydown',e=>{if(e.key==='Escape'&&open){const o=open;closePop(()=>{render();root.querySelector(`[data-open="${o}"]`)?.focus()})}});
  root.addEventListener('animationend',e=>{if(e.target.classList.contains('cf-g'))e.target.classList.remove('cf-in')});
  render();return {state:st,result,render}
}
window.Calc={mount,kindOf,fmt};
})();
