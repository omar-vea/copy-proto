
(()=>{
const G={
promo:`
  <div class="promo">
    <div class="ht" data-ht="corner" data-color="#4844D7" data-op=".55" data-step="12"></div>
    <div class="l">
      <h3><a class="sh-link" href="catalog/pechat-kalendarej/">Календари и подарки <br>с&nbsp;<span class="tl-nw">логотипом<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></span></a></h3>
      <p>Квартальные, настольные, перекидные. Корпоративные наборы для команды и&nbsp;клиентов.</p>
    </div>
    <div class="r"><img src="img/promo-calendars.webp?v=2" width="820" height="650" alt="" loading="lazy" decoding="async"></div>
  </div>
`,
eco:`
  <div class="sh"><div><h2 class="h-eco">Больше, чем копицентр</h2></div></div>
  <nav class="eco-t v-bento" aria-label="Сервисы COPY.RU">
    <a class="tl tl-w" href="catalog/suveniry/"><b>Фото или рисунок <span class="tl-nw">в&nbsp;любимые&nbsp;вещи<svg class="tl-go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></span></b><span class="tl-s">ИИ сделает из него макет для печати</span><span class="badge b-ok b-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>Макет 0 ₽</span><span class="tl-ba"><img src="img/eco-ai.webp?v=8" width="570" height="450" alt="Рисунок ребёнка и футболка с этим рисунком" loading="lazy" decoding="async"></span></a>
    <div class="eco-r"><a class="tl" href="catalog/korporativnye-suveniry/"><b>Сувениры и мерч с&nbsp;вашим <span class="tl-nw">логотипом<svg class="tl-go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></span></b><span class="tl-s">Для команды и&nbsp;клиентов</span><span class="tl-v"><img src="img/eco-gifts.webp?v=5" width="480" height="480" alt="" loading="lazy" decoding="async"></span></a>
    <a class="tl" href="#"><b>Интеграции <span class="tl-nw">и&nbsp;API<svg class="tl-go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></span></b><span class="tl-s">Печать для своего сайта</span><span class="tl-v"><img src="img/eco-api.webp?v=4" width="480" height="480" alt="" loading="lazy" decoding="async"></span></a>
    <a class="tl" href="#"><b>Для <span class="tl-nw">бизнеса<svg class="tl-go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></span></b><span class="tl-s">Договор и НДС</span><span class="badge b-ok">До −15%</span><span class="tl-v"><img src="img/eco-b2b.webp?v=2" width="480" height="480" alt="" loading="lazy" decoding="async"></span></a>
    <a class="tl" href="#"><b>PRO-<span class="tl-nw">калькулятор<svg class="tl-go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></span></b><span class="tl-s">Для агентств и&nbsp;дизайнеров</span><span class="tl-v"><img src="img/eco-pro.webp?v=3" width="480" height="480" alt="" loading="lazy" decoding="async"></span></a></div>
    <a class="tl tl-club" href="club/"><b>Клуб <span class="tl-nw">привилегий<svg class="tl-go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></span></b><span class="tl-s">Оплачивайте бонусами до&nbsp;15% заказа</span><span class="badge b-ok">1&nbsp;000&nbsp;₽ за&nbsp;регистрацию</span><span class="tl-v"><img src="img/club.webp?v=2" width="480" height="480" alt="" loading="lazy" decoding="async"></span></a>
  </nav>
`
};
const CH='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
E=x=>String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
document.querySelectorAll('section[data-posts]').forEach(x=>{const k=x.dataset.posts||location.pathname.split('/').filter(Boolean).pop(),L=(window.COPY_POSTS||{})[k];if(!L||!L.length)return x.remove();
  x.innerHTML=`<div class="wrap"><div class="sh"><div><h2><a class="sh-link" href="blog/">Статьи${CH}</a></h2></div></div><div class="blog">${L.map(([t,u,m,v,c,x])=>COPY_POST({t,u,c,m,v,x})).join('')}</div></div>`});
document.querySelectorAll('section[data-g]').forEach(x=>{const h=G[x.dataset.g];if(!h)return x.remove();if(x.dataset.g==='promo')x.id='promo';x.innerHTML='<div class="wrap">'+h+'</div>'});
})();
function halftone(el){const r=el.getBoundingClientRect(),w=Math.max(1,r.width),h=Math.max(1,r.height),step=+el.dataset.step||14,mode=el.dataset.ht,col=el.dataset.color,op=el.dataset.op;let c='';for(let y=step/2;y<h+step;y+=step)for(let x=step/2;x<w+step;x+=step){let t;if(mode==='lr')t=x/w;else if(mode==='bottom')t=Math.pow(y/h,1.6);else{const dx=(x-w)/w,dy=(y-h)/h;t=1-Math.min(1,Math.hypot(dx*1.1,dy*1.4))}t=Math.max(0,Math.min(1,t));const rad=step*.5*Math.pow(t,1.15);if(rad>.35)c+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(2)}"/>`}el.innerHTML=`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><g fill="${col}" fill-opacity="${op}">${c}</g></svg>`}
window.draw=()=>document.querySelectorAll('[data-ht]').forEach(halftone);window.draw();addEventListener('resize',()=>{clearTimeout(window._t);window._t=setTimeout(window.draw,150)});

addEventListener('copy:theme',()=>window.draw&&draw());

window.copyTpl=(w,h)=>{const n=document.getElementById('tplN');if(n)n.textContent=`${w} × ${h} мм, вылеты 3 мм и безопасная зона уже размечены`};
document.querySelectorAll('.deck').forEach(d=>{const s=d.querySelector('.deck-s'),N=s.children.length,dots=d.querySelector('.deck-dots'),[pv,nx]=d.querySelectorAll('.deck-a button');
  dots.innerHTML=Array.from({length:N},(_,i)=>`<button type="button" aria-label="Слайд ${i+1} из ${N}"></button>`).join('');
  const st=()=>N>1?s.children[1].offsetLeft-s.children[0].offsetLeft:s.clientWidth,at=()=>s.scrollLeft>=s.scrollWidth-s.clientWidth-2?N-1:Math.round(s.scrollLeft/st()),
  upd=()=>{const k=at();[...dots.children].forEach((b,i)=>b.toggleAttribute('aria-current',i===k));pv.disabled=k===0;nx.disabled=k===N-1},go=k=>s.scrollTo({left:k*st(),behavior:'smooth'});
  s.addEventListener('scroll',()=>requestAnimationFrame(upd),{passive:true});dots.onclick=e=>{const b=e.target.closest('button');if(b)go([...dots.children].indexOf(b))};
  pv.onclick=()=>go(at()-1);nx.onclick=()=>go(at()+1);upd()});
