let currentItem = 0;
let isEnabled = true;
let items = document.querySelectorAll('.item_container');


function changeCurrentItem(n) {
  console.log(currentItem)
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  console.log(currentItem)
  isEnabled = false;
  items[currentItem].classList.add(direction)
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('item_container--active', direction);
    this.classList.add('item_container--next');
  })
}

function showItem(direction) {
  console.log(currentItem)
  items[currentItem].classList.add('item_container--next', direction)
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('item_container--next', direction);
    this.classList.add('item_container--active');
    isEnabled = true;
  })
}

function previousItem(n) {
  hideItem('to_right')
  changeCurrentItem(n - 1)
  showItem('from_left')
}

function nextItem(n) {
  hideItem('to_left')
  changeCurrentItem(n + 1)
  showItem('from_right')
}

document.querySelector('.slider_container--arrow-previous').addEventListener('click', function(event) {
  console.log(currentItem)
  if (isEnabled) {
    previousItem(currentItem)
  }
})

document.querySelector('.slider_container--arrow-next').addEventListener('click', function(event) {
  console.log(currentItem)
  if (isEnabled) {
    nextItem(currentItem)
  }
}) 

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
  console.log(event.target.parentElement.classList)
  if (event.target.classList.contains('iphone--button')) {
    const phoneScreen = event.target.parentElement.querySelector('.iphone--screen');
    const first = event.target.parentElement.classList.contains('slider_container--iphone-first');
    const second = event.target.parentElement.classList.contains('slider_container--iphone-second');
    const third = event.target.parentElement.classList.contains('iphone_second');
    const changeClass = phoneScreen.classList;
    if (first) {
    (changeClass.contains('iphone--screen_first')) ? changeClass.remove('iphone--screen_first') : changeClass.add('iphone--screen_first');
    } else if (second) {
    (changeClass.contains('iphone--screen_second')) ? changeClass.remove('iphone--screen_second') : changeClass.add('iphone--screen_second');
    } else if (third) {
    (changeClass.contains('iphone--screen_first')) ? changeClass.remove('iphone--screen_first') : changeClass.add('iphone--screen_first');
    }
  }
};

const init = () => {
  menu.addEventListener('click', menuScroll)
  items.forEach((elem) => {
    elem.addEventListener('click', screenActive)
  })
}

init();



  



