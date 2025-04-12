// This file contains JavaScript code for handling dynamic behavior and localization.

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed.");

    // --- Embedded Translations ---
    const translationsData = {
        en: {
            "menuHome": "Home",
            "menuPage1": "Page 1",
            "menuPage2": "Page 2",
            "pageTitleIndex": "Landing Page",
            "pageTitlePage1": "Page 1",
            "pageTitlePage2": "Page 2",
            "headingIndex": "Click a menu item at the top",
            "headingPage1": "Hello world.",
            "headingPage2": "Hello world 2",
            "paragraphIndex": "This is the landing page content.",
            "paragraphPage1": "This is the content for Page 1.",
            "paragraphPage2": "This is the content for Page 2."
        },
        no: {
            "menuHome": "Hjem",
            "menuPage1": "Side 1",
            "menuPage2": "Side 2",
            "pageTitleIndex": "Landingsside",
            "pageTitlePage1": "Side 1",
            "pageTitlePage2": "Side 2",
            "headingIndex": "Klikk på et menyelement øverst",
            "headingPage1": "Hallo verden.",
            "headingPage2": "Hallo verden 2",
            "paragraphIndex": "Dette er innholdet på landingssiden.",
            "paragraphPage1": "Dette er innholdet for Side 1.",
            "paragraphPage2": "Dette er innholdet for Side 2."
        }
    };

    const supportedLangs = Object.keys(translationsData); // ['en', 'no']
    const langSelector = document.getElementById('language-selector');
    const storageKey = 'userLanguage';
    const hamburgerBtn = document.querySelector('.hamburger-menu'); // Get hamburger button
    const navContent = document.querySelector('.nav-content'); // Get the container to toggle

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

    // --- Translation Loading (Now just retrieves from embedded object) ---
    function getTranslations(language) {
        console.log(`Retrieving translations for: ${language}`);
        const translations = translationsData[language];
        if (translations) {
            console.log(`Translations retrieved successfully for: ${language}`);
            return translations;
        } else {
            console.warn(`No embedded translations found for language: ${language}. Falling back to 'en'.`);
            return translationsData['en'] || {}; // Fallback to English or empty
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
    function handleLanguageChange(newLang) {
        if (!supportedLangs.includes(newLang)) {
            console.warn(`Unsupported language selected: ${newLang}. Ignoring change.`);
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

        // Get and apply the new translations from the embedded object
        const newTranslations = getTranslations(currentLang);
        applyTranslations(newTranslations, currentLang);

        // Update dropdown value
        if (langSelector) {
            langSelector.value = currentLang;
        }

        // Re-apply active menu state if needed
        updateMenuActiveState();
    }

    // --- Hamburger Menu Toggle ---
    if (hamburgerBtn && navContent) {
        hamburgerBtn.addEventListener('click', () => {
            console.log("Hamburger button clicked.");
            const isOpen = navContent.classList.toggle('mobile-menu-open');
            hamburgerBtn.classList.toggle('open', isOpen); // Toggle class on button for animation
            hamburgerBtn.setAttribute('aria-expanded', isOpen); // Update accessibility attribute
            console.log(`Mobile menu is now ${isOpen ? 'open' : 'closed'}.`);
            // Optional: Prevent body scroll when menu is open
            // document.body.style.overflow = isOpen ? 'hidden' : '';
        });
    } else {
        console.warn("Hamburger button or nav content element not found.");
    }

    // --- Initialize Page ---
    function initializePage() {
        console.log("Initializing page...");
        const initialTranslations = getTranslations(currentLang);
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
        if (currentPath === '/' || currentPath === '') {
            const pathParts = window.location.href.split('/');
            currentPath = pathParts[pathParts.length - 1] || 'index.html';
            if (currentPath.includes('?')) currentPath = currentPath.split('?')[0];
        } else {
            currentPath = currentPath.substring(currentPath.lastIndexOf('/') + 1);
        }
        const currentFile = currentPath || 'index.html';

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
