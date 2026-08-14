/* ============================================================================
   Salón krásy Prestiž — cookie lišta
   Vloží si vlastní styly i markup, stačí připojit: <script src="consent.js" defer></script>

   Volba se ukládá do localStorage pod klíčem "prestiz_consent" na 12 měsíců.
   Hodnoty: "all" (souhlas) | "necessary" (odmítnuto)

   AŽ BUDETE NASAZOVAT ANALYTIKU (Google Analytics apod.), vložte její kód
   do funkce loadAnalytics() dole — spustí se pouze se souhlasem návštěvníka.
   ========================================================================== */
(function () {
  'use strict';

  var KEY = 'prestiz_consent';
  var MAX_AGE = 365 * 24 * 60 * 60 * 1000; // 12 měsíců

  /* ---------- uložení / načtení volby ---------- */
  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var val = JSON.parse(raw);
      if (!val || !val.t || Date.now() - val.t > MAX_AGE) return null; // expirováno
      return val.c;
    } catch (e) { return null; }
  }

  function write(choice) {
    try { localStorage.setItem(KEY, JSON.stringify({ c: choice, t: Date.now() })); } catch (e) {}
  }

  /* ---------- sem patří analytika (spustí se jen se souhlasem) ---------- */
  var analyticsLoaded = false;
  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    /* PŘÍKLAD — odkomentujte a doplňte vlastní ID:
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXX', { anonymize_ip: true });
    */
  }

  /* ---------- styly ---------- */
  function injectStyles() {
    if (document.getElementById('ck-style')) return;
    var css =
      '.ck-bar{position:fixed;left:50%;bottom:1rem;transform:translateX(-50%) translateY(150%);' +
      'width:min(680px,calc(100vw - 2rem));background:#F4EFE5;color:#2A2117;border:1px solid #DBCFBA;' +
      'border-radius:6px;box-shadow:0 18px 50px rgba(25,20,16,.22);padding:1.3rem 1.5rem;z-index:9999;' +
      'font-family:"Futura","Century Gothic",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;' +
      'transition:transform .45s cubic-bezier(.22,1,.36,1);opacity:0}' +
      '.ck-bar.is-on{transform:translateX(-50%) translateY(0);opacity:1}' +
      '@media (prefers-reduced-motion:reduce){.ck-bar{transition:opacity .2s}}' +
      '.ck-bar h4{font-family:"Bodoni 72","Didot","Cormorant Garamond",Georgia,serif;font-weight:400;' +
      'font-size:1.15rem;margin:0 0 .4rem}' +
      '.ck-bar p{margin:0 0 1rem;font-size:.84rem;line-height:1.6;color:#4B3C2D}' +
      '.ck-bar a{color:#A9823A}' +
      '.ck-act{display:flex;gap:.6rem;flex-wrap:wrap}' +
      '.ck-btn{font:inherit;font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;font-weight:600;' +
      'padding:.85em 1.7em;border-radius:999px;cursor:pointer;border:1px solid #4B3C2D;background:none;' +
      'color:#4B3C2D;transition:background .2s,color .2s}' +
      '.ck-btn:hover{background:#4B3C2D;color:#F4EFE5}' +
      '.ck-btn:focus-visible{outline:2px solid #A9823A;outline-offset:2px}' +
      '.ck-btn.primary{background:#4B3C2D;color:#F4EFE5}' +
      '.ck-btn.primary:hover{background:#A9823A;border-color:#A9823A}' +
      '@media(max-width:520px){.ck-bar{padding:1.1rem 1.1rem}.ck-act{flex-direction:column}.ck-btn{width:100%}}';
    var st = document.createElement('style');
    st.id = 'ck-style';
    st.textContent = css;
    document.head.appendChild(st);
  }

  /* ---------- lišta ---------- */
  var bar = null;

  function build() {
    injectStyles();
    bar = document.createElement('div');
    bar.className = 'ck-bar';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-live', 'polite');
    bar.setAttribute('aria-label', 'Nastavení cookies');
    bar.innerHTML =
      '<h4>Cookies na našem webu</h4>' +
      '<p>Tento web nesleduje své návštěvníky. Ukládáme jen vaši volbu z této lišty, ' +
      'abychom se neptali znovu. Podrobnosti najdete v <a href="cookies.html">zásadách cookies</a> ' +
      'a v <a href="ochrana-osobnich-udaju.html">ochraně osobních údajů</a>.</p>' +
      '<div class="ck-act">' +
      '<button type="button" class="ck-btn primary" data-ck="all">Souhlasím</button>' +
      '<button type="button" class="ck-btn" data-ck="necessary">Jen nezbytné</button>' +
      '</div>';
    document.body.appendChild(bar);

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-ck]');
      if (!btn) return;
      var choice = btn.getAttribute('data-ck');
      write(choice);
      if (choice === 'all') loadAnalytics();
      hide();
    });
  }

  function show() {
    if (!bar) build();
    requestAnimationFrame(function () { bar.classList.add('is-on'); });
  }

  function hide() {
    if (bar) bar.classList.remove('is-on');
  }

  /* ---------- start ---------- */
  var saved = read();
  if (saved === 'all') {
    loadAnalytics();
  } else if (saved === null) {
    show();
  }

  /* tlačítko "Změnit nastavení cookies" kdekoli na webu */
  document.addEventListener('click', function (e) {
    if (e.target.closest('.ck-open')) {
      e.preventDefault();
      show();
    }
  });

  /* veřejné API, kdyby se hodilo */
  window.prestizConsent = { get: read, open: show };
})();
