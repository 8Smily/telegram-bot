export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).send('Bot is running!');
  }

  const BOT_TOKEN = "7997008909:AAGg8QxPqrN721oHikAvRtFzwo2Yvutco_A";
  
  try {
    const message = req.body.message;
    if (!message || !message.text) return res.status(200).send('OK');
    
    const chatId = message.chat.id;
    const text = message.text.trim();
    
    if (text === '/start') {
      await sendMessage(BOT_TOKEN, chatId, '👋 أهلاً فيك!\n\n📝 /register - للتسجيل\n🎮 /id - لعرض بطاقتك');
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
