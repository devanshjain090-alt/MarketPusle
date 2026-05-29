export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const body = req.body;
    const isRoast = req.url.endsWith('/roast');

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_KEY}`;

    const geminiBody = {
      contents: [{
        role: 'user',
        parts: [{ text: isRoast ? body.prompt : body.message }]
      }]
    };

    const r = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody)
    });

    const data = await r.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

    return res.status(200).json({ roast: text, reply: text });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
