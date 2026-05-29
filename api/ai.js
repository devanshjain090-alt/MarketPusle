export default async function handler(req, res) {
  // CORS headers — must be set on every response including OPTIONS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    const isRoast = req.url.includes('roast');

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_KEY}`;

    // Support full conversation history or simple message/prompt
    const contents = body.contents || [{
      role: 'user',
      parts: [{ text: isRoast ? body.prompt : body.message }]
    }];

    const geminiBody = { contents };

    if (body.systemPrompt) {
      geminiBody.systemInstruction = {
        parts: [{ text: body.systemPrompt }]
      };
    }

    const r = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody)
    });

    const data = await r.json();

    if (!r.ok) {
      return res.status(500).json({ error: data.error?.message || 'Gemini API error' });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    return res.status(200).json({ roast: text, reply: text });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
