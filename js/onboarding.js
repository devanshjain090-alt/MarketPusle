(function () {
  'use strict';

  // ── helpers ──────────────────────────────────────────────────────────────
  function getUser() {
    try { return JSON.parse(localStorage.getItem('mp_user') || 'null'); } catch { return null; }
  }
  function getSub() {
    const u = getUser(); return u && u.sub ? u.sub : null;
  }
  function isNew() {
    const s = getSub(); return s ? !localStorage.getItem(s + '_onboarded') : false;
  }
  function markDone() {
    const s = getSub(); if (s) localStorage.setItem(s + '_onboarded', '1');
  }

  // ── tour steps ────────────────────────────────────────────────────────────
  var STEPS = [
    {
      section: 'dashboard',
      nav: '[data-section="dashboard"]',
      icon: 'fa-gauge-high',
      title: 'Dashboard',
      desc: 'Your market HQ. Live indices, top movers, portfolio snapshot, and breaking news — all at a glance.'
    },
    {
      section: 'us-terminal',
      nav: '[data-section="us-terminal"]',
      icon: 'fa-landmark',
      title: 'US Terminal',
      desc: 'Full NYSE & NASDAQ terminal. Search any US stock for live prices, analyst ratings, and interactive TradingView charts.'
    },
    {
      section: 'india-terminal',
      nav: '[data-section="india-terminal"]',
      icon: 'fa-indian-rupee-sign',
      title: 'India Terminal',
      desc: 'NSE & BSE coverage with live quotes, sector heatmaps, F&O snapshots, and institutional block deal tracking.'
    },
    {
      section: 'portfolio',
      nav: '[data-section="portfolio"]',
      icon: 'fa-briefcase',
      title: 'Portfolio',
      desc: 'Manage multiple portfolios across US & Indian markets. Add holdings, track real-time P&L, and visualise allocations.'
    },
    {
      section: 'xray',
      nav: '[data-section="xray"]',
      icon: 'fa-magnifying-glass-chart',
      title: 'Portfolio X-Ray',
      desc: 'Look through ETF holdings, detect sector concentration risk, and spot overlap between positions before it hurts.'
    },
    {
      section: 'picks',
      nav: '[data-section="picks"]',
      icon: 'fa-trophy',
      title: 'Top Picks',
      desc: 'AI-scored stocks ranked daily on Valuation, Quality, Momentum, Income, and Growth. Filter by theme to find your edge.'
    },
    {
      section: 'smart-money',
      nav: '[data-section="smart-money"]',
      icon: 'fa-building-columns',
      title: 'Smart Money',
      desc: 'Track institutional block & bulk deals, dark pool flows, and FII/DII activity — follow where the big money moves.'
    },
    {
      section: 'watchlist',
      nav: '[data-section="watchlist"]',
      icon: 'fa-star',
      title: 'Watchlist',
      desc: 'Build multiple themed watchlists. Monitor picks with live price cards or switch to a compact table view.'
    },
    {
      section: 'ai-chat',
      nav: '[data-section="ai-chat"]',
      icon: 'fa-robot',
      title: 'AI Chat',
      desc: 'Ask market questions, upload chart screenshots for analysis, or get a Gemini-powered roast of your portfolio.'
    }
  ];

  // ── state ─────────────────────────────────────────────────────────────────
  var step = -1;
  var overlay = null;

  // ── public: start tour (also wired to "Take a Tour" button) ──────────────
  window.startOnboardingTour = function () {
    if (overlay) return;
    step = -1;
    build();
    render();
    requestAnimationFrame(function () { overlay.classList.add('ob-active'); });
  };

  // ── init ──────────────────────────────────────────────────────────────────
  function hideTourBtn() {
    var btn = document.querySelector('.ud-tour');
    if (btn) btn.style.display = 'none';
    // Also hide the divider above it
    var prev = btn && btn.previousElementSibling;
    if (prev && prev.classList.contains('ud-divider')) prev.style.display = 'none';
  }

  function init() {
    if (!isNew()) { hideTourBtn(); return; }
    setTimeout(window.startOnboardingTour, 900);
  }

  // ── build DOM ─────────────────────────────────────────────────────────────
  function build() {
    overlay = document.createElement('div');
    overlay.id = 'ob-overlay';
    overlay.innerHTML =
      '<div class="ob-spotlight" id="ob-spotlight"></div>' +
      '<div class="ob-card" id="ob-card">' +
        '<button class="ob-skip" id="ob-skip">Skip tour</button>' +
        '<div class="ob-body" id="ob-body"></div>' +
        '<div class="ob-footer">' +
          '<div class="ob-dots" id="ob-dots"></div>' +
          '<div class="ob-btns">' +
            '<button class="ob-btn ob-ghost" id="ob-prev">← Back</button>' +
            '<button class="ob-btn ob-primary" id="ob-next">Start Tour →</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    document.getElementById('ob-skip').addEventListener('click', end);
    document.getElementById('ob-prev').addEventListener('click', prev);
    document.getElementById('ob-next').addEventListener('click', next);
  }

  // ── render current step ───────────────────────────────────────────────────
  function render() {
    if (step === -1) { renderWelcome(); return; }
    renderStep(step);
  }

  function renderWelcome() {
    var u = getUser();
    var first = (u && u.name) ? u.name.split(' ')[0] : 'there';

    // Restore sidebar z-index (in case we're replaying)
    resetSidebar();
    document.getElementById('ob-spotlight').style.opacity = '0';

    document.getElementById('ob-body').innerHTML =
      '<div class="ob-hero">◈</div>' +
      '<h2 class="ob-title">Welcome to Prism, ' + first + '</h2>' +
      '<p class="ob-sub">Your unified market terminal for US &amp; Indian markets. Let\'s take a quick tour of the key features.</p>';

    document.getElementById('ob-card').className = 'ob-card ob-welcome';
    document.getElementById('ob-prev').style.display = 'none';
    document.getElementById('ob-dots').style.display = 'none';
    document.getElementById('ob-next').textContent = 'Start Tour →';

    var card = document.getElementById('ob-card');
    card.style.left = '50%';
    card.style.top  = '50%';
    card.style.transform = 'translate(-50%,-50%)';
  }

  function renderStep(i) {
    var s = STEPS[i];

    if (window.switchSection) window.switchSection(s.section);

    var navEl = document.querySelector(s.nav);
    spotlightNav(navEl);

    document.getElementById('ob-body').innerHTML =
      '<div class="ob-step-top">' +
        '<span class="ob-icon"><i class="fa-solid ' + s.icon + '"></i></span>' +
        '<span class="ob-count">' + (i + 1) + ' / ' + STEPS.length + '</span>' +
      '</div>' +
      '<h3 class="ob-step-title">' + s.title + '</h3>' +
      '<p class="ob-step-desc">' + s.desc + '</p>';

    document.getElementById('ob-card').className = 'ob-card ob-step';
    document.getElementById('ob-prev').style.display = (i === 0) ? 'none' : '';
    document.getElementById('ob-dots').style.display = '';
    document.getElementById('ob-next').textContent = (i === STEPS.length - 1) ? 'Get Started ✓' : 'Next →';

    buildDots(i);
    positionCard(navEl);
  }

  // ── spotlight & positioning ───────────────────────────────────────────────
  function spotlightNav(el) {
    // Remove previous highlight
    document.querySelectorAll('.ob-hl').forEach(function (e) {
      e.classList.remove('ob-hl');
    });

    var sidebar = document.getElementById('sidebar');
    var sp = document.getElementById('ob-spotlight');

    if (!el) { sp.style.opacity = '0'; resetSidebar(); return; }

    // Lift sidebar above overlay so nav items are visible
    sidebar.style.zIndex = '10002';

    el.classList.add('ob-hl');

    var r = el.getBoundingClientRect();
    var p = 6;
    sp.style.left   = (r.left - p) + 'px';
    sp.style.top    = (r.top  - p) + 'px';
    sp.style.width  = (r.width  + p * 2) + 'px';
    sp.style.height = (r.height + p * 2) + 'px';
    sp.style.opacity = '1';
  }

  function resetSidebar() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.style.zIndex = '';
    document.querySelectorAll('.ob-hl').forEach(function (e) { e.classList.remove('ob-hl'); });
  }

  function positionCard(navEl) {
    var card = document.getElementById('ob-card');
    if (window.innerWidth < 768) {
      card.style.left = '50%';
      card.style.top  = '50%';
      card.style.transform = 'translate(-50%,-50%)';
      return;
    }
    var sidebar = document.getElementById('sidebar');
    var sbRight = sidebar ? sidebar.getBoundingClientRect().right : 220;
    var gap = 22;
    var cardLeft = sbRight + gap;
    var navTop = navEl ? navEl.getBoundingClientRect().top : window.innerHeight / 2;
    var cardTop = Math.max(80, navTop - 70);
    var maxTop  = window.innerHeight - 290;
    card.style.transform = 'none';
    card.style.left = cardLeft + 'px';
    card.style.top  = Math.min(cardTop, maxTop) + 'px';
  }

  // ── dots ──────────────────────────────────────────────────────────────────
  function buildDots(current) {
    document.getElementById('ob-dots').innerHTML = STEPS.map(function (_, i) {
      return '<span class="ob-dot' + (i === current ? ' ob-dot-on' : '') + '"></span>';
    }).join('');
  }

  // ── navigation ────────────────────────────────────────────────────────────
  function next() {
    if (step === -1)                  { step = 0;      render(); }
    else if (step < STEPS.length - 1) { step++;        render(); }
    else                               { end(); }
  }

  function prev() {
    if (step > 0)      { step--;  render(); }
    else if (step === 0) { step = -1; render(); }
  }

  function end() {
    markDone();
    hideTourBtn();
    resetSidebar();
    overlay.classList.remove('ob-active');
    var o = overlay;
    overlay = null;
    setTimeout(function () {
      if (o && o.parentNode) o.parentNode.removeChild(o);
      if (window.switchSection) window.switchSection('dashboard');
    }, 350);
  }

  // ── kick off ──────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
