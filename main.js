// Cart open and close

let cartIcon = document.querySelector(".cart-img");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
let barMenu = document.querySelector("bar-menu");

//open cart
cartIcon.onclick =  () => {
     cart.classList.add("active");     
 } 
 
 //close cart
 closeCart.onclick = () => {
    cart.classList.remove("active");
 }

 
// Cart working JS
if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

//Create ready function
function ready() {
    //Remove from cart
    const removeCartBtn = document.getElementsByClassName("cart-remove");
    for(var i = 0; i< removeCartBtn.length; i++) {
        const button = removeCartBtn[i];
        button.addEventListener("click", removeCartItem)
    }
    //Change Quantity of cart items
    const quantityInputs =  document.getElementsByClassName("cart-quantity");
    for(var i = 0; i< quantityInputs.length; i++) {
        const input = quantityInputs[i];
        input.addEventListener("change", changeQuantity)
    }
    // Add to cart
    const addCart =  document.getElementsByClassName("add-cart");
    for(var i = 0; i< addCart.length; i++) {
        const button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    loadCartItems();
}    

//Add Cart function
function addCartClicked (event) {
    var button = event.target;    
    var shopProducts = button.parentElement.parentElement;
    var title = shopProducts.getElementsByClassName("product-description")[0].innerText;
    var price = shopProducts.getElementsByClassName("product-price")[0].innerText;    
    var productImg = shopProducts.getElementsByClassName("center")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal(); 
    saveCartItems();
    updateCartIcon();   
}

function addProductToCart (title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemNames = cartItems.getElementsByClassName("product-description");
    for(var i = 0; i< cartItemNames.length; i++) {
       if(cartItemNames[i].innerText == title) {
        alert("You have already added this item to cart");
        return;
       }
    } 
    var cartBoxContent =`
    <img src=${productImg} alt="" class="cart-pics" />
    <div class="product-detail-box">
        <div class="product-description">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" name="" id="" value="1" class="cart-quantity"/>
    </div>
    <!-- Remove an Item -->
    <i class='bx bx-trash-alt cart-remove' ></i>`
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", changeQuantity);
    saveCartItems();
    updateCartIcon();
}


//Remove cart Item function
function removeCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
    saveCartItems();
}

//ChangeQuantity function
function changeQuantity(event) {
    const input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value =1;
    }
    updatetotal();
    saveCartItems();
    updateCartIcon();
}

//update cart total
function updatetotal () {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total =0;
    for(var i =0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement  = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total += price * quantity;
    }
    //if the price contains change/cents
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    // total to localstorage
    localStorage.setItem("cartTotal", total);
}

// keeping items in cart after page refreshes using localstorage
function saveCartItems () {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var cartItems = [];

    for(var i = 0; i  < cartBoxes.length; i++) {
        cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName("product-description")[0];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var productImg = cartBox.getElementsByClassName("cart-pics")[0].src;

        var item = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg,
        };
        cartItems.push(item);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
// Load cart
function loadCartItems() {
    var cartItems = localStorage.getItem("cartItems");
    if(cartItems) {
        cartItems = JSON.parse(cartItems);

        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            addProductToCart(item.title, item.price, item.productImg);

            var cartBoxes = document.getElementsByClassName("cart-box");
            var cartBox = cartBoxes[cartBoxes.length - 1];
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
            quantityElement.value = item.quantity;
        }
    }
    var cartTotal = localStorage.getItem("cartTotal");
    if(cartTotal) {
        document.getElementsByClassName("total-price")[0].innerText = "$" + cartTotal;
    }
    updateCartIcon();
}

// show quantity in cart icon
function updateCartIcon () {
    var cartBoxes = document.getElementsByClassName("cart-box");
    var quantity = 0;

    for(var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        quantity+= parseInt(quantityElement.value);
    }
    var cartIcon = document.querySelector("#scart");
    cartIcon.setAttribute("data-quantity", quantity);
}

// bar menu function
function barList () {
    /* When the user clicks on the button, 
       toggle between hiding and showing the dropdown content */
     document.getElementById("barsDropdown").classList.toggle("show");
       
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.bar-menu')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
    
  document.getElementById("fullyear").innerHTML = new Date().getFullYear(); 
  
