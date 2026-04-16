/**
 * Emilio's Garage - Core Logic
 * Handles language switching and UI state.
 */

function setLang(lang) {
  // 1. Update the button styles
  // We look for all buttons and highlight the one that matches the chosen language
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 2. Set the global language attribute
  document.documentElement.lang = lang;

  // 3. Update the content
  const t = translations[lang];
  if (!t) return;

  // We only target elements with the [data-i18n] attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    
    if (t[key] !== undefined) {
      // If the translation contains a <span> (like the hero title), we use innerHTML
      if (t[key].includes('<span')) {
        el.innerHTML = t[key];
      } 
      // Otherwise, we use textContent for security and performance
      else {
        el.textContent = t[key];
      }
    }
  });

  // 4. Remember the choice for next time
  localStorage.setItem('emilios_garage_lang', lang);
}

// When the page loads, check for a saved language or default to Spanish
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('emilios_garage_lang') || 'es';
  setLang(savedLang);
});