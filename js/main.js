// This file contains JavaScript code for handling dynamic behavior and localization.

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed.");

    // --- Embedded Translations ---
    const translationsData = {
        en: {
            "menuHome": "Home",
            "menuPage1": "Page 1",
            "menuPage2": "Page 2",
            "menuPage3": "Page 3", // New
            "pageTitleIndex": "Landing Page",
            "pageTitlePage1": "Page 1",
            "pageTitlePage2": "Page 2",
            "pageTitlePage3": "Interest Calculator", // New
            "headingIndex": "Click a menu item at the top",
            "headingPage1": "Hello world.",
            "headingPage2": "Hello world 2",
            "headingPage3": "Interest Calculator", // New
            "paragraphIndex": "This is the landing page content.",
            "paragraphPage1": "This is the content for Page 1.",
            "paragraphPage2": "This is the content for Page 2.",
            // Calculator translations - EN
            "loanTypeLabel": "Loan Type:",
            "loanTypeAnnuity": "Annuity",
            "loanTypeSerial": "Serial",
            "amountLabel": "Amount Borrowed:",
            "rateLabel": "Interest Rate (%):",
            "termLabel": "Down Payment Term:",
            "termYears": "Years",
            "termMonths": "Months",
            "feeLabel": "Monthly Handling Fee:",
            "calculateButton": "Calculate",
            "resultsHeading": "Results",
            "resultsTotalPaid": "Total Amount Paid:",
            "resultsTotalInterest": "Total Interest Paid:",
            "resultsTotalDownPayment": "Total Down Payments:",
            "resultsTotalFees": "Total Handling Fees:",
            "resultsPayoffDate": "Payoff Date:",
            "payoffDateFormat": "{month} {year}" // Format for date display
        },
        no: {
            "menuHome": "Hjem",
            "menuPage1": "Side 1",
            "menuPage2": "Side 2",
            "menuPage3": "Side 3", // New
            "pageTitleIndex": "Landingsside",
            "pageTitlePage1": "Side 1",
            "pageTitlePage2": "Side 2",
            "pageTitlePage3": "Rentekalkulator", // New
            "headingIndex": "Klikk på et menyelement øverst",
            "headingPage1": "Hallo verden.",
            "headingPage2": "Hallo verden 2",
            "headingPage3": "Rentekalkulator", // New
            "paragraphIndex": "Dette er innholdet på landingssiden.",
            "paragraphPage1": "Dette er innholdet for Side 1.",
            "paragraphPage2": "Dette er innholdet for Side 2.",
            // Calculator translations - NO
            "loanTypeLabel": "Lånetype:",
            "loanTypeAnnuity": "Annuitet",
            "loanTypeSerial": "Serie",
            "amountLabel": "Lånebeløp:",
            "rateLabel": "Rente (%):",
            "termLabel": "Nedbetalingstid:",
            "termYears": "År",
            "termMonths": "Måneder",
            "feeLabel": "Månedlig gebyr:",
            "calculateButton": "Beregn",
            "resultsHeading": "Resultater",
            "resultsTotalPaid": "Totalt betalt:",
            "resultsTotalInterest": "Totale renter:",
            "resultsTotalDownPayment": "Totale avdrag:",
            "resultsTotalFees": "Totale gebyrer:",
            "resultsPayoffDate": "Nedbetalt dato:",
            "payoffDateFormat": "{month} {year}" // Format for date display (can be localized further if needed)
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

    // --- Interest Calculator Logic ---
    const calculatorForm = document.getElementById('calculator-form');
    if (calculatorForm) {
        const calculateBtn = document.getElementById('calculate-btn');
        const amountInput = document.getElementById('amount');
        const rateInput = document.getElementById('rate');
        const yearsInput = document.getElementById('years');
        const monthsInput = document.getElementById('months');
        const feeInput = document.getElementById('fee');
        const loanTypeInputs = document.querySelectorAll('input[name="loanType"]');

        const totalPaidEl = document.getElementById('total-paid');
        const totalInterestEl = document.getElementById('total-interest');
        const totalDownPaymentEl = document.getElementById('total-down-payment');
        const totalFeesEl = document.getElementById('total-fees');
        const payoffDateEl = document.getElementById('payoff-date');

        calculateBtn.addEventListener('click', () => {
            console.log("Calculate button clicked.");

            // Get and validate inputs
            const loanType = document.querySelector('input[name="loanType"]:checked').value;
            const principal = parseFloat(amountInput.value) || 0;
            const annualRate = parseFloat(rateInput.value) || 0;
            const years = parseInt(yearsInput.value) || 0;
            const months = parseInt(monthsInput.value) || 0;
            const monthlyFee = parseFloat(feeInput.value) || 0;

            const monthlyRate = annualRate / 100 / 12;
            const totalMonths = years * 12 + months;

            let totalPaid = 0;
            let totalInterest = 0;
            let totalFees = 0;
            let payoffDate = new Date();

            if (principal <= 0 || totalMonths <= 0 || annualRate < 0 || monthlyFee < 0) {
                console.warn("Invalid input values for calculation.");
                // Optionally display an error message to the user
                totalPaidEl.textContent = '0';
                totalInterestEl.textContent = '0';
                totalDownPaymentEl.textContent = '0';
                totalFeesEl.textContent = '-';
                payoffDateEl.textContent = '-';
                return;
            }

            totalFees = monthlyFee * totalMonths;

            if (loanType === 'annuity') {
                if (monthlyRate > 0) {
                    const monthlyPaymentRaw = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
                    const monthlyPaymentWithFee = monthlyPaymentRaw + monthlyFee;
                    totalPaid = monthlyPaymentWithFee * totalMonths;
                    totalInterest = totalPaid - principal - totalFees;
                } else { // Handle 0% interest rate
                    const monthlyPaymentRaw = principal / totalMonths;
                    const monthlyPaymentWithFee = monthlyPaymentRaw + monthlyFee;
                    totalPaid = monthlyPaymentWithFee * totalMonths;
                    totalInterest = 0;
                }
            } else if (loanType === 'serial') {
                let remainingPrincipal = principal;
                const monthlyDownPayment = principal / totalMonths;
                totalInterest = 0;
                for (let i = 0; i < totalMonths; i++) {
                    const interestPayment = remainingPrincipal * monthlyRate;
                    totalInterest += interestPayment;
                    remainingPrincipal -= monthlyDownPayment;
                }
                totalPaid = principal + totalInterest + totalFees;
            }

            // Calculate payoff date
            if (totalMonths > 0) {
                payoffDate.setMonth(payoffDate.getMonth() + totalMonths);
                // Format date based on locale (simple example)
                const currentTranslations = getTranslations(currentLang);
                const monthNames = currentLang === 'no'
                    ? ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"]
                    : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const formattedDate = (currentTranslations.payoffDateFormat || "{month} {year}")
                    .replace("{month}", monthNames[payoffDate.getMonth()])
                    .replace("{year}", payoffDate.getFullYear());
                payoffDateEl.textContent = formattedDate;
            } else {
                payoffDateEl.textContent = '-';
            }

            // Display results (formatted to 2 decimal places)
            const formatNumber = (num) => num.toLocaleString(currentLang === 'no' ? 'nb-NO' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            totalPaidEl.textContent = formatNumber(totalPaid);
            totalInterestEl.textContent = formatNumber(totalInterest);
            totalDownPaymentEl.textContent = formatNumber(principal); // Total down payment is always the principal
            totalFeesEl.textContent = formatNumber(totalFees);

            console.log("Calculation complete. Results updated.");
        });
    } else {
        console.log("Calculator form not found on this page.");
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
