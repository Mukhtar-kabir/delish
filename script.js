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
