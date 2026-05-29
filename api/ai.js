export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    if (!process.env.GEMINI_KEY) {
      return res.status(200).json({ reply: 'Server error: GEMINI_KEY not configured', roast: 'Server error: GEMINI_KEY not configured' });
    }

    const body = req.body;
    const isRoast = req.url.includes('roast');
    const userText = isRoast ? body.prompt : body.message;

    if (!userText) {
      return res.status(200).json({ reply: 'No message provided', roast: 'No message provided' });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_KEY}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userText }] }]
      })
    });

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      const errMsg = data.error?.message || JSON.stringify(data).slice(0, 300);
      return res.status(200).json({
        reply: `Error from Gemini (${geminiResponse.status}): ${errMsg}`,
        roast: `Error from Gemini (${geminiResponse.status}): ${errMsg}`
      });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(200).json({
        reply: 'Empty response. Raw: ' + JSON.stringify(data).slice(0, 300),
        roast: 'Empty response. Raw: ' + JSON.stringify(data).slice(0, 300)
      });
    }

    return res.status(200).json({ reply: text, roast: text });

  } catch (e) {
    return res.status(200).json({
      reply: 'Function crashed: ' + e.message,
      roast: 'Function crashed: ' + e.message
    });
  }
}
