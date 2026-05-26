'use strict';

const GEMINI_KEY   = process.env.GEMINI_KEY;
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_BASE  = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`;

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const isRoast = event.path.endsWith('/roast');

    let geminiBody;
    if (isRoast) {
      geminiBody = {
        contents: [{ role: 'user', parts: [{ text: body.prompt }] }],
        generationConfig: { maxOutputTokens: 8192 }
      };
    } else {
      geminiBody = {
        contents: body.contents,
        generationConfig: { maxOutputTokens: 4096 }
      };
      if (body.systemPrompt) {
        geminiBody.systemInstruction = { parts: [{ text: body.systemPrompt }] };
      }
    }

    const r = await fetch(GEMINI_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody)
    });

    const data = await r.json();

    if (!r.ok) {
      return {
        statusCode: r.status,
        headers,
        body: JSON.stringify({ error: data.error || { message: 'Gemini API error' } })
      };
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.';
    return { statusCode: 200, headers, body: JSON.stringify({ text }) };

  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: { message: e.message } })
    };
  }
};
