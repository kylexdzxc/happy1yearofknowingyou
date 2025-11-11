// =======================================================
// === 1. CUSTOMIZATION: UPDATE THESE TWO VARIABLES! ===
// =======================================================

// Set the date for the anniversary (e.g., November 11, 2025)
const anniversaryDate = new Date("November 11, 2025 00:00:00").getTime();

// THIS URL IS NOW OBSOLETE, THE AUTOMATIC REDIRECT IS REMOVED.
// =======================================================
// === 2. DOM ELEMENT SETUP ===
// =======================================================

const countdownSection = document.getElementById('countdown-section');
const mainContent = document.getElementById('main-content');
const revealButton = document.getElementById('revealButton');
const body = document.body;
const starField = document.getElementById('star-field');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const mainCountdownTitle = document.getElementById('main-countdown-title');
const animeBgImage = document.getElementById('animeBgImage');
const animeSilhouette = document.getElementById('animeSilhouette');
const cursorTrail = document.getElementById('cursor-trail');
const messageContentEl = document.getElementById('message-content');
// const photoGalleryEl = document.getElementById('photo-gallery'); // REMOVED

// Slideshow Elements
const slideshowImage = document.getElementById('slideshow-image');
const slideshowCaption = document.getElementById('slideshow-caption');


function pad(n) { return (n < 10) ? ("0" + n) : n; }

// =======================================================
// === 3. STAR FIELD AND ANIMATION GENERATOR (UNCHANGED) ===
// =======================================================

function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  const size = Math.random() * 3 + 1;
  star.style.width = star.style.height = size + 'px';
  star.style.left = Math.random() * 100 + 'vw';
  star.style.animationDuration = Math.random() * 8 + 7 + 's';
  star.style.animationDelay = Math.random() * 5 + 's';
  
  starField.appendChild(star);
  star.addEventListener('animationend', () => { star.remove(); });
}
setInterval(createStar, 100);

// =======================================================
// === 4. INTERACTIVITY (PARALLAX & CURSOR - UNCHANGED) ===
// =======================================================

document.addEventListener('mousemove', (e) => {
  // Parallax effect
  const parallaxStrength = 0.02;
  const mouseX = (e.clientX / window.innerWidth - 0.5) * parallaxStrength;
  const mouseY = (e.clientY / window.innerHeight - 0.5) * parallaxStrength;
  
  animeBgImage.style.transform = `translate(${mouseX * -100}%, ${mouseY * -100}%) scale(1.05)`;
  
  // Cursor Trail update
  cursorTrail.style.left = e.clientX + 'px';
  cursorTrail.style.top = e.clientY + 'px';
});

// Add hover effect to interactive elements
document.querySelectorAll('button, .envelope-container').forEach(el => {
  el.addEventListener('mouseenter', () => cursorTrail.classList.add('hover-effect'));
  el.addEventListener('mouseleave', () => cursorTrail.classList.remove('hover-effect'));
});

// =======================================================
// === 5. PAGE TRANSITION LOGIC (UNCHANGED) ===
// =======================================================
function showMainReveal() {
  body.style.opacity = 0;
  
  setTimeout(() => {
    countdownSection.style.display = 'none';
    mainContent.style.display = 'block';
    animeSilhouette.classList.add('active');
    
    // IMPORTANT: Start the slideshow when the main content is revealed!
    startSlideshow();
    
    setTimeout(() => {
      body.style.opacity = 1;
      mainContent.classList.add('active');
    }, 10);
  }, 500);
}

revealButton.onclick = showMainReveal;

// =======================================================
// === 6. MAIN COUNTDOWN LOGIC (UNCHANGED) ===
// =======================================================

const countdownInterval = setInterval(function() {
  const now = new Date().getTime();
  const distance = anniversaryDate - now;
  
  if (distance > 0) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
    
  } else {
    clearInterval(countdownInterval);
    document.getElementById('countdown-timer').innerHTML = `<div style="font-size: 2.5em; color: var(--primary-color); font-weight: bold;">IT'S HERE!</div>`;
    document.getElementById('message').textContent = "Happy Anniversary, my love!";
    revealButton.textContent = "honk mimimi 🐻❤️";
    revealButton.onclick = showMainReveal;
  }
}, 1000);

// =======================================================
// === 7. ENVELOPE AND TAB LOGIC (UPDATED ENVELOPE LOGIC) ===
// =======================================================

window.openTab = function(tabId, buttonElement) {
  document.querySelectorAll('.tab-content').forEach(content => { content.classList.remove('active'); });
  document.querySelectorAll('.tab-button').forEach(button => { button.classList.remove('active'); });
  document.getElementById(tabId).classList.add('active');
  buttonElement.classList.add('active');
}

window.toggleEnvelope = function(envelope) {
  if (envelope.classList.contains('open')) {
    // Close it
    envelope.classList.remove('open');
    messageContentEl.classList.remove('revealed');
    messageContentEl.style.height = '0';
    
  } else {
    // Open it and reveal content 
    envelope.classList.add('open');
    
    setTimeout(() => {
      // Calculate height based ONLY on the message text (no gallery)
      const innerTextHeight = messageContentEl.querySelector('.message-text').scrollHeight;
      const totalHeight = innerTextHeight + 60; // 60px for padding/margins
      
      messageContentEl.style.height = totalHeight + "px";
      messageContentEl.classList.add('revealed');
      
    }, 800);
  }
}

// =======================================================
// === 8. PHOTO SLIDESHOW LOGIC (UNCHANGED) ===
// =======================================================

let slideIndex = 0;
let slideshowInterval;

// Custom Slideshow Data: REPLACE THESE WITH YOUR OWN PHOTOS AND CAPTIONS
const slides = [
  { url: "photo1.jpg", caption: "so so so so cute" },
  { url: "photo3.jpg", caption: "look how beautiful it is when we're together" },
  { url: "photo4.jpg", caption: "being with you will always be the best feeling" },
  { url: "photo5.jpg", caption: "you're my home" },
  { url: "photo6.jpg", caption: "ikaw lang palagi!"},
  { url: "photo7.jpg", caption: "mahal na mahal kita"},
  { url: "photo8.jpg", caption: "it will always be you"},
  { url: "photo10.jpg", caption: "sobrang ganda mo!"},
  { url: "photo11.jpg", caption: "napakaganda!"}

  // Add more slides here!
];


function showSlides() {
  // Fade out
  slideshowImage.style.opacity = 0;
  
  // Change content after fade out
  setTimeout(() => {
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    
    const currentSlide = slides[slideIndex - 1];
    slideshowImage.src = currentSlide.url;
    slideshowCaption.textContent = currentSlide.caption;
    
    // Fade in
    slideshowImage.style.opacity = 1;
    
  }, 1000); // 1 second for the fade transition
}

window.changeSlide = function(n) {
  // Stop the automatic cycle when manual controls are used
  clearInterval(slideshowInterval);
  slideIndex += n - 1;
  showSlides();
  
  // Resume the slideshow after a manual click
  slideshowInterval = setInterval(showSlides, 5000); // Resume automatic 5-second cycle
}

function startSlideshow() {
  // Initialize the slideshow only once
  if (slides.length > 0 && !slideshowInterval) {
    slideIndex = 0;
    
    slideshowImage.src = slides[0].url;
    slideshowCaption.textContent = slides[0].caption;
    slideshowImage.style.opacity = 1;
    
    slideshowInterval = setInterval(showSlides, 5000);
  }
}
