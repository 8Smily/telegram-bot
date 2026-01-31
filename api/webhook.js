export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).send('Bot is running!');
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const SHEET_ID = "1W0N7o-IdPwrc6AknExUEl4OFv4zenJU0PCoy_4NOMfI";
  const SHEET_NAME = "BOT_ARC";
  
  try {
    const message = req.body.message;
    if (!message || !message.text) return res.status(200).send('OK');
    
    const chatId = message.chat.id;
    const text = message.text.trim();
    const odooId = message.from.id.toString();
    
    if (text === '/start') {
      await sendMessage(BOT_TOKEN, chatId, '👋 أهلاً فيك!\n\n📝 /register - للتسجيل\n🎮 /id - لعرض بطاقتك');
    }
    else if (text === '/register') {
      await sendMessage(BOT_TOKEN, chatId, '👋 يا هلا فيك!\n\n📝 اكتب اسمك:');
    }
    
  } catch (error) {
    console.log('Error:', error);
  }
  
  return res.status(200).send('OK');
}

async function sendMessage(token, chatId, text) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: text })
  });
}
