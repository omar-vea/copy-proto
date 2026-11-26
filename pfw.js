
(()=>{const d=document.getElementById('pfD');if(!d||!d.showModal)return;const s=document.getElementById('pfS'),n=document.getElementById('pfN');let k=0,N=0;
const prep=(P,t,pg)=>{d.dataset.tone=t||'l';s.insertAdjacentHTML('afterbegin',`<img class="pf-mir" src="${P[0]}" alt="" aria-hidden="true">`);s.insertAdjacentHTML('beforeend',`<img class="pf-mir pf-mir-b" src="${P.at(-1)}" alt="" aria-hidden="true">`);
  const l=document.getElementById('pfPg');l.hidden=!pg;if(pg)l.href=pg;requestAnimationFrame(()=>{d.style.setProperty('--pf-hd',d.querySelector('.pf-hd').offsetHeight+'px');d.style.setProperty('--pf-bt',d.querySelector('.pf-bot').offsetHeight+'px');d.querySelector('.pf-w').scrollTop=0})};
const st=()=>s.children.length>1?s.children[1].offsetLeft-s.children[0].offsetLeft:s.clientWidth,
at=()=>Math.round(s.scrollLeft/st()),upd=()=>{if(n.childElementCount!==N)n.innerHTML=N>1?Array.from({length:N},(_,i)=>`<button type="button" data-i="${i}" aria-label="Фото ${i+1}"></button>`).join(''):'';[...n.children].forEach((b,i)=>b.toggleAttribute('aria-current',i===at()));};
s.addEventListener('scroll',()=>requestAnimationFrame(upd),{passive:true});
document.querySelectorAll('.pf-i').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const ph=a.dataset.ph.split(' ');N=ph.length;
  s.innerHTML=ph.map((u,i)=>`<img src="${u}" alt="${a.querySelector('b').textContent}, фото ${i+1}" decoding="async">`).join('');
  document.getElementById('pfT').textContent=a.querySelector('b').textContent;document.getElementById('pfK').textContent=a.querySelector('span').textContent;
  document.getElementById('pfGo').href='fast-order.html?need='+encodeURIComponent((a.closest('[data-need]')?.dataset.need||'Как в портфолио')+': '+a.querySelector('b').textContent+' ('+a.querySelector('span').textContent.toLowerCase()+'). Тираж: ');
  document.getElementById('pfK').hidden=true;prep(ph,a.dataset.tt,a.getAttribute('href'));d.querySelectorAll('.pf-a').forEach(b=>b.hidden=N<2);d.showModal();d.focus({preventScroll:true});s.scrollLeft=0;upd()}));
const go=document.getElementById('pfGo'),goH=go.outerHTML;
document.addEventListener('calc:zoom',e=>{const z=e.detail;N=1;s.innerHTML=`<img src="${z.src}" alt="${z.title}" decoding="async">`;
  document.getElementById('pfT').textContent=z.title;document.getElementById('pfK').textContent=z.text;
  const b=document.createElement('button');b.type='button';b.className='btn btn-p';b.id='pfGo';b.textContent='Выбрать';b.onclick=()=>{z.pick();shut()};b.hidden=!z.pick;
  document.getElementById('pfGo').replaceWith(b);document.getElementById('pfK').hidden=!z.text;prep([z.src],'l');d.querySelectorAll('.pf-a').forEach(b=>b.hidden=true);d.showModal();d.focus({preventScroll:true});upd()});
d.addEventListener('close',()=>{const g=document.getElementById('pfGo');if(g.tagName==='BUTTON')g.outerHTML=goH});
const shut=()=>{if(d.classList.contains('out'))return;d.classList.add('out');const end=()=>{d.classList.remove('out');d.close()};if(matchMedia('(prefers-reduced-motion:reduce)').matches)return end();const f=e=>{if(e.target!==d)return;d.removeEventListener('animationend',f);end()};d.addEventListener('animationend',f);setTimeout(()=>{if(d.classList.contains('out')){d.removeEventListener('animationend',f);end()}},400)};
d.addEventListener('cancel',e=>{e.preventDefault();shut()});
n.addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(b)s.scrollTo({left:b.dataset.i*st(),behavior:'smooth'})});
d.addEventListener('click',e=>{if(e.target===d||e.target.closest('[data-x]'))return shut();const b=e.target.closest('.pf-a');if(b)s.scrollTo({left:(at()+ +b.dataset.d)*st(),behavior:'smooth'})});
d.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();s.scrollTo({left:(at()+(e.key==='ArrowRight'?1:-1))*st(),behavior:'smooth'})}});
})();
