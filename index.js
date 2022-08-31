function openMenu() {
  document.getElementById("on-click-menu").style.width = "50%";
}

function closeMenu() {
  document.getElementById("on-click-menu").style.width = "0";
}

function openCart() {
  document.getElementById(`cart-display`).style.display =  `inline-block`
  document.getElementById("open-cart").style.width = "80%";
}

function closeCart() {
  document.getElementById("open-cart").style.width = "0%";
  document.getElementById(`cart-display`).style.display =  `none`
}

let i = document.getElementById("item-counter").innerText;
function addtocart() {
  i++;
  document.getElementById("item-counter").innerText = i;
}
function removeFromCart() {
  i--;
  document.getElementById("item-counter").innerText = i;
}

var removeCartItemButtons = document.getElementsByClassName(`item-remove-btn`)
for (let a = 0; a < removeCartItemButtons.length; a++) {
var button = removeCartItemButtons[a]
button.addEventListener('click', removeCartItem)
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
    removeFromCart()
}


function updateCartTotal(){
  let cartItemContainer = document.getElementsByClassName(`cart-content`)[0]
  let cartRows = cartItemContainer.getElementsByClassName(`cart-row`)
  let total = 0
  for (let i = 0; i < cartRows.length; i++){
    let cartRow = cartRows[i]
    let priceElement = cartRow.getElementsByClassName(`cart-priceTag`)[0]
    let quantityElement = cartRow.getElementsByClassName(`cart-quantity-input`)[0]
    let price = parseFloat(priceElement.innerText.replace(`$` , ``))
    let quantity = quantityElement.value
    total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName(`total-price`)[0].innerText = `$` + total


    if(total >=1){
        document.querySelector(`.checkout-btn`).style.display = `inline`;
    }
    else{
      document.querySelector(`.checkout-btn`).style.display = `none`;
    }

  
}


let quantityInputs = document.getElementsByClassName(`cart-quantity-input`)
for(let i = 0; i < quantityInputs.length; i++){
  let input = quantityInputs[i]
  input.addEventListener(`change` , quantityChanged)
}

function quantityChanged(event){
  let input = event.target
  if (isNaN(input.value) || input.value <=0){
    input.value = 1
  }
  updateCartTotal()
}

let addToCartButtons = document.getElementsByClassName(`cart-btn`)
for( let i = 0; i < addToCartButtons.length; i++){
  let button = addToCartButtons[i]
  button.addEventListener(`click` , function addToCartClicked(event){
    let button = event.target
    let shopItem = button.parentElement
    let title = document.getElementsByClassName(`hanging-laundry-heading`)[0].textContent
    let price = shopItem.getElementsByClassName(`price-tag`)[0].innerText
    let imageSrc = shopItem.getElementsByClassName(`laundry-bag-img`)[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
  })
}

function addItemToCart(title, price, imageSrc){
  let cartRow = document.createElement(`div`)
  cartRow.classList.add(`cart-row`)
  let cartItems = document.getElementsByClassName(`cart-content`)[0]
  let cartRowContents = `
                <div class="cart-left">
                    <img id="cart-img" src="${imageSrc}" alt="" />
                    <p id="product-name">${title}</p>
                </div>
                <div class="cart-item-price">
                    <p class="cart-priceTag" id="price-of-item">${price}</p>
                </div>
                <div class="cart-item-quantity">
                    <input type="number" name="number" class="cart-quantity-input" id="select-quantity" placeholder="Quantity" min="1" value="1">
                    <button id="remove-item" class="item-remove-btn">Remove Item</button>
                </div>`
   cartRow.innerHTML = cartRowContents             
   cartItems.append(cartRow)
   cartRow.getElementsByClassName(`item-remove-btn`)[0].addEventListener(`click` , removeCartItem)
   cartRow.getElementsByClassName(`cart-quantity-input`)[0].addEventListener(`change` , quantityChanged);
}



let addToCartKeyHolderButtons = document.getElementsByClassName(`cart-btn`)
for( let i = 0; i < addToCartButtons.length; i++){
  let button = addToCartButtons[i]
  button.addEventListener(`click` , function addToCartClicked(event){
    let button = event.target
    let shopItem = button.parentElement
    let title = document.getElementsByClassName(`keyHolder-heading`)[0].textContent
    let price = shopItem.getElementsByClassName(`price-tag`)[0].innerText
    let imageSrc = shopItem.getElementsByClassName(`img-bag-table`)[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
  })
}


let addToCartShowerBagButtons = document.getElementsByClassName(`cart-btn`)
for( let i = 0; i < addToCartButtons.length; i++){
  let button = addToCartButtons[i]
  button.addEventListener(`click` , function addToCartClicked(event){
    let button = event.target
    let shopItem = button.parentElement
    let title = document.getElementsByClassName(`showerbag-heading`)[0].textContent
    let price = shopItem.getElementsByClassName(`price-tag`)[0].innerText
    let imageSrc = shopItem.getElementsByClassName(`bag-img-for-js`)[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
  })
}


// function orderPlaced(){
//     document.getElementById(`display-msg`).style.display = `block`;
//     document.getElementById(`section-form`).style.opacity = 0;
// }
