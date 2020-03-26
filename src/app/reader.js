//alert('Hello from reader.JS')

//create button in remote content to mark item as done
let readitClose = document.createElement('div')

//style button
readitClose.style.position = 'fixed'
readitClose.style.bottom = '15px'
readitClose.style.right = '15px'
readitClose.style.padding = '5px 10px'
readitClose.style.fontSize = '20px'
readitClose.style.fontWeight = 'bold'
readitClose.style.background = 'dodgerblue'
readitClose.style.color = 'white'
readitClose.style.borderRadius = '5px'
readitClose.style.cursor = 'default'
readitClose.style.boxShadow = '2px 2px 2px rgba(0,0,0,0.2)'

//Append button to body
document.getElementsByTagName('body')[0].appendChild(readitClose)

//Attach click listener to button
readitClose.onclick = e => {
  //alert('doe with button')

  //Message parent window
  window.opener.postMessage({
    action: 'delete-reader-item',
    itemIndex: {{index}}
  },'*')
}

