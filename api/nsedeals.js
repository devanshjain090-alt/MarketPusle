// api/nsedeals.js — fetches real NSE bulk/block deals server-side.
// NSE requires a session cookie from the homepage before the API will respond.
// Deployed on Vercel; 15-minute cache prevents hammering NSE on every visitor.
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const type = req.query.type === 'block' ? 'block-deals' : 'bulk-deals';

  const baseHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.nseindia.com/report-detail/display-bulk-and-block-deals',
    'Origin': 'https://www.nseindia.com',
  };

  try {
    // Step 1 — hit the homepage to get a valid session cookie
    const homeRes = await fetch('https://www.nseindia.com', { headers: baseHeaders });
    const rawCookie = homeRes.headers.get('set-cookie') || '';
    const cookie = rawCookie
      .split(/,(?=[^ ])/)           // split on commas that start a new cookie
      .map(c => c.split(';')[0].trim())
      .filter(Boolean)
      .join('; ');

    // Step 2 — today's date in DD-MM-YYYY (NSE format)
    const d = new Date();
    const dd   = String(d.getDate()).padStart(2, '0');
    const mm   = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const date = `${dd}-${mm}-${yyyy}`;

    // Step 3 — fetch the actual deal data
    const apiUrl = `https://www.nseindia.com/api/historical/${type}?from=${date}&to=${date}`;
    const dataRes = await fetch(apiUrl, {
      headers: { ...baseHeaders, Cookie: cookie },
    });

    if (!dataRes.ok) {
      return res.status(dataRes.status).json({
        error: 'NSE API rejected the request',
        status: dataRes.status,
        hint: 'NSE may be blocking this server\'s IP or the market is closed.',
      });
    }

    const json = await dataRes.json();

    // 15-min CDN cache; stale-while-revalidate for up to 1 hour
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
    return res.status(200).json(json);

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
