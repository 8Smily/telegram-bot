export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).send('Bot is running!');
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  
  try {
    const message = req.body.message;
    if (!message || !message.text) {
      return res.status(200).send('OK');
    }
    
    const chatId = message.chat.id;
    const text = message.text.trim();
    
    let reply = '';
    
    if (text === '/start') {
      reply = '👋 أهلاً فيك!\n\n📝 /register - للتسجيل\n🎮 /id - لعرض بطاقتك';
    }
    else if (text === '/register') {
      reply = '👋 يا هلا فيك!\n\n📝 اكتب اسمك:';
    }
    
    if (reply) {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: reply })
      });
    }
    
  } catch (error) {
    console.log('Error:', error);
  }
  
  return res.status(200).send('OK');
}
```


