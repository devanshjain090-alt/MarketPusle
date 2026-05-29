export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    if (!process.env.GEMINI_KEY) {
      const m = 'Server error: GEMINI_KEY not configured';
      return res.status(200).json({ reply: m, roast: m, text: m });
    }

    const body = req.body;

    // Build Gemini request body
    let geminiBody = {};

    // Case 1: app sends pre-formatted Gemini contents (your case)
    if (body.contents) {
      geminiBody.contents = body.contents;
      if (body.systemPrompt) {
        geminiBody.systemInstruction = { parts: [{ text: body.systemPrompt }] };
      }
    }
    // Case 2: app sends a prompt (for roast)
    else if (body.prompt) {
      geminiBody.contents = [{ parts: [{ text: body.prompt }] }];
    }
    // Case 3: app sends a simple message
    else if (body.message) {
      geminiBody.contents = [{ parts: [{ text: body.message }] }];
    }
    else {
      const m = 'No content found. Body: ' + JSON.stringify(body).slice(0, 200);
      return res.status(200).json({ reply: m, roast: m, text: m });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_KEY}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody)
    });

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      const errMsg = `Gemini error (${geminiResponse.status}): ${data.error?.message || JSON.stringify(data).slice(0, 200)}`;
      return res.status(200).json({ reply: errMsg, roast: errMsg, text: errMsg });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      const raw = 'Empty Gemini response: ' + JSON.stringify(data).slice(0, 300);
      return res.status(200).json({ reply: raw, roast: raw, text: raw });
    }

    // Return Gemini-style response so the app can parse it as it expects
    return res.status(200).json({
      reply: text,
      roast: text,
      text: text,
      candidates: data.candidates,
      ...data
    });

  } catch (e) {
    const errMsg = 'Function crashed: ' + e.message;
    return res.status(200).json({ reply: errMsg, roast: errMsg, text: errMsg });
  }
}
