(function () {
  var page = document.querySelector('.page');
  var glow = document.getElementById('glow');
  var themeToggle = document.getElementById('themeToggle');
  var themeLabel = document.getElementById('themeLabel');
  var hotspots = Array.prototype.slice.call(document.querySelectorAll('.hotspot'));

  // Skattekisten til det sidste fund. Stien regnes ud fra, hvor main.js
  // ligger, så den virker både på forsiden og inde i case-studies/.
  // Diamanten ved hvert fund hentes på samme måde.
  var CHEST_SRC = 'img/skattekiste.svg';
  var GEM_SRC = 'img/diamant.svg';
  try {
    if (document.currentScript) {
      CHEST_SRC = new URL('../img/skattekiste.svg', document.currentScript.src).href;
      GEM_SRC = new URL('../img/diamant.svg', document.currentScript.src).href;
    }
  } catch (e) {}

  var dark = true;

  themeToggle.addEventListener('click', function () {
    dark = !dark;
    page.classList.toggle('dark', dark);
    themeLabel.textContent = dark ? 'Lys' : 'Mørk';
  });

  /* ------------------------------------------------------------------
     Skattejagt — indholdet

     Punkterne i HTML'en bestemmer IKKE selv, hvad de viser. I stedet
     trækker hvert nyt fund den NÆSTE skat fra listen herunder — uanset
     hvilket punkt og hvilken side, man finder det på.

     → Den første skat, en besøgende finder, er altid nr. 1.
     → Den sidste i listen er finalen. Listen bør derfor have lige så
       mange skatte, som der er punkter på sitet (lige nu 11).
     → Rækkefølgen ændres ved at flytte linjerne rundt. Intet andet.

     Hvert punkt husker sin skat (localStorage), så den samme besøgende
     ser det samme, hvis hun kommer tilbage til siden.
     ------------------------------------------------------------------ */
  var SKATTE = [
    [
      'Jeg har en lidt krøllet hjerne.',
      'Den tager sjældent den lige vej til en løsning — men den opdager nogle gange genveje, som andre ikke har set.'
    ],
    [
      'Min designfilosofi i én sætning: <strong>Jeg bruger ikke tre knapper, hvis der kun er brug for to.</strong>',
      'Men jeg tjekker altid lige, hvorfor den tredje knap eksisterer, før jeg fjerner den.'
    ],
    [
      'Jeg kan godt lide store idéer. Men på et tidspunkt spørger jeg næsten altid:',
      '<strong>Okay. Hvad gør vi så helt konkret?</strong>.'
    ],
    [
      'Jeg bruger gerne AI. Men jeg vil hellere forstå princippet end bare lære knappen.',
      'Værktøjer skifter. Men menneskers behov for god kommunikation forbliver.'
    ],
    [
      'Jeg tror ikke på, at man altid skal løse hele problemet på én gang.',
      'Tag et lille skridt nu. Fokuser på det du kan gøre lige nu. Gentag.'
    ],
    [
      'Jeg har en svaghed for ildsjæle.',
      'Mennesker, der brænder så meget for noget, at verden næsten ikke kan lade være med at få glæde af det.'
    ],
    [
      'Jeg har en tendens til at spørge: <em>“Men er dét egentlig problemet?”</em>',
      'Jeg vil hellere finde roden end sætte plaster på symptomet.'
    ],
    [
      'Jeg øver mig i at bruge terminalen i stedet for at trykke på den store Git-knap.',
      'Det går fremad. For det meste.'
    ],
    [
      'Jeg tror på løsninger, der gør mere end én ting',
      'Jeg bliver ekstra glad, når én løsning løser tre problemer på én gang — Win-win-win er min slags magi..'
    ],
    [
      'Jeg behøver ikke selv være den bedste til alt.',
      'Jeg vil hellere være god til at finde ud af, hvem der er god til hvad — og hvordan vi får det til at spille sammen.'
    ],
    [
      'Jeg kan blive ret fandenivoldsk, når mennesker ikke får lige meget plads.',
      'Min foretrukne kampstrategi er dog stadig god kommunikation. Det virker bedre end at råbe.'
    ],
    [
      'Hvis du har fundet den her, har du nok allerede opdaget, hvad jeg prøver at gøre.',
      '<strong>Jeg vil være en multimediedesigner, der bygger digitale broer mellem mennesker.</strong>'
    ]
  ];

  /* ---- Skattejagt — mekanikken ---- */
  var STORAGE_KEY = 'heidi-skattejagt';
  var state = loadState(); // { spots: { punkt-id: skat-index }, next: næste skat }

  function loadState() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && saved.spots && typeof saved.next === 'number') return saved;
    } catch (e) { /* privat vindue o.l. — så husker vi bare kun på denne side */ }
    return { spots: {}, next: 0 };
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  // Et stabilt id pr. punkt: data-skat="..." hvis det er sat i HTML'en,
  // ellers sidens filnavn + punktets nummer på siden.
  function spotId(spot, i) {
    var own = spot.getAttribute('data-skat');
    if (own) return own;
    var path = location.pathname;
    if (path.charAt(path.length - 1) === '/') path += 'index.html';
    return path.split('/').slice(-2).join('/') + '#' + i;
  }

  function render(spot, index) {
    var reveal = spot.querySelector('.hotspot-reveal');
    var trigger = spot.querySelector('.hotspot-trigger');
    var skat = SKATTE[index];
    var isFinale = index === SKATTE.length - 1;
    var label = isFinale ? 'Sidste fund · du fandt skatten!' : 'Fund ' + (index + 1) + ' af ' + SKATTE.length;

    var html = '';
    if (isFinale) {
      html += '<span class="skat-chest-wrap"><img class="skat-chest" src="' + CHEST_SRC + '" alt=""></span>';
    }
    var gem = isFinale ? '' : '<img class="skat-gem" src="' + GEM_SRC + '" alt="">';
    html += '<span class="skat-label">' + gem + label + '</span>';
    for (var i = 0; i < skat.length; i++) html += '<p>' + skat[i] + '</p>';
    reveal.innerHTML = html;

    // Findes ikonet ikke (endnu), fjernes pladsen til det igen.
    var chest = reveal.querySelector('.skat-chest');
    if (chest) chest.addEventListener('error', function () {
      if (chest.parentNode) chest.parentNode.remove();
    });

    spot.classList.add('is-found');
    spot.classList.toggle('is-finale', isFinale);
    if (trigger) trigger.setAttribute('aria-label', label + ' — tryk for at vise igen');
  }

  // Boksen åbner normalt OVER punktet. Er der ikke plads (fx øverst på
  // siden), åbner den UNDER i stedet — og den skubbes ind fra siderne,
  // så den aldrig går ud over skærmkanten.
  var EDGE = 16;       // luft til skærmkanten
  var header = document.querySelector('.header');

  // Hvor langt ned på skærmen headeren når lige nu. Den er sticky på
  // desktop, så fund og bokse skal holde sig under den.
  function headerBottom() {
    if (!header) return 0;
    var pos = getComputedStyle(header).position;
    if (pos !== 'sticky' && pos !== 'fixed') return 0;
    return Math.max(0, header.getBoundingClientRect().bottom);
  }

  function place(spot) {
    var reveal = spot.querySelector('.hotspot-reveal');
    if (!reveal) return;
    var rect = spot.getBoundingClientRect();
    var w = reveal.offsetWidth;
    var h = reveal.offsetHeight;

    spot.classList.toggle('reveal-below', rect.top - h - 14 < headerBottom() + EDGE);

    var cx = rect.left + rect.width / 2;
    var vw = document.documentElement.clientWidth;
    var shift = 0;
    if (cx - w / 2 < EDGE) shift = EDGE - (cx - w / 2);
    else if (cx + w / 2 > vw - EDGE) shift = (vw - EDGE) - (cx + w / 2);
    reveal.style.setProperty('--skat-shift', shift + 'px');
  }

  // Et fund skal ligge ØVERST, mens det er åbent. Ellers kan tekst længere
  // nede på siden (fx en animeret overskrift) blive tegnet oven på boksen.
  // Derfor løftes punktets forældre-elementer midlertidigt, og sættes
  // tilbage igen, når fundet lukkes.
  // OBS: løftet (15) skal være LAVERE end headerens z-index (20) — ellers
  // kommer hele indholdet (billeder, bobler, boksen) op over navigationen.
  function raise(spot, on) {
    var el = spot.parentElement;
    while (el && el !== page && el !== document.body) {
      if (on) {
        if (getComputedStyle(el).position === 'static') {
          el.style.position = 'relative';
          el.setAttribute('data-skat-pos', '');
        }
        el.style.zIndex = '15';
      } else {
        el.style.zIndex = '';
        if (el.hasAttribute('data-skat-pos')) {
          el.style.position = '';
          el.removeAttribute('data-skat-pos');
        }
      }
      el = el.parentElement;
    }
  }

  function setLit(spot, on) {
    if (on && !spot.classList.contains('is-lit')) {
      claim(spot);
      place(spot);
    }
    spot.classList.toggle('is-lit', on);
    raise(spot, on || spot.contains(document.activeElement));
  }

  // Giver punktet den næste skat på listen — kun første gang, det findes.
  function claim(spot) {
    var id = spot.getAttribute('data-skat-id');
    if (state.spots.hasOwnProperty(id)) return;
    var index = Math.min(state.next, SKATTE.length - 1);
    state.spots[id] = index;
    state.next += 1;
    saveState();
    render(spot, index);
  }

  hotspots.forEach(function (spot, i) {
    var id = spotId(spot, i);
    spot.setAttribute('data-skat-id', id);

    // Skærmlæsere får fundets tekst læst op sammen med knappen.
    var reveal = spot.querySelector('.hotspot-reveal');
    var trigger = spot.querySelector('.hotspot-trigger');
    if (reveal && trigger) {
      reveal.id = 'skat-' + i;
      trigger.setAttribute('aria-describedby', reveal.id);
    }

    // Allerede fundet ved et tidligere besøg? Så vis den samme skat igen.
    if (state.spots.hasOwnProperty(id)) render(spot, state.spots[id]);

    // Tastatur: fundet afsløres via :focus-within i CSS — sørg for, at der er indhold.
    spot.addEventListener('focusin', function () { claim(spot); place(spot); raise(spot, true); });
    spot.addEventListener('focusout', function () {
      if (!spot.classList.contains('is-lit')) raise(spot, false);
    });

    // Touch/klik har ingen "hover", så her tændes/slukkes fundet eksplicit ved tryk.
    if (trigger) {
      trigger.addEventListener('click', function () {
        setLit(spot, !spot.classList.contains('is-lit'));
      });
    }
  });

  // Mus: et fund "tændes", når lyskeglen kommer tæt nok på.
  var LIGHT_RADIUS = 70;

  var pointer = null;   // musens seneste position (til genberegning ved scroll)

  function checkHotspots(x, y) {
    var top = headerBottom();
    hotspots.forEach(function (spot) {
      var rect = spot.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      // Et punkt, der er scrollet ind under headeren, kan ikke findes
      // (ellers tændes det, når man bare bruger menuen).
      var lit = cy > top && y > top && Math.hypot(x - cx, y - cy) < LIGHT_RADIUS;
      if (lit !== spot.classList.contains('is-lit')) setLit(spot, lit);
    });
  }

  window.addEventListener('pointermove', function (e) {
    if (glow) glow.style.transform = 'translate3d(' + e.clientX + 'px, ' + e.clientY + 'px, 0)';
    if (e.pointerType === 'touch') return;   // touch bruger tryk (se ovenfor)
    pointer = { x: e.clientX, y: e.clientY };
    if (hotspots.length) checkHotspots(pointer.x, pointer.y);
  }, { passive: true });

  // Scroller man uden at flytte musen, flytter punkterne sig under den —
  // så tjekkes der igen, og et åbent fund lukker, når det forlader lyset.
  window.addEventListener('scroll', function () {
    if (pointer && hotspots.length) checkHotspots(pointer.x, pointer.y);
  }, { passive: true });
})();

