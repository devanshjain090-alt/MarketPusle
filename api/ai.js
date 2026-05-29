export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    if (!process.env.GEMINI_KEY) {
      console.error('GEMINI_KEY environment variable is missing');
      return res.status(500).json({ error: 'Server configuration error: API key not set' });
    }

    const body = req.body;
    const isRoast = req.url.includes('roast');
    const userText = isRoast ? body.prompt : body.message;

    if (!userText) {
      return res.status(400).json({ error: 'Missing prompt or message in request body' });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_KEY}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: userText }] }]
      })
    });

    const data = await geminiResponse.json();

    // Log the Gemini response for debugging
    console.log('Gemini response status:', geminiResponse.status);
    console.log('Gemini response:', JSON.stringify(data).slice(0, 500));

    if (!geminiResponse.ok) {
      return res.status(200).json({
        reply: `Gemini API error: ${data.error?.message || 'Unknown'}`,
        roast: `Gemini API error: ${data.error?.message || 'Unknown'}`
      });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(200).json({
        reply: 'No response generated. Raw response: ' + JSON.stringify(data).slice(0, 200),
        roast: 'No response generated'
      });
    }

    return res.status(200).json({ reply: text, roast: text });

  } catch (e) {
    console.error('Function error:', e.message, e.stack);
    return res.status(500).json({ error: e.message });
  }
}
