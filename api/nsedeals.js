// api/nsedeals.js — fetches real NSE bulk/block deals server-side.
// Two-step cookie warm-up: homepage → report page → API call.
// Surfaces raw NSE response so IP-block vs real errors are distinguishable.
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const type = req.query.type === 'block' ? 'block-deals' : 'bulk-deals';

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/json,*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
  };

  const parseCookies = (raw) =>
    (raw || '').split(/,(?=[^ ])/).map(c => c.split(';')[0].trim()).filter(Boolean).join('; ');

  try {
    // Step 1 — homepage → first set of session cookies
    const home = await fetch('https://www.nseindia.com', { headers });
    let cookie = parseCookies(home.headers.get('set-cookie'));

    // Step 2 — report page → additional cookies NSE requires before the API responds
    const report = await fetch(
      'https://www.nseindia.com/report-detail/display-bulk-and-block-deals',
      { headers: { ...headers, Cookie: cookie, Referer: 'https://www.nseindia.com/' } }
    );
    const c2 = parseCookies(report.headers.get('set-cookie'));
    if (c2) cookie = cookie ? `${cookie}; ${c2}` : c2;

    // Step 3 — actual data API call
    const d = new Date();
    const date = `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`;
    const apiUrl = `https://www.nseindia.com/api/historical/${type}?from=${date}&to=${date}`;

    const r = await fetch(apiUrl, {
      headers: {
        ...headers,
        Cookie: cookie,
        Accept: 'application/json',
        Referer: 'https://www.nseindia.com/report-detail/display-bulk-and-block-deals',
      },
    });

    const text = await r.text();

    // NSE returns HTML when it blocks the request — surface this clearly
    if (text.trim().startsWith('<')) {
      return res.status(502).json({
        error: 'NSE returned HTML — likely IP-blocked or session rejected',
        httpStatus: r.status,
        preview: text.slice(0, 200),
      });
    }

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
    return res.status(200).json(JSON.parse(text));

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
