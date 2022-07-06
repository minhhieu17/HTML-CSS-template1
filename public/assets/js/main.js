
const products = [
  {
    id: 1,
    name: "Nilon RS-X Bold",
    price: 128.00,
    imgSrc: "/public/assets/img/product1.png",
    discount: "$150.00",
    number: 1,
  },
  {
    id: 2,
    name: "Nilon Van Cleef",
    price: 138,
    imgSrc: "/public/assets/img/product2.png",
    discount: "$150.00",
    number: 1,
  },
  {
    id: 3,
    name: "Apex Sneakers",
    price: 148,
    imgSrc: "/public/assets/img/product3.png",
    discount: "",
    number: 1,
  },
  {
    id: 4,
    name: "La Marous",
    price: 158,
    imgSrc: "/public/assets/img/product4.png",
    discount: "$180.00",
    number: 1,
  }
];

let cart = [];

const productsEl = document.getElementById('product-list')
const cartItemsEl = document.getElementById('cart-list')
const totalPriceEl = document.getElementById('total-price')
const totalItemEl = document.getElementById('qty-items')


//  Open Cart
function toggleCartPopup() {
  document.querySelector(".cart-popup").classList.toggle("open");
}

function main() {
  document.querySelector(".buy-btn").onclick = function () {
    toggleCartPopup()
  };

  document.querySelector(".close-cart-popup").onclick = function () {
    toggleCartPopup()
  };

  displayProducts();
}

function displayProducts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
      <div class="product-card">  
      <div class="product-img">
          <img src="${product.imgSrc}" alt="Image">
          <span>
              <i class="fa-solid fa-star"></i>
              4.00
          </span>
          <ul>
              <li>
                  <a href="#">
                    <i class="fa-regular fa-eye"></i>
                  </a>
              </li>
              <li>
                  <a class="add-cart" onclick = "addToCart(${product.id})">
                    <i class="fa-solid fa-cart-shopping"></i>
                  </a>
              </li>
              <li>
                  <a href="#">
                    <i class="fa-regular fa-heart"></i>
                  </a>
              </li>
          </ul>
      </div>
      <div class="product-info">
          <h3>${product.name}</h3>
          <p>
            $${product.price}.00
              <span>${product.discount}</span>
          </p>
      </div>
  </div>
      `
  })
}

// Add To Cart
function addToCart(id) {
  if (cart.some((item) => item.id === id)) {
    alert("Product already in Cart!");
  } else {
    const item = products.find((product) => product.id === id)
    cart.push(item);
    displayCartItems()
    toggleCartPopup()
  }
};

function displayCartItems() {
  cartItemsEl.innerHTML = '';
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
      <div class="cart-item"> 
        <div class="cart-item-action">
          <button class="delete-item" onclick = removeItem(${item.id}) >
            <i class="fa-solid fa-circle-xmark"></i>
          </button>
        </div>
        <div class="cart-item-img">
          <img src="${item.imgSrc}" alt="">
        </div>
        <div class="cart-item-info">
          <h5>${item.name}</h5>
          <p>$${item.price}.00</p>
        </div>
        <div class="cart-qty">
          <button class="minus-btn" onclick="changeNumber('minus',${item.id})">
          <i class="fa-solid fa-minus"></i>
          </button>
          <input class="cart-quantity-input" type="text" value="${item.number}">
          <button class="plus-btn" onclick="changeNumber('plus',${item.id})">
          <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
     `
  })

  displayTotalPrice();
};

// Change Quantity 
function changeNumber(action, id) {
  cart = cart.map((item) => {
    let number = item.number;
    if (item.id === id) {
      if (action === "minus" && number > 1) {
        number--;
      }
      else if (action === "plus") {
        number++;
      }
    }
    
    return {
      ...item,
      number,
    };
  })
  displayCartItems();
}

// Remove Items in Cart
const removeItem = id => {
  cart = cart.filter((item) => item.id !== id)
  displayCartItems();
}

// Total Price
function displayTotalPrice() {
  let totalPrice = 0,
      totalItem = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.number;
    totalItem += item.number;
  });
  totalPriceEl.innerHTML = `$${totalPrice}`;
  totalItemEl.innerHTML = `${totalItem}`;
}

main();









