/* Общий скрипт сайта: язык RU/UA, аналитика, меню, модалка допродажи, кабинет-демо */
const WEBHOOK = "https://script.google.com/macros/s/AKfycbwMvQxzlnc-T01Kk_Ynby0bYBTobC7v_TD0UBe78W0cTe7qoIsgXLCEjj8COL_9DoIwsQ/exec";
const BOT_URL = "https://t.me/dr_chernyshova_bot";
const PAY = {
  trial: "https://secure.wayforpay.com/button/b1dfd9c78fe33",
  base: "https://secure.wayforpay.com/button/b14ba4175039e",
  full: "https://secure.wayforpay.com/button/b3df5a30271ea",
  ferritin: "https://secure.wayforpay.com/button/b55749e6e1ec8",
  social: "https://secure.wayforpay.com/button/b4af6c7878dfb",
  fascia: "https://secure.wayforpay.com/button/bfdbad490d98f",
  book: "https://secure.wayforpay.com/button/bcaafaf774eaa",
};

let lang = new URLSearchParams(location.search).get("lang") === "ua" ? "ua" : "ru";

function track(event, source) {
  try {
    fetch(WEBHOOK, {
      method: "POST", mode: "no-cors",
      body: JSON.stringify({
        timestamp: new Date().toISOString(), record: "event", event: event,
        telegram_id: 0, telegram_username: "", lang: lang, direction: "b2c",
        source: source || "site",
      }),
    }).catch(function () {});
  } catch (e) {}
}
function openPay(url, id) { track("site_pay_" + id); window.open(url, "_blank", "noopener"); }

