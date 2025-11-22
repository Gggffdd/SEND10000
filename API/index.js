import express from 'express';
import cors from 'cors';
import authRoutes from './auth.js';
import cryptoRoutes from './crypto.js';

const app = express();

app.use(cors());
app.use(express.json());

// Маршруты
app.use('/api/auth', authRoutes);
app.use('/api/crypto', cryptoRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Главная страница API
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Crypto Telegram Mini App API',
    version: '1.0.0'
  });
});

export default app;
