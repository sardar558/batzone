/* =========================
   PRODUCTS
========================= */

const products = [

  {
    id: 1,
    name: "Thunder Pro English Willow",
    category: "English Willow",
    price: 24999,
    rating: "★★★★★",
    image: "A.3jpg"
  },

  {
    id: 2,
    name: "Power Drive Kashmir Willow",
    category: "Kashmir Willow",
    price: 8999,
    rating: "★★★★★",
    image: "A.4jpg"
  },

  {
    id: 3,
    name: "Elite Player Bat",
    category: "English Willow",
    price: 32999,
    rating: "★★★★★",
    image: "A.5jpg"
  },

  {
    id: 4,
    name: "Champion Kashmir Bat",
    category: "Kashmir Willow",
    price: 6999,
    rating: "★★★★☆",
    image: "A.6jpg"
  },

  

];


let cart = [];


/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts(list = products) {

  const grid = document.getElementById("productGrid");

  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `
      <p style="grid-column:1/-1;text-align:center;padding:50px;">
        No bats found.
      </p>
    `;
    return;
  }

  list.forEach(product => {

    grid.innerHTML += `

      <div class="product-card">

        <div class="product-image">

          <img
            src="${product.image}"
            alt="${product.name}"
          >

        </div>

        <div class="product-info">

          <h3>${product.name}</h3>

          <div class="category">
            ${product.category}
          </div>

          <div class="rating">
            ${product.rating}
          </div>

          <div class="price">
            Rs. ${product.price.toLocaleString()}
          </div>

          <button
            class="add-btn"
            onclick="addToCart(${product.id})"
          >
            Add To Cart
          </button>

        </div>

      </div>

    `;
  });
}


/* =========================
   CART
========================= */

function addToCart(id) {

  const product = products.find(p => p.id === id);

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  updateCart();

  openCart();
}


function removeFromCart(id) {

  cart = cart.filter(item => item.id !== id);

  updateCart();
}


function changeQuantity(id, amount) {

  const item = cart.find(item => item.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(id);
  }

  updateCart();
}


function updateCart() {

  const cartItems = document.getElementById("cartItems");

  const cartCount = document.getElementById("cartCount");

  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {

    total += item.price * item.quantity;

    count += item.quantity;

    cartItems.innerHTML += `

      <div class="cart-item">

        <img src="${item.image}" alt="${item.name}">

        <div class="cart-item-info">

          <strong>${item.name}</strong>

          <p>
            Rs. ${item.price.toLocaleString()}
          </p>

          <div style="margin-top:8px;">

            <button
              onclick="changeQuantity(${item.id}, -1)"
              style="padding:4px 8px;"
            >
              −
            </button>

            <span style="padding:0 10px;">
              ${item.quantity}
            </span>

            <button
              onclick="changeQuantity(${item.id}, 1)"
              style="padding:4px 8px;"
            >
              +
            </button>

          </div>

          <button
            class="remove-btn"
            onclick="removeFromCart(${item.id})"
          >
            Remove
          </button>

        </div>

      </div>

    `;
  });

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div style="text-align:center;padding:70px 10px;color:#8d958f;">
        <div style="font-size:50px;">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add a cricket bat to continue.</p>
      </div>
    `;

  }

  cartCount.innerText = count;

  cartTotal.innerText =
    "Rs. " + total.toLocaleString();
}


/* =========================
   OPEN / CLOSE CART
========================= */

function openCart() {

  document
    .getElementById("cartPanel")
    .classList.add("active");

  document
    .getElementById("overlay")
    .classList.add("active");
}


function closeCart() {

  document
    .getElementById("cartPanel")
    .classList.remove("active");

  document
    .getElementById("overlay")
    .classList.remove("active");
}


/* =========================
   SEARCH
========================= */

function searchProducts() {

  const search =
    document
      .getElementById("search")
      .value
      .toLowerCase();

  const category =
    document
      .getElementById("category")
      .value;

  const filtered = products.filter(product => {

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(search);

    const matchesCategory =
      category === "all" ||
      product.category === category;

    return matchesSearch && matchesCategory;

  });

  displayProducts(filtered);
}


function filterProducts() {
  searchProducts();
}


/* =========================
   CHECKOUT
========================= */

function openCheckout() {

  if (cart.length === 0) {

    alert("Your cart is empty!");

    return;
  }

  closeCart();

  document
    .getElementById("checkoutModal")
    .classList.add("active");
}


function closeCheckout() {

  document
    .getElementById("checkoutModal")
    .classList.remove("active");
}


/* =========================
   PLACE ORDER
========================= */

function placeOrder(event) {

  event.preventDefault();

  const name =
    document.getElementById("customerName").value;

  const phone =
    document.getElementById("customerPhone").value;

  const city =
    document.getElementById("customerCity").value;

  const address =
    document.getElementById("customerAddress").value;

  const payment =
    document.getElementById("paymentMethod").value;


  let message =
    "🏏 *NEW BATZONE ORDER*%0A%0A";

  message +=
    "*Customer:* " + name + "%0A";

  message +=
    "*Phone:* " + phone + "%0A";

  message +=
    "*City:* " + city + "%0A";

  message +=
    "*Address:* " + address + "%0A";

  message +=
    "*Payment:* " + payment + "%0A%0A";

  message +=
    "*ORDER ITEMS:*%0A";


  let total = 0;

  cart.forEach(item => {

    const itemTotal =
      item.price * item.quantity;

    total += itemTotal;

    message +=
      "🏏 " +
      item.name +
      " × " +
      item.quantity +
      " = Rs. " +
      itemTotal.toLocaleString() +
      "%0A";

  });


  message +=
    "%0A💰 *TOTAL: Rs. " +
    total.toLocaleString() +
    "*";


  /*
    CHANGE THIS NUMBER
    TO YOUR OWN WHATSAPP NUMBER.

    Pakistan example:
    923001234567

    Don't use + or spaces.
  */

  const whatsappNumber =
    "923001234567";


  const whatsappURL =
    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    message;


  window.open(
    whatsappURL,
    "_blank"
  );


  cart = [];

  updateCart();

  closeCheckout();

  event.target.reset();

}


/* =========================
   START WEBSITE
========================= */

displayProducts();

updateCart();