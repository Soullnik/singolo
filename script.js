let currentItem = 0;
let isEnabled = true;
let items = document.querySelectorAll('.item_container');


const changeCurrentItem = (n) => {
  currentItem = (n + items.length) % items.length;
}

const hideItem = (direction) => {
  isEnabled = false;
  items[currentItem].classList.add(direction)
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('item_container--active', direction);
    this.classList.add('item_container--next', direction)
  })
}

const showItem = (direction) => {
  items[currentItem].classList.add('item_container--next', direction)
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('item_container--next', direction);
    this.classList.add('item_container--active', direction);
    isEnabled = true;
  })
}

const previousItem = (n) => {
  hideItem('to_right')
  changeCurrentItem(n - 1)
  showItem('from_left')
}

const nextItem = (n) => {
  hideItem('to_left')
  changeCurrentItem(n + 1)
  showItem('from_right')
}

document.querySelector('.slider_container--arrow-previous').addEventListener('click', function(event) {
  console.log(event.target)
  if (isEnabled) {
    previousItem(currentItem)
  }
})

document.querySelector('.slider_container--arrow-next').addEventListener('click', function(event) {
  console.log(event.target)
  if (isEnabled) {
    nextItem(currentItem)
  }
}) 

// const swiper = (event) => {
//   if (event.target.classList.contains('slider_container--arrow')) {
//     const interSwipe = setInterval (() => {
//       items.forEach((elem) => {
//         console.log(elem.style.right)
//         if (getComputedStyle(elem).right === '1530px') {
//           clearInterval(interSwipe);
//           return;  
//         }
//         swipeCounter += 1;
//         elem.style.right = `${swipeCounter}px`;
//       })
//     }, 1000)
//   }
// }; 

const menuScroll = (event) => {
  if(event.target.tagName === 'A')
  event.preventDefault();
  menu.querySelectorAll('a').forEach(el => el.classList.remove('header_container--link-active'));
  event.target.classList.add('header_container--link-active');
  const blockID = event.target.getAttribute('href').substr(1);
  document.getElementById(blockID).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

const screenActive = (event) => {
  if (event.target.classList.contains('iphone--button')) {
    const phoneScreen = event.target.parentElement.querySelector('.iphone--screen');
    const first = event.target.parentElement.classList.contains('slider_container--iphone-first');
    const second = event.target.parentElement.classList.contains('slider_container--iphone-second');
    const changeClass = phoneScreen.classList;
    if (first) {
    (changeClass.contains('iphone--screen_first')) ? changeClass.remove('iphone--screen_first') : changeClass.add('iphone--screen_first');
    } else if (second) {
    (changeClass.contains('iphone--screen_second')) ? changeClass.remove('iphone--screen_second') : changeClass.add('iphone--screen_second');
    }
  }
};

const init = () => {
  menu.addEventListener('click', menuScroll)
  items.forEach((elem) => {
    elem.addEventListener('click', screenActive)
  })
  // slider.addEventListener('click', swiper)
}

init();



  



