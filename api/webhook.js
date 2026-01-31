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

### 4️⃣ اضغط **Commit changes**

---

### 5️⃣ بعدين امسح الرسائل القديمة:
```
https://api.telegram.org/bot7997008909:AAGCk70HrIz0CaNtFb548jB7q9-p13RuGx0/deleteWebhook?drop_pending_updates=true
```

### 6️⃣ ثم اربط من جديد:
```
https://api.telegram.org/bot7997008909:AAGCk70HrIz0CaNtFb548jB7q9-p13RuGx0/setWebhook?url=https://telegram-bot-three-lake.vercel.app/api/webhook