/* ------------------------------------------------------------------
   Rejsen — bløde, bølgede linjer i tidslinjen (update-design, 28/9)

   Linjen tegnes som SVG ud fra, hvor prikkerne faktisk sidder, så den
   følger med, når teksten brydes anderledes (mobil, skift af font osv.).
   → Alle stræk er bløde S-kurver, der skifter retning for hvert stræk.
   → To fine tråde bølger med ved siden af, men i deres egen rytme
     (se STRANDS), så linjen ikke ligner en lyskæde.
   Uden JavaScript vises den oprindelige lige linje (border-left i CSS).
   ------------------------------------------------------------------ */
(function () {
  var timelines = Array.prototype.slice.call(document.querySelectorAll('.timeline'));
  if (!timelines.length) return;

  var NS = 'http://www.w3.org/2000/svg';
  var X = 30.5;          // linjens x inde i svg'en (svg'en starter 30px til venstre for tidslinjen)
  var DOT = 10.5;        // prikkens midte målt fra toppen af punktet

  function points(tl) {
    var ys = [];
    tl.querySelectorAll(':scope > .timeline-item').forEach(function (it) {
      ys.push(it.offsetTop + DOT);
    });
    return ys;
  }

  // Blød S-kurve fra y0 til y1 (retningen skifter for hvert stræk)
  // Fine ekstra tråde, der bølger med hovedlinjen uden at følge den helt
  // (hver med sin egen forskydning, bølgehøjde og rytme). Tilføj/fjern en
  // linje her for at få flere eller færre tråde.
  var STRANDS = [
    { offset: -2.2, amp: 1.45, bend: .20, seed: 3 },
    { offset:  2.6, amp: .55,  bend: .42, seed: 11 }
  ];

  // Et lille, fast "tilfældigt" tal pr. stræk, så trådene varierer — men
  // ser ens ud hver gang siden tegnes.
  function noise(n) { var s = Math.sin(n * 12.9898) * 43758.5453; return s - Math.floor(s); }

  // Blød S-kurve fra y0 til y1 (retningen skifter for hvert stræk)
  function wave(y0, y1, dir, o) {
    o = o || { offset: 0, amp: 1, bend: .3 };
    var h = y1 - y0;
    var a = Math.min(9, h / 5) * dir * o.amp;
    var x = X + o.offset;
    return ' C' + (x + a).toFixed(1) + ' ' + (y0 + h * o.bend).toFixed(1) + ' ' +
      (x - a).toFixed(1) + ' ' + (y0 + h * (1 - o.bend)).toFixed(1) + ' ' + x + ' ' + y1;
  }

  function draw(tl) {
    var old = tl.querySelector(':scope > svg.timeline-line');
    if (old) old.remove();

    var H = tl.offsetHeight;
    var ys = [0].concat(points(tl), [H]);
    var d = 'M' + X + ' 0';
    for (var i = 1; i < ys.length; i++) {
      d += wave(ys[i - 1], ys[i], i % 2 ? 1 : -1);
    }

    var strands = STRANDS.map(function (s) {
      var sd = 'M' + (X + s.offset) + ' 0';
      for (var i = 1; i < ys.length; i++) {
        var v = noise(i * 7 + s.seed);           // 0–1, forskellig pr. stræk og tråd
        sd += wave(ys[i - 1], ys[i], i % 2 ? 1 : -1, {
          offset: s.offset,
          amp: s.amp * (.75 + v * .5),           // bølgehøjden varierer lidt
          bend: Math.min(.45, s.bend + (v - .5) * .12)
        });
      }
      return sd;
    });

    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'timeline-line');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('width', '60');
    svg.setAttribute('height', H);
    svg.setAttribute('viewBox', '0 0 60 ' + H);
    strands.forEach(function (sd) {
      var fine = document.createElementNS(NS, 'path');
      fine.setAttribute('d', sd);
      fine.setAttribute('class', 'timeline-strand');
      svg.appendChild(fine);
    });
    var path = document.createElementNS(NS, 'path');
    path.setAttribute('d', d);
    svg.appendChild(path);
    tl.insertBefore(svg, tl.firstChild);
    tl.classList.add('has-curve');
  }

  function drawAll() {
    timelines.forEach(draw);
  }

  var timer;
  function redraw() { clearTimeout(timer); timer = setTimeout(drawAll, 120); }

  drawAll();
  window.addEventListener('resize', redraw);
  window.addEventListener('load', drawAll);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawAll);
})();

