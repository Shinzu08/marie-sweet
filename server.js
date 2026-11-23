const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// ⚠️ Make sure your real Token and Chat ID are still here!
const TELEGRAM_BOT_TOKEN = '9174860725:AAED335sppPGpu9xLgKM7mMt3UHcrrDo6Sg';
const TELEGRAM_CHAT_ID = '1903184963';

app.use(express.json());
app.use(express.static('public'));

app.post('/order', async (req, res) => {
  const { table, items, total } = req.body;
  
  if (!table || !items || items.length === 0) {
    return res.status(400).json({ error: 'Invalid order' });
  }

  // Build the message for Telegram
  let msg = `☕ NEW ORDER — Table ${table}\n\n`;
  
  // Loop through items and format them perfectly
  items.forEach(i => {
    msg += `• 1x ${i.name} — ${i.price} DA\n`;
  });
  
  msg += `\n💰 TOTAL: ${total} DA`;

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        chat_id: TELEGRAM_CHAT_ID, 
        text: msg 
      })
    });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not send order' });
  }
});

app.listen(PORT, () => console.log(`Marie Sweet running on port ${PORT}`));