export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const now = new Date();
    const ist = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
    const istHourDecimal = ist.getUTCHours() + (ist.getUTCMinutes() / 60);

    // If before 6 PM IST, use previous trading day
    if (istHourDecimal < 12.5) {
      ist.setDate(ist.getDate() - 1);
    }

    // Try up to 5 days back to skip weekends and holidays
    let csv = null;
    let usedDate = null;

    for (let attempt = 0; attempt < 5; attempt++) {
      while (ist.getUTCDay() === 0 || ist.getUTCDay() === 6) {
        ist.setDate(ist.getDate() - 1);
      }

      const dd = String(ist.getUTCDate()).padStart(2, '0');
      const mm = String(ist.getUTCMonth() + 1).padStart(2, '0');
      const yyyy = ist.getUTCFullYear();
      const dateStr = `${dd}${mm}${yyyy}`;

      const url = `https://archives.nseindia.com/products/content/sec_bhavdata_full_${dateStr}.csv`;

      const r = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/csv,*/*'
        }
      });

      if (r.ok) {
        csv = await r.text();
        usedDate = dateStr;
        break;
      }

      ist.setDate(ist.getDate() - 1);
    }

    if (!csv) {
      return res.status(200).json({
        success: false,
        error: 'Bhavcopy not available. NSE may be down or it is a holiday.'
      });
    }

    const lines = csv.split('\n');
    const prices = {};

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.trim());
      if (cols.length < 11) continue;

      const symbol = cols[0];
      const series = cols[1];

      if (!['EQ', 'BE', 'BZ', 'BL', 'IL', 'SM', 'ST', 'T0', 'T1'].includes(series)) continue;

      const close = parseFloat(cols[7]);
      const prevClose = parseFloat(cols[8]);

      if (!close || !prevClose) continue;

      prices[symbol] = {
        open: parseFloat(cols[4]),
        high: parseFloat(cols[5]),
        low: parseFloat(cols[6]),
        close: close,
        prevClose: prevClose,
        change: close - prevClose,
        changePct: ((close - prevClose) / prevClose) * 100,
        volume: parseInt(cols[10]) || 0
      };
    }

    res.setHeader('Cache-Control', 's-maxage=43200, stale-while-revalidate');

    return res.status(200).json({
      success: true,
      date: usedDate,
      count: Object.keys(prices).length,
      prices: prices
    });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