/* ── UA-словарь (общий на все страницы; ru — в разметке) ── */
const UA = {
  nav_courses: "Курси", nav_about: "Про мене", nav_cabinet: "Кабінет", nav_contacts: "Контакти",
  nav_buy: "Купити курс",
  brand_sub: "лікар anti-age медицини",
  /* Головна */
  h_eyebrow: "Лікар-невролог · косметолог · 20 років практики",
  h_h1: 'Аналізи <em class="acc">не брешуть</em>',
  h_lead: "Я — Тетяна Чернишова. Допомагаю жінкам 35+ повернути енергію, сон і шкіру — працюючи з причинами за аналізами, а не із симптомами окремо.",
  h_cta1: "Курс «Молодість зсередини»",
  h_cta2: "Безкоштовний тест на дефіцити",
  mq1: "Аналізи не брешуть", mq2: "Тіло подає сигнал", mq3: "Це не вирок. Це сигнал", mq4: "Ті, хто чує вчасно — виграють роки",
  b_eyebrow: "Знайома історія",
  b_h2: '«Все в нормі», — каже лікар. <em class="acc">А сил немає</em>',
  b_head: "Результати досліджень · приклад із практики",
  b_r1: "Феритин", b_ref1: "реф. 13–150 нг/мл",
  b_r2: "Вітамін D", b_ref2: "реф. 30–100 нг/мл",
  b_r3: "ТТГ", b_ref3: "реф. 0.4–4.0 мМО/л",
  b_p1: "Формально — у межах. Феритин 18 при референсі «від 13» лабораторія не підкреслить. Але втома із самого ранку, волосся на гребінці й тьмяна шкіра — це не характер і не «просто вік». Це тіло подає сигнал.",
  b_p2: "Різниця між «нормою лабораторії» та станом, у якому тіло відновлюється, — величезна. Я працюю з другим.",
  fc_eyebrow: "Мій головний курс",
  fc_h2: "Молодість зсередини: <em class=\"acc\">30 днів</em>",
  fc_p: "30 уроків — один на день. Сон, дихання, харчування, догляд: протоколи з моєї клінічної практики. Не детокс. Не марафон.",
  fc_price: "від €10",
  ch1: "Сон", ch2: "Дихання", ch3: "Харчування", ch4: "Догляд",
  fc_btn: "Дивитися курс і тарифи",
  cabt_eyebrow: "Після покупки",
  cabt_h2: "У вас з'явиться <em class=\"acc\">кабінет</em>",
  cabt_p: "Прогрес за днями, урок дня і практика — все в одному місці. Подивіться, як він влаштований, ще до покупки.",
  cabt_btn: "Зазирнути в кабінет",
  ab_eyebrow: "Хто я",
  ab_h2: "Невролог і косметолог <em class=\"acc\">в одній особі</em>",
  ab_p: "Шкіра, енергія, сон і гормони — одна система. Я збираю картину цілком і шукаю причину, а не глушу симптоми.",
  ab_btn: "Про мене",
  faq_h2: "Часті запитання",
  faq1_q: "Як я отримаю курс після оплати?",
  faq1_a: "Доступ приходить у Telegram. Якщо після оплати щось не прийшло — напишіть у бот, розберемося того ж дня.",
  faq2_q: "Як проходить оплата?",
  faq2_a: "Банківською карткою через захищену сторінку WayForPay. Дані картки бачить лише платіжна система.",
  faq3_q: "Я не в Україні — чи можу купити?",
  faq3_a: "Оплата — банківською карткою через WayForPay. Якщо картка з вашої країни не проходить — напишіть у бот, підберемо спосіб.",
  faq4_q: "Залишилися запитання?",
  faq4_a: "Напишіть у бот — я або моя команда відповімо.",
  f_note: "Оплата проходить через захищену сторінку WayForPay. Курси не замінюють консультацію вашого лікаря.",
  f_nav: "Розділи", f_soc: "Соцмережі",
  /* Курси */
  c_eyebrow: "Курси",
  c_h1: 'Обрати <em class="acc">свій</em> курс',
  c_lead: "Головний курс — «Молодість зсередини: 30 днів». Точкові програми — нижче: кожна закриває одну тему до кінця.",
  c_fl_h2: "Молодість зсередини: 30 днів",
  c_fl_p: "30 уроків — один на день. Сон, дихання, харчування, догляд: протоколи з моєї клінічної практики, зібрані в систему. Уроки відкриваються по одному на день — від вашої дати старту.",
  c_t1: "Пробний", c_t1_d: "7 днів",
  c_t1_f1: "7 перших уроків", c_t1_f2: "подивіться формат, перш ніж вирішити",
  c_t1_btn: "Почати з пробного",
  c_t2: "Базовий", c_t2_d: "30 днів", c_badge: "Раджу цей",
  c_t2_f1: "усі 30 уроків", c_t2_f2: "мої особисті відповіді у групі курсу",
  c_t2_btn: "Обрати Базовий",
  c_t3: "Повний", c_t3_d: "30 днів",
  c_t3_f1: "усе, що в Базовому", c_t3_f2: "консультація зі мною на початку", c_t3_f3: "консультація наприкінці + протокол далі",
  c_t3_btn: "Обрати Повний",
  c_anchor: "Для порівняння: індивідуальний розбір зі мною коштує €200 за годину. У Базовому тарифі — та сама система, розкладена за днями на місяць.",
  c_more_h2: "Точкові програми",
  c_more_p: "Наведіть на картку (або торкніться), щоб побачити, що всередині.",
  c_flip: "що всередині →",
  c_buy: "Оплатити", c_inbot: "Дізнатися в боті",
  grp_pro: "Навчання спеціалістів", grp_pro_p: "Для косметологів, лікарів та експертів, які ростять практику.",
  /* Про Тетяну */
  a_eyebrow: "Про мене",
  a_h1: 'Лікар, який дивиться <em class="acc">на причини</em>',
  a_p1: "Я — Тетяна Чернишова, лікар-невролог і косметолог. 20 років клінічної практики, докторська ступінь, Інститут біомедицини (Гранада, Іспанія). Живу в Іспанії, працюю онлайн.",
  a_p2: "До мене приходять жінки, які роками лікували симптоми окремо: у косметолога, ендокринолога, невролога. Моя робота — зібрати картину цілком: шкіра, енергія, сон і гормони — одна система.",
  a_f1: "Лікар-невролог і косметолог",
  a_f2: "Доктор наук · Інститут біомедицини, Гранада",
  a_f3: "20 років клінічної практики",
  a_f4: "Anti-age медицина · жіноче здоров'я 35+ · превентивна медицина за аналізами",
  a_ph_h2: "Мій підхід — <em class=\"acc\">три кроки</em>",
  a_s1_h: "Почути сигнал", a_s1_p: "Втома, волосся, шкіра, сон — тіло говорить першим. Я допомагаю розшифрувати.",
  a_s2_h: "Перевірити аналізами", a_s2_p: "Не «в нормі / не в нормі», а точні цифри та їхні зв'язки: залізо, вітамін D, щитоподібна, гормони.",
  a_s3_h: "Дати протокол", a_s3_p: "Конкретні щоденні кроки: харчування, сон, дихання, догляд. Без магії — з фізіологією.",
  a_cta: "Персональний розбір зі мною — €200 · запис через бот",
  a_cta_btn: "Записатися через бот",
  /* Кабінет */
  k_eyebrow: "Кабінет учениці",
  k_h1: 'Ваш курс — <em class="acc">в одному місці</em>',
  k_lead: "Кабінет відкривається після покупки курсу: доступ приходить у Telegram. Нижче — демо: так виглядатиме ваш прогрес.",
  k_bar: "Демо · Молодість зсередини",
  k_day: "День 5 із 30",
  k_demo_note: "Це демо-режим: відмічайте дні та дивіться, як росте прогрес. У реальному кабінеті уроки відкриваються по одному на день.",
  k_l1: "Сон: фундамент відновлення", k_l2: "Дихання, що знімає напругу", k_l3: "Харчування: перші заміни", k_l4: "Догляд: ранковий протокол", k_l5: "Дихання і лімфа",
  k_lock: "відкриється завтра", k_lock_st: "зачинено",
  k_done: "пройдено", k_todo: "практику не здано",
  k_hw_b: "Практика дня",
  k_hw: "3 запитання до себе: що я помітила сьогодні? що далося легко? що візьму із собою на завтра?",
  k_q_h: "Питання під час курсу",
  k_q_p: "На Базовому й Повному тарифах ви ставите запитання у групі курсу — я відповідаю особисто.",
  k_buy_h2: "Кабінет відкривається з курсом",
  k_buy_btn: "Обрати тариф",
  p_prof_h: "Профіль",
  p_hi: "Вітаю", p_name_l: "Як до вас звертатися?", p_save: "Зберегти",
  p_курс_h: "Мої курси",
  p_my_h: "Мої курси",
  p_demo_tag: "Демо-доступ",
  p_code_l: "Код доступу з Telegram",
  p_code_btn: "Активувати",
  p_code_note: "Коди доступу запрацюють із запуском кабінету. Зараз куплені курси приходять у Telegram — якщо оплатили й нічого не прийшло, напишіть у бот.",
  p_hw_h: "Практика дня",
  p_hw_q1: "Що я помітила сьогодні?", p_hw_q2: "Що далося легко?", p_hw_q3: "Що візьму із собою на завтра?",
  p_hw_send: "Здати практику",
  p_hw_note: "День зараховується після зданої практики — не за перегляд.",
  p_hw_done: "Практику здано — день зараховано!",
  p_cart_h: "Кошик",
  p_cart_empty: "Кошик порожній. Додайте курс на сторінці «Курси».",
  p_cart_pay: "Оплатити", p_cart_del: "Прибрати",
  p_cart_note: "Кожен курс оплачується окремою захищеною сторінкою WayForPay.",
  p_cart_sum: "Разом",
  cart_added: "У кошику ✓", cart_add: "У кошик",
  /* Контакти */
  ct_eyebrow: "Контакти",
  ct_h1: 'Я поруч — <em class="acc">у месенджері</em>',
  ct_lead: "Найшвидший спосіб отримати відповідь — Telegram-бот: тести на дефіцити, запис на розбір, питання щодо курсів і оплати.",
  ct_bot_h: "Telegram-бот", ct_bot_p: "Тести, запис, відповіді на запитання",
  ct_ig1_h: "Instagram (RU/ES)", ct_ig2_h: "Instagram (UA)",
  ct_ig_p: "Розбори, кейси з практики, прямі ефіри",
  ct_cons_h2: "Персональний розбір — €200",
  ct_cons_p: "60 хвилин онлайн: ваш тип старіння, розбір догляду, які аналізи здати. На руки — персональний протокол.",
  ct_cons_btn: "Записатися через бот",
  /* Модалка */
  up_h: "Підсильте результат курсу",
  up_p: "Втома й випадіння волосся часто пов'язані з низьким феритином. Курс «Феритин: повернути енергію» (5 уроків, €16) розбирає цю тему глибше.",
  up_go: "Продовжити до оплати курсу →",
  up_add: "Відкрити оплату «Феритину» — €16",
  up_skip: "Лише курс, дякую",
};
const RU_CACHE = {};

