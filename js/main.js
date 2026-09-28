(function () {
  var page = document.querySelector('.page');
  var glow = document.getElementById('glow');
  var themeToggle = document.getElementById('themeToggle');
  var themeLabel = document.getElementById('themeLabel');
  var hotspots = Array.prototype.slice.call(document.querySelectorAll('.hotspot'));

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
    var label = isFinale ? 'Sidste fund' : 'Fund ' + (index + 1) + ' af ' + SKATTE.length;

    var html = '<span class="skat-label">' + label + '</span>';
    for (var i = 0; i < skat.length; i++) html += '<p>' + skat[i] + '</p>';
    reveal.innerHTML = html;

    spot.classList.add('is-found');
    if (trigger) trigger.setAttribute('aria-label', label + ' — tryk for at vise igen');
  }

  // Boksen åbner normalt OVER punktet. Er der ikke plads (fx øverst på
  // siden), åbner den UNDER i stedet — og den skubbes ind fra siderne,
  // så den aldrig går ud over skærmkanten.
  var EDGE = 16;       // luft til skærmkanten
  var TOP_SPACE = 80;  // plads til navigationen øverst

  function place(spot) {
    var reveal = spot.querySelector('.hotspot-reveal');
    if (!reveal) return;
    var rect = spot.getBoundingClientRect();
    var w = reveal.offsetWidth;
    var h = reveal.offsetHeight;

    spot.classList.toggle('reveal-below', rect.top - h - 14 < TOP_SPACE);

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
  function raise(spot, on) {
    var el = spot.parentElement;
    while (el && el !== page && el !== document.body) {
      if (on) {
        if (getComputedStyle(el).position === 'static') {
          el.style.position = 'relative';
          el.setAttribute('data-skat-pos', '');
        }
        el.style.zIndex = '30';
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

  function checkHotspots(x, y) {
    hotspots.forEach(function (spot) {
      var rect = spot.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var lit = Math.hypot(x - cx, y - cy) < LIGHT_RADIUS;
      if (lit !== spot.classList.contains('is-lit')) setLit(spot, lit);
    });
  }

  window.addEventListener('pointermove', function (e) {
    if (glow) glow.style.transform = 'translate3d(' + e.clientX + 'px, ' + e.clientY + 'px, 0)';
    if (hotspots.length) checkHotspots(e.clientX, e.clientY);
  }, { passive: true });
})();
