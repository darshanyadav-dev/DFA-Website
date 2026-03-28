/* ============================================================
   DIGITAL FARM ASSISTANT — script.js
   Topics used (from syllabus):
     - HTML DOM manipulation
     - JavaScript events (click, scroll)
     - Form validation
     - Functions & variables
     - Browser object (window.scrollY)
     - Conditional logic
   ============================================================ */

/* ----------------------------------------------------------
   1. NAVBAR — shrink on scroll (DOM + Browser Object)
---------------------------------------------------------- */
window.addEventListener('scroll', function () {
  var nav = document.getElementById('mainNav');
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});


/* ----------------------------------------------------------
   2. SMOOTH SCROLLING for nav links (Events + DOM)
---------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var offset = 70; // navbar height
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });

      // Close mobile menu if open
      var navMenu = document.getElementById('navMenu');
      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
      }
    }
  });
});


/* ----------------------------------------------------------
   3. WEATHER CHECK — simulated weather data (DOM + Events)
---------------------------------------------------------- */

// Array of simulated weather scenarios
var weatherScenarios = [
  {
    icon:      '☀️',
    condition: 'Clear & Sunny',
    location:  'Farm Region, India',
    temp:      '32°C',
    humidity:  '45%',
    wind:      '12 km/h',
    rain:      '0 mm',
    advice:    '✅ Perfect day for irrigation and field inspection. Ensure crops are well watered in the afternoon heat.'
  },
  {
    icon:      '🌧️',
    condition: 'Heavy Rain',
    location:  'Farm Region, India',
    temp:      '21°C',
    humidity:  '88%',
    wind:      '25 km/h',
    rain:      '38 mm',
    advice:    '⚠️ Skip irrigation today. Heavy rain expected — check drainage channels and protect seedlings from waterlogging.'
  },
  {
    icon:      '⛅',
    condition: 'Partly Cloudy',
    location:  'Farm Region, India',
    temp:      '27°C',
    humidity:  '62%',
    wind:      '18 km/h',
    rain:      '5 mm',
    advice:    '🌱 Ideal conditions for sowing and fertilizer application. Mild cloud cover keeps temperatures moderate.'
  },
  {
    icon:      '🌩️',
    condition: 'Thunderstorms',
    location:  'Farm Region, India',
    temp:      '23°C',
    humidity:  '79%',
    wind:      '40 km/h',
    rain:      '55 mm',
    advice:    '🚨 Stay indoors. Avoid operating heavy farm machinery. Secure loose equipment and cover vulnerable crops.'
  },
  {
    icon:      '🌤️',
    condition: 'Mostly Clear',
    location:  'Farm Region, India',
    temp:      '29°C',
    humidity:  '54%',
    wind:      '10 km/h',
    rain:      '2 mm',
    advice:    '🌾 Great day for harvesting and crop management. Low winds and good visibility make field work comfortable.'
  }
];

// checkWeather function — triggered by button click
function checkWeather() {
  var btn = document.getElementById('weatherBtn');
  var result = document.getElementById('weatherResult');

  // Button loading state
  btn.textContent = '⏳ Fetching data...';
  btn.disabled = true;

  // Simulate a brief loading delay (like an API call)
  setTimeout(function () {

    // Pick a random weather scenario
    var scenario = weatherScenarios[Math.floor(Math.random() * weatherScenarios.length)];

    // Populate DOM elements with scenario data
    document.getElementById('weatherIcon').textContent      = scenario.icon;
    document.getElementById('weatherCondition').textContent = scenario.condition;
    document.getElementById('weatherLocation').textContent  = scenario.location;
    document.getElementById('weatherTemp').textContent      = scenario.temp;
    document.getElementById('weatherHumidity').textContent  = scenario.humidity;
    document.getElementById('weatherWind').textContent      = scenario.wind;
    document.getElementById('weatherRain').textContent      = scenario.rain;
    document.getElementById('weatherAdvice').textContent    = scenario.advice;

    // Show the result card
    result.style.display = 'block';

    // Reset button
    btn.textContent = '🔄 Refresh Weather';
    btn.disabled = false;

  }, 1200);
}


/* ----------------------------------------------------------
   4. CONTACT FORM VALIDATION (DOM + Events + Validation)
---------------------------------------------------------- */

function submitForm() {
  // Get field values (trimmed)
  var name    = document.getElementById('contactName').value.trim();
  var email   = document.getElementById('contactEmail').value.trim();
  var message = document.getElementById('contactMessage').value.trim();
  var alert   = document.getElementById('formAlert');

  // --- Validation checks ---

  // Check: all fields filled
  if (name === '' || email === '' || message === '') {
    showAlert(alert, 'error', '❌ Please fill in all fields before submitting.');
    return;
  }

  // Check: name at least 2 characters
  if (name.length < 2) {
    showAlert(alert, 'error', '❌ Please enter a valid name (at least 2 characters).');
    return;
  }

  // Check: valid email format using a simple regex
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showAlert(alert, 'error', '❌ Please enter a valid email address.');
    return;
  }

  // Check: message at least 10 characters
  if (message.length < 10) {
    showAlert(alert, 'error', '❌ Your message is too short. Please write at least 10 characters.');
    return;
  }

  // --- All validations passed ---
  showAlert(
    alert,
    'success',
    '✅ Thank you, ' + name + '! Your message has been sent successfully. We will get back to you shortly.'
  );

  // Clear the form fields
  document.getElementById('contactName').value    = '';
  document.getElementById('contactEmail').value   = '';
  document.getElementById('contactMessage').value = '';
}

// Helper: show an alert message in the form
function showAlert(element, type, message) {
  element.className = 'form-alert ' + type; // sets .success or .error class
  element.textContent = message;
  element.style.display = 'block';

  // Auto-hide after 5 seconds
  setTimeout(function () {
    element.style.display = 'none';
  }, 5000);
}


/* ----------------------------------------------------------
   5. SCROLL ANIMATION — fade-in crop cards on scroll
      (Browser Object: IntersectionObserver / window.scrollY)
---------------------------------------------------------- */
function revealOnScroll() {
  var cards = document.querySelectorAll('.crop-card, .contact-form-wrap');
  cards.forEach(function (card) {
    var cardTop = card.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;
    if (cardTop < windowHeight - 60) {
      card.style.opacity   = '1';
      card.style.transform = 'translateY(0)';
    }
  });
}

// Set initial hidden state for cards
window.addEventListener('load', function () {
  var cards = document.querySelectorAll('.crop-card, .contact-form-wrap');
  cards.forEach(function (card) {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(40px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  revealOnScroll(); // check immediately on load
});

// Listen for scroll to trigger reveal
window.addEventListener('scroll', revealOnScroll);
