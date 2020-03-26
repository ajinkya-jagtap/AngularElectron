import { app, BrowserWindow,} from 'electron'
const windowStateKeeper = require('electron-window-state')
import {Component} from '@angular/core'
import {} from 'electron'
import * as fs from 'fs'

var path = require("path");
var url = require("url");
//var readItem = require('./readItem');
//import { readItem } from "./readItem";
import { from } from 'rxjs'

const readItem = require("./readItem")

const
  electron = require('electron'),
  ipcMain = electron.ipcMain

let win: BrowserWindow

ipcMain.on('new-item',(e,itemUrl) => {

  readItem(itemUrl,item => {
    e.sender.send('new-item-success',item)})
})


app.on('ready', createWindow)

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }})

  function createWindow() {

    //win state keeper
    let state = windowStateKeeper({
      defaultWidth: 700,defaultHeight:750,
    })

    win = new BrowserWindow({
      x:state.x,y:state.y,
      width: state.width, height: state.height,
      minWidth:500,minHeight:600,
      webPreferences:{
        nodeIntegration:true
      }
      })

      state.manage(win)

    //win.loadURL('https://electronjs.org')

    win.loadURL(
    url.format({
    pathname: path.join(__dirname, `/../../dist/angular-electron/index.html`),
    protocol: 'file:',
    slashes: true,
    })
    )

    win.webContents.openDevTools()

    win.on('closed', () => {
    win = null
    })
    }



































