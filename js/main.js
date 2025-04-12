// This file contains JavaScript code for handling dynamic behavior and localization.

document.addEventListener('DOMContentLoaded', async function() {
    const supportedLangs = ['en', 'no'];
    const langSelector = document.getElementById('language-selector');
    const storageKey = 'userLanguage';

    // --- Language Detection and Selection ---
    function getSelectedLanguage() {
        // 1. Check localStorage
        const storedLang = localStorage.getItem(storageKey);
        if (storedLang && supportedLangs.includes(storedLang)) {
            console.log("Language found in localStorage:", storedLang);
            return storedLang;
        }

        // 2. Check browser language
        let browserLang = navigator.language || navigator.userLanguage;
        browserLang = browserLang.split('-')[0];
        console.log("Browser language detected:", browserLang);
        if (supportedLangs.includes(browserLang)) {
            return browserLang;
        }

        // 3. Default to 'en'
        console.log("Defaulting to language: en");
        return 'en';
    }

    let currentLang = getSelectedLanguage();

    // Set dropdown to the current language
    if (langSelector) {
        langSelector.value = currentLang;
    }

    // --- Translation Loading and Application ---
    async function loadTranslations(language) {
        console.log(`Attempting to load translations for: ${language}`);
        try {
            // Add cache busting query parameter to ensure fresh file is fetched
            const response = await fetch(`lang/${language}.json?v=${Date.now()}`);
            if (!response.ok) {
                console.warn(`Translation file for ${language} not found, status: ${response.status}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const translations = await response.json();
            console.log(`Translations loaded successfully for: ${language}`);
            return translations;
        } catch (error) {
            console.error("Could not load translation file:", error);
            // Fallback to English if loading fails
            if (language !== 'en') {
                console.log("Falling back to English translations.");
                return await loadTranslations('en');
            }
            return {}; // Return empty object if English also fails
        }
    }

    function applyTranslations(translations, language) {
        console.log(`Applying translations for: ${language}`);
        let translationApplied = false;
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (translations[key]) {
                if (element.tagName === 'TITLE') {
                    document.title = translations[key];
                } else {
                    element.textContent = translations[key];
                }
                translationApplied = true;
            } else {
                console.warn(`Translation key "${key}" not found for language "${language}".`);
            }
        });
        if (translationApplied) {
            console.log("Translations applied successfully.");
        } else {
            console.warn("No translations were applied. Check keys and file content.");
        }
        document.documentElement.lang = language;
    }

    // Function to handle language change
    async function changeLanguage(newLang) {
        if (supportedLangs.includes(newLang)) {
            console.log(`Changing language to: ${newLang}`);
            localStorage.setItem(storageKey, newLang); // Store preference
            currentLang = newLang;
            const newTranslations = await loadTranslations(currentLang);
            applyTranslations(newTranslations, currentLang);
            // Update dropdown value just in case it was changed programmatically
            if (langSelector) {
                langSelector.value = currentLang;
            }
            // Re-apply active menu state if needed (usually not necessary unless menu text changes affect identification)
            updateMenuActiveState();
        } else {
            console.warn(`Unsupported language selected: ${newLang}`);
        }
    }

    // Initial load
    const initialTranslations = await loadTranslations(currentLang);
    applyTranslations(initialTranslations, currentLang);

    // --- Event Listener for Language Selector ---
    if (langSelector) {
        langSelector.addEventListener('change', function() {
            changeLanguage(this.value); // Call the dynamic change function
        });
    }

    // --- Menu Active State Logic ---
    function updateMenuActiveState() {
        const menuItems = document.querySelectorAll('.menu-item');
        // Use location.pathname which includes the leading slash, or handle root case
        let currentPath = window.location.pathname;
        // If path is just '/', treat it as index.html for comparison
        if (currentPath === '/') {
            currentPath = '/index.html';
        }
        // Get the filename part for comparison
        const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

        console.log(`Updating active menu state for path: ${currentFile}`);

        menuItems.forEach(item => {
            const itemHref = item.getAttribute('href');
            const itemFile = itemHref.split('/').pop() || 'index.html'; // Handle relative paths

            item.classList.remove('active');
            if (currentFile === itemFile) {
                item.classList.add('active');
                console.log(`Active menu item set to: ${itemHref}`);
            }
        });
    }
    updateMenuActiveState(); // Initial call

    // --- Adjust Body Padding ---
    const menuBar = document.querySelector('.menu-bar');
    function adjustBodyPadding() {
        if (menuBar) {
            const menuHeight = menuBar.offsetHeight;
            document.body.style.paddingTop = menuHeight + 'px';
        }
    }

    adjustBodyPadding();
    window.addEventListener('resize', adjustBodyPadding);
});
