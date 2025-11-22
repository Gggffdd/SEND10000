export const initTelegramApp = () => {
  return new Promise((resolve) => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      
      // Инициализация WebApp
      tg.ready();
      tg.expand();
      tg.enableClosingConfirmation();
      
      // Устанавливаем тему
      document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#1e2328');
      document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#ffffff');
      document.documentElement.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color || '#8a8f95');
      document.documentElement.style.setProperty('--tg-theme-link-color', tg.themeParams.link_color || '#667eea');
      document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#667eea');
      document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color || '#ffffff');
      
      resolve(tg);
    } else {
      console.warn('Telegram WebApp not detected, running in browser mode');
      resolve(null);
    }
  });
};

export const sendDataToBot = (data) => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.sendData(JSON.stringify(data));
    return true;
  }
  return false;
};
