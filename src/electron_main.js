const { app, Menu, BrowserWindow} = require('electron')

function createWindow () {
    const win = new BrowserWindow({
        width: 1280,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: true
        }
    })
    win.loadFile('./dist/index.html')

    const isMac = process.platform === 'darwin'

    const template = [
        // { role: 'appMenu' }
        ...(isMac ? [{
            label: app.name,
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideOthers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        }] : []),
        // { role: 'fileMenu' }
        {
            label: 'File',
            submenu: [
                {
                    label: 'New Window',
                    accelerator: 'Shift+Command+N',
                    click: () => {
                        createWindow();
                    }
                },
                isMac ? { role: 'close' } : { role: 'quit' }
            ]
        },
        // { role: 'viewMenu' }
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'GitHub repository',
                    click: async () => {
                        const { shell } = require('electron')
                        await shell.openExternal('https://github.com/vellons/SimplePYBotDashboard')
                    }
                },
                {
                    label: 'GitHub SDK repository',
                    click: async () => {
                        const { shell } = require('electron')
                        await shell.openExternal('https://github.com/vellons/SimplePYBotSDK')
                    }
                }
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

app.whenReady().then(createWindow)

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