/* ------------------------------------------------------------------
   Sticky header + "tilbage til toppen"-pil  (branch: sticky-nav)

   Pilen bygges her, så den automatisk kommer med på alle sider,
   der henter main.js. Den dukker op, når man har scrollet ca. en
   skærmhøjde ned, og sender én tilbage til toppen — tastaturfokus
   flyttes også op, så man kan tabbe videre fra navigationen.
   ------------------------------------------------------------------ */
(function () {
  var page = document.querySelector('.page');
  var header = document.querySelector('.header');
  var footer = document.querySelector('.footer');
  if (!page) return;

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'to-top';
  btn.setAttribute('aria-label', 'Tilbage til toppen');
  btn.title = 'Tilbage til toppen';
  btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>';
  page.appendChild(btn);

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    // Flyt fokus til toppen, så tastatur- og skærmlæserbrugere også er "oppe".
    var target = header || page;
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', y > 24);
    btn.classList.toggle('is-visible', y > window.innerHeight * 0.9);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // Når footeren er i syne, løftes pilen, så den ikke dækker ikonerne.
  if (footer && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      page.style.setProperty('--footer-h', footer.offsetHeight + 'px');
      page.classList.toggle('footer-in-view', entries[0].isIntersecting);
    }).observe(footer);
  }
})();