function applyLang() {
  document.documentElement.lang = lang === "ua" ? "uk" : "ru";
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    const k = el.dataset.i18n;
    if (!(k in RU_CACHE)) RU_CACHE[k] = el.innerHTML;
    el.innerHTML = lang === "ua" && UA[k] ? UA[k] : RU_CACHE[k];
  });
  /* держим язык в ссылках между страницами */
  document.querySelectorAll("a[data-keep-lang]").forEach(function (a) {
    const u = new URL(a.getAttribute("href"), location.href);
    if (lang === "ua") u.searchParams.set("lang", "ua"); else u.searchParams.delete("lang");
    a.setAttribute("href", u.pathname.split("/").pop() + (u.search || "") + u.hash);
  });
  document.querySelectorAll(".lang-t").forEach(function (t) {
    t.textContent = lang === "ua" ? "RU" : "UA";
  });
}
function toggleLang() {
  lang = lang === "ua" ? "ru" : "ua";
  const u = new URL(location.href);
  if (lang === "ua") u.searchParams.set("lang", "ua"); else u.searchParams.delete("lang");
  history.replaceState(null, "", u);
  applyLang();
  if (typeof onLangChange === "function") onLangChange();
}

/* ── корзина (localStorage) ── */
const CART_ITEMS = {
  trial: { ru: "Молодость изнутри · Пробный", ua: "Молодість зсередини · Пробний", price: 10 },
  base: { ru: "Молодость изнутри · Базовый", ua: "Молодість зсередини · Базовий", price: 100 },
  full: { ru: "Молодость изнутри · Полный", ua: "Молодість зсередини · Повний", price: 250 },
  ferritin: { ru: "Ферритин: вернуть энергию", ua: "Феритин: повернути енергію", price: 16 },
  fascia: { ru: "Фасціальний біль", ua: "Фасціальний біль", price: null, grn: 1000 },
  social: { ru: "Соцсети для эксперта", ua: "Соцмережі для експерта", price: null },
  book: { ru: "Книга «Склянка води»", ua: "Книга «Склянка води»", price: null },
};
function cartGet() { try { return JSON.parse(localStorage.getItem("cart") || "[]"); } catch (e) { return []; } }
function cartSet(c) { try { localStorage.setItem("cart", JSON.stringify(c)); } catch (e) {} cartBadge(); }
function cartAdd(id) {
  const c = cartGet();
  if (c.indexOf(id) === -1) { c.push(id); cartSet(c); track("site_cart_add", id); }
  cartBadge();
}
function cartRemove(id) { cartSet(cartGet().filter(function (x) { return x !== id; })); }
function cartBadge() {
  const n = cartGet().length;
  document.querySelectorAll(".nav-cab").forEach(function (a) {
    let b = a.querySelector(".cart-n");
    if (!b) { b = document.createElement("span"); b.className = "cart-n"; a.appendChild(b); }
    b.textContent = n ? " · " + n : "";
  });
}

