//Modules
const {remote} = require('electron')

//Menu Template
const temlate = [
  {
    label: 'Items',
    submenu:[
      {
        label:'Add New',
        click: window.newItem,
        acclerator: 'CmdOrCtrl+o'
      },
      {
        label:'Read Item',
        acclerator: 'CmdOrCtrl+Enter',
        click: window.openItem
      },
      {
        label:'Delet Item',
        acclerator:'CmdOrCtrl+Backspace',
        click: window.deletItem
      },
      {
        label:'open in browser',
        acclerator:'CmdOrCtrl+shift+o',
        click: window.openItemNative
      },
      {
        label:'Search Items',
        acclerator:'CmdOrCtrl+s',
        click: window.searchItems
      }
    ]
  },
  {
    role:'editMenu'
  },
  {
    role:'windowMenu'
  },
  {
    role:'help',
    submenu:[
      {
        label:'Learn more',
        click:() => {'https://Electronjs.org'}
      }
    ]
  }
]

//Build menu
const menu = remote.Menu.buildFromTemplate(temlate)

//set as main app menu
remote.menu.setApplicationMenu(menu)
