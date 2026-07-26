console.log("Welcome to Ben's Gadget & Accessories!");
 

const searchInput = document.getElementById("search");
const productCards = document.querySelectorAll(".product-card");
const noResults = document.getElementById("no-results");


const shopBtn = document.getElementById("shop-btn");

if(shopBtn){

    shopBtn.addEventListener("click", function () {

        // Show all products again
        productCards.forEach(function(card){

            card.style.display = "";

        });

        // Clear the search box
        if(searchInput){

            searchInput.value = "";

        }

        // Hide "No results" message
        if(noResults){

            noResults.style.display = "none";

        }

        // Scroll to products
        document.getElementById("products").scrollIntoView({

            behavior: "smooth"

        });

    });

}

const homeLink = document.getElementById("home-link");

if(homeLink){

    homeLink.addEventListener("click", function(){

        // Show all products again
        productCards.forEach(function(card){

            card.style.display = "";

        });

        // Clear search box
        if(searchInput){

            searchInput.value = "";

        }

        // Hide no results message
        if(noResults){

            noResults.style.display = "none";

        }

    });

}

const cartCount = document.getElementById("cart-count");
const floatingCartCount = document.getElementById("floating-cart-count");

let count = 0;


const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let cartProducts = [];



if(searchInput){

    searchInput.addEventListener("keyup", function () {

        const searchValue = searchInput.value.toLowerCase();
        let visibleProducts = 0;

        productCards.forEach(function(card){

            const productText = card.textContent.toLowerCase();

            if(productText.includes(searchValue)){
                card.style.display = "";
                visibleProducts++;
            }else{
                card.style.display = "none";
            }

        });

        if(noResults){
            if(visibleProducts === 0){
                noResults.style.display = "block";
            }else{
                noResults.style.display = "none";
            }
        }

    });

}

// Product Category Filtering

const headphoneCategory =
    document.getElementById("headphone-category");

const powerbankCategory =
    document.getElementById("powerbank-category");

const chargerCategory =
    document.getElementById("charger-category");

const screenGuardsCategory =
    document.getElementById("screen-guards-category");


// Function to filter products

function filterProducts(category){

    productCards.forEach(function(card){

        const productName =
            card.querySelector("h3")
            .textContent
            .toLowerCase();

        if(category === "headphones"){

            if(
                productName.includes("headphone") ||
                productName.includes("earbud") ||
                productName.includes("airpod")
            ){

                card.style.display = "";

            }else{

                card.style.display = "none";

            }

        }


        else if(category === "powerbanks"){

            if(productName.includes("power bank")){

                card.style.display = "";

            }else{

                card.style.display = "none";

            }

        }


        else if(category === "chargers"){

            if(
                productName.includes("charger") ||
                productName.includes("cord") ||
                productName.includes("cable")
            ){

                card.style.display = "";

            }else{

                card.style.display = "none";

            }

        }


        else if(category === "screen guards"){

            if(productName.includes("screen guard")){

                card.style.display = "";

            }else{

                card.style.display = "none";

            }

        }

    });


    document.getElementById("products").scrollIntoView({

        behavior: "smooth"

    });

}


// Headphones

if(headphoneCategory){

    headphoneCategory.addEventListener("click", function(){

        filterProducts("headphones");

    });

}


// Power Banks

if(powerbankCategory){

    powerbankCategory.addEventListener("click", function(){

        filterProducts("powerbanks");

    });

}


// Chargers

if(chargerCategory){

    chargerCategory.addEventListener("click", function(){

        filterProducts("chargers");

    });

}


// Screen Guards

if(screenGuardsCategory){

    screenGuardsCategory.addEventListener("click", function(){

        filterProducts("screen guards");

    });

}

// Product Details Popup

const viewButtons = document.querySelectorAll(".view-product");

const modal = document.getElementById("product-modal");
const closeModal = document.querySelector(".close-modal");

const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalPrice = document.getElementById("modal-price");
const modalDescription = document.getElementById("modal-description");

const modalAddCart = document.getElementById("modal-add-cart");

let selectedProduct = null;


viewButtons.forEach(function(button){

    button.addEventListener("click", function(){

        const card = button.parentElement;

        const image = card.querySelector("img").src;
        const name = card.querySelector("h3").textContent;
        const priceText = card.querySelector("p").textContent;
        const description = card.querySelector("img").alt;

  
        const price = Number(
            priceText
            .replace("₦", "")
            .replace(/,/g, "")
        );

        selectedProduct = {
            name: name,
            price: price
        };

        if(modalImage){
            modalImage.src = image;
        }

        if(modalName){
            modalName.textContent = name;
        }

        if(modalPrice){
            modalPrice.textContent = priceText;
        }

        if(modalDescription){
            modalDescription.textContent = description;
        }

        if(modal){
            modal.style.display = "flex";
        }

    });

});

