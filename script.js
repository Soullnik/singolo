let currentItem = 0;
let isEnabled = true;
let windowEnabled = true;
let items = document.querySelectorAll('.item_container');
let next = document.querySelector('.slider_container--arrow-next');
let previous = document.querySelector('.slider_container--arrow-previous');
let portfolioImg = document.querySelectorAll('.img');



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

const menuScrollHandler = (event) => {
  if(event.target.tagName === 'A') {
    // windowEnabled = false
    event.preventDefault();
    menu.querySelectorAll('a').forEach(el => el.classList.remove('header_container--link-active'));
    event.target.classList.add('header_container--link-active');
    const blockID = event.target.getAttribute('href').substr(1);
    console.log(blockID)
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

const screenActiveHandler = (event) => {
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
}

function tabActiveHandler(event) {
  if (!event.target.classList.contains('portfolio_container--tag-selected')) {
    let arrImg = []
    portfolioImg.forEach(el => arrImg.push(el.src))
    if (event.target.tagName === 'SPAN') {
      tab.querySelectorAll('.portfolio_container--tag').forEach(el => el.classList.remove('portfolio_container--tag-selected'))
      event.target.classList.add('portfolio_container--tag-selected')
      if (event.target.classList.contains('portfolio_container--tag-selected')) {
        arrImg.sort(function() {
          return Math.random() - 0.5
        })
        arrImg.forEach(function(elem, index) {
        portfolioImg[index].src = elem;
        })
        portfolioImg.forEach(el => el.classList.remove('img_active'))
      }
    }
  }
}


function highlightImgHeandler(event) {
  if(event.target.classList.contains('img') && event.target.classList.contains('img_active') === false) {
    portfolioImg.forEach(el => el.classList.remove('img_active'))
    event.target.classList.add('img_active')
  } else {
    event.target.classList.remove('img_active')
  }
}

function scrollWindowHeandler() {
  const header = 40
  const servicesPosition = document.getElementById('yakServicesContainer').offsetTop - header
  const portfolioPosition = document.getElementById('yakPortfolioContainer').offsetTop - header
  const aboutPosition = document.getElementById('yakAboutUsContainer').offsetTop - header
  const contactPosition = document.getElementById('yakContactContainer').offsetTop - header

  const currentPosition = window.pageYOffset
    if (currentPosition < servicesPosition) changeActiveNav(0)
    else if (currentPosition >= servicesPosition && currentPosition < portfolioPosition) changeActiveNav(1)
    else if (currentPosition >= portfolioPosition && currentPosition < aboutPosition) changeActiveNav(2)
    else if (currentPosition >= aboutPosition && currentPosition < contactPosition && !isPageEnd()) changeActiveNav(3)
    if (isPageEnd() || currentPosition >= contactPosition) changeActiveNav(4)
}

function isPageEnd() {
  return window.pageYOffset >= document.documentElement.offsetHeight - innerHeight
}

function changeActiveNav(i) {
  const navLinks = menu.querySelectorAll('a')
  navLinks.forEach(el => {
    el.classList.remove('header_container--link-active')
  })
  navLinks[i].classList.add('header_container--link-active')
}




const init = () => {
  menu.addEventListener('click', menuScrollHandler)
  
  items.forEach((elem) => {
    elem.addEventListener('click', screenActiveHandler)
  })

  previous.addEventListener('click', function(event) {
    if (isEnabled) previousItem(currentItem)
  })

  next.addEventListener('click', function(event) {
    if (isEnabled) nextItem(currentItem)
  }) 

  tab.addEventListener('click', tabActiveHandler)

  imgBlock.addEventListener('click', highlightImgHeandler)

  window.addEventListener('scroll', scrollWindowHeandler)

}

init();




