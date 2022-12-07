//New Pages for each category//

let http = new XMLHttpRequest();

http.open(`get`, `products.json`, true);

http.send();


http.onload = function(){
    if(this.readyState == 4 && this.status == 200){
        
        let {products} = JSON.parse(this.responseText);
        let output = ``;
        console.log(products);
      

        for(let item of products){
            output += `<div class="showcase">
            
            <div class="showcase-banner">
              <img src="${item.images}" alt="${item.images}" class="product-img">
              
          
              <div class="showcase-actions">
                <button class="btn-action">
                  <ion-icon name="heart-outline"></ion-icon>
                </button>
              </div>
            </div>
          
            <div class="showcase-content">
              
          
              
                <h3 class="showcase-title">${item.title}</h3>
              
          
              <div class="showcase-rating">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
              </div>
          
              <div class="price-box">
                <p class="price">${item.price}</p>
                <del>$56.00</del>
                <button class="cart-btn">Add to Cart</button>
              </div>
          
            </div>
          
          </div>`
        }
        document.getElementById(`products-display`).innerHTML = output;
    }
}