/* мобильное меню */
function openSheet() { document.getElementById("sheet").classList.add("open"); }
function closeSheet() { document.getElementById("sheet").classList.remove("open"); }

/* ── модалка допродажи (только Базовый/Полный) ── */
let pendingPay = null, lastPayTrigger = null;
function closeUpsell() {
  const m = document.getElementById("upsell");
  if (m) m.classList.remove("open");
  pendingPay = null;
  if (lastPayTrigger) { lastPayTrigger.focus(); lastPayTrigger = null; }
}
function payFlagship(id) {
  const url = PAY[id];
  let shown = false;
  try { shown = sessionStorage.getItem("upsell_shown") === "1"; } catch (e) {}
  const m = document.getElementById("upsell");
  if (id === "trial" || shown || !m) { openPay(url, id); return; }
  try { sessionStorage.setItem("upsell_shown", "1"); } catch (e) {}
  pendingPay = { url: url, id: id };
  lastPayTrigger = document.activeElement;
  m.classList.add("open");
  const c = document.getElementById("up-continue"); if (c) c.focus();
  track("site_upsell_shown", id);
}
function proceedPay() { const p = pendingPay; closeUpsell(); if (p) openPay(p.url, p.id); }
document.addEventListener("keydown", function (e) {
  const m = document.getElementById("upsell");
  if (e.key === "Escape" && m && m.classList.contains("open")) closeUpsell();
});

