var countDownDate = new Date('Jan 9, 2023 00:00:00').getTime();

var x = setInterval(function () {
  var now = new Date().getTime();

  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').innerHTML = days;
  document.getElementById('hours').innerHTML = hours;
  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML = seconds;

  document.getElementById('days-').innerHTML = days;
  document.getElementById('hours-').innerHTML = hours;
  document.getElementById('minutes-').innerHTML = minutes;
  document.getElementById('seconds-').innerHTML = seconds;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById('countdown-expired').innerHTML = 'EXPIRED';
    document.getElementById('countdown-expired-').innerHTML = 'EXPIRED';
  }
}, 1000);

//Item counter//
//heart//
let i = document.getElementById('item-counter').innerText;
function addtocart() {
  i++;
  document.getElementById('item-counter').innerText = i;
}

let b = document.getElementById('item-counter').innerText;
function removeFromCart() {
  b--;
  document.getElementById('item-counter').innerText = i + b;
}

// bag
let counter = document.getElementById('product-counter').innerText;
function addToBag() {
  counter++;
  document.getElementById('product-counter').innerText = counter;
}

let subtractBag = document.getElementById('product-counter').innerText;
function removeFromBag() {
  counter--;
  document.getElementById('product-counter').innerText = counter;
}
function clearBag() {
  document.getElementById('product-counter').textContent = 0;
  counter = 0;
}

// for Mobile//

// let bagMobile = document.getElementById("product-counter-mobile").innerText;
// function addToBag() {
//   bagMobile++;
//   document.getElementById("product-counter-mobile").innerText = bagMobile;
// }

// let subtractBagMobile = document.getElementById("product-counter-mobile").innerText;
// function removeFromBag() {
//   subtractBagMobile--;
//   document.getElementById("product-counter-mobile").innerText = bagMobile + subtractBagMobile;
// }

// Product Display

function closeProduct() {
  document.getElementById(`product-section`).style.display = `none`;
  document.getElementById(`main-body`).style.opacity = `100%`;
}

let addToCartButtons = document.getElementsByClassName(`showcase-title`);
for (let i = 0; i < addToCartButtons.length; i++) {
  let button = addToCartButtons[i];
  button.addEventListener(`click`, function addToCartClicked(event) {
    document.getElementById(`product-section`).style.display = `block`;
    document.getElementById(`main-body`).style.opacity = `10%`;
    button = event.target;
    // let shopItem = button.parentElement;
    let title =
      document.getElementsByClassName(`showcase-title`)[i].textContent;
    let price = document.getElementsByClassName(`price`)[i].innerText;
    let imageSrc = document.getElementsByClassName(`display-image`)[i].src;
    let productDescription =
      document.getElementsByClassName(`product-description`)[i].textContent;
    addItemToCart(title, price, imageSrc, productDescription);
  });
}

