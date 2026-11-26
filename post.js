
(()=>{const E=x=>String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'),
 S=(d,l)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${l?`role="img" aria-label="${l}"`:'aria-hidden="true"'}>${d}</svg>`,
 CH=S('<path d="m9 18 6-6-6-6"/>'),
 RI={'FAQ':'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  'Оформление заказов':'<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
  'Для бизнеса':'<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
  'Материалы':'<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m2 12 8.58 3.91a2 2 0 0 0 1.65 0L21 12"/><path d="m2 17 8.58 3.91a2 2 0 0 0 1.65 0L21 17"/>',
  'Технологии':'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  'Печать':'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
  'Препресс':'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/>',
  'Услуги':'<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  'Лайфхаки':'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  'Приглашения':'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  'Свадебные приглашения':'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  'Визитки':'<rect width="20" height="14" x="2" y="5" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M13 10h5M13 14h5"/>',
  'Новости':'<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  'Дизайн':'<path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"/><path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"/><path d="m2.3 2.3 7.286 7.286"/><circle cx="11" cy="11" r="2"/>'},
 RD='<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
 pl=n=>n%10===1&&n%100!==11?'просмотр':n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?'просмотра':'просмотров',
 ok=window.COPY_RUBOK=c=>!!c&&c!=='Без категории'&&c!=='Все';
 const META=window.COPY_META=(m,v)=>(m?`<span class="mi">${S('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>','Время чтения')}${m} мин</span>`:'')+(v?`<span class="mi" title="${v} ${pl(v)}">${S('<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>','Просмотры')}${v.toLocaleString('ru-RU')}</span>`:'');
 window.COPY_RICON=c=>S(RI[c]||RD);
 window.COPY_POST=(p,o={})=>{const h=o.h||'h3',i=p.t.lastIndexOf(' ')+1;
  const r=ok(p.c)?p.c:'Другое';
  return `<a class="post" href="${E(p.u)}"><span class="post-i" title="${E(r)}">${S(RI[p.c]||RD,E(r))}</span><span class="post-b"><${h}>${E(p.t.slice(0,i))}<span class="tl-nw">${E(p.t.slice(i))}${CH}</span></${h}>${p.x?`<span class="x">${E(p.x)}</span>`:''}<span class="k">${p.d?`<span class="mi">${S('<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>','Дата')}${E(p.d)}</span>`:''}${META(p.m,p.v)}</span></span></a>`};
})();