/* ── кабинет-демо: прогресс в localStorage ── */
function cabInit() {
  const list = document.getElementById("day-list");
  if (!list) return;
  let done = [];
  try { done = JSON.parse(localStorage.getItem("cab_demo") || "[]"); } catch (e) {}
  function render() {
    list.querySelectorAll("li[data-day]").forEach(function (li) {
      const d = li.dataset.day;
      const st = li.querySelector(".st");
      const isDone = done.indexOf(d) !== -1;
      li.classList.toggle("done", isDone);
      if (st && !li.classList.contains("lock")) {
        st.textContent = isDone ? (lang === "ua" ? UA.k_done : "пройдено") : (lang === "ua" ? UA.k_todo : "практика не сдана");
      }
    });
    const total = 30;
    const pct = Math.min(100, Math.round((done.length / total) * 100));
    const bar = document.getElementById("cab-bar-i");
    const lbl = document.getElementById("cab-pct");
    if (bar) bar.style.width = Math.max(4, pct) + "%";
    if (lbl) lbl.textContent = pct + "%";
    const dayLbl = document.getElementById("cab-day");
    if (dayLbl) {
      const n = Math.min(total, done.length + 1);
      dayLbl.textContent = (lang === "ua" ? "День " + n + " із 30" : "День " + n + " из 30");
    }
  }
  /* день засчитывается ТОЛЬКО сдачей практики (см. hwSubmit), клики по списку день не отмечают */
  window.cabMarkNext = function () {
    const next = String(Math.min(30, done.length + 1));
    if (done.indexOf(next) === -1) done.push(next);
    try { localStorage.setItem("cab_demo", JSON.stringify(done)); } catch (e2) {}
    render();
    return done.length;
  };
  window.cabRender = render;
  render();
}
function onLangChange() { if (window.cabRender) window.cabRender(); }

document.addEventListener("DOMContentLoaded", function () {
  applyLang();
  cabInit();
  track("site_open", document.body.dataset.page || "site");
  const upC = document.getElementById("up-continue");
  const upS = document.getElementById("up-skip");
  const upBg = document.getElementById("upsell");
  if (upC) upC.addEventListener("click", proceedPay);
  if (upS) upS.addEventListener("click", proceedPay);
  if (upBg) upBg.addEventListener("click", function (e) { if (e.target === this) closeUpsell(); });
  /* флип-карточки на тач-экранах */
  document.querySelectorAll(".flip").forEach(function (f) {
    f.addEventListener("click", function (e) {
      if (e.target.closest("a,button")) return;
      f.classList.toggle("tapped");
    });
  });
});
