import 'bootstrap';
import './js/slicksettings';

// if (process.env.NODE_ENV === 'development') {
//   require('../index.html');
// }

const navButton = document.getElementById('navbar-button');
const { body } = document;
navButton.addEventListener('click', openNav);

function openNav() {
  body.classList.contains('overflow-hidden')
    ? body.classList.remove('overflow-hidden')
    : body.classList.add('overflow-hidden');
}

function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const slideRows = document.querySelectorAll('.scroll-bottom');
const sidesRight = document.querySelectorAll('.side-to-right');
const sidesLeft = document.querySelectorAll('.side-to-left');

function getDirection(direction, item) {
  switch (direction) {
    case 'top':
    case 'bottom':
      return window.scrollY + window.innerHeight;
      break;
    case 'right':
    case 'left':
    default:
      return window.scrollY + window.innerHeight - item.offsetTop / 6;
  }
}

function slideItems(items, direction) {
  const cls = {
    top: 'fromTop',
    bottom: 'fromBottom',
    right: 'toRight',
    left: 'toLeft',
  };

  items.forEach(item => {
    const slideInAt = getDirection(direction, item);
    const isHalfShown = slideInAt > item.offsetTop;

    if (isHalfShown) {
      item.classList.add(cls[direction]);
    }
  });
}

// function checkSlideBottom() {
//     slideRows.forEach((slideRow) => {
//         const slideInAt = window.scrollY + window.innerHeight;
//         const isHalfShown =  slideInAt > slideRow.offsetTop;

//         if(isHalfShown) {
//             slideRow.classList.add("fromBottom");
//         }
//     });
// }

// function checkSlideRight() {
//   sidesRight.forEach((sideRight) => {
//      // const slideInAt = window.scrollY;
//       //const slideInAt = window.scrollY + window.innerHeight;
//       const slideInAt = window.scrollY + window.innerHeight - sideRight.offsetTop/6;
//       //const rowBottom = sideRight.offsetTop;
//       const isHalfShown =  slideInAt > sideRight.offsetTop;

//       if(isHalfShown) {
//           sideRight.classList.add("toRight");
//       }

//      // (isHalfShown) ? slideRow.classList.add("fromBottom") : slideRow.classList.remove("fromBottom");
//   });
// }

// function checkSlideLeft() {
//   sidesLeft.forEach((sideLeft) => {
//      // const slideInAt = window.scrollY;
//       //const slideInAt = window.scrollY + window.innerHeight;
//       const slideInAt = window.scrollY + window.innerHeight - sideLeft.offsetTop/6;
//       //const rowBottom = sideRight.offsetTop;
//       const isHalfShown =  slideInAt > sideLeft.offsetTop;

//       if(isHalfShown) {
//           sideLeft.classList.add("toLeft");
//       }

//      // (isHalfShown) ? slideRow.classList.add("fromBottom") : slideRow.classList.remove("fromBottom");
//   });
// }

// window.addEventListener ('scroll', debounce(checkSlideBottom));
// window.addEventListener ('scroll', debounce(checkSlideRight));
// window.addEventListener ('scroll', debounce(checkSlideLeft));

window.addEventListener(
  'scroll',
  debounce(slideItems.bind(null, slideRows, 'bottom'))
);
window.addEventListener(
  'scroll',
  debounce(slideItems.bind(null, sidesRight, 'right'))
);
window.addEventListener(
  'scroll',
  debounce(slideItems.bind(null, sidesLeft, 'left'))
);

const questions = [...document.querySelectorAll('.question')];
// questions.forEach(question => {
//   question.addEventListener('click', event => {
//     event.preventDefault();
//     console.log('click');
//   });
// });

const answers = document.querySelectorAll('.answers');
questions.forEach(question => {
  const aQuest = question.querySelector('.question-a');
  aQuest.addEventListener('click', handleToggleQuestion.bind(null, question));
});

function handleToggleQuestion(question, event) {
  event.preventDefault();
  console.log(question);
  const h3Paw = question.querySelector('.h3-paw');
  question.classList.toggle('is-open');
  h3Paw.classList.toggle('clicked-question');
  // @TODO: Handle toggle class on question
}

// ***** navbar *****

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  scrollHeight > navHeight
    ? navbar.classList.add('fixed')
    : navbar.classList.remove('fixed');
});

// ***** scroll links *****
const linksContainer = document.querySelector('.navbar-nav');
const links = document.querySelectorAll('.nav-link');
links.forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    if (body.classList.contains('overflow-hidden')) {
      body.classList.remove('overflow-hidden');
    }
    const navDropdown = document.getElementById('navbarNavDropdown');
    if (navDropdown.classList.contains('show')) {
      navDropdown.classList.remove('show');
    }
    const id = event.currentTarget.getAttribute('href').slice(1);
    const element = document.getElementById(id);
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains('fixed');
    let position = element.offsetTop - navHeight;
    if (!fixedNav) {
      position = position - navHeight;
    }

    if (navHeight > 67.2) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    linksContainer.style.height = 0;
  });
});
