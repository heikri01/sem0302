(function () {
  var data = (window.AI_LOG_DATA || []).slice().sort(function (a, b) {
    return a.dato < b.dato ? 1 : a.dato > b.dato ? -1 : 0;
  });
  var list = document.getElementById('aiLogList');
  if (!list) return;

  var filters = Array.prototype.slice.call(document.querySelectorAll('.ai-log-filter'));
  var currentFilter = 'all';


  function el(tag, className, text) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function formatDate(iso) {
    var parts = iso.split('-');
    return parts[2] + '.' + parts[1];
  }

  function buildField(label, text) {
    var wrap = el('div', 'ai-log-field');
    wrap.appendChild(el('span', 'ai-log-field-label', label));
    wrap.appendChild(el('p', null, text));
    return wrap;
  }

  function buildItem(entry) {
    var li = el('li', 'ai-log-item');
    li.dataset.tool = entry.tool;

    var details = el('details', 'ai-log-entry');

    var summary = document.createElement('summary');
    summary.className = 'ai-log-summary';

    var date = el('span', 'ai-log-date', formatDate(entry.dato));

    var tool = el('span', 'ai-log-tool');
    var dot = el('span', 'ai-log-dot ai-log-dot-' + entry.tool);
    dot.setAttribute('aria-hidden', 'true');
    tool.appendChild(dot);
    tool.appendChild(document.createTextNode(entry.ai));

    var formaal = el('span', 'ai-log-formaal', entry.formaal);

    summary.appendChild(date);
    summary.appendChild(tool);
    summary.appendChild(formaal);

    var detail = el('div', 'ai-log-detail');
    detail.appendChild(buildField('Prompt', entry.prompt));
    detail.appendChild(buildField('Genereret output', entry.output));
    detail.appendChild(buildField('Bearbejdning', entry.bearbejdning));

    details.appendChild(summary);
    details.appendChild(detail);
    li.appendChild(details);
    return li;
  }

  function applyFilter(filter) {
    currentFilter = filter;
    Array.prototype.slice.call(list.children).forEach(function (li) {
      li.hidden = !(filter === 'all' || li.dataset.tool === filter);
    });
    filters.forEach(function (btn) {
      var active = btn.dataset.filter === filter;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function updateCounts() {
    var counts = { all: data.length };
    data.forEach(function (entry) {
      counts[entry.tool] = (counts[entry.tool] || 0) + 1;
    });
    filters.forEach(function (btn) {
      var span = btn.querySelector('.ai-log-count');
      var n = counts[btn.dataset.filter] || 0;
      if (span) span.textContent = '(' + n + ')';
    });
  }

  data.forEach(function (entry) {
    list.appendChild(buildItem(entry));
  });

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyFilter(btn.dataset.filter);
    });
  });

  updateCounts();
  applyFilter(currentFilter);
})();
