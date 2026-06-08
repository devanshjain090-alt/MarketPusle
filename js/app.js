'use strict';

// =====================================================================
// CONSTANTS & DATA
// =====================================================================

const US_STOCKS_DB = [
  { symbol:'AAPL',  name:'Apple Inc.',          sector:'Technology', price:189.30,  chg: 1.23, chgPct: 0.65, mcap:2950e9,  pe:31.2, vol:52e6,  avgVol:58e6,  div:0.5,  beta:1.25, w52h:199.62, w52l:164.08 },
  { symbol:'MSFT',  name:'Microsoft Corp.',      sector:'Technology', price:415.20,  chg: 3.45, chgPct: 0.84, mcap:3080e9,  pe:36.8, vol:20e6,  avgVol:22e6,  div:0.7,  beta:0.90, w52h:430.82, w52l:309.45 },
  { symbol:'GOOGL', name:'Alphabet Inc.',         sector:'Technology', price:172.80,  chg:-0.90, chgPct:-0.52, mcap:2130e9,  pe:24.1, vol:25e6,  avgVol:27e6,  div:0,    beta:1.05, w52h:193.31, w52l:130.67 },
  { symbol:'AMZN',  name:'Amazon.com Inc.',       sector:'Consumer',   price:198.50,  chg: 2.10, chgPct: 1.07, mcap:2100e9,  pe:44.2, vol:34e6,  avgVol:36e6,  div:0,    beta:1.15, w52h:242.52, w52l:151.61 },
  { symbol:'NVDA',  name:'NVIDIA Corp.',           sector:'Technology', price:875.40,  chg:18.20, chgPct: 2.12, mcap:2160e9,  pe:64.8, vol:45e6,  avgVol:41e6,  div:0.03, beta:1.72, w52h:974.00, w52l:394.64 },
  { symbol:'TSLA',  name:'Tesla Inc.',             sector:'Consumer',   price:245.60,  chg:-3.80, chgPct:-1.52, mcap:782e9,   pe:58.3, vol:98e6,  avgVol:110e6, div:0,    beta:2.01, w52h:299.29, w52l:138.80 },
  { symbol:'META',  name:'Meta Platforms Inc.',   sector:'Technology', price:497.20,  chg: 6.30, chgPct: 1.28, mcap:1270e9,  pe:26.7, vol:16e6,  avgVol:18e6,  div:0.5,  beta:1.20, w52h:544.15, w52l:299.62 },
  { symbol:'NFLX',  name:'Netflix Inc.',           sector:'Consumer',   price:625.40,  chg: 4.80, chgPct: 0.77, mcap:268e9,   pe:46.5, vol:4.2e6, avgVol:4.5e6, div:0,    beta:1.31, w52h:700.18, w52l:385.93 },
  { symbol:'JPM',   name:'JPMorgan Chase & Co.',  sector:'Finance',    price:203.80,  chg: 1.20, chgPct: 0.59, mcap:585e9,   pe:11.8, vol:10e6,  avgVol:11e6,  div:2.3,  beta:1.05, w52h:220.82, w52l:135.19 },
  { symbol:'BAC',   name:'Bank of America Corp.', sector:'Finance',    price:38.60,   chg:-0.40, chgPct:-1.03, mcap:304e9,   pe:12.4, vol:42e6,  avgVol:45e6,  div:2.6,  beta:1.40, w52h:44.44,  w52l:24.96  },
  { symbol:'V',     name:'Visa Inc.',              sector:'Finance',    price:278.30,  chg: 2.10, chgPct: 0.76, mcap:560e9,   pe:29.5, vol:6.5e6, avgVol:7e6,   div:0.8,  beta:0.95, w52h:290.96, w52l:216.56 },
  { symbol:'MA',    name:'Mastercard Inc.',        sector:'Finance',    price:468.90,  chg: 3.20, chgPct: 0.69, mcap:435e9,   pe:35.2, vol:3.8e6, avgVol:4e6,   div:0.6,  beta:1.10, w52h:490.10, w52l:346.29 },
  { symbol:'WMT',   name:'Walmart Inc.',           sector:'Consumer',   price:62.80,   chg: 0.40, chgPct: 0.64, mcap:505e9,   pe:27.4, vol:12e6,  avgVol:13e6,  div:1.2,  beta:0.52, w52h:68.22,  w52l:49.13  },
  { symbol:'DIS',   name:'Walt Disney Co.',        sector:'Consumer',   price:104.30,  chg:-1.20, chgPct:-1.14, mcap:190e9,   pe:22.8, vol:8.5e6, avgVol:9e6,   div:0,    beta:1.35, w52h:123.74, w52l:78.73  },
  { symbol:'AMD',   name:'Advanced Micro Devices', sector:'Technology', price:162.40,  chg: 3.80, chgPct: 2.40, mcap:262e9,   pe:44.1, vol:38e6,  avgVol:40e6,  div:0,    beta:1.85, w52h:227.30, w52l:116.37 },
  { symbol:'INTC',  name:'Intel Corp.',            sector:'Technology', price:31.20,   chg:-0.60, chgPct:-1.88, mcap:134e9,   pe:14.2, vol:45e6,  avgVol:50e6,  div:1.6,  beta:0.96, w52h:51.28,  w52l:18.84  },
  { symbol:'CRM',   name:'Salesforce Inc.',        sector:'Technology', price:284.60,  chg: 2.40, chgPct: 0.85, mcap:274e9,   pe:38.5, vol:5.5e6, avgVol:6e6,   div:0,    beta:1.20, w52h:318.71, w52l:212.00 },
  { symbol:'XOM',   name:'ExxonMobil Corp.',       sector:'Energy',     price:114.20,  chg: 0.80, chgPct: 0.71, mcap:455e9,   pe:13.5, vol:15e6,  avgVol:17e6,  div:3.4,  beta:0.84, w52h:123.75, w52l:95.77  },
  { symbol:'CVX',   name:'Chevron Corp.',          sector:'Energy',     price:153.80,  chg:-0.90, chgPct:-0.58, mcap:290e9,   pe:12.8, vol:9.5e6, avgVol:10e6,  div:4.2,  beta:1.02, w52h:188.23, w52l:139.62 },
  { symbol:'JNJ',   name:'Johnson & Johnson',      sector:'Healthcare', price:155.40,  chg: 0.60, chgPct: 0.39, mcap:373e9,   pe:16.8, vol:7.2e6, avgVol:7.5e6, div:3.1,  beta:0.45, w52h:175.97, w52l:143.13 },
  { symbol:'UNH',   name:'UnitedHealth Group',     sector:'Healthcare', price:490.20,  chg:-2.40, chgPct:-0.49, mcap:452e9,   pe:19.2, vol:3.5e6, avgVol:3.8e6, div:1.4,  beta:0.68, w52h:580.19, w52l:445.68 },
  { symbol:'PFE',   name:'Pfizer Inc.',             sector:'Healthcare', price:27.40,   chg:-0.30, chgPct:-1.08, mcap:155e9,   pe:11.5, vol:28e6,  avgVol:30e6,  div:6.4,  beta:0.61, w52h:33.32,  w52l:24.48  },
  { symbol:'T',     name:'AT&T Inc.',              sector:'Telecom',    price:18.20,   chg: 0.10, chgPct: 0.55, mcap:130e9,   pe:8.5,  vol:52e6,  avgVol:55e6,  div:6.8,  beta:0.65, w52h:21.48,  w52l:14.13  },
  { symbol:'VZ',    name:'Verizon Communications', sector:'Telecom',    price:40.60,   chg:-0.20, chgPct:-0.49, mcap:172e9,   pe:9.2,  vol:18e6,  avgVol:20e6,  div:6.5,  beta:0.38, w52h:44.73,  w52l:30.14  },
  { symbol:'KO',    name:'Coca-Cola Co.',          sector:'Consumer',   price:62.40,   chg: 0.30, chgPct: 0.48, mcap:269e9,   pe:23.8, vol:12e6,  avgVol:13e6,  div:3.0,  beta:0.55, w52h:68.88,  w52l:54.34  },
  { symbol:'PEP',   name:'PepsiCo Inc.',           sector:'Consumer',   price:167.20,  chg: 0.80, chgPct: 0.48, mcap:230e9,   pe:22.5, vol:4.8e6, avgVol:5.2e6, div:3.2,  beta:0.52, w52h:196.49, w52l:157.02 },
];

const INDIA_STOCKS_DB = [
  { symbol:'RELIANCE',   name:'Reliance Industries Ltd.',   sector:'Energy',     price:2847.5, chg:23.45, chgPct:0.83, mcap:19.2e12, pe:28.3, vol:8.5e6,  avgVol:9.2e6,  div:0.4, beta:0.92, w52h:3024.90, w52l:2180.10 },
  { symbol:'TCS',        name:'Tata Consultancy Services',  sector:'Technology', price:3842.0, chg:42.30, chgPct:1.11, mcap:13.9e12, pe:29.1, vol:3.2e6,  avgVol:3.5e6,  div:1.8, beta:0.75, w52h:4254.75, w52l:3311.00 },
  { symbol:'INFY',       name:'Infosys Ltd.',               sector:'Technology', price:1562.3, chg:-8.40, chgPct:-0.53,mcap:6.5e12,  pe:24.8, vol:12.0e6, avgVol:13.5e6, div:2.3, beta:0.68, w52h:1898.95, w52l:1356.25 },
  { symbol:'HDFCBANK',   name:'HDFC Bank Ltd.',             sector:'Finance',    price:1612.5, chg:-5.20, chgPct:-0.32,mcap:12.3e12, pe:19.4, vol:14.0e6, avgVol:16.0e6, div:1.2, beta:0.88, w52h:1794.00, w52l:1363.55 },
  { symbol:'ICICIBANK',  name:'ICICI Bank Ltd.',            sector:'Finance',    price:1124.8, chg:12.60, chgPct:1.13, mcap:7.9e12,  pe:18.2, vol:20.0e6, avgVol:22.0e6, div:0.8, beta:1.05, w52h:1252.90, w52l:897.20  },
  { symbol:'WIPRO',      name:'Wipro Ltd.',                 sector:'Technology', price:458.6,  chg: 4.20, chgPct:0.92, mcap:2.4e12,  pe:19.8, vol:8.0e6,  avgVol:9.0e6,  div:1.0, beta:0.72, w52h:562.50,  w52l:373.30  },
  { symbol:'TATAMOTORS', name:'Tata Motors Ltd.',           sector:'Auto',       price:892.3,  chg:18.50, chgPct:2.12, mcap:3.4e12,  pe:8.2,  vol:22.0e6, avgVol:25.0e6, div:0.2, beta:1.45, w52h:1179.05, w52l:618.65  },
  { symbol:'BAJFINANCE', name:'Bajaj Finance Ltd.',         sector:'Finance',    price:7124.5, chg:-32.4, chgPct:-0.45,mcap:4.3e12,  pe:31.5, vol:2.2e6,  avgVol:2.5e6,  div:0.1, beta:1.32, w52h:8192.35, w52l:6198.00 },
  { symbol:'ADANIENT',   name:'Adani Enterprises Ltd.',    sector:'Industrial', price:2394.0, chg:28.60, chgPct:1.21, mcap:2.7e12,  pe:42.0, vol:3.0e6,  avgVol:3.5e6,  div:0.1, beta:1.62, w52h:3743.90, w52l:2025.75 },
  { symbol:'SUNPHARMA',  name:'Sun Pharmaceutical Ind.',   sector:'Pharma',     price:1642.8, chg:-6.80, chgPct:-0.41,mcap:3.9e12,  pe:36.2, vol:4.5e6,  avgVol:5.0e6,  div:0.6, beta:0.55, w52h:1960.35, w52l:1188.55 },
  { symbol:'LT',         name:'Larsen & Toubro Ltd.',      sector:'Industrial', price:3524.6, chg:35.40, chgPct:1.01, mcap:4.8e12,  pe:33.8, vol:3.5e6,  avgVol:4.0e6,  div:1.2, beta:1.05, w52h:3963.05, w52l:2746.00 },
  { symbol:'MARUTI',     name:'Maruti Suzuki India Ltd.',  sector:'Auto',       price:11842., chg:124.0, chgPct:1.06, mcap:3.6e12,  pe:26.4, vol:0.8e6,  avgVol:0.9e6,  div:1.5, beta:0.82, w52h:13680.0, w52l:9760.20 },
  { symbol:'KOTAKBANK',  name:'Kotak Mahindra Bank Ltd.',  sector:'Finance',    price:1784.2, chg:-12.5, chgPct:-0.70,mcap:3.6e12,  pe:20.5, vol:5.0e6,  avgVol:5.5e6,  div:0.06,beta:0.88, w52h:1953.00, w52l:1543.85 },
  { symbol:'ASIANPAINT', name:'Asian Paints Ltd.',         sector:'Consumer',   price:2724.3, chg:-18.2, chgPct:-0.66,mcap:2.6e12,  pe:52.3, vol:1.5e6,  avgVol:1.8e6,  div:1.0, beta:0.58, w52h:3394.65, w52l:2524.25 },
  { symbol:'AXISBANK',   name:'Axis Bank Ltd.',            sector:'Finance',    price:1082.5, chg: 8.30, chgPct:0.77, mcap:3.3e12,  pe:13.8, vol:14.0e6, avgVol:15.0e6, div:0.3, beta:1.20, w52h:1339.65, w52l:995.25  },
  { symbol:'HINDUNILVR', name:'Hindustan Unilever Ltd.',   sector:'FMCG',       price:2342.0, chg: 6.50, chgPct:0.28, mcap:5.5e12,  pe:54.2, vol:2.0e6,  avgVol:2.2e6,  div:1.4, beta:0.42, w52h:2859.55, w52l:2172.25 },
  { symbol:'NTPC',       name:'NTPC Ltd.',                 sector:'Energy',     price:362.4,  chg: 3.20, chgPct:0.89, mcap:3.5e12,  pe:18.2, vol:22.0e6, avgVol:25.0e6, div:1.6, beta:0.92, w52h:448.45,  w52l:278.95  },
  { symbol:'POWERGRID',  name:'Power Grid Corp. of India', sector:'Energy',     price:298.6,  chg: 2.10, chgPct:0.71, mcap:2.8e12,  pe:21.4, vol:15.0e6, avgVol:17.0e6, div:4.2, beta:0.65, w52h:366.25,  w52l:221.50  },
  { symbol:'ONGC',       name:'Oil & Natural Gas Corp.',   sector:'Energy',     price:258.4,  chg:-1.40, chgPct:-0.54,mcap:3.2e12,  pe:8.5,  vol:35.0e6, avgVol:38.0e6, div:4.8, beta:1.05, w52h:345.00,  w52l:189.85  },
  { symbol:'DRREDDY',    name:"Dr. Reddy's Laboratories",  sector:'Pharma',     price:6148.5, chg:42.50, chgPct:0.70, mcap:1.0e12,  pe:18.9, vol:1.0e6,  avgVol:1.2e6,  div:0.5, beta:0.48, w52h:7529.65, w52l:5014.00 },
  { symbol:'HCLTECH',    name:'HCL Technologies Ltd.',     sector:'Technology', price:1518.2, chg:12.40, chgPct:0.82, mcap:4.1e12,  pe:27.5, vol:6.0e6,  avgVol:7.0e6,  div:3.8, beta:0.72, w52h:1929.10, w52l:1235.00 },
  { symbol:'TITAN',      name:'Titan Company Ltd.',        sector:'Consumer',   price:3374.6, chg:-24.8, chgPct:-0.73,mcap:3.0e12,  pe:96.2, vol:2.5e6,  avgVol:2.8e6,  div:0.4, beta:0.88, w52h:3886.95, w52l:2774.60 },
  { symbol:'ITC',        name:'ITC Ltd.',                  sector:'FMCG',       price:432.8,  chg: 1.60, chgPct:0.37, mcap:5.4e12,  pe:26.8, vol:18.0e6, avgVol:20.0e6, div:3.6, beta:0.55, w52h:528.50,  w52l:399.35  },
  { symbol:'BHARTIARTL', name:'Bharti Airtel Ltd.',        sector:'Telecom',    price:1312.4, chg:15.60, chgPct:1.20, mcap:7.8e12,  pe:78.5, vol:5.0e6,  avgVol:5.5e6,  div:0.3, beta:0.82, w52h:1779.00, w52l:1043.75 },
  { symbol:'BAJAJFINSV', name:'Bajaj Finserv Ltd.',        sector:'Finance',    price:1624.8, chg:-8.20, chgPct:-0.50,mcap:2.6e12,  pe:16.4, vol:3.5e6,  avgVol:4.0e6,  div:0.05,beta:1.15, w52h:1972.55, w52l:1419.00 },
];

const SEARCH_DB = [
  ...US_STOCKS_DB.map(s => ({ ...s, market: 'us', tvSym: `NASDAQ:${s.symbol}` })),
  ...INDIA_STOCKS_DB.map(s => ({ ...s, market: 'india', tvSym: `BSE:${s.symbol}` })),
];

const INDIA_SECTORS = [
  { name:'IT',      chg:+1.2 },{ name:'Banking',  chg:-0.5 },
  { name:'Auto',    chg:+0.8 },{ name:'Pharma',   chg:+0.3 },
  { name:'FMCG',    chg:-0.2 },{ name:'Energy',   chg:+1.5 },
  { name:'Telecom', chg:+0.9 },{ name:'Metal',    chg:-0.7 },
];

// =====================================================================
// STATE
// =====================================================================
const state = {
  portfolios: {},
  activePortfolio: '',
  portfolio: [],           // live reference to active portfolio array, set by initPortfolios()
  watchlists: {},
  activeWatchlist: 'My Watchlist',
  section: 'dashboard',
  navSource: null,   // section that launched the terminal — used for the ← back button
  currentUS: { symbol:'AAPL', name:'Apple Inc.', exchange:'NASDAQ' },
  currentIndia: { symbol:'RELIANCE', name:'Reliance Industries Ltd.', exchange:'BSE' },
  indiaExchange: 'BSE',
  screenerMkt: 'us',
  screenerData: [...US_STOCKS_DB],
  tvUS: null,
  tvIndia: null,
  charts: {},
  moversTab: 'gainers',
  portfolioFilter: 'all',
  pickReportReturn: 'picks',
  pickReportStock: null,
};

// ── News state (defined early so renderMovers/renderScreener can access it) ──
const newsState = {
  feed: [],
  unread: 0,
  activeStockNews: {},
  tickerItems: [],
  engineIdx: 0,
  bannerTimer: null,
  realNewsLoaded: false,
};

// =====================================================================
// UTILITY
// =====================================================================
const $ = id => document.getElementById(id);
const _nfUS = [0,1,2,3,4].map(d => new Intl.NumberFormat('en-US', { minimumFractionDigits:d, maximumFractionDigits:d }));
const _nfIN2 = new Intl.NumberFormat('en-IN', { minimumFractionDigits:2, maximumFractionDigits:2 });
const fmt = (n, dec=2) => n == null ? '—' : (_nfUS[dec] || _nfUS[2]).format(n);
const fmtINR = n => n == null ? '—' : '₹' + _nfIN2.format(n);
const fmtUSD = n => n == null ? '—' : '$' + fmt(n);
const USD_TO_INR = 85; // approximate exchange rate used for display conversion
const toINR = usd => (usd == null ? null : usd * USD_TO_INR); // convert USD amount → INR

function fmtMcap(n, isIndia=false) {
  if (isIndia) {
    if (n >= 1e12) return '₹' + (n/1e12).toFixed(2) + 'T';
    if (n >= 1e9)  return '₹' + (n/1e9).toFixed(1) + 'B';
    return '₹' + (n/1e6).toFixed(0) + 'M';
  }
  if (n >= 1e12) return '$' + (n/1e12).toFixed(2) + 'T';
  if (n >= 1e9)  return '$' + (n/1e9).toFixed(1) + 'B';
  return '$' + (n/1e6).toFixed(0) + 'M';
}

function fmtVol(n) {
  if (n >= 1e6) return (n/1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n/1e3).toFixed(0) + 'K';
  return String(n);
}

function chgClass(v) { return v > 0 ? 'positive' : v < 0 ? 'negative' : 'neutral'; }
function chgSign(v)  { return v > 0 ? '+' : ''; }

function setEl(id, html, cls='') {
  const el = $(id); if (!el) return;
  el.innerHTML = html;
  if (cls) el.className = cls;
}

function toast(msg, type='success') {
  const t = $('toast');
  t.querySelector('#toastMsg').textContent = msg;
  t.className = 'toast show' + (type==='error' ? ' error' : '');
  setTimeout(() => t.className = 'toast', 3000);
}

// Returns a user-scoped localStorage key so each Google account has isolated data.
function lsKey(k) {
  try {
    const u = JSON.parse(localStorage.getItem('mp_user') || 'null');
    const id = (u && u.sub) ? u.sub : 'guest';
    return id + '_' + k;
  } catch { return 'guest_' + k; }
}

function savePortfolio() {
  localStorage.setItem(lsKey('sp_portfolios'), JSON.stringify(state.portfolios));
  localStorage.setItem(lsKey('sp_activePortfolio'), state.activePortfolio);
}
function saveWatchlists() {
  localStorage.setItem(lsKey('sp_watchlists'), JSON.stringify(state.watchlists));
  localStorage.setItem(lsKey('sp_activeWatchlist'), state.activeWatchlist);
}

// =====================================================================
// NAVIGATION
// =====================================================================
function switchSection(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const page = document.getElementById(id);
  if (page) page.classList.add('active');
  document.querySelectorAll(`.nav-item[data-section="${id}"]`).forEach(n => n.classList.add('active'));

  // Track the originating section for the terminal back button.
  // Only capture when entering a terminal from a non-terminal page — this preserves
  // the original source (e.g. Smart Money) even if the user taps another stock
  // from within the terminal, since both sides would then be terminals.
  const isTerminal       = id === 'us-terminal' || id === 'india-terminal';
  const cameFromTerminal = state.section === 'us-terminal' || state.section === 'india-terminal';
  if (isTerminal && state.section !== id && !cameFromTerminal) {
    state.navSource = state.section;
  }

  state.section = id;
  _updateTerminalBackBtn();
  if (id === 'us-terminal' && !state.tvUS) initUSChart('NASDAQ:AAPL');
  if (id === 'india-terminal' && !state.tvIndia) initIndiaChart('BSE:RELIANCE');
  if (id === 'portfolio') { renderPortfolio(); fetchLivePrices(); }
  if (id === 'screener') { _initTVScreener(state.screenerMkt); }
  if (id === 'picks') {
    renderPicks();
    // Trigger live refresh once per section visit if not yet loaded
    if (!picksState.liveLoaded) refreshPicks(false);
  }
  if (id === 'watchlist') renderWatchlist();
  if (id === 'dashboard') { renderMovers(); renderDashPortfolio(); }
  if (id === 'ai-chat') initAIChat();
  if (id === 'smart-money') initSmartMoney();
  if (id === 'xray') initXRay();
}

document.querySelectorAll('.nav-item[data-section]').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); switchSection(el.dataset.section); });
});

const _SECTION_LABELS = {
  'dashboard': 'Dashboard', 'portfolio': 'Portfolio', 'picks': 'Top Picks',
  'smart-money': 'Smart Money', 'watchlist': 'Watchlist', 'screener': 'Screener',
  'xray': 'X-Ray', 'ai-chat': 'AI Chat',
};

function _updateTerminalBackBtn() {
  const src   = state.navSource;
  const label = src ? (_SECTION_LABELS[src] || src) : null;
  ['termBackBtnUS', 'termBackBtnIndia'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    if (label) { btn.textContent = '← ' + label; btn.style.display = 'inline-flex'; }
    else        { btn.style.display = 'none'; }
  });
}

function terminalGoBack() {
  const dest = state.navSource;
  state.navSource = null;
  _updateTerminalBackBtn();
  if (dest) switchSection(dest);
}

// ── Sidebar rail toggle ──
(function() {
  const toggle = document.getElementById('sidebarToggle');
  if (!toggle) return;
  if (localStorage.getItem('sidebarRail') === 'true') document.body.classList.add('sidebar-rail');
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-rail');
    localStorage.setItem('sidebarRail', document.body.classList.contains('sidebar-rail'));
  });
})();

// =====================================================================
// MARKET CLOCK
// =====================================================================
const _nyClockFmt  = new Intl.DateTimeFormat('en-US', { timeZone:'America/New_York', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false });
const _istClockFmt = new Intl.DateTimeFormat('en-US', { timeZone:'Asia/Kolkata',     hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false });
const _nyPartsFmt  = new Intl.DateTimeFormat('en-US', { timeZone:'America/New_York', hour:'numeric', minute:'numeric', weekday:'short', hour12:false });
const _istPartsFmt = new Intl.DateTimeFormat('en-US', { timeZone:'Asia/Kolkata',     hour:'numeric', minute:'numeric', weekday:'short', hour12:false });
const _wdIdx = { Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6 };

function _tzParts(fmt, now) {
  return fmt.formatToParts(now).reduce((a, p) => { a[p.type] = p.value; return a; }, {});
}

let _nyDotCls = '', _istDotCls = '';
function updateClocks() {
  const now = new Date();
  const nyEl = $('nyTime'), istEl = $('istTime');
  if (nyEl) nyEl.textContent = _nyClockFmt.format(now);
  if (istEl) istEl.textContent = _istClockFmt.format(now);

  const nyP = _tzParts(_nyPartsFmt, now);
  const nyH = +nyP.hour, nyM = +nyP.minute, nyWd = _wdIdx[nyP.weekday] ?? -1;
  const nyOpen = nyWd > 0 && nyWd < 6 && (nyH > 9 || (nyH===9 && nyM>=30)) && nyH < 16;
  const nyDotCls = 'market-dot ' + (nyOpen ? 'open' : 'closed');
  const nyDot = $('nyDot');
  if (nyDot && nyDotCls !== _nyDotCls) { nyDot.className = nyDotCls; _nyDotCls = nyDotCls; }

  const istP = _tzParts(_istPartsFmt, now);
  const istH = +istP.hour, istM = +istP.minute, istWd = _wdIdx[istP.weekday] ?? -1;
  const istOpen = istWd > 0 && istWd < 6 && (istH > 9 || (istH===9 && istM>=15)) && (istH < 15 || (istH===15 && istM<=30));
  const istDotCls = 'market-dot ' + (istOpen ? 'open' : 'closed');
  const istDot = $('istDot');
  if (istDot && istDotCls !== _istDotCls) { istDot.className = istDotCls; _istDotCls = istDotCls; }
}
setInterval(updateClocks, 1000);
updateClocks();

// =====================================================================
// LIVE PRICE FETCH
// =====================================================================
async function fetchYahoo(symbols) {
  const syms = Array.isArray(symbols) ? symbols.join(',') : symbols;
  // Try query2 first (often bypasses auth issues), then query1
  for (const host of ['query2', 'query1']) {
    try {
      const url = `https://${host}.finance.yahoo.com/v7/finance/quote?symbols=${syms}&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketVolume,regularMarketOpen,regularMarketDayHigh,regularMarketDayLow,regularMarketPreviousClose,fiftyTwoWeekHigh,fiftyTwoWeekLow,marketCap,trailingPE,averageDailyVolume3Month,dividendYield,beta,longName,fullExchangeName,epsTrailingTwelveMonths,epsForward,forwardPE,pegRatio,fiftyDayAverage,twoHundredDayAverage,priceToBook`;
      const r = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!r.ok) continue;
      const data = await r.json();
      const result = data?.quoteResponse?.result || [];
      if (result.length) return result;
    } catch {}
  }
  return [];
}

// Simulate price fluctuation for demo
function simulatePrice(base, volatility=0.005) {
  return base * (1 + (Math.random()-0.5) * volatility * 2);
}

// Map a Yahoo Finance quote object to our internal data format.
// Falls back field-by-field to `fallback` (local DB row) when live data is absent.
function mapYahooQuote(q, fallback) {
  if (!q || !q.regularMarketPrice) return fallback;
  return {
    symbol:    fallback?.symbol || q.symbol || '',
    name:      q.longName || q.shortName || fallback?.name || '',
    sector:    fallback?.sector || '—',
    price:     q.regularMarketPrice,
    chg:       q.regularMarketChange        ?? 0,
    chgPct:    q.regularMarketChangePercent ?? 0,
    open:      q.regularMarketOpen          ?? null,
    prevClose: q.regularMarketPreviousClose ?? null,
    dayHigh:   q.regularMarketDayHigh       ?? null,
    dayLow:    q.regularMarketDayLow        ?? null,
    vol:       q.regularMarketVolume        ?? fallback?.vol    ?? 0,
    avgVol:    q.averageDailyVolume3Month   ?? fallback?.avgVol ?? 0,
    mcap:      q.marketCap                  ?? fallback?.mcap   ?? 0,
    pe:        q.trailingPE                 ?? fallback?.pe     ?? null,
    w52h:      q.fiftyTwoWeekHigh           ?? fallback?.w52h   ?? 0,
    w52l:      q.fiftyTwoWeekLow            ?? fallback?.w52l   ?? 0,
    div:       q.dividendYield != null ? q.dividendYield * 100 : (fallback?.div ?? 0),
    beta:      q.beta                       ?? fallback?.beta   ?? null,
    avEPS:       q.epsTrailingTwelveMonths  ?? null,
    avForwardPE: q.forwardPE               ?? null,
    avPEG:       q.pegRatio                ?? null,
    avMA50:      q.fiftyDayAverage         ?? null,
    avMA200:     q.twoHundredDayAverage    ?? null,
    avHasData:   true,
  };
}

// =====================================================================
// INDIA LIVE PRICES — Twelve Data (NSE) + Gemini AI fallback
// =====================================================================
const GEMINI_PRICE_MODEL = 'gemini-2.5-flash';
const GEMINI_CHAT_MODEL  = 'gemini-2.5-flash';

// Shared helper — 429 (per-minute rate limit) gets one automatic retry after 32 s.
// onWait(secondsLeft) is called each second while waiting so the UI can count down.
async function _geminiPost(url, body, onWait) {
  const opts = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
  let resp = await fetch(url, opts);
  if (resp.status !== 429) return resp;
  // Rate-limited — wait 32 seconds then retry once
  const WAIT = 32;
  for (let i = WAIT; i > 0; i--) {
    if (onWait) onWait(i);
    await new Promise(r => setTimeout(r, 1000));
  }
  return fetch(url, opts);
}

// Twelve Data: reuses existing TD_KEY, fetches NSE quotes via symbol:NSE notation
async function fetchTwelveIndia(symbols) {
  if (!symbols.length) return {};
  try {
    const syms = symbols.map(s => `${s}:BSE`).join(',');
    const url = `${TD_BASE}/quote?symbol=${encodeURIComponent(syms)}&apikey=${TD_KEY}`;
    const r = await fetch(url);
    if (!r.ok) return {};
    const data = await r.json();
    if (data.status === 'error') return {};
    // Single symbol → quote object directly; multiple → object keyed by "SYMBOL:BSE"
    const entries = symbols.length === 1
      ? [[symbols[0], data]]
      : Object.entries(data);
    const result = {};
    for (const [key, q] of entries) {
      if (!q || q.status === 'error') continue;
      const price = parseFloat(q.close);
      if (!(price > 0)) continue;
      const sym = (q.symbol || key).replace(/:BSE$/i, '').toUpperCase();
      result[sym] = {
        price,
        open:      parseFloat(q.open)                 || price,
        dayHigh:   parseFloat(q.high)                 || price,
        dayLow:    parseFloat(q.low)                  || price,
        prevClose: parseFloat(q.previous_close)       || price,
        chg:       parseFloat(q.change)               || 0,
        chgPct:    parseFloat(q.percent_change)       || 0,
        vol:       parseInt(q.volume)                 || 0,
        avgVol:    parseInt(q.average_volume)         || 0,
        w52h:      parseFloat(q.fifty_two_week?.high) || 0,
        w52l:      parseFloat(q.fifty_two_week?.low)  || 0,
        name:      q.name                             || sym,
      };
    }
    return result;
  } catch { return {}; }
}

// Gemini 2.5 AI with Google Search grounding — primary source for NSE live prices
function _geminiKey() {
  return localStorage.getItem(lsKey('sp_gemini_key')) || localStorage.getItem(lsKey('sp_ai_key'));
}

async function fetchIndiaAIPrice(symbol) {
  const key = _geminiKey();
  if (!key) return null;
  try {
    const prompt = `What is the current live BSE stock price of ${symbol} in Indian Rupees right now? ` +
      `Use Google Search to find the real-time price from BSE India or Google Finance. ` +
      `Reply with ONLY this JSON (no markdown): {"price": 2847.50, "change": 23.40, "changePct": 0.83}`;
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_PRICE_MODEL}:generateContent?key=${key}`,
      { method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          contents: [{role: 'user', parts: [{text: prompt}]}],
          tools: [{google_search: {}}],
          generationConfig: {temperature: 0, maxOutputTokens: 300}
        })
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const parts = data.candidates?.[0]?.content?.parts || [];
    const text = parts.map(p => p.text || '').join('');
    const match = text.match(/\{[\s\S]*?\}/);
    if (!match) return null;
    const parsed = JSON.parse(match[0]);
    return (parsed.price > 0) ? parsed : null;
  } catch { return null; }
}

async function fetchIndiaAIBatch(symbols) {
  const key = _geminiKey();
  if (!key || !symbols.length) return {};
  const chunks = [];
  for (let i = 0; i < symbols.length; i += 8) chunks.push(symbols.slice(i, i + 8));
  const result = {};
  for (const chunk of chunks) {
    try {
      const prompt = `Use Google Search to find the current live BSE stock prices right now (in Indian Rupees ₹) for these stocks: ${chunk.join(', ')}. ` +
        `Reply with ONLY a raw JSON object, no markdown, no explanation: ` +
        `{"RELIANCE": {"price": 2847.50, "change": 23.40, "changePct": 0.83}, "TCS": {"price": 3421.00, "change": -12.50, "changePct": -0.36}}`;
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_PRICE_MODEL}:generateContent?key=${key}`,
        { method: 'POST', headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            contents: [{role: 'user', parts: [{text: prompt}]}],
            tools: [{google_search: {}}],
            generationConfig: {temperature: 0, maxOutputTokens: 1200}
          })
        }
      );
      if (!res.ok) { console.warn('Gemini price fetch error', res.status, await res.text()); continue; }
      const data = await res.json();
      const parts = data.candidates?.[0]?.content?.parts || [];
      const text = parts.map(p => p.text || '').join('');
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) { console.warn('Gemini returned no JSON:', text.slice(0, 200)); continue; }
      Object.assign(result, JSON.parse(match[0]));
    } catch(e) { console.warn('Gemini batch error:', e); }
  }
  return result;
}

// Fetch NSE prices via a visible sequential TradingView widget — one symbol at a time.
// A single 240×150 px widget at bottom-right cycles through symbols; the iframe title carries
// the live price. Widget MUST be fully visible — TradingView skips data stream for hidden elements.
async function fetchPricesViaTradingView(symbols, onProgress) {
  if (!symbols.length || typeof TradingView === 'undefined') return {};
  const results = {};
  const CONT_ID = '_tv_pricefetcher';
  let box = document.getElementById(CONT_ID);
  if (!box) {
    box = document.createElement('div');
    box.id = CONT_ID;
    box.style.cssText = 'position:fixed;right:0;bottom:0;width:240px;height:150px;z-index:9999;overflow:hidden;opacity:0;pointer-events:none';
    document.body.appendChild(box);
  }
  for (let idx = 0; idx < symbols.length; idx++) {
    const sym = symbols[idx];
    if (onProgress) onProgress(idx + 1, symbols.length, sym);
    await new Promise(resolve => {
      box.innerHTML = '';
      let done = false;
      const timer = setTimeout(resolve, 7000);
      try {
        new TradingView.widget({
          autosize: true,
          symbol: `BSE:${sym}`, interval: 'D',
          timezone: 'Asia/Kolkata', theme: 'dark', style: '1',
          locale: 'en', enable_publishing: false, withdateranges: false,
          hide_side_toolbar: true, allow_symbol_change: false,
          container_id: CONT_ID,
        });
      } catch(e) { clearTimeout(timer); resolve(); return; }
      const onIframe = iframe => {
        const titleObs = new MutationObserver(() => {
          const p = _parseTVTitle(iframe.title || '');
          if (p?.price > 0 && !done) { done = true; titleObs.disconnect(); clearTimeout(timer); results[sym] = p; resolve(); }
        });
        titleObs.observe(iframe, { attributes: true, attributeFilter: ['title'] });
        const p = _parseTVTitle(iframe.title || '');
        if (p?.price > 0 && !done) { done = true; titleObs.disconnect(); clearTimeout(timer); results[sym] = p; resolve(); }
      };
      const existing = box.querySelector('iframe');
      if (existing) { onIframe(existing); return; }
      const childObs = new MutationObserver((_, o) => {
        const iframe = box.querySelector('iframe');
        if (iframe) { o.disconnect(); onIframe(iframe); }
      });
      childObs.observe(box, { childList: true, subtree: true });
    });
  }
  const b = document.getElementById(CONT_ID);
  if (b) b.remove();
  return results;
}

// Yahoo Finance v8 chart via corsproxy.io — staggered 400 ms apart to avoid rate-limit bursts.
async function fetchYahooProxyAll(symbols) {
  if (!symbols.length) return {};
  const results = {};
  await Promise.all(symbols.map((sym, i) => new Promise(resolve => {
    setTimeout(async () => {
      // Alternate query1/query2 Yahoo hosts; both via corsproxy.io (allorigins blocks Yahoo v8)
      const host   = i % 2 === 0 ? 'query1' : 'query2';
      const target = `https://${host}.finance.yahoo.com/v8/finance/chart/${sym}.NS?interval=1d&range=1d`;
      const url    = `https://corsproxy.io/?${target}`;
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 10000);
        const res = await fetch(url, { signal: ctrl.signal });
        clearTimeout(timer);
        if (!res.ok) { resolve(); return; }
        const json = await res.json();
        const meta = json?.chart?.result?.[0]?.meta;
        const price = meta?.regularMarketPrice;
        if (price > 0) {
          const prev = meta.previousClose || meta.chartPreviousClose || price;
          results[sym] = { price, chg: price - prev, chgPct: prev > 0 ? ((price - prev) / prev) * 100 : 0 };
        }
      } catch {}
      resolve();
    }, i * 400); // 400 ms stagger — spreads 14 requests over 5.6 s, staying under Yahoo rate limits
  })));
  return results;
}

// Yahoo Finance via CORS proxy — bypasses browser CORS restrictions completely
async function fetchYahooNSProxy(symbols) {
  if (!symbols.length) return {};
  const nsSyms = symbols.map(s => `${s}.NS`).join(',');
  const target = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(nsSyms)}&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketVolume`;
  const proxies = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`,
    `https://corsproxy.io/?${encodeURIComponent(target)}`,
  ];
  for (const url of proxies) {
    try {
      const r = await fetch(url);
      if (!r.ok) { console.warn('Proxy failed:', url, r.status); continue; }
      const data = await r.json();
      const quotes = data?.quoteResponse?.result || [];
      if (!quotes.length) { console.warn('Proxy returned empty quotes'); continue; }
      const results = {};
      quotes.forEach(q => {
        const sym = (q.symbol || '').replace(/\.NS$/i, '').toUpperCase();
        const price = q.regularMarketPrice;
        if (price > 0) results[sym] = { price, chg: q.regularMarketChange ?? 0, chgPct: q.regularMarketChangePercent ?? 0, vol: q.regularMarketVolume ?? 0 };
      });
      if (Object.keys(results).length) return results;
    } catch(e) { console.warn('Proxy error:', url, e); }
  }
  return {};
}

// Yahoo Finance v8 chart — no crumb/cookie auth required, parallel per-symbol
async function fetchYahooChartIndia(symbols) {
  if (!symbols.length) return {};
  const results = {};
  await Promise.all(symbols.map(async sym => {
    for (const host of ['query1', 'query2']) {
      try {
        const r = await fetch(`https://${host}.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}.NS?interval=1d&range=1d`);
        if (!r.ok) continue;
        const data = await r.json();
        const meta = data?.chart?.result?.[0]?.meta;
        const price = meta?.regularMarketPrice;
        if (!(price > 0)) continue;
        const prev = meta?.previousClose || meta?.chartPreviousClose || price;
        results[sym] = {
          price,
          chg: price - prev,
          chgPct: prev > 0 ? ((price - prev) / prev) * 100 : 0,
          vol: meta?.regularMarketVolume || 0,
          dayHigh: meta?.regularMarketDayHigh || price,
          dayLow: meta?.regularMarketDayLow || price,
        };
        break;
      } catch {}
    }
  }));
  return results;
}

// Patch a live price into INDIA_STOCKS_DB so watchlist/screener also see fresh data
function patchIndiaDB(symbol, price, change, changePct) {
  const entry = INDIA_STOCKS_DB.find(s => s.symbol === symbol);
  if (entry) { entry.price = price; entry.chg = change; entry.chgPct = changePct; }
}

// TradingView Scanner API — same source powering the embedded screener widget.
// Fetches all NSE symbols in ONE request, no auth, no proxy, no rate limits.
async function fetchTVScannerIndia(symbols) {
  if (!symbols.length) return {};
  try {
    const res = await fetch('https://scanner.tradingview.com/india/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        symbols: { tickers: symbols.map(s => `BSE:${s}`), query: { types: [] } },
        columns: ['close', 'change', 'change_abs', 'volume']
      })
    });
    if (!res.ok) { console.warn('[TVScanner] HTTP', res.status); return {}; }
    const data = await res.json();
    const result = {};
    (data.data || []).forEach(row => {
      const sym = (row.s || '').replace(/^BSE:/, '').toUpperCase();
      const [price, changePct, changeAbs] = row.d || [];
      if (price > 0) result[sym] = { price, chg: changeAbs ?? 0, chgPct: changePct ?? 0 };
    });
    return result;
  } catch (e) { console.warn('[TVScanner] error:', e); return {}; }
}

// =====================================================================
// TWELVE DATA — US STOCKS (quotes + statistics)
// =====================================================================
const TD_KEY  = 'd8960bfcff9f4319a7c3bca134ae4b30';
const TD_BASE = 'https://api.twelvedata.com';

const PROXY_BASE = 'https://prism-finance-gold.vercel.app/api/ai';

const TD_CACHE_KEY = () => lsKey(`sp_td_${new Date().toISOString().split('T')[0]}`);

function tdCacheLoad() {
  try { return JSON.parse(localStorage.getItem(TD_CACHE_KEY()) || '{}'); } catch { return {}; }
}
function tdCacheSave(map) {
  try { localStorage.setItem(TD_CACHE_KEY(), JSON.stringify(map)); } catch {}
}

async function fetchTwelveQuote(symbols) {
  const syms = Array.isArray(symbols) ? symbols.join(',') : symbols;
  const url = `${TD_BASE}/quote?symbol=${syms}&apikey=${TD_KEY}`;
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error();
    const data = await r.json();
    if (data.status === 'error') return [];
    // Single symbol → quote object directly; multiple → object keyed by symbol
    if (!syms.includes(',')) return data.close ? [data] : [];
    return Object.values(data).filter(q => q?.close && q.status !== 'error');
  } catch { return []; }
}

async function fetchTwelveStats(symbol) {
  const url = `${TD_BASE}/statistics?symbol=${encodeURIComponent(symbol)}&apikey=${TD_KEY}`;
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error();
    const data = await r.json();
    return data.status === 'error' ? null : data;
  } catch { return null; }
}

function mapTwelveQuote(q, fallback) {
  if (!q?.close) return fallback;
  const n = v => { const f = parseFloat(v); return isNaN(f) ? null : f; };
  return {
    ...fallback,
    symbol:    fallback?.symbol    || q.symbol,
    name:      q.name              || fallback?.name,
    price:     n(q.close)          ?? fallback?.price,
    chg:       n(q.change)         ?? 0,
    chgPct:    n(q.percent_change) ?? 0,
    open:      n(q.open)           ?? null,
    prevClose: n(q.previous_close) ?? null,
    dayHigh:   n(q.high)           ?? null,
    dayLow:    n(q.low)            ?? null,
    vol:       n(q.volume)         ?? fallback?.vol    ?? 0,
    avgVol:    n(q.average_volume) ?? fallback?.avgVol ?? 0,
    w52h:      n(q.fifty_two_week?.high) ?? fallback?.w52h ?? 0,
    w52l:      n(q.fifty_two_week?.low)  ?? fallback?.w52l ?? 0,
  };
}

function mapTwelveStats(data, stock) {
  if (!data?.statistics) return stock;
  const n = v => { const f = parseFloat(v); return isNaN(f) ? null : f; };
  const vm = data.statistics.valuations_metrics    || {};
  const fi = data.statistics.financials            || {};
  const is = fi.income_statement                   || {};
  const sp = data.statistics.stock_price_summary   || {};
  const ds = data.statistics.dividends_and_splits  || {};
  return {
    ...stock,
    mcap:             n(vm.market_capitalization)            ?? stock.mcap,
    pe:               n(vm.trailing_pe)                     ?? stock.pe,
    beta:             n(sp.beta)                            ?? stock.beta,
    w52h:             n(sp['52_week_high'])                 ?? stock.w52h,
    w52l:             n(sp['52_week_low'])                  ?? stock.w52l,
    div:              ds.forward_annual_dividend_yield != null
                        ? n(ds.forward_annual_dividend_yield) * 100
                        : stock.div,
    avEPS:            n(is.diluted_eps_ttm),
    avForwardPE:      n(vm.forward_pe),
    avPEG:            n(vm.peg_ratio),
    avROE:            n(fi.return_on_equity_ttm),
    avMargin:         n(fi.profit_margin),
    avEarningsGrowth: n(is.quarterly_earnings_growth_yoy),
    avRevenueGrowth:  n(is.quarterly_revenue_growth),
    avMA50:           n(sp.day_50_ma),
    avMA200:          n(sp.day_200_ma),
    avHasData: true,
  };
}

// =====================================================================
// ALPHA VANTAGE — kept for fallback only (not actively used)
// =====================================================================
const AV_KEY  = 'P0KCU9GKEDMMJ9TL';
const AV_BASE = 'https://www.alphavantage.co/query';

// Daily localStorage key — one key per calendar day avoids repeat calls
const AV_CACHE_KEY = () => lsKey(`sp_av_${new Date().toISOString().split('T')[0]}`);

// Load today's AV cache (symbol → overview object)
function avCacheLoad() {
  try { return JSON.parse(localStorage.getItem(AV_CACHE_KEY()) || '{}'); } catch { return {}; }
}
function avCacheSave(map) {
  try { localStorage.setItem(AV_CACHE_KEY(), JSON.stringify(map)); } catch {}
}

// Fetch company overview for one symbol.  Returns raw AV object or null.
async function fetchAVOverview(symbol) {
  const url = `${AV_BASE}?function=OVERVIEW&symbol=${encodeURIComponent(symbol)}&apikey=${AV_KEY}`;
  try {
    const r = await fetch(url);
    const d = await r.json();
    // AV returns a "Note" field when rate-limited, empty object when symbol not found
    if (!d.Symbol || d.Note || d.Information) return null;
    return d;
  } catch { return null; }
}

// Parse a raw AV OVERVIEW object and merge it into a stock row.
// All AV-specific fields are prefixed `av` so they never clash with base fields.
function mergeAVOverview(ov, stock) {
  if (!ov) return stock;
  const n = v => { const f = parseFloat(v); return isNaN(f) ? null : f; };
  return {
    ...stock,
    // Override base fundamentals with AV live values when present
    name:   ov.Name   || stock.name,
    sector: ov.Sector || stock.sector,
    mcap:   n(ov.MarketCapitalization)  ?? stock.mcap,
    pe:     n(ov.TrailingPE)            ?? stock.pe,
    w52h:   n(ov['52WeekHigh'])         ?? stock.w52h,
    w52l:   n(ov['52WeekLow'])          ?? stock.w52l,
    div:    ov.DividendYield && n(ov.DividendYield) != null
              ? n(ov.DividendYield) * 100
              : stock.div,
    beta:   n(ov.Beta)                  ?? stock.beta,
    // AV-exclusive fields used in extended scoring + card display
    avEPS:            n(ov.EPS),
    avForwardPE:      n(ov.ForwardPE),
    avPEG:            n(ov.PEGRatio),
    avTargetPrice:    n(ov.AnalystTargetPrice),
    avROE:            n(ov.ReturnOnEquityTTM),
    avMargin:         n(ov.ProfitMarginTTM ?? ov.ProfitMargin),
    avEarningsGrowth: n(ov.QuarterlyEarningsGrowthYOY),
    avRevenueGrowth:  n(ov.QuarterlyRevenueGrowthYOY),
    avMA50:           n(ov['50DayMovingAverage']),
    avMA200:          n(ov['200DayMovingAverage']),
    avHasData: true,
  };
}

// =====================================================================
// INDEX CARDS & TOPBAR PILLS
// =====================================================================
const INDEX_MAP = {
  sp500:    { sym:'^GSPC',  display:'S&P 500',   base:5127.79, isIndia:false },
  nasdaq:   { sym:'^IXIC',  display:'NASDAQ',    base:16274.5, isIndia:false },
  dow:      { sym:'^DJI',   display:'DOW',       base:38503.2, isIndia:false },
  nifty:    { sym:'^NSEI',  display:'NIFTY 50',  base:22530.7, isIndia:true  },
  sensex:   { sym:'^BSESN', display:'SENSEX',    base:74105.8, isIndia:true  },
  bnifty:   { sym:'^NSEBANK',display:'BANK NIFTY',base:48236.4,isIndia:true  },
};

const indexState = {};
Object.keys(INDEX_MAP).forEach(k => {
  const m = INDEX_MAP[k];
  const chg = (Math.random()-0.38) * m.base * 0.015;
  indexState[k] = { price: m.base, chg, chgPct: chg/m.base*100 };
});

const _fmtIN1 = new Intl.NumberFormat('en-IN', { maximumFractionDigits:1 });
const _fmtIN0 = new Intl.NumberFormat('en-IN', { maximumFractionDigits:0 });
const _fmtUS2 = new Intl.NumberFormat('en-US', { maximumFractionDigits:2 });
const _fmtUS0 = new Intl.NumberFormat('en-US', { maximumFractionDigits:0 });

function updateIndexCards() {
  Object.keys(INDEX_MAP).forEach(k => {
    const m = INDEX_MAP[k];
    const s = indexState[k];
    s.price = simulatePrice(s.price, 0.0005);

    const priceEl = $(`${k}price`);
    const chgEl = $(`${k}chg`);
    if (!priceEl || !chgEl) return;

    priceEl.textContent = m.isIndia ? _fmtIN1.format(s.price) : _fmtUS2.format(s.price);
    chgEl.textContent = `${chgSign(s.chg)}${s.chgPct.toFixed(2)}%`;
    chgEl.className = 'icard-chg ' + chgClass(s.chg);

    const cardEl = $(`card-${k}`);
    if (cardEl) {
      cardEl.style.borderLeftColor = s.chg >= 0 ? 'var(--green)' : 'var(--red)';
    }
  });
  updateTopPills();
}

function updateTopPills() {
  const sp = indexState.sp500, nq = indexState.nasdaq, nf = indexState.nifty, sx = indexState.sensex;
  const pill = (id, s, isIndia) => {
    const el = $(id); if (!el) return;
    el.querySelector('.pill-val').textContent = isIndia ? _fmtIN0.format(s.price) : _fmtUS0.format(s.price);
    const chgEl = el.querySelector('.pill-chg');
    chgEl.textContent = `${chgSign(s.chg)}${s.chgPct.toFixed(2)}%`;
    chgEl.className = 'pill-chg ' + chgClass(s.chg);
  };
  pill('pillSP500',  sp, false);
  pill('pillNasdaq', nq, false);
  pill('pillNifty',  nf, true);
  pill('pillSensex', sx, true);
}

updateIndexCards();
setInterval(updateIndexCards, 10000);

// =====================================================================
// MOVERS
// =====================================================================
function renderMovers(tab) {
  if (tab) state.moversTab = tab;
  document.querySelectorAll('.ptab').forEach(b => {
    b.classList.toggle('active', b.dataset.movers === state.moversTab);
  });
  const all = [...US_STOCKS_DB, ...INDIA_STOCKS_DB].map(s => ({
    ...s,
    chg: s.chg * (1 + (Math.random()-0.5)*0.1),
    chgPct: s.chgPct * (1 + (Math.random()-0.5)*0.1),
    isIndia: !!s.w52h && s.price > 100 && INDIA_STOCKS_DB.includes(s)
  }));
  const sorted = all.sort((a,b) => state.moversTab==='gainers' ? b.chgPct-a.chgPct : a.chgPct-b.chgPct);
  const top8 = sorted.slice(0, 8);
  const isIndia = sym => INDIA_STOCKS_DB.some(s => s.symbol === sym);
  const html = top8.map(s => {
    const india = isIndia(s.symbol);
    const priceStr = india ? fmtINR(s.price) : fmtINR(s.price * USD_TO_INR);
    const newsInfo = (typeof newsState !== 'undefined') ? newsState.activeStockNews?.[s.symbol] : null;
    const badgeHtml = newsInfo ? `<span class="news-badge ${newsInfo.severity}"><i class="fa-solid fa-bolt"></i> ${newsInfo.severity.toUpperCase()}</span>` : '';
    return `<div class="mover-item" data-sym="${s.symbol}" onclick="${india?`loadIndiaQuick('${s.symbol}')`:`loadUSQuick('${s.symbol}')`}">
      <span class="mover-flag">${india?'🇮🇳':'🇺🇸'}</span>
      <span class="mover-sym">${s.symbol}${badgeHtml}</span>
      <span class="mover-name">${s.name}</span>
      <span class="mover-price">${priceStr}</span>
      <span class="mover-chg ${chgClass(s.chgPct)} ${s.chgPct>=0?'bg-positive':'bg-negative'}">${chgSign(s.chgPct)}${s.chgPct.toFixed(2)}%</span>
    </div>`;
  }).join('');
  setEl('moversList', html);
}

document.querySelectorAll('.ptab').forEach(btn => {
  btn.addEventListener('click', () => renderMovers(btn.dataset.movers));
});
renderMovers();

// =====================================================================
// DASHBOARD PORTFOLIO MINI CHART
// =====================================================================
function renderDashPortfolio() {
  const totalUSD = state.portfolio.filter(h=>h.market==='us').reduce((a,h) => a + h.qty*h.currentPrice, 0);
  const totalINR = state.portfolio.filter(h=>h.market==='india').reduce((a,h) => a + h.qty*h.currentPrice, 0);
  const investedUSD = state.portfolio.filter(h=>h.market==='us').reduce((a,h) => a + h.qty*h.buyPrice, 0);
  const investedINR = state.portfolio.filter(h=>h.market==='india').reduce((a,h) => a + h.qty*h.buyPrice, 0);
  const pnlUSD = totalUSD - investedUSD;
  const pnlINR = totalINR - investedINR;

  const totalCombINR    = totalINR + totalUSD * USD_TO_INR;
  const totalInvINR     = investedINR + investedUSD * USD_TO_INR;
  const totalPnlINR     = (pnlINR) + (pnlUSD * USD_TO_INR);
  const pct             = totalInvINR > 0 ? totalPnlINR / totalInvINR * 100 : 0;
  setEl('dashTotalValue', fmtINR(totalCombINR));
  setEl('dashTotalPnl', `${chgSign(totalPnlINR)}${fmtINR(Math.abs(totalPnlINR))} (${chgSign(pct)}${pct.toFixed(2)}%)`, 'hero-pnl ' + chgClass(totalPnlINR));

  // Mini chart
  const ctx = $('dashMiniChart');
  if (!ctx) return;
  if (state.charts.dashMini) state.charts.dashMini.destroy();
  const labels = Array.from({length:20},(_,i)=>i);
  const points = labels.map((_,i)=> {
    const base = totalInvINR > 0 ? totalInvINR : 85000;
    return base + base*0.08*(i/19) + (Math.random()-0.5)*base*0.02;
  });
  state.charts.dashMini = new Chart(ctx, {
    type:'line',
    data:{ labels, datasets:[{ data:points, borderColor:'#3fb950', borderWidth:2, fill:true,
      backgroundColor:'rgba(63,185,80,0.07)', pointRadius:0, tension:0.4 }]},
    options:{ plugins:{legend:{display:false}}, scales:{x:{display:false},y:{display:false}},
      responsive:true, animation:{duration:0} }
  });
}

// =====================================================================
// TRADINGVIEW CHARTS
// =====================================================================
function initUSChart(symbol) {
  const el = $('tv_us'); if (!el) return;
  el.innerHTML = '';
  if (typeof TradingView === 'undefined') { el.innerHTML='<div style="padding:40px;text-align:center;color:var(--text3)">Loading chart…</div>'; return; }
  try {
    state.tvUS = new TradingView.widget({
      autosize: true, symbol, interval: 'D',
      timezone: 'America/New_York', theme: 'dark', style: '1',
      locale: 'en', enable_publishing: false, withdateranges: true,
      hide_side_toolbar: false, allow_symbol_change: false,
      studies: ['RSI@tv-basicstudies','MACD@tv-basicstudies','Volume@tv-basicstudies'],
      container_id: 'tv_us'
    });
  } catch(e) { el.innerHTML = '<div style="padding:40px;text-align:center;color:var(--text3)">Chart unavailable offline</div>'; }
}

// =====================================================================
// TRADINGVIEW PRICE EXTRACTION — reads live price from iframe title
// =====================================================================
let _tvPriceObserver = null;

function _parseTVTitle(title) {
  if (!title) return null;
  // Title formats TradingView uses:
  //   "NSE:RELIANCE, 2,456.75 ▲0.43% — TradingView"
  //   "RELIANCE • 2456.75 +0.43%"
  //   "RELIANCE, 2456.75"
  const m = title.match(/[,•]\s*([\d,]+\.?\d*)/);
  if (!m) return null;
  const price = parseFloat(m[1].replace(/,/g, ''));
  if (!(price > 0)) return null;
  // Also try to extract % change from title
  const chgM = title.match(/([+\-−]?[\d.]+)\s*%/);
  const chgPct = chgM ? parseFloat(chgM[1].replace('−', '-')) : null;
  return { price, chgPct };
}

function watchTVPrice(containerEl, sym, onPrice) {
  if (_tvPriceObserver) { _tvPriceObserver.disconnect(); _tvPriceObserver = null; }
  if (!containerEl) return;

  function attachToIframe(iframe) {
    function check() {
      const parsed = _parseTVTitle(iframe.title || iframe.getAttribute('title') || '');
      if (parsed) onPrice(parsed, sym);
    }
    _tvPriceObserver = new MutationObserver(check);
    _tvPriceObserver.observe(iframe, { attributes: true, attributeFilter: ['title'] });
    check(); // check immediately in case title is already set
  }

  const existing = containerEl.querySelector('iframe');
  if (existing) {
    attachToIframe(existing);
  } else {
    const childObs = new MutationObserver((_, obs) => {
      const iframe = containerEl.querySelector('iframe');
      if (iframe) { obs.disconnect(); attachToIframe(iframe); }
    });
    childObs.observe(containerEl, { childList: true, subtree: true });
  }
}

function initIndiaChart(symbol) {
  const el = $('tv_india'); if (!el) return;
  el.innerHTML = '';
  if (typeof TradingView === 'undefined') { el.innerHTML='<div style="padding:40px;text-align:center;color:var(--text3)">Loading chart…</div>'; return; }
  try {
    state.tvIndia = new TradingView.widget({
      autosize: true, symbol, interval: 'D',
      timezone: 'Asia/Kolkata', theme: 'dark', style: '1',
      locale: 'en', enable_publishing: false,
      hide_top_toolbar: false, withdateranges: true,
      hide_side_toolbar: false, allow_symbol_change: false,
      save_image: false,
      studies: ['RSI@tv-basicstudies','MACD@tv-basicstudies','Volume@tv-basicstudies'],
      container_id: 'tv_india'
    });
  } catch(e) { el.innerHTML = '<div style="padding:40px;text-align:center;color:var(--text3)">Chart unavailable offline</div>'; }

  // Extract live price as TradingView renders the chart
  const sym = symbol.replace(/^[^:]+:/, '').toUpperCase();

  watchTVPrice(el, sym, ({ price, chgPct }) => {
    if (state.currentIndia?.symbol !== sym) return;
    const found = INDIA_STOCKS_DB.find(s => s.symbol === sym);
    const basePrice = found ? (found.price - (found.chg || 0)) : price; // estimate prev close
    const chg = chgPct != null ? price / (1 + chgPct / 100) * (chgPct / 100) : price - basePrice;
    patchIndiaDB(sym, price, chg, chgPct ?? (basePrice > 0 ? (chg / basePrice) * 100 : 0));
    setEl('indiaPriceDisplay', fmtINR(price));
    if (chgPct != null) {
      const chgEl = $('indiaChangeDisplay');
      if (chgEl) { chgEl.textContent = `${chgSign(chgPct)}${Math.abs(chgPct).toFixed(2)}%`; chgEl.className = 'sbar-change ' + chgClass(chgPct); }
    }
    // Update portfolio holding for this symbol automatically
    const holding = state.portfolio.find(h => h.market === 'india' && h.symbol === sym);
    if (holding && Math.abs(holding.currentPrice - price) > 0.01) {
      holding.currentPrice = price;
      savePortfolio();
      renderPortfolio();
    }
  });
}

// =====================================================================
// US TERMINAL
// =====================================================================

// NYSE-listed symbols — everything NOT in this set gets a bare symbol
// so TradingView auto-resolves the exchange rather than assuming NASDAQ.
// Covers every stock in US_STOCKS_DB + MCAP_RANK_US that is NYSE-listed.
const NYSE_SYMBOLS = new Set([
  // Mega-cap / blue-chip NYSE
  'V','MA','JPM','BAC','WMT','DIS','XOM','CVX','JNJ','UNH','PFE','T','VZ','KO','CRM',
  'PG','HD','MRK','IBM','GS','AXP','MS','WFC','USB','PNC','TFC','COF','C','BK',
  // Finance / Insurance
  'MCO','FIS','FI','ICE','CME','CBOE','MSCI','SPGI','BR','MMC','AON','MET','PRU','ALL','TRV',
  'BLK','SCHW','CB',
  // Healthcare / Pharma / Services
  'TMO','MDT','SYK','BDX','EW','ZBH','TFX','STE','LH','DGX','HCA','CNC','CI','HUM',
  'CVS','MCK','ABC','CAH','HOLX','BAX','IQV','LLY','ABT','BMY',
  // Consumer Discretionary
  'MCD','YUM','CMG','RCL','CCL','NCLH','MAR','HLT','NKE','TGT','TJX','ROST','DG','DLTR',
  'F','GM','TM','HMC','STLA','BWA','LEA','MGA',
  // Consumer Staples
  'CL','CHD','EL','KMB','SJM','CAG','HRL','MKC','COTY',
  // Energy
  'SLB','HAL','BKR','OXY','PSX','VLO','MPC','HES','COP','EOG','DVN','MRO','CLR',
  'APA','SM','ESTE','VTLE','XOM','CVX',
  // Industrials / Aerospace / Defence
  'BA','LMT','NOC','GD','TDG','HEI','HWM','SPR','MMM','ITW','EMR','ROK','PH',
  'IR','XYL','IDEX','ROP','AME','CSX','NSC','UNP','WAB','TRN','GBX','GATX',
  'CAT','DE','GE','HON','RTX','UPS','ETN','LOW',
  // Utilities
  'NEE','SO','DUK','AEP','EXC','SRE','PCG','ED','FE','ETR','CNP',
  // REITs
  'AMT','PLD','CCI','EQIX','DLR','PSA','AVB','EQR','O','WPC',
  // Materials
  'LIN','APD','ECL','SHW','PPG','NEM','FCX','AA','NUE','STLD',
  // Tech / Software (NYSE-listed)
  'IBM','NOW','ORCL','ACN','DELL','HPE',
  // Media & Telco
  'DIS','T','VZ','WBD',
  // Fintech
  'SQ',
  // ETFs (NYSE Arca)
  'SPY','IWM','EFA','VTI','VOO','VEA','GLD','SLV','TLT',
  'XLF','XLK','XLE','XLV','XLI','XLU','XLY','XLP','XLB','XLRE',
]);

// Returns the correct TradingView symbol string for a US stock.
// Priority: (1) live exchange already resolved from API, (2) NYSE_SYMBOLS map,
// (3) bare symbol — TradingView auto-resolves rather than wrongly assuming NASDAQ.
function tvUSSymbol(symbol) {
  const sym = symbol.toUpperCase();
  if (state.currentUS?.symbol === sym) {
    const ex = state.currentUS.exchange;
    if (ex === 'NYSE' || ex === 'NASDAQ') return `${ex}:${sym}`;
  }
  if (NYSE_SYMBOLS.has(sym)) return `NYSE:${sym}`;
  return sym; // bare — TradingView picks the right exchange
}
function fillUSStats(data) {
  if (state.currentUS && state.currentUS.symbol === data.symbol) {
    state.currentUS._snap = { price: data.price, chg: data.chg, chgPct: data.chgPct, w52h: data.w52h ?? 0, w52l: data.w52l ?? 0, sector: data.sector ?? null, pe: data.pe ?? null };
  }
  const isIndia = false;
  const p = data;
  setEl('usSymbolDisplay', p.symbol || '—');
  setEl('usNameDisplay', p.name || '—');
  setEl('usPriceDisplay', fmtUSD(p.price));
  const chgEl = $('usChangeDisplay');
  if (chgEl) {
    chgEl.textContent = `${chgSign(p.chg)}${fmtUSD(Math.abs(p.chg))} (${chgSign(p.chgPct)}${p.chgPct.toFixed(2)}%)`;
    chgEl.className = 'sbar-change ' + chgClass(p.chg);
  }
  setEl('us-open',      fmtUSD(p.open      ?? p.price * 0.998));
  setEl('us-prevclose', fmtUSD(p.prevClose ?? p.price - p.chg));
  setEl('us-high',      fmtUSD(p.dayHigh   ?? p.price * 1.008));
  setEl('us-low',       fmtUSD(p.dayLow    ?? p.price * 0.992));
  setEl('us-vol', fmtVol(p.vol));
  setEl('us-avgvol', fmtVol(p.avgVol));
  setEl('us-mcap', fmtMcap(p.mcap, false));
  setEl('us-pe', p.pe ? p.pe.toFixed(1) : '—');
  setEl('us-52h', fmtUSD(p.w52h));
  setEl('us-52l', fmtUSD(p.w52l));
  setEl('us-div', p.div ? p.div.toFixed(2)+'%' : 'N/A');
  setEl('us-beta', p.beta ? p.beta.toFixed(2) : '—');
}

function analyzeUSStock() {
  const sym = ($('usSearchInput').value || '').trim().toUpperCase();
  if (!sym) { toast('Enter a symbol first', 'error'); return; }
  loadUSQuick(sym);
}

async function loadUSQuick(symbol) {
  const found = US_STOCKS_DB.find(s => s.symbol === symbol);
  const local = found || { symbol, name: symbol, sector:'—', price:150, chg:1.2, chgPct:0.8, mcap:50e9, pe:20, vol:5e6, avgVol:5e6, div:0, beta:1, w52h:180, w52l:120 };
  state.currentUS = { symbol, name: local.name, exchange: NYSE_SYMBOLS.has(symbol) ? 'NYSE' : '' };
  fillUSStats(local);
  initUSChart(tvUSSymbol(symbol));
  if ($('usSearchInput')) $('usSearchInput').value = symbol;
  switchSection('us-terminal');

  // Fetch live data from Twelve Data — also use the confirmed exchange to correct chart if needed
  const quotes = await fetchTwelveQuote(symbol);
  if (quotes.length && state.currentUS.symbol === symbol) {
    const live = mapTwelveQuote(quotes[0], local);
    const exName = quotes[0].exchange || '';
    if (exName) {
      const resolvedEx = exName.includes('Nasdaq') ? 'NASDAQ' : exName.includes('NYSE') ? 'NYSE' : exName;
      const wasGuess = !NYSE_SYMBOLS.has(symbol); // bare symbol was used — may need correction
      if (wasGuess && (resolvedEx === 'NYSE' || resolvedEx === 'NASDAQ')) {
        state.currentUS.exchange = resolvedEx;
        initUSChart(`${resolvedEx}:${symbol}`); // re-init with confirmed exchange
      }
    }
    fillUSStats(live);
  }
}

// =====================================================================
// INDIA TERMINAL
// =====================================================================
function setIndiaExchange(ex) {
  state.indiaExchange = ex;
  document.querySelectorAll('.xbtn').forEach(b => b.classList.toggle('active', b.id === (ex==='NSE'?'nseBtn':'bseBtn')));
  const { symbol } = state.currentIndia;
  initIndiaChart(`${ex}:${symbol}`);
  // Re-fetch live stats — Yahoo Finance (.NS) first, then Twelve Data, then Gemini AI
  (async () => {
    if (state.currentIndia.symbol !== symbol) return;
    const found = INDIA_STOCKS_DB.find(s => s.symbol === symbol);
    const yahooQ = await fetchYahoo([`${symbol}.NS`]);
    const yq = yahooQ[0];
    if (yq && yq.regularMarketPrice > 0 && state.currentIndia.symbol === symbol) {
      const live = mapYahooQuote(yq, found || { symbol, name: symbol, sector: '—' });
      patchIndiaDB(symbol, live.price, live.chg, live.chgPct);
      fillIndiaStats(live);
      return;
    }
    const tdData = await fetchTwelveIndia([symbol]);
    const sd = tdData[symbol];
    if (sd && state.currentIndia.symbol === symbol) {
      const live = { ...(found || { symbol, name: sd.name || symbol }), ...sd };
      patchIndiaDB(symbol, live.price, live.chg, live.chgPct);
      fillIndiaStats(live);
    }
  })();
}

function fillIndiaStats(data) {
  if (state.currentIndia && state.currentIndia.symbol === data.symbol) {
    state.currentIndia._snap = { price: data.price, chg: data.chg, chgPct: data.chgPct, w52h: data.w52h ?? 0, w52l: data.w52l ?? 0, sector: data.sector ?? null, pe: data.pe ?? null };
  }
  setEl('indiaSymbolDisplay', data.symbol || '—');
  setEl('indiaNameDisplay', data.name || '—');
  const exEl = $('indiaExDisplay');
  if (exEl) { exEl.textContent = state.indiaExchange; }
  setEl('indiaPriceDisplay', fmtINR(data.price));
  const chgEl = $('indiaChangeDisplay');
  if (chgEl) {
    chgEl.textContent = `${chgSign(data.chg)}${fmtINR(Math.abs(data.chg))} (${chgSign(data.chgPct)}${data.chgPct.toFixed(2)}%)`;
    chgEl.className = 'sbar-change ' + chgClass(data.chg);
  }
  setEl('in-open',      fmtINR(data.open      ?? data.price * 0.998));
  setEl('in-prevclose', fmtINR(data.prevClose ?? data.price - data.chg));
  setEl('in-high',      fmtINR(data.dayHigh   ?? data.price * 1.008));
  setEl('in-low',       fmtINR(data.dayLow    ?? data.price * 0.992));
  setEl('in-vol', fmtVol(data.vol));
  setEl('in-avgvol', fmtVol(data.avgVol));
  setEl('in-mcap', fmtMcap(data.mcap, true));
  setEl('in-pe', data.pe ? data.pe.toFixed(1) : '—');
  setEl('in-52h', fmtINR(data.w52h));
  setEl('in-52l', fmtINR(data.w52l));
  setEl('in-delivery', (45 + Math.random()*30).toFixed(1) + '%');
  setEl('in-vix', (12 + Math.random()*6).toFixed(2));

  // FnO panel
  setEl('vixVal', (12+Math.random()*6).toFixed(2));
  setEl('pcrVal', (0.75+Math.random()*0.5).toFixed(2));
  const d = new Date(); d.setDate(d.getDate() + (4-d.getDay()+7)%7);
  setEl('nextExpiry', d.toLocaleDateString('en-IN',{day:'numeric',month:'short'}));
  setEl('maxPain', fmtINR(Math.round(data.price/50)*50));
}

function analyzeIndiaStock() {
  const sym = ($('indiaSearchInput').value || '').trim().toUpperCase();
  if (!sym) { toast('Enter a symbol first', 'error'); return; }
  loadIndiaQuick(sym);
}

async function refreshIndiaAI() {
  const symbol = state.currentIndia?.symbol;
  if (!symbol) { toast('Load a stock first', 'error'); return; }
  const btn = $('indiaAIRefreshBtn');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-rotate fa-spin"></i> Refreshing…'; }

  const found0 = INDIA_STOCKS_DB.find(s => s.symbol === symbol);

  // Try Yahoo Finance v8 chart first (no auth required)
  const chartData0 = await fetchYahooChartIndia([symbol]);
  const cd0 = chartData0[symbol];
  if (cd0?.price > 0 && state.currentIndia.symbol === symbol) {
    const live = { ...(found0 || { symbol, name: symbol, sector: '—' }), ...cd0 };
    patchIndiaDB(symbol, live.price, live.chg, live.chgPct);
    fillIndiaStats(live);
    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-robot"></i> AI Refresh'; }
    toast(`Live: ${symbol} → ₹${live.price.toFixed(2)}`);
    return;
  }

  // v8 failed — try Yahoo Finance v7 batch
  const yahooQ = await fetchYahoo([`${symbol}.NS`]);
  const yq = yahooQ[0];
  if (yq && yq.regularMarketPrice > 0 && state.currentIndia.symbol === symbol) {
    const live = mapYahooQuote(yq, found0 || { symbol, name: symbol, sector: '—' });
    patchIndiaDB(symbol, live.price, live.chg, live.chgPct);
    fillIndiaStats(live);
    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-robot"></i> AI Refresh'; }
    toast(`Live: ${symbol} → ₹${live.price.toFixed(2)}`);
    return;
  }

  // Both Yahoo failed — fall back to Gemini AI with Google Search
  if (btn) btn.innerHTML = '<i class="fa-brands fa-google fa-spin"></i> Checking Google…';
  setEl('indiaPriceDisplay', '⏳ AI…');
  const aiData = await fetchIndiaAIPrice(symbol);
  if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-robot"></i> AI Refresh'; }
  if (aiData && state.currentIndia.symbol === symbol) {
    const found = INDIA_STOCKS_DB.find(s => s.symbol === symbol);
    const live = { ...(found || { symbol, name: symbol }), price: aiData.price, chg: aiData.change ?? 0, chgPct: aiData.changePct ?? 0 };
    patchIndiaDB(symbol, live.price, live.chg, live.chgPct);
    fillIndiaStats(live);
    toast(`🤖 AI: ${symbol} → ₹${aiData.price.toFixed(2)}`);
  } else {
    toast('Could not fetch price — try again later', 'error');
    const found = INDIA_STOCKS_DB.find(s => s.symbol === symbol);
    if (found) fillIndiaStats(found);
  }
}

async function loadIndiaQuick(symbol) {
  const found = INDIA_STOCKS_DB.find(s => s.symbol === symbol);
  const local = found || { symbol, name: symbol, sector:'—', price:1000, chg:10, chgPct:1.0, mcap:1e12, pe:20, vol:5e6, avgVol:5e6, div:0, beta:1, w52h:1200, w52l:800 };
  state.currentIndia = { symbol, name: local.name, exchange: state.indiaExchange };
  fillIndiaStats(local);
  initIndiaChart(`${state.indiaExchange}:${symbol}`);
  if ($('indiaSearchInput')) $('indiaSearchInput').value = symbol;
  switchSection('india-terminal');

  // 1) Yahoo Finance v8 chart — no auth required
  const chartDataQ = await fetchYahooChartIndia([symbol]);
  const cdQ = chartDataQ[symbol];
  if (cdQ?.price > 0 && state.currentIndia.symbol === symbol) {
    const live = { ...local, ...cdQ };
    patchIndiaDB(symbol, live.price, live.chg, live.chgPct);
    fillIndiaStats(live);
    return;
  }

  // 2) v8 failed — Yahoo Finance v7 batch
  const yahooQ = await fetchYahoo([`${symbol}.NS`]);
  const yq = yahooQ[0];
  if (yq && yq.regularMarketPrice > 0 && state.currentIndia.symbol === symbol) {
    const live = mapYahooQuote(yq, local);
    patchIndiaDB(symbol, live.price, live.chg, live.chgPct);
    fillIndiaStats(live);
    return;
  }

  // 3) Both Yahoo failed — Twelve Data (NSE) fallback
  const tdData = await fetchTwelveIndia([symbol]);
  const sd = tdData[symbol];
  if (sd && state.currentIndia.symbol === symbol) {
    const live = { ...local, ...sd };
    if (sd.name && sd.name !== symbol) {
      state.currentIndia.name = sd.name;
      setEl('indiaNameDisplay', sd.name);
    }
    patchIndiaDB(symbol, live.price, live.chg, live.chgPct);
    fillIndiaStats(live);
    return;
  }

  // 4) All failed — try Gemini AI with Google Search
  setEl('indiaPriceDisplay', '⏳ AI…');
  const aiData = await fetchIndiaAIPrice(symbol);
  if (aiData && state.currentIndia.symbol === symbol) {
    const live = { ...local, price: aiData.price, chg: aiData.change ?? 0, chgPct: aiData.changePct ?? 0 };
    patchIndiaDB(symbol, live.price, live.chg, live.chgPct);
    fillIndiaStats(live);
    toast(`🤖 AI price: ₹${aiData.price.toFixed(2)} for ${symbol}`);
  }
}

// Render sector heatmap
function renderSectorHeatmap() {
  const html = INDIA_SECTORS.map(s => {
    const cls = s.chg >= 0 ? 'bg-positive' : 'bg-negative';
    const col = s.chg >= 0 ? 'var(--green-dim)' : 'var(--red-dim)';
    return `<div class="heat-cell" style="background:${col}">
      <span class="heat-name">${s.name}</span>
      <span class="heat-chg ${chgClass(s.chg)}">${chgSign(s.chg)}${s.chg.toFixed(1)}%</span>
    </div>`;
  }).join('');
  setEl('sectorHeatmap', html);
}

// =====================================================================
// SEARCH AUTOCOMPLETE — live API search (Twelve Data / Yahoo Finance)
// =====================================================================

function closeDrop(id) { const el = $(id); if (el) el.className = 'search-dropdown'; }

function debounce(fn, delay) {
  let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), delay); };
}

// Close dropdowns when clicking outside
document.addEventListener('click', e => {
  [['usSearchInput','usSearchDrop'],['indiaSearchInput','indiaSearchDrop'],
   ['watchSymbolInput','watchSearchDrop'],['fSymbol','portSearchDrop'],
   ['picksSearchInput','picksSearchDrop']
  ].forEach(([inId, dropId]) => {
    const inp = $(inId), drop = $(dropId);
    if (drop && drop.classList.contains('open') &&
        !(inp && inp.contains(e.target)) && !drop.contains(e.target))
      drop.className = 'search-dropdown';
  });
});

// ── Live search helpers ────────────────────────────────────────────────
async function searchUS(query) {
  const q = query.toUpperCase();
  const local = SEARCH_DB
    .filter(s => s.market === 'us' && (s.symbol.includes(q) || s.name.toUpperCase().includes(q)))
    .map(s => ({ symbol: s.symbol, name: s.name, market: 'us' }));
  try {
    const url = `${TD_BASE}/symbol_search?symbol=${encodeURIComponent(query)}&outputsize=10&apikey=${TD_KEY}`;
    const r = await fetch(url); if (!r.ok) return local;
    const data = await r.json(); if (data.status !== 'ok') return local;
    const api = (data.data || [])
      .filter(s => s.country === 'United States' &&
        ['Common Stock','ETF','American Depositary Receipt','Exchange Traded Fund'].includes(s.instrument_type))
      .map(s => ({ symbol: s.symbol, name: s.instrument_name, market: 'us' }));
    const seen = new Set(local.map(s => s.symbol));
    return [...local, ...api.filter(s => !seen.has(s.symbol))].slice(0, 8);
  } catch { return local; }
}

async function searchIndia(query) {
  const q = query.toUpperCase();
  const local = SEARCH_DB
    .filter(s => s.market === 'india' && (s.symbol.includes(q) || s.name.toUpperCase().includes(q)))
    .map(s => ({ symbol: s.symbol, name: s.name, market: 'india' }));
  try {
    const url = `${TD_BASE}/symbol_search?symbol=${encodeURIComponent(query)}&outputsize=12&apikey=${TD_KEY}`;
    const r = await fetch(url); if (!r.ok) return local;
    const data = await r.json(); if (data.status !== 'ok') return local;
    const api = (data.data || [])
      .filter(s => s.country === 'India' && s.exchange === 'BSE' && !s.symbol.includes('.'))
      .map(s => ({ symbol: s.symbol, name: s.instrument_name, market: 'india' }));
    const seen = new Set(local.map(s => s.symbol));
    return [...local, ...api.filter(s => !seen.has(s.symbol))].slice(0, 8);
  } catch { return local; }
}

function dropHtml(hits) {
  return hits.map(s => {
    const flag = s.market === 'us' ? '🇺🇸 US' : '🇮🇳 India';
    const cls  = s.market === 'us' ? 'us' : 'india';
    return `<div class="search-item" data-symbol="${s.symbol}" data-name="${(s.name||s.symbol).replace(/"/g,'&quot;')}" data-market="${s.market}">
      <span class="search-item-sym">${s.symbol}</span>
      <span class="search-item-name">${s.name || ''}</span>
      <span class="search-item-mkt ${cls}">${flag}</span>
    </div>`;
  }).join('');
}

// ── US Terminal ────────────────────────────────────────────────────────
const usTermIn = $('usSearchInput'), usTermDrop = $('usSearchDrop');
const doUSSearch = debounce(async query => {
  if (!query) { closeDrop('usSearchDrop'); return; }
  const hits = await searchUS(query);
  if (!hits.length || usTermIn.value.trim().toUpperCase() !== query.toUpperCase()) return;
  usTermDrop.innerHTML = dropHtml(hits);
  usTermDrop.className = 'search-dropdown open';
  usTermDrop.querySelectorAll('.search-item').forEach(el =>
    el.addEventListener('click', () => termSearchSelect('us', el.dataset.symbol))
  );
}, 350);
usTermIn && usTermIn.addEventListener('input', () => doUSSearch(usTermIn.value.trim()));
usTermIn && usTermIn.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeDrop('usSearchDrop'); return; }
  if (e.key === 'Enter') {
    const sym = usTermIn.value.trim().toUpperCase(); if (!sym) return;
    closeDrop('usSearchDrop'); loadUSQuick(sym);
  }
});

// ── India Terminal ─────────────────────────────────────────────────────
const inTermIn = $('indiaSearchInput'), inTermDrop = $('indiaSearchDrop');
const doIndiaSearch = debounce(async query => {
  if (!query) { closeDrop('indiaSearchDrop'); return; }
  const hits = await searchIndia(query);
  if (!hits.length || inTermIn.value.trim().toUpperCase() !== query.toUpperCase()) return;
  inTermDrop.innerHTML = dropHtml(hits);
  inTermDrop.className = 'search-dropdown open';
  inTermDrop.querySelectorAll('.search-item').forEach(el =>
    el.addEventListener('click', () => termSearchSelect('india', el.dataset.symbol))
  );
}, 350);
inTermIn && inTermIn.addEventListener('input', () => doIndiaSearch(inTermIn.value.trim()));
inTermIn && inTermIn.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeDrop('indiaSearchDrop'); return; }
  if (e.key === 'Enter') {
    const sym = inTermIn.value.trim().toUpperCase(); if (!sym) return;
    closeDrop('indiaSearchDrop'); loadIndiaQuick(sym);
  }
});

// ── Watchlist Modal ────────────────────────────────────────────────────
const wlIn = $('watchSymbolInput'), wlDrop = $('watchSearchDrop');
if (wlIn && wlDrop) {
  const doWlSearch = debounce(async query => {
    if (!query) { closeDrop('watchSearchDrop'); return; }
    const mkt = document.querySelector('input[name="watchMkt"]:checked')?.value || 'us';
    const hits = mkt === 'us' ? await searchUS(query) : await searchIndia(query);
    if (!hits.length || wlIn.value.trim().toUpperCase() !== query.toUpperCase()) return;
    wlDrop.innerHTML = dropHtml(hits);
    wlDrop.className = 'search-dropdown open';
    wlDrop.querySelectorAll('.search-item').forEach(el =>
      el.addEventListener('click', () => watchSearchSelect(el.dataset.symbol))
    );
  }, 350);
  wlIn.addEventListener('input', () => doWlSearch(wlIn.value.trim()));
  wlIn.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrop('watchSearchDrop'); });
  document.querySelectorAll('input[name="watchMkt"]').forEach(r =>
    r.addEventListener('change', () => { wlIn.value = ''; closeDrop('watchSearchDrop'); })
  );
}

// ── Portfolio Modal ────────────────────────────────────────────────────
const portIn = $('fSymbol'), portDrop = $('portSearchDrop');
if (portIn && portDrop) {
  const doPortSearch = debounce(async query => {
    if (!query) { closeDrop('portSearchDrop'); return; }
    const mkt = $('modalMarket')?.value || 'us';
    const hits = mkt === 'us' ? await searchUS(query) : await searchIndia(query);
    if (!hits.length || portIn.value.trim().toUpperCase() !== query.toUpperCase()) return;
    portDrop.innerHTML = dropHtml(hits);
    portDrop.className = 'search-dropdown open';
    portDrop.querySelectorAll('.search-item').forEach(el =>
      el.addEventListener('click', () => portSearchSelect(el.dataset.symbol, el.dataset.name, '—', 0))
    );
  }, 350);
  portIn.addEventListener('input', () => doPortSearch(portIn.value.trim()));
  portIn.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrop('portSearchDrop'); });
  const addModalBox = document.querySelector('#addModal .modal-box');
  if (addModalBox) {
    addModalBox.addEventListener('click', e => {
      if (!portIn.contains(e.target) && !portDrop.contains(e.target)) closeDrop('portSearchDrop');
    });
  }
}

// ── Picks Search Bar ──────────────────────────────────────────────────
const picksIn = $('picksSearchInput'), picksDrop = $('picksSearchDrop');
if (picksIn && picksDrop) {
  const doPicksSearch = debounce(async query => {
    if (!query) { closeDrop('picksSearchDrop'); return; }
    const isIndia = picksState.market === 'india';
    const hits = isIndia ? await searchIndia(query) : await searchUS(query);
    if (!hits.length || picksIn.value.trim().toUpperCase() !== query.toUpperCase()) return;
    picksDrop.innerHTML = dropHtml(hits);
    picksDrop.className = 'search-dropdown open';
    picksDrop.querySelectorAll('.search-item').forEach(el =>
      el.addEventListener('click', () => {
        picksIn.value = el.dataset.symbol;
        closeDrop('picksSearchDrop');
        searchStockReport(el.dataset.symbol);
      })
    );
  }, 350);
  picksIn.addEventListener('input', () => doPicksSearch(picksIn.value.trim()));
  picksIn.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeDrop('picksSearchDrop'); return; }
    if (e.key === 'Enter') { picksSearchSubmit(); }
  });
}

function picksSearchSubmit() {
  const sym = (picksIn?.value || '').trim();
  if (!sym) return;
  closeDrop('picksSearchDrop');
  searchStockReport(sym);
}

// ── Select callbacks ───────────────────────────────────────────────────
function termSearchSelect(market, symbol) {
  closeDrop(market === 'us' ? 'usSearchDrop' : 'indiaSearchDrop');
  if (market === 'us') { if (usTermIn) usTermIn.value = symbol; loadUSQuick(symbol); }
  else                 { if (inTermIn) inTermIn.value = symbol; loadIndiaQuick(symbol); }
}

function watchSearchSelect(symbol) {
  if (wlIn) wlIn.value = symbol;
  closeDrop('watchSearchDrop');
}

let _portSelectedMeta = null;

async function portSearchSelect(symbol, name, sector, price) {
  portIn.value = symbol;
  if ($('fName')) $('fName').value = name || symbol;
  _portSelectedMeta = { symbol, name: name || symbol, sector: null, chgPct: 0, w52h: 0, w52l: 0, pe: null };
  const sEl = $('fSector');
  const localStock = SEARCH_DB.find(s => s.symbol === symbol);
  if (sEl && localStock?.sector) {
    const o = Array.from(sEl.options).find(o => o.value === localStock.sector);
    if (o) sEl.value = localStock.sector;
    _portSelectedMeta.sector = localStock.sector;
  }
  const priceEl = $('fPrice');
  if (priceEl) {
    const localPrice = localStock?.price || price;
    if (localPrice) {
      priceEl.value = localPrice;
      if (localStock) _portSelectedMeta = { symbol, name: localStock.name || name || symbol, sector: localStock.sector ?? null, chgPct: localStock.chgPct ?? 0, w52h: localStock.w52h ?? 0, w52l: localStock.w52l ?? 0, pe: localStock.pe ?? null };
      updateInvestPreview();
    } else {
      priceEl.placeholder = 'Fetching price…';
      const mkt = $('modalMarket')?.value || 'us';
      try {
        if (mkt === 'us') {
          const q = await fetchTwelveQuote(symbol);
          if (q.length) {
            priceEl.value = parseFloat(q[0].close).toFixed(2);
            const m = mapTwelveQuote(q[0], { symbol });
            _portSelectedMeta = { symbol, name: m.name || name || symbol, sector: null, chgPct: m.chgPct ?? 0, w52h: m.w52h ?? 0, w52l: m.w52l ?? 0, pe: null };
            updateInvestPreview();
          }
        } else {
          const tdResult = await fetchTwelveIndia([symbol]);
          const q = tdResult[symbol];
          if (q) {
            priceEl.value = q.price.toFixed(2);
            _portSelectedMeta = { symbol, name: q.name || name || symbol, sector: null, chgPct: q.chgPct ?? 0, w52h: q.w52h ?? 0, w52l: q.w52l ?? 0, pe: null };
            updateInvestPreview();
          }
        }
      } catch {} finally { priceEl.placeholder = ''; }
    }
  }
  closeDrop('portSearchDrop');
  setTimeout(() => { const q = $('fQty'); if (q) q.focus(); }, 50);
}

// =====================================================================
// GLOBAL SEARCH
// =====================================================================
const gsInput = $('globalSearch');
const gsDropdown = $('searchDropdown');

gsInput && gsInput.addEventListener('keydown', e => {
  if (e.key === 'Escape') { gsDropdown.className = 'search-dropdown'; gsInput.value = ''; return; }
  if (e.key === 'Enter') {
    const sym = gsInput.value.trim().toUpperCase(); if (!sym) return;
    const first = gsDropdown.querySelector('.search-item');
    if (first) { handleSearchClick(first.dataset.market, first.dataset.symbol); }
    else { handleSearchClick('us', sym); }
  }
});

const doGsSearch = debounce(async query => {
  if (!query) { gsDropdown.className = 'search-dropdown'; return; }
  const [usHits, indiaHits] = await Promise.all([searchUS(query), searchIndia(query)]);
  if (gsInput.value.trim().toUpperCase() !== query.toUpperCase()) return;
  const hits = [...usHits, ...indiaHits].slice(0, 8);
  if (!hits.length) { gsDropdown.className = 'search-dropdown'; return; }
  gsDropdown.innerHTML = dropHtml(hits);
  gsDropdown.className = 'search-dropdown open';
  gsDropdown.querySelectorAll('.search-item').forEach(el =>
    el.addEventListener('click', () => handleSearchClick(el.dataset.market, el.dataset.symbol))
  );
}, 350);

gsInput && gsInput.addEventListener('input', () => doGsSearch(gsInput.value.trim()));

document.addEventListener('click', e => {
  if (!gsInput.contains(e.target) && !gsDropdown.contains(e.target)) {
    gsDropdown.className = 'search-dropdown';
  }
});

function handleSearchClick(market, symbol) {
  gsDropdown.className = 'search-dropdown';
  gsInput.value = '';
  if (market === 'us') loadUSQuick(symbol);
  else loadIndiaQuick(symbol);
}

// =====================================================================
// PORTFOLIO
// =====================================================================
function getCurrentPrice(holding) {
  return holding.currentPrice || holding.buyPrice;
}

function getDayChange(holding) {
  const db = holding.market === 'us' ? US_STOCKS_DB : INDIA_STOCKS_DB;
  const found = db.find(s => s.symbol === holding.symbol);
  if (found) return found.chgPct;
  return holding.dayChgPct ?? 0;
}

function renderPortfolio() {
  // Update prices
  state.portfolio.forEach(h => { h.dayChgPct = getDayChange(h); });

  const filter = state.portfolioFilter;
  let holdings = [...state.portfolio];
  if (filter === 'us') holdings = holdings.filter(h => h.market === 'us');
  if (filter === 'india') holdings = holdings.filter(h => h.market === 'india');
  if (filter === 'profit') holdings = holdings.filter(h => h.currentPrice > h.buyPrice);
  if (filter === 'loss') holdings = holdings.filter(h => h.currentPrice < h.buyPrice);

  const allUS = state.portfolio.filter(h => h.market==='us');
  const allIN = state.portfolio.filter(h => h.market==='india');
  const totalUS = allUS.reduce((a,h) => a + h.qty*h.currentPrice, 0);
  const totalIN = allIN.reduce((a,h) => a + h.qty*h.currentPrice, 0);
  const investUS = allUS.reduce((a,h) => a + h.qty*h.buyPrice, 0);
  const investIN = allIN.reduce((a,h) => a + h.qty*h.buyPrice, 0);
  const pnlUS = totalUS - investUS;
  const pnlIN = totalIN - investIN;
  const totalCombINR    = totalUS * USD_TO_INR + totalIN;
  const investedCombINR = investUS * USD_TO_INR + investIN;
  const totalPnlINR     = pnlUS * USD_TO_INR + pnlIN;
  const pct             = investedCombINR > 0 ? totalPnlINR / investedCombINR * 100 : 0;
  setEl('portTotalVal', fmtINR(totalCombINR));
  const pnlEl = $('portTotalPnl');
  if (pnlEl) { pnlEl.textContent = `${chgSign(totalPnlINR)}${fmtINR(Math.abs(totalPnlINR))} (${chgSign(pct)}${Math.abs(pct).toFixed(2)}%)`; pnlEl.className = 'pov-sub ' + chgClass(totalPnlINR); }
  setEl('portUSVal', fmtINR(totalUS * USD_TO_INR));
  setEl('portUSPnl', `${chgSign(pnlUS)}${fmtINR(Math.abs(pnlUS * USD_TO_INR))}`);
  setEl('portIndiaVal', fmtINR(totalIN));
  setEl('portIndiaPnl', `${chgSign(pnlIN)}${fmtINR(Math.abs(pnlIN))}`);

  // Total P&L breakdown card
  const pnlBigEl = $('portTotalPnlBig');
  if (pnlBigEl) { pnlBigEl.textContent = `${chgSign(totalPnlINR)}${fmtINR(Math.abs(totalPnlINR))} (${chgSign(pct)}${Math.abs(pct).toFixed(2)}%)`; pnlBigEl.className = 'pov-value ' + chgClass(totalPnlINR); }
  const usPnlCardEl = $('portUSPnlCard');
  if (usPnlCardEl) { usPnlCardEl.textContent = `${chgSign(pnlUS)}${fmtUSD(Math.abs(pnlUS))}`; usPnlCardEl.className = 'pov-pnl-val ' + chgClass(pnlUS); }
  const inPnlCardEl = $('portIndiaPnlCard');
  if (inPnlCardEl) { inPnlCardEl.textContent = `${chgSign(pnlIN)}${fmtINR(Math.abs(pnlIN))}`; inPnlCardEl.className = 'pov-pnl-val ' + chgClass(pnlIN); }

  setEl('portHoldingsCount', state.portfolio.length);

  // Holdings table
  const body = $('holdingsBody');
  if (!body) return;
  if (!holdings.length) {
    body.innerHTML = `<tr><td colspan="12" class="empty-td"><div class="empty-state"><i class="fa-solid fa-briefcase"></i><p>No holdings match this filter.</p></div></td></tr>`;
  } else {
    const renderRow = (h, i) => {
      const realIdx = state.portfolio.indexOf(h);
      const currVal = h.qty * h.currentPrice;
      const invested = h.qty * h.buyPrice;
      const pnl = currVal - invested;
      const pnlPct = invested > 0 ? pnl/invested*100 : 0;
      const isIndia = h.market === 'india';
      const fmt2 = isIndia ? fmtINR : fmtUSD;
      return `<tr>
        <td><span class="td-sym">${h.symbol}</span></td>
        <td class="td-name">${h.name}</td>
        <td>${isIndia?'🇮🇳':'🇺🇸'}</td>
        <td class="td-num td-price-edit" title="Click to update quantity" onclick="editQty(this,${realIdx})">${h.qty} <span style="font-size:9px;opacity:0.4;margin-left:2px">✎</span></td>
        <td class="td-num td-price-edit" title="Click to update buy price" onclick="editBuyPrice(this,${realIdx})">${fmt2(h.buyPrice)} <span style="font-size:9px;opacity:0.4;margin-left:2px">✎</span></td>
        <td class="td-num td-price-edit" title="Click to update current price" onclick="editCurrentPrice(this,${realIdx})">${fmt2(h.currentPrice)}${isIndia ? ' <span class="eod-tag">EOD</span>' : ''} <span style="font-size:9px;opacity:0.4;margin-left:2px">✎</span></td>
        <td class="td-num">${fmt2(invested)}</td>
        <td class="td-num">${fmt2(currVal)}</td>
        <td class="td-num ${chgClass(pnl)}">${chgSign(pnl)}${fmt2(Math.abs(pnl))}</td>
        <td class="td-num ${chgClass(pnlPct)}">${chgSign(pnlPct)}${pnlPct.toFixed(2)}%</td>
        <td class="td-num ${chgClass(h.dayChgPct)}">${chgSign(h.dayChgPct)}${(h.dayChgPct||0).toFixed(2)}%</td>
        <td>
          <div class="row-actions">
            <button class="btn-row-sm btn-view" onclick="${isIndia?`loadIndiaQuick('${h.symbol}')`:`loadUSQuick('${h.symbol}')`}">View</button>
            <button class="btn-row-sm btn-delete" onclick="deleteHolding(${realIdx})"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>`;
    };

    const sectionHeader = (flag, label, count, pnlVal, pnlPct) =>
      `<tr class="holdings-section-hdr">
        <td colspan="12">
          <span class="hsh-flag">${flag}</span>
          <span class="hsh-label">${label}</span>
          <span class="hsh-count">${count} stock${count !== 1 ? 's' : ''}</span>
          <span class="hsh-pnl ${chgClass(pnlVal)}">${chgSign(pnlVal)}${fmtINR(Math.abs(pnlVal))} (${chgSign(pnlPct)}${Math.abs(pnlPct).toFixed(2)}%)</span>
        </td>
      </tr>`;

    if (filter === 'all') {
      const indiaHoldings = holdings.filter(h => h.market === 'india');
      const usHoldings    = holdings.filter(h => h.market === 'us');
      let html = '';

      if (indiaHoldings.length) {
        const inv = indiaHoldings.reduce((a,h) => a + h.qty*h.buyPrice, 0);
        const cur = indiaHoldings.reduce((a,h) => a + h.qty*h.currentPrice, 0);
        const p = cur - inv; const pp = inv > 0 ? p/inv*100 : 0;
        html += sectionHeader('🇮🇳', 'India Holdings', indiaHoldings.length, p, pp);
        html += indiaHoldings.map(renderRow).join('');
      }
      if (usHoldings.length) {
        const inv = usHoldings.reduce((a,h) => a + h.qty*h.buyPrice, 0);
        const cur = usHoldings.reduce((a,h) => a + h.qty*h.currentPrice, 0);
        const p = (cur - inv) * USD_TO_INR; const pp = inv > 0 ? (cur-inv)/inv*100 : 0;
        html += sectionHeader('🇺🇸', 'US Holdings', usHoldings.length, p, pp);
        html += usHoldings.map(renderRow).join('');
      }
      body.innerHTML = html;
    } else {
      body.innerHTML = holdings.map(renderRow).join('');
    }
  }

  renderPortfolioCharts();
  renderRecentTransactions();
  renderDashPortfolio();
  renderPortfolioTabs();
}

function deleteHolding(idx) {
  if (!confirm('Remove this holding?')) return;
  state.portfolio.splice(idx, 1);
  savePortfolio();
  renderPortfolio();
  toast('Holding removed');
}

// Fetch one Yahoo Finance v8 chart price via CORS proxy (corsproxy.io → allorigins fallback)
async function _fetchYahooV8Proxy(yahooSymbol) {
  const target = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=1d&range=1d`;
  // corsproxy.io expects the raw URL after '?' (not encoded); allorigins needs encoded url= param
  const proxies = [
    `https://corsproxy.io/?${target}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`,
  ];
  for (const url of proxies) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 10000);
      const res = await fetch(url, { signal: ctrl.signal });
      clearTimeout(timer);
      if (!res.ok) { console.warn(`[NSE] ${yahooSymbol} HTTP ${res.status}`); continue; }
      const json = await res.json();
      const meta = json?.chart?.result?.[0]?.meta;
      const price = meta?.regularMarketPrice;
      if (!(price > 0)) { console.warn(`[NSE] ${yahooSymbol} no price`, json); continue; }
      const prev = meta.previousClose || meta.chartPreviousClose || price;
      return { price, chg: price - prev, chgPct: prev > 0 ? ((price - prev) / prev) * 100 : 0 };
    } catch(e) { console.warn(`[NSE] proxy error for ${yahooSymbol}:`, e.message); }
  }
  return null;
}

// Local proxy server (node server.js on port 3001) — bypasses Yahoo CORS restrictions.
// Returns { SYMBOL: { price, chg, chgPct } } for resolved symbols.
// Silently returns {} in ~3 s if the proxy isn't running.
async function fetchLocalProxy(symbols, market = 'india') {
  if (!symbols.length) return {};
  const results = {};
  await Promise.all(symbols.map(async sym => {
    const suffixes = market === 'india' ? ['.NS', '.BO'] : [''];
    for (const suffix of suffixes) {
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 3000);
        const res = await fetch(`http://localhost:3001/price/${sym}${suffix}`, { signal: ctrl.signal });
        clearTimeout(timer);
        if (!res.ok) continue;
        const d = await res.json();
        if (!(d?.price > 0)) continue;
        const chgPct = parseFloat(d.changePct) || 0;
        const chg    = d.change ?? (d.price - (d.prevClose || d.price));
        results[sym] = { price: d.price, chg, chgPct };
        break;
      } catch {}
    }
  }));
  return results;
}

async function fetchLivePrices() {
  if (!state.portfolio.length) return;
  const btn = document.getElementById('livePricesBtn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Updating...';
  }

  try {
    let updated = 0;
    const failed = [];

    // ── US: Twelve Data batch → local proxy fallback ─────────────────────
    const usHoldings = state.portfolio.filter(h => h.market === 'us');
    if (usHoldings.length) {
      const usUpdated = new Set();
      try {
        const symStr = usHoldings.map(h => h.symbol).join(',');
        const res = await fetch(`${TD_BASE}/price?symbol=${encodeURIComponent(symStr)}&apikey=${TD_KEY}`);
        const data = await res.json();
        usHoldings.forEach(h => {
          const entry = usHoldings.length === 1 ? data : data[h.symbol];
          const price = parseFloat(entry?.price);
          if (price > 0) { h.currentPrice = price; updated++; usUpdated.add(h.symbol); }
        });
      } catch(e) { console.warn('US Twelve Data error:', e); }

      const usMissing = usHoldings.filter(h => !usUpdated.has(h.symbol));
      if (usMissing.length) {
        const proxyData = await fetchLocalProxy(usMissing.map(h => h.symbol), 'us');
        for (const h of usMissing) {
          const d = proxyData[h.symbol];
          if (d?.price > 0) { h.currentPrice = d.price; updated++; }
          else { failed.push(h.symbol); }
        }
      }
    }

    // ── India: Yahoo Finance batch → Yahoo v8 per-symbol → Gemini AI ────
    const indiaHoldings = state.portfolio.filter(h => h.market === 'india');
    if (indiaHoldings.length) {
      if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Fetching India prices…';

      const indiaSymbols = indiaHoldings.map(h =>
        h.symbol.toUpperCase().replace(/\.NS$|\.BO$/g, '').replace(/^NSE:|^BSE:/g, '')
      );
      const indiaUpdated = new Set();

      // Helper: apply a price result map {SYMBOL: {price, chg, chgPct}} to holdings
      function _applyIndiaPrices(priceMap) {
        indiaHoldings.forEach(h => {
          const sym = h.symbol.toUpperCase().replace(/\.NS$|\.BO$/g, '').replace(/^NSE:|^BSE:/g, '');
          const d = priceMap[sym];
          if (d?.price > 0 && !indiaUpdated.has(sym)) {
            h.currentPrice = d.price;
            h.dayChgPct = d.chgPct ?? 0;
            patchIndiaDB(sym, d.price, d.chg ?? 0, d.chgPct ?? 0);
            indiaUpdated.add(sym);
            updated++;
          }
        });
      }

      // Tier 1: Yahoo Finance v7 batch via CORS proxies (allorigins → corsproxy.io)
      try {
        const yahooData = await fetchYahooNSProxy(indiaSymbols);
        if (Object.keys(yahooData).length) _applyIndiaPrices(yahooData);
      } catch(e) { console.warn('Yahoo NSProxy error:', e); }

      // Tier 2: Yahoo Finance v8 chart per-symbol for anything still missing
      const stillMissing = indiaSymbols.filter(s => !indiaUpdated.has(s));
      if (stillMissing.length) {
        if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Fetching India prices…';
        try {
          const chartData = await fetchYahooChartIndia(stillMissing);
          if (Object.keys(chartData).length) _applyIndiaPrices(chartData);
        } catch(e) { console.warn('Yahoo chart error:', e); }
      }

      // Tier 3: Gemini AI with Google Search for anything still missing
      const stillMissing2 = indiaSymbols.filter(s => !indiaUpdated.has(s));
      if (stillMissing2.length) {
        if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Asking Gemini…';
        const missingHoldings = indiaHoldings.filter(h => {
          const sym = h.symbol.toUpperCase().replace(/\.NS$|\.BO$/g, '').replace(/^NSE:|^BSE:/g, '');
          return !indiaUpdated.has(sym);
        });
        const stockList = missingHoldings.map(h => `${h.symbol} (${h.name})`).join(', ');
        const prompt = `Find the latest NSE stock prices for: ${stockList}.
Reply with ONLY a raw JSON object, no markdown, no extra text:
{"RELIANCE": 2850.50, "TCS": 3421.00}
Use the plain NSE symbol as key. Skip any stock you cannot find.`;

        try {
          let responseText = null;

          // Try user key first, then Vercel proxy
          const userKey = _geminiKey();
          if (userKey) {
            const res = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${userKey}`,
              { method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [{ role: 'user', parts: [{ text: prompt }] }],
                  tools: [{ google_search: {} }],
                  generationConfig: { temperature: 0, maxOutputTokens: 1000 }
                }) }
            );
            if (res.ok) {
              const d = await res.json();
              responseText = (d.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('');
            }
          }
          if (!responseText) {
            const res = await fetch(PROXY_BASE, {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                tools: [{ google_search: {} }],
                generationConfig: { temperature: 0, maxOutputTokens: 1000 }
              })
            });
            if (res.ok) {
              const d = await res.json();
              responseText = (d.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('')
                || d.reply || d.text || '';
            }
          }

          if (responseText) {
            // Extract only the first {...} block (avoid grounding metadata)
            const match = responseText.match(/\{[^{}]*\}/);
            if (match) {
              try {
                const prices = JSON.parse(match[0]);
                missingHoldings.forEach(h => {
                  const sym = h.symbol.toUpperCase().replace(/\.NS$|\.BO$/g, '').replace(/^NSE:|^BSE:/g, '');
                  const price = parseFloat(prices[sym] || prices[h.symbol]);
                  if (price > 0) {
                    const prev = h.currentPrice || h.buyPrice;
                    h.currentPrice = price;
                    h.dayChgPct = prev > 0 ? ((price - prev) / prev) * 100 : 0;
                    patchIndiaDB(sym, price, price - prev, h.dayChgPct);
                    indiaUpdated.add(sym);
                    updated++;
                  } else { failed.push(h.symbol); }
                });
              } catch(e) { missingHoldings.forEach(h => failed.push(h.symbol)); }
            } else { missingHoldings.forEach(h => failed.push(h.symbol)); }
          } else { missingHoldings.forEach(h => failed.push(h.symbol)); }
        } catch(e) {
          missingHoldings.forEach(h => failed.push(h.symbol));
          console.warn('Gemini price error:', e);
        }
      }

      // Anything never resolved
      indiaHoldings.forEach(h => {
        const sym = h.symbol.toUpperCase().replace(/\.NS$|\.BO$/g, '').replace(/^NSE:|^BSE:/g, '');
        if (!indiaUpdated.has(sym) && !failed.includes(h.symbol)) failed.push(h.symbol);
      });
    }

    savePortfolio();
    renderPortfolio();

    let msg = `Updated ${updated} of ${state.portfolio.length} holdings`;
    if (failed.length) msg += ` — ${failed.length} not found`;
    toast(msg, failed.length && updated === 0 ? 'error' : failed.length ? 'warning' : 'success');

  } catch (e) {
    toast('Update failed: ' + e.message, 'error');
  }

  if (btn) {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-rotate"></i> Live Prices';
  }
}

function editQty(cell, idx) {
  const h = state.portfolio[idx];
  if (!h) return;
  const input = document.createElement('input');
  input.type = 'number'; input.step = '0.001'; input.min = '0.001'; input.value = h.qty;
  input.style.cssText = 'width:80px;background:var(--bg3);color:var(--text);border:1px solid var(--accent);border-radius:4px;padding:2px 6px;font-size:13px;text-align:right';
  cell.innerHTML = '';
  cell.appendChild(input);
  input.focus(); input.select();

  function commit() {
    const val = parseFloat(input.value);
    if (!isNaN(val) && val > 0) {
      h.qty = val;
      savePortfolio(); renderPortfolio();
      toast(`${h.symbol} quantity updated to ${val}`);
    } else { renderPortfolio(); }
  }
  input.addEventListener('blur', commit);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') renderPortfolio(); });
}

function editBuyPrice(cell, idx) {
  const h = state.portfolio[idx];
  if (!h) return;
  const isIndia = h.market === 'india';
  const input = document.createElement('input');
  input.type = 'number'; input.step = '0.01'; input.value = h.buyPrice.toFixed(2);
  input.style.cssText = 'width:90px;background:var(--bg3);color:var(--text);border:1px solid var(--accent);border-radius:4px;padding:2px 6px;font-size:13px;text-align:right';
  cell.innerHTML = '';
  cell.appendChild(input);
  input.focus(); input.select();

  function commit() {
    const val = parseFloat(input.value);
    if (!isNaN(val) && val > 0) {
      h.buyPrice = val;
      savePortfolio(); renderPortfolio();
      toast(`${h.symbol} avg buy updated to ${isIndia ? '₹' : '$'}${val.toFixed(2)}`);
    } else { renderPortfolio(); }
  }
  input.addEventListener('blur', commit);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') renderPortfolio(); });
}

function editCurrentPrice(cell, idx) {
  const h = state.portfolio[idx];
  if (!h) return;
  const isIndia = h.market === 'india';
  const input = document.createElement('input');
  input.type = 'number';
  input.step = '0.01';
  input.value = h.currentPrice.toFixed(2);
  input.style.cssText = 'width:90px;background:var(--bg3);color:var(--text);border:1px solid var(--accent);border-radius:4px;padding:2px 6px;font-size:13px;text-align:right';
  cell.innerHTML = '';
  cell.appendChild(input);
  input.focus();
  input.select();

  function commit() {
    const val = parseFloat(input.value);
    if (!isNaN(val) && val > 0) {
      h.currentPrice = val;
      savePortfolio();
      renderPortfolio();
      toast(`${h.symbol} price updated to ${isIndia ? '₹' : '$'}${val.toFixed(2)}`);
    } else {
      renderPortfolio();
    }
  }
  input.addEventListener('blur', commit);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') renderPortfolio(); });
}

function renderPortfolioCharts() {
  const colors = ['#58a6ff','#3fb950','#f97316','#d29922','#bc8cff','#ff7b72','#56d364','#79c0ff','#ffa657','#f78166'];
  const holdings = state.portfolio;

  const donutOpts = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#8b949e', boxWidth: 10, boxHeight: 10, padding: 10, font: { size: 11 } }
      }
    },
    responsive: true, maintainAspectRatio: false, animation: { duration: 0 },
    cutout: '68%'
  };

  if (!holdings.length) {
    ['alloc','split','sector'].forEach(k => { if (state.charts[k]) { state.charts[k].destroy(); state.charts[k] = null; } });
    return;
  }

  // Holdings allocation
  const allocCtx = $('allocChart');
  if (allocCtx) {
    if (state.charts.alloc) state.charts.alloc.destroy();
    state.charts.alloc = new Chart(allocCtx, {
      type: 'doughnut',
      data: { labels: holdings.map(h => h.symbol), datasets: [{ data: holdings.map(h => h.qty * h.currentPrice), backgroundColor: colors, borderWidth: 0 }] },
      options: { ...donutOpts }
    });
  }

  // Market split
  const splitCtx = $('mktSplitChart');
  if (splitCtx) {
    if (state.charts.split) state.charts.split.destroy();
    const usVal = holdings.filter(h => h.market === 'us').reduce((a, h) => a + h.qty * h.currentPrice * USD_TO_INR, 0);
    const inVal = holdings.filter(h => h.market === 'india').reduce((a, h) => a + h.qty * h.currentPrice, 0);
    state.charts.split = new Chart(splitCtx, {
      type: 'doughnut',
      data: { labels: ['US', 'India'], datasets: [{ data: [usVal, inVal], backgroundColor: ['#58a6ff', '#f97316'], borderWidth: 0 }] },
      options: { ...donutOpts }
    });
  }

  // Sector breakdown
  const sectorCtx = $('sectorBreakChart');
  if (sectorCtx) {
    if (state.charts.sector) state.charts.sector.destroy();
    const sectors = {};
    holdings.forEach(h => { const v = h.qty * h.currentPrice; sectors[h.sector || 'Other'] = (sectors[h.sector || 'Other'] || 0) + v; });
    const sKeys = Object.keys(sectors);
    state.charts.sector = new Chart(sectorCtx, {
      type: 'doughnut',
      data: { labels: sKeys, datasets: [{ data: sKeys.map(k => sectors[k]), backgroundColor: colors, borderWidth: 0 }] },
      options: { ...donutOpts }
    });
  }
}

function renderRecentTransactions() {
  const txEl = $('recentTxList');
  if (!txEl) return;
  const recent = [...state.portfolio].slice(-5).reverse();
  if (!recent.length) { txEl.innerHTML='<div class="empty-state"><i class="fa-regular fa-clock"></i><p>No recent activity</p></div>'; return; }
  txEl.innerHTML = recent.map(h => {
    const isIndia = h.market==='india';
    const total = (isIndia?'₹':'$') + (h.qty*h.buyPrice).toLocaleString(isIndia?'en-IN':'en-US',{maximumFractionDigits:2});
    return `<div class="tx-item">
      <div class="tx-icon buy"><i class="fa-solid fa-plus"></i></div>
      <div class="tx-info">
        <div class="tx-sym">${h.symbol} <span style="font-size:11px;color:var(--text3)">${isIndia?'🇮🇳':'🇺🇸'}</span></div>
        <div class="tx-detail">${h.qty} shares @ ${isIndia?'₹':'$'}${h.buyPrice} · ${h.date||'Today'}</div>
      </div>
      <div class="tx-amount positive">${total}</div>
    </div>`;
  }).join('');
}

// Portfolio filter pills
document.querySelectorAll('.fpill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.fpill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.portfolioFilter = btn.dataset.hfilter;
    renderPortfolio();
  });
});

// =====================================================================
// ADD STOCK MODAL
// =====================================================================
function openAddModal(market, prefill={}) {
  $('modalMarket').value = market;
  $('modalTitle').textContent = market==='us' ? '🇺🇸 Add US Stock' : '🇮🇳 Add India Stock';
  $('fCurrLabel').textContent = market==='india' ? '₹' : '$';
  $('fSymbol').value = prefill.symbol || '';
  $('fName').value = prefill.name || '';
  closeDrop('portSearchDrop');
  $('fDate').value = new Date().toISOString().split('T')[0];
  $('fQty').value = '';
  $('fPrice').value = '';
  updateInvestPreview();
  $('addModal').className = 'modal-overlay open';
  setTimeout(() => { if (portIn) portIn.focus(); }, 50);
}

function closeModal() {
  $('addModal').className = 'modal-overlay';
  closeDrop('portSearchDrop');
}

function updateInvestPreview() {
  const qty = parseFloat($('fQty').value) || 0;
  const price = parseFloat($('fPrice').value) || 0;
  const market = $('modalMarket').value;
  const total = qty * price;
  const fmt2 = market==='india' ? fmtINR : fmtUSD;
  setEl('investPreviewVal', fmt2(total));
}

$('fQty') && $('fQty').addEventListener('input', updateInvestPreview);

function submitAddStock() {
  const symbol = ($('fSymbol').value||'').trim().toUpperCase();
  const name = ($('fName').value||'').trim() || symbol;
  const sector = $('fSector').value;
  const qty = parseFloat($('fQty').value);
  const buyPrice = parseFloat($('fPrice').value);
  const date = $('fDate').value;
  const market = $('modalMarket').value;

  if (!symbol) { toast('Enter a symbol', 'error'); return; }
  if (!qty || qty <= 0) { toast('Enter a valid quantity', 'error'); return; }
  if (!buyPrice || buyPrice <= 0) { toast('Enter a valid buy price', 'error'); return; }

  const existing = state.portfolio.find(h => h.symbol===symbol && h.market===market);
  if (existing) {
    const totalQty = existing.qty + qty;
    const avgPrice = (existing.qty*existing.buyPrice + qty*buyPrice) / totalQty;
    existing.qty = totalQty;
    existing.buyPrice = avgPrice;
    existing.currentPrice = getCurrentPrice(existing);
    toast(`Updated ${symbol} — avg price: ${market==='india'?'₹':'$'}${avgPrice.toFixed(2)}`);
  } else {
    const dbRef = (market === 'us' ? US_STOCKS_DB : INDIA_STOCKS_DB).find(s => s.symbol === symbol);
    const meta = (_portSelectedMeta && _portSelectedMeta.symbol === symbol) ? _portSelectedMeta : {};
    const seedPrice = dbRef ? dbRef.price : buyPrice;
    const holding = {
      symbol, name, sector, market, qty, buyPrice, date,
      currentPrice: seedPrice,
      dayChgPct: dbRef ? (dbRef.chgPct ?? 0) : (meta.chgPct ?? 0),
      metaW52h: dbRef ? (dbRef.w52h ?? 0) : (meta.w52h ?? 0),
      metaW52l: dbRef ? (dbRef.w52l ?? 0) : (meta.w52l ?? 0),
      metaPe:   dbRef ? (dbRef.pe   ?? null) : (meta.pe ?? null),
    };
    holding.currentPrice = getCurrentPrice(holding);
    state.portfolio.push(holding);
    toast(`Added ${symbol} to portfolio`);
  }
  _portSelectedMeta = null;

  savePortfolio();
  closeModal();
  if (state.section === 'portfolio') renderPortfolio();
  renderDashPortfolio();
  renderRecentTransactions();
}

// =====================================================================
// WATCHLIST — MULTI-LIST SYSTEM
// =====================================================================

// ── Storage helpers ──────────────────────────────────────────────────
function loadWatchlistsFromStorage() {
  try {
    const raw = localStorage.getItem(lsKey('sp_watchlists'));
    if (raw) return JSON.parse(raw);
  } catch {}
  // Migrate data from before per-user keys were introduced
  try {
    const legacy = localStorage.getItem('sp_watchlists');
    if (legacy) {
      localStorage.setItem(lsKey('sp_watchlists'), legacy);
      return JSON.parse(legacy);
    }
  } catch {}
  // Migrate old single-list format
  const old = JSON.parse(localStorage.getItem(lsKey('sp_watchlist')) || localStorage.getItem('sp_watchlist') || '[]');
  return { 'My Watchlist': old };
}

// ── Active list accessor ─────────────────────────────────────────────
function activeList() {
  return state.watchlists[state.activeWatchlist] || [];
}

// ── Init ─────────────────────────────────────────────────────────────
function initWatchlists() {
  state.watchlists = loadWatchlistsFromStorage();
  const saved = localStorage.getItem(lsKey('sp_activeWatchlist'));
  state.activeWatchlist = (saved && state.watchlists[saved]) ? saved : Object.keys(state.watchlists)[0] || 'My Watchlist';
  if (!state.watchlists[state.activeWatchlist]) {
    state.watchlists[state.activeWatchlist] = [];
  }
}

// ── CRUD ─────────────────────────────────────────────────────────────
function createWatchlist(name) {
  name = name.trim();
  if (!name) return;
  if (state.watchlists[name]) { toast(`"${name}" already exists`, 'error'); return; }
  state.watchlists[name] = [];
  state.activeWatchlist = name;
  saveWatchlists();
  renderWatchlistTabs();
  renderWatchlist();
  toast(`Created "${name}"`);
}

function renameWatchlist(oldName, newName) {
  newName = newName.trim();
  if (!newName || newName === oldName) return;
  if (state.watchlists[newName]) { toast(`"${newName}" already exists`, 'error'); return; }
  const entries = Object.entries(state.watchlists);
  const rebuilt = {};
  entries.forEach(([k, v]) => { rebuilt[k === oldName ? newName : k] = v; });
  state.watchlists = rebuilt;
  if (state.activeWatchlist === oldName) state.activeWatchlist = newName;
  saveWatchlists();
  renderWatchlistTabs();
  renderWatchlist();
  toast(`Renamed to "${newName}"`);
}

function deleteActiveWatchlist() {
  const keys = Object.keys(state.watchlists);
  if (keys.length <= 1) { toast('Cannot delete the only watchlist', 'error'); return; }
  if (!confirm(`Delete "${state.activeWatchlist}"?`)) return;
  delete state.watchlists[state.activeWatchlist];
  state.activeWatchlist = Object.keys(state.watchlists)[0];
  saveWatchlists();
  renderWatchlistTabs();
  renderWatchlist();
  toast('Watchlist deleted');
}

function duplicateWatchlist() {
  let name = state.activeWatchlist + ' (Copy)';
  let n = 2;
  while (state.watchlists[name]) { name = state.activeWatchlist + ` (Copy ${n++})`; }
  state.watchlists[name] = activeList().map(w => ({ ...w }));
  state.activeWatchlist = name;
  saveWatchlists();
  renderWatchlistTabs();
  renderWatchlist();
  toast(`Duplicated as "${name}"`);
}

function setActiveWatchlist(name) {
  if (!state.watchlists[name]) return;
  state.activeWatchlist = name;
  saveWatchlists();
  renderWatchlistTabs();
  renderWatchlist();
}

function deleteWatchlistByName(name) {
  const keys = Object.keys(state.watchlists);
  if (keys.length <= 1) { toast('Cannot delete the only watchlist', 'error'); return; }
  if (!confirm(`Delete "${name}"?`)) return;
  const wasActive = name === state.activeWatchlist;
  delete state.watchlists[name];
  if (wasActive) state.activeWatchlist = Object.keys(state.watchlists)[0];
  saveWatchlists();
  renderWatchlistTabs();
  renderWatchlist();
  toast(`Deleted "${name}"`);
}

function removeFromWatchlist(idx) {
  activeList().splice(idx, 1);
  saveWatchlists();
  renderWatchlistTabs();
  renderWatchlist();
}

// ── Tabs render ───────────────────────────────────────────────────────
function renderWatchlistTabs() {
  const container = $('wlTabs'); if (!container) return;
  container.innerHTML = Object.keys(state.watchlists).map(name => {
    const count = state.watchlists[name].length;
    const isActive = name === state.activeWatchlist;
    const safe = name.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
    return `<div class="wl-tab${isActive?' active':''}">
      <button class="wl-tab-btn" onclick="setActiveWatchlist('${safe}')">
        <span class="wl-tab-name">${name}</span>
        <span class="wl-tab-count">${count}</span>
      </button>
      <div class="wl-tab-opts">
        <button class="wl-tab-opt" onclick="event.stopPropagation();openWlNameModal('rename','${safe}')" title="Rename"><i class="fa-solid fa-pen"></i></button>
        <button class="wl-tab-opt" onclick="event.stopPropagation();deleteWatchlistByName('${safe}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`;
  }).join('');

  const list = activeList();
  const nameEl = $('wlActiveName');
  const countEl = $('wlActiveCount');
  if (nameEl) nameEl.textContent = state.activeWatchlist;
  if (countEl) countEl.textContent = list.length + ' stock' + (list.length !== 1 ? 's' : '');
  const titleEl = $('wlTableTitle');
  const tableCountEl = $('wlTableCount');
  if (titleEl) titleEl.textContent = state.activeWatchlist;
  if (tableCountEl) tableCountEl.textContent = list.length + ' stock' + (list.length !== 1 ? 's' : '');
}

// ── Name modal ────────────────────────────────────────────────────────
let _wlModalMode = 'create';
let _wlModalTarget = null;

function openWlNameModal(mode, targetName) {
  _wlModalMode = mode;
  _wlModalTarget = targetName || state.activeWatchlist;
  const modal = $('wlNameModal'); if (!modal) return;
  $('wlNameModalTitle').textContent = mode === 'create' ? 'New Watchlist' : 'Rename Watchlist';
  const input = $('wlNameInput');
  input.value = mode === 'create' ? '' : _wlModalTarget;
  modal.className = 'modal-overlay open';
  setTimeout(() => input.focus(), 50);
}

function closeWlNameModal() { const m = $('wlNameModal'); if (m) m.className = 'modal-overlay'; }

function submitWlName() {
  const name = ($('wlNameInput').value || '').trim();
  if (!name) { toast('Enter a name', 'error'); return; }
  closeWlNameModal();
  if (_wlModalMode === 'create') createWatchlist(name);
  else renameWatchlist(_wlModalTarget, name);
}

// =====================================================================
// PORTFOLIO — MULTI-PORTFOLIO SYSTEM
// =====================================================================

function loadPortfoliosFromStorage() {
  try {
    const raw = localStorage.getItem(lsKey('sp_portfolios'));
    if (raw) return JSON.parse(raw);
  } catch {}
  // Migrate data from before per-user keys were introduced
  try {
    const legacy = localStorage.getItem('sp_portfolios');
    if (legacy) {
      localStorage.setItem(lsKey('sp_portfolios'), legacy);
      return JSON.parse(legacy);
    }
  } catch {}
  // Migrate old single-portfolio format
  const old = JSON.parse(localStorage.getItem(lsKey('sp_portfolio')) || localStorage.getItem('sp_portfolio') || '[]');
  return { 'My Portfolio': old };
}

function initPortfolios() {
  state.portfolios = loadPortfoliosFromStorage();
  const saved = localStorage.getItem(lsKey('sp_activePortfolio'));
  state.activePortfolio = (saved && state.portfolios[saved]) ? saved : Object.keys(state.portfolios)[0] || 'My Portfolio';
  if (!state.portfolios[state.activePortfolio]) state.portfolios[state.activePortfolio] = [];
  state.portfolio = state.portfolios[state.activePortfolio];
}

function createPortfolio(name) {
  name = name.trim(); if (!name) return;
  if (state.portfolios[name]) { toast(`"${name}" already exists`, 'error'); return; }
  state.portfolios[name] = [];
  state.activePortfolio = name;
  state.portfolio = state.portfolios[name];
  savePortfolio(); renderPortfolioTabs(); renderPortfolio();
  toast(`Created "${name}"`);
}

function renamePortfolio(oldName, newName) {
  newName = newName.trim();
  if (!newName || newName === oldName) return;
  if (state.portfolios[newName]) { toast(`"${newName}" already exists`, 'error'); return; }
  const rebuilt = {};
  Object.entries(state.portfolios).forEach(([k, v]) => { rebuilt[k === oldName ? newName : k] = v; });
  state.portfolios = rebuilt;
  if (state.activePortfolio === oldName) state.activePortfolio = newName;
  state.portfolio = state.portfolios[state.activePortfolio];
  savePortfolio(); renderPortfolioTabs(); renderPortfolio();
  toast(`Renamed to "${newName}"`);
}

function deleteActivePortfolio() {
  if (!confirm(`Delete "${state.activePortfolio}"?`)) return;
  delete state.portfolios[state.activePortfolio];
  if (!Object.keys(state.portfolios).length) state.portfolios['My Portfolio'] = [];
  state.activePortfolio = Object.keys(state.portfolios)[0];
  state.portfolio = state.portfolios[state.activePortfolio];
  savePortfolio(); renderPortfolioTabs(); renderPortfolio();
  toast('Portfolio deleted');
}

function duplicatePortfolio() {
  let name = state.activePortfolio + ' (Copy)'; let n = 2;
  while (state.portfolios[name]) { name = state.activePortfolio + ` (Copy ${n++})`; }
  state.portfolios[name] = state.portfolio.map(h => ({ ...h }));
  state.activePortfolio = name;
  state.portfolio = state.portfolios[name];
  savePortfolio(); renderPortfolioTabs(); renderPortfolio();
  toast(`Duplicated as "${name}"`);
}

function setActivePortfolio(name) {
  if (!state.portfolios[name]) return;
  state.activePortfolio = name;
  state.portfolio = state.portfolios[name];
  savePortfolio(); renderPortfolioTabs(); renderPortfolio();
}

function deletePortfolioByName(name) {
  if (!confirm(`Delete "${name}"?`)) return;
  const wasActive = name === state.activePortfolio;
  delete state.portfolios[name];
  if (!Object.keys(state.portfolios).length) state.portfolios['My Portfolio'] = [];
  if (wasActive) { state.activePortfolio = Object.keys(state.portfolios)[0]; state.portfolio = state.portfolios[state.activePortfolio]; }
  savePortfolio(); renderPortfolioTabs(); renderPortfolio();
  toast(`Deleted "${name}"`);
}

function renderPortfolioTabs() {
  const container = $('pfTabs'); if (!container) return;
  container.innerHTML = Object.keys(state.portfolios).map(name => {
    const count = state.portfolios[name].length;
    const isActive = name === state.activePortfolio;
    const safe = name.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
    return `<div class="wl-tab${isActive?' active':''}">
      <button class="wl-tab-btn" onclick="setActivePortfolio('${safe}')">
        <span class="wl-tab-name">${name}</span>
        <span class="wl-tab-count">${count}</span>
      </button>
      <div class="wl-tab-opts">
        <button class="wl-tab-opt" onclick="event.stopPropagation();openPfNameModal('rename','${safe}')" title="Rename"><i class="fa-solid fa-pen"></i></button>
        <button class="wl-tab-opt" onclick="event.stopPropagation();deletePortfolioByName('${safe}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`;
  }).join('');
  const nameEl = $('pfActiveName'), countEl = $('pfActiveCount');
  if (nameEl) nameEl.textContent = state.activePortfolio;
  if (countEl) { const n = state.portfolio.length; countEl.textContent = n + ' holding' + (n !== 1 ? 's' : ''); }
}

let _pfModalMode = 'create', _pfModalTarget = null;

function openPfNameModal(mode, targetName) {
  _pfModalMode = mode;
  _pfModalTarget = targetName || state.activePortfolio;
  const modal = $('pfNameModal'); if (!modal) return;
  $('pfNameModalTitle').textContent = mode === 'create' ? 'New Portfolio' : 'Rename Portfolio';
  const input = $('pfNameInput');
  input.value = mode === 'create' ? '' : _pfModalTarget;
  modal.className = 'modal-overlay open';
  setTimeout(() => input.focus(), 50);
}

function closePfNameModal() { const m = $('pfNameModal'); if (m) m.className = 'modal-overlay'; }

function submitPfName() {
  const name = ($('pfNameInput').value || '').trim();
  if (!name) { toast('Enter a name', 'error'); return; }
  closePfNameModal();
  if (_pfModalMode === 'create') createPortfolio(name);
  else renamePortfolio(_pfModalTarget, name);
}

// ── Move/Copy stock modal ─────────────────────────────────────────────
let _movingStock = null;

function openMoveModal(stockIdx) {
  const list = activeList();
  _movingStock = { ...list[stockIdx], _srcIdx: stockIdx };
  if (!_movingStock.symbol) return;

  const targets = Object.keys(state.watchlists).filter(n => n !== state.activeWatchlist);
  const modal = $('moveStockModal'); if (!modal) return;
  $('moveStockName').textContent = _movingStock.symbol;

  const targetsEl = $('moveMoveTargets');
  if (!targets.length) {
    targetsEl.innerHTML = '<p style="color:var(--text3);font-size:13px;padding:8px 0">No other lists. Create one first.</p>';
  } else {
    targetsEl.innerHTML = targets.map(name => {
      const count = state.watchlists[name].length;
      const safe = name.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
      return `<div class="wl-move-target">
        <span class="wl-move-target-name">${name}</span>
        <span class="wl-move-target-count">${count} stocks</span>
        <div style="display:flex;gap:6px;flex-shrink:0">
          <button class="btn-primary" style="font-size:11px;padding:4px 10px" onclick="moveStock('${safe}',false)">Move</button>
          <button class="btn-outline" style="font-size:11px;padding:4px 10px" onclick="moveStock('${safe}',true)">Copy</button>
        </div>
      </div>`;
    }).join('');
  }
  modal.className = 'modal-overlay open';
}

function closeMoveModal() {
  const m = $('moveStockModal'); if (m) m.className = 'modal-overlay';
  _movingStock = null;
}

function moveStock(targetListName, copyOnly) {
  if (!_movingStock) return;
  const target = state.watchlists[targetListName];
  if (!target) return;
  const { symbol, market, name } = _movingStock;
  if (target.find(w => w.symbol === symbol && w.market === market)) {
    toast(`${symbol} already in "${targetListName}"`, 'error'); return;
  }
  target.push({ symbol, market, name });
  if (!copyOnly) {
    const src = state.watchlists[state.activeWatchlist];
    const idx = src.findIndex(w => w.symbol === symbol && w.market === market);
    if (idx >= 0) src.splice(idx, 1);
  }
  saveWatchlists();
  closeMoveModal();
  renderWatchlistTabs();
  renderWatchlist();
  toast(`${symbol} ${copyOnly ? 'copied to' : 'moved to'} "${targetListName}"`);
}

// ── Export CSV ────────────────────────────────────────────────────────
function exportWatchlistCSV() {
  const list = activeList();
  if (!list.length) { toast('Watchlist is empty', 'error'); return; }
  const headers = ['Symbol','Company','Market','LTP','1D Chg%','52W High','52W Low','Sector','P/E'];
  const rows = list.map(w => {
    const isIndia = w.market === 'india';
    const db = isIndia ? INDIA_STOCKS_DB : US_STOCKS_DB;
    const found = db.find(s => s.symbol === w.symbol);
    return [
      w.symbol, `"${w.name}"`, w.market.toUpperCase(),
      found ? found.price.toFixed(2) : '',
      found ? found.chgPct.toFixed(2) + '%' : '',
      found ? found.w52h : '', found ? found.w52l : '',
      found ? found.sector : '', found ? found.pe : ''
    ].join(',');
  });
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${state.activeWatchlist.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  toast(`Exported "${state.activeWatchlist}" as CSV`);
}

// ── View toggle ───────────────────────────────────────────────────────
let watchlistView = 'cards';
function setWatchlistView(mode) {
  watchlistView = mode;
  const cardsEl = $('watchlistGrid');
  const tableEl = $('watchlistTableCard');
  const btnCards = $('wlViewCards');
  const btnTable = $('wlViewTable');
  if (mode === 'cards') {
    if (cardsEl) cardsEl.style.display = '';
    if (tableEl) tableEl.style.display = 'none';
    if (btnCards) btnCards.classList.add('active');
    if (btnTable) btnTable.classList.remove('active');
  } else {
    if (cardsEl) cardsEl.style.display = 'none';
    if (tableEl) tableEl.style.display = '';
    if (btnCards) btnCards.classList.remove('active');
    if (btnTable) btnTable.classList.add('active');
    renderWatchlistTable();
  }
}

// ── Add stock modal ───────────────────────────────────────────────────
function openAddWatchModal() {
  const sel = $('watchTargetList');
  if (sel) {
    sel.innerHTML = Object.keys(state.watchlists).map(name =>
      `<option value="${name}"${name === state.activeWatchlist ? ' selected' : ''}>${name}</option>`
    ).join('');
  }
  $('watchSymbolInput').value = '';
  $('watchModal').className = 'modal-overlay open';
  setTimeout(() => $('watchSymbolInput').focus(), 50);
}

function closeWatchModal() {
  $('watchModal').className = 'modal-overlay';
  if (wlIn) wlIn.value = '';
  closeDrop('watchSearchDrop');
}

function submitWatchStock() {
  const sym = ($('watchSymbolInput').value || '').trim().toUpperCase();
  const market = document.querySelector('input[name="watchMkt"]:checked').value;
  const targetName = ($('watchTargetList') ? $('watchTargetList').value : null) || state.activeWatchlist;
  if (!sym) { toast('Enter a symbol', 'error'); return; }
  const db = market === 'us' ? US_STOCKS_DB : INDIA_STOCKS_DB;
  const found = db.find(s => s.symbol === sym);
  const targetList = state.watchlists[targetName];
  if (!targetList) return;
  if (targetList.find(w => w.symbol === sym && w.market === market)) {
    toast(`${sym} already in "${targetName}"`); closeWatchModal(); return;
  }
  const snap = found || {};
  targetList.push({
    market, symbol: sym, name: found?.name || sym,
    price: snap.price ?? null, chgPct: snap.chgPct ?? 0, chg: snap.chg ?? 0,
    w52h: snap.w52h ?? 0, w52l: snap.w52l ?? 0, sector: snap.sector ?? '—', pe: snap.pe ?? null,
  });
  state.activeWatchlist = targetName;
  saveWatchlists();
  closeWatchModal();
  renderWatchlistTabs();
  renderWatchlist();
  toast(`${sym} added to "${targetName}"`);
}

// ── watchCurrent (from terminal Watch buttons) ────────────────────────
function watchCurrent(market) {
  const stock = market === 'us' ? state.currentUS : state.currentIndia;
  const sym = stock.symbol;
  const list = activeList();
  if (list.find(w => w.symbol === sym && w.market === market)) {
    toast(`${sym} already in "${state.activeWatchlist}"`); return;
  }
  const db = market === 'us' ? US_STOCKS_DB : INDIA_STOCKS_DB;
  const dbFound = db.find(s => s.symbol === sym);
  const snap = dbFound || stock._snap || {};
  list.push({
    market, symbol: sym, name: stock.name,
    price: snap.price ?? null, chgPct: snap.chgPct ?? 0, chg: snap.chg ?? 0,
    w52h: snap.w52h ?? 0, w52l: snap.w52l ?? 0, sector: snap.sector ?? '—', pe: snap.pe ?? null,
  });
  saveWatchlists();
  renderWatchlistTabs();
  if (state.section === 'watchlist') renderWatchlist();
  toast(`${sym} added to "${state.activeWatchlist}"`);
}

// ── Render cards view ─────────────────────────────────────────────────
function renderWatchlist() {
  renderWatchlistTabs();
  const list = activeList();

  if (watchlistView === 'table') { renderWatchlistTable(); return; }

  const grid = $('watchlistGrid'); if (!grid) return;
  if (!list.length) {
    grid.innerHTML = '<div class="empty-state full-empty"><i class="fa-regular fa-star"></i><p>This watchlist is empty — add stocks using the button above</p></div>';
    return;
  }
  grid.innerHTML = list.map((w, i) => {
    const isIndia = w.market === 'india';
    const db = isIndia ? INDIA_STOCKS_DB : US_STOCKS_DB;
    const dbFound = db.find(s => s.symbol === w.symbol);
    const found = dbFound || (w.price != null ? w : null);
    const price = found ? found.price : null;
    const chgPct = found ? found.chgPct : 0;
    const priceStr = price == null ? '—' : isIndia ? fmtINR(price) : fmtUSD(price);
    const safeSym = w.symbol.replace(/'/g, "\\'");
    const safeName = (w.name || w.symbol).replace(/'/g, "\\'");
    const newsInfo = (typeof newsState !== 'undefined') ? newsState.activeStockNews?.[w.symbol] : null;
    const newsHtml = newsInfo ? `<span class="news-badge ${newsInfo.severity}" style="font-size:9px;padding:2px 5px;margin-left:4px"><i class="fa-solid fa-bolt"></i></span>` : '';
    return `<div class="watch-card${isIndia ? ' india' : ''}" onclick="${isIndia ? `loadIndiaQuick('${safeSym}')` : `loadUSQuick('${safeSym}')`}" data-sym="${w.symbol}">
      <button class="watch-remove" onclick="event.stopPropagation();removeFromWatchlist(${i})" title="Remove"><i class="fa-solid fa-xmark"></i></button>
      <div class="watch-sym">${w.symbol}${newsHtml}</div>
      <div class="watch-name">${w.name}</div>
      <div class="watch-price ${chgClass(chgPct)}">${priceStr}</div>
      <div class="watch-chg ${chgClass(chgPct)}">${chgSign(chgPct)}${chgPct.toFixed(2)}%</div>
      <div class="watch-card-actions">
        <button class="wc-act-btn" onclick="event.stopPropagation();openMoveModal(${i})" title="Move/Copy to another list"><i class="fa-solid fa-right-left"></i> Move</button>
        <button class="wc-act-btn" onclick="event.stopPropagation();openAddModal('${w.market}',{symbol:'${safeSym}',name:'${safeName}'})" title="Add to Portfolio">+ Port</button>
        <button class="wc-act-btn wc-del" onclick="event.stopPropagation();removeFromWatchlist(${i})" title="Remove from list"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`;
  }).join('');
}

// ── Render table view ─────────────────────────────────────────────────
function renderWatchlistTable() {
  const body = $('watchlistTableBody'); if (!body) return;
  const list = activeList();
  if (!list.length) {
    body.innerHTML = `<tr><td colspan="11" class="empty-td"><div class="empty-state"><i class="fa-regular fa-star"></i><p>No stocks in this watchlist</p></div></td></tr>`;
    return;
  }
  body.innerHTML = list.map((w, i) => {
    const isIndia = w.market === 'india';
    const db = isIndia ? INDIA_STOCKS_DB : US_STOCKS_DB;
    const dbFound = db.find(s => s.symbol === w.symbol);
    const found = dbFound || (w.price != null ? w : null);
    const price = found ? found.price : null;
    const chgPct = found ? found.chgPct : 0;
    const chg = found ? found.chg : 0;
    const fmt2 = isIndia ? fmtINR : fmtUSD;
    const priceStr = price == null ? '—' : fmt2(price);
    const newsInfo = (typeof newsState !== 'undefined') ? newsState.activeStockNews?.[w.symbol] : null;
    const newsBadge = newsInfo ? `<span class="news-badge ${newsInfo.severity}" style="margin-left:4px"><i class="fa-solid fa-bolt"></i></span>` : '';
    const safeSym = w.symbol.replace(/'/g, "\\'");
    const safeName = (w.name || w.symbol).replace(/'/g, "\\'");
    return `<tr data-sym="${w.symbol}">
      <td><span class="td-sym" style="cursor:pointer" onclick="${isIndia ? `loadIndiaQuick('${safeSym}')` : `loadUSQuick('${safeSym}')`}">${w.symbol}${newsBadge}</span></td>
      <td class="td-name">${w.name}</td>
      <td>${isIndia ? '🇮🇳 NSE' : '🇺🇸 US'}</td>
      <td class="td-num" style="font-weight:600">${priceStr}</td>
      <td class="td-num ${chgClass(chg)}">${chgSign(chg)}${fmt2(Math.abs(chg))}</td>
      <td class="td-num ${chgClass(chgPct)}">${chgSign(chgPct)}${chgPct.toFixed(2)}%</td>
      <td class="td-num positive">${found ? fmt2(found.w52h) : '—'}</td>
      <td class="td-num negative">${found ? fmt2(found.w52l) : '—'}</td>
      <td>${found ? `<span class="td-sector">${found.sector}</span>` : '—'}</td>
      <td class="td-num">${found && found.pe ? found.pe.toFixed(1) : '—'}</td>
      <td>
        <div class="row-actions">
          <button class="btn-row-sm btn-view" onclick="${isIndia ? `loadIndiaQuick('${safeSym}')` : `loadUSQuick('${safeSym}')`}">Chart</button>
          <button class="btn-row-sm btn-view" onclick="openMoveModal(${i})" title="Move/Copy"><i class="fa-solid fa-right-left"></i></button>
          <button class="btn-row-sm btn-add-port" onclick="openAddModal('${w.market}',{symbol:'${safeSym}',name:'${safeName}'})" style="font-size:11px;padding:4px 8px">+ Port</button>
          <button class="btn-row-sm btn-delete" onclick="removeFromWatchlist(${i})"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

// =====================================================================
// SCREENER — live universe from Twelve Data (thousands of stocks)
// =====================================================================

// Screener state (separate from app state for clarity)
const screener = {
  universe: [],      // full stock list from API (metadata only)
  filtered: [],      // after text/type filter
  pageData: [],      // live-enriched data for current page
  page: 0,
  pageSize: 20,
  loading: false,
};

const SCREENER_CACHE_KEY = mkt => lsKey(`sp_universe_${mkt}_v2_${new Date().toISOString().split('T')[0]}`);

// Market-cap ranked priority lists (approximate 2025 rankings).
// Stocks in these lists appear first in the screener; remainder sorted alphabetically.
const MCAP_RANK_US = [
  // Mega cap
  'NVDA','MSFT','AAPL','AMZN','GOOGL','GOOG','META','TSLA','AVGO','LLY',
  // $200B – $1T
  'JPM','V','WMT','XOM','MA','UNH','COST','JNJ','ORCL','NFLX',
  'PG','HD','BAC','ABBV','KO','PM','MRK','CVX','CSCO','IBM',
  'GS','AXP','MS','TMO','SPGI','CAT','ISRG','GE','NEE','AMGN',
  'BLK','MDT','SYK','LOW','ETN','SCHW','RTX','HON','CB','DE',
  'UPS','PFE','MMC','ADP','BKNG','NOW','INTU','ADBE','CRM','PANW',
  // Semiconductors
  'AMAT','LRCX','TXN','QCOM','MU','ADI','KLAC','AMD','INTC','SNPS',
  'CDNS','MRVL','ARM','MPWR','ON','ENTG','ACLS','ONTO','COHR','WOLF',
  // Software / Cloud
  'WDAY','TEAM','CRWD','DDOG','SNOW','MDB','ZS','OKTA','FTNT','NET',
  'HUBS','BILL','GTLB','PCTY','PAYC','VEEV','ANSS','PTC','COUP','RNG',
  // Biotech & Life Sciences
  'REGN','VRTX','GILD','BIIB','MRNA','ILMN','IDXX','IQV','NBIX','ALNY',
  'EXAS','INCY','SGEN','BMRN','UTHR','RARE','IONS','SRPT','FOLD','ARWR',
  // Healthcare
  'HCA','CNC','CI','HUM','CVS','MCK','ABC','CAH','DGX','LH',
  'HOLX','BAX','BDX','EW','ZBH','PEN','TFX','STE','HSIC','PDCO',
  // Banks & Finance
  'WFC','USB','PNC','TFC','COF','MCO','FIS','FI','PYPL','SQ',
  'SOFI','COIN','ICE','CME','CBOE','MSCI','NDAQ','VRSK','BR','JKHY',
  // Media & Telco
  'DIS','CMCSA','T','VZ','CHTR','TMUS','LBRDA','LBRDK','SIRI','WBD',
  // Real Estate
  'AMT','PLD','CCI','EQIX','DLR','PSA','AVB','EQR','O','WPC',
  // Energy
  'SLB','HAL','BKR','DVN','MRO','OXY','PSX','VLO','MPC','HES',
  'COP','EOG','PXD','FANG','CTRA','APA','CLR','SM','ESTE','VTLE',
  // Consumer Discretionary
  'SBUX','MCD','YUM','CMG','DPZ','RCL','CCL','NCLH','MAR','HLT',
  'NKE','LULU','TGT','TJX','ROST','BURL','DG','DLTR','FIVE','OLLI',
  // Auto
  'F','GM','RIVN','LCID','TM','HMC','STLA','BWA','LEA','MGA',
  // Industrials
  'BA','LMT','NOC','GD','TDG','HEI','HWM','SPR','WWD','AXON',
  'MMM','ITW','EMR','ROK','PH','IR','XYL','IDEX','ROP','AME',
  'CNI','CSX','NSC','UNP','WAB','KSU','TRN','GBX','GATX','RAIL',
  // Consumer Staples
  'CL','CHD','EL','COTY','REV','KMB','SJM','CAG','HRL','MKC',
  // Utilities
  'SO','DUK','AEP','EXC','SRE','PCG','ED','FE','ETR','CNP',
  // Materials
  'LIN','APD','ECL','SHW','PPG','NEM','FCX','AA','NUE','STLD',
  // ETFs (top by AUM)
  'SPY','QQQ','IWM','EFA','VTI','VOO','VEA','GLD','SLV','TLT',
  'XLF','XLK','XLE','XLV','XLI','XLU','XLY','XLP','XLB','XLRE',
];

const MCAP_RANK_IN = [
  // NIFTY 50
  'RELIANCE','TCS','HDFCBANK','BHARTIARTL','ICICIBANK','INFY','SBIN','HINDUNILVR','ITC','BAJFINANCE',
  'KOTAKBANK','LT','HCLTECH','MARUTI','AXISBANK','SUNPHARMA','ASIANPAINT','TITAN','WIPRO','ULTRACEMCO',
  'POWERGRID','NTPC','ONGC','COALINDIA','BAJAJFINSV','TECHM','DRREDDY','NESTLEIND','TATAMOTORS','HINDALCO',
  'JSWSTEEL','TATASTEEL','INDUSINDBK','BRITANNIA','CIPLA','GRASIM','HEROMOTOCO','EICHERMOT','DIVISLAB','ADANIPORTS',
  // NIFTY NEXT 50 & large caps
  'ADANIENT','APOLLOHOSP','SBILIFE','HDFCLIFE','DABUR','COLPAL','MARICO','BANKBARODA','CANBK','MUTHOOTFIN',
  'SHREECEM','SIEMENS','HAVELLS','PIDILITIND','BERGERPAINTS','GODREJCP','IRCTC','IRFC','NHPC','RECLTD',
  'PFC','TRENT','VEDL','SAIL','NMDC','TATAPOWER','TORNTPOWER','TORNTPHARM','LUPIN','AUROPHARMA',
  'BIOCON','ALKEM','IPCA','NATCOPHARM','HDFCAMC','ICICIGI','BAJAJAUTO','MOTHERSON','BALKRISIND','MRF',
  'APOLLOTYRE','CEAT','AMBUJACEM','ACC','ATGL','ZOMATO','NAUKRI','PAYTM','DELHIVERY','POLICYBZR',
  // Mid caps (NSE)
  'FEDERALBNK','BANDHANBNK','IDFCFIRSTB','RBLBANK','DCBBANK','KARURVYSYA','CITYUNIONB','EQUITASBNK','UJJIVANSFB','AUBANK',
  'MFSL','CHOLAFIN','BAJAJHLDNG','LICHSGFIN','PNBHOUSING','CANFINHOME','HOMEFIRST','APTUS','AAVAS','REPCO',
  'INDIGOPNTS','KANSAINER','AKZOINDIA','SWANENERGY','TTKPRESTIG','VSTIND','GODFRYPHLP','IGL','MGL','GUJGASLTD',
  'CONCOR','ALLCARGO','GATI','BLUEDART','MAHLOG','DMART','VMART','SHOPERSTOP','ABFRL','MANYAVAR',
  'DIXON','KAYNES','AMBER','VGUARD','POLYCAB','KEI','FINOLEX','APLAPOLLO','HINDZINC','VEDANTA',
];

function sortByMcapRank(stocks, rankList) {
  const rankMap = new Map(rankList.map((sym, i) => [sym, i]));
  return stocks.sort((a, b) => {
    const ra = rankMap.has(a.symbol) ? rankMap.get(a.symbol) : Infinity;
    const rb = rankMap.has(b.symbol) ? rankMap.get(b.symbol) : Infinity;
    if (ra !== rb) return ra - rb;
    return a.symbol.localeCompare(b.symbol);
  });
}

async function fetchStockList(exchange, country) {
  const url = `${TD_BASE}/stocks?exchange=${encodeURIComponent(exchange)}&country=${encodeURIComponent(country)}&apikey=${TD_KEY}`;
  try {
    const r = await fetch(url); if (!r.ok) return [];
    const d = await r.json();
    return (d.data || []).filter(s =>
      s.symbol && s.name &&
      !s.symbol.includes('.') &&
      !s.name.toLowerCase().includes('test') &&
      ['Common Stock','ETF','American Depositary Receipt','Exchange Traded Fund'].includes(s.type)
    );
  } catch { return []; }
}

async function loadScreenerUniverse() {
  const mkt = state.screenerMkt;
  const cacheKey = SCREENER_CACHE_KEY(mkt);

  // Try localStorage cache first
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
    if (cached?.length) {
      const sorted = sortByMcapRank(cached, mkt === 'us' ? MCAP_RANK_US : MCAP_RANK_IN);
      screener.universe = sorted;
      screener.filtered = sorted;
      screener.page = 0;
      setEl('screenerCount', `${sorted.length.toLocaleString()} stocks in universe`);
      screenerPageLoad();
      return;
    }
  } catch {}

  setEl('screenerCount', 'Loading universe…');
  screenerShowLoading();

  let stocks = [];
  if (mkt === 'us') {
    const [nasdaq, nyse, amex] = await Promise.all([
      fetchStockList('NASDAQ', 'United States'),
      fetchStockList('NYSE', 'United States'),
      fetchStockList('AMEX', 'United States'),
    ]);
    const seen = new Set();
    for (const s of [...nasdaq, ...nyse, ...amex]) {
      if (!seen.has(s.symbol)) { seen.add(s.symbol); stocks.push(s); }
    }
  } else {
    const [nse, bse] = await Promise.all([
      fetchStockList('NSE', 'India'),
      fetchStockList('BSE', 'India'),
    ]);
    const seen = new Set();
    for (const s of [...nse, ...bse]) {
      if (!seen.has(s.symbol)) { seen.add(s.symbol); stocks.push(s); }
    }
  }

  // Sort by market cap rank, then alphabetically for the rest
  stocks = sortByMcapRank(stocks, mkt === 'us' ? MCAP_RANK_US : MCAP_RANK_IN);

  // Cache for 24h
  try { localStorage.setItem(cacheKey, JSON.stringify(stocks)); } catch {}

  screener.universe = stocks;
  screener.filtered = stocks;
  screener.page = 0;
  setEl('screenerCount', `${stocks.length.toLocaleString()} stocks in universe`);
  screenerPageLoad();
}

function screenerTextSearch() {
  const q = ($('screenerSearch')?.value || '').trim().toUpperCase();
  const type = $('fltType')?.value || '';
  screener.filtered = screener.universe.filter(s => {
    if (type && s.type !== type) return false;
    if (!q) return true;
    return s.symbol.includes(q) || s.name.toUpperCase().includes(q);
  });
  screener.page = 0;
  setEl('screenerCount', `${screener.filtered.length.toLocaleString()} stocks`);
  screenerPageLoad();
}

function screenerShowLoading() {
  const body = $('screenerBody');
  if (body) body.innerHTML = `<tr><td colspan="12" class="empty-td"><div class="empty-state"><i class="fa-solid fa-circle-notch fa-spin"></i><p>Fetching stock universe…</p></div></td></tr>`;
}

async function screenerFetchStats(symbols) {
  const cache = tdCacheLoad();
  const toFetch = symbols.filter(s => !cache[s]);
  if (toFetch.length) {
    await Promise.all(toFetch.map(async sym => {
      const data = await fetchTwelveStats(sym);
      if (data) cache[sym] = data;
    }));
    tdCacheSave(cache);
  }
  const result = {};
  symbols.forEach(s => { if (cache[s]) result[s] = cache[s]; });
  return result;
}

async function screenerPageLoad() {
  const isIndia = state.screenerMkt === 'india';
  const start = screener.page * screener.pageSize;
  const pageMeta = screener.filtered.slice(start, start + screener.pageSize);

  if (!pageMeta.length) { renderScreener([]); updateScreenerPagination(); return; }

  // Read filter values up front
  const fMcap = $('fltMcap')?.value;
  const fPE   = $('fltPE')?.value;
  const fChg  = $('fltChange')?.value;
  const fDiv  = $('fltDiv')?.value;
  const fVol  = $('fltVol')?.value;
  const hasLiveFilter = fMcap || fPE || fChg || fDiv || fVol;
  const needsStats = !isIndia && (fMcap || fPE || fDiv);

  // Render loading state immediately
  renderScreener(pageMeta.map(s => ({ ...s, price:0, chgPct:0, chg:0, mcap:0, pe:null, vol:0, avgVol:0, div:0, w52h:0, w52l:0, _loading:true })));
  updateScreenerPagination();

  const syms = pageMeta.map(s => s.symbol);
  let liveMap = {};
  let statsMap = {};

  if (!isIndia) {
    // Fetch quotes and (when needed) stats in parallel
    const quotesP = fetchTwelveQuote(syms);
    const statsP  = needsStats ? screenerFetchStats(syms) : Promise.resolve({});
    const [quotes, sData] = await Promise.all([quotesP, statsP]);
    quotes.forEach(q => { if (q?.symbol) liveMap[q.symbol] = mapTwelveQuote(q, { symbol:q.symbol, name:q.name||'' }); });
    statsMap = sData;
  } else {
    const tdResult = await fetchTwelveIndia(syms);
    Object.entries(tdResult).forEach(([sym, d]) => {
      const found = pageMeta.find(s => s.symbol === sym);
      liveMap[sym] = { symbol: sym, name: d.name || found?.name || sym, sector: found?.sector || '—', ...d };
    });
  }

  // Merge quote + stats into enriched rows
  const enriched = pageMeta.map(s => {
    const live  = liveMap[s.symbol];
    const stats = statsMap[s.symbol];
    let row = { ...s, ...(live || {}), type: s.type, _hasLive: !!live };
    if (stats) row = mapTwelveStats(stats, row);
    return row;
  });

  // Apply live filters
  let final = enriched;
  if (hasLiveFilter) {
    // If entire live fetch failed, skip filtering rather than showing nothing
    const liveCount = Object.keys(liveMap).length;
    if (liveCount === 0) {
      setEl('screenerLiveNote', 'Live data unavailable — showing unfiltered results');
      screener.pageData = enriched;
      renderScreener(enriched);
      return;
    }

    final = enriched.filter(s => {
      // Exclude stocks whose individual quote failed (some did succeed in this batch)
      if (!s._hasLive) return false;

      // mcap: only filter when we actually have the value
      if (fMcap && s.mcap > 0) {
        const v = s.mcap;
        if (fMcap==='mega'  && v < 200e9) return false;
        if (fMcap==='large' && (v < 10e9 || v >= 200e9)) return false;
        if (fMcap==='mid'   && (v < 2e9  || v >= 10e9))  return false;
        if (fMcap==='small' && v >= 2e9) return false;
      }

      // pe: only filter when we have the value
      if (fPE && s.pe != null) {
        if (fPE==='u15'   && s.pe >= 15) return false;
        if (fPE==='15-25' && (s.pe < 15 || s.pe >= 25)) return false;
        if (fPE==='25-40' && (s.pe < 25 || s.pe >= 40)) return false;
        if (fPE==='o40'   && s.pe < 40) return false;
      }

      // chgPct is always populated when _hasLive is true (defaults to 0)
      if (fChg) {
        if (fChg==='gainers'  && s.chgPct <= 0) return false;
        if (fChg==='losers'   && s.chgPct >= 0) return false;
        if (fChg==='big-gain' && s.chgPct <= 3) return false;
        if (fChg==='big-loss' && s.chgPct >= -3) return false;
      }

      // div: only filter when we have the value
      if (fDiv && s.div != null) {
        if (fDiv==='pays' && !(s.div > 0)) return false;
        if (fDiv==='none' && s.div > 0) return false;
        if (fDiv==='high' && !(s.div >= 3)) return false;
      }

      if (fVol && s.avgVol > 0) {
        if (fVol==='above-avg' && s.vol < s.avgVol) return false;
        if (fVol==='very-high' && s.vol < s.avgVol*1.5) return false;
      }
      return true;
    });
    setEl('screenerLiveNote', `Live filters matched ${final.length} of ${enriched.length} on this page`);
  } else {
    setEl('screenerLiveNote', `Showing live data for page ${screener.page+1}`);
  }

  screener.pageData = final;
  renderScreener(final);
}

function updateScreenerPagination() {
  const total = screener.filtered.length;
  const totalPages = Math.ceil(total / screener.pageSize);
  const pg = $('screenerPagination'), info = $('screenerPageInfo');
  const prevBtn = $('screenerPrevBtn'), nextBtn = $('screenerNextBtn');
  if (!pg) return;
  pg.style.display = total > screener.pageSize ? 'flex' : 'none';
  if (info) info.textContent = `Page ${screener.page+1} of ${totalPages} · ${total.toLocaleString()} stocks`;
  if (prevBtn) prevBtn.disabled = screener.page === 0;
  if (nextBtn) nextBtn.disabled = screener.page >= totalPages - 1;
}

function screenerChangePage(dir) {
  const totalPages = Math.ceil(screener.filtered.length / screener.pageSize);
  screener.page = Math.max(0, Math.min(screener.page + dir, totalPages - 1));
  screenerPageLoad();
  $('screenerBody')?.closest('.table-wrap')?.scrollTo(0, 0);
}

// Track which screener markets have had their widget injected
const _screenerInited = { us: false, india: false };

function _initTVScreener(mkt) {
  if (_screenerInited[mkt]) return;
  _screenerInited[mkt] = true;
  const containerId = mkt === 'us' ? 'tv-screener-us' : 'tv-screener-india';
  const container = $(containerId);
  if (!container) return;

  const market = mkt === 'us' ? 'america' : 'india';
  const availH = Math.max(600, window.innerHeight - 160);

  const wrap = document.createElement('div');
  wrap.className = 'tradingview-widget-container';
  wrap.style.cssText = `width:100%;height:${availH}px;`;

  const inner = document.createElement('div');
  inner.className = 'tradingview-widget-container__widget';
  inner.style.cssText = 'width:100%;height:100%;';
  wrap.appendChild(inner);

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
  script.textContent = JSON.stringify({
    width: '100%',
    height: availH,
    defaultColumn: 'overview',
    defaultScreen: 'most_capitalized',
    market: market,
    showToolbar: true,
    colorTheme: 'dark',
    locale: 'en',
    isTransparent: true,
  });
  wrap.appendChild(script);
  container.appendChild(wrap);
}

function setScreenerMkt(mkt) {
  state.screenerMkt = mkt;
  document.querySelectorAll('.smtab').forEach(b => b.classList.toggle('active', b.dataset.smkt===mkt));
  const usEl = $('tv-screener-us'), inEl = $('tv-screener-india');
  if (usEl) usEl.style.display = mkt === 'us' ? 'block' : 'none';
  if (inEl) inEl.style.display = mkt === 'india' ? 'block' : 'none';
  _initTVScreener(mkt);
}

function runScreener() {
  screener.page = 0;
  screenerPageLoad();
}

function sortScreener() {
  const sortKey = $('screenerSort').value;
  const data = [...screener.pageData];
  data.sort((a,b) => {
    if (sortKey==='mcap')   return (b.mcap||0) - (a.mcap||0);
    if (sortKey==='change') return (b.chgPct||0) - (a.chgPct||0);
    if (sortKey==='price')  return (b.price||0) - (a.price||0);
    if (sortKey==='pe')     return ((a.pe||999) - (b.pe||999));
    if (sortKey==='div')    return (b.div||0) - (a.div||0);
    return 0;
  });
  renderScreener(data);
}

function renderScreener(data) {
  const isIndia = state.screenerMkt === 'india';
  const body = $('screenerBody'); if (!body) return;
  if (!data || !data.length) {
    body.innerHTML = `<tr><td colspan="12" class="empty-td"><div class="empty-state"><i class="fa-solid fa-filter"></i><p>No stocks match</p></div></td></tr>`;
    return;
  }
  // US stock prices are converted to INR for display; India prices are already INR
  const fmt2 = isIndia ? fmtINR : (n => fmtINR(toINR(n)));
  body.innerHTML = data.map(s => {
    const newsInfo = newsState.activeStockNews?.[s.symbol];
    const newsTag  = newsInfo ? `<span class="news-badge ${newsInfo.severity}" style="margin-left:4px"><i class="fa-solid fa-bolt"></i></span>` : '';
    const loading  = s._loading;
    const dash     = '—';
    return `<tr data-sym="${s.symbol}">
      <td><span class="td-sym" style="cursor:pointer" onclick="${isIndia?`loadIndiaQuick('${s.symbol}')`:`loadUSQuick('${s.symbol}')`}">${s.symbol}${newsTag}</span></td>
      <td class="td-name">${s.name||''}</td>
      <td><span class="td-sector">${s.type||s.sector||dash}</span></td>
      <td class="td-num">${loading||!s.price ? '<span style="color:var(--text3)">…</span>' : fmt2(s.price)}</td>
      <td class="td-num ${loading?'':chgClass(s.chgPct)}">${loading||s.chgPct==null ? '…' : chgSign(s.chgPct)+s.chgPct.toFixed(2)+'%'}</td>
      <td class="td-num">${loading||!s.mcap ? '…' : fmtMcap(s.mcap, isIndia)}</td>
      <td class="td-num">${loading||!s.pe ? '…' : s.pe.toFixed(1)}</td>
      <td class="td-num">${loading||!s.vol ? '…' : fmtVol(s.vol)}</td>
      <td class="td-num">${loading ? '…' : (s.div?s.div.toFixed(2)+'%':dash)}</td>
      <td class="td-num positive">${loading||!s.w52h ? '…' : fmt2(s.w52h)}</td>
      <td class="td-num negative">${loading||!s.w52l ? '…' : fmt2(s.w52l)}</td>
      <td>
        <div class="row-actions">
          <button class="btn-row-sm btn-view" onclick="${isIndia?`loadIndiaQuick('${s.symbol}')`:`loadUSQuick('${s.symbol}')`}">Chart</button>
          <button class="btn-row-sm btn-add-port" onclick="openAddModal('${state.screenerMkt}',{symbol:'${s.symbol}',name:'${(s.name||'').replace(/'/g,"\\'")}'})">+ Port</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function resetFilters() {
  if ($('screenerSearch')) $('screenerSearch').value = '';
  if ($('fltType')) $('fltType').value = '';
  ['fltMcap','fltPE','fltChange','fltDiv','fltVol'].forEach(id => { if ($(id)) $(id).value=''; });
  setEl('screenerLiveNote', '');
  screener.filtered = screener.universe;
  screener.page = 0;
  setEl('screenerCount', `${screener.universe.length.toLocaleString()} stocks in universe`);
  screenerPageLoad();
}

// =====================================================================
// EXPORT EXCEL
// =====================================================================
function exportExcel() {
  if (!state.portfolio.length) { toast('No holdings to export', 'error'); return; }
  const headers = ['Symbol','Name','Market','Sector','Qty','Buy Price','Current Price','Invested','Current Value','P&L','P&L %','Date'];
  const rows = state.portfolio.map(h => {
    const curr = h.qty * h.currentPrice;
    const inv  = h.qty * h.buyPrice;
    const pnl  = curr - inv;
    const pct  = inv > 0 ? parseFloat((pnl / inv * 100).toFixed(2)) : 0;
    return [
      h.symbol, h.name, h.market.toUpperCase(), h.sector || '',
      h.qty, parseFloat(h.buyPrice.toFixed(2)), parseFloat(h.currentPrice.toFixed(2)),
      parseFloat(inv.toFixed(2)), parseFloat(curr.toFixed(2)),
      parseFloat(pnl.toFixed(2)), pct, h.date || ''
    ];
  });

  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  ws['!cols'] = [{wch:12},{wch:32},{wch:8},{wch:16},{wch:8},{wch:12},{wch:14},{wch:14},{wch:14},{wch:12},{wch:8},{wch:12}];

  // Second sheet: import template so users know the format
  const tmpl = XLSX.utils.aoa_to_sheet([
    ['Symbol','Name','Market','Sector','Qty','Buy Price','Date'],
    ['RELIANCE','Reliance Industries','india','Energy',10,2400,'2024-01-15'],
    ['TCS','Tata Consultancy Services','india','Technology',5,3800,'2024-03-01'],
    ['AAPL','Apple Inc.','us','Technology',8,182.50,'2024-02-10'],
    ['MSFT','Microsoft Corp.','us','Technology',3,415.00,'2024-04-05']
  ]);
  tmpl['!cols'] = [{wch:12},{wch:32},{wch:8},{wch:16},{wch:8},{wch:12},{wch:12}];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Holdings');
  XLSX.utils.book_append_sheet(wb, tmpl, 'Import Template');

  const safe = state.activePortfolio.replace(/[^a-z0-9]/gi, '_');
  XLSX.writeFile(wb, `portfolio_${safe}_${new Date().toISOString().split('T')[0]}.xlsx`);
  toast(`Exported "${state.activePortfolio}" as Excel`);
}

// =====================================================================
// IMPORT EXCEL / CSV
// =====================================================================
let _importRows = [];

function openImportModal() {
  const sel = $('importTargetPortfolio');
  sel.innerHTML = Object.keys(state.portfolios).map(name =>
    `<option value="${name}"${name === state.activePortfolio ? ' selected' : ''}>${name}</option>`
  ).join('') + '<option value="__new__">＋ Create new portfolio…</option>';
  $('importNewNameRow').style.display = 'none';
  $('importPreviewSection').style.display = 'none';
  $('importConfirmBtn').style.display = 'none';
  $('importFileInput').value = '';
  $('importDropzone').classList.remove('has-file');
  _importRows = [];
  $('importModal').className = 'modal-overlay open';
}

function closeImportModal() { $('importModal').className = 'modal-overlay'; }

function toggleImportNewName() {
  $('importNewNameRow').style.display = $('importTargetPortfolio').value === '__new__' ? '' : 'none';
}

function downloadImportTemplate() {
  const ws = XLSX.utils.aoa_to_sheet([
    ['Symbol','Name','Market','Sector','Qty','Buy Price','Current Price','Date'],
    ['RELIANCE','Reliance Industries','india','Energy',10,2400,1366.5,'2024-01-15'],
    ['TCS','Tata Consultancy Services','india','Technology',5,3800,3200,'2024-03-01'],
    ['AAPL','Apple Inc.','us','Technology',8,182.50,211.30,'2024-02-10'],
    ['MSFT','Microsoft Corp.','us','Technology',3,415.00,390.50,'2024-04-05']
  ]);
  ws['!cols'] = [{wch:12},{wch:32},{wch:8},{wch:16},{wch:8},{wch:12},{wch:12}];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Import Template');
  XLSX.writeFile(wb, 'portfolio_import_template.xlsx');
  toast('Template downloaded');
}

// Resolve a company full-name (from broker exports) to an NSE symbol.
// Searches INDIA_STOCKS_DB by word overlap; falls back to a smart abbreviation.
function guessIndiaSymbol(rawName) {
  const STOP = new Set(['LIMITED','LTD','PRIVATE','PVT','INDUSTRIES','INDUSTRY',
    'TECHNOLOGIES','TECHNOLOGY','CORP','CORPORATION','ENTERPRISES','ENTERPRISE',
    'SOLUTIONS','SERVICES','SERVICE','GROUP','INDIA','INDIAN','AND','OF','THE',
    'PASS','VEH','VEHICLES','VEHICLE','ENGG','ENG','ENGINEERING','INFRA',
    'INFRASTRUCTURE','CAPITAL','FINANCE','FINANCIAL']);
  // BANK intentionally NOT in STOP → "YES BANK"→"YESBANK", "IDFC FIRST BANK"→"IDFCFIRSTB"

  const normalize = s => s.toUpperCase().replace(/[^A-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const sigWords  = str => str.split(' ').filter(t => t.length >= 2 && !STOP.has(t));

  const rawNorm  = normalize(rawName);
  const rawWords = sigWords(rawNorm);
  if (!rawWords.length) return { symbol: rawNorm.replace(/\s/g,'').substring(0,10), name: rawName, sector: '' };

  // 1. DB lookup — require first word to appear in DB name to prevent false positives
  //    (e.g., "BANK" alone matching every bank in the DB)
  let best = null, bestScore = 0;
  for (const s of INDIA_STOCKS_DB) {
    const dbNorm = normalize(s.name || '');
    if (!dbNorm.includes(rawWords[0])) continue; // first word is the key identifier
    const matches = rawWords.filter(w => dbNorm.includes(w)).length;
    const score   = rawWords.length ? matches / rawWords.length : 0;
    if (score > bestScore) { bestScore = score; best = s; }
  }
  if (best && bestScore >= 0.5) return { symbol: best.symbol, name: best.name, sector: best.sector || '' };

  // 2. Fallback abbreviation (mimics NSE's own symbol rules):
  //    - First word >= 6 chars → use it alone (SUZLON, OLECTRA, SWIGGY, SALASAR…)
  //    - Short first word → concatenate first 3 sig words, cap at 10 chars
  //      e.g. IDFC+FIRST+BANK → "IDFCFIRSTB", JYOTI+STRUCTURES → "JYOTISTRUC", YES+BANK → "YESBANK"
  const sym = rawWords[0].length >= 6
    ? rawWords[0].substring(0, 12)
    : rawWords.slice(0, 3).join('').substring(0, 10);
  return { symbol: sym, name: rawName, sector: '' };
}

// Keyword-based column detection fallback (used if AI is unavailable)
function _detectImportColsFallback(allRows) {
  let headerIdx = 0;
  for (let i = 0; i < Math.min(6, allRows.length); i++) {
    const textCells = allRows[i].filter(c => c && isNaN(c) && String(c).length > 1).length;
    if (textCells >= 3) { headerIdx = i; break; }
  }
  const hdrs = allRows[headerIdx].map(h => String(h).toLowerCase().trim());
  const find = (...pats) => { for (const p of pats) { const i = hdrs.findIndex(h => p.test(h)); if (i >= 0) return i; } return null; };
  return {
    header_row:    headerIdx,
    symbol_or_name: find(/^symbol$/, /^ticker$/, /^scrip$/, /instrument/, /stock.?name/, /scrip.?name/, /^name$/, /^company/, /^stock$/),
    quantity:       find(/^qty\.?$/, /^quantity$/, /net.?qty/, /balance.?qty/, /holdings.?qty/, /shares/),
    avg_price:      find(/avg.?cost/, /avg.?price/, /average.?price/, /average.?cost/, /buy.?price/, /purchase.?price/, /cost.?price/),
    current_price:  find(/^ltp$/, /^cmp$/, /current.?price/, /market.?price/, /last.?price/, /closing.?price/)
  };
}

function handleImportFile(input) {
  const file = input.files[0];
  if (!file) return;
  const ext = file.name.split('.').pop().toLowerCase();

  // Show loading state immediately
  $('importDropzone').classList.add('has-file');
  $('importPreviewSection').style.display = '';
  $('importPreviewBody').innerHTML = `<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--text3)"><i class="fa-solid fa-circle-notch fa-spin" style="margin-right:8px"></i>Analysing file with AI…</td></tr>`;
  $('importValidCount').textContent = 'Detecting columns…';
  $('importConfirmBtn').style.display = 'none';

  const reader = new FileReader();
  reader.onload = async function(e) {
    let allRows = [];
    try {
      if (ext === 'csv') {
        const lines = (e.target.result).split('\n').filter(l => l.trim());
        allRows = lines.map(line => line.split(',').map(v => v.replace(/^"|"$/g,'').trim()));
      } else {
        const wb = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        allRows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' })
          .map(row => row.map(c => String(c).trim()));
      }
    } catch { toast('Could not read file — check the format', 'error'); return; }

    allRows = allRows.filter(r => r.some(c => c !== '' && c !== undefined));
    if (allRows.length < 2) { toast('File appears empty', 'error'); return; }

    // Send first 5 rows to Gemini to identify columns — no assumptions about header names
    const sample = allRows.slice(0, Math.min(5, allRows.length));
    const prompt = `You are parsing a stock brokerage portfolio export file. Here are the first few rows as a JSON array of arrays:
${JSON.stringify(sample)}

Identify (using 0-based indices):
1. header_row: which row index is the column header row?
2. symbol_or_name: column index containing the stock ticker symbol OR company name
3. quantity: column index containing shares/units held (net quantity)
4. avg_price: column index containing average purchase price / cost per share
5. current_price: column index for current market price / LTP (null if absent)

Reply with ONLY raw JSON, no markdown, no explanation:
{"header_row":0,"symbol_or_name":0,"quantity":1,"avg_price":2,"current_price":null}`;

    let colMap = null;
    try {
      const res = await fetch(PROXY_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0, maxOutputTokens: 100 }
        })
      });
      if (res.ok) {
        const d = await res.json();
        const text = ((d.candidates?.[0]?.content?.parts || []).map(p => p.text||'').join('') || d.reply || d.text || '').trim();
        const match = text.match(/\{[^{}]*\}/);
        if (match) colMap = JSON.parse(match[0]);
      }
    } catch(e) { console.warn('AI column detection failed, using fallback:', e); }

    // Fallback: keyword regex on header row
    if (!colMap || colMap.symbol_or_name == null) {
      colMap = _detectImportColsFallback(allRows);
    }

    if (!colMap || colMap.symbol_or_name == null || colMap.quantity == null || colMap.avg_price == null) {
      $('importValidCount').textContent = 'Could not detect columns';
      $('importPreviewBody').innerHTML = `<tr><td colspan="7" class="empty-td" style="color:var(--red)">Could not identify Symbol, Quantity, and Avg Price columns in this file. Please use the Import Template format.</td></tr>`;
      return;
    }

    const headerRowIdx = colMap.header_row ?? 0;
    const cSym = colMap.symbol_or_name;
    const cQty = colMap.quantity;
    const cAvg = colMap.avg_price;
    const cLTP = colMap.current_price ?? null;

    const stripNum  = v => parseFloat(String(v ?? '').replace(/[^0-9.-]/g, ''));
    const isSymbol  = v => /^[A-Z0-9&.\-]{1,15}$/.test((v||'').toUpperCase().replace(/\s/g,''));

    _importRows = allRows.slice(headerRowIdx + 1)
      .filter(r => r[cSym] && String(r[cSym]).trim() !== '')
      .map(r => {
        const rawVal   = String(r[cSym] || '').trim();
        const qty      = stripNum(r[cQty]);
        const buyPrice = stripNum(r[cAvg]);
        const curPrice = cLTP != null ? stripNum(r[cLTP]) : NaN;

        let symbol, name, sector = '', symbolGuessed = false;
        const cleaned = rawVal.toUpperCase().replace(/\.(NS|BO)$/i,'').replace(/^(NSE:|BSE:)/i,'').replace(/\s+/g,'');

        if (isSymbol(cleaned)) {
          symbol = cleaned; name = cleaned;
        } else {
          const resolved = guessIndiaSymbol(rawVal);
          symbol = resolved.symbol; name = resolved.name || rawVal; sector = resolved.sector;
          symbolGuessed = true;
        }

        return {
          symbol, name: name || symbol, market: 'india',
          qty, buyPrice, currentPrice: curPrice,
          sector, date: '', symbolGuessed,
          valid: !!symbol && qty > 0 && buyPrice > 0
        };
      })
      .filter(r => r.symbol);

    renderImportPreview();
  };

  if (ext === 'csv') reader.readAsText(file); else reader.readAsArrayBuffer(file);
}

function renderImportPreview() {
  const valid      = _importRows.filter(r => r.valid).length;
  const guessed    = _importRows.filter(r => r.symbolGuessed).length;
  const hasLTP     = _importRows.some(r => !isNaN(r.currentPrice) && r.currentPrice > 0);

  $('importValidCount').textContent = `${valid} of ${_importRows.length} rows ready to import` +
    (guessed ? ` · ${guessed} symbols auto-resolved` : '') +
    (hasLTP   ? ' · current prices detected ✓' : '');

  // Show/hide LTP column header
  const ltpTh = $('importLtpTh');
  if (ltpTh) ltpTh.style.display = hasLTP ? '' : 'none';

  $('importPreviewBody').innerHTML = _importRows.map(r => {
    const sym  = r.market === 'india' ? '₹' : '$';
    const symCell = r.symbolGuessed
      ? `<span title="Auto-resolved from: ${r.name}">${r.symbol} <span style="color:var(--text3);font-size:10px">~</span></span>`
      : r.symbol;
    const ltpCell = hasLTP
      ? `<td>${(!isNaN(r.currentPrice) && r.currentPrice > 0) ? `<strong style="color:var(--green)">${sym}${r.currentPrice.toFixed(2)}</strong>` : '—'}</td>`
      : '';
    return `<tr class="${r.valid ? '' : 'import-row-skip'}">
      <td>${r.market==='india'?'🇮🇳':'🇺🇸'} ${symCell}</td>
      <td style="max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.name}">${r.name||'—'}</td>
      <td>${r.market.toUpperCase()}</td>
      <td>${isNaN(r.qty)?'<span class="import-err">!</span>':r.qty}</td>
      <td>${isNaN(r.buyPrice)?'<span class="import-err">!</span>':sym+r.buyPrice.toFixed(2)}</td>
      ${ltpCell}
      <td>${r.date||'—'}</td></tr>`;
  }).join('');
  $('importPreviewSection').style.display = '';
  $('importConfirmBtn').style.display = valid > 0 ? '' : 'none';
}

function confirmImport() {
  let target = $('importTargetPortfolio').value;
  if (target === '__new__') {
    const newName = ($('importNewPortfolioName').value || '').trim();
    if (!newName) { toast('Enter a name for the new portfolio', 'error'); return; }
    if (state.portfolios[newName]) { toast(`"${newName}" already exists`, 'error'); return; }
    state.portfolios[newName] = [];
    target = newName;
  }
  const valid = _importRows.filter(r => r.valid);
  if (!valid.length) { toast('No valid rows to import', 'error'); return; }
  let added = 0, updated = 0;
  const arr = state.portfolios[target];
  valid.forEach(r => {
    const dbRef    = (r.market==='us' ? US_STOCKS_DB : INDIA_STOCKS_DB).find(s => s.symbol===r.symbol);
    const hasLTP   = !isNaN(r.currentPrice) && r.currentPrice > 0;
    const ex       = arr.find(h => h.symbol===r.symbol && h.market===r.market);
    if (ex) {
      const tot = ex.qty + r.qty;
      ex.buyPrice    = (ex.qty*ex.buyPrice + r.qty*r.buyPrice) / tot;
      ex.qty         = tot;
      ex.currentPrice = hasLTP ? r.currentPrice : getCurrentPrice(ex);
      updated++;
    } else {
      // currentPrice priority: file's LTP > DB seed price > buy price
      const seedPrice = hasLTP ? r.currentPrice : (dbRef ? dbRef.price : r.buyPrice);
      arr.push({ symbol:r.symbol, name:r.name||dbRef?.name||r.symbol, sector:r.sector||dbRef?.sector||'Other',
        market:r.market, qty:r.qty, buyPrice:r.buyPrice,
        date:r.date||new Date().toISOString().split('T')[0],
        currentPrice:seedPrice, dayChgPct:0 });
      added++;
    }
  });
  state.activePortfolio = target;
  state.portfolio = state.portfolios[target];
  savePortfolio(); renderPortfolioTabs(); renderPortfolio();
  closeImportModal();
  toast(`Import complete — ${[added&&`${added} added`,updated&&`${updated} updated`].filter(Boolean).join(', ')}`);
}

// =====================================================================
// PORTFOLIO ROAST — Gemini AI analysis
// =====================================================================
function openRoastModal() {
  if (!state.portfolio.length) { toast('Add some holdings first!', 'error'); return; }
  $('roastModal').style.display = 'flex';
  $('roastOutputSection').style.display = 'flex';
  runRoast();
}

function closeRoastModal() { $('roastModal').style.display = 'none'; }


function buildRoastPrompt() {
  const p = state.portfolio;
  const totalUSD = p.filter(h => h.market==='us').reduce((a,h) => a + h.qty*h.currentPrice, 0);
  const totalINR = p.filter(h => h.market==='india').reduce((a,h) => a + h.qty*h.currentPrice, 0);
  const totalInvestedUSD = p.filter(h => h.market==='us').reduce((a,h) => a + h.qty*h.buyPrice, 0);
  const totalInvestedINR = p.filter(h => h.market==='india').reduce((a,h) => a + h.qty*h.buyPrice, 0);

  // Sector breakdown
  const sectorMap = {};
  p.forEach(h => {
    const val = h.qty * h.currentPrice;
    const key = `${h.sector}|${h.market}`;
    sectorMap[key] = (sectorMap[key] || 0) + val;
  });

  // Per-holding details
  const holdings = p.map(h => {
    const curr = h.qty * h.currentPrice;
    const inv  = h.qty * h.buyPrice;
    const pnl  = curr - inv;
    const pct  = inv > 0 ? (pnl/inv*100).toFixed(1) : 0;
    const totalVal = h.market==='us' ? totalUSD : totalINR;
    const weight = totalVal > 0 ? (curr/totalVal*100).toFixed(1) : 0;
    const sym = h.market==='india' ? '₹' : '$';
    return `  ${h.symbol} (${h.market.toUpperCase()}) — ${h.sector} — Weight: ${weight}% — P&L: ${pct}% — Invested: ${sym}${inv.toFixed(0)}`;
  }).join('\n');

  const sectorLines = Object.entries(sectorMap)
    .sort((a,b) => b[1]-a[1])
    .map(([k,v]) => {
      const [sec, mkt] = k.split('|');
      const total = mkt==='us' ? totalUSD : totalINR;
      const w = total > 0 ? (v/total*100).toFixed(1) : 0;
      return `  ${sec} (${mkt.toUpperCase()}): ${w}%`;
    }).join('\n');

  return `You are a sharp, brutally honest portfolio analyst. A user wants you to roast their stock portfolio — identify real risks, blind spots, and dumb mistakes, but also acknowledge what's working. Use actual numbers from the data. Be direct and specific.

PORTFOLIO DATA:
US Portfolio Value: $${totalUSD.toFixed(0)} (invested: $${totalInvestedUSD.toFixed(0)})
India Portfolio Value: ₹${totalINR.toFixed(0)} (invested: ₹${totalInvestedINR.toFixed(0)})
Total Holdings: ${p.length} stocks

HOLDINGS (symbol, market, sector, portfolio weight, P&L%, amount invested):
${holdings}

SECTOR BREAKDOWN:
${sectorLines}

Write your roast in exactly these 6 sections using these exact headings:
### 🔥 The Verdict
2–3 sentences of brutal honest truth about this portfolio overall.

### ⚠️ Concentration Risks
Specific over-concentrations by stock, sector, or market. Use the actual percentages.

### 🕳️ What's Missing
Sectors, geographies, or asset types completely absent that create blind spots.

### 💀 Positions to Question
Which specific holdings look weak, risky, or poorly timed based on the data — and why.

### ✅ What's Actually Working
Give genuine credit where it's due. Which positions or decisions look solid.

### 🎯 Top 3 Actions
Three concrete, specific actions this person should take (not generic advice).

Keep the total response under 500 words. Be ruthless but constructive.`;
}

function renderRoastMarkdown(text) {
  return text
    .replace(/### (.+)/g, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\n{2,}/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

async function runRoast() {
  const loadEl = $('roastLoading'), textEl = $('roastText');
  loadEl.style.display = 'flex';
  textEl.innerHTML = '';

  try {
    const resp = await fetch(PROXY_BASE + '/roast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: buildRoastPrompt() })
    });

    const data = await resp.json();

    if (!resp.ok) {
      const msg = (data.error && data.error.message) || ('HTTP ' + resp.status);
      const hint = resp.status === 429 ? ' (Rate limit hit — wait ~1 minute)' : '';
      throw new Error(msg + hint);
    }

    loadEl.style.display = 'none';
    textEl.innerHTML = renderRoastMarkdown(data.text || 'No response received.');
    textEl.scrollIntoView({ behavior: 'smooth', block: 'end' });

  } catch (e) {
    loadEl.style.display = 'none';
    textEl.innerHTML = '<p style="color:var(--red)"><strong>Error:</strong> ' + e.message + '.<br>Please try again.</p>';
  }
}

// =====================================================================
// REFRESH BUTTON
// =====================================================================
$('refreshBtn') && $('refreshBtn').addEventListener('click', () => {
  $('refreshBtn').style.transform = 'rotate(360deg)';
  setTimeout(() => { $('refreshBtn').style.transform=''; }, 500);
  updateIndexCards();
  if (state.section==='portfolio') renderPortfolio();
  if (state.section==='watchlist') renderWatchlist();
  toast('Prices refreshed');
});

// =====================================================================
// TOP PICKS — STATE (must live before init() so initPicks() can access it)
// =====================================================================

const picksState = {
  market: 'us',
  cat: 'all',
  us: null,
  india: null,
  liveLoaded: false,
};

// =====================================================================
// INIT
// =====================================================================
(function init() {
  // Auth: load user profile into topbar
  initAuth();

  // Init multi-portfolio, multi-watchlist and picks systems
  initPortfolios();
  initWatchlists();
  initPicks();

  // Initialize charts
  renderDashPortfolio();
  renderMovers();
  renderSectorHeatmap();

  // Load default stocks if on terminal pages
  if (state.section === 'us-terminal') initUSChart('NASDAQ:AAPL');
  if (state.section === 'india-terminal') initIndiaChart('BSE:RELIANCE');

  // Set today's date as default in modal
  const dateEl = $('fDate');
  if (dateEl) dateEl.value = new Date().toISOString().split('T')[0];

  // Screener default
  renderScreener([...US_STOCKS_DB]);

  // Prices update only on user action (Live Prices button) — no auto-rebuild

  // Start news engine (deferred so NEWS_DB const is initialized before access)
  setTimeout(initNewsEngine, 0);

  console.log('%cPrism loaded ✓', 'color:#3fb950;font-size:14px;font-weight:bold');
})();

// =====================================================================
// TOP PICKS — DAILY STOCK RECOMMENDATIONS
// =====================================================================

// Returns today's localStorage cache key
function picksCacheKey() {
  return lsKey(`sp_picks_${new Date().toISOString().split('T')[0]}`);
}

// ── Scoring ───────────────────────────────────────────────────────────
// Returns { total (0-100), pts, tags[], rating, ratingCls, cat }
function scoreStock(s, isIndia) {
  const pts = { valuation: 0, quality: 0, income: 0, momentum: 0, growth: 0 };
  const tags = [];

  // ── VALUATION (30 pts) ────────────────────────────────────────────
  if (s.pe > 0) {
    if      (s.pe >= 8  && s.pe <= 15) { pts.valuation += 25; tags.push('Low P/E'); }
    else if (s.pe >  15 && s.pe <= 25) { pts.valuation += 18; }
    else if (s.pe >  25 && s.pe <= 40) { pts.valuation += 11; }
    else if (s.pe <  8)                { pts.valuation += 16; tags.push('Deep Value'); }
    else                               { pts.valuation +=  4; tags.push('High Valuation'); }
  } else {
    pts.valuation += 8; // no P/E (loss-making)
  }
  // 52-week range position (lower = more upside)
  const range = (s.w52h || 0) - (s.w52l || 0);
  if (range > 0) {
    const pos = (s.price - s.w52l) / range; // 0 = at 52W low
    if      (pos < 0.25) { pts.valuation += 5; tags.push('Near 52W Low'); }
    else if (pos < 0.50) { pts.valuation += 3; }
    else if (pos < 0.75) { pts.valuation += 1; }
  }

  // ── QUALITY (25 pts) ─────────────────────────────────────────────
  const mcap = s.mcap || 0;
  if (isIndia) {
    if      (mcap >= 10e12) { pts.quality += 12; tags.push('Mega Cap'); }
    else if (mcap >=  3e12) { pts.quality += 10; tags.push('Large Cap'); }
    else if (mcap >=  1e12) { pts.quality +=  7; tags.push('Mid Cap'); }
    else                    { pts.quality +=  4; }
  } else {
    if      (mcap >= 500e9) { pts.quality += 12; tags.push('Mega Cap'); }
    else if (mcap >= 100e9) { pts.quality += 10; tags.push('Large Cap'); }
    else if (mcap >=  20e9) { pts.quality +=  7; tags.push('Mid Cap'); }
    else                    { pts.quality +=  4; }
  }
  // Beta — prefer 0.4–1.1 (risk-adjusted sweet spot)
  const beta = s.beta || 1;
  if      (beta >= 0.4 && beta <= 1.1) { pts.quality += 8; tags.push('Stable Beta'); }
  else if (beta >  1.1 && beta <= 1.4) { pts.quality += 5; }
  else if (beta >  1.4 && beta <= 1.8) { pts.quality += 2; tags.push('High Beta'); }
  else if (beta <  0.4)                { pts.quality += 5; tags.push('Defensive'); }
  else                                 { pts.quality += 1; tags.push('Very Volatile'); }
  // Liquidity
  const avgVol = s.avgVol || 0;
  if      (avgVol >= 10e6) { pts.quality += 5; }
  else if (avgVol >=  2e6) { pts.quality += 3; }
  else                     { pts.quality += 1; }

  // ── INCOME (20 pts) ──────────────────────────────────────────────
  const div = s.div || 0;
  const isFinanceSector = ['Finance', 'Banking', 'Financial Services'].includes(s.sector);
  if      (div >= 5)  { pts.income += 20; tags.push('High Yield'); }
  else if (div >= 3)  { pts.income += 15; tags.push('Good Yield'); }
  else if (div >= 2)  { pts.income += 11; tags.push('Dividend'); }
  else if (div >= 0.5){ pts.income +=  6; tags.push('Small Yield'); }
  else if (isFinanceSector && s.pe > 0 && s.pe < 20) { pts.income += 10; tags.push('Earnings-Driven'); }
  else if (isFinanceSector)                           { pts.income +=  7; tags.push('Reinvests Earnings'); }

  // ── MOMENTUM (15 pts) ─────────────────────────────────────────────
  const chgPct = s.chgPct || 0;
  if      (chgPct >= 2)   { pts.momentum += 15; tags.push('Strong Day'); }
  else if (chgPct >= 1)   { pts.momentum += 11; tags.push('Positive'); }
  else if (chgPct >= 0)   { pts.momentum +=  7; }
  else if (chgPct >= -1)  { pts.momentum +=  4; }
  else if (chgPct >= -2)  { pts.momentum +=  2; tags.push('Weak Day'); }
  else                    { pts.momentum +=  0; tags.push('Selling'); }
  // Volume spike bonus tag (no pts, just informational)
  if (s.vol > 0 && avgVol > 0 && s.vol / avgVol >= 1.5) tags.push('Volume Spike');

  // ── GROWTH (10 pts) ──────────────────────────────────────────────
  if (range > 0) {
    const fromHigh = (s.w52h - s.price) / s.price;
    if      (fromHigh < 0.05) { pts.growth += 10; tags.push('Near 52W High'); }
    else if (fromHigh < 0.15) { pts.growth +=  7; }
    else if (fromHigh < 0.30) { pts.growth +=  4; }
    else                      { pts.growth +=  2; }
  }

  // ── AV BONUS (up to +12 pts when live fundamentals are available) ───
  if (s.avHasData) {
    // Analyst target vs current price (upside potential)
    if (s.avTargetPrice && s.price) {
      const upside = (s.avTargetPrice - s.price) / s.price;
      if      (upside > 0.25) { pts.growth += 4; tags.push('High Upside'); }
      else if (upside > 0.10) { pts.growth += 2; tags.push('Upside Target'); }
      else if (upside < -0.05){ tags.push('Above Target'); }
    }
    // Return on equity
    if      ((s.avROE || 0) > 0.25) { pts.quality += 2; tags.push('High ROE'); }
    else if ((s.avROE || 0) > 0.12) { pts.quality += 1; }
    // Profit margin
    if      ((s.avMargin || 0) > 0.20) { pts.quality += 2; tags.push('High Margin'); }
    else if ((s.avMargin || 0) > 0.10) { pts.quality += 1; }
    // Earnings growth
    if ((s.avEarningsGrowth || 0) > 0.15) { pts.growth += 2; tags.push('EPS Growth'); }
    else if ((s.avEarningsGrowth || 0) > 0.05) { pts.growth += 1; }
    // PEG ratio (< 1 = undervalued relative to growth)
    if      (s.avPEG > 0 && s.avPEG < 1) { pts.valuation += 2; tags.push('PEG < 1'); }
    else if (s.avPEG >= 1 && s.avPEG < 2) { pts.valuation += 1; }
    // Price above 200-DMA = established uptrend
    if (s.avMA200 && s.price > s.avMA200) { pts.momentum += 1; }
  }

  const total = Math.min(100, pts.valuation + pts.quality + pts.income + pts.momentum + pts.growth);

  let rating, ratingCls, ratingColor;
  if      (total >= 72) { rating = 'Strong Buy'; ratingCls = 'sb';  ratingColor = 'var(--green)'; }
  else if (total >= 58) { rating = 'Buy';         ratingCls = 'buy'; ratingColor = 'var(--us)'; }
  else if (total >= 44) { rating = 'Accumulate';  ratingCls = 'acc'; ratingColor = 'var(--yellow)'; }
  else                  { rating = 'Hold';         ratingCls = 'hold';ratingColor = 'var(--text3)'; }

  // Dominant category for filter
  let cat = 'balanced';
  if (pts.income >= 11 && div >= 2) cat = 'income';
  else if (pts.valuation >= 18 && s.pe > 0 && s.pe <= 25) cat = 'value';
  else if ((pts.growth >= 7 || pts.momentum >= 11) && pts.quality >= 7) cat = 'growth';
  else if (s.pe > 0 && s.pe < 25 && pts.quality >= 7) cat = 'profitability';
  else if (beta < 0.8 && pts.quality >= 7) cat = 'debt';

  return { total, pts, tags: [...new Set(tags)].slice(0, 6), rating, ratingCls, ratingColor, cat };
}

function computeAllPicks(db, isIndia) {
  const dateStr = new Date().toISOString().split('T')[0];
  return db
    .map(s => {
      const score = scoreStock(s, isIndia);
      // Small date+symbol hash so close-scored stocks rotate daily while quality leaders stay near top
      let h = 0;
      for (let i = 0; i < s.symbol.length + dateStr.length; i++) {
        const c = i < s.symbol.length ? s.symbol.charCodeAt(i) : dateStr.charCodeAt(i - s.symbol.length);
        h = Math.imul(h ^ c, 0x5bd1e995) | 0;
      }
      score.total = Math.min(100, Math.max(0, score.total + ((h & 0xFF) / 255 * 8) - 4));
      return { ...s, score };
    })
    .sort((a, b) => b.score.total - a.score.total);
}

// ── Enrich one DB with Yahoo Finance live prices ──────────────────────
async function enrichWithYahoo(db, isIndia) {
  if (!isIndia) {
    // US stocks — use Twelve Data batch quote
    const syms = db.slice(0, 20).map(s => s.symbol);
    const quotes = await fetchTwelveQuote(syms);
    if (!quotes.length) return db;
    const map = {};
    quotes.forEach(q => { if (q.symbol) map[q.symbol] = q; });
    return db.map(s => {
      const q = map[s.symbol]; if (!q?.close) return s;
      return mapTwelveQuote(q, s);
    });
  }
  // India stocks — use Twelve Data NSE
  const syms = db.slice(0, 20).map(s => s.symbol);
  const tdResult = await fetchTwelveIndia(syms);
  if (!Object.keys(tdResult).length) return db;
  return db.map(s => {
    const d = tdResult[s.symbol]; if (!d) return s;
    return { ...s, price: d.price, chg: d.chg, chgPct: d.chgPct, open: d.open,
             dayHigh: d.dayHigh, dayLow: d.dayLow, vol: d.vol, avgVol: d.avgVol,
             w52h: d.w52h || s.w52h, w52l: d.w52l || s.w52l, prevClose: d.prevClose };
  });
}

// ── Enrich top-N stocks with live fundamentals ───────────────────────
// US → Twelve Data statistics (cached daily)
// India → Twelve Data NSE quotes
async function enrichWithAV(db, isIndia, topN = 6) {
  if (isIndia) {
    const syms = db.slice(0, topN).map(s => s.symbol);
    const tdResult = await fetchTwelveIndia(syms);
    return db.map(s => {
      const d = tdResult[s.symbol]; if (!d) return s;
      return { ...s, price: d.price, chg: d.chg, chgPct: d.chgPct,
               w52h: d.w52h || s.w52h, w52l: d.w52l || s.w52l };
    });
  }

  const cache = tdCacheLoad();
  const toFetch = db.slice(0, topN).filter(s => !cache[s.symbol]);

  // Parallel fetch — Twelve Data has no strict per-minute limit on stats
  await Promise.all(toFetch.map(async s => {
    const data = await fetchTwelveStats(s.symbol);
    if (data) cache[s.symbol] = data;
  }));

  tdCacheSave(cache);
  return db.map(s => cache[s.symbol] ? mapTwelveStats(cache[s.symbol], s) : s);
}

// ── Init / Refresh ────────────────────────────────────────────────────
function initPicks() {
  // Try to restore today's cached scored picks (avoids any network call on re-visit)
  try {
    const cached = JSON.parse(localStorage.getItem(picksCacheKey()) || 'null');
    if (cached?.us && cached?.india) {
      picksState.us    = cached.us;
      picksState.india = cached.india;
      picksState.liveLoaded = true;
      return;
    }
  } catch {}
  // No cache yet — score from local DB immediately (fast, no network)
  picksState.us    = computeAllPicks(US_STOCKS_DB, false);
  picksState.india = computeAllPicks(INDIA_STOCKS_DB, true);
}

async function refreshPicks(userTriggered = false) {
  const btn = $('picksRefreshBtn');
  if (btn) btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Fetching…';
  if (userTriggered) {
    // Clear today's Twelve Data + AV cache so fresh calls are made
    try { localStorage.removeItem(TD_CACHE_KEY()); localStorage.removeItem(AV_CACHE_KEY()); } catch {}
  }

  try {
    // Step 1 — Yahoo Finance live prices (free, no limit, batch)
    const [yahooUS, yahooIndia] = await Promise.all([
      enrichWithYahoo(US_STOCKS_DB, false),
      enrichWithYahoo(INDIA_STOCKS_DB, true),
    ]);

    // Step 2 — Pre-score to find which stocks will appear in the top picks,
    //           then fetch AV OVERVIEW only for those (conserves daily quota).
    const preUS    = computeAllPicks(yahooUS, false);
    const preIndia = computeAllPicks(yahooIndia, true);

    // Fetch AV for top-6 of each (12 calls/day maximum)
    const [avUS, avIndia] = await Promise.all([
      enrichWithAV(preUS.slice(0, 12).map(s => US_STOCKS_DB.find(d => d.symbol === s.symbol) || s), false, 6),
      enrichWithAV(preIndia.slice(0, 12).map(s => INDIA_STOCKS_DB.find(d => d.symbol === s.symbol) || s), true, 6),
    ]);

    // Merge yahoo prices back onto the AV-enriched rows
    const yahooUSMap = {}; yahooUS.forEach(s => { yahooUSMap[s.symbol] = s; });
    const yahooINMap = {}; yahooIndia.forEach(s => { yahooINMap[s.symbol] = s; });
    const mergedUS    = avUS.map(s    => ({ ...yahooUSMap[s.symbol], ...s, price: yahooUSMap[s.symbol]?.price ?? s.price }));
    const mergedIndia = avIndia.map(s => ({ ...yahooINMap[s.symbol], ...s, price: yahooINMap[s.symbol]?.price ?? s.price }));

    // Final scoring pass with all enriched data
    picksState.us    = computeAllPicks(mergedUS,    false);
    picksState.india = computeAllPicks(mergedIndia, true);
    picksState.liveLoaded = true;

    const badge = $('picksLiveBadge');
    if (badge) badge.style.display = '';

    // Cache final scored picks for the rest of the day
    try { localStorage.setItem(picksCacheKey(), JSON.stringify({ us: picksState.us, india: picksState.india })); } catch {}
    if (userTriggered) toast('Picks refreshed with live Twelve Data');

  } catch(e) {
    console.warn('refreshPicks error:', e);
    if (userTriggered) toast('Fetch partially failed — using best available data', 'error');
  }

  if (btn) btn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Refresh';
  const tsEl = $('picksLastUpdated');
  if (tsEl) tsEl.textContent = new Date().toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
  renderPicks();
}

// ── Navigation helpers ────────────────────────────────────────────────
function setPicksMarket(mkt) {
  picksState.market = mkt;
  document.querySelectorAll('.pkTab').forEach(b => b.classList.toggle('active', b.dataset.pkt === mkt));
  renderPicks();
}

function setPicksCat(cat) {
  picksState.cat = cat;
  document.querySelectorAll('.pkCatTab').forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
  renderPicks();
}

// ── Render ────────────────────────────────────────────────────────────
function renderPicks() {
  const grid = $('picksGrid'); if (!grid) return;
  const isIndia = picksState.market === 'india';
  let data = isIndia ? picksState.india : picksState.us;
  if (!data || !data.length) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><i class="fa-solid fa-circle-notch fa-spin"></i><p>Computing…</p></div>';
    return;
  }

  const cat = picksState.cat;
  const filtered = cat === 'all' ? data : data.filter(s => s.score.cat === cat);
  const top = filtered.slice(0, 9);

  if (!top.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i class="fa-solid fa-filter"></i><p>No picks match this filter — try "All Picks".</p></div>`;
    return;
  }

  const fmt2 = isIndia ? fmtINR : fmtUSD;
  grid.innerHTML = top.map((s, rank) => {
    const sc = s.score;
    const safeSym = s.symbol.replace(/'/g, "\\'");
    const clickFn = isIndia ? `loadIndiaQuick('${safeSym}')` : `loadUSQuick('${safeSym}')`;

    // Tag HTML with contextual colours
    const buyTags = new Set(['Low P/E','Deep Value','High Yield','Good Yield','Dividend','Strong Day','Near 52W Low','Volume Spike']);
    const warnTags = new Set(['High Valuation','Near 52W High','Selling','Very Volatile','High Beta']);
    const yieldTags = new Set(['High Yield','Good Yield','Dividend','Small Yield']);
    const tagsHtml = sc.tags.map(t => {
      const cls = yieldTags.has(t) ? 'tag-yield' : buyTags.has(t) ? 'tag-buy' : warnTags.has(t) ? 'tag-warn' : '';
      return `<span class="pick-tag ${cls}">${t}</span>`;
    }).join('');

    // Mini score bar rows
    const ptsRows = [
      { label:'Valuation', val: sc.pts.valuation, max: 30, color:'var(--us)',     tip:'P/E ratio vs benchmark · 52-week price position' },
      { label:'Quality',   val: sc.pts.quality,   max: 25, color:'var(--green)',  tip:'Market-cap tier · Beta stability · Trading liquidity' },
      { label:'Income',    val: sc.pts.income,    max: 20, color:'var(--yellow)', tip:'Dividend yield · Finance sector: scored on low P/E earnings quality' },
      { label:'Momentum',  val: sc.pts.momentum,  max: 15, color:'var(--india)',  tip:'1-day price change direction & magnitude' },
      { label:'Growth',    val: sc.pts.growth,    max: 10, color:'#bc8cff',       tip:'Proximity to 52W high · Analyst upside target · EPS growth' },
    ].map(r => `<div class="pick-pts-row" title="${r.tip}">
      <span>${r.label}</span>
      <div class="mini-bar"><div style="width:${Math.round(r.val/r.max*100)}%;background:${r.color}"></div></div>
      <span>${r.val}/${r.max}</span>
    </div>`).join('');

    const catCls = sc.cat !== 'balanced' ? `cat-${sc.cat}` : '';
    const addWatchBtn = `<button class="wc-act-btn" style="flex:none;padding:4px 10px;font-size:10px"
      onclick="event.stopPropagation();watchCurrentFromPick('${isIndia?'india':'us'}','${safeSym}','${s.name.replace(/'/g,"\\'")}')"
      title="Add to watchlist"><i class="fa-regular fa-star"></i></button>`;

    return `<div class="pick-card ${catCls}" onclick="openPickReport('${safeSym}', ${isIndia})">
      <div class="pick-card-top">
        <span class="pick-rank">#${rank + 1}</span>
        <div class="pick-sym-block">
          <span class="pick-sym">${s.symbol}</span>
          <span class="pick-name">${s.name}</span>
          <span class="pick-sector">${s.sector}</span>
        </div>
        <div class="pick-rating-block">
          <span class="pick-rating" style="color:${sc.ratingColor};border-color:${sc.ratingColor}">${sc.rating}</span>
          <span class="pick-score">${sc.total.toFixed(1)}<small>/100</small></span>
        </div>
      </div>

      <div class="pick-score-bar"><div style="width:${sc.total}%;background:${sc.ratingColor}"></div></div>

      <div class="pick-metrics">
        <div class="pick-metric"><span>Price</span><strong>${fmt2(s.price)}</strong></div>
        <div class="pick-metric"><span>P/E Ratio</span><strong>${s.pe ? s.pe.toFixed(1) : '—'}</strong></div>
        <div class="pick-metric"><span>Div Yield</span><strong class="${s.div > 0 ? 'positive' : 'neutral'}">${s.div ? s.div.toFixed(2) + '%' : 'Nil'}</strong></div>
        <div class="pick-metric"><span>Beta</span><strong>${s.beta ? s.beta.toFixed(2) : '—'}</strong></div>
        <div class="pick-metric"><span>Market Cap</span><strong>${fmtMcap(s.mcap, isIndia)}</strong></div>
        <div class="pick-metric"><span>1D Change</span><strong class="${chgClass(s.chgPct)}">${chgSign(s.chgPct)}${(s.chgPct || 0).toFixed(2)}%</strong></div>
      </div>

      ${s.avHasData ? (() => {
        const upside = s.avTargetPrice && s.price ? ((s.avTargetPrice - s.price) / s.price * 100) : null;
        return `<div class="pick-av-row">
          <span class="pick-av-label"><i class="fa-solid fa-chart-line" style="font-size:9px;opacity:.6"></i> Analyst Data</span>
          <div class="pick-av-metrics">
            <div class="pick-av-metric"><span>Target</span><strong class="${upside != null && upside >= 0 ? 'positive' : upside != null ? 'negative' : ''}">${s.avTargetPrice ? fmt2(s.avTargetPrice) : '—'}${upside != null ? ` <small>(${upside >= 0 ? '+' : ''}${upside.toFixed(1)}%)</small>` : ''}</strong></div>
            <div class="pick-av-metric"><span>Fwd P/E</span><strong>${s.avForwardPE ? s.avForwardPE.toFixed(1) : '—'}</strong></div>
            <div class="pick-av-metric"><span>ROE</span><strong class="${(s.avROE||0) > 0.15 ? 'positive' : ''}">${s.avROE != null ? (s.avROE * 100).toFixed(1) + '%' : '—'}</strong></div>
            <div class="pick-av-metric"><span>Margin</span><strong class="${(s.avMargin||0) > 0.15 ? 'positive' : ''}">${s.avMargin != null ? (s.avMargin * 100).toFixed(1) + '%' : '—'}</strong></div>
          </div>
        </div>`;
      })() : ''}

      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
        <div class="pick-tags">${tagsHtml}</div>
        ${addWatchBtn}
      </div>

      <div class="pick-breakdown">${ptsRows}</div>
    </div>`;
  }).join('');
}

// Quick-add to watchlist from picks card without navigating
function watchCurrentFromPick(market, symbol, name) {
  const list = activeList();
  if (list.find(w => w.symbol === symbol && w.market === market)) {
    toast(`${symbol} already in "${state.activeWatchlist}"`); return;
  }
  list.push({ market, symbol, name });
  saveWatchlists();
  renderWatchlistTabs();
  toast(`${symbol} added to "${state.activeWatchlist}"`);
}

// =====================================================================
// TOP PICKS — DETAILED REPORT
// =====================================================================

// Mirrors the exact scoring bands in scoreStock() so explanations never drift.
function explainScore(s, isIndia) {
  const p = s.score.pts;
  const range = (s.w52h || 0) - (s.w52l || 0);

  // ── Valuation ──────────────────────────────────────────────────────
  const vr = [];
  if (s.pe > 0) {
    if      (s.pe >= 8 && s.pe <= 15) vr.push(`P/E ${s.pe.toFixed(1)} in the low 8–15 band (undervalued) → +25`);
    else if (s.pe > 15 && s.pe <= 25) vr.push(`P/E ${s.pe.toFixed(1)} is moderate (15–25) → +18`);
    else if (s.pe > 25 && s.pe <= 40) vr.push(`P/E ${s.pe.toFixed(1)} is elevated (25–40) → +11`);
    else if (s.pe < 8)                vr.push(`P/E ${s.pe.toFixed(1)} is very low — deep value → +16`);
    else                              vr.push(`P/E ${s.pe.toFixed(1)} is high premium (>40) → +4`);
  } else vr.push('No P/E available (loss-making or unreported) — baseline +8');
  if (range > 0) {
    const pos = (s.price - s.w52l) / range;
    if      (pos < 0.25) vr.push(`Near 52-week low (${(pos*100).toFixed(0)}% of range) — significant upside room → +5`);
    else if (pos < 0.50) vr.push(`Lower half of 52-week range (${(pos*100).toFixed(0)}%) → +3`);
    else if (pos < 0.75) vr.push(`Upper-middle of 52-week range (${(pos*100).toFixed(0)}%) → +1`);
    else                 vr.push(`Near 52-week high (${(pos*100).toFixed(0)}% of range) — limited valuation cushion`);
  }
  if (s.avHasData && s.avPEG > 0) {
    if      (s.avPEG < 1) vr.push(`PEG ratio ${s.avPEG.toFixed(2)} < 1 — undervalued vs growth rate → +2`);
    else if (s.avPEG < 2) vr.push(`PEG ratio ${s.avPEG.toFixed(2)} — moderate growth premium → +1`);
  }

  // ── Quality ────────────────────────────────────────────────────────
  const qr = [];
  const mcap = s.mcap || 0;
  if (isIndia) {
    if      (mcap >= 10e12) qr.push(`${fmtMcap(mcap,true)} — Mega cap, highest stability tier → +12`);
    else if (mcap >=  3e12) qr.push(`${fmtMcap(mcap,true)} — Large cap, strong institutional backing → +10`);
    else if (mcap >=  1e12) qr.push(`${fmtMcap(mcap,true)} — Mid cap, moderate stability → +7`);
    else                    qr.push(`${fmtMcap(mcap,true)} — Small cap, higher risk → +4`);
  } else {
    if      (mcap >= 500e9) qr.push(`${fmtMcap(mcap)} — Mega cap, highest stability tier → +12`);
    else if (mcap >= 100e9) qr.push(`${fmtMcap(mcap)} — Large cap, strong institutional backing → +10`);
    else if (mcap >=  20e9) qr.push(`${fmtMcap(mcap)} — Mid cap, moderate stability → +7`);
    else                    qr.push(`${fmtMcap(mcap)} — Small cap, higher risk → +4`);
  }
  const beta = s.beta || 1;
  if      (beta >= 0.4 && beta <= 1.1) qr.push(`Beta ${beta.toFixed(2)} in stable 0.4–1.1 sweet spot → +8`);
  else if (beta > 1.1  && beta <= 1.4) qr.push(`Beta ${beta.toFixed(2)} slightly above ideal — moderate volatility → +5`);
  else if (beta > 1.4  && beta <= 1.8) qr.push(`Beta ${beta.toFixed(2)} — high volatility, larger price swings → +2`);
  else if (beta < 0.4)                 qr.push(`Beta ${beta.toFixed(2)} — defensive, moves less than market → +5`);
  else                                 qr.push(`Beta ${beta.toFixed(2)} — very high volatility → +1`);
  const avgVol = s.avgVol || 0;
  if      (avgVol >= 10e6) qr.push(`Avg daily vol ${fmtVol(avgVol)} — excellent liquidity → +5`);
  else if (avgVol >=  2e6) qr.push(`Avg daily vol ${fmtVol(avgVol)} — good liquidity → +3`);
  else                     qr.push(`Avg daily vol ${fmtVol(avgVol)} — limited liquidity → +1`);
  if (s.avHasData) {
    if      ((s.avROE||0) > 0.25) qr.push(`ROE ${((s.avROE||0)*100).toFixed(1)}% — excellent capital efficiency → +2`);
    else if ((s.avROE||0) > 0.12) qr.push(`ROE ${((s.avROE||0)*100).toFixed(1)}% — solid returns → +1`);
    if      ((s.avMargin||0) > 0.20) qr.push(`Profit margin ${((s.avMargin||0)*100).toFixed(1)}% — highly profitable → +2`);
    else if ((s.avMargin||0) > 0.10) qr.push(`Profit margin ${((s.avMargin||0)*100).toFixed(1)}% — healthy margins → +1`);
  }

  // ── Income ─────────────────────────────────────────────────────────
  const ir = [];
  const div = s.div || 0;
  const isFin = ['Finance', 'Banking', 'Financial Services'].includes(s.sector);
  if      (div >= 5)   ir.push(`Dividend yield ${div.toFixed(2)}% — high yield, strong income → +20`);
  else if (div >= 3)   ir.push(`Dividend yield ${div.toFixed(2)}% — good yield → +15`);
  else if (div >= 2)   ir.push(`Dividend yield ${div.toFixed(2)}% — moderate payout → +11`);
  else if (div >= 0.5) ir.push(`Dividend yield ${div.toFixed(2)}% — small but consistent payout → +6`);
  else if (isFin && s.pe > 0 && s.pe < 20) ir.push(`Bank/NBFC: low P/E ${s.pe.toFixed(1)} — scored on earnings quality rather than yield → +10`);
  else if (isFin)      ir.push('Bank/NBFC — reinvests earnings rather than paying dividends → +7');
  else                 ir.push('No meaningful dividend — growth-focused reinvestment (0 income pts)');

  // ── Momentum ───────────────────────────────────────────────────────
  const mr = [];
  const c = s.chgPct || 0;
  const mPts = c>=2?'+15 strong bullish':c>=1?'+11 positive':c>=0?'+7 flat-up':c>=-1?'+4 mild dip':c>=-2?'+2 weak':'+0 selling';
  mr.push(`1-day move ${chgSign(c)}${c.toFixed(2)}% — ${mPts}`);
  if (s.vol > 0 && avgVol > 0) {
    const vr2 = s.vol / avgVol;
    if (vr2 >= 1.5) mr.push(`Volume ${fmtVol(s.vol)} is ${vr2.toFixed(1)}× average — unusual activity / strong conviction`);
    else            mr.push(`Volume ${fmtVol(s.vol)} is ${vr2.toFixed(1)}× average`);
  }
  if (s.avHasData && s.avMA200 && s.price) {
    const fmt2 = isIndia ? fmtINR : fmtUSD;
    mr.push(s.price > s.avMA200
      ? `Price above 200-DMA ${fmt2(s.avMA200)} — established uptrend → +1`
      : `Price below 200-DMA ${fmt2(s.avMA200)} — below long-term trend`);
  }

  // ── Growth ─────────────────────────────────────────────────────────
  const gr = [];
  if (range > 0) {
    const fh = (s.w52h - s.price) / s.price;
    gr.push(`${(fh*100).toFixed(0)}% below 52-week high — ${fh<0.05?'at highs, strong trend → +10':fh<0.15?'near highs → +7':fh<0.30?'moderate drawdown → +4':'significant drawdown → +2'}`);
  }
  if (s.avHasData && s.avTargetPrice && s.price) {
    const up = (s.avTargetPrice - s.price) / s.price * 100;
    const fmt2 = isIndia ? fmtINR : fmtUSD;
    gr.push(`Analyst consensus target ${fmt2(s.avTargetPrice)} — ${up>=0?'+':''}${up.toFixed(1)}% implied upside${up>25?' → +4':up>10?' → +2':up<-5?' (above target)':''}`);
  }
  if (s.avHasData && (s.avEarningsGrowth||0) > 0.05) {
    gr.push(`EPS growth ${((s.avEarningsGrowth||0)*100).toFixed(1)}% YoY → ${(s.avEarningsGrowth||0)>0.15?'+2':'+1'}`);
  }

  return {
    valuation: { score: p.valuation, max: 30, reasons: vr },
    quality:   { score: p.quality,   max: 25, reasons: qr },
    income:    { score: p.income,    max: 20, reasons: ir },
    momentum:  { score: p.momentum,  max: 15, reasons: mr },
    growth:    { score: p.growth,    max: 10, reasons: gr },
  };
}

// =====================================================================
// METRIC EXPLANATIONS — educational text + per-stock interpretation
// =====================================================================
const METRIC_INFO = {
  pe: {
    label: 'P/E Ratio (Price-to-Earnings)',
    what: 'How many rupees/dollars investors pay for every ₹1/$1 of the company\'s annual earnings. Calculated as: Share Price ÷ Earnings Per Share. It is the single most common gauge of how "expensive" a stock is relative to its profits.',
    ideal: 'No universal number — it depends on the sector and growth rate. Roughly: under 15 is often "cheap", 15–25 is fair for a steady company, 25–40 implies the market expects strong growth, and above 40 is richly priced (you are paying a lot today for future growth that must materialise).',
    caveat: 'A low P/E can mean a bargain OR a company in trouble (the market expects earnings to fall). A high P/E is fine for a fast grower but dangerous if growth disappoints. Loss-making companies have no meaningful P/E.',
    interpret: (s) => {
      if (!(s.pe > 0)) return 'This stock has no P/E — it is either loss-making or earnings data is unavailable. Valuation must be judged on other metrics such as Price/Sales or Price/Book.';
      if (s.pe < 8)    return `At ${s.pe.toFixed(1)}, this is deep-value territory — very cheap by earnings, but verify the business is not in structural decline.`;
      if (s.pe <= 15)  return `At ${s.pe.toFixed(1)}, this is on the lower/cheaper end — potentially undervalued. Check whether earnings are stable or likely to fall.`;
      if (s.pe <= 25)  return `At ${s.pe.toFixed(1)}, this sits in the fair-value zone for an established, moderately growing company.`;
      if (s.pe <= 40)  return `At ${s.pe.toFixed(1)}, the market is pricing in solid growth. Justified only if earnings keep compounding.`;
      return `At ${s.pe.toFixed(1)}, this is richly valued — a lot of future growth is already priced in, leaving little room for any disappointment.`;
    }
  },
  beta: {
    label: 'Beta (Market Sensitivity)',
    what: 'Beta measures how much this stock moves relative to the overall market index. A Beta of 1.0 means it moves exactly in line with the index. Above 1 means it amplifies market moves (more volatile); below 1 means it is steadier than the market; negative Beta means it tends to move opposite the market (very rare, e.g. gold miners in some conditions).',
    ideal: 'Depends on your risk appetite. 0.8–1.1 is a balanced "moves roughly with the market" zone. Below 0.8 = defensive (FMCG, utilities, pharma — good for capital protection in downturns). 1.2–1.5 = moderately aggressive. Above 1.5 = high-octane — big gains in rallies, big losses in crashes.',
    caveat: 'Beta measures volatility and correlation, NOT quality or future direction. A high-beta stock is not "bad" — it is simply a rougher ride. Beta is calculated on historical data and can shift over time as a company\'s business model changes.',
    interpret: (s) => {
      const b = s.beta || 1;
      if (b < 0.6)      return `At ${b.toFixed(2)}, this is a very defensive stock — it historically moves little relative to the market. Great for capital preservation; limited upside in strong rallies.`;
      if (b < 0.8)      return `At ${b.toFixed(2)}, this is mildly defensive — expect smaller swings than the index in both directions. Suitable for conservative investors.`;
      if (b <= 1.1)     return `At ${b.toFixed(2)}, this moves roughly in step with the market — a balanced risk profile. Neither particularly defensive nor aggressive.`;
      if (b <= 1.4)     return `At ${b.toFixed(2)}, this is moderately aggressive — expect larger swings than the index. Good for growth investors comfortable with volatility.`;
      if (b <= 1.8)     return `At ${b.toFixed(2)}, this is high-volatility — it will significantly amplify both market rallies and crashes. Size your position carefully.`;
      return `At ${b.toFixed(2)}, this is extremely volatile — suitable only for high-conviction, short-duration trades with tight risk management.`;
    }
  },
  alpha: {
    label: 'Alpha (Risk-Adjusted Outperformance)',
    what: 'Alpha is the return a stock or portfolio delivered ABOVE (or below) what its level of risk (Beta) would predict. If a stock has a Beta of 1.2 and the market returned 10%, the "expected" return for that stock is 12%. If it actually returned 15%, the Alpha is +3%. Positive alpha means the stock beat its risk-adjusted benchmark — it "added value" beyond what the risk implied.',
    ideal: 'Any positive Alpha is desirable — it means outperformance after accounting for the risk taken. Consistently positive alpha over multiple years is the hallmark of a high-quality business or skilled fund manager. Zero alpha means the stock delivered exactly what its risk profile implied.',
    caveat: 'Computing Alpha requires a multi-year history of returns regressed against a benchmark index. This terminal does not currently pull historical price series data, so a live Alpha figure cannot be calculated without introducing misleading results. It is listed here for education.',
    interpret: () => 'Alpha is not calculated in this terminal — it requires a full historical return series regressed against a benchmark (Nifty 50 / S&P 500). Computing it from incomplete data would be misleading. Use a dedicated research platform (e.g. Screener.in for India, Macrotrends for US) for historical Alpha data.'
  },
  mcap: {
    label: 'Market Capitalisation (Company Size)',
    what: 'The total market value of all outstanding shares: Share Price × Total Shares Outstanding. It represents the market\'s current assessment of the entire company\'s worth. Categories in India: Mega Cap >₹10T, Large Cap ₹3–10T, Mid Cap ₹1–3T, Small Cap <₹1T. In the US: Mega Cap >$500B, Large Cap $100–500B, Mid Cap $20–100B, Small Cap <$20B.',
    ideal: 'Not inherently good or bad — it is a size indicator. Larger caps are more stable, more liquid, and harder to manipulate. Smaller caps can grow significantly faster but come with higher risk, lower liquidity, and greater volatility.',
    caveat: 'Size does not equal quality. A mega-cap can be overvalued; a small-cap can be a hidden gem. Market cap changes daily with the share price — a falling cap can trigger forced selling by index funds if a stock drops out of an index.',
    interpret: (s, isIndia) => {
      const m = s.mcap || 0;
      const tier = isIndia
        ? (m>=10e12?'Mega Cap (>₹10T)':m>=3e12?'Large Cap (₹3–10T)':m>=1e12?'Mid Cap (₹1–3T)':'Small Cap (<₹1T)')
        : (m>=500e9?'Mega Cap (>$500B)':m>=100e9?'Large Cap ($100–500B)':m>=20e9?'Mid Cap ($20–100B)':'Small Cap (<$20B)');
      const desc = m>=(isIndia?10e12:500e9)?'Stable, highly liquid, index heavyweight — lower growth potential but strong downside protection.':
                   m>=(isIndia?3e12:100e9)?'Established company with strong institutional ownership — good balance of stability and growth.':
                   m>=(isIndia?1e12:20e9)?'Growth potential with moderate risk — watch liquidity and promoter holding.':
                   'Higher growth potential but elevated risk, lower liquidity, and more volatile price action.';
      return `At ${fmtMcap(m, isIndia)}, this is a ${tier} company. ${desc}`;
    }
  },
  div: {
    label: 'Dividend Yield',
    what: 'The annual cash dividend paid per share, expressed as a percentage of the current share price. Formula: (Annual Dividend Per Share ÷ Share Price) × 100. It is the income you earn from simply holding the stock, entirely separate from any price gains.',
    ideal: '2–4% is generally a healthy, sustainable yield for an income-oriented stock. Above 5% is attractive but warrants scrutiny — is the payout ratio sustainable? 0% is perfectly normal (and often desirable) for growth companies and most banks/NBFCs that reinvest profits rather than distributing them.',
    caveat: 'Beware the "yield trap": a very high yield can signal that the share price has already crashed, or that the dividend is about to be cut. A falling share price mathematically pushes up the yield — always check the payout ratio (dividends ÷ earnings). If it exceeds 100%, the company is paying out more than it earns, which is unsustainable.',
    interpret: (s) => {
      const d = s.div || 0;
      if (d === 0) return 'This stock pays no dividend — typical of a high-growth company reinvesting all profits. Your entire return depends on price appreciation.';
      if (d < 1)   return `At ${d.toFixed(2)}%, this is a token yield — primarily a growth stock that returns a small amount to shareholders.`;
      if (d < 2)   return `At ${d.toFixed(2)}%, a modest yield — some income, but the main return is expected from price growth.`;
      if (d <= 4)  return `At ${d.toFixed(2)}%, this is a healthy, sustainable dividend. Good for income investors. Verify the payout ratio is below 80%.`;
      if (d <= 6)  return `At ${d.toFixed(2)}%, this is a high yield — attractive for income, but check the payout ratio and whether earnings support it.`;
      return `At ${d.toFixed(2)}%, this is an unusually high yield. It could be a genuine income opportunity OR a warning sign that the share price has fallen sharply. Investigate thoroughly before investing.`;
    }
  },
  range52: {
    label: '52-Week Price Range',
    what: 'The highest and lowest closing price the stock has traded at over the past 52 weeks (one year). Where the current price sits within this band provides quick context on recent momentum and potential value. Near the low = possible value or continued decline. Near the high = strong momentum or limited near-term upside.',
    ideal: 'There is no universally "ideal" position in the range. Value investors often prefer stocks near their 52-week lows (potential bargain); momentum investors prefer stocks near their 52-week highs (strength breeds strength). The key is understanding WHY the stock is where it is.',
    caveat: 'Position in the 52-week range is a symptom, not a diagnosis. A stock near its low could be a genuine bargain — or it could be in freefall for a fundamental reason (deteriorating earnings, sector headwinds, accounting concerns). Always pair with business analysis.',
    interpret: (s, isIndia) => {
      const range = (s.w52h||0)-(s.w52l||0);
      if (range <= 0) return '52-week range data is unavailable for this stock.';
      const pos = (s.price - s.w52l)/range*100;
      const f = isIndia ? fmtINR : fmtUSD;
      const context = pos<20?'Very near its yearly low — historically a value entry point, but verify the underlying business is intact and the slide has stopped.':
                      pos<40?'In the lower portion of its yearly range — potential value, but the stock has been under pressure.':
                      pos<60?'Roughly in the middle of its yearly range — neither a clear value play nor a momentum play.':
                      pos<80?'In the upper portion of its yearly range — showing relative strength; momentum is with the stock.':
                      'Near its 52-week high — strong momentum and market confidence, but limited near-term upside cushion.';
      return `Currently at ${f(s.price)}, which is ${pos.toFixed(0)}% of its 52-week range (${f(s.w52l)} → ${f(s.w52h)}). ${context}`;
    }
  },
  roe: {
    label: 'ROE — Return on Equity',
    what: 'How efficiently the company generates profit from shareholders\' invested money. Calculated as: Net Profit ÷ Shareholders\' Equity. If a company has ₹100 crore of equity on its books and earns ₹20 crore, its ROE is 20%. It is one of the best single measures of management quality and business efficiency.',
    ideal: 'Above 15% is generally considered good. Above 20–25% is excellent and characteristic of high-quality, competitively advantaged businesses (think consumer brands, software, pharma). Below 10% is weak for most sectors.',
    caveat: 'ROE can be artificially inflated by heavy debt — borrowed money boosts returns but also amplifies risk. Always read ROE alongside the Debt-to-Equity ratio. A 40% ROE funded mostly by debt is far less impressive than a 25% ROE with minimal borrowing.',
    interpret: (s) => {
      if (s.avROE == null) return 'ROE data is loading for this stock — check back in a moment.';
      const r = s.avROE*100;
      if (r > 30) return `At ${r.toFixed(1)}%, this is outstanding ROE — the company generates exceptional returns on shareholder capital. Verify it is not driven by heavy debt.`;
      if (r > 20) return `At ${r.toFixed(1)}%, this is excellent — a hallmark of a high-quality business with competitive advantages.`;
      if (r > 15) return `At ${r.toFixed(1)}%, this is good — management uses capital efficiently above the typical cost of equity.`;
      if (r > 10) return `At ${r.toFixed(1)}%, this is moderate — acceptable for capital-intensive sectors, but weaker for asset-light businesses.`;
      if (r > 0)  return `At ${r.toFixed(1)}%, this is on the weaker side — the company generates relatively little profit per rupee of equity.`;
      return `At ${r.toFixed(1)}%, ROE is negative — the company is eroding shareholder equity, which is a serious concern.`;
    }
  },
  margin: {
    label: 'Net Profit Margin',
    what: 'The percentage of total revenue that remains as profit after all costs — including operating expenses, interest, and taxes. Calculated as: Net Profit ÷ Revenue × 100. A 20% margin means the company keeps ₹20 for every ₹100 it earns in revenue.',
    ideal: 'Highly sector-dependent. Software/SaaS companies often achieve 20–35%. Pharma typically 15–25%. Banks use a different metric (NIM). Retail and FMCG run on 3–8% — that is normal and healthy for them. Industrial/manufacturing: 5–12%. The key is to compare within the same sector.',
    caveat: 'Never compare margins across sectors — a 5% margin is terrible for a software company but excellent for a grocery retailer. Also watch for one-time items distorting margins (asset sales, write-offs) that inflate or deflate the number artificially.',
    interpret: (s) => {
      if (s.avMargin == null) return 'Profit margin data is loading for this stock — check back in a moment.';
      const m = s.avMargin*100;
      if (m > 25) return `At ${m.toFixed(1)}%, this is a very strong margin — the company keeps a large share of every sale. Characteristic of strong pricing power or a high-value product.`;
      if (m > 15) return `At ${m.toFixed(1)}%, this is a healthy margin. The company is profitably converting revenue to earnings.`;
      if (m > 8)  return `At ${m.toFixed(1)}%, this is a decent margin — solid for most traditional industries.`;
      if (m > 0)  return `At ${m.toFixed(1)}%, this is a thin margin — normal for retail or commodity businesses; weak for asset-light companies. Monitor for margin compression.`;
      return `At ${m.toFixed(1)}%, the company is unprofitable on a net basis. Operating losses are being incurred — understand why before investing.`;
    }
  },
  peg: {
    label: 'PEG Ratio (Price/Earnings-to-Growth)',
    what: 'The P/E ratio divided by the expected annual earnings growth rate. Formula: P/E ÷ EPS Growth Rate. A stock with a P/E of 30 and 30% earnings growth has a PEG of 1.0. PEG improves on P/E alone by asking: "is the high P/E justified by the growth you are getting?"',
    ideal: 'Below 1.0 is often cited as "undervalued relative to growth" — you are not paying a full premium for the growth on offer. Around 1.0 is considered fairly valued. Above 2.0 suggests the market is pricing in growth that may not materialise. Popularised by legendary investor Peter Lynch.',
    caveat: 'PEG is only as good as the growth estimate plugged into it. Analyst growth forecasts are frequently wrong — especially beyond 2 years. A low PEG from an unrealistically high growth assumption is not a genuine bargain. Use it as one data point, not a buy signal in isolation.',
    interpret: (s) => {
      if (!(s.avPEG > 0)) return 'PEG ratio data is not available for this stock. It requires both trailing P/E and a forward earnings growth estimate.';
      if (s.avPEG < 0.75) return `At ${s.avPEG.toFixed(2)}, this looks significantly undervalued relative to its growth rate — a potentially strong signal, but verify the growth estimate is realistic.`;
      if (s.avPEG < 1.0)  return `At ${s.avPEG.toFixed(2)}, this appears undervalued relative to its growth — the classic Peter Lynch "buy" signal.`;
      if (s.avPEG < 1.5)  return `At ${s.avPEG.toFixed(2)}, this is fairly valued once growth is factored in — you are paying a modest premium for the expected earnings expansion.`;
      if (s.avPEG < 2.0)  return `At ${s.avPEG.toFixed(2)}, this is moderately expensive even accounting for growth.`;
      return `At ${s.avPEG.toFixed(2)}, this is expensive relative to its growth rate — the P/E is high and growth alone does not fully justify it.`;
    }
  },
  eps: {
    label: 'EPS — Earnings Per Share',
    what: 'The company\'s total net profit divided by its total number of outstanding shares. It tells you: "for each single share I own, how much profit did the company earn this year?" Formula: Net Profit ÷ Shares Outstanding. A rising EPS over time is one of the strongest indicators of a healthy, growing business.',
    ideal: 'Positive and consistently growing EPS over multiple years. The absolute number matters less than the trend — a company growing EPS at 15–20% annually is compounding shareholder value powerfully. Flat or declining EPS warrants investigation.',
    caveat: 'EPS can be boosted artificially through share buybacks — buying back shares reduces the denominator, mathematically raising EPS even without real profit growth. One quarter of EPS tells you very little; look at the 3–5 year trend. Also watch for "adjusted EPS" which strips out one-time charges — the gap between reported and adjusted EPS can reveal management\'s accounting choices.',
    interpret: (s, isIndia) => {
      if (s.avEPS == null) return 'EPS data is loading for this stock — check back in a moment.';
      const f = isIndia ? fmtINR : fmtUSD;
      if (s.avEPS > 0) return `Trailing twelve-month EPS is ${f(s.avEPS)} per share — the company is profitable. Compare this number against prior years to assess the earnings growth trend, which matters more than the absolute level.`;
      if (s.avEPS === 0) return 'EPS is at breakeven — the company is covering its costs but generating no surplus profit yet.';
      return `EPS is ${f(s.avEPS)} — the company is currently loss-making on a per-share basis. Evaluate whether it has a credible path to profitability and whether cash burn is manageable.`;
    }
  },
  ma: {
    label: 'Moving Averages (50-Day / 200-Day)',
    what: 'The 50-day moving average (50-DMA) is the average closing price over the last 50 trading days; the 200-DMA is the average over the last 200 days. By smoothing out daily noise, these lines reveal the underlying trend. The 50-DMA tracks the medium-term trend; the 200-DMA tracks the long-term trend. Widely used by both retail and institutional investors as reference points.',
    ideal: 'Price above 200-DMA = long-term uptrend (bullish). Price below 200-DMA = long-term downtrend (bearish). The "Golden Cross" (50-DMA crossing above 200-DMA) is a classic long-term buy signal. The "Death Cross" (50-DMA crossing below 200-DMA) is a sell/caution signal.',
    caveat: 'Moving averages are lagging indicators — they confirm a trend only after it has already started. In a choppy, sideways market they generate many false signals. They are most reliable in strongly trending markets. Do not use them as sole entry/exit signals; combine with volume and fundamentals.',
    interpret: (s, isIndia) => {
      if (!s.avMA200 && !s.avMA50) return 'Moving average data is loading for this stock — it will appear after the live data fetch completes.';
      const f = isIndia ? fmtINR : fmtUSD;
      const parts = [];
      if (s.avMA200) {
        const pct = ((s.price - s.avMA200)/s.avMA200*100).toFixed(1);
        parts.push(`Price ${f(s.price)} is ${s.price > s.avMA200 ? 'ABOVE' : 'BELOW'} the 200-DMA at ${f(s.avMA200)} (${pct > 0 ? '+' : ''}${pct}%) — indicating a long-term ${s.price > s.avMA200 ? 'uptrend' : 'downtrend'}.`);
      }
      if (s.avMA50) {
        parts.push(`It is ${s.price > s.avMA50 ? 'above' : 'below'} the 50-DMA (${f(s.avMA50)}) — ${s.price > s.avMA50 ? 'medium-term momentum is positive' : 'medium-term momentum is negative'}.`);
      }
      if (s.avMA50 && s.avMA200) {
        parts.push(s.avMA50 > s.avMA200 ? 'The 50-DMA is above the 200-DMA — a "Golden Cross" structure, broadly bullish.' : 'The 50-DMA is below the 200-DMA — a "Death Cross" structure, broadly bearish.');
      }
      return parts.join(' ');
    }
  },
  volume: {
    label: 'Volume & Average Volume',
    what: 'Volume is the number of shares traded in a session. Average volume is the mean daily volume over the past 20–90 days (depending on the data source). Volume is the fuel behind price moves — it measures how much conviction is behind a rally or a sell-off.',
    ideal: 'No absolute "good" level — what matters is how today\'s volume compares to the average. Volume 50%+ above average on an up day = strong buying conviction, a good sign. Volume 50%+ above average on a down day = strong selling pressure, a bad sign. Volume well below average = weak conviction either way.',
    caveat: 'High volume is direction-agnostic — it confirms momentum, but does not tell you which direction. A stock crashing on record volume is a warning, not a buying signal. Equally, a small price move on enormous volume can indicate institutional accumulation (good) or distribution (bad) — watch the price direction.',
    interpret: (s) => {
      if (!(s.vol > 0) || !(s.avgVol > 0)) return 'Volume data is not available for this stock.';
      const ratio = s.vol / s.avgVol;
      const dir = (s.chgPct || 0) >= 0 ? 'up' : 'down';
      const conv = ratio >= 2 ? 'extremely high — very strong conviction':
                   ratio >= 1.5 ? 'well above normal — strong conviction':
                   ratio >= 0.8 ? 'roughly normal':
                   ratio >= 0.5 ? 'below average — weak conviction':
                   'very low — very little conviction';
      return `Today's volume is ${fmtVol(s.vol)} vs a ${fmtVol(s.avgVol)} daily average (${ratio.toFixed(1)}×). This is ${conv} behind today's ${dir} move. ${ratio >= 1.5 && dir === 'up' ? 'High volume on an up day confirms buying interest.' : ratio >= 1.5 && dir === 'down' ? 'High volume on a down day signals significant selling pressure — take caution.' : ratio < 0.5 ? 'Low volume moves are easily reversed when normal trading resumes.' : ''}`;
    }
  },
};

// Toggle an expandable metric explanation panel
function toggleMetricInfo(key) {
  const el = document.getElementById('minfo-' + key);
  if (el) el.classList.toggle('open');
}

// Build one metric row: value chip + expandable full explanation
function _metricRow(key, valueHtml, s, isIndia) {
  const info = METRIC_INFO[key];
  if (!info) return '';
  const interp = info.interpret(s, isIndia);
  return `<div class="rpt-metric">
    <div class="rpt-metric-head" onclick="toggleMetricInfo('${key}')">
      <span class="rpt-metric-label">${info.label}</span>
      <span class="rpt-metric-value">${valueHtml}</span>
      <button class="rpt-metric-q" title="Full explanation">?</button>
    </div>
    <div class="rpt-metric-info" id="minfo-${key}">
      <p><strong>What it is:</strong> ${info.what}</p>
      <p><strong>What's a good value:</strong> ${info.ideal}</p>
      <p><strong>Watch out for:</strong> ${info.caveat}</p>
      <p class="rpt-metric-interp"><strong>This stock:</strong> ${interp}</p>
    </div>
  </div>`;
}

function closePickReport() {
  switchSection(state.pickReportReturn || 'picks');
}

function loadPickInTerminal(symbol, isIndia) {
  state.navSource = 'picks';
  isIndia ? loadIndiaQuick(symbol) : loadUSQuick(symbol);
}

// Search any stock from the picks search bar and open its report page
async function searchStockReport(rawInput) {
  const sym = (rawInput || '').trim().toUpperCase();
  if (!sym) { toast('Enter a stock symbol to search', 'warn'); return; }

  const isIndia = picksState.market === 'india';

  // Show loading immediately
  state.pickReportReturn = 'picks';
  state.pickReportStock  = { symbol: sym, isIndia };
  switchSection('pick-report');
  const body = $('pickReportBody');
  if (body) body.innerHTML = `
    <div class="rpt-search-loading">
      <i class="fa-solid fa-circle-notch fa-spin fa-2x"></i>
      <p>Fetching data for <strong>${sym}</strong>…</p>
    </div>`;

  try {
    // For Indian stocks try NSE first, then fall back to BSE
    const baseSym = sym.replace(/\.(NSE|BSE)$/i, '');
    let tdSym = sym;
    let qRes = null, stRes = null;

    if (isIndia) {
      const tryFetch = async (suffix) => {
        const s = `${baseSym}.${suffix}`;
        const q = await fetch(`${TD_BASE}/quote?symbol=${encodeURIComponent(s)}&apikey=${TD_KEY}`).then(r => r.json()).catch(() => null);
        return (q && q.status !== 'error' && q.close) ? { q, sym: s } : null;
      };
      const nse = await tryFetch('NSE');
      if (nse) { tdSym = nse.sym; qRes = nse.q; }
      else {
        const bse = await tryFetch('BSE');
        if (bse) { tdSym = bse.sym; qRes = bse.q; }
      }
      if (qRes) {
        stRes = await fetch(`${TD_BASE}/statistics?symbol=${encodeURIComponent(tdSym)}&apikey=${TD_KEY}`).then(r => r.json()).catch(() => null);
      }
    } else {
      [qRes, stRes] = await Promise.all([
        fetch(`${TD_BASE}/quote?symbol=${encodeURIComponent(sym)}&apikey=${TD_KEY}`).then(r => r.json()).catch(() => null),
        fetch(`${TD_BASE}/statistics?symbol=${encodeURIComponent(sym)}&apikey=${TD_KEY}`).then(r => r.json()).catch(() => null),
      ]);
    }

    // If user navigated away while fetching, abort
    if (state.pickReportStock?.symbol !== sym) return;

    const quoteOk = qRes && qRes.status !== 'error' && qRes.close;

    if (!quoteOk) {
      if (body) body.innerHTML = `
        <div class="empty-state" style="padding:60px 20px">
          <i class="fa-solid fa-circle-exclamation" style="font-size:2.5rem;color:var(--red)"></i>
          <p style="margin-top:16px">No data found for <strong>${sym}</strong>${isIndia ? ' on NSE or BSE' : ''}.<br>
          <span style="font-size:0.85rem;color:var(--text3)">Check the symbol spelling and make sure the correct market (US / India) is selected in Top Picks.</span></p>
          <button class="btn-outline" style="margin-top:20px" onclick="switchSection('picks')">
            <i class="fa-solid fa-arrow-left"></i> Back to Picks
          </button>
        </div>`;
      return;
    }

    // Build stock object from API data
    let s = {
      symbol: sym,
      name: qRes.name || sym,
      sector: 'Unknown',
      price: 0, chgPct: 0, chg: 0,
      pe: 0, beta: 1, mcap: 0, div: 0,
      w52l: 0, w52h: 0, vol: 0, avgVol: 0,
    };
    s = mapTwelveQuote(qRes, s);
    s.name = qRes.name || sym;

    if (stRes && stRes.status !== 'error' && stRes.statistics) {
      s = mapTwelveStats(stRes, s);
    }

    s.score = scoreStock(s, isIndia);

    await openPickReport(sym, isIndia, s);

  } catch (e) {
    if ($('pickReportBody') && state.pickReportStock?.symbol === sym) {
      $('pickReportBody').innerHTML = `
        <div class="empty-state" style="padding:60px 20px">
          <i class="fa-solid fa-circle-exclamation" style="font-size:2.5rem;color:var(--red)"></i>
          <p style="margin-top:16px">Failed to load data for <strong>${sym}</strong>: ${e.message}</p>
        </div>`;
    }
  }
}

async function openPickReport(symbol, isIndia, prebuilt = null) {
  let s = prebuilt;
  if (!s) {
    const data = isIndia ? picksState.india : picksState.us;
    s = data?.find(x => x.symbol === symbol);
    if (!s) { toast('Pick data unavailable', 'error'); return; }
  }

  state.pickReportReturn = 'picks';
  state.pickReportStock  = { symbol, isIndia };
  switchSection('pick-report');

  const body = $('pickReportBody');
  const fmt2 = isIndia ? fmtINR : fmtUSD;
  const sc = s.score;
  const reasoning = explainScore(s, isIndia);

  // News: live feed first, then fall back to curated NEWS_DB
  const inferSrc = h => /fed|rbi|rate|inflation|gdp|cpi/i.test(h) ? 'Reuters' :
                        /earnings|profit|revenue|PAT|quarterly/i.test(h) ? 'Bloomberg' :
                        /fda|usfda|drug|pharma/i.test(h) ? 'BioPharma Dive' :
                        /antitrust|court|probe|fine/i.test(h) ? 'Financial Times' :
                        isIndia ? 'Economic Times' : 'MarketWatch';
  let news = newsState.feed.filter(n => (n.stocks||[]).includes(symbol) && n.market===(isIndia?'india':'us')).slice(0, 6);
  if (news.length < 2) {
    const fallback = NEWS_DB
      .filter(n => n.stocks.includes(symbol) && n.market===(isIndia?'india':'us'))
      .map(n => ({ ...n, ts: Date.now() - n.ageMin * 60 * 1000, source: inferSrc(n.headline) }));
    news = [...news, ...fallback].slice(0, 6);
  }

  const safeSym = symbol.replace(/'/g, "\\'");

  // Score-category block
  const catBlock = (key, label, color) => {
    const r = reasoning[key];
    return `<div class="rpt-cat">
      <div class="rpt-cat-head">
        <span class="rpt-cat-name" style="color:${color}">${label}</span>
        <span class="rpt-cat-score">${r.score}/${r.max}</span>
      </div>
      <div class="rpt-cat-bar"><div style="width:${(r.score/r.max*100).toFixed(0)}%;background:${color}"></div></div>
      <ul class="rpt-cat-reasons">${r.reasons.map(x=>`<li>${x}</li>`).join('')}</ul>
    </div>`;
  };

  const newsHtml = news.length ? news.map(n => {
    const srcUrl = (n.url && n.url.startsWith('http')) ? n.url : (NEWS_SOURCE_URLS[n.source] || '#');
    return `<div class="rpt-news">
      <span class="news-severity-dot ${n.severity||'medium'}"></span>
      <div>
        <a href="${srcUrl}" target="_blank" rel="noopener noreferrer">${n.headline}</a>
        <span class="rpt-news-src">${n.source||'Market Wire'} · ${timeAgo(n.ts)}</span>
      </div>
    </div>`;
  }).join('') : `<p class="rpt-muted">No recent news tagged for ${symbol}. Check the market news feed for macro updates.</p>`;

  // Metric rows available immediately (no API call needed)
  const baseMetrics =
    _metricRow('pe',      s.pe ? s.pe.toFixed(1) : '—',             s, isIndia) +
    _metricRow('beta',    s.beta ? s.beta.toFixed(2) : '—',          s, isIndia) +
    _metricRow('alpha',   '<span class="rpt-na">N/A — see explanation</span>', s, isIndia) +
    _metricRow('mcap',    fmtMcap(s.mcap, isIndia),                  s, isIndia) +
    _metricRow('div',     s.div ? s.div.toFixed(2)+'%' : 'Nil',      s, isIndia) +
    _metricRow('range52', `${fmt2(s.w52l)} – ${fmt2(s.w52h)}`,       s, isIndia) +
    _metricRow('volume',  s.vol ? fmtVol(s.vol) : '—',               s, isIndia);

  body.innerHTML = `
    <div class="rpt-top">
      <div>
        <div class="rpt-sym">${s.symbol} <span class="rpt-flag">${isIndia?'🇮🇳':'🇺🇸'}</span></div>
        <div class="rpt-name">${s.name}</div>
        <div class="rpt-sector">${s.sector}</div>
      </div>
      <div class="rpt-rating-wrap">
        <span class="rpt-rating" style="color:${sc.ratingColor};border-color:${sc.ratingColor}">${sc.rating}</span>
        <span class="rpt-total">${sc.total.toFixed(1)}<small>/100</small></span>
        <span class="rpt-price">${fmt2(s.price)} <span class="${chgClass(s.chgPct)}">${chgSign(s.chgPct)}${(s.chgPct||0).toFixed(2)}%</span></span>
      </div>
    </div>

    <p class="rpt-hint"><i class="fa-solid fa-circle-info"></i> Tap the <strong>?</strong> next to any metric for a full explanation of what it means, what a good value looks like, and how to read this stock's specific number.</p>

    <div class="rpt-section">
      <h3><i class="fa-solid fa-table-cells"></i> Fundamentals &amp; Indicators</h3>
      <div class="rpt-metrics" id="rptMetrics">${baseMetrics}</div>
      <div class="rpt-live-note" id="rptLiveNote"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading live financials (ROE, margins, PEG, moving averages)…</div>
    </div>

    <div class="rpt-section">
      <h3><i class="fa-solid fa-flask"></i> Why This Score (${sc.total.toFixed(1)}/100)</h3>
      ${catBlock('valuation','Valuation','var(--us)')}
      ${catBlock('quality','Quality','var(--green)')}
      ${catBlock('income','Income','var(--yellow)')}
      ${catBlock('momentum','Momentum','var(--india)')}
      ${catBlock('growth','Growth','#bc8cff')}
    </div>

    <div class="rpt-section">
      <h3><i class="fa-solid fa-bolt"></i> Recent News</h3>
      ${newsHtml}
    </div>

    <div class="rpt-disclaimer">
      Scores are algorithmic, based on quantitative factors only — not investment advice. Explanations are educational context only. Always conduct your own research before making any investment decision.
    </div>

    <button class="rpt-chart-btn" onclick="loadPickInTerminal('${safeSym}', ${isIndia})">
      <i class="fa-solid fa-chart-line"></i> Open Chart in Terminal
    </button>
  `;

  // Async live stats enrichment (US only — Twelve Data statistics endpoint)
  if (!isIndia) {
    try {
      const stats = await fetchTwelveStats(symbol);
      if (state.pickReportStock?.symbol !== symbol) return; // user navigated away
      const note = $('rptLiveNote');
      if (stats?.statistics) {
        const m = mapTwelveStats(stats, s);
        const metricsEl = $('rptMetrics');
        if (metricsEl) {
          const extra =
            _metricRow('roe',    m.avROE    != null ? (m.avROE*100).toFixed(1)+'%'    : '—', m, isIndia) +
            _metricRow('margin', m.avMargin != null ? (m.avMargin*100).toFixed(1)+'%' : '—', m, isIndia) +
            _metricRow('peg',    m.avPEG    ?          m.avPEG.toFixed(2)              : '—', m, isIndia) +
            _metricRow('eps',    m.avEPS    != null ?  fmt2(m.avEPS)                   : '—', m, isIndia) +
            _metricRow('ma',     m.avMA200  ?          fmt2(m.avMA200)                 : '—', m, isIndia);
          metricsEl.insertAdjacentHTML('beforeend', extra);
        }
        if (note) note.remove();
      } else if (note) {
        note.innerHTML = '<span class="rpt-muted">Live financials (ROE, margins, PEG, moving averages) unavailable for this stock.</span>';
      }
    } catch {
      const note = $('rptLiveNote');
      if (note) note.innerHTML = '<span class="rpt-muted">Live financials unavailable for this stock.</span>';
    }
  } else {
    const note = $('rptLiveNote');
    if (note) note.remove();
  }
}

// =====================================================================
// BREAKING NEWS ENGINE
// =====================================================================

const NEWS_DB = [
  // ── US TECH ──────────────────────────────────────────────────────
  { id:1,  headline:'NVIDIA posts record quarterly earnings — Data center revenue hits $18.4B, beats estimates by 22%', stocks:['NVDA'], sectors:['Technology'], severity:'breaking', market:'us', ageMin:0 },
  { id:2,  headline:'Apple unveils iPhone 17 with titanium foldable display — pre-orders open next week, analysts raise targets', stocks:['AAPL'], sectors:['Technology'], severity:'high', market:'us', ageMin:3 },
  { id:3,  headline:'Microsoft Azure cloud growth accelerates to 31% YoY — AI services and Copilot drive strong momentum', stocks:['MSFT'], sectors:['Technology'], severity:'high', market:'us', ageMin:6 },
  { id:4,  headline:'Tesla delivers record 515,000 vehicles in Q1 2025 — exceeds Wall Street estimates of 480K', stocks:['TSLA'], sectors:['Consumer'], severity:'high', market:'us', ageMin:9 },
  { id:5,  headline:'Meta doubles AI infrastructure spend — Zuckerberg commits $65B to data centers through 2025', stocks:['META'], sectors:['Technology'], severity:'medium', market:'us', ageMin:12 },
  { id:6,  headline:'Google DOJ antitrust ruling: court orders Chrome browser divested — Alphabet shares fall 4.2%', stocks:['GOOGL'], sectors:['Technology'], severity:'breaking', market:'us', ageMin:15 },
  { id:7,  headline:'Amazon AWS launches Trainium 3 AI chip to rival NVIDIA — cloud customers get early access', stocks:['AMZN','NVDA'], sectors:['Technology'], severity:'high', market:'us', ageMin:18 },
  { id:8,  headline:'AMD gains 3% after announcing MI350 GPU — enterprise AI adoption accelerating faster than expected', stocks:['AMD'], sectors:['Technology'], severity:'medium', market:'us', ageMin:20 },
  // ── US FINANCE ───────────────────────────────────────────────────
  { id:9,  headline:'Fed signals June rate cut — Jerome Powell: "inflation is sustainably trending toward 2%"', stocks:['JPM','BAC','V','MA'], sectors:['Finance'], severity:'breaking', market:'us', ageMin:2 },
  { id:10, headline:'JPMorgan Q1 profit surges 7% — net interest income beats on higher deposit rates', stocks:['JPM'], sectors:['Finance'], severity:'high', market:'us', ageMin:8 },
  { id:11, headline:'Bank of America faces $250M CFPB fine over overdraft fee practices — regulatory probe widens', stocks:['BAC'], sectors:['Finance'], severity:'high', market:'us', ageMin:14 },
  { id:12, headline:'Visa and Mastercard cap swipe fees under new DOJ settlement — merchants celebrate, stock dips 2%', stocks:['V','MA'], sectors:['Finance'], severity:'medium', market:'us', ageMin:17 },
  // ── US ENERGY / MACRO ────────────────────────────────────────────
  { id:13, headline:'Crude oil surges to $89/barrel — OPEC+ announces surprise 1M bpd production cut', stocks:['XOM','CVX'], sectors:['Energy'], severity:'breaking', market:'us', ageMin:1 },
  { id:14, headline:'US CPI rises 3.2% YoY — core inflation sticky; rate cut timeline pushed to Q4', stocks:[], sectors:[], severity:'breaking', market:'us', ageMin:5 },
  { id:15, headline:'US jobs report: 250K jobs added in April — unemployment falls to 3.7%, wages up 4.1%', stocks:[], sectors:[], severity:'high', market:'us', ageMin:10 },
  { id:16, headline:'China retaliates with 84% tariff on US semiconductor exports — supply chain fears spike', stocks:['AAPL','NVDA','AMD','INTC'], sectors:['Technology'], severity:'breaking', market:'us', ageMin:4 },
  { id:17, headline:'Pfizer obesity drug shows 18% body-weight reduction in Phase 3 — shares surge 12%', stocks:['PFE'], sectors:['Healthcare'], severity:'breaking', market:'us', ageMin:7 },
  { id:18, headline:'UnitedHealth faces congressional probe over Medicare billing practices — stock drops 5.8%', stocks:['UNH'], sectors:['Healthcare'], severity:'high', market:'us', ageMin:11 },
  { id:19, headline:'Netflix subscriber growth beats expectations — adds 9.3M users, ad tier growing fast', stocks:['NFLX'], sectors:['Consumer'], severity:'high', market:'us', ageMin:13 },
  { id:20, headline:'Walmart raises FY2025 guidance — same-store sales up 4.6% as grocery share gains continue', stocks:['WMT'], sectors:['Consumer'], severity:'medium', market:'us', ageMin:16 },
  // ── INDIA ────────────────────────────────────────────────────────
  { id:21, headline:'Reliance Jio files DRHP for landmark IPO — $50B valuation expected, listing by Q3 2025', stocks:['RELIANCE'], sectors:['Telecom','Energy'], severity:'breaking', market:'india', ageMin:0 },
  { id:22, headline:'TCS secures ₹16,400 Cr multi-year digital transformation deal with European banking consortium', stocks:['TCS'], sectors:['Technology'], severity:'high', market:'india', ageMin:4 },
  { id:23, headline:'RBI holds repo rate at 6.5% — Governor signals accommodative stance amid global uncertainty', stocks:['HDFCBANK','ICICIBANK','KOTAKBANK','AXISBANK','BAJFINANCE'], sectors:['Finance'], severity:'breaking', market:'india', ageMin:2 },
  { id:24, headline:'Infosys raises FY25 revenue guidance to 4–7% — Q4 PAT up 11.4% YoY, beats Street estimates', stocks:['INFY'], sectors:['Technology'], severity:'high', market:'india', ageMin:6 },
  { id:25, headline:'Tata Motors EV sales cross 1 lakh unit milestone — Nexon leads, new models pipeline strong', stocks:['TATAMOTORS'], sectors:['Auto'], severity:'high', market:'india', ageMin:8 },
  { id:26, headline:'Supreme Court clears Adani Group on all charges — stock triggers upper circuit, massive short squeeze', stocks:['ADANIENT'], sectors:['Industrial'], severity:'breaking', market:'india', ageMin:1 },
  { id:27, headline:'Sun Pharma receives USFDA approval for Ilumya — blockbuster psoriasis drug, $2B peak sales estimate', stocks:['SUNPHARMA'], sectors:['Pharma'], severity:'breaking', market:'india', ageMin:5 },
  { id:28, headline:'Bajaj Finance net NPA rises to 0.52% — asset quality concerns mount, stock falls 4.5%', stocks:['BAJFINANCE'], sectors:['Finance'], severity:'high', market:'india', ageMin:9 },
  { id:29, headline:'India Q1 GDP growth at 8.2% — beats IMF forecast; manufacturing and services PMI both at multi-year highs', stocks:[], sectors:[], severity:'breaking', market:'india', ageMin:3 },
  { id:30, headline:'Sensex crosses 80,000 for first time in history — FII inflows hit ₹18,500 Cr in a single session', stocks:[], sectors:[], severity:'breaking', market:'india', ageMin:7 },
  { id:31, headline:'L&T wins ₹35,000 Cr metro rail contracts across Mumbai, Pune, Hyderabad and Chennai', stocks:['LT'], sectors:['Industrial'], severity:'high', market:'india', ageMin:10 },
  { id:32, headline:'Maruti Suzuki reports record monthly dispatches of 2.14 lakh units — rural demand surging', stocks:['MARUTI'], sectors:['Auto'], severity:'medium', market:'india', ageMin:12 },
  { id:33, headline:'Wipro announces ₹12,000 Cr buyback at ₹520 per share — 10% premium to current market price', stocks:['WIPRO'], sectors:['Technology'], severity:'high', market:'india', ageMin:11 },
  { id:34, headline:'Bharti Airtel 5G rollout reaches 5,000 towns — average revenue per user hits all-time high', stocks:['BHARTIARTL'], sectors:['Telecom'], severity:'medium', market:'india', ageMin:14 },
  { id:35, headline:'HDFC Bank merger synergies ahead of schedule — branch network crosses 9,200, NIM stable', stocks:['HDFCBANK'], sectors:['Finance'], severity:'medium', market:'india', ageMin:13 },
  { id:36, headline:'Hindustan Unilever faces rural demand pressure — volume growth slows to 2%, margins compress', stocks:['HINDUNILVR'], sectors:['FMCG'], severity:'medium', market:'india', ageMin:15 },
  { id:37, headline:'ICICI Bank Q4 PAT up 17% YoY at ₹10,708 Cr — NII growth strong, asset quality improves sharply', stocks:['ICICIBANK'], sectors:['Finance'], severity:'high', market:'india', ageMin:16 },
  { id:38, headline:'Asian Paints cuts prices by 3–5% across product range after crude-linked raw material costs ease', stocks:['ASIANPAINT'], sectors:['Consumer'], severity:'medium', market:'india', ageMin:17 },
  { id:39, headline:"Dr. Reddy's launches gRevlimid in US — lenalidomide generic, estimated $800M annual opportunity", stocks:['DRREDDY'], sectors:['Pharma'], severity:'high', market:'india', ageMin:18 },
  { id:40, headline:'Titan Company sees festive season jewellery demand surge 32% — same-store sales beat expectations', stocks:['TITAN'], sectors:['Consumer'], severity:'medium', market:'india', ageMin:19 },
];

// ── Real-News RSS Engine ─────────────────────────────────────────────
const NEWS_FEEDS_CONFIG = [
  { url:'https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms', market:'india', source:'Economic Times' },
  { url:'https://www.moneycontrol.com/rss/latestnews.xml',                       market:'india', source:'Moneycontrol'   },
  { url:'https://www.cnbc.com/id/100003114/device/rss/rss.html',                 market:'us',    source:'CNBC'           },
  { url:'https://feeds.reuters.com/reuters/businessNews',                         market:'us',    source:'Reuters'        },
];

const _HL_STOCKS = {
  'apple':['AAPL'],'microsoft':['MSFT'],'google':['GOOGL'],'alphabet':['GOOGL'],
  'amazon':['AMZN'],'nvidia':['NVDA'],'tesla':['TSLA'],'meta platform':['META'],
  'netflix':['NFLX'],'jpmorgan':['JPM'],'jp morgan':['JPM'],
  'bank of america':['BAC'],'visa':['V'],'mastercard':['MA'],
  'walmart':['WMT'],'disney':['DIS'],' amd ':['AMD'],'intel':['INTC'],
  'exxon':['XOM'],'chevron':['CVX'],'pfizer':['PFE'],
  'unitedhealth':['UNH'],'salesforce':['CRM'],
  'reliance':['RELIANCE'],' jio ':['RELIANCE'],
  'tata consultancy':['TCS'],' tcs ':['TCS'],
  'infosys':['INFY'],' infy ':['INFY'],
  'hdfc bank':['HDFCBANK'],'icici bank':['ICICIBANK'],
  'wipro':['WIPRO'],'tata motors':['TATAMOTORS'],
  'bajaj finance':['BAJFINANCE'],'adani':['ADANIENT'],
  'sun pharma':['SUNPHARMA'],'sunpharma':['SUNPHARMA'],
  'larsen':['LT'],' l&t ':['LT'],'maruti':['MARUTI'],
  'kotak':['KOTAKBANK'],'asian paints':['ASIANPAINT'],
  'axis bank':['AXISBANK'],'hindustan unilever':['HINDUNILVR'],' hul ':['HINDUNILVR'],
  ' ntpc ':['NTPC'],' ongc ':['ONGC'],"dr. reddy":['DRREDDY'],"dr reddy":['DRREDDY'],
  'hcl tech':['HCLTECH'],'hcltech':['HCLTECH'],
  'titan company':['TITAN'],' itc ':['ITC'],
  'airtel':['BHARTIARTL'],'bharti':['BHARTIARTL'],'bajaj finserv':['BAJAJFINSV'],
};

function _detectStocks(headline) {
  const h = ` ${headline.toLowerCase()} `;
  const found = new Set();
  Object.entries(_HL_STOCKS).forEach(([k, syms]) => { if (h.includes(k)) syms.forEach(s => found.add(s)); });
  return [...found];
}

function _detectSeverity(headline) {
  const t = headline.toLowerCase();
  if (/\b(crash|collapse|plunge|soar|surge|all[- ]time|record high|record low|bankrupt|fraud|halt|suspend|default|crisis)\b/.test(t)) return 'breaking';
  if (/\b(beat|miss|rise|fall|drop|jump|gain|slip|cut|hike|guidance|profit|loss|q[1-4]|ipo|merger|acqui|takeover)\b/.test(t)) return 'high';
  if (/\b(launch|announc|report|deal|contract|partner|approv|sign|expand|invest)\b/.test(t)) return 'medium';
  return 'low';
}

const NEWS_SOURCE_URLS = {
  'Economic Times': 'https://economictimes.indiatimes.com/markets',
  'Moneycontrol':   'https://www.moneycontrol.com',
  'CNBC':           'https://www.cnbc.com/markets',
  'Reuters':        'https://www.reuters.com/business',
};
function openNewsArticle(id) {
  const item = newsState.feed.find(n => n.id === id);
  if (!item) return;
  const url = (item.url && item.url.startsWith('http')) ? item.url : NEWS_SOURCE_URLS[item.source];
  if (url) window.open(url, '_blank', 'noopener,noreferrer');
}

let _rssIdSeed = Date.now();

// Parse a raw XML string into news items for one feed
function _parseRSSXml(xmlText, feed) {
  const xml = new DOMParser().parseFromString(xmlText, 'text/xml');
  if (xml.querySelector('parsererror')) return [];
  const out = [];
  xml.querySelectorAll('item').forEach(el => {
    let headline = (el.querySelector('title')?.textContent || '').replace(/<!\[CDATA\[|\]\]>/g, '').trim();
    const link   = (el.querySelector('link')?.textContent || el.querySelector('guid')?.textContent || '').trim();
    const pubDate = el.querySelector('pubDate')?.textContent;
    const ts = pubDate ? new Date(pubDate).getTime() : Date.now();
    if (!headline || headline.length < 10) return;
    out.push({
      id: ++_rssIdSeed, headline, url: link, source: feed.source,
      market: feed.market, stocks: _detectStocks(headline), sectors: [],
      severity: _detectSeverity(headline), ts: isNaN(ts) ? Date.now() : ts, read: false,
    });
  });
  return out;
}

// Fetch one feed — tries rss2json (JSON, most reliable) then two XML CORS proxies
async function _fetchOneFeed(feed) {
  const encoded = encodeURIComponent(feed.url);

  // 1. rss2json.com — dedicated RSS-to-JSON service, handles CORS natively
  try {
    const ctrl = new AbortController();
    const tid = setTimeout(() => ctrl.abort(), 8000);
    const r = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encoded}`, { signal: ctrl.signal }).catch(() => null);
    clearTimeout(tid);
    if (r && r.ok) {
      const data = await r.json().catch(() => null);
      if (data?.status === 'ok' && data.items?.length) {
        const items = data.items.map(it => ({
          id: ++_rssIdSeed,
          headline: (it.title || '').replace(/<[^>]+>/g, '').trim(),
          url: it.link || '',
          source: feed.source,
          market: feed.market,
          stocks: _detectStocks(it.title || ''),
          sectors: [],
          severity: _detectSeverity(it.title || ''),
          ts: it.pubDate ? new Date(it.pubDate).getTime() : Date.now(),
          read: false,
        })).filter(n => n.headline.length >= 10);
        if (items.length) return items;
      }
    }
  } catch {}

  // 2. corsproxy.io — raw XML
  // 3. allorigins — XML wrapped in JSON
  const xmlProxies = [
    { url: `https://corsproxy.io/?${encoded}`,              parse: r => r.text() },
    { url: `https://api.allorigins.win/get?url=${encoded}`, parse: r => r.json().then(d => d.contents || '') },
  ];
  for (const proxy of xmlProxies) {
    try {
      const ctrl = new AbortController();
      const tid = setTimeout(() => ctrl.abort(), 6000);
      const r = await fetch(proxy.url, { signal: ctrl.signal }).catch(() => null);
      clearTimeout(tid);
      if (!r || !r.ok) continue;
      const xmlText = await proxy.parse(r);
      if (!xmlText || typeof xmlText !== 'string') continue;
      const items = _parseRSSXml(xmlText, feed);
      if (items.length) return items;
    } catch {}
  }
  return [];
}

async function fetchRealNews() {
  const results = await Promise.allSettled(NEWS_FEEDS_CONFIG.map(_fetchOneFeed));
  const all = results.flatMap(r => r.status === 'fulfilled' ? r.value : []);
  return all.sort((a, b) => b.ts - a.ts).slice(0, 60);
}

async function _refreshNewsFromRSS() {
  try {
    const items = await fetchRealNews();
    if (!items.length) return;
    if (!newsState.seenHeadlines) newsState.seenHeadlines = new Set(newsState.feed.map(n => n.headline));
    const fresh = items.filter(n => !newsState.seenHeadlines.has(n.headline));
    if (!fresh.length) return;
    newsState.realNewsLoaded = true;
    fresh.forEach((n, i) => {
      newsState.seenHeadlines.add(n.headline);
      newsState.feed.unshift(n);
      newsState.unread++;
      (n.stocks || []).forEach(sym => {
        const prev = newsState.activeStockNews[sym];
        const sev = { breaking:4, high:3, medium:2, low:1 };
        if (!prev || sev[n.severity] > sev[prev.severity]) newsState.activeStockNews[sym] = { severity: n.severity, id: n.id };
        setTimeout(() => delete newsState.activeStockNews[sym], 8*60*1000);
      });
      if (i === 0) { showBreakingBanner(n); updateTerminalStrips(n); }
    });
    if (newsState.feed.length > 80) newsState.feed = newsState.feed.slice(0, 80);
    renderNewsFeed();
    renderTickerBar();
    updateMoverBadges();
  } catch {}
}

// Time ago string
function timeAgo(ms) {
  const s = Math.floor((Date.now()-ms)/1000);
  if (s < 60) return 'Just now';
  if (s < 3600) return Math.floor(s/60)+'m ago';
  return Math.floor(s/3600)+'h ago';
}

// ── INIT ────────────────────────────────────────────────────────────
function initNewsEngine() {
  newsState.engineIdx = 0;
  newsState.seenHeadlines = new Set();

  // Fetch real RSS — fall back to fake dispatch only if RSS completely fails
  fetchRealNews().then(items => {
    if (items.length >= 4) {
      const cutoff = Date.now() - 30*60*1000;
      newsState.feed = items.map(n => ({ ...n, read: n.ts < cutoff }));
      newsState.seenHeadlines = new Set(items.map(n => n.headline));
      newsState.realNewsLoaded = true;
      renderNewsFeed();
      renderTickerBar();
    } else {
      setTimeout(() => dispatchNextNews(), 12000);
    }
  }).catch(() => { setTimeout(() => dispatchNextNews(), 12000); });

  // Re-fetch every 10 minutes for new articles
  setInterval(_refreshNewsFromRSS, 10*60*1000);
}

// ── Dispatch one news item from queue ───────────────────────────────
function dispatchNextNews() {
  if (newsState.realNewsLoaded) return;
  if (newsState.engineIdx >= NEWS_DB.length) newsState.engineIdx = 0;
  const item = { ...NEWS_DB[newsState.engineIdx], ts: Date.now(), read: false };
  newsState.engineIdx++;
  newsState.feed.unshift(item);
  if (newsState.feed.length > 60) newsState.feed.pop();
  newsState.unread++;

  // Update active stock badges map
  (item.stocks||[]).forEach(sym => {
    const prev = newsState.activeStockNews[sym];
    const sev = { breaking:4, high:3, medium:2, low:1 };
    if (!prev || sev[item.severity] > sev[prev.severity]) {
      newsState.activeStockNews[sym] = { severity: item.severity, id: item.id };
    }
  });

  // Clear badge after 8 minutes
  (item.stocks||[]).forEach(sym => {
    setTimeout(() => { delete newsState.activeStockNews[sym]; }, 8*60*1000);
  });

  showBreakingBanner(item);
  renderNewsFeed();
  renderTickerBar();
  updateTerminalStrips(item);
  updateMoverBadges();

  // Schedule next
  const delay = 25000 + Math.random()*15000;
  setTimeout(() => dispatchNextNews(), delay);
}

// ── Breaking Banner ──────────────────────────────────────────────────
function showBreakingBanner(item) {
  const banner = $('breakingBanner'); if (!banner) return;
  clearTimeout(newsState.bannerTimer);

  const cls = item.severity === 'breaking' ? '' : item.severity === 'high' ? ' high' : ' medium';
  const label = item.severity === 'breaking' ? '🚨 BREAKING' : item.severity === 'high' ? '⚡ ALERT' : '📢 NEWS';

  banner.className = 'breaking-banner visible' + cls;
  setEl('breakingLabel', label);
  setEl('breakingHeadline', item.headline);

  const now = new Date();
  setEl('breakingTime', now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}));

  const stocksWrap = $('breakingStocksWrap');
  if (stocksWrap) {
    const mkt = item.market;
    stocksWrap.innerHTML = (item.stocks||[]).map(sym =>
      `<button class="breaking-stock-chip" onclick="${mkt==='india'?`loadIndiaQuick('${sym}')`:`loadUSQuick('${sym}')`}">${sym}</button>`
    ).join('') + (item.sectors||[]).slice(0,2).map(sec =>
      `<span style="font-size:10px;padding:3px 7px;background:var(--bg4);color:var(--text3);border-radius:3px">${sec}</span>`
    ).join('');
  }

  // Auto-dismiss after 12s
  newsState.bannerTimer = setTimeout(() => closeBanner(), 12000);
}

function closeBanner() {
  const b = $('breakingBanner'); if (b) b.className = 'breaking-banner';
}

// ── News Toast ────────────────────────────────────────────────────────
function showNewsToast(item) {
  const t = $('newsToast'); if (!t) return;
  const cls = item.severity === 'breaking' ? '' : item.severity === 'high' ? ' high' : ' medium';
  const label = item.severity === 'breaking' ? '🚨 BREAKING' : item.severity === 'high' ? '⚡ ALERT' : '📢 NEWS';
  t.className = 'news-toast show' + cls;
  setEl('newsToastLabel', label);
  setEl('newsToastBody', item.headline);
  const mkt = item.market;
  setEl('newsToastStocks', (item.stocks||[]).map(sym =>
    `<span class="news-stock-tag ${mkt}" onclick="${mkt==='india'?`loadIndiaQuick('${sym}')`:`loadUSQuick('${sym}')`}" style="cursor:pointer">${mkt==='us'?'🇺🇸':'🇮🇳'} ${sym}</span>`
  ).join(''));
  setTimeout(() => { if (t) t.className = 'news-toast' + cls; }, 8000);
}

function closeNewsToast() { const t=$('newsToast'); if(t) t.className='news-toast'; }

// ── News Feed (Dashboard) ─────────────────────────────────────────────
function renderNewsFeed() {
  const list = $('newsFeedList'); if (!list) return;
  const unread = newsState.feed.filter(n => !n.read).length;
  newsState.unread = unread;

  const badge = $('newsUnreadBadge');
  if (badge) {
    badge.style.display = unread > 0 ? '' : 'none';
    badge.textContent = unread + ' new';
  }

  if (!newsState.feed.length) return;
  renderIndiaTerminalNews();
  list.innerHTML = newsState.feed.slice(0,25).map(item => {
    const mkt = item.market;
    const unreadCls = item.read ? '' : ` unread ${item.severity}`;
    const timeTxt = timeAgo(item.ts);
    const stockTags = (item.stocks||[]).slice(0,4).map(sym =>
      `<span class="news-stock-tag ${mkt}" onclick="${mkt==='india'?`loadIndiaQuick('${sym}')`:`loadUSQuick('${sym}')`}">${mkt==='us'?'🇺🇸':'🇮🇳'} ${sym}</span>`
    ).join('');
    const sectorTags = (item.sectors||[]).slice(0,2).map(s =>
      `<span class="news-sector-tag">${s}</span>`
    ).join('');
    const effectiveSrc = item.source || (item.market === 'india' ? 'ET Markets' : 'Market Wire');
    const hasLink = (item.url && item.url.startsWith('http')) || !!NEWS_SOURCE_URLS[item.source];
    const srcTag = hasLink
      ? `<span class="news-source-tag clickable" onclick="openNewsArticle(${item.id})" title="${item.url ? 'Read full article' : 'Visit ' + effectiveSrc}">${effectiveSrc}</span>`
      : `<span class="news-source-tag">${effectiveSrc}</span>`;
    const hlHtml = item.url
      ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="news-headline-link">${item.headline}</a>`
      : item.headline;
    return `<div class="news-item${unreadCls}" id="newsitem-${item.id}">
      <div class="news-item-severity"><span class="news-severity-dot ${item.severity}"></span></div>
      <div class="news-item-body">
        <div class="news-item-headline">${hlHtml}</div>
        <div class="news-item-meta">
          <span class="news-item-time">${timeTxt}</span>
          ${srcTag}${stockTags}${sectorTags}
        </div>
      </div>
    </div>`;
  }).join('');
}

function markAllNewsRead() {
  newsState.feed.forEach(n => { n.read = true; });
  newsState.unread = 0;
  renderNewsFeed();
}

// ── India Terminal News Panel ──────────────────────────────────────────
function renderIndiaTerminalNews() {
  const list = $('indiaTerminalNewsList'); if (!list) return;
  const items = newsState.feed.filter(n => n.market === 'india').slice(0, 12);
  if (!items.length) return;
  list.innerHTML = items.map(item => {
    const unreadCls = item.read ? '' : ` unread ${item.severity}`;
    const stockTags = (item.stocks || []).slice(0, 3).map(sym =>
      `<span class="news-stock-tag india" onclick="loadIndiaQuick('${sym}')" style="cursor:pointer">🇮🇳 ${sym}</span>`
    ).join('');
    const effectiveSrc2 = item.source || (item.market === 'india' ? 'ET Markets' : 'Market Wire');
    const hasLink2 = (item.url && item.url.startsWith('http')) || !!NEWS_SOURCE_URLS[item.source];
    const srcTag = hasLink2
      ? `<span class="news-source-tag clickable" onclick="openNewsArticle(${item.id})" title="${item.url ? 'Read full article' : 'Visit ' + effectiveSrc2}">${effectiveSrc2}</span>`
      : `<span class="news-source-tag">${effectiveSrc2}</span>`;
    const hlHtml = item.url
      ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="news-headline-link">${item.headline}</a>`
      : item.headline;
    return `<div class="news-item${unreadCls}">
      <div class="news-item-severity"><span class="news-severity-dot ${item.severity}"></span></div>
      <div class="news-item-body">
        <div class="news-item-headline">${hlHtml}</div>
        <div class="news-item-meta">
          <span class="news-item-time">${timeAgo(item.ts)}</span>${srcTag}${stockTags}
        </div>
      </div>
    </div>`;
  }).join('');
}

// ── Terminal News Strips ───────────────────────────────────────────────
function updateTerminalStrips(item) {
  const stripId = item.market === 'us' ? 'usNewsStrip' : 'indiaNewsStrip';
  const strip = $(stripId); if (!strip) return;

  // Add this item at top
  const existing = strip.querySelectorAll('.strip-item');
  if (existing.length >= 3) existing[existing.length-1].remove();

  const div = document.createElement('div');
  div.className = 'strip-item';
  div.innerHTML = `
    <span class="strip-sev-pill ${item.severity}">${item.severity==='breaking'?'🚨 BREAKING':item.severity==='high'?'⚡ ALERT':'📢 NEWS'}</span>
    <span class="strip-headline">${item.headline}</span>
    ${(item.stocks||[]).slice(0,3).map(s=>`<span class="news-stock-tag ${item.market}" style="font-size:10px;padding:2px 5px;cursor:pointer" onclick="${item.market==='india'?`loadIndiaQuick('${s}')`:`loadUSQuick('${s}')`}">${s}</span>`).join('')}
    <span class="strip-time">${new Date(item.ts).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})}</span>`;

  strip.insertBefore(div, strip.firstChild);
  strip.className = 'terminal-news-strip ' + (item.market==='us'?'us-strip':'india-strip') + ' has-news';

  // Auto-hide strip after 5 minutes if no new news
  setTimeout(() => {
    const remaining = strip.querySelectorAll('.strip-item');
    if (remaining.length) remaining[remaining.length-1].remove();
    if (!strip.querySelectorAll('.strip-item').length) strip.className = strip.className.replace(' has-news','');
  }, 5*60*1000);
}

// Populate terminal strip for the current stock when loading a stock
function populateTerminalNewsForSymbol(sym, market) {
  const strip = $(market==='us'?'usNewsStrip':'indiaNewsStrip');
  if (!strip) return;
  strip.innerHTML = '';
  const relevant = newsState.feed.filter(n => (n.stocks||[]).includes(sym) && n.market===market).slice(0,3);
  if (!relevant.length) { strip.className = strip.className.replace(' has-news',''); return; }
  relevant.forEach(item => {
    const div = document.createElement('div');
    div.className = 'strip-item';
    div.innerHTML = `
      <span class="strip-sev-pill ${item.severity}">${item.severity==='breaking'?'🚨 BREAKING':item.severity==='high'?'⚡ ALERT':'📢 NEWS'}</span>
      <span class="strip-headline">${item.headline}</span>
      <span class="strip-time">${timeAgo(item.ts)}</span>`;
    strip.appendChild(div);
  });
  strip.className = 'terminal-news-strip ' + (market==='us'?'us-strip':'india-strip') + ' has-news';
}

// ── Flash affected table rows ──────────────────────────────────────────
function flashAffectedRows(item) {
  (item.stocks||[]).forEach(sym => {
    document.querySelectorAll(`[data-sym="${sym}"]`).forEach(el => {
      el.classList.add('row-flash');
      setTimeout(() => el.classList.remove('row-flash'), 5000);
    });
  });
}

// ── Mover badge update ─────────────────────────────────────────────────
function updateMoverBadges() {
  document.querySelectorAll('.mover-item').forEach(el => {
    const sym = el.querySelector('.mover-sym')?.textContent;
    if (!sym) return;
    const newsInfo = newsState.activeStockNews[sym];
    let badge = el.querySelector('.news-badge');
    if (newsInfo) {
      if (!badge) { badge = document.createElement('span'); badge.className = 'news-badge'; el.querySelector('.mover-sym').after(badge); }
      badge.className = `news-badge ${newsInfo.severity}`;
      badge.innerHTML = `<i class="fa-solid fa-bolt"></i> ${newsInfo.severity.toUpperCase()}`;
      badge.onclick = (e) => { e.stopPropagation(); switchSection('dashboard'); setTimeout(()=>{ const el=$(`newsitem-${newsInfo.id}`); if(el){el.scrollIntoView({behavior:'smooth',block:'center'});} }, 300); };
    } else if (badge) {
      badge.remove();
    }
  });
}

// ── Ticker bar ────────────────────────────────────────────────────────
function renderTickerBar() {
  const el = $('tickerContent'); if (!el) return;
  const latest = newsState.feed[0];
  if (!latest) return;

  const symHtml = (latest.stocks||[]).slice(0,3).map(s =>
    `<span class="ticker-sym ${latest.market}">${s}</span>`
  ).join(' ');
  const sevCls = latest.severity==='breaking'?'ticker-breaking':latest.severity==='high'?'ticker-high':'';
  const icon = latest.severity==='breaking'?'🚨':latest.severity==='high'?'⚡':'📰';
  el.innerHTML = `<span class="${sevCls}">${icon} ${symHtml?symHtml+' — ':''}${latest.headline}</span>`;
}

// ── Override loadUSQuick / loadIndiaQuick to populate strips ──────────
const _origLoadUS = loadUSQuick;
window.loadUSQuick = function(sym) {
  _origLoadUS(sym);
  setTimeout(() => populateTerminalNewsForSymbol(sym, 'us'), 100);
};
const _origLoadIndia = loadIndiaQuick;
window.loadIndiaQuick = function(sym) {
  _origLoadIndia(sym);
  setTimeout(() => populateTerminalNewsForSymbol(sym, 'india'), 100);
};

// Update time-ago strings every minute
setInterval(() => { if (newsState.feed.length) renderNewsFeed(); }, 60000);

// ========== PORTFOLIO X-RAY ==========
const XRAY_DB = (function() {
  const nifty50 = [
    ['RELIANCE','Energy',10.12],['HDFCBANK','Banking',9.92],['ICICIBANK','Banking',7.85],
    ['INFY','IT',6.20],['TCS','IT',5.85],['BHARTIARTL','Telecom',4.12],
    ['AXISBANK','Banking',3.18],['KOTAKBANK','Banking',3.05],['LT','Infrastructure',3.02],
    ['SBIN','Banking',2.95],['BAJFINANCE','NBFC',2.78],['HINDUNILVR','FMCG',2.45],
    ['WIPRO','IT',1.98],['ULTRACEMCO','Cement',1.82],['TITAN','Consumer',1.75],
    ['MARUTI','Auto',1.68],['NTPC','Utilities',1.45],['POWERGRID','Utilities',1.38],
    ['ONGC','Energy',1.25],['M&M','Auto',1.22],['SUNPHARMA','Pharma',1.18],
    ['ADANIENT','Conglomerate',1.15],['HCLTECH','IT',1.12],['TECHM','IT',0.98],
    ['COALINDIA','Metals',0.95],['BAJAJFINSV','NBFC',0.92],['TATACONSUM','FMCG',0.88],
    ['DRREDDY','Pharma',0.85],['ASIANPAINT','Consumer',0.82],['BRITANNIA','FMCG',0.78],
  ];
  const bankBees = [
    ['HDFCBANK','Banking',27.5],['ICICIBANK','Banking',22.3],['AXISBANK','Banking',11.2],
    ['KOTAKBANK','Banking',10.8],['SBIN','Banking',9.5],['INDUSINDBK','Banking',4.2],
    ['BANDHANBNK','Banking',3.8],['AUBANK','Banking',2.8],['BANKBARODA','Banking',2.6],
    ['IDFCFIRSTB','Banking',2.3],['FEDERALBNK','Banking',1.5],['RBLBANK','Banking',1.5],
  ];
  const juniorBees = [
    ['ADANIPORTS','Infrastructure',4.5],['ATGL','Energy',3.8],['VEDL','Metals',3.5],
    ['SIEMENS','Industrials',3.2],['DLF','Real Estate',3.0],['PIDILITIND','Consumer',2.8],
    ['HAVELLS','Consumer',2.6],['GRASIM','Cement',2.5],['BERGEPAINT','Consumer',2.3],
    ['MUTHOOTFIN','NBFC',2.2],['MARICO','FMCG',2.0],['COLPAL','FMCG',1.9],
    ['HDFCLIFE','Insurance',1.8],['SBILIFE','Insurance',1.7],['BAJAJ-AUTO','Auto',1.6],
    ['HEROMOTOCO','Auto',1.5],['EICHERMOT','Auto',1.4],['BOSCHLTD','Auto',1.3],
    ['TORNTPHARM','Pharma',1.2],['ALKEM','Pharma',1.1],['LUPIN','Pharma',1.0],
    ['DIVISLAB','Pharma',0.9],['AUROPHARMA','Pharma',0.85],['PIIND','Agro',0.80],
  ];
  const sp500 = [
    ['AAPL','Technology',7.1],['MSFT','Technology',6.8],['NVDA','Technology',5.5],
    ['AMZN','Consumer Disc.',3.8],['META','Technology',2.5],['GOOGL','Communication',2.0],
    ['GOOG','Communication',1.9],['TSLA','Consumer Disc.',1.8],['JPM','Financials',1.6],
    ['UNH','Healthcare',1.2],['V','Financials',1.1],['LLY','Healthcare',1.0],
    ['JNJ','Healthcare',0.95],['PG','Consumer Staples',0.92],['MA','Financials',0.90],
    ['HD','Consumer Disc.',0.88],['AVGO','Technology',0.85],['ABBV','Healthcare',0.82],
    ['MRK','Healthcare',0.78],['XOM','Energy',0.75],['BAC','Financials',0.72],
    ['CVX','Energy',0.68],['COST','Consumer Staples',0.65],['GS','Financials',0.62],
    ['AMD','Technology',0.60],['NFLX','Communication',0.55],['WMT','Consumer Staples',0.52],
    ['KO','Consumer Staples',0.48],['PFE','Healthcare',0.45],['TMO','Healthcare',0.42],
  ];
  const qqq = [
    ['AAPL','Technology',8.9],['MSFT','Technology',8.4],['NVDA','Technology',7.8],
    ['AMZN','Consumer Disc.',5.1],['META','Technology',4.2],['GOOGL','Communication',2.8],
    ['GOOG','Communication',2.7],['TSLA','Consumer Disc.',2.4],['AVGO','Technology',2.1],
    ['AMD','Technology',1.8],['COST','Consumer Staples',1.6],['NFLX','Communication',1.5],
    ['ADBE','Technology',1.4],['PEP','Consumer Staples',1.1],['CSCO','Technology',1.0],
    ['QCOM','Technology',0.95],['CMCSA','Communication',0.88],['TXN','Technology',0.85],
    ['AMAT','Technology',0.82],['INTC','Technology',0.75],['LRCX','Technology',0.72],
    ['MU','Technology',0.68],['PANW','Technology',0.65],['KLAC','Technology',0.62],
    ['REGN','Healthcare',0.60],['ISRG','Healthcare',0.58],['MRVL','Technology',0.55],
    ['CRWD','Technology',0.52],['FTNT','Technology',0.50],['ABNB','Consumer Disc.',0.48],
  ];
  return {
    'NIFTYBEES':  { name: 'Nifty 50 BeES',            market: 'india', top: nifty50 },
    'BANKBEES':   { name: 'Bank BeES (Nifty Bank)',    market: 'india', top: bankBees },
    'JUNIORBEES': { name: 'Junior BeES (Nifty Next 50)',market:'india', top: juniorBees },
    'SPY':        { name: 'SPDR S&P 500 ETF',          market: 'us',   top: sp500 },
    'QQQ':        { name: 'Invesco NASDAQ 100 ETF',    market: 'us',   top: qqq },
  };
})();

const XRAY_ALIASES = {
  'NIFTY50':'NIFTYBEES','NIFTY':'NIFTYBEES','N50':'NIFTYBEES','NIFTYLARGECAP':'NIFTYBEES',
  'BANKNIFTY':'BANKBEES','NIFTYBANK':'BANKBEES','BANKIETF':'BANKBEES',
  'NIFTYNEXT50':'JUNIORBEES','JUNIORNIFTY':'JUNIORBEES',
  'VOO':'SPY','IVV':'SPY','VTI':'SPY','SPLG':'SPY',
  'NASDAQ100':'QQQ','ONEQ':'QQQ','NDX':'QQQ',
};

const XRAY_COLORS = {
  'Banking':'#3b82f6','Financials':'#3b82f6','IT':'#8b5cf6','Technology':'#8b5cf6',
  'Energy':'#f97316','FMCG':'#22c55e','Consumer Staples':'#22c55e','Consumer':'#10b981',
  'Auto':'#14b8a6','Consumer Disc.':'#14b8a6','Healthcare':'#06b6d4','Pharma':'#06b6d4',
  'Telecom':'#ec4899','Communication':'#ec4899','Infrastructure':'#eab308','Industrials':'#f59e0b',
  'Utilities':'#84cc16','NBFC':'#a78bfa','Metals':'#9ca3af','Materials':'#9ca3af',
  'Cement':'#d97706','Conglomerate':'#f43f5e','Real Estate':'#10b981',
  'Insurance':'#60a5fa','Agro':'#65a30d','Other':'#6b7280',
};

function _xrCol(sector) { return XRAY_COLORS[sector] || '#6b7280'; }

// ── Comprehensive NSE symbol → sector map ────────────────────────────────
const INDIA_SECTOR_MAP = {
  // Technology / IT
  TCS:'Technology',INFY:'Technology',WIPRO:'Technology',HCLTECH:'Technology',TECHM:'Technology',
  LTIM:'Technology',LTIMINDTREE:'Technology',MPHASIS:'Technology',PERSISTENT:'Technology',
  COFORGE:'Technology',KPITTECH:'Technology',TATAELXSI:'Technology',HEXAWARE:'Technology',
  NIIT:'Technology',CYIENT:'Technology',MASTEK:'Technology',NAUKRI:'Technology',
  MAPMYINDIA:'Technology',HAPPSTMNDS:'Technology',BIRLASOFT:'Technology',TANLA:'Technology',
  RATEGAIN:'Technology',NEWGEN:'Technology',KELLTON:'Technology',SAKSOFT:'Technology',
  INTELLECT:'Technology',ECLERX:'Technology',ZENSAR:'Technology',MSSL:'Technology',
  // Finance / Banking
  HDFCBANK:'Finance',ICICIBANK:'Finance',KOTAKBANK:'Finance',SBIN:'Finance',AXISBANK:'Finance',
  INDUSINDBK:'Finance',FEDERALBNK:'Finance',BANDHANBNK:'Finance',IDFCFIRSTB:'Finance',
  RBLBANK:'Finance',YESBANK:'Finance',AUBANK:'Finance',CANBK:'Finance',BANKBARODA:'Finance',
  PNB:'Finance',UNIONBANK:'Finance',INDIANB:'Finance',IOB:'Finance',UCOBANK:'Finance',
  CENTRALBK:'Finance',MAHABANK:'Finance',DCBBANK:'Finance',KARURVYSYA:'Finance',
  CITYUNIONB:'Finance',EQUITASBNK:'Finance',UJJIVANSFB:'Finance',ESAFSFB:'Finance',
  BAJFINANCE:'Finance',BAJAJFINSV:'Finance',CHOLAFIN:'Finance',MUTHOOTFIN:'Finance',
  MANAPPURAM:'Finance',LICHSGFIN:'Finance',PNBHOUSING:'Finance',CANFINHOME:'Finance',
  HOMEFIRST:'Finance',APTUS:'Finance',AAVAS:'Finance',REPCO:'Finance',HDFCAMC:'Finance',
  NIPPONIND:'Finance',ICICIGI:'Finance',SBILIFE:'Finance',HDFCLIFE:'Finance',LICI:'Finance',
  STARHEALTH:'Finance',SBICARD:'Finance',ANGELONE:'Finance',MOTILALOFS:'Finance',
  IIFL:'Finance',NUVAMA:'Finance',BSE:'Finance',CDSL:'Finance',MCX:'Finance',
  CREDITACC:'Finance',SPANDANA:'Finance',UGROCAP:'Finance',JMFINANCIL:'Finance',
  PAISALO:'Finance',POONAWALLA:'Finance',FIVESTAR:'Finance',SHRIRAMFIN:'Finance',
  LICSGFIN:'Finance',RECLTD:'Finance',PFC:'Finance',IRFC:'Finance',
  // Energy / Power / Oil
  RELIANCE:'Energy',ONGC:'Energy',NTPC:'Energy',POWERGRID:'Energy',COALINDIA:'Energy',
  BPCL:'Energy',HPCL:'Energy',IOC:'Energy',GAIL:'Energy',PETRONET:'Energy',
  MGL:'Energy',IGL:'Energy',ATGL:'Energy',GUJGASLTD:'Energy',GSPL:'Energy',
  ADANIGREEN:'Energy',ADANIPOWER:'Energy',ADANITRANS:'Energy',TATAPOWER:'Energy',
  TORNTPOWER:'Energy',CESC:'Energy',NHPC:'Energy',SJVN:'Energy',SUZLON:'Energy',
  INOXWIND:'Energy',OIL:'Energy',MRPL:'Energy',CHENNPETRO:'Energy',JSWENERGY:'Energy',
  RPOWER:'Energy',JPPOWER:'Energy',GREENKO:'Energy',ACME:'Energy',WEBSOL:'Energy',
  // Auto & Components
  TATAMOTORS:'Auto',MARUTI:'Auto',MM:'Auto',BAJAJAUTO:'Auto',HEROMOTOCO:'Auto',
  EICHERMOT:'Auto',TVSMOTORS:'Auto',ASHOKLEY:'Auto',TVSMOTOR:'Auto',FORCEMOT:'Auto',
  ESCORTS:'Auto',SONACOMS:'Auto',BHARATFORG:'Auto',MOTHERSON:'Auto',APOLLOTYRE:'Auto',
  MRF:'Auto',BALKRISIND:'Auto',CEAT:'Auto',BOSCHLTD:'Auto',MINDAIND:'Auto',
  ENDURANCE:'Auto',LUMAXIND:'Auto',EXIDEIND:'Auto',AMARAJABAT:'Auto',SUNDRMFAST:'Auto',
  SUBROS:'Auto',UNOMINDA:'Auto',JTEKTINDIA:'Auto',OLECTRA:'Auto',TIINDIA:'Auto',
  SHRIRAMCIT:'Auto',SUPRAJIT:'Auto',CRAFTSMAN:'Auto',PRICOL:'Auto',
  // Pharma
  SUNPHARMA:'Pharma',DRREDDY:'Pharma',CIPLA:'Pharma',DIVISLAB:'Pharma',LUPIN:'Pharma',
  AUROPHARMA:'Pharma',TORNTPHARM:'Pharma',ALKEM:'Pharma',IPCA:'Pharma',
  NATCOPHARM:'Pharma',GLENMARK:'Pharma',BIOCON:'Pharma',ABBOTINDIA:'Pharma',
  AJANTPHARM:'Pharma',LAURUSLABS:'Pharma',GRANULES:'Pharma',GLAND:'Pharma',
  ERIS:'Pharma',JBCHEPHARM:'Pharma',CAPLIPOINT:'Pharma',SEQUENT:'Pharma',
  NEULANDLAB:'Pharma',SYNGENE:'Pharma',SOLARA:'Pharma',STRIDES:'Pharma',
  WINDLAS:'Pharma',BLISSGVS:'Pharma',VALIANT:'Pharma',MARKSANS:'Pharma',
  // Healthcare
  APOLLOHOSP:'Healthcare',FORTIS:'Healthcare',MAXHEALTH:'Healthcare',KIMS:'Healthcare',
  NARAYANHRU:'Healthcare',METROPOLIS:'Healthcare',LALPATHLAB:'Healthcare',
  THYROCARE:'Healthcare',DRPATH:'Healthcare',VIJAYA:'Healthcare',MEDANTA:'Healthcare',
  HCG:'Healthcare',RAINBOW:'Healthcare',ASTER:'Healthcare',YATHARTH:'Healthcare',
  // FMCG
  HINDUNILVR:'FMCG',ITC:'FMCG',NESTLEIND:'FMCG',BRITANNIA:'FMCG',DABUR:'FMCG',
  GODREJCP:'FMCG',MARICO:'FMCG',COLPAL:'FMCG',EMAMILTD:'FMCG',BAJAJCON:'FMCG',
  HATSUN:'FMCG',JYOTHYLAB:'FMCG',ZYDUSWELL:'FMCG',TATACONSUM:'FMCG',VBL:'FMCG',
  RADICO:'FMCG',USL:'FMCG',BIKAJI:'FMCG',DODLA:'FMCG',PATANJALI:'FMCG',
  HERITAGE:'FMCG',CCL:'FMCG',GLOBUSSPR:'FMCG',TASTY:'FMCG',
  // Consumer / Retail / Lifestyle
  TITAN:'Consumer',DMART:'Retail',TRENT:'Retail',ABFRL:'Retail',MANYAVAR:'Retail',
  SHOPERSTOP:'Retail',VMART:'Retail',PVR:'Consumer',INOXLEISUR:'Consumer',
  ZEEL:'Consumer',SUNTV:'Consumer',NETWORK18:'Consumer',TV18BRDCST:'Consumer',
  SAREGAMA:'Consumer',ZOMATO:'Consumer',SWIGGY:'Consumer',NYKAA:'Consumer',
  FSNERETAIL:'Retail',RAJESHEXPO:'Consumer',KALYANKJIL:'Consumer',
  SENCO:'Consumer',THANGAMAYL:'Consumer',BATA:'Consumer',RELAXO:'Consumer',
  LIMEROAD:'Consumer',VEDANT:'Retail',
  // Metal / Mining
  TATASTEEL:'Metal',JSWSTEEL:'Metal',HINDALCO:'Metal',VEDL:'Metal',VEDANTA:'Metal',
  SAIL:'Metal',NMDC:'Metal',NATIONALUM:'Metal',HINDZINC:'Metal',MOIL:'Metal',
  APLAPOLLO:'Metal',WELCORP:'Metal',RATNAMANI:'Metal',JINDALSTEL:'Metal',
  JINDALSAW:'Metal',KALYANIFRG:'Metal',ELECTCAST:'Metal',NALCO:'Metal',
  SAHAMITR:'Metal',GRAVITA:'Metal',HINDZINC:'Metal',
  // Cement
  ULTRACEMCO:'Cement',SHREECEM:'Cement',AMBUJACEM:'Cement',ACC:'Cement',
  DALMIA:'Cement',RAMCOCEM:'Cement',JKCEMENT:'Cement',HEIDELBERG:'Cement',
  BIRLACORPN:'Cement',PRISMCEMENT:'Cement',NUVOCO:'Cement',JKLAKSHMI:'Cement',
  SANGHIBLDER:'Cement',STAR:'Cement',KESORAMIND:'Cement',
  // Infrastructure / Industrial / Capital Goods
  LT:'Infrastructure',ADANIPORTS:'Infrastructure',CONCOR:'Infrastructure',
  IRCTC:'Infrastructure',RITES:'Infrastructure',IRCON:'Infrastructure',
  NBCC:'Infrastructure',BEL:'Defence',HAL:'Defence',BHEL:'Industrial',
  SIEMENS:'Industrial',ABB:'Industrial',CUMMINSIND:'Industrial',THERMAX:'Industrial',
  HAVELLS:'Industrial',POLYCAB:'Industrial',KEI:'Industrial',FINOLEXCAB:'Industrial',
  VGUARD:'Industrial',BLUESTAR:'Industrial',VOLTAS:'Industrial',
  CROMPTON:'Industrial',DIXON:'Industrial',KAYNES:'Industrial',AMBER:'Industrial',
  TIMKEN:'Industrial',SKFINDIA:'Industrial',NCC:'Infrastructure',PNCINFRA:'Infrastructure',
  KNR:'Infrastructure',HGINFRA:'Infrastructure',AHLUWALIA:'Infrastructure',
  GRINFRA:'Infrastructure',ADANIINFRA:'Infrastructure',GMRINFRA:'Infrastructure',
  // Chemical / Paint
  PIDILITIND:'Chemical',ASIANPAINT:'Chemical',BERGERPAINTS:'Chemical',
  AKZOINDIA:'Chemical',KANSAINER:'Chemical',INDIGOPNTS:'Chemical',
  TATACHEM:'Chemical',DEEPAKNTR:'Chemical',AARTI:'Chemical',NAVINFLUOR:'Chemical',
  SRF:'Chemical',VINATI:'Chemical',FINEORG:'Chemical',GALAXYSURF:'Chemical',
  ANUPAM:'Chemical',ATUL:'Chemical',NOCIL:'Chemical',GHCL:'Chemical',
  AARTIDRUGS:'Chemical',ROSSARI:'Chemical',CLEAN:'Chemical',CAMLIN:'Chemical',
  // Plastic / Pipes
  SUPREMEIND:'Industrial',ASTRAL:'Industrial',FINOLEXIND:'Industrial',
  PRINCEPIPE:'Industrial',KPPL:'Industrial',NILKAMAL:'Industrial',
  // Telecom
  BHARTIARTL:'Telecom',IDEA:'Telecom',TATACOMM:'Telecom',RAILTEL:'Telecom',
  STLTECH:'Telecom',HFCL:'Telecom',TEJAS:'Telecom',VINDHYATEL:'Telecom',
  // Real Estate
  DLF:'Real Estate',GODREJPROP:'Real Estate',PRESTIGE:'Real Estate',
  BRIGADE:'Real Estate',SOBHA:'Real Estate',PHOENIXLTD:'Real Estate',
  OBEROIRLTY:'Real Estate',SUNTEK:'Real Estate',KOLTEPATIL:'Real Estate',
  MAHLIFE:'Real Estate',LODHA:'Real Estate',MACROTECH:'Real Estate',
  SIGNATURE:'Real Estate',ANANT:'Real Estate',ASHIANA:'Real Estate',
  // Logistics
  DELHIVERY:'Logistics',GATI:'Logistics',ALLCARGO:'Logistics',BLUEDART:'Logistics',
  TCI:'Logistics',VRL:'Logistics',MAHLOG:'Logistics',SPXO:'Logistics',
  // Agri / Fertiliser
  UPL:'Agri',PIIND:'Agri',RALLIS:'Agri',GODREJAGRO:'Agri',SUMICHEM:'Agri',
  KRBL:'Agri',LTFOODS:'Agri',AVANTIFEED:'Agri',WATERBASE:'Agri',
  COROMANDEL:'Agri',CHAMBAL:'Agri',KSCL:'Agri',INSECTICID:'Agri',
  // Textile
  PAGEIND:'Textile',TRIDENT:'Textile',HIMATSEIDE:'Textile',VARDHMAN:'Textile',
  RAYMOND:'Textile',ARVIND:'Textile',WELSPUNIND:'Textile',GARWARE:'Textile',
  KTIL:'Textile',GOKEX:'Textile',NITIN:'Textile',
  // Fintech / New-age
  PAYTM:'Finance',POLICYBZR:'Technology',DELHIVERY:'Logistics',
};

// Keyword-based sector inference — fallback when symbol not in map
function resolveIndiaSector(symbol, name) {
  const s = (symbol || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (INDIA_SECTOR_MAP[s]) return INDIA_SECTOR_MAP[s];
  const t = `${s} ${(name || '').toUpperCase()}`;
  if (/BANK|BANCORP|BANQUE/.test(t))                                      return 'Finance';
  if (/FINANCE|CAPITAL|FINSERV|CREDIT|LENDING|LEASING|INVEST|FINCORP/.test(t)) return 'Finance';
  if (/INSURANCE|LIFE INS|GENERAL INS/.test(t))                           return 'Finance';
  if (/PHARMA|LABORATORIES|LABS|DRUG|BIOCON|BIOLOGICS/.test(t))           return 'Pharma';
  if (/HOSPITAL|HEALTHCARE|MEDIC|CLINIC|DIAGNOST|PATHOLOG/.test(t))       return 'Healthcare';
  if (/INFOTECH|SOFTWARE|DIGITAL|SYSTEMS|TECHNOLOGY|COMPUTERS|SOLUTION/.test(t)) return 'Technology';
  if (/MOTOR|AUTOMOBILE|AUTO|TYRE|VEHICLE|WHEEL/.test(t))                 return 'Auto';
  if (/STEEL|METAL|ALUMIN|COPPER|ZINC|IRON|FERRO|ALLOY/.test(t))          return 'Metal';
  if (/CEMENT|CONCR/.test(t))                                             return 'Cement';
  if (/OIL|GAS|PETROL|REFIN|PETROLEUM|POWER|ELECTRIC|ENERGY|SOLAR|WIND|HYDRO|THERMAL|COAL/.test(t)) return 'Energy';
  if (/TELECOM|COMMUNICATION|WIRELESS|CELLULAR/.test(t))                  return 'Telecom';
  if (/REAL ESTATE|REALTY|HOUSING|PROPERTIES|DEVELOPER/.test(t))          return 'Real Estate';
  if (/PAINT|CHEMICAL|POLYMER|RESIN|COATING/.test(t))                     return 'Chemical';
  if (/FMCG|FOODS|BEVERAGE|DAIRY|CONSUMER GOOD/.test(t))                  return 'FMCG';
  if (/RETAIL|MART|FASHION|APPAREL|CLOTH/.test(t))                        return 'Retail';
  if (/TEXTILE|FIBER|YARN|FABRIC|SPINNING/.test(t))                       return 'Textile';
  if (/AGRI|FERTILIZ|PESTICIDE|SEED|FARM|CROP/.test(t))                   return 'Agri';
  if (/LOGISTIC|TRANSPORT|FREIGHT|COURIER|CARGO|SHIPPING/.test(t))        return 'Logistics';
  if (/DEFENCE|DEFENSE|AEROSPACE|AVIATION|AIRLINE/.test(t))               return 'Defence';
  if (/INFRA|ENGINEER|CONSTRUCT|PROJECT|EPC/.test(t))                     return 'Infrastructure';
  return 'Other';
}

function initXRay() { buildXRaySelector(); runXRay(); }

function buildXRaySelector() {
  const wrap = document.getElementById('xrayPortfolioSelector');
  if (!wrap) return;
  const names = Object.keys(state.portfolios);
  // Validate stored target; fall back to active portfolio
  if (!window._xrayTarget || !state.portfolios[window._xrayTarget]) {
    window._xrayTarget = state.activePortfolio;
  }
  if (names.length <= 1) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'flex';
  wrap.innerHTML = '<span class="xray-sel-label"><i class="fa-solid fa-briefcase"></i> Analyse:</span>' +
    names.map(name => {
      const count = (state.portfolios[name] || []).length;
      const active = name === window._xrayTarget;
      const safe = name.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
      return `<button class="xray-port-tab${active ? ' active' : ''}" onclick="selectXRayPortfolio('${name.replace(/'/g,"\\'")}')">
        ${safe} <span class="xray-port-count">${count}</span>
      </button>`;
    }).join('');
}

function selectXRayPortfolio(name) {
  window._xrayTarget = name;
  buildXRaySelector();
  runXRay();
}

function runXRay() {
  const targetName = window._xrayTarget || state.activePortfolio;
  const holdings = (state.portfolios[targetName] || state.portfolio) || [];
  const emptyEl  = document.getElementById('xrayEmpty');
  const resultsEl = document.getElementById('xrayResults');

  if (!holdings.length) {
    emptyEl.style.display = 'flex';
    resultsEl.style.display = 'none';
    return;
  }
  emptyEl.style.display = 'none';

  // Assign current values
  const enriched = holdings.map(h => ({ ...h, cv: ((h.currentPrice || h.buyPrice || 0) * (h.qty || 0)) }));
  const totalVal  = enriched.reduce((s, h) => s + h.cv, 0) || 1;

  const sectorMap = {}; // sector -> { direct, etf }
  const stockMap  = {}; // sym -> { name, sector, direct, etfContrib:{etfSym->%} }
  const etfs      = [];

  enriched.forEach(h => {
    const wt  = h.cv / totalVal;
    const sym = (h.symbol || '').toUpperCase().replace(/^NSE:|^BSE:/, '');
    const resolved = XRAY_ALIASES[sym] || sym;
    const idx = XRAY_DB[resolved];

    if (idx) {
      etfs.push({ h, idx, wt, resolved });
      const coveredPct = idx.top.reduce((s, [,,w]) => s + w, 0);

      idx.top.forEach(([uSym, uSec, uPct]) => {
        const uw = wt * uPct; // already in %
        if (!sectorMap[uSec]) sectorMap[uSec] = { direct: 0, etf: 0 };
        sectorMap[uSec].etf += uw;
        if (!stockMap[uSym]) stockMap[uSym] = { name: uSym, sector: uSec, direct: 0, etfContrib: {} };
        stockMap[uSym].etfContrib[resolved] = (stockMap[uSym].etfContrib[resolved] || 0) + uw;
      });

      const otherW = wt * (100 - coveredPct);
      if (otherW > 0) {
        if (!sectorMap['Other']) sectorMap['Other'] = { direct: 0, etf: 0 };
        sectorMap['Other'].etf += otherW;
      }
    } else {
      const sector = (h.sector && h.sector !== 'Other' && h.sector !== '—')
        ? h.sector
        : (h.market === 'india' ? resolveIndiaSector(sym, h.name) : (h.sector || 'Other'));
      const dp = wt * 100;
      if (!sectorMap[sector]) sectorMap[sector] = { direct: 0, etf: 0 };
      sectorMap[sector].direct += dp;
      if (!stockMap[sym]) stockMap[sym] = { name: h.name || sym, sector, direct: 0, etfContrib: {} };
      stockMap[sym].direct += dp;
    }
  });

  const sectorRisks = Object.entries(sectorMap)
    .map(([sector, { direct, etf }]) => ({ sector, direct, etf, total: direct + etf }))
    .sort((a, b) => b.total - a.total);

  const topStocks = Object.entries(stockMap)
    .map(([sym, { name, sector, direct, etfContrib }]) => {
      const etfTotal = Object.values(etfContrib).reduce((s, v) => s + v, 0);
      return { sym, name, sector, direct, etfTotal, total: direct + etfTotal, etfContrib };
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 15);

  const overlaps = Object.entries(stockMap)
    .filter(([, { direct, etfContrib }]) => direct > 0 && Object.keys(etfContrib).length > 0)
    .map(([sym, { name, sector, direct, etfContrib }]) => ({
      sym, name, sector, direct,
      etfTotal: Object.values(etfContrib).reduce((s, v) => s + v, 0),
      etfContrib,
    }))
    .sort((a, b) => (b.direct + b.etfTotal) - (a.direct + a.etfTotal));

  _renderXRay({ holdings, etfs, sectorRisks, topStocks, overlaps });
}

function _renderXRay({ holdings, etfs, sectorRisks, topStocks, overlaps }) {
  document.getElementById('xrayResults').style.display = 'block';

  // Alert banner
  const highRisk = sectorRisks.filter(r => r.total >= 30).length;
  const medRisk  = sectorRisks.filter(r => r.total >= 20 && r.total < 30).length;
  const alertEl  = document.getElementById('xrayAlert');
  if (highRisk) {
    alertEl.className = 'xray-alert danger';
    alertEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> <strong>High concentration detected:</strong> ' + highRisk + ' sector' + (highRisk > 1 ? 's' : '') + ' exceed 30% of your true portfolio exposure. Consider rebalancing.';
  } else if (medRisk) {
    alertEl.className = 'xray-alert warn';
    alertEl.innerHTML = '<i class="fa-solid fa-circle-info"></i> <strong>Moderate concentration:</strong> ' + medRisk + ' sector' + (medRisk > 1 ? 's' : '') + ' between 20–30%. Monitor for further concentration as markets move.';
  } else {
    alertEl.className = 'xray-alert good';
    alertEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> <strong>Well diversified:</strong> No single sector exceeds 20% of your look-through portfolio.';
  }

  // Summary cards
  const st = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  st('xrTotalHoldings', holdings.length);
  st('xrETFCount',      etfs.length);
  st('xrDirectCount',   holdings.length - etfs.length);
  st('xrSectorCount',   sectorRisks.filter(r => r.total >= 1).length);
  st('xrOverlapCount',  overlaps.length);

  // Sector bars
  const maxPct = sectorRisks[0]?.total || 100;
  document.getElementById('xraySectorBars').innerHTML = sectorRisks
    .filter(r => r.total >= 0.5)
    .map(r => {
      const col  = _xrCol(r.sector);
      const dW   = (r.direct / maxPct * 100).toFixed(2);
      const eW   = (r.etf    / maxPct * 100).toFixed(2);
      const risk = r.total >= 30 ? 'danger' : r.total >= 20 ? 'warn' : '';
      const tip  = r.sector + ': ' + r.total.toFixed(1) + '% total | Direct ' + r.direct.toFixed(1) + '% | ETF ' + r.etf.toFixed(1) + '%';
      return `<div class="xray-bar-row" title="${tip}">
        <div class="xray-bar-label">${r.sector}</div>
        <div class="xray-bar-track">
          <div class="xray-bar-seg direct" style="width:${dW}%;background:${col}"></div>
          <div class="xray-bar-seg etf"    style="width:${eW}%;background:${col}33"></div>
        </div>
        <div class="xray-bar-pct">${r.total.toFixed(1)}%</div>
        <span class="xray-risk-tag ${risk}">${risk === 'danger' ? 'High' : risk === 'warn' ? 'Med' : ''}</span>
      </div>`;
    }).join('');

  // Top holdings table
  document.getElementById('xrayHoldingsBody').innerHTML = topStocks.map((s, i) => {
    const col    = _xrCol(s.sector);
    const etfSrc = Object.entries(s.etfContrib).map(([k, v]) => k + ': ' + v.toFixed(1) + '%').join(', ');
    return `<tr>
      <td class="mono xr-rank">${i + 1}</td>
      <td><span class="xr-sym" style="color:${col}">${s.sym}</span></td>
      <td class="xr-co-name">${s.name}</td>
      <td><span class="xr-dot" style="background:${col}"></span>${s.sector}</td>
      <td class="mono">${s.direct > 0 ? s.direct.toFixed(2) + '%' : '—'}</td>
      <td class="mono">${s.etfTotal > 0 ? '<span title="' + etfSrc + '" class="xr-etf-val">' + s.etfTotal.toFixed(2) + '%</span>' : '—'}</td>
      <td class="mono xr-total-col"><strong>${s.total.toFixed(2)}%</strong></td>
      <td>${s.direct > 0 ? '<span class="xr-badge-direct">Direct</span>' : ''}${s.etfTotal > 0 ? '<span class="xr-badge-etf">ETF</span>' : ''}</td>
    </tr>`;
  }).join('');

  // Overlaps
  const overlapEl = document.getElementById('xrayOverlapList');
  if (!overlaps.length) {
    overlapEl.innerHTML = '<div class="xray-no-overlap"><i class="fa-solid fa-circle-check"></i> No overlaps — your direct stocks are not duplicated inside your ETFs</div>';
  } else {
    overlapEl.innerHTML = overlaps.map(o => {
      const col     = _xrCol(o.sector);
      const total   = o.direct + o.etfTotal;
      const etfTags = Object.entries(o.etfContrib)
        .map(([k, v]) => `<span class="xr-etf-chip">${k} ${v.toFixed(1)}%</span>`).join('');
      return `<div class="xray-overlap-item">
        <div class="xr-ov-sym" style="color:${col}">${o.sym}</div>
        <div class="xr-ov-mid">
          <span class="xr-ov-name">${o.name}</span>
          <div class="xr-ov-tags">
            <span class="xr-badge-direct">Direct ${o.direct.toFixed(1)}%</span>
            ${etfTags}
          </div>
        </div>
        <div class="xr-ov-total">${total.toFixed(1)}%<span>combined</span></div>
      </div>`;
    }).join('');
  }
}

// ========== SMART MONEY TRACKER ==========
const smartMoney = {
  deals: [],
  filters: { market: 'all', type: 'all', side: 'all' },
  historySearch: '',
  interval: null,
  initialized: false
};

const _smIndiaStocks = [
  { sym: 'RELIANCE',   name: 'Reliance Industries',        price: [2380, 2650], sector: 'Energy' },
  { sym: 'HDFCBANK',   name: 'HDFC Bank',                  price: [1540, 1720], sector: 'Banking' },
  { sym: 'TCS',        name: 'Tata Consultancy Services',   price: [3480, 3950], sector: 'IT' },
  { sym: 'INFY',       name: 'Infosys',                     price: [1430, 1670], sector: 'IT' },
  { sym: 'ICICIBANK',  name: 'ICICI Bank',                  price: [1040, 1220], sector: 'Banking' },
  { sym: 'BHARTIARTL', name: 'Bharti Airtel',               price: [1580, 1840], sector: 'Telecom' },
  { sym: 'BAJFINANCE', name: 'Bajaj Finance',               price: [6900, 8100], sector: 'NBFC' },
  { sym: 'LTIM',       name: 'LTIMindtree',                 price: [5100, 5900], sector: 'IT' },
  { sym: 'ADANIENT',   name: 'Adani Enterprises',           price: [2180, 2680], sector: 'Conglomerate' },
  { sym: 'WIPRO',      name: 'Wipro',                       price: [430, 530],   sector: 'IT' },
  { sym: 'TATAMOTORS', name: 'Tata Motors',                 price: [690, 870],   sector: 'Auto' },
  { sym: 'MARUTI',     name: 'Maruti Suzuki',               price: [10400,12200],sector: 'Auto' },
  { sym: 'ITC',        name: 'ITC Limited',                 price: [430, 510],   sector: 'FMCG' },
  { sym: 'AXISBANK',   name: 'Axis Bank',                   price: [1030, 1230], sector: 'Banking' },
  { sym: 'SBIN',       name: 'State Bank of India',         price: [740, 870],   sector: 'Banking' },
  { sym: 'KOTAKBANK',  name: 'Kotak Mahindra Bank',         price: [1680, 1920], sector: 'Banking' },
  { sym: 'HINDUNILVR', name: 'Hindustan Unilever',          price: [2350, 2650], sector: 'FMCG' },
  { sym: 'SUNPHARMA',  name: 'Sun Pharmaceutical',          price: [1420, 1680], sector: 'Pharma' },
  { sym: 'ULTRACEMCO', name: 'UltraTech Cement',            price: [9800, 11200],sector: 'Cement' },
  { sym: 'POWERGRID',  name: 'Power Grid Corporation',      price: [290, 340],   sector: 'Utilities' },
];

const _smUSStocks = [
  { sym: 'AAPL',  name: 'Apple Inc.',             price: [172, 198],  sector: 'Technology' },
  { sym: 'MSFT',  name: 'Microsoft Corp.',         price: [375, 425],  sector: 'Technology' },
  { sym: 'NVDA',  name: 'NVIDIA Corp.',            price: [840, 990],  sector: 'Semiconductors' },
  { sym: 'META',  name: 'Meta Platforms',          price: [480, 570],  sector: 'Technology' },
  { sym: 'GOOGL', name: 'Alphabet Inc.',           price: [162, 188],  sector: 'Technology' },
  { sym: 'AMZN',  name: 'Amazon.com',              price: [178, 215],  sector: 'E-Commerce' },
  { sym: 'TSLA',  name: 'Tesla Inc.',              price: [155, 205],  sector: 'EV/Auto' },
  { sym: 'JPM',   name: 'JPMorgan Chase',          price: [192, 228],  sector: 'Banking' },
  { sym: 'AMD',   name: 'Advanced Micro Devices',  price: [155, 195],  sector: 'Semiconductors' },
  { sym: 'NFLX',  name: 'Netflix Inc.',            price: [610, 730],  sector: 'Streaming' },
  { sym: 'GS',    name: 'Goldman Sachs',           price: [465, 525],  sector: 'Finance' },
  { sym: 'BAC',   name: 'Bank of America',         price: [37, 45],    sector: 'Banking' },
  { sym: 'AVGO',  name: 'Broadcom Inc.',           price: [1300, 1600],sector: 'Semiconductors' },
  { sym: 'UNH',   name: 'UnitedHealth Group',      price: [480, 560],  sector: 'Healthcare' },
  { sym: 'V',     name: 'Visa Inc.',               price: [270, 310],  sector: 'Finance' },
];

const _smIndiaEntities = [
  'LIC of India', 'SBI Mutual Fund', 'HDFC AMC', 'ICICI Prudential MF',
  'Axis Mutual Fund', 'Nippon India MF', 'Mirae Asset MF', 'Kotak AMC',
  'Quant Mutual Fund', 'Motilal Oswal MF', 'UTI AMC', 'DSP Blackrock MF',
  'Govt. of Singapore', 'CLSA India FPI', 'Morgan Stanley Asia FPI',
  'Goldman Sachs India FPI', 'Deutsche Bank FPI', 'Societe Generale FPI',
  'Norges Bank FPI', 'Abu Dhabi Investment Authority',
];

const _smUSEntities = [
  'Vanguard Group', 'BlackRock Inc.', 'Fidelity Investments', 'State Street Corp.',
  'Citadel LLC', 'Two Sigma Investments', 'Bridgewater Associates',
  'Renaissance Technologies', 'ARK Invest', 'Goldman Sachs Prop.',
  'Morgan Stanley Inst.', 'D.E. Shaw & Co.', 'Millennium Management',
  'Point72 Asset Mgmt', 'Coatue Management', 'Tiger Global Mgmt',
];

// Each source entry carries per-type URLs — block/bulk for India, darkpool for US.
// _smGenerateDeal resolves the right URL for each deal's type at generation time.
// India — official exchange sources only (NSE & BSE publish bulk/block deal data publicly)
const _smIndiaSources = [
  { name: 'NSE India',
    block: 'https://www.nseindia.com/market-data/block-deal',
    bulk:  'https://www.nseindia.com/market-data/bulk-deals' },
  { name: 'BSE India',
    block: 'https://www.bseindia.com/markets/equity/EQReports/blockdeals.aspx',
    bulk:  'https://www.bseindia.com/markets/equity/EQReports/bulkdeals.aspx' },
];

// US — official regulatory sources for dark pool / institutional flow data
const _smUSSourcesPool = [
  { name: 'FINRA',   darkpool: 'https://otctransparency.finra.org/otctransparency/AtsIssueData' },
  { name: 'SEC.gov', darkpool: 'https://efts.sec.gov/LATEST/search-index?forms=13F-HR' },
  { name: 'Cboe',    darkpool: 'https://www.cboe.com/us/equities/market_statistics/' },
];

function _smRi(min, max) { return Math.floor(Math.random() * (max - min) + min); }
function _smRf(min, max) { return Math.random() * (max - min) + min; }
function _smPick(arr) { return arr[_smRi(0, arr.length)]; }

function _smGenerateDeal(isNew) {
  const isIndia = Math.random() > 0.42;
  const market = isIndia ? 'india' : 'us';
  const stock = _smPick(isIndia ? _smIndiaStocks : _smUSStocks);
  const price = _smRf(stock.price[0], stock.price[1]);
  const side = Math.random() > 0.40 ? 'buy' : 'sell';
  const entity = _smPick(isIndia ? _smIndiaEntities : _smUSEntities);

  let type, value;
  if (!isIndia) {
    type = 'darkpool';
    value = _smRf(8e6, 600e6);           // $8M – $600M
  } else if (Math.random() > 0.45) {
    type = 'block';
    value = _smRf(20e7, 2500e7);         // ₹20Cr – ₹2500Cr
  } else {
    type = 'bulk';
    value = _smRf(5e7, 400e7);           // ₹5Cr – ₹400Cr
  }

  const qty = Math.round(value / price);
  const minutesAgo = isNew ? _smRi(0, 4) : _smRi(0, 500);
  const t = new Date(Date.now() - minutesAgo * 60000);
  const timeStr = String(t.getHours()).padStart(2,'0') + ':' + String(t.getMinutes()).padStart(2,'0');

  const sourcePool = isIndia ? _smIndiaSources : _smUSSourcesPool;
  const picked = _smPick(sourcePool);
  const url = picked[type] || picked.block || picked.bulk || picked.darkpool || '#';
  const source = { name: picked.name, url };

  return { id: Date.now() + Math.random(), timeStr, timeMs: t.getTime(), market, type, sym: stock.sym, name: stock.name, sector: stock.sector, side, entity, qty, price, value, source, isNew };
}

function _smFmtVal(d) {
  if (d.market === 'us') {
    const v = d.value;
    return v >= 1e9 ? '$' + (v/1e9).toFixed(2) + 'B' : '$' + (v/1e6).toFixed(1) + 'M';
  }
  const cr = d.value / 1e7;
  return cr >= 1000 ? '₹' + (cr/1000).toFixed(2) + 'K Cr' : '₹' + cr.toFixed(1) + ' Cr';
}

function _smFmtStat(totalVal, marketFilter) {
  if (marketFilter === 'us') {
    return totalVal >= 1e9 ? '$' + (totalVal/1e9).toFixed(2) + 'B' : '$' + (totalVal/1e6).toFixed(0) + 'M';
  }
  const cr = totalVal / 1e7;
  return cr >= 1000 ? '₹' + (cr/1000).toFixed(1) + 'K Cr' : '₹' + cr.toFixed(0) + ' Cr';
}

function setSmHistory(query) {
  smartMoney.historySearch = (query || '').trim();
  const clearBtn = document.getElementById('smHistoryClear');
  if (clearBtn) clearBtn.style.display = smartMoney.historySearch ? 'flex' : 'none';
  renderSmartMoney();
}

function clearSmHistory() {
  smartMoney.historySearch = '';
  const inp = document.getElementById('smHistorySearch');
  if (inp) inp.value = '';
  const clearBtn = document.getElementById('smHistoryClear');
  if (clearBtn) clearBtn.style.display = 'none';
  renderSmartMoney();
}

function smDrillDown(query) {
  const inp = document.getElementById('smHistorySearch');
  if (inp) inp.value = query;
  setSmHistory(query);
  // Scroll to the summary strip
  document.getElementById('smHistorySummary')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Fetch today's real NSE bulk + block deals via the /api/nsedeals serverless endpoint.
// Maps NSE's field names into the existing deal-row shape so renderSmartMoney needs no changes.
// Fails silently — if NSE blocks the request, the synthetic India deals already in the list remain.
async function fetchRealIndiaDeals() {
  const out = [];
  for (const type of ['bulk', 'block']) {
    try {
      const r = await fetch(`/api/nsedeals?type=${type}`);
      if (!r.ok) continue;
      const json = await r.json();
      const rows = Array.isArray(json.data) ? json.data : [];
      rows.forEach(row => {
        const sym   = (row.BD_SYMBOL   || row.symbol   || '').toUpperCase().trim();
        const name  =  row.BD_COMP_NAME || row.BD_SYMBOL || sym;
        const qty   = parseInt(String(row.BD_QTY_TRD  || row.quantity || '0').replace(/,/g, '')) || 0;
        const price = parseFloat(String(row.BD_TP_WATP || row.price    || '0').replace(/,/g, '')) || 0;
        const side  = /buy/i.test(row.BD_BUY_SELL || row.buySell || '') ? 'buy' : 'sell';
        if (!sym || !(price > 0) || !(qty > 0)) return;

        // Parse trade time if available, else use current time
        let timeMs = Date.now();
        let timeStr = '—';
        if (row.BD_DT_DATE) {
          const parsed = new Date(row.BD_DT_DATE);
          if (!isNaN(parsed)) { timeMs = parsed.getTime(); }
        }

        out.push({
          id: `nse-${type}-${sym}-${row.BD_CLIENT_NAME || ''}-${side}`,
          timeStr, timeMs,
          market: 'india',
          type:   type === 'block' ? 'block' : 'bulk',
          sym, name, sector: '—',
          side,
          entity: row.BD_CLIENT_NAME || row.clientName || 'Institutional',
          qty, price, value: qty * price,
          source: {
            name: 'NSE India',
            url: type === 'block'
              ? 'https://www.nseindia.com/market-data/block-deal'
              : 'https://www.nseindia.com/market-data/bulk-deals',
          },
          isNew: false, isReal: true,
        });
      });
    } catch { /* silent — synthetic deals are the fallback */ }
  }
  return out;
}

async function initSmartMoney() {
  if (!smartMoney.initialized) {
    // Seed with US synthetic deals only — India will come from the real NSE feed
    const batch = [];
    for (let i = 0; i < 30; i++) {
      const d = _smGenerateDeal(false);
      if (d.market === 'us') batch.push(d);
    }
    batch.sort((a, b) => b.timeMs - a.timeMs);
    smartMoney.deals = batch;
    smartMoney.initialized = true;
    renderSmartMoney();

    // Overlay real NSE India deals (async — won't block the initial render)
    const indiaDeals = await fetchRealIndiaDeals();
    if (indiaDeals.length) {
      smartMoney.deals = [...indiaDeals, ...smartMoney.deals]
        .sort((a, b) => b.timeMs - a.timeMs);
      renderSmartMoney();
    }
  } else {
    renderSmartMoney();
  }
  if (smartMoney.interval) clearInterval(smartMoney.interval);
  smartMoney.interval = setInterval(() => refreshSmartMoney(false), 30000);
}

function refreshSmartMoney(manual) {
  // Auto-refresh: add a few new US synthetic deals only
  const n = _smRi(2, 6);
  const fresh = [];
  for (let i = 0; i < n; i++) {
    const d = _smGenerateDeal(true);
    if (d.market === 'us') fresh.push(d);
  }
  smartMoney.deals = [...fresh, ...smartMoney.deals].slice(0, 250);
  setTimeout(() => { smartMoney.deals.forEach(d => { d.isNew = false; }); }, 4000);
  renderSmartMoney();

  if (manual) {
    const btn = document.getElementById('smRefreshBtn');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-rotate fa-spin"></i> Refreshing…';
    }
    // On manual refresh, re-pull real NSE India deals
    fetchRealIndiaDeals().then(indiaDeals => {
      if (indiaDeals.length) {
        const usDeals = smartMoney.deals.filter(d => d.market === 'us');
        smartMoney.deals = [...indiaDeals, ...usDeals]
          .sort((a, b) => b.timeMs - a.timeMs)
          .slice(0, 250);
        renderSmartMoney();
      }
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-rotate"></i> Refresh';
      }
    }).catch(() => {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-rotate"></i> Refresh';
      }
    });
  }
}

function renderSmartMoney() {
  const { filters, deals, historySearch } = smartMoney;
  const minRaw = parseFloat(document.getElementById('smMinValue')?.value) || 0;
  const mktFilter = filters.market;
  const hsQ = historySearch.toLowerCase();

  // Update unit label
  const unitEl = document.getElementById('smValueUnit');
  const minLbl = document.getElementById('smMinLabel');
  const isUS = mktFilter === 'us';
  if (unitEl) unitEl.textContent = isUS ? '$ M' : '₹ Cr';
  if (minLbl) minLbl.textContent = 'Min Value (' + (isUS ? '$ M' : '₹ Cr') + ')';

  const filtered = deals.filter(d => {
    if (mktFilter !== 'all' && d.market !== mktFilter) return false;
    if (filters.type !== 'all' && d.type !== filters.type) return false;
    if (filters.side !== 'all' && d.side !== filters.side) return false;
    if (minRaw > 0) {
      const nativeVal = d.market === 'us' ? d.value / 1e6 : d.value / 1e7;
      if (mktFilter === 'all') {
        if (d.market === 'us'     && (d.value / 1e6) < minRaw) return false;
        if (d.market === 'india'  && (d.value / 1e7) < minRaw) return false;
      } else {
        if (nativeVal < minRaw) return false;
      }
    }
    if (hsQ) {
      const match = d.sym.toLowerCase().includes(hsQ)
        || d.name.toLowerCase().includes(hsQ)
        || d.entity.toLowerCase().includes(hsQ);
      if (!match) return false;
    }
    return true;
  });

  // History summary strip
  const summaryEl  = document.getElementById('smHistorySummary');
  const titleEl    = document.getElementById('smFeedTitle');
  if (hsQ && summaryEl) {
    let hBuy = 0, hSell = 0, hBuyN = 0, hSellN = 0;
    filtered.forEach(d => {
      if (d.side === 'buy')  { hBuy  += d.value; hBuyN++;  }
      else                   { hSell += d.value; hSellN++; }
    });
    const hNet = hBuy - hSell;
    const hsLabel = historySearch.length > 22 ? historySearch.slice(0, 22) + '…' : historySearch;
    if (titleEl) titleEl.textContent = 'History: ' + hsLabel;
    summaryEl.style.display = 'flex';
    const setT = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    setT('smHsBuy',    _smFmtStat(hBuy,  mktFilter));
    setT('smHsBuyN',   hBuyN  + ' txns');
    setT('smHsSell',   _smFmtStat(hSell, mktFilter));
    setT('smHsSellN',  hSellN + ' txns');
    setT('smHsNet',    (hNet >= 0 ? '+' : '') + _smFmtStat(Math.abs(hNet), mktFilter));
    setT('smHsNetLbl', hNet >= 0 ? 'Net buyer' : 'Net seller');
    setT('smHsCount',  filtered.length + ' deals');
    const netEl = document.getElementById('smHsNet');
    if (netEl) netEl.className = 'sm-hs-val ' + (hNet >= 0 ? 'positive' : 'negative');
  } else {
    if (summaryEl) summaryEl.style.display = 'none';
    if (titleEl)   titleEl.textContent = 'Live Deal Feed';
  }

  // Stats
  let buyVal = 0, sellVal = 0, buyN = 0, sellN = 0;
  filtered.forEach(d => {
    if (d.side === 'buy') { buyVal += d.value; buyN++; }
    else { sellVal += d.value; sellN++; }
  });

  const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  const setClass = (id, cls) => { const el = document.getElementById(id); if (el) el.className = cls; };

  setText('smBuyFlow', _smFmtStat(buyVal, mktFilter));
  setText('smSellFlow', _smFmtStat(sellVal, mktFilter));
  setText('smBuyCount', buyN + ' transactions');
  setText('smSellCount', sellN + ' transactions');

  const net = buyVal - sellVal;
  setText('smNetFlow', (net >= 0 ? '+' : '') + _smFmtStat(Math.abs(net), mktFilter));
  setClass('smNetFlow', 'sm-stat-val ' + (net >= 0 ? 'positive' : 'negative'));
  setText('smNetLabel', net >= 0 ? 'Net buying pressure' : 'Net selling pressure');
  setText('smTotalDeals', filtered.length);
  setText('smLastRefresh', 'Updated ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  setText('smFeedCount', filtered.length + ' deals shown');

  const tbody = document.getElementById('smTableBody');
  if (!tbody) return;

  if (!filtered.length) {
    tbody.innerHTML = '<tr><td colspan="10" class="empty-td"><div class="empty-state"><i class="fa-solid fa-filter"></i><p>No deals match the current filters</p></div></td></tr>';
    return;
  }

  const typeMap = { block: ['sm-badge-block','Block Deal'], bulk: ['sm-badge-bulk','Bulk Deal'], darkpool: ['sm-badge-dark','Dark Pool'] };
  tbody.innerHTML = filtered.map(d => {
    const flag = d.market === 'india' ? '🇮🇳' : '🇺🇸';
    const qtyFmt = d.qty >= 1e7 ? (d.qty/1e7).toFixed(2)+'Cr' : d.qty >= 1e5 ? (d.qty/1e5).toFixed(1)+'L' : d.qty >= 1000 ? (d.qty/1000).toFixed(1)+'K' : d.qty.toLocaleString();
    const priceFmt = d.market === 'india' ? '₹' + d.price.toFixed(2) : '$' + d.price.toFixed(2);
    const [tbCls, tbLbl] = typeMap[d.type] || ['',''];
    const srcHtml = d.source
      ? `<a class="sm-source-tag" href="${d.source.url}" target="_blank" rel="noopener noreferrer" title="View on ${d.source.name}"><i class="fa-solid fa-arrow-up-right-from-square" style="font-size:9px;margin-right:3px"></i>${d.source.name}</a>`
      : '—';
    const safeEntity = d.entity.replace(/'/g, "\\'");
    const safeSym    = d.sym.replace(/'/g, "\\'");
    return `<tr class="sm-row-${d.side}${d.isNew ? ' sm-row-new' : ''}">
      <td class="sm-time mono">${d.timeStr}</td>
      <td><span class="sm-sym sm-clickable" title="Show history for ${d.sym}" onclick="smDrillDown('${safeSym}')">${flag} ${d.sym}</span></td>
      <td class="sm-company sm-clickable" title="Show history for ${d.name}" onclick="smDrillDown('${d.name.replace(/'/g,"\\'")}')">${d.name}</td>
      <td><span class="sm-type-badge ${tbCls}">${tbLbl}</span></td>
      <td><span class="sm-side-badge ${d.side}">${d.side === 'buy' ? 'BUY' : 'SELL'}</span></td>
      <td class="sm-entity sm-clickable" title="Show history for ${d.entity}" onclick="smDrillDown('${safeEntity}')">${d.entity}</td>
      <td class="mono sm-qty">${qtyFmt}</td>
      <td class="mono">${priceFmt}</td>
      <td class="sm-value-cell">${_smFmtVal(d)}</td>
      <td>${srcHtml}</td>
    </tr>`;
  }).join('');
}

// Smart money filter pills — delegated via document listener
document.addEventListener('click', function(e) {
  const pill = e.target.closest('[data-smfilter]');
  if (!pill) return;
  const group = pill.dataset.smfilter;
  smartMoney.filters[group] = pill.dataset.val;
  document.querySelectorAll(`[data-smfilter="${group}"]`).forEach(p => p.classList.toggle('active', p.dataset.val === pill.dataset.val));
  renderSmartMoney();
});

// ========== AI CHAT (Gemini) ==========
let aiChatMessages = []; // Gemini format: { role: 'user'|'model', parts: [{text}] }

// Auto-save provided Gemini key if none stored yet

function initAIChat() {
  document.getElementById('aiChatBody').style.display = 'flex';
}


function clearAIChat() {
  aiChatMessages = [];
  clearChartImage();
  document.getElementById('aiMessages').innerHTML =
    '<div class="ai-msg ai"><div class="ai-msg-avatar"><i class="fa-solid fa-robot"></i></div>' +
    '<div class="ai-msg-bubble">Chat cleared! Ask me anything about stocks 🚀</div></div>';
  document.getElementById('aiSuggestions').style.display = 'flex';
}

let pendingImage = null;

function handleChartImage(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target.result;
    const [header, base64] = dataUrl.split(',');
    const mimeType = header.match(/data:([^;]+)/)[1];
    pendingImage = { base64, mimeType };
    document.getElementById('aiPreviewImg').src = dataUrl;
    document.getElementById('aiImagePreview').style.display = 'flex';
    document.getElementById('aiChatInput').placeholder = 'Ask about this chart… (or press send to auto-analyze)';
    const btn = document.querySelector('.ai-upload-btn');
    if (btn) btn.classList.add('has-image');
  };
  reader.readAsDataURL(file);
  input.value = '';
}

function clearChartImage() {
  pendingImage = null;
  const preview = document.getElementById('aiImagePreview');
  if (preview) preview.style.display = 'none';
  const img = document.getElementById('aiPreviewImg');
  if (img) img.src = '';
  const inp = document.getElementById('aiChatInput');
  if (inp) inp.placeholder = 'Ask about any stock…';
  const btn = document.querySelector('.ai-upload-btn');
  if (btn) btn.classList.remove('has-image');
}

function appendAIMessageWithImage(role, text, base64, mimeType) {
  const wrap = document.getElementById('aiMessages');
  const div = document.createElement('div');
  div.className = 'ai-msg ' + role;
  const imgTag = `<img class="ai-msg-img" src="data:${mimeType};base64,${base64}" alt="Chart">`;
  div.innerHTML = `<div class="ai-msg-bubble">${imgTag}${text ? `<span>${text}</span>` : ''}</div>`;
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
}

function sendAISuggestion(btn) {
  document.getElementById('aiChatInput').value = btn.textContent;
  document.getElementById('aiSuggestions').style.display = 'none';
  sendAIMessage();
}

function getPortfolioContext() {
  try {
    const holdings = JSON.parse(localStorage.getItem(lsKey('sp_portfolio')) || '[]');
    if (!holdings.length) return 'User has no portfolio holdings yet.';
    return 'User portfolio: ' + holdings.map(function(h) {
      return h.symbol + ' (' + (h.market||'').toUpperCase() + ') — qty: ' + h.qty +
             ', avg buy: ' + h.buyPrice + ', sector: ' + (h.sector||'N/A');
    }).join('; ');
  } catch(e) { return ''; }
}

async function sendAIMessage() {
  const input = document.getElementById('aiChatInput');
  const text = input.value.trim();
  if (!text && !pendingImage) return;

  input.value = '';
  document.getElementById('aiSuggestions').style.display = 'none';

  const imgSnap = pendingImage;
  const parts = [];
  if (imgSnap) {
    parts.push({ inline_data: { mime_type: imgSnap.mimeType, data: imgSnap.base64 } });
  }
  const msgText = text || 'Analyze this chart. Identify the trend, key support/resistance levels, momentum signals, and give a clear Buy / Hold / Sell verdict with reasoning.';
  parts.push({ text: msgText });

  if (imgSnap) {
    appendAIMessageWithImage('user', text, imgSnap.base64, imgSnap.mimeType);
  } else {
    appendAIMessage('user', text);
  }
  aiChatMessages.push({ role: 'user', parts });
  clearChartImage();

  const bubbleId = 'ai-bubble-' + Date.now();
  appendAIMessage('ai', '...', bubbleId);

  const systemPrompt =
    'You are Prism AI, an expert stock market analyst embedded in a trading terminal. ' +
    'You cover both US markets (NYSE, NASDAQ) and Indian markets (NSE, BSE). ' +
    'Give sharp, concise, actionable analysis. Use bullet points where helpful. ' +
    'Always mention key risks alongside any recommendation. ' +
    'Never give financial advice as a licensed advisor — add a brief disclaimer.\n' +
    getPortfolioContext();

  try {
    const response = await fetch(PROXY_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: aiChatMessages, systemPrompt })
    });

    const data = await response.json();

    if (!response.ok) {
      const msg = (data.error && data.error.message) || ('HTTP ' + response.status);
      const hint = response.status === 429
        ? '\n\n⏱ Rate limit hit — please wait ~1 minute, then try again.'
        : '';
      updateAIBubble(bubbleId, '⚠️ ' + msg + hint, false);
      return;
    }

    const fullText = data.text || 'No response received. Please try again.';
    updateAIBubble(bubbleId, fullText, false);
    aiChatMessages.push({ role: 'model', parts: [{ text: fullText }] });

  } catch(err) {
    updateAIBubble(bubbleId, '⚠️ Connection error: ' + err.message, false);
  }
}

function appendAIMessage(role, text, id) {
  const wrap = document.getElementById('aiMessages');
  const div = document.createElement('div');
  div.className = 'ai-msg ' + role;
  if (role === 'ai') {
    div.innerHTML =
      '<div class="ai-msg-avatar"><i class="fa-solid fa-robot"></i></div>' +
      '<div class="ai-msg-bubble' + (id ? ' streaming' : '') + '"' + (id ? ' id="' + id + '"' : '') + '>' + text + '</div>';
  } else {
    div.innerHTML = '<div class="ai-msg-bubble">' + text + '</div>';
  }
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
}

function updateAIBubble(id, text, streaming) {
  const bubble = document.getElementById(id);
  if (!bubble) return;
  bubble.innerHTML = text.replace(/\n/g, '<br>');
  bubble.classList.toggle('streaming', streaming);
  const msgs = document.getElementById('aiMessages');
  if (msgs) msgs.scrollTop = msgs.scrollHeight;
}

// =====================================================================
// AUTH
// =====================================================================

function initAuth() {
  try {
    const user = JSON.parse(localStorage.getItem('mp_user') || 'null');
    if (!user) return;

    // Populate topbar avatar
    const img = document.getElementById('topbarAvatarImg');
    if (img && user.picture) {
      img.src = user.picture;
      img.onload  = () => img.classList.add('loaded');
      img.onerror = () => {};
    }

    // Populate dropdown
    const udAvatar = document.getElementById('udAvatarImg');
    if (udAvatar && user.picture) { udAvatar.src = user.picture; }
    const udName  = document.getElementById('udName');
    const udEmail = document.getElementById('udEmail');
    if (udName)  udName.textContent  = user.name  || '—';
    if (udEmail) udEmail.textContent = user.email || '—';

    // Toggle dropdown on avatar click
    const topbarUser = document.getElementById('topbarUser');
    const dropdown   = document.getElementById('userDropdown');
    if (topbarUser && dropdown) {
      topbarUser.addEventListener('click', e => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
      });
      document.addEventListener('click', () => dropdown.classList.remove('open'));
    }
  } catch(e) {}
}

function signOut() {
  localStorage.removeItem('mp_user');
  window.location.replace('login.html');
}

function getIndianMarketState() {
  const now = new Date();
  const ist = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  const day = ist.getUTCDay();
  const decimalHour = ist.getUTCHours() + (ist.getUTCMinutes() / 60);

  if (day === 0 || day === 6) {
    const dayName = day === 0 ? 'Sunday' : 'Saturday';
    return {
      state: 'weekend',
      message: `<strong>NSE closed (${dayName}).</strong> Click Live Prices to fetch the last trading day's (Friday) closing values.`,
      canUpdate: true
    };
  }
  if (decimalHour >= 3.75 && decimalHour < 10) {
    return { state: 'open', message: 'Market open (9:15 AM – 3:30 PM IST). Indian prices will update after close, post 6 PM IST.', canUpdate: false };
  }
  if (decimalHour >= 10 && decimalHour < 12.5) {
    return { state: 'awaiting', message: 'Market closed. End-of-day NSE prices available after 6 PM IST.', canUpdate: false };
  }
  return { state: 'eod-ready', message: '<strong>End-of-day prices available.</strong> Click Live Prices to update.', canUpdate: true };
}

function updateIndiaBannerState() {
  const banner = document.getElementById('indiaEodBanner');
  const text = document.getElementById('indiaEodText');
  const btn = document.getElementById('livePricesBtn');
  if (!banner || !text) return;

  const mktState = getIndianMarketState();
  text.innerHTML = mktState.message;

  if (btn) {
    if (mktState.canUpdate) {
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.title = '';
    } else {
      btn.disabled = true;
      btn.style.opacity = '0.5';
      btn.title = 'Indian prices available after 6 PM IST';
    }
  }
}

updateIndiaBannerState();
setInterval(updateIndiaBannerState, 5 * 60 * 1000);


