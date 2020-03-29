const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.slider_dots--item');
const next = document.querySelector('.slider_container--arrow-next');
const previous = document.querySelector('.slider_container--arrow-previous');
const portfolioImgBlock = document.querySelector('#imgBlock');
const SubmitBtn = document.querySelector('.submit');
const form = document.querySelector('.layout_two_column--form');
const formName = document.querySelector('.layout_two_column--form_name');
const formEmail = document.querySelector('.layout_two_column--form_email');
const formSubject = document.querySelector('.layout_two_column--form_subject');
const formDescription = document.querySelector('.layout_two_column--form_description');
const contuct_us = document.querySelector('.contact_us');
const burgerBtn = document.querySelector('.burger');
const burgerNav = document.querySelector('.header_container--navigation');
const logo = document.querySelector('.header_container--logo');
const swipeElement = document.querySelector('.slider_container');
const overlay = createDomNode('overlay', 'div', 'overlay');
const modal = createDomNode('modal', 'div', 'modal');

let currentItem = 0;
let isEnabled = true;
let isEnabledBurger = true;
let windowEnabled = true;

function changeDotsItem(Item) {
  dots.forEach(el => {
    el.classList.remove('slider_dots--item-curent')
  })
  dots[Item].classList.add('slider_dots--item-curent');
}

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  changeDotsItem(currentItem)
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('item--active', direction);
    this.classList.add('item_container--next');
  })
}

