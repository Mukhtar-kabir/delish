'use strict';

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
  navLink.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('LINK');

    if (e.target.classList.contains('nav--link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behaviour: 'smooth' });
    }
  });
};
scrollView();

var swiper = new Swiper('.home-slider', {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  // pagination: {
  //   el: '.swiper-pagination',
  //   clickable: true,
  // },
  loop: true,
});

var swiper = new Swiper('.review-slider', {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

function loader() {
  document.querySelector('.loader-container').classList.add('fade-out')
}

function fadeOut() {
  setInterval(loader, 3000)
}

window.onload = fadeOut;

const dish = document.querySelector('.box-container');

let basket = JSON.parse(localStorage.getItem('data')) || [];

let generateShop = () => {
  return (dish.innerHTML = shopItemData.map((x) => {
    let { id, name, price, img } = x;
    let search = basket.find((y) => y.id === id) || [];
    return `
      <div class="dish-container">
        <div class="box">
          <a href="#" class="fas fa-heart"></a>
          <a href="#" class="fas fa-eye"></a>
          <img src=${img} alt="" />
          <h3>${name}</h3>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
          </div>
          <span>$ ${price}.99</span>

          <div class="buttons">
            <svg onclick="decreament(${id})" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
            </svg>

            <h3 id=${id} class="quantity">${
      search.item === undefined ? 0 : search.item
    }</h3>

            <svg onclick="increament(${id})" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
            </svg>
          </div>
        </div>
      </div>
       
    `;
  })).join('');
};

generateShop();

let increament = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  console.log(basket);
  update(selectedItem.id);
  localStorage.setItem('data', JSON.stringify(basket));
};

let decreament = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  console.log(basket);
  localStorage.setItem('data', JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculate();
};

let calculate = () => {
  let cartIcon = document.querySelector('.notify');
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculate();
