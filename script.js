const items = document.querySelectorAll('.item');
const next = document.querySelector('.slider_container--arrow-next');
const previous = document.querySelector('.slider_container--arrow-previous');
const portfolioImg = document.querySelectorAll('.img');
const SubmitBtn = document.querySelector('.submit');
const form = document.querySelector('.layout_two_column--form');
const formName = document.querySelector('.layout_two_column--form_name');
const formEmail = document.querySelector('.layout_two_column--form_email');
const formSubject = document.querySelector('.layout_two_column--form_subject');
const formDescription = document.querySelector('.layout_two_column--form_description');
const contuct_us = document.querySelector('.contact_us');
const overlay = createDomNode('overlay', 'div', 'overlay');
const modal = createDomNode('modal', 'div', 'modal');
const message = createDomNode('message', 'div', 'message');
const messageStatus = createDomNode('messageStatus', 'p', 'message--status');
const messageSubject = createDomNode('messageSubject', 'p', 'message--subject');
const messageDescription = createDomNode('messageDescription', 'p', 'message--description');
const messageBtn = createDomNode('messageBtn', 'button', 'message--agree-hidden');
const burgerBtn = document.querySelector('.burger');
const headerBox = document.querySelector('.header_container');
const swipeElement = document.querySelector('.slider_container');

let currentItem = 0;
let isEnabled = true;
let isEnabledBurger = true;
let windowEnabled = true;


function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('item--active', direction);
    this.classList.add('item_container--next');
  })
}

function showItem(direction) {
  items[currentItem].classList.add('item--next', direction)
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('item--next', direction);
    this.classList.add('item--active');
    isEnabled = true;
  })
}

function previousItem(n) {
  hideItem('to_right');
  changeCurrentItem(n - 1);
  showItem('from_left');
}

function nextItem(n) {
  hideItem('to_left');
  changeCurrentItem(n + 1);
  showItem('from_right');
}

const menuScrollHandler = (event) => {
  if(event.target.tagName === 'A') {
    closeBurger();
    event.preventDefault();
    const blockID = event.target.getAttribute('href').substr(1);
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
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
    (changeClass.contains('iphone--screen_third')) ? changeClass.remove('iphone--screen_third') : changeClass.add('iphone--screen_third');
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
    if (window.pageYOffset === 0) {
      changeActiveNav(0);
    }else if (currentPosition >= servicesPosition && currentPosition < portfolioPosition) {
      changeActiveNav(1);
    }else if (currentPosition >= portfolioPosition && currentPosition < aboutPosition) {
      changeActiveNav(2);
    }else if (currentPosition >= aboutPosition && currentPosition < contactPosition && !isPageEnd()) {
      changeActiveNav(3);
    }
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

function createDomNode(node, element, ...classes) {
  node = document.createElement(element);
  node.classList.add(...classes);
  return node;
}

function setContent(content, element) {
  if (element == messageSubject) {
    if(content !== '') {
      element.innerText = 'Тема: ' + content;
    }else {
      element.innerText = 'Без темы';
    };
  }

  if (element == messageDescription) {
    if(content !== '') {
      element.innerText = 'Описание: ' + content;
    }else {
      element.innerText = 'Без описания';
    };
  }

  if(element == messageStatus) {
    element.innerText += content;
  }else if(element == messageBtn) {
    element.innerText += content;
  }
}

function appendModalElements() {
  yakContact.append(modal);
  modal.append(message);
  message.append(messageStatus);
  message.append(messageSubject);
  message.append(messageDescription);
  message.append(messageBtn);
  setContent('Письмо отправлено', messageStatus)
  setContent('Продолжить', messageBtn)
}

function btnHeandler(event) {
  let validateName = formName.validity.valid;
  let validateEmail = formEmail.validity.valid;

  if(validateName == true && validateEmail == true) {
    setContent(formSubject.value, messageSubject)
    setContent(formDescription.value, messageDescription)
    event.preventDefault();
    document.body.prepend(overlay);
    document.body.classList.add('scroll-hidden');
    appendModalElements();
    document.querySelector('.message--agree-hidden').addEventListener('click', function(event) {
      overlay.remove();
      document.body.classList.remove('scroll-hidden');
      modal.remove();
      form.reset();
    })
  }
}

const closeBurger = () => {
  burgerBtn.classList.add('to_close_burger')
  headerBox.classList.add('to_close')
  
  burgerBtn.addEventListener('animationend', function() {
    burgerBtn.classList.remove('to_close_burger')
    burgerBtn.classList.remove('burger-open')
  })

  headerBox.addEventListener('animationend', function() {
    headerBox.classList.remove('to_close')
    headerBox.classList.remove('header_container--open')
  })
  overlay.remove();
  document.body.classList.remove('scroll-hidden');
  isEnabledBurger = true;
}

const openBurger = () => {
  burgerBtn.classList.add('to_open_burger')
  headerBox.classList.add('to_open')

  burgerBtn.addEventListener('animationend', function() {
    burgerBtn.classList.add('burger-open')
    burgerBtn.classList.remove('to_open_burger')
  })

  headerBox.addEventListener('animationend', function() {
    headerBox.classList.add('header_container--open')
    headerBox.classList.remove('to_open')
  })
  
  document.body.prepend(overlay);
  document.body.classList.add('scroll-hidden');
  isEnabledBurger = false;
}

function burgerHeandler(event) {
  if (isEnabledBurger === true) {
    openBurger();
    
  }else {
    closeBurger();
  }
}


const swipeDetected = (el) => {
  console.log('sfsdf')

  let surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 150;
  let restraint = 100;
  let allowedTime = 300;

  surface.addEventListener('mousedown', function(e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  })

  surface.addEventListener('mouseup', function(e) {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }

    e.preventDefault();
  })

  surface.addEventListener('touchstart', function(e) {
    let touchObj = e.changedTouches[0]; 
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  })

  surface.addEventListener('touchmove', function(e) {
    e.preventDefault();
  })

  surface.addEventListener('touchend', function(e) {
    let touchObj = e.changedTouches[0]; 
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }

    e.preventDefault();
  })
} 



const init = () => {
  swipeDetected(swipeElement);

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

  SubmitBtn.addEventListener('click', btnHeandler)

  burgerBtn.addEventListener('click', burgerHeandler)
}

init();