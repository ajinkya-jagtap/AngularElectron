import { Component } from '@angular/core';
import { ipcRenderer} from 'electron';
import { } from 'electron';
import Fs from 'fs';
const items = require('./items')


const electron = (<any>window).require('electron');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'angular-electron';
  showModal = document.getElementById('show-modal')
  closeModal = document.getElementById('close-modal')
  modal = document.getElementById('modal')
  addItem = document.getElementById('add-item')
  itemUrl = document.getElementById('url')
  search = document.getElementById('search')

  //Open new item modal through application context
  // window.newItem = () => {
  //   this.showModal.click();
  // }
  newItem(){
    this.showModal.click()
  }

  //Ref to items.open globally
  openItems = items.open

  //items.delete Item
  deletItem = () => {
    let selectedItem = items.getSelectedItem()
    items.delete(selectedItem.index)
  }
  //Open item in chromiun
  openItemNative = items.openNative

  //Focus to search item
  searchItems = () => {
    this.search.focus()
  }



  //Filter text with 'search'
  onSearch(){
    this.search.addEventListener('keyup',e => {

      //Loop items
      Array.from(document.getElementsByClassName('read-item')).forEach(itemm => {
          //Hide items that dont match search value
          var value = (document.getElementById("search") as HTMLInputElement).value

          //var x = document.getElementById
          let hasmatch = itemm.textContent.toLowerCase().includes(value)

          //itemm.style.display = hasmatch ? 'flex' : 'none'
      })

    })
  }

  //navigate item selection with arrow up and down

  onKeyNavigate(){
     document.addEventListener('keydown',e => {
       if(e.key === 'ArrowUp' || e.key === 'ArrowDown'){
         items.changeSelection(e.key)
       }

  })
}

  constructor(){

  }


  //disable and enable modal button
  bttn = <HTMLInputElement> document.getElementById("add-item")

  // toggleModalButtons() {
  //   if(this.bttn.disabled === true){
  //     console.log('disabled')
  //   }
  //   else{

  //     this.bttn.innerText = "Adding..."
  //   }
  // }

  // handleKeyboardEvent(event: KeyboardEvent) {
  //   console.log(event);
  // }


  onAdd(){
    console.log('+ clicked'),
    document.getElementById("modal").style.display = "flex";

    document.getElementById("url").focus();
    }

    onClose(){
    document.getElementById("modal").style.display = "none";
    }

    //Add url on Enter key

    onKeyPress(event:any){
        document.getElementById('add-item').click()
    }

    onAddURL(){
     var value = (document.getElementById("url") as HTMLInputElement).value
     console.log(value)

     //send new item url to main process
      electron.ipcRenderer.send('new-item',value)

      //Listen for new item from main process
      electron.ipcRenderer.on('new-item-success',(e,newItem) => {
        //console.log(newItem)
        // Add new items to "items" node
        items.addItem(newItem,true)
      })


    //  if(this.itemUrl.value){
    //    console.log(this.itemUrl.value)


    }
 }
