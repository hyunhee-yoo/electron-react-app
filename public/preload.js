const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs/promises");

contextBridge.exposeInMainWorld("api", {
  getWindowId: async () => {
    const windowId = await ipcRenderer.invoke("get-window-id", "app");
    
    return windowId;
  },
  accessToFile: async (filePath) => {
    try {
      await fs.access(filePath);
      
      return true;
    } catch {
      return false;
    }
  },
});