function showItem(direction) {
  changeDotsItem(currentItem)
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

function menuScrollHandler(event) {
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

function screenActiveHandler(event) {
  const phoneScreen = event.target.parentElement.querySelector('.iphone--screen');
  const first = event.target.parentElement.classList.contains('slider_container--iphone-first');
  const backgroundPhoneLeft = event.target.parentElement.classList.contains('iphone_second--left');
  const backgroundPhoneRight = event.target.parentElement.classList.contains('iphone_second--right');
  const second = event.target.parentElement.classList.contains('slider_container--iphone-second');
  const third = event.target.parentElement.classList.contains('iphone_second');
  const changeClass = phoneScreen.classList;
  if (first || backgroundPhoneLeft || backgroundPhoneRight) {
  (changeClass.contains('iphone--screen_first')) ? changeClass.remove('iphone--screen_first') : changeClass.add('iphone--screen_first');
  } else if (second) {
  (changeClass.contains('iphone--screen_second')) ? changeClass.remove('iphone--screen_second') : changeClass.add('iphone--screen_second');
  } else if (third) {
  (changeClass.contains('iphone--screen_third')) ? changeClass.remove('iphone--screen_third') : changeClass.add('iphone--screen_third');
  }
} 

function tabActiveHandler(event) {
  if (!event.target.classList.contains('portfolio_container--tag-selected')) {
    let arrImg =  [...document.querySelectorAll('.img_block')];

    if (event.target.tagName === 'SPAN') {
      tab.querySelectorAll('.portfolio_container--tag').forEach(el => el.classList.remove('portfolio_container--tag-selected'))
      event.target.classList.add('portfolio_container--tag-selected');
      if (event.target.classList.contains('portfolio_container--tag-selected')) {
        arrImg.sort(function() {
          return Math.random() - 0.5
        })
        arrImg.forEach(el => portfolioImgBlock.appendChild(el))
      }
    }
  }
}

function highlightImgHeandler(event) {
  let portfolioImg = document.querySelectorAll('.img');
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
    if (window.pageYOffset <= 100) {
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

function btnSubmitHeandler(event) {
  let validateName = formName.validity.valid;
  let validateEmail = formEmail.validity.valid;

  if(validateName == true && validateEmail == true) {
    event.preventDefault();
    let modalChild = []
    modalChild.push(createDomNode('messageStatus', 'p', 'message--status'));
    modalChild.push(createDomNode('messageSubject', 'p', 'message--subject'));
    modalChild.push(createDomNode('messageDescription', 'p', 'message--description'));
    modalChild.push(createDomNode('messageBtn', 'button', 'message--agree-hidden'));
    setContent(formSubject.value,formDescription.value,'Письмо отправлено','ОК', modalChild)
    document.body.classList.add('scroll-hidden');
    appendModalElements(modalChild);
    document.querySelector('.message--agree-hidden').addEventListener('click', function(event) {
      overlay.innerHTML = '';
      modal.innerHTML = '';
      document.body.classList.remove('scroll-hidden');
      overlay.remove();
      form.reset();
    }) 
  }
}

function setContent(formSubject,formDescription, contentStatus, contentButton, modalChild) {
  modalChild.forEach(element => {
    console.log(element.className)
    switch (element.className) {
      case 'message--subject':
          if(formSubject !== '') {
            element.innerText = 'Тема: ' + formSubject;
          }else {
            element.innerText = 'Без темы';
          };
        break;
      case 'message--description':
          if(formDescription !== '') {
            element.innerText = 'Описание: ' + formDescription;
          }else {
            element.innerText = 'Без описания';
          };
        break;
      case 'message--status':
          element.innerText += contentStatus;
      break; 
      case 'message--agree-hidden':
          element.innerText += contentButton;
        break;
    }
  })
}

function appendModalElements(modalChild) {
  document.body.prepend(overlay);
  overlay.append(modal);
  console.log(modalChild)
  modalChild.forEach(elem => {
    modal.append(elem)
  }) 
  
}

function createDomNode(node, element, ...classes) {
  node = document.createElement(element);
  node.classList.add(...classes);
  return node;
}

function closeBurger() {
  burgerBtn.classList.add('to_close_burger');
  logo.classList.add('to_right_logo');
 
  burgerBtn.addEventListener('animationend', function() {
    burgerBtn.classList.remove('to_close_burger')
    burgerBtn.classList.remove('burger-open')
  })

  logo.addEventListener('animationend', function() {
    logo.classList.remove('header_container--logo-open');
    logo.classList.remove('to_right_logo');
  })
  burgerNav.classList.remove('header_container--navigation-open');
  overlay.remove();
  document.body.classList.remove('scroll-hidden');
  isEnabledBurger = true;
}

function openBurger() {
  burgerBtn.classList.add('to_open_burger');
  burgerNav.classList.add('header_container--navigation-open');
  logo.classList.add('to_left_logo');

  burgerBtn.addEventListener('animationend', function() {
    burgerBtn.classList.add('burger-open');
    burgerBtn.classList.remove('to_open_burger');
  })

  logo.addEventListener('animationend', function() {
    logo.classList.add('header_container--logo-open');
    logo.classList.remove('to_left_logo');
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

function swipeDetected(el) {
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

  surface.addEventListener('click', function(e) {
    if (e.target.classList.contains('iphone--button')) {
      screenActiveHandler(e)
    }
  })

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
    if (e.target.classList.contains('slider_container--arrow')) {
      if (e.target.classList.contains('slider_container--arrow-previous')) {
        if (isEnabled) {
          previousItem(currentItem);
        }
      } else if (e.target.classList.contains('slider_container--arrow-next')) {
        if (isEnabled) {
          nextItem(currentItem);
        }
      }
    }

    if (e.target.classList.contains('iphone--button')) {
      screenActiveHandler(e)
    }

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

  previous.addEventListener('click', function(event) {
    if (isEnabled) previousItem(currentItem)
  })

  next.addEventListener('click', function(event) {
    if (isEnabled) nextItem(currentItem)
  }) 

  tab.addEventListener('click', tabActiveHandler)

  imgBlock.addEventListener('click', highlightImgHeandler)

  window.addEventListener('scroll', scrollWindowHeandler)

  SubmitBtn.addEventListener('click', btnSubmitHeandler)

  burgerBtn.addEventListener('click', burgerHeandler)
}

init();