function addItemToCart(title, price, imageSrc, productDescription) {
  let cartRow = document.getElementById(`product-box`);
  // cartRow.classList.add(`product-main-box`)
  let cartItems = document.getElementsByClassName(`product-detail`)[0];
  let cartRowContents = `
                    <div class="product-image">
                      <img src="${imageSrc}" id="productImage" alt="" style="max-width:80%;">
                    </div>
                    <div class="product-details">
                      <h1 id="product-title">${title}</h1>
                      <p id="product-description">${productDescription}</p>
                      <label for"product-size">Size:</label>
                      <select name="size" id="product-size">
                        <option value="2">XL</option>
                        <option value="3">L</option>
                        <option value="4">M</option>
                        <option value="5">S</option>
                        <option value="6">XS</option>
                      </select>
                      <h4 class="price-tag" id="product-price">${price}</h4>
                      <button class="product-btn product-btn-java" id="button-product">Add to Cart</button>
                      <button onclick="openCart()" class="openCart-btn">
                        Open Cart
                      </button>
                    </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);

  var productforAddToCartButtons =
    document.getElementsByClassName('product-btn-java');
  for (var i = 0; i < productforAddToCartButtons.length; i++) {
    var button = productforAddToCartButtons[i];
    button.addEventListener('click', function () {
      var cartTitle = title;
      var cartPrice = price;
      var cartImageSrc = imageSrc;
      forAddItemToCart(cartTitle, cartPrice, cartImageSrc);
      updateCartTotal();
    });
  }
}

// ******Cart JavaScript****** //

function openCart() {
  document.getElementById(`my-cart`).style.display = `block`;
  document.getElementById(`main-body`).style.opacity = `10%`;
}

function closeCart() {
  document.getElementById(`my-cart`).style.display = `none`;
  document.getElementById(`main-body`).style.opacity = `100%`;
}

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName('btn-danger');
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName('cart-quantity-input');
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }

  var forAddToCartButtons = document.getElementsByClassName('for-java');
  for (var i = 0; i < forAddToCartButtons.length; i++) {
    var button = forAddToCartButtons[i];
    button.addEventListener('click', forAddToCartClicked);
  }

  document
    .getElementsByClassName('btn-purchase')[0]
    .addEventListener('click', purchaseClicked);
}

function purchaseClicked() {
  alert('Thank you for your purchase');
  var cartItems = document.getElementsByClassName('cart-items')[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  clearBag();
  updateCartTotal();
  closeCart();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
  removeFromBag();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function forAddToCartClicked(event) {
  var cartButton = event.target;
  var cartShopItem = cartButton.parentElement.parentElement.parentElement;
  var cartTitle =
    cartShopItem.getElementsByClassName('showcase-title')[i].innerText;
  var cartPrice = cartShopItem.getElementsByClassName('price')[i].innerText;
  var cartImageSrc =
    cartShopItem.getElementsByClassName('display-image')[i].src;
  forAddItemToCart(cartTitle, cartPrice, cartImageSrc);
  console.log(cartTitle, cartPrice, cartImageSrc);
  updateCartTotal();
}

function forAddItemToCart(cartTitle, cartPrice, cartImageSrc) {
  var forCartRow = document.createElement('div');
  forCartRow.classList.add('cart-row');
  var forCartItems = document.getElementsByClassName('cart-items')[0];
  var forCartItemNames = forCartItems.getElementsByClassName('cart-item-title');
  addToBag();
  closeProduct();
  for (var i = 0; i < forCartItemNames.length; i++) {
    if (forCartItemNames[i].innerText == cartTitle) {
      alert('This item is already added to the cart');
      removeFromBag();
      return;
    }
  }
  var forCartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${cartImageSrc}" width="100" height="100">
          <span class="cart-item-title">${cartTitle}</span>
      </div>
      <span class="cart-price cart-column">${cartPrice}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`;
  forCartRow.innerHTML = forCartRowContents;
  forCartItems.append(forCartRow);
  forCartRow
    .getElementsByClassName('btn-danger')[0]
    .addEventListener('click', removeCartItem);
  forCartRow
    .getElementsByClassName('cart-quantity-input')[0]
    .addEventListener('change', quantityChanged);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0];
  var cartRows = cartItemContainer.getElementsByClassName('cart-row');
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName('cart-price')[0];
    var quantityElement = cartRow.getElementsByClassName(
      'cart-quantity-input'
    )[0];
    var price = parseFloat(priceElement.innerText.replace('$', ''));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('cart-total-price')[0].innerText =
    '$' + total;

  if (total === 0) {
    document.getElementById(`purchase-btn`).style.display = `none`;
  } else {
    document.getElementById(`purchase-btn`).style.display = `block`;
  }
}

// Favourite Products//

function displayFav() {
  document.getElementById(`fav-box`).style.display = `block`;
}

function closeFav() {
  document.getElementById(`fav-box`).style.display = `none`;
}

function addItemToFavourite(title, price, imageSrc) {
  var forFavRow = document.createElement('div');
  forFavRow.classList.add('favourite-container');
  let favRow = document.getElementById(`fav-box`);
  // let favItems = document.getElementsByClassName(`fav-main`)[0];
  let favRowContents = `
            <div class="image-title-box">
                <img class="favourite-image" src="${imageSrc}" alt="">
                <h6 class="fav-title">${title}</h6>
                <p class="fav-price">${price}</p>
                <p class="fav-remove-btn" id="remove-fav-item">Remove</p>
              </div>`;
  favRow.innerHTML = favRowContents;
  favItems.append(favRow);
}

