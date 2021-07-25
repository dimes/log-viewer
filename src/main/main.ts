const { app, BrowserWindow } = require('electron');

(async () => {
  await app.whenReady();

  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile('./content.html');
})();