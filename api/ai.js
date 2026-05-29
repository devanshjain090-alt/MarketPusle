export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    if (!process.env.GEMINI_KEY) {
      const m = 'Server error: GEMINI_KEY not configured';
      return res.status(200).json({ reply: m, roast: m, text: m, response: m, message: m });
    }

    const body = req.body;
    const isRoast = req.url.includes('roast');
    const userText = isRoast ? body.prompt : (body.message || body.prompt);

    if (!userText) {
      const m = 'No message provided';
      return res.status(200).json({ reply: m, roast: m, text: m, response: m, message: m });
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
      const errMsg = `Gemini error (${geminiResponse.status}): ${data.error?.message || JSON.stringify(data).slice(0, 200)}`;
      return res.status(200).json({ reply: errMsg, roast: errMsg, text: errMsg, response: errMsg, message: errMsg });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      const raw = 'No text in response. Raw: ' + JSON.stringify(data).slice(0, 400);
      return res.status(200).json({ reply: raw, roast: raw, text: raw, response: raw, message: raw });
    }

    return res.status(200).json({ reply: text, roast: text, text: text, response: text, message: text });

  } catch (e) {
    const errMsg = 'Function crashed: ' + e.message;
    return res.status(200).json({ reply: errMsg, roast: errMsg, text: errMsg, response: errMsg, message: errMsg });
  }
}