if(modalAddCart){

    modalAddCart.addEventListener("click", function(){

        if(!selectedProduct){
            return;
        }

        const existingProduct = cartProducts.find(function(product){

            return product.name === selectedProduct.name;

        });

        if(existingProduct){

            existingProduct.quantity++;

        }else{

            cartProducts.push({

                name: selectedProduct.name,

                price: selectedProduct.price,

                quantity: 1

            });

        }

        count++;

        if(cartCount){

            cartCount.textContent = count;

        }

        updateCart();

        modal.style.display = "none";

    });

}

// Close popup button

if(closeModal){

    closeModal.addEventListener("click", function(){

        if(modal){
            modal.style.display = "none";
        }

    });

}


// Close popup when clicking outside

window.addEventListener("click", function(event){

    if(event.target === modal){

        modal.style.display = "none";

    }

});

// Cart Modal

const cart = document.getElementById("cart");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.querySelector(".close-cart");

const floatingCart = document.getElementById("floating-cart");

// Open cart
if(cart){

    cart.addEventListener("click", function(event){

        event.preventDefault();

        if(cartModal){
            cartModal.style.display = "flex";
        }

    });

}
// Open cart from floating button
if(floatingCart){

    floatingCart.addEventListener("click", function(){

        if(cartModal){
            cartModal.style.display = "flex";
        }

    });

}

// Close cart
if(closeCart){

    closeCart.addEventListener("click", function(){

        if(cartModal){
            cartModal.style.display = "none";
        }

    });

}


// Close cart when clicking outside
window.addEventListener("click", function(event){

    if(event.target === cartModal){

        cartModal.style.display = "none";

    }

});

// Update cart

function updateCart(){

    if(!cartItems || !cartTotal){
        return;
    }

    cartItems.innerHTML = "";

    if(cartProducts.length === 0){

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

        cartTotal.textContent = "0";

        return;

    }

    let total = 0;

    cartProducts.forEach(function(product, index){

        const item = document.createElement("div");

        item.classList.add("cart-item");

        item.innerHTML = `

            <p>
                ${product.name}
            </p>

            <p>
                ₦${product.price.toLocaleString()}
            </p>

            <div class="quantity-controls">

                <button class="decrease-btn" data-index="${index}">
                    −
                </button>

                <span>
                    ${product.quantity}
                </span>

                <button class="increase-btn" data-index="${index}">
                    +
                </button>

            </div>

            <button class="remove-item" data-index="${index}">
                Remove
            </button>

        `;

        cartItems.appendChild(item);

        total += product.price * product.quantity;

    });

    cartTotal.textContent = total.toLocaleString();


    // Increase quantity

    const increaseButtons =
        document.querySelectorAll(".increase-btn");

    increaseButtons.forEach(function(button){

        button.addEventListener("click", function(){

            const index =
                button.getAttribute("data-index");

            cartProducts[index].quantity++;

            count++;

            if(cartCount){
    cartCount.textContent = count;
}

if(floatingCartCount){
    floatingCartCount.textContent = count;
}
            updateCart();

        });

    });


    // Decrease quantity

    const decreaseButtons =
        document.querySelectorAll(".decrease-btn");

    decreaseButtons.forEach(function(button){

        button.addEventListener("click", function(){

            const index =
                button.getAttribute("data-index");

            if(cartProducts[index].quantity > 1){

                cartProducts[index].quantity--;

                count--;

                if(cartCount){
    cartCount.textContent = count;
}

if(floatingCartCount){
    floatingCartCount.textContent = count;
}

                updateCart();

            }

        });

    });


    // Remove product completely

    const removeButtons =
        document.querySelectorAll(".remove-item");

    removeButtons.forEach(function(button){

        button.addEventListener("click", function(){

            const index =
                button.getAttribute("data-index");

            count -= cartProducts[index].quantity;

            cartProducts.splice(index, 1);

           if(cartCount){
    cartCount.textContent = count;
}

if(floatingCartCount){
    floatingCartCount.textContent = count;
}

            updateCart();

        });

    });

}

// Checkout

const checkoutButton = document.querySelector(".checkout-btn");

if(checkoutButton){

    checkoutButton.addEventListener("click", function(){

        if(cartProducts.length === 0){

            alert("Your cart is empty!");

            return;

        }

        let orderMessage =
            "Hello, I want to order:%0A%0A";

        cartProducts.forEach(function(product){

            orderMessage +=
                product.name +
                " x" +
                product.quantity +
                " - ₦" +
                (
                    product.price *
                    product.quantity
                ).toLocaleString() +
                "%0A";

        });

        orderMessage +=
            "%0ATotal: ₦" +
            cartTotal.textContent;

        const whatsappNumber =
            "2348077632057";

        const whatsappLink =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            orderMessage;

        window.open(
            whatsappLink,
            "_blank"
        );

    });

}


// Clear Cart

const clearCartButton =
    document.getElementById("clear-cart-btn");

if(clearCartButton){

    clearCartButton.addEventListener("click", function(){

        if(cartProducts.length === 0){

            alert("Your cart is already empty!");

            return;

        }

        cartProducts = [];

        count = 0;
if(cartCount){
    cartCount.textContent = count;
}

if(floatingCartCount){
    floatingCartCount.textContent = count;
}
        updateCart();

    });

}