/* ------------------------------------------------------------------
   Barcelona-siden (barcelona.html)

   1. Kortet: nåle fra BCN_STEDER. Mus over en nål → et lille postkort
      "popper frem". Klik/Enter → hele postkortet åbner i en dialog.
      På touch findes der ingen hover, så dér åbner et tryk postkortet
      direkte.
   2. Listen "Alle postkort" under kortet — samme indhold, som knapper.
      Den er genvejen på mobil og for skærmlæsere.
   3. Fotosafari-karrusellen fra BCN_FOTOSAFARI: et vandret spor med
      scroll-snap (virker også med swipe), styret af pile, tidslinjen
      og piletasterne.

   Indholdet ligger i js/barcelona-data.js.
   ------------------------------------------------------------------ */
(function () {
  var STEDER = window.BCN_STEDER || [];
  var SAFARI = window.BCN_FOTOSAFARI || [];

  var KATEGORI = {
    forsta: 'Fagligt besøg',
    forbind: 'Fællesskab',
    forme: 'Kunst & arkitektur'
  };

  var canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, className, text) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  // En lille, fast "tilfældig" hældning pr. postkort, så de ser håndlagte ud
  // — men står ens hver gang siden åbnes.
  function tilt(id) {
    var h = 0;
    for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 997;
    return ((h % 7) - 3) * 0.8; // -2.4° … 2.4°
  }

  function coverOf(sted) {
    for (var i = 0; i < sted.medier.length; i++) {
      var m = sted.medier[i];
      if (m.type === 'img') return m.src;
    }
    return sted.medier[0].poster;
  }

  /* ================= 1. Kortet ================= */

  var map = document.getElementById('bcnMap');
  var pins = document.getElementById('bcnPins');
  var preview = document.getElementById('bcnPreview');
  var hideTimer = null;

  function openPlace(sted, trigger) {
    if (sted.jump) {
      var target = document.querySelector(sted.jump);
      if (target) {
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        var track = document.getElementById('bcnSafariTrack');
        if (track) setTimeout(function () { track.focus({ preventScroll: true }); }, reduceMotion ? 0 : 500);
      }
      return;
    }
    openDialog(STEDER.indexOf(sted), trigger);
  }

  function showPreview(sted, pin) {
    clearTimeout(hideTimer);
    preview.innerHTML = '';
    preview.className = 'bcn-preview is-' + sted.kategori;

    var card = el('div', 'bcn-mini');
    card.style.setProperty('--tilt', tilt(sted.id) + 'deg');

    var img = el('img', 'bcn-mini-img');
    img.src = coverOf(sted);
    img.alt = '';
    card.appendChild(img);

    var stamp = el('span', 'bcn-mini-stamp', sted.dag);
    card.appendChild(stamp);

    var body = el('div', 'bcn-mini-body');
    body.appendChild(el('span', 'bcn-mini-name', sted.kort || sted.navn));
    body.appendChild(el('span', 'bcn-mini-hint', sted.jump ? 'Klik → se fotosafarien' : 'Klik → åbn postkortet'));
    card.appendChild(body);
    preview.appendChild(card);

    // Placering: over nålen, hvis der er plads — ellers under. Skubbes ind
    // fra siderne, så kortet ikke ryger ud over kortets kant.
    var mapRect = map.getBoundingClientRect();
    var pinRect = pin.getBoundingClientRect();
    var px = pinRect.left + pinRect.width / 2 - mapRect.left;
    var py = pinRect.top + pinRect.height / 2 - mapRect.top;
    var w = 200;
    var left = Math.max(8, Math.min(mapRect.width - w - 8, px - w / 2));
    preview.style.left = left + 'px';
    preview.style.width = w + 'px';
    var below = py < mapRect.height * 0.5;
    preview.classList.toggle('is-below', below);
    if (below) {
      preview.style.top = (py + 24) + 'px';
      preview.style.bottom = '';
    } else {
      preview.style.top = '';
      preview.style.bottom = (mapRect.height - py + 24) + 'px';
    }
    // næste frame, så transitionen får et udgangspunkt
    requestAnimationFrame(function () { preview.classList.add('is-visible'); });
  }

  function hidePreview() {
    hideTimer = setTimeout(function () { preview.classList.remove('is-visible'); }, 60);
  }

  STEDER.forEach(function (sted) {
    var pin = el('button', 'bcn-pin is-' + sted.kategori + (sted.offMap ? ' is-offmap' : ''));
    pin.type = 'button';
    pin.style.left = sted.x + '%';
    pin.style.top = sted.y + '%';
    pin.setAttribute('aria-label', (sted.kort || sted.navn) + ' — ' + sted.dag + (sted.jump ? '. Gå til fotosafarien' : '. Åbn postkortet'));
    pin.dataset.id = sted.id;

    if (sted.offMap) {
      pin.appendChild(el('span', 'bcn-pin-offmap', '↗ Mataró'));
    } else {
      pin.appendChild(el('span', 'bcn-pin-dot'));
    }
    pin.appendChild(el('span', 'bcn-pin-label', sted.kort || sted.navn));

    if (canHover) {
      pin.addEventListener('mouseenter', function () { showPreview(sted, pin); });
      pin.addEventListener('mouseleave', hidePreview);
    }
    pin.addEventListener('focus', function () { showPreview(sted, pin); });
    pin.addEventListener('blur', hidePreview);
    pin.addEventListener('click', function () {
      preview.classList.remove('is-visible');
      openPlace(sted, pin);
    });
    pins.appendChild(pin);
  });

  /* ================= 2. Listen ================= */

  var list = document.getElementById('bcnList');
  STEDER.forEach(function (sted) {
    var li = el('li');
    var btn = el('button', 'bcn-list-card is-' + sted.kategori);
    btn.type = 'button';
    btn.style.setProperty('--tilt', tilt(sted.id) * 0.6 + 'deg');

    var img = el('img', 'bcn-list-img');
    img.src = coverOf(sted);
    img.alt = '';
    img.loading = 'lazy';
    btn.appendChild(img);

    var meta = el('span', 'bcn-list-meta');
    meta.appendChild(el('span', 'bcn-list-day', sted.dag));
    meta.appendChild(el('span', 'bcn-list-name', sted.kort || sted.navn));
    meta.appendChild(el('span', 'bcn-list-cat', KATEGORI[sted.kategori] + (sted.jump ? ' · se fotosafarien ↓' : '')));
    btn.appendChild(meta);

    btn.addEventListener('click', function () { openPlace(sted, btn); });
    li.appendChild(btn);
    list.appendChild(li);
  });

  /* ================= Dialogen (det åbne postkort) ================= */

  var dialog = document.getElementById('bcnDialog');
  var stage = document.getElementById('bcnStage');
  var thumbs = document.getElementById('bcnThumbs');
  var lastTrigger = null;
  var current = -1;

  // Kun steder med rigtige postkort (ikke dem der hopper til en sektion)
  var CARDS = STEDER.filter(function (s) { return !s.jump; });

  function showMedia(m) {
    var old = stage.querySelector('video');
    if (old) old.pause();
    stage.innerHTML = '';
    var node;
    if (m.type === 'video') {
      node = el('video', 'bcn-stage-media');
      node.src = m.src;
      node.poster = m.poster;
      node.controls = true;
      node.playsInline = true;
      node.preload = 'metadata';
      node.setAttribute('aria-label', m.alt);
    } else {
      node = el('img', 'bcn-stage-media');
      node.src = m.src;
      node.alt = m.alt;
    }
    stage.appendChild(node);
  }

  function renderCard(sted) {
    dialog.className = 'bcn-dialog is-' + sted.kategori;

    document.getElementById('bcnDialogTitle').textContent = sted.navn;
    document.getElementById('bcnCat').textContent = KATEGORI[sted.kategori];
    document.getElementById('bcnAddress').textContent = sted.adresse;
    document.getElementById('bcnStamp').textContent = sted.dag;

    var text = document.getElementById('bcnText');
    text.innerHTML = '';
    sted.tekst.forEach(function (t) { text.appendChild(el('p', null, t)); });
    if (sted.link) {
      var a = el('a', 'case-link', '→ ' + sted.link.tekst);
      a.href = sted.link.href;
      a.target = '_blank';
      a.rel = 'noopener';
      text.appendChild(a);
    }

    thumbs.innerHTML = '';
    showMedia(sted.medier[0]);
    if (sted.medier.length > 1) {
      sted.medier.forEach(function (m, i) {
        var b = el('button', 'bcn-thumb' + (i === 0 ? ' is-active' : ''));
        b.type = 'button';
        b.setAttribute('aria-label', (m.type === 'video' ? 'Video: ' : 'Billede: ') + m.alt);
        b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
        var t = el('img');
        t.src = m.type === 'video' ? m.poster : m.src;
        t.alt = '';
        b.appendChild(t);
        if (m.type === 'video') b.appendChild(el('span', 'bcn-thumb-play', '▶'));
        b.addEventListener('click', function () {
          Array.prototype.forEach.call(thumbs.children, function (c) {
            c.classList.remove('is-active');
            c.setAttribute('aria-pressed', 'false');
          });
          b.classList.add('is-active');
          b.setAttribute('aria-pressed', 'true');
          showMedia(m);
        });
        thumbs.appendChild(b);
      });
    }
  }

  function openDialog(index, trigger) {
    var sted = STEDER[index];
    current = CARDS.indexOf(sted);
    renderCard(sted);
    if (!dialog.open) {
      lastTrigger = trigger || null;
      dialog.showModal();
    }
    document.getElementById('bcnClose').focus();
  }

  function step(dir) {
    current = (current + dir + CARDS.length) % CARDS.length;
    renderCard(CARDS[current]);
  }

  document.getElementById('bcnPrevPlace').addEventListener('click', function () { step(-1); });
  document.getElementById('bcnNextPlace').addEventListener('click', function () { step(1); });
  document.getElementById('bcnClose').addEventListener('click', function () { dialog.close(); });

  // Klik uden for kortet (på den mørke baggrund) lukker også
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });

  dialog.addEventListener('close', function () {
    var v = stage.querySelector('video');
    if (v) v.pause();
    if (lastTrigger) lastTrigger.focus();
  });

  /* ================= 3. Fotosafari-karrusellen ================= */

  var track = document.getElementById('bcnSafariTrack');
  var timeline = document.getElementById('bcnSafariTimeline');
  var status = document.getElementById('bcnSafariStatus');
  var prevBtn = document.getElementById('bcnSafariPrev');
  var nextBtn = document.getElementById('bcnSafariNext');
  var slides = [];
  var dots = [];
  var active = 0;

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  SAFARI.forEach(function (stop, i) {
    var slide = el('article', 'bcn-slide');
    slide.setAttribute('aria-roledescription', 'stop');
    slide.setAttribute('aria-label', 'Stop ' + stop.nr + ' af ' + SAFARI.length + ': ' + stop.navn);

    var media = el('div', 'bcn-slide-media' + (stop.billeder.length > 1 ? ' is-pair' : ''));
    stop.billeder.forEach(function (b) {
      var img = el('img', 'img-photo');
      img.src = b.src;
      img.alt = b.alt;
      img.loading = i < 2 ? 'eager' : 'lazy';
      media.appendChild(img);
    });
    slide.appendChild(media);

    var text = el('div', 'bcn-slide-text');
    text.appendChild(el('span', 'step-num', pad(stop.nr)));
    text.appendChild(el('h3', 'bcn-slide-title', stop.navn));
    text.appendChild(el('p', 'bcn-slide-body', stop.tekst));
    text.appendChild(el('span', 'bcn-slide-tag', 'Opgavens punkt ' + stop.nr));
    slide.appendChild(text);

    track.appendChild(slide);
    slides.push(slide);

    var li = el('li');
    var dot = el('button', 'bcn-dot');
    dot.type = 'button';
    dot.appendChild(el('span', 'bcn-dot-num', String(stop.nr)));
    dot.setAttribute('aria-label', 'Stop ' + stop.nr + ': ' + stop.navn);
    dot.addEventListener('click', function () { goTo(i); });
    li.appendChild(dot);
    timeline.appendChild(li);
    dots.push(dot);
  });

  // Mens karrusellen selv scroller (efter klik på pil/tidslinje), må
  // scroll-lytteren ikke "overrule" det valgte stop undervejs.
  var lockUntil = 0;

  function goTo(i) {
    i = Math.max(0, Math.min(SAFARI.length - 1, i));
    lockUntil = Date.now() + 700;
    track.scrollTo({ left: i * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
    setActive(i);
  }

  function setActive(i) {
    if (i === active && dots[i].classList.contains('is-active')) return;
    active = i;
    dots.forEach(function (d, j) {
      d.classList.toggle('is-active', j === i);
      d.classList.toggle('is-past', j < i);
      if (j === i) d.setAttribute('aria-current', 'step');
      else d.removeAttribute('aria-current');
    });
    timeline.style.setProperty('--progress', SAFARI.length > 1 ? i / (SAFARI.length - 1) : 0);
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === SAFARI.length - 1;
    status.textContent = 'Stop ' + (i + 1) + ' af ' + SAFARI.length + ' — ' + SAFARI[i].navn;
  }

  prevBtn.addEventListener('click', function () { goTo(active - 1); });
  nextBtn.addEventListener('click', function () { goTo(active + 1); });

  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(active + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(active - 1); }
    else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    else if (e.key === 'End') { e.preventDefault(); goTo(SAFARI.length - 1); }
  });

  // Swipe/scroll med fingeren eller touchpad → tidslinjen følger med
  var scrollTimer = null;
  track.addEventListener('scroll', function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      if (Date.now() < lockUntil) return;
      var i = Math.round(track.scrollLeft / track.clientWidth);
      setActive(Math.max(0, Math.min(SAFARI.length - 1, i)));
    }, 80);
  }, { passive: true });

  // Ved ændret vinduesbredde: bliv stående på samme stop
  window.addEventListener('resize', function () {
    track.scrollLeft = active * track.clientWidth;
  });

  if (SAFARI.length) setActive(0);
})();
