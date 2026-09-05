/* =====================================================
   VELORA WATCHES - FUNCTION.JS
===================================================== */


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", function () {

        navLinks.classList.toggle("active");

    });


    // Close menu after clicking any navigation link

    const navItems = navLinks.querySelectorAll("a");

    navItems.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

        });

    });

}


/* =====================================================
   PRODUCT FILTER
===================================================== */

const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product-card");


filters.forEach(function (filter) {

    filter.addEventListener("click", function () {

        // Remove active class

        filters.forEach(function (button) {

            button.classList.remove("active");

        });


        // Add active class to clicked filter

        filter.classList.add("active");


        // Get selected category

        const selected = filter.dataset.filter;


        // Show / Hide products

        products.forEach(function (product) {

            const categories =
                product.dataset.category.split(" ");


            if (
                selected === "all" ||
                categories.includes(selected)
            ) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

    });

});


/* =====================================================
   HEART / WISHLIST
===================================================== */

const heartButtons =
    document.querySelectorAll(".heart");


heartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        if (button.textContent.trim() === "♡") {

            button.textContent = "♥";

        } else {

            button.textContent = "♡";

        }

    });

});


/* =====================================================
   SHOPPING CART
===================================================== */

let cart = [];


const cartButton =
    document.getElementById("cartButton");

const cartPanel =
    document.getElementById("cart");

const closeCart =
    document.getElementById("closeCart");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");


/* =====================================================
   OPEN CART
===================================================== */

if (cartButton && cartPanel && cartOverlay) {

    cartButton.addEventListener("click", function () {

        cartPanel.classList.add("active");

        cartOverlay.classList.add("active");

    });

}


/* =====================================================
   CLOSE CART
===================================================== */

if (closeCart && cartPanel && cartOverlay) {

    closeCart.addEventListener("click", function () {

        cartPanel.classList.remove("active");

        cartOverlay.classList.remove("active");

    });

}


/* =====================================================
   CLOSE CART BY OVERLAY
===================================================== */

if (cartOverlay && cartPanel) {

    cartOverlay.addEventListener("click", function () {

        cartPanel.classList.remove("active");

        cartOverlay.classList.remove("active");

    });

}


/* =====================================================
   ADD TO CART
===================================================== */

const addCartButtons =
    document.querySelectorAll(".add-cart");


addCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const card =
            button.closest(".product-card");


        if (!card) {
            return;
        }


        // Product name

        const nameElement =
            card.querySelector("h3");


        // Product price

        const priceElement =
            card.querySelector(".product-info p");


        // Product image

        const imageElement =
            card.querySelector(".product-image img");


        if (
            !nameElement ||
            !priceElement ||
            !imageElement
        ) {

            return;

        }


        const name =
            nameElement.textContent.trim();


        const priceText =
            priceElement.textContent.trim();


        const price =
            Number(
                priceText.replace(/[^\d]/g, "")
            );


        const image =
            imageElement.src;


        /* -----------------------------------------
           CHECK IF PRODUCT ALREADY EXISTS
        ----------------------------------------- */

        const existingProduct =
            cart.find(function (item) {

                return item.name === name;

            });


        if (existingProduct) {

            // Increase quantity

            existingProduct.quantity++;

        } else {

            // Add new product

            cart.push({

                name: name,

                price: price,

                image: image,

                quantity: 1

            });

        }


        /* Update cart */

        updateCart();


        /* Open cart */

        if (cartPanel && cartOverlay) {

            cartPanel.classList.add("active");

            cartOverlay.classList.add("active");

        }

    });

});


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    if (
        !cartItems ||
        !cartCount ||
        !cartTotal
    ) {

        return;

    }


    // Clear old cart

    cartItems.innerHTML = "";


    let totalItems = 0;

    let totalPrice = 0;


    /* -----------------------------------------
       EMPTY CART
    ----------------------------------------- */

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div>🛍</div>

                <p>Your cart is empty</p>

            </div>

        `;


        cartCount.textContent = "0";

        cartTotal.textContent = "Rs. 0";


        return;

    }


    /* -----------------------------------------
       DISPLAY CART PRODUCTS
    ----------------------------------------- */

    cart.forEach(function (item, index) {


        // Calculate total items

        totalItems += item.quantity;


        // Calculate total price

        totalPrice +=
            item.price * item.quantity;


        /* Create cart item */

        const itemElement =
            document.createElement("div");


        itemElement.className =
            "cart-item";


        itemElement.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>


                <div class="cart-price">

                    Rs. ${item.price.toLocaleString()}

                </div>


                <div class="quantity">

                    <button
                        type="button"
                        onclick="decrease(${index})"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        type="button"
                        onclick="increase(${index})"
                    >
                        +
                    </button>

                </div>


                <button
                    type="button"
                    class="remove"
                    onclick="removeItem(${index})"
                >
                    REMOVE
                </button>

            </div>

        `;


        cartItems.appendChild(itemElement);

    });


    /* -----------------------------------------
       UPDATE CART COUNT
    ----------------------------------------- */

    cartCount.textContent =
        totalItems;


    /* -----------------------------------------
       UPDATE CART TOTAL
    ----------------------------------------- */

    cartTotal.textContent =
        "Rs. " + totalPrice.toLocaleString();

}


/* =====================================================
   INCREASE QUANTITY
===================================================== */

function increase(index) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity++;


    updateCart();

}


/* =====================================================
   DECREASE QUANTITY
===================================================== */

function decrease(index) {

    if (!cart[index]) {
        return;
    }


    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    updateCart();

}


/* =====================================================
   REMOVE ITEM
===================================================== */

function removeItem(index) {

    if (!cart[index]) {
        return;
    }


    cart.splice(index, 1);


    updateCart();

}


/* =====================================================
   CHECKOUT
===================================================== */

const checkoutButton =
    document.getElementById("checkout");


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function () {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

            } else {

                alert(
                    "Thank you for shopping with Velora Watches!"
                );

            }

        }
    );

}
//    END OF FUNCTION.JS