
window.COPY_PAGER=(G,o)=>{
  const SV=d=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`,AL='m15 18-6-6 6-6',AR='m9 18 6-6-6-6',DL='m11 17-5-5 5-5M18 17l-5-5 5-5',DR='m6 17 5-5-5-5M13 17l5-5-5-5';
  const R=()=>innerWidth>980?2:innerWidth>=375?1:0;
  let t=1,p=1,last=1,V=0;
  const draw=()=>{const r=R(),cur=k=>k>=p&&k<=last;
    let c=V||Math.round((p+last)/2);c=Math.min(Math.max(c,2+r),t-1-r);V=c;
    const a=Math.max(2,c-r),b=Math.min(t-1,c+r),num=k=>`<li><a href="${o.url(k)}" data-k="${k}"${cur(k)?' aria-current="page"':''}>${k}</a></li>`,
      gap=(x,y,d)=>y<x?'':y===x?num(x):`<li><button type="button" class="pg-x" data-s="${d}" aria-label="Показать страницы ${d<0?Math.max(2,y-2*r):x}–${d<0?y:Math.min(t-1,x+2*r)}"><i aria-hidden="true">…</i>${SV(d<0?DL:DR)}</button></li>`,
      arr=(k,ok,d,l)=>`<li><a class="pg-a${ok?'':' pg-off'}" href="${ok?o.url(k):'#'}" data-k="${k}" aria-label="${l}"${ok?'':' aria-hidden="true" tabindex="-1"'}>${SV(d)}</a></li>`;
    let h=arr(p-1,p>1,AL,'Предыдущая страница')+num(1);
    if(t>2){h+=gap(2,a-1,-1);for(let k=a;k<=b;k++)h+=num(k);h+=gap(b+1,t-1,1)}
    G.innerHTML=t>1?h+num(t)+arr(last+1,last<t,AR,'Следующая страница'):''};
  G.addEventListener('click',e=>{const x=e.target.closest('.pg-x');
    if(x){const d=+x.dataset.s;V+=d*(2*R()+1);draw();(G.querySelector(`.pg-x[data-s="${d}"]`)||G.querySelector(d<0?'li:nth-child(3) a':'li:nth-last-child(3) a'))?.focus();return}
    const a=e.target.closest('a');if(!a||e.metaKey||e.ctrlKey||a.classList.contains('pg-off'))return e.target.closest('.pg-off')&&e.preventDefault();
    e.preventDefault();o.go(+a.dataset.k)});
  let r0=R();addEventListener('resize',()=>{if(R()!==r0){r0=R();V=0;draw()}});
  return {set(T,P,L){t=T;p=P;last=L;V=0;draw()}};
};
