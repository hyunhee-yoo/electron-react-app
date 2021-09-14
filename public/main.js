const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require("electron-devtools-installer");

const windowRegistry = {
  app: null,
};

async function createAppWindow() {
  windowRegistry.app = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  windowRegistry.app.on("close", () => app.quit());
  
  if (isDev) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    
    windowRegistry.app.loadURL("http://localhost:3000");
    windowRegistry.app.webContents.openDevTools();
    
    return;
  } 

  await windowRegistry.app.loadFile(
    `${path.join(__dirname, "../build/index.html")}`,
  );
}

function addIpcListeners() {
  ipcMain.handle("get-window-id", (e, window) => {
    return windowRegistry[window]?.webContents.id;
  });
}

app.whenReady().then(async () => {
  await createAppWindow();

  addIpcListeners();
});
