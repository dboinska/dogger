import 'bootstrap';
//import { doc } from 'prettier';
import './js/slicksettings';
import { debounce } from './js/utils.js';

// if (process.env.NODE_ENV === 'development') {
//   require('../index.html');
// }

const navButton = document.getElementById('navbar-button');
const { body } = document;
const main = document.querySelector('main');
navButton.addEventListener('click', openNav);

const OVERFLOW_HIDDEN = 'overflow-hidden';

function openNav() {
  // body.classList.contains(OVERFLOW_HIDDEN)
  //   ? body.classList.remove(OVERFLOW_HIDDEN)
  //   : body.classList.add(OVERFLOW_HIDDEN);

  if (body.classList.contains(OVERFLOW_HIDDEN)) {
    body.classList.remove(OVERFLOW_HIDDEN);
    main.classList.remove(OVERFLOW_HIDDEN);
  } else {
    body.classList.add(OVERFLOW_HIDDEN);
    main.classList.add(OVERFLOW_HIDDEN);
  }
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
const links = [...document.querySelectorAll('.nav-link')];
links.forEach(function (link) {
  link.addEventListener('click', function (event) {
    // event.preventDefault();
    console.log(event.target);
    const previousLink = links.find(link =>
      link.classList.contains('active-link')
    );

    // const url = new URL(event.target.href);
    // if (url.hash === '#about') {
    //   console.log('dcdcd');
    //   event.preventDefault();
    //   const parent = event.target.parentElement;
    //   const sibling = parent.querySelector('.dropdown-menu');
    //   sibling.classList.contains('d-block')
    //     ? sibling.classList.remove('d-block')
    //     : sibling.classList.add('d-block');
    //   return;
    // }

    if (previousLink) {
      previousLink.classList.remove('active-link');
    }

    event.target.classList.add('active-link');

    if (body.classList.contains(OVERFLOW_HIDDEN)) {
      body.classList.remove(OVERFLOW_HIDDEN);
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
  });
});

const dropdowns = [...document.querySelectorAll('.dropdown-item')];
dropdowns.forEach(function (dropdown) {
  dropdown.addEventListener('click', function (event) {
    console.log(event.target);
    const previousDropdown = dropdowns.find(dropdown =>
      dropdown.classList.contains('active-link')
    );
    if (previousDropdown) {
      previousDropdown.classList.remove('active-link');
    }
    event.target.classList.add('active-link');
  });
});

// video

const videoButton = document.querySelector('.video');
function playVideo() {
  console.log('clicked');
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.classList.add('video-overlay');
  document.body.classList.add(OVERFLOW_HIDDEN);
  document.body.appendChild(overlay);
  const videoPlayer = document.createElement('video');

  const videoSource = document.createElement('source');
  videoSource.src =
    'https://player.vimeo.com/external/364841370.sd.mp4?s=8a3174708b70bbb90526d5aad598bd918223c202&profile_id=139&oauth2_token_id=57447761';
  videoSource.type = 'video/mp4';
  videoPlayer.autoplay = 'autoplay';
  videoPlayer.controls = true;
  overlay.appendChild(videoPlayer);
  videoPlayer.appendChild(videoSource);

  overlay.addEventListener('click', closeVideo);
  document.addEventListener('keydown', handleEscPress);

  function closeVideo() {
    overlay.classList.remove('video-overlay');
    document.body.classList.remove(OVERFLOW_HIDDEN);
    overlay.removeEventListener('click', closeVideo);
    document.removeEventListener('keydown', handleEscPress);
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  }

  function handleEscPress(event) {
    if (event.key === 'Escape') {
      closeVideo();
    }
  }
}
videoButton.addEventListener('click', playVideo);

// links

// $('navbar-toggler-icon').click(function () {
//   $(this).toggleClass(
//     'mobile-inner-header-icon-click mobile-inner-header-icon-out'
//   );
//   $('.navbar-collapse').slideToggle(250);
// });

// $('.mnavbar-collapse a').each(function (index) {
//   $(this).css({ 'animation-delay': index / 10 + 's' });
// });

//
