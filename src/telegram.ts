declare const Telegram: any;
// // Show main button
// Telegram.WebApp.MainButton.setParams({
//  text: 'Main Button',
// });
// Telegram.WebApp.MainButton.onClick(function () {
//  Telegram.WebApp.showAlert('Main Button was clicked');
// });
// Telegram.WebApp.MainButton.show();

export const telegramInit = () => {
  Telegram.WebApp.ready();
};

export const getTelegram = (): any => {
  return Telegram;
};
