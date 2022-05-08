const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
Menu.setApplicationMenu(false)

var url = `http://google.com`; // change this to your URL

let pluginName;
switch (process.platform) {
  case "win32":
    pluginName = "flash/pepflashplayer.dll";
    break;
  case "darwin":
    pluginName = "flash/PepperFlashPlayer.plugin";
    break;
  case "linux":
    pluginName = "flash/libpepflashplayer.so";
    break;
}
app.commandLine.appendSwitch(
  "ppapi-flash-path",
  path.join(__dirname, pluginName)
);

app.on("ready", () => {
  let win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      plugins: true,
    },
  });
  win.loadURL(url);
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
