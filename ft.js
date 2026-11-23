(()=>{
const ext='<svg class="f-ext" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const li=(h,t)=>`<li><a href="${h}">${t}</a></li>`;
const col=(n,items)=>`<nav aria-label="${n}"><b>${n}</b><ul>${items.join('')}</ul></nav>`;
document.currentScript.insertAdjacentHTML('beforebegin',`<footer><div class="wrap">
<div class="f-cols">
  ${col('Заказ',[li('catalog.html','Каталог'),li('home.html#status','Статус заказа'),li('https://copy.ru/payment-delivery/','Оплата и доставка'),li('technical-requirements/','Требования к макетам')])}
  ${col('Компания',[li('#','О нас'),li('contacts/','Копицентры'),li('#','Вакансии'),li('franchise/','Франшиза')])}
  ${col('Сервисы',[['ai','Нейродизайн'],['gifts','Сувениры'],['pro','Дизайнерам'],['b2b','Бизнесу'],['bridge','Разработчикам']].map(([d,t])=>li(`https://${d}.copy.ru/`,t+ext)))}
  ${col('Связь',['<li><a data-ct="tel" href="tel:+74951561000"><span data-ct="tel-t">+7 495 156-10-00</span></a></li>','<li><a data-ct="mail" href="mailto:zakaz@copy.ru"><span data-ct="mail-t">zakaz@copy.ru</span></a></li>',li('https://vk.com/copyru','ВКонтакте'),li('https://t.me/copyru','Telegram-канал')])}
</div>
<div class="f-app">
  <a href="https://apps.apple.com/ru/app/copy-ru/id6764291912"><img src="img/badge-appstore.svg?v=1" width="120" height="40" alt="Загрузите в App Store" loading="lazy"></a>
  <a href="https://play.google.com/store/apps/details?id=com.copyru.loyaltyapp"><img src="img/badge-gplay.webp?v=1" width="135" height="40" alt="Доступно в Google Play" loading="lazy"></a>
</div>
<div class="f-legal">
  <nav class="f-docs" aria-label="Документы">
    <a href="https://copy.ru/terms/">Публичная оферта</a>
    <a href="https://copy.ru/vozvrat/">Возврат и претензии</a>
    <a href="https://copy.ru/politika-konfidenczialnosti/">Политика обработки персональных данных</a>
    <a href="https://copy.ru/soglasie-na-obrabotku-personalnyh-dannyh/">Согласие на обработку персональных данных</a>
    <a href="https://copy.ru/polozhenie-ob-obrabotke-fajlov-cookies/">Файлы cookie</a>
    <a href="https://copy.ru/rekomendatelnye-tehnologii/">Рекомендательные технологии</a>
  </nav>
  <div class="f-req">
    <p><span>© 2012–2026 COPY.RU</span><span>ООО «ДЖЕНЕРАЛ МЕНЕДЖМЕНТ КОПИ.РУ»</span><span><span class="f-nw">ИНН 7707283363</span> · <span class="f-nw">ОГРН 1027739654469</span></span><span>109428, Москва, Рязанский пр-кт, <span class="f-nw">д. 10, стр. 18, оф. 8.3/866, пом. 10/8</span></span></p>
    <span>Разработка сайта: vea</span>
  </div>
</div>
</div></footer>`);
})();