let addToFavouriteButtons = document.getElementsByClassName(`fav-java`);
for (let i = 0; i < addToFavouriteButtons.length; i++) {
  let button = addToFavouriteButtons[i];
  button.addEventListener(`click`, function addToFavouriteClicked(event) {
    let favShopItem =
      button.parentElement.parentElement.parentElement.parentElement;
    button = event.target;
    let title =
      favShopItem.getElementsByClassName(`showcase-title`)[0].innerText;
    let price = favShopItem.getElementsByClassName(`price`)[0].innerText;
    let imageSrc = favShopItem.getElementsByClassName(`display-image`)[0].src;
    addItemToFavourite(title, price, imageSrc);
  });
}

//SHuffle Function//

// function shuffle() {
//   var container = document.getElementsByClassName("for-shuffle");
//   for(let i = 0; i < container.length; i++){

//     var elementsArray = Array.prototype.slice.call(container[i].getElementsByClassName('showcase'));
//       elementsArray.forEach(function(element){
//       container[i].removeChild(element);
          
//     })
//     shuffleArray(elementsArray);
//     elementsArray.forEach(function(element){
//     container[i].appendChild(element);
//   })
//   let addToCartButtons = document.getElementsByClassName(`showcase-title`);
//   for (let i = 0; i < addToCartButtons.length; i++) {
//     let button = addToCartButtons[i];
//     button.addEventListener(`click`, function addToCartClicked(event) {
//       document.getElementById(`product-section`).style.display = `block`;
//       document.getElementById(`main-body`).style.opacity = `10%`;
//       button = event.target;
//       // let shopItem = button.parentElement;
//       let title =
//         document.getElementsByClassName(`showcase-title`)[i].textContent;
//       let price = document.getElementsByClassName(`price`)[i].innerText;
//       let imageSrc = document.getElementsByClassName(`display-image`)[i].src;
//       let productDescription =
//         document.getElementsByClassName(`product-description`)[i].textContent;
//       addItemToCart(title, price, imageSrc, productDescription);
//     });
//   }
  
//   function addItemToCart(title, price, imageSrc, productDescription) {
//     let cartRow = document.getElementById(`product-box`);
//     // cartRow.classList.add(`product-main-box`)
//     let cartItems = document.getElementsByClassName(`product-detail`)[0];
//     let cartRowContents = `
//                       <div class="product-image">
//                         <img src="${imageSrc}" id="productImage" alt="" style="max-width:80%;">
//                       </div>
//                       <div class="product-details">
//                         <h1 id="product-title">${title}</h1>
//                         <p id="product-description">${productDescription}</p>
//                         <label for"product-size">Size:</label>
//                         <select name="size" id="product-size">
//                           <option value="2">XL</option>
//                           <option value="3">L</option>
//                           <option value="4">M</option>
//                           <option value="5">S</option>
//                           <option value="6">XS</option>
//                         </select>
//                         <h4 class="price-tag" id="product-price">${price}</h4>
//                         <button class="product-btn product-btn-java" id="button-product">Add to Cart</button>
//                         <button onclick="openCart()" class="openCart-btn">
//                           Open Cart
//                         </button>
//                       </div>`;
//     cartRow.innerHTML = cartRowContents;
//     cartItems.append(cartRow);
  
//     var productforAddToCartButtons =
//       document.getElementsByClassName('product-btn-java');
//     for (let i = 0; i < productforAddToCartButtons.length; i++) {
//       var button = productforAddToCartButtons[i];
//       button.addEventListener('click', function () {
//         var cartTitle = title;
//         var cartPrice = price;
//         var cartImageSrc = imageSrc;
//         forAddItemToCart(cartTitle, cartPrice, cartImageSrc);
//         updateCartTotal();
//       });
//     }
//   }}
//   }

// function shuffleArray(array) {
//     for (var i = array.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//     }
//     return array;
// }


