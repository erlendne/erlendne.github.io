// This file contains JavaScript code for handling dynamic behavior and localization.

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed."); // Log DOM ready

    const supportedLangs = ['en', 'no'];
    const langSelector = document.getElementById('language-selector');
    const storageKey = 'userLanguage';

    // --- Language Detection and Selection ---
    function getSelectedLanguage() {
        // 1. Check localStorage
        const storedLang = localStorage.getItem(storageKey);
        if (storedLang && supportedLangs.includes(storedLang)) {
            console.log(`Language found in localStorage: ${storedLang}`);
            return storedLang;
        }

        // 2. Check browser language
        let browserLang = (navigator.language || navigator.userLanguage || 'en').split('-')[0];
        console.log(`Browser language detected: ${browserLang}`);
        if (supportedLangs.includes(browserLang)) {
            return browserLang;
        }

        // 3. Default to 'en'
        console.log("Defaulting to language: en");
        return 'en';
    }

    let currentLang = getSelectedLanguage();
    console.log(`Initial language set to: ${currentLang}`);

    // Set dropdown to the current language
    if (langSelector) {
        langSelector.value = currentLang;
        console.log(`Language selector dropdown value set to: ${currentLang}`);
    } else {
        console.error("Language selector element not found!");
    }

    // --- Translation Loading ---
    async function loadTranslations(language) {
        console.log(`Attempting to load translations for: ${language}`);
        const url = `lang/${language}.json?v=${Date.now()}`; // Cache busting
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} for ${url}`);
            }
            const translations = await response.json();
            console.log(`Translations loaded successfully for: ${language}`, translations);
            return translations;
        } catch (error) {
            console.error(`Could not load translation file from ${url}:`, error);
            // Fallback to English if loading fails for the selected language
            if (language !== 'en') {
                console.warn("Falling back to English translations.");
                return await loadTranslations('en');
            }
            return {}; // Return empty object if English also fails
        }
    }

    // --- Translation Application ---
    function applyTranslations(translations, language) {
        console.log(`Applying translations for: ${language}`);
        if (!translations || Object.keys(translations).length === 0) {
             console.error(`No translations provided or translations object is empty for ${language}. Cannot apply.`);
             return;
        }
        let appliedCount = 0;
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (translations[key] !== undefined) { // Check if key exists
                if (element.tagName === 'TITLE') {
                    document.title = translations[key];
                } else {
                    element.textContent = translations[key];
                }
                appliedCount++;
            } else {
                console.warn(`Translation key "${key}" not found in loaded translations for language "${language}".`);
            }
        });
        console.log(`Applied ${appliedCount} translations.`);
        document.documentElement.lang = language; // Set HTML lang attribute
    }

    // --- Language Change Handler ---
    async function handleLanguageChange(newLang) {
        if (!supportedLangs.includes(newLang)) {
            console.warn(`Unsupported language selected: ${newLang}. Ignoring change.`);
            // Optionally reset dropdown to currentLang if needed
            if(langSelector) langSelector.value = currentLang;
            return;
        }

        if (newLang === currentLang) {
            console.log(`Language ${newLang} is already selected. No change needed.`);
            return;
        }

        console.log(`Changing language from ${currentLang} to: ${newLang}`);
        currentLang = newLang; // Update the current language state
        localStorage.setItem(storageKey, currentLang); // Store preference
        console.log(`Stored language preference: ${currentLang}`);

        // Load and apply the new translations
        const newTranslations = await loadTranslations(currentLang);
        applyTranslations(newTranslations, currentLang);

        // Update dropdown value (redundant if triggered by user change, but good practice)
        if (langSelector) {
            langSelector.value = currentLang;
        }

        // Re-apply active menu state if needed
        updateMenuActiveState();
    }

    // --- Initialize Page ---
    async function initializePage() {
        console.log("Initializing page...");
        const initialTranslations = await loadTranslations(currentLang);
        applyTranslations(initialTranslations, currentLang);
        updateMenuActiveState(); // Set active menu item
        adjustBodyPadding(); // Adjust padding below fixed menu
        console.log("Page initialization complete.");
    }

    // --- Event Listener for Language Selector ---
    if (langSelector) {
        langSelector.addEventListener('change', function(event) {
            console.log(`Language selector changed to: ${event.target.value}`);
            handleLanguageChange(event.target.value);
        });
    }

    // --- Menu Active State Logic ---
    function updateMenuActiveState() {
        const menuItems = document.querySelectorAll('.menu-item');
        let currentPath = window.location.pathname;
        if (currentPath === '/') {
            currentPath = '/index.html';
        }
        const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
        console.log(`Updating active menu state for path: ${currentFile}`);
        menuItems.forEach(item => {
            const itemHref = item.getAttribute('href');
            const itemFile = itemHref ? (itemHref.split('/').pop() || 'index.html') : '';
            item.classList.remove('active');
            if (itemFile && currentFile === itemFile) {
                item.classList.add('active');
                console.log(`Active menu item set to: ${itemHref}`);
            }
        });
    }

    // --- Adjust Body Padding ---
    const menuBar = document.querySelector('.menu-bar');
    function adjustBodyPadding() {
        if (menuBar) {
            const menuHeight = menuBar.offsetHeight;
            document.body.style.paddingTop = menuHeight + 'px';
            console.log(`Body padding top set to: ${menuHeight}px`);
        } else {
            console.warn("Menu bar element not found for padding adjustment.");
        }
    }

    // Initialize after DOM is ready
    initializePage();

    // Adjust padding on resize
    window.addEventListener('resize', adjustBodyPadding);
});
