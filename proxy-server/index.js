'use strict';
const express = require('express');
const cors    = require('cors');
const axios   = require('axios');
const app     = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));

const GEMINI_KEY   = process.env.GEMINI_KEY;
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_BASE  = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}`;

// ── Yahoo Finance price proxy (bypasses browser CORS) ─────────────────
app.get('/price/:symbol', async (req, res) => {
  try {
    const sym = req.params.symbol;
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(sym)}`;
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 8000
    });
    const q = data?.quoteResponse?.result?.[0];
    if (!q || !q.regularMarketPrice) return res.status(404).json({ error: 'No data' });
    res.json({
      price:     q.regularMarketPrice,
      change:    q.regularMarketChange    ?? 0,
      changePct: q.regularMarketChangePercent ?? 0,
      prevClose: q.regularMarketPreviousClose ?? q.regularMarketPrice
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Shared: pipe Gemini SSE stream back to the browser client ─────────
async function streamGemini(geminiBody, res) {
  const url = `${GEMINI_BASE}:streamGenerateContent?alt=sse&key=${GEMINI_KEY}`;
  const geminiRes = await axios.post(url, geminiBody, {
    responseType: 'stream',
    validateStatus: () => true,
    headers: { 'Content-Type': 'application/json' },
    timeout: 120000
  });
  res.status(geminiRes.status);
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Accel-Buffering', 'no');
  geminiRes.data.pipe(res);
}

// ── AI Chat ───────────────────────────────────────────────────────────
// Body: { contents: [...], systemPrompt: "..." }
app.post('/chat', async (req, res) => {
  try {
    const { contents, systemPrompt } = req.body;
    const body = { contents, generationConfig: { maxOutputTokens: 4096 } };
    if (systemPrompt) body.systemInstruction = { parts: [{ text: systemPrompt }] };
    await streamGemini(body, res);
  } catch (e) {
    if (!res.headersSent) res.status(500).json({ error: { message: e.message } });
  }
});

// ── Portfolio Roast ───────────────────────────────────────────────────
// Body: { prompt: "..." }
app.post('/roast', async (req, res) => {
  try {
    const { prompt } = req.body;
    const body = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 8192 }
    };
    await streamGemini(body, res);
  } catch (e) {
    if (!res.headersSent) res.status(500).json({ error: { message: e.message } });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy running on :${PORT}`));
