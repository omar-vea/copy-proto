
document.querySelectorAll('.ar-tw').forEach(w=>{const f=()=>w.classList.toggle('more',w.scrollLeft+w.clientWidth<w.scrollWidth-4);f();w.addEventListener('scroll',f,{passive:true});addEventListener('resize',f)});
{const H=[...document.querySelectorAll('.ar h2')],T=document.getElementById('toc');if(H.length>2){H.forEach((h,i)=>h.id||(h.id='s'+(i+1)));T.querySelector('ul').innerHTML=H.map(h=>`<li><a href="${location.pathname}#${h.id}">${h.textContent}</a></li>`).join('');T.hidden=false}else{T.remove();document.getElementById('trD').remove();document.getElementById('trDim').remove()}}
