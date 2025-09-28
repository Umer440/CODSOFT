// Array of food products
const products = [
  { name: "Cheese Pizza", category: "pizza", image: "https://b.zmtcdn.com/data/pictures/6.jpg", price: 250, desc: "Cheesy pizza with toppings.", time: "30-40 min" },
  { name: "Veg Burger", category: "burger", image: "https://b.zmtcdn.com/data/pictures/4.jpg", price: 120, desc: "Fresh and juicy veg burger.", time: "20-30 min" },
  { name: "Cold Drink", category: "cold-drink", image: "https://b.zmtcdn.com/data/pictures/12.jpg", price: 50, desc: "Refreshing cold drink.", time: "5-10 min" },
  { name: "Grilled Chicken", category: "chicken", image: "https://b.zmtcdn.com/data/pictures/13.jpg", price: 200, desc: "Tender grilled chicken.", time: "25-35 min" },
  { name: "Mutton Curry", category: "mutton", image: "https://b.zmtcdn.com/data/pictures/14.jpg", price: 300, desc: "Spicy mutton curry.", time: "35-45 min" },
  { name: "Egg Roll", category: "rolls", image: "https://b.zmtcdn.com/data/pictures/15.jpg", price: 80, desc: "Tasty egg roll with spices.", time: "15-20 min" },
  { name: "Veg Sandwich", category: "sandwich", image: "https://b.zmtcdn.com/data/pictures/16.jpg", price: 90, desc: "Healthy veg sandwich.", time: "10-15 min" },
  { name: "Peri Peri Fries", category: "fries", image: "https://b.zmtcdn.com/data/pictures/17.jpg", price: 70, desc: "Spicy peri peri fries.", time: "10-15 min" }
];

const container = document.getElementById('product-list');
const cartCount = document.getElementById('cart-count');
const searchBar = document.getElementById('search');
const filterSelect = document.getElementById('filter');

let cart = [];

// Function to display products
function displayProducts(items) {
  container.innerHTML = "";
  items.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="card-content">
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <strong>₹${product.price}</strong>
        <p>Delivery: ${product.time}</p>
        <div class="quantity-control">
          <button class="minus">-</button>
          <span class="qty">1</span>
          <button class="plus">+</button>
        </div>
        <button class="add-btn">Add to Cart</button>
      </div>
    `;
    container.appendChild(card);

    let qty = 1;
    const minusBtn = card.querySelector('.minus');
    const plusBtn = card.querySelector('.plus');
    const qtySpan = card.querySelector('.qty');
    const addBtn = card.querySelector('.add-btn');

    minusBtn.addEventListener('click', () => { if(qty>1) qtySpan.textContent = --qty; });
    plusBtn.addEventListener('click', () => qtySpan.textContent = ++qty);

    addBtn.addEventListener('click', () => {
      cart.push({...product, quantity: qty});
      cartCount.textContent = cart.length;
      addBtn.textContent = "Added!";
      addBtn.style.background = "green";
      setTimeout(()=>{ addBtn.textContent="Add to Cart"; addBtn.style.background=""; }, 1500);
    });
  });
}

// Initial display
displayProducts(products);

// Search function
searchBar.addEventListener('input', () => {
  const term = searchBar.value.toLowerCase();
  const filtered = products.filter(p=>p.name.toLowerCase().includes(term));
  displayProducts(filtered);
});

// Filter function
filterSelect.addEventListener('change', () => {
  const category = filterSelect.value;
  displayProducts(category==="all"?products:products.filter(p=>p.category===category));
});
