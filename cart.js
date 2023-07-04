const menu = document.querySelector('#menu-bars');
const navbar = document.querySelector('.navbar');
const navLink = document.querySelector('.nav--link');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
};

document.querySelector('#search-icon').onclick = () => {
  document.querySelector('#search-form').classList.toggle('active');
};

document.querySelector('#close').onclick = () => {
  document.querySelector('#search-form').classList.remove('active');
};

document.querySelectorAll('.nav--link').forEach((el) =>
  el.addEventListener('click', () => {
    menu.classList.remove('active');
    navbar.classList.remove('active');
    menu.classList.remove('fa-times');
  })
);

const scrollView = function () {
  navLink.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.classList.contains('nav--link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behaviour: 'smooth' });
    }
  });
};
scrollView();

const shoppingCart = document.querySelector('.shopping-cart');
const label = document.querySelector('.label');

let basket = JSON.parse(localStorage.getItem('data')) || [];

const calculate = () => {
  const cartIcon = document.querySelector('.notify');
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculate();

const generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket.map((x) => {
      const { id, item } = x;
      const search = shopItemData.find((x) => x.id === id) || [];
      const { img, price, name } = search;

      return `
        <div class="container">
        <div class="shopping--cart-boxes">
          <div class="shopping--cart-box">
            <img src=${img} alt="">
            <h3>${name}</h3>
          </div>

          <div class="shopping--cart-box">
            <div class="button">
              <svg onclick="decreament(${id})" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>                  
    
              <h3 id=${id} class="quantity">${item}</h3>
    
              <svg onclick="increament(${id})" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>                  
            </div>
          </div>

          <div class="shopping--cart-box">
            <div class="prices">
              <h3>$ ${item * price}</h3>
              <svg onclick="removeItem(${id})" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>                  
            </div>
          </div>
        </div>
        </div>
      `;
    })).join('');
  }
  shoppingCart.innerHTML = '';
  label.innerHTML = `
      <div class="text">
      <h3>Cart is Empty</h3>
      <a href="index.html">
        <button class="btn">Go back Home</button>
      </a>
      </div>
    `;
};

generateCartItems();

const increament = (id) => {
  const selectedItem = id;
  const search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem('data', JSON.stringify(basket));
};

const decreament = (id) => {
  const selectedItem = id;
  const search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  if (search.item === 0) return;

  search.item -= 1;

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem('data', JSON.stringify(basket));
};

let update = (id) => {
  const search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculate();
  totalAmount();
};

const removeItem = (id) => {
  const selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  calculate();
  generateCartItems();
  totalAmount();
  localStorage.setItem('data', JSON.stringify(basket));
};

let totalAmount = () => {
  if (basket.length !== 0) {
    const amount = basket
      .map((x) => {
        const { id, item } = x;
        const filterData = shopItemData.find((x) => x.id === id);
        return filterData.price * item;
      })
      .reduce((x, y) => x + y, 0);
    return (label.innerHTML = `
        <div class="btn--buttons">
          <h3>Total: <span>$ ${amount}</h2>
          <div class="btns">
            <button class="btn">checkout</button>
            <button onclick="clearCart()" class="btn">Clear Cart</button>
          </div>
        </div>
    `);
  }
};

totalAmount();

const clearCart = () => {
  basket = [];
  generateCartItems();
  calculate();
  localStorage.setItem('data', JSON.stringify(basket));
};
