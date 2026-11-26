
if(document.querySelector('.tr-nav')){const R=document.documentElement,nav=document.querySelector('.tr-nav'),L=[...nav.querySelectorAll('ul a')],S=L.map(a=>document.getElementById(a.hash.slice(1))),
  cur=document.getElementById('trCur'),T0=document.getElementById('trCur').textContent,btn=nav.querySelector('.tr-cur'),D=document.getElementById('trD'),
  hb=()=>parseFloat(getComputedStyle(R).getPropertyValue('--hb'))||document.querySelector('.hdr').getBoundingClientRect().bottom;
let c=null;
const on=()=>{const mob=btn.offsetParent!==null,line=mob?hb()+120:160;let k=null;S.forEach(s=>{if(s.getBoundingClientRect().top<line)k=s});
  const r=nav.getBoundingClientRect(),H=hb(),gb=nav.parentElement.getBoundingClientRect().bottom,cl=v=>Math.max(0,Math.min(r.height,v)),
    x=!mob?0:gb<H+r.height?cl(gb-H):cl(H+r.height-r.top);R.style.setProperty('--hx',Math.round(x)+'px');
  if(k===c)return;c=k;L.forEach(a=>a.toggleAttribute('aria-current',!!k&&a.hash==='#'+k.id));cur.textContent=k?L[S.indexOf(k)].textContent:T0};
addEventListener('scroll',()=>requestAnimationFrame(on),{passive:true});addEventListener('resize',on);on();
nav.addEventListener('transitionend',on);
const dim=document.getElementById('trDim'),LS=D.querySelector('.cf-ls'),
  ok='<svg class="cf-ok" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
const shut=then=>{btn.setAttribute('aria-expanded','false');const end=()=>{D.hidden=dim.hidden=true;D.classList.remove('out','sc');dim.classList.remove('out');then&&then()};
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return end();D.classList.add('out');dim.classList.add('out');setTimeout(end,200)};
btn.addEventListener('click',()=>{LS.innerHTML=L.map(a=>`<button type="button" class="cf-r" role="option" aria-selected="${a.hasAttribute('aria-current')}" data-h="${a.hash}"><span>${a.textContent}</span>${ok}</button>`).join('');
  D.hidden=dim.hidden=false;btn.setAttribute('aria-expanded','true');LS.querySelector('[aria-selected="true"]')?.scrollIntoView({block:'nearest'});LS.scrollTop>4&&D.classList.add('sc')});
dim.addEventListener('click',()=>shut());
D.addEventListener('click',e=>{if(e.target.closest('[data-close]'))return shut();const r=e.target.closest('.cf-r');if(!r)return;const h=r.dataset.h;
  LS.querySelectorAll('.cf-r').forEach(x=>x.setAttribute('aria-selected',x===r));
  shut(()=>{history.replaceState(null,'',location.pathname+location.search+h);document.getElementById(h.slice(1)).scrollIntoView()})});
LS.addEventListener('scroll',()=>D.classList.toggle('sc',LS.scrollTop>4),{passive:true});
addEventListener('keydown',e=>{if(e.key==='Escape'&&!D.hidden){shut();btn.focus()}})}
