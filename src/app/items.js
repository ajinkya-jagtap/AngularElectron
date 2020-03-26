//Modules
const fs = require('fs')
const { shell } = require('electron')

//DOM Nodes
let items = document.getElementById("items")

//Get JS file
let readerJS
fs.readFile('${__dirname}/reader.js',(err,data) => {
  readerJS = data.toString()
})

//Listen for "Done" message from reader window
window.addEventListener('message', e => {
  //console.log(e.data)
  //check for correct message
  if(e.data.action === 'delete-reader-item'){
    //console.log(e.source)
  //Delet item at given index
  this.delete(e.data.itemIndex)
  //console.log(e.data)

    e.source.close()
  }
})

//Delet item
exports.delete = itemIndex => {
  //Remove item from DOM
  items.removeChild(items.childNodes[itemIndex])
  //Remove from storage
  this.storage.splice(itemIndex,1)

  //Persist
  this.save()
  //Select previous item or new first item if first was deleted
  if(this.storage.length){
    //Get new selected item index
    let newSelectedItemIndex = (itemIndex === 0 ) ? 0 : itemIndex - 1

    //set item at new index as selected
    document.getElementsByClassName('new-item')[newSelectedItemIndex].classList.add('selected')
  }
}

//Open item in native browser
exports.openNative = () => {
  //Only if items are present
  if(!this.storage.length) return

  //Get selected item
  let selectedItem = this.getSelectedItem()

  //Open in system browser
  //shell.openExternal(selectedItem.node)
  shell.openExternal(selectedItem.node.dataset.url)

}


//Get selected item index
exports.getSelectedItem = () => {
  let currentItem = document.getElementsByClassName('read-item selected')[0]

  //Get item index
  let itemIndex = 0;
  let child = currentItem
  while((child = child.previousSibling) != null) itemIndex++

  //Return selected item and index
  return { node: currentItem, index: itemIndex}
}


//Store items in storage
exports.storage = JSON.parse(localStorage.getItem('readit-items')) || []
//Persist storage
exports.save = () => {
  localStorage.setItem('readit-items',JSON.stringify(this.storage))
}

//set item as selected
exports.select = e => {
  //Remove currently selected item class
  this.getSelectedItem().node.classList.remove('selected')

  //Add to clicked item
  e.currentTarget.classList.add('selected')
}
//move to newly selected item

exports.changeSelection = direction => {
  //get selected item
  let currentItem = this.getSelectedItem()

  //handle up,down
  if(direction === 'ArrowUp' && currentItem.node.previousSibling){
    currentItem.node.classList.remove('selected')
    currentItem.node.previousSibling.classList.add('selected')
  }
  else if(direction === 'ArrowDown' && currentItem.nextSibling)
  {
    currentItem.node.classList.remove('selected')
    currentItem.node.nextSibling.classList.add('selected')
  }
}

//Open selected item
exports.open = () => {
  //Only if we have items(in case of menu open)
  if(!this.storage.length) return

  //Get selected item
  let selectedItem = this.getSelectedItem()

  //Get items url
  let contentURL = selectedItem.node.dataset.url
  //console.log('Opening item:' ,contentURL)

  //open item in proxy browser window

  let readerWindow = window.open(contentURL,'',`
  maxWidth = 2000,
  maxHeight = 2000,
  width = 1200,
  height = 800,
  backgroundColor = #DEDEDE,
  nodeIntegration = 0,
  `)

  //Inject js with specific item index
  readerWindow.eval(readerJS.replace('{{index}}',selectedItem.index))

}



//Add new item
exports.addItem = (item,isNew = false) => {

  //Create a new DOM Node
  let itemNode = document.createElement('div')

  //Assign read-item class
  itemNode.setAttribute('class','read-item')

  //Set itemurl as data url
  itemNode.setAttribute('data-url',item.url)

  //Add inner HTML
  itemNode.innerHTML = `<img src="${item.screenshot}"><h2>${item.title}`

  //Append new node to "items"
  items.appendChild(itemNode)

  //Attach click handler to select
  itemNode.addEventListener('click',this.select)

  //Attach open doubleclick handler
  itemNode.addEventListener('dblclick',this.open)

  //If this is a first item,select it
  if(document.getElementsByClassName('read-item').length === 1){
    itemNode.classList.add('selected')
  }


  //Add item to storage & persist
  if(isNew){
  this.storage.push(item)
  this.save()
  }
}

//Add items from storage when app loads
this.storage.forEach(item => {
  this.addItem(item,false)
});

