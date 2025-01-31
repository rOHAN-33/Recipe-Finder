import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import Lenis from 'lenis'
// import './style-2.css'


// let lastscroll = window.scrollY
// window.addEventListener('scroll', () => {
//   const navbar = document.querySelector('.navbar');
//   if (window.scrollY > lastscroll) {
//     navbar.classList.add('scrolled')
//    } else {
//     navbar.classList.remove('scrolled');
//   }
//   lastscroll = scrollY
// });

// Initialize Lenis
const lenis = new Lenis({
    autoRaf: true,
  });
  
  // Listen for the scroll event and log the event data
  lenis.on('scroll', (e) => {
    console.log(e);
  });
setupCounter(document.querySelector('#counter'))
