import { url } from "inspector"

const { BrowserWindow } = require('electron')

let offScreenWindow

module.exports = (url,callback) => {

  offScreenWindow = new BrowserWindow({
    width:500,
    height:500,
    show:false,
    webPreferences:{
      offscreen:true,
      nodeIntegration:false
    }
  })

  offScreenWindow.loadURL(url)

  offScreenWindow.webContents.on('did-finish-load', e => {
    let title = offScreenWindow.getTitle()

    offScreenWindow.webContents.capturePage(image => {
      let screenShot = image.toDataURL()

      callback({title,screenShot,url})

      offScreenWindow.close()
      offScreenWindow=null;
    })
  })
}
