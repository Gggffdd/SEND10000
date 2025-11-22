import TelegramBot from 'node-telegram-bot-api';
import express from 'express';

const token = '8579547514:AAFJQR6CL_Ui2Q8-Ac0g_y4vBtwrR4tXraU';
const bot = new TelegramBot(token);
const app = express();

app.use(express.json());

// Команда старт
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const keyboard = {
    inline_keyboard: [[
      {
        text: '🚀 Открыть Crypto App',
        web_app: { url: 'https://your-app.vercel.app' }
      }
    ]]
  };

  bot.sendMessage(chatId, 
    `💰 *Добро пожаловать в Crypto Trading Simulator!*

📊 *Торгуйте криптовалютой в реальном времени*
💼 *Создайте виртуальный портфель*
📈 *Следите за рынком 24/7*

Нажмите кнопку ниже чтобы начать:`, 
    {
      parse_mode: 'Markdown',
      reply_markup: keyboard
    }
  );
});

// Обработка веб-апп данных
bot.on('message', (msg) => {
  if (msg.web_app_data) {
    const data = JSON.parse(msg.web_app_data.data);
    const chatId = msg.chat.id;
    
    bot.sendMessage(chatId, `✅ Данные получены: ${JSON.stringify(data)}`);
  }
});

// Запуск сервера для вебхуков
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot server running on port ${PORT}`);
});

export default bot;