/* ------------------------------------------------------------------
   Case studies — klik på et billede for at se det i fuld størrelse
   (afslut, 30/9). Mange billeder (flowcharts, tabeller, skærmbilleder)
   er for små til at kunne læses i layoutet. Et klik (eller Enter/
   mellemrum med tastaturet) åbner billedet stort i en <dialog>.
   Esc, klik udenfor eller "Luk" lukker igen.
------------------------------------------------------------------- */
(function () {
  var imgs = Array.prototype.slice.call(document.querySelectorAll('.main img.img-photo'));
  if (!imgs.length || typeof HTMLDialogElement === 'undefined') return;

  var dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Billede i fuld størrelse');
  dialog.innerHTML =
    // Luk-knappen sidder lige over billedets højre hjørne, så den er inden for rækkevidde
    '<figure class="lightbox-figure">' +
    '<button type="button" class="lightbox-close">Luk <span aria-hidden="true">✕</span></button>' +
    '<img class="lightbox-img" alt=""><figcaption class="lightbox-caption"></figcaption></figure>';
  document.body.appendChild(dialog);

  var bigImg = dialog.querySelector('.lightbox-img');
  var caption = dialog.querySelector('.lightbox-caption');
  var lastFocus = null;

  function captionFor(img) {
    // Billedteksten står typisk lige efter billedet i samme boks
    var el = img.nextElementSibling;
    while (el && !el.classList.contains('img-caption')) el = el.nextElementSibling;
    return el ? el.textContent.trim() : '';
  }

  function open(img) {
    lastFocus = img;
    bigImg.src = img.currentSrc || img.src;
    bigImg.alt = img.alt;
    var text = captionFor(img);
    caption.textContent = text;
    caption.hidden = !text;
    dialog.showModal();
  }

  function close() {
    dialog.close();
  }

  dialog.addEventListener('close', function () {
    bigImg.removeAttribute('src');
    if (lastFocus) lastFocus.focus();
  });

  // Klik udenfor billedet (på den mørke baggrund) lukker
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog || e.target.classList.contains('lightbox-figure')) close();
  });
  dialog.querySelector('.lightbox-close').addEventListener('click', close);

  imgs.forEach(function (img) {
    img.classList.add('is-zoomable');
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Forstør billede: ' + (img.alt || captionFor(img) || 'billede'));
    img.addEventListener('click', function () { open(img); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); }
    });
  });
})();
