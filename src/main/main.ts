import { app, BrowserWindow, ipcMain, dialog, netLog, shell } from "electron";
import contextMenu from "electron-context-menu";
import * as path from "path";
import * as url from "url";
import * as fs from "fs";

contextMenu({
  showSaveImageAs: true,
  showInspectElement: true,
});

let mainWindow: Electron.BrowserWindow | null;

(async () => {
  await app.whenReady();
})();

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    backgroundColor: "#f2f2f2",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: process.env.NODE_ENV !== "production",
    },
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:4000");
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "renderer/index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }

  mainWindow.on("close", function (e) {
    if (mainWindow) {
      const userDataPath = app.getPath("userData");
      const filePath = path.join(userDataPath, "savedData.json");
      console.log("close filePath", filePath);
      const message = filePath
        ? `Are you sure you want to exit? The files and directories are saved in local file: ${filePath}`
        : "Are you sure you want to exit?";

      let response = dialog.showMessageBoxSync(mainWindow, {
        type: "question",
        buttons: ["Yes", "No"],
        title: "Confirm",
        message: message,
      });

      if (response == 1) e.preventDefault();
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();

  //  const filePath = path.join(__dirname, "data.json"); // Replace 'data.json' with your file's name
  const userDataPath = app.getPath("userData");
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
//working
ipcMain.handle("read-initial-data", async () => {
  const userDataPath = app.getPath("userData");
  const filePath = path.join(userDataPath, "savedData.json");

  if (filePath)
    try {
      const data = await fs.promises.readFile(filePath, "utf-8");
      const jsonData = JSON.parse(data);

      return jsonData;
    } catch (error) {
      return undefined;
    }
  else return undefined;
});

ipcMain.handle(
  "open-file-dialog",
  async (event): Promise<Electron.OpenDialogReturnValue> => {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
    });

    return result;
  }
);

ipcMain.handle("open-directory-dialog", async (event) => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  return result;
});

ipcMain.on("open-in-explorer", (_event, filePath) => {
  shell.showItemInFolder(filePath);
  // shell.openPath - in order to open the file also -> do a checkbox in case user want folder or file
  // shell.openPath(filePath);
});

ipcMain.on("save-data", (_event, data) => {
  const userDataPath = app.getPath("userData");
  const filePath = path.join(userDataPath, "savedData.json");

  fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) {
      console.error("Error saving data:", err);
    } else {
      console.log("Data saved successfully!");
    }
  });
});
