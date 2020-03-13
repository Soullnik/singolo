let swipeCounter = 0;
let itemContainer = document.querySelectorAll('.item_container');


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

const swiper = (event) => {
  if (event.target.classList.contains('slider_container--arrow')) {
    const interSwipe = setInterval (() => {
      document.querySelectorAll('.item_container').forEach((elem) => {
        console.log(elem.style.right)
        if (elem.style.right === '1530px') {
          clearInterval(interSwipe);
          return;  
        }
        swipeCounter += 1;
        console.log(elem.style.right)
        console.log(elem.style)
        console.log(elem)
        // elem.style.right = `${swipeCounter}px`;
      })
    }, 1000)
  }
}; 







// phoneButton.addEventListener('click', function (event) {
    
    
// })

const init = () => {
  menu.addEventListener('click', menuScroll)
  itemContainer.forEach((elem) => {
    elem.addEventListener('click', screenActive)
  })
  slider.addEventListener('click', swiper)
}

init();



  



