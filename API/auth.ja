import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Временное хранилище пользователей
const users = new Map();

// Регистрация/авторизация пользователя
router.post('/login', (req, res) => {
  const { initData } = req.body;
  
  try {
    // В реальном приложении здесь должна быть проверка подписи Telegram
    const userData = parseInitData(initData);
    
    if (!users.has(userData.id)) {
      users.set(userData.id, {
        id: userData.id,
        username: userData.username,
        firstName: userData.first_name,
        balance: 10000, // Стартовый баланс
        portfolio: {},
        createdAt: new Date()
      });
    }
    
    const user = users.get(userData.id);
    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        balance: user.balance,
        portfolio: user.portfolio
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Получение данных пользователя
router.get('/user/:id', (req, res) => {
  const user = users.get(parseInt(req.params.id));
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(404).json({ success: false, error: 'User not found' });
  }
});

function parseInitData(initData) {
  const params = new URLSearchParams(initData);
  return {
    id: parseInt(params.get('user[id]')),
    username: params.get('user[username]'),
    first_name: params.get('user[first_name]')
  };
}

export default router;
