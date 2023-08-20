const navbarBtn = document.querySelector('.navbar_btn');
const navbarBtnSpan = document.querySelector('.navbar_btn span');
const navbarMenu = document.querySelector('.navbar_menu');
navbarBtn.addEventListener('click', function (e) {
  e.preventDefault();

  if (navbarBtn.classList.contains('active')) {
    navbarBtn.classList.remove('active');
    navbarMenu.style = 'left: -280px; transition: left 0.5s';
  } else {
    navbarBtn.classList.add('active');
    navbarMenu.style = 'left: 0; transition: left 0.5s';
  }
});
document.addEventListener('mouseup', function (e) {
  if (e.target != navbarBtn && e.target != navbarBtnSpan || e.target == navbarBtnSpan && e.target == navbarBtn) {
    navbarBtn.classList.remove('active');
    navbarMenu.style = 'left: -280px; transition: left 0.5s';
  }
});
navbarMenu.addEventListener('mouseup', function (e) {
  e.stopPropagation();
});
const signInBTn = document.querySelector('.sign-in');
const signIn = document.querySelector('.signin');
const signItems = document.querySelector('.signin_items');
signInBTn.addEventListener('click', function (e) {
  signIn.style = 'display: flex';
});
signIn.addEventListener('mouseup', function (e) {
  signIn.style = 'display: none';
});
signIn.addEventListener('mousewheel', function (e) {
  signIn.style = 'display: none';
});
signItems.addEventListener('mouseup', function (e) {
  e.stopPropagation();
});

class Slider {
  constructor(options) {
    this.slider = options.slider;
    this.sliderList = this.slider.querySelector('.slider_items');
    this.sliderItems = this.slider.querySelectorAll('.slider_items-slide');
    this.activeSlide = 0;
    this.moveSlide = 100;
    this.dir = options.direction.toUpperCase() == 'X' ? 'X' : 'Y';
    this.timeMove = 1000;
    this.interval = options.interval == undefined ? this.timeMove + 2000 : options.interval;
    this.newDots = options.createDots;

    if (this.newDots == 'true') {
      this.active = true;
      this.ul = document.createElement('ul');
      this.ul.classList.add('slider_dots');
      this.sliderItems.forEach(() => {
        const li = document.createElement('li');
        this.ul.appendChild(li);
      });
      this.slider.appendChild(this.ul);
      this.dots = this.slider.querySelectorAll('.slider_dots li');
      this.dots[this.activeSlide].classList.add('active');
      this.dots.forEach((dot, key) => {
        dot.addEventListener('click', () => {
          this.controllersDots(key);
        });
      });
    }

    if (options.play == 'true') {
      let avtoPlaySlider = setInterval(() => {
        this.move();
      }, this.interval);
      this.slider.addEventListener('mouseenter', () => {
        clearInterval(avtoPlaySlider);
      });
      this.slider.addEventListener('mouseleave', () => {
        avtoPlaySlider = setInterval(() => {
          this.move();
        }, this.interval);
      });
    }

    this.sliderItems.forEach((slide, key) => {
      if (key != this.activeSlide) {
        slide.style.transform = `translate${this.dir}(${this.moveSlide}%)`;
      }

      if (key == this.sliderItems.length - 1) {
        slide.style.transform = `translate${this.dir}(${-this.moveSlide}%)`;
      }
    });
  }

  move() {
    this.sliderItems.forEach((slide, key) => {
      if (this.activeSlide != key) {
        slide.style.transform = `translate${this.dir}(${this.moveSlide}%)`;
        slide.style.transition = `0ms`;
      }
    });
    setTimeout(() => {
      this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${-this.moveSlide}%)`;
      this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;

      if (this.newDots == 'true') {
        this.dots[this.activeSlide].classList.remove('active');
      }

      this.activeSlide++;

      if (this.activeSlide >= this.sliderItems.length) {
        this.activeSlide = 0;
      }

      this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${0}%)`;
      this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;

      if (this.newDots == 'true') {
        this.dots[this.activeSlide].classList.add('active');
      }
    }, this.timeMove + 200);
  }

  controllersDots(dotKey) {
    if (this.active && dotKey != this.activeSlide) {
      this.sliderItems.forEach(slide => {
        slide.style.transition = '0ms';
      });
      this.active = false;
      this.dots.forEach(dot => {
        dot.classList.remove('active');
      });
      let moveLeftOrRight = dotKey > this.activeSlide ? this.moveSlide : -this.moveSlide;
      this.sliderItems[dotKey].style.transform = `translate${this.dir}(${moveLeftOrRight}%)`;
      setTimeout(() => {
        this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${-moveLeftOrRight}%)`;
        this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;
        this.dots[this.activeSlide].classList.remove('active');
        this.activeSlide = dotKey;
        this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${0}%)`;
        this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;
        this.dots[this.activeSlide].classList.add('active');
      }, 100);
      setTimeout(() => {
        this.active = true;
      }, this.timeMove + 200);
    }
  }

}

const sliders = document.querySelectorAll('.slider');
sliders.forEach((slider, num) => {
  const direction = slider.getAttribute('direction') != 'Y' ? 'X' : 'Y';
  const autoPlay = slider.hasAttribute('auto-play') ? 'true' : 'false';
  const createDots = slider.hasAttribute('create-dots') ? 'true' : 'false';
  const interval = +slider.getAttribute('interval') >= 2000 ? +slider.getAttribute('interval') : undefined;
  new Slider({
    slider: slider,
    direction: direction,
    play: autoPlay,
    createDots: createDots,
    interval: interval
  });
});
const tabsLi = document.querySelectorAll('.single_tab-min li');
const bigImg = document.querySelector('.single_tab-img img');
tabsLi.forEach((tab, key) => {
  tab.addEventListener('click', function () {
    tabsLi.forEach((tab2, key2) => {
      tab2.classList.remove('active');
    });
    const tabSrc = tab.querySelector('img').getAttribute('src');
    tab.classList.add('active');
    bigImg.setAttribute('src', tabSrc);
  });
});