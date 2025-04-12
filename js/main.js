// This file contains JavaScript code for handling dynamic behavior and localization.

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed.");

    // --- Embedded Translations ---
    const translationsData = {
        en: {
            "menuHome": "Home",
            "menuAbout": "About", // Renamed from menuPage1
            "menuInterestCalc": "Interest Calc", // Renamed from menuPage3
            "pageTitleIndex": "SynDrm | Welcome", // Updated
            "pageTitleAbout": "SynDrm | About This Site", // Updated
            "pageTitleInterestCalc": "SynDrm | Interest Calculator", // Updated
            "headingIndex": "Welcome to Syntax Dreamer", // Updated
            "headingAbout": "About This Site", // Renamed from headingPage1
            "headingInterestCalc": "Interest Calculator", // Renamed from headingPage3
            // About Page Content - EN
            "aboutParagraph1": "This is a test page created just for fun by Syntax Dreamer.", // Updated
            "aboutParagraph2": "It demonstrates a simple multi-page website structure with features like a persistent navigation menu, language switching (English/Norwegian), and a basic interest calculator.",
            "aboutParagraph3": "The site was developed using HTML, CSS, and JavaScript, leveraging tools like GitHub for version control and GitHub Copilot for assistance during development.",
            "disclaimerHeading": "Disclaimer",
            "disclaimerParagraph1": "The information and tools provided on this website, including the interest calculator, are for informational and illustrative purposes only. They are provided \"as is\" without warranty of any kind, express or implied.",
            "disclaimerParagraph2": "The author (Syntax Dreamer) takes no responsibility for any errors or omissions in the content or calculations, nor for any actions taken based on the information provided. Users are solely responsible for verifying the accuracy and applicability of any information or calculation results before making any financial decisions.", // Updated
            "disclaimerParagraph3": "By using this website, you agree that the author shall not be liable for any financial loss, damages, or other negative consequences arising from your use of this site or reliance on its content. Use this website entirely at your own risk.",
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
            "extraPaymentLabel": "Extra Down Payment (Optional):", // New
            "calculateButton": "Calculate",
            "resultsHeading": "Results (Without Extra Payment)", // Updated
            "resultsTotalPaid": "Total Amount Paid:",
            "resultsTotalInterest": "Total Interest Paid:",
            "resultsTotalDownPayment": "Total Down Payments:",
            "resultsTotalFees": "Total Handling Fees:",
            "resultsPayoffDate": "Original Payoff Date:", // Updated
            "payoffDateFormat": "{month} {year}",
            "savingsHeading": "Savings with Extra Payment", // New
            "savingsInterestSaved": "Interest Saved:", // New
            "savingsTotalPaidNew": "New Total Amount Paid:", // New
            "savingsPayoffDateNew": "New Payoff Date:", // New
            "savingsTermShortened": "Term Shortened By:", // New
            "termShortenedFormat": "{years} years, {months} months" // New format string
        },
        no: {
            "menuHome": "Hjem",
            "menuAbout": "Om", // Renamed from menuPage1
            "menuInterestCalc": "Rentekalk", // Renamed from menuPage3
            "pageTitleIndex": "SynDrm | Velkommen", // Updated
            "pageTitleAbout": "SynDrm | Om Denne Siden", // Updated
            "pageTitleInterestCalc": "SynDrm | Rentekalkulator", // Updated
            "headingIndex": "Velkommen til Syntax Dreamer", // Updated
            "headingAbout": "Om Denne Siden", // Renamed from headingPage1
            "headingInterestCalc": "Rentekalkulator", // Renamed from headingPage3
            // About Page Content - NO
            "aboutParagraph1": "Dette er en testside laget kun for moro skyld av Syntax Dreamer.", // Updated
            "aboutParagraph2": "Den demonstrerer en enkel nettstedstruktur med flere sider, med funksjoner som en vedvarende navigasjonsmeny, språkbytte (engelsk/norsk) og en grunnleggende rentekalkulator.",
            "aboutParagraph3": "Nettstedet ble utviklet med HTML, CSS og JavaScript, ved hjelp av verktøy som GitHub for versjonskontroll og GitHub Copilot for assistanse under utviklingen.",
            "disclaimerHeading": "Ansvarsfraskrivelse",
            "disclaimerParagraph1": "Informasjonen og verktøyene som tilbys på dette nettstedet, inkludert rentekalkulatoren, er kun ment for informasjons- og illustrasjonsformål. De leveres \"som de er\" uten noen form for garanti, verken uttrykt eller underforstått.",
            "disclaimerParagraph2": "Forfatteren (Syntax Dreamer) tar intet ansvar for eventuelle feil eller mangler i innholdet eller beregningene, eller for handlinger som er basert på informasjonen som er gitt. Brukere er selv ansvarlige for å verifisere nøyaktigheten og anvendeligheten av all informasjon eller beregningsresultater før de tar økonomiske beslutninger.", // Updated
            "disclaimerParagraph3": "Ved å bruke dette nettstedet godtar du at forfatteren ikke skal holdes ansvarlig for økonomisk tap, skader eller andre negative konsekvenser som følge av din bruk av nettstedet eller tillit til innholdet. Bruk dette nettstedet helt på egen risiko.",
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
            "extraPaymentLabel": "Ekstra nedbetaling (Valgfritt):", // New
            "calculateButton": "Beregn",
            "resultsHeading": "Resultater (Uten ekstra nedbetaling)", // Updated
            "resultsTotalPaid": "Totalt betalt:",
            "resultsTotalInterest": "Totale renter:",
            "resultsTotalDownPayment": "Totale avdrag:",
            "resultsTotalFees": "Totale gebyrer:",
            "resultsPayoffDate": "Opprinnelig nedbetalt dato:", // Updated
            "payoffDateFormat": "{month} {year}",
            "savingsHeading": "Besparelser med ekstra nedbetaling", // New
            "savingsInterestSaved": "Renter spart:", // New
            "savingsTotalPaidNew": "Nytt totalt betalt beløp:", // New
            "savingsPayoffDateNew": "Ny nedbetalt dato:", // New
            "savingsTermShortened": "Nedbetalingstid redusert med:", // New
            "termShortenedFormat": "{years} år, {months} måneder" // New format string
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
        const extraPaymentInput = document.getElementById('extra-payment'); // New input element
        const loanTypeInputs = document.querySelectorAll('input[name="loanType"]');

        // Original results elements
        const totalPaidEl = document.getElementById('total-paid');
        const totalInterestEl = document.getElementById('total-interest');
        const totalDownPaymentEl = document.getElementById('total-down-payment');
        const totalFeesEl = document.getElementById('total-fees');
        const payoffDateEl = document.getElementById('payoff-date');

        // Savings results elements
        const savingsResultsEl = document.getElementById('savings-results'); // Container
        const interestSavedEl = document.getElementById('interest-saved');
        const totalPaidNewEl = document.getElementById('total-paid-new');
        const payoffDateNewEl = document.getElementById('payoff-date-new');
        const termShortenedEl = document.getElementById('term-shortened');

        // Helper function to format numbers
        const formatNumber = (num) => num.toLocaleString(currentLang === 'no' ? 'nb-NO' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        // Helper function to format date
        const formatDate = (date) => {
             if (!(date instanceof Date) || isNaN(date)) return '-';
             const currentTranslations = getTranslations(currentLang);
             const monthNames = currentLang === 'no'
                 ? ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"]
                 : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
             return (currentTranslations.payoffDateFormat || "{month} {year}")
                 .replace("{month}", monthNames[date.getMonth()])
                 .replace("{year}", date.getFullYear());
        };

        // Helper function to format term difference
        const formatTermDifference = (monthsDifference) => {
            if (monthsDifference <= 0) return '-';
            const years = Math.floor(monthsDifference / 12);
            const months = monthsDifference % 12;
            const currentTranslations = getTranslations(currentLang);
            return (currentTranslations.termShortenedFormat || "{years} years, {months} months")
                .replace("{years}", years)
                .replace("{months}", months);
        };

        // Main calculation function (refactored)
        function calculateLoanDetails(principal, annualRate, totalMonths, monthlyFee, loanType) {
            const monthlyRate = annualRate / 100 / 12;
            let totalPaid = 0;
            let totalInterest = 0;
            let totalFees = 0;
            let actualTotalMonths = totalMonths; // May change for serial if principal is low

            if (principal <= 0 || totalMonths <= 0) {
                return { totalPaid: 0, totalInterest: 0, totalFees: 0, payoffDate: null, actualTotalMonths: 0 };
            }

            totalFees = monthlyFee * totalMonths;

            if (loanType === 'annuity') {
                if (monthlyRate > 0) {
                    // Calculate monthly payment (principal + interest)
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
                actualTotalMonths = 0; // Recalculate actual months for serial
                for (let i = 0; i < totalMonths && remainingPrincipal > 0.005; i++) { // Loop until principal is near zero
                    const interestPayment = remainingPrincipal * monthlyRate;
                    totalInterest += interestPayment;
                    const currentDownPayment = Math.min(monthlyDownPayment, remainingPrincipal); // Ensure last payment isn't too large
                    remainingPrincipal -= currentDownPayment;
                    actualTotalMonths++;
                }
                 // Recalculate fees based on actual months
                totalFees = monthlyFee * actualTotalMonths;
                totalPaid = principal + totalInterest + totalFees;
            }

            let payoffDate = null;
            if (actualTotalMonths > 0) {
                payoffDate = new Date();
                payoffDate.setMonth(payoffDate.getMonth() + actualTotalMonths);
            }

            return { totalPaid, totalInterest, totalFees, payoffDate, actualTotalMonths };
        }


        calculateBtn.addEventListener('click', () => {
            console.log("Calculate button clicked.");

            // Get and validate inputs
            const loanType = document.querySelector('input[name="loanType"]:checked').value;
            const principal_orig = parseFloat(amountInput.value) || 0;
            const annualRate = parseFloat(rateInput.value) || 0;
            const years = parseInt(yearsInput.value) || 0;
            const months = parseInt(monthsInput.value) || 0;
            const monthlyFee = parseFloat(feeInput.value) || 0;
            const extraPayment = parseFloat(extraPaymentInput.value) || 0;

            const totalMonths_orig = years * 12 + months;

            // --- Original Calculation ---
            if (principal_orig <= 0 || totalMonths_orig <= 0 || annualRate < 0 || monthlyFee < 0) {
                console.warn("Invalid input values for original calculation.");
                totalPaidEl.textContent = '0';
                totalInterestEl.textContent = '0';
                totalDownPaymentEl.textContent = '0'; // Principal is the total down payment
                totalFeesEl.textContent = '0';
                payoffDateEl.textContent = '-';
                savingsResultsEl.style.display = 'none'; // Hide savings section
                return;
            }

            const originalCalc = calculateLoanDetails(principal_orig, annualRate, totalMonths_orig, monthlyFee, loanType);

            totalPaidEl.textContent = formatNumber(originalCalc.totalPaid);
            totalInterestEl.textContent = formatNumber(originalCalc.totalInterest);
            totalDownPaymentEl.textContent = formatNumber(principal_orig);
            totalFeesEl.textContent = formatNumber(originalCalc.totalFees);
            payoffDateEl.textContent = formatDate(originalCalc.payoffDate);

            // --- Calculation with Extra Payment ---
            if (extraPayment > 0 && extraPayment < principal_orig) {
                const principal_new = principal_orig - extraPayment;

                // For annuity, we keep the original term to see interest savings
                // For serial, the term effectively shortens automatically due to lower principal
                // Let's recalculate for both to find the *actual* new term and savings accurately.
                // We need to find the new term for annuity if we keep the *original* monthly payment amount.

                let newCalc;
                let newTotalMonths = totalMonths_orig; // Start with original term

                if (loanType === 'annuity' && originalCalc.totalInterest > 0) {
                     // Calculate original monthly payment (interest + principal part)
                     const monthlyRate = annualRate / 100 / 12;
                     const originalMonthlyPaymentRaw = principal_orig * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths_orig)) / (Math.pow(1 + monthlyRate, totalMonths_orig) - 1);

                     // Calculate new term with reduced principal but same monthly payment
                     if (originalMonthlyPaymentRaw > principal_new * monthlyRate) { // Ensure payment covers at least interest
                         newTotalMonths = Math.log(originalMonthlyPaymentRaw / (originalMonthlyPaymentRaw - principal_new * monthlyRate)) / Math.log(1 + monthlyRate);
                         newTotalMonths = Math.ceil(newTotalMonths); // Round up to full months
                     } else {
                         // Edge case: payment doesn't cover interest (shouldn't happen with positive rates/principal)
                         // Or if interest rate is 0
                         newTotalMonths = Math.ceil(principal_new / originalMonthlyPaymentRaw);
                     }
                     // Recalculate details with the new principal and potentially shorter term
                     newCalc = calculateLoanDetails(principal_new, annualRate, newTotalMonths, monthlyFee, loanType);

                } else { // Serial loan or 0% interest annuity
                    // For serial, the calculation inherently handles the reduced principal over the original term,
                    // but the actual payoff happens sooner. We use the actualTotalMonths from the calculation.
                    // For 0% annuity, term shortens proportionally.
                     newCalc = calculateLoanDetails(principal_new, annualRate, totalMonths_orig, monthlyFee, loanType); // Calculate based on original term first
                     newTotalMonths = newCalc.actualTotalMonths; // Use the actual months it took
                     // Recalculate fees based on actual shorter term if needed (already done inside calculateLoanDetails for serial)
                     if (loanType === 'annuity') { // Adjust fees for 0% annuity
                         newCalc.totalFees = monthlyFee * newTotalMonths;
                         newCalc.totalPaid = principal_new + newCalc.totalInterest + newCalc.totalFees;
                     }
                }


                const interestSaved = originalCalc.totalInterest - newCalc.totalInterest;
                const termShortenedMonths = originalCalc.actualTotalMonths - newCalc.actualTotalMonths;

                interestSavedEl.textContent = formatNumber(interestSaved);
                totalPaidNewEl.textContent = formatNumber(newCalc.totalPaid);
                payoffDateNewEl.textContent = formatDate(newCalc.payoffDate);
                termShortenedEl.textContent = formatTermDifference(termShortenedMonths);

                savingsResultsEl.style.display = 'block'; // Show savings section
                console.log("Savings calculation complete.");

            } else {
                savingsResultsEl.style.display = 'none'; // Hide savings section if no valid extra payment
                console.log("No valid extra payment entered, hiding savings section.");
            }

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
            // Ensure root path correctly maps to index.html for comparison
            if (currentPath === '') currentPath = 'index.html';
        } else {
            currentPath = currentPath.substring(currentPath.lastIndexOf('/') + 1);
        }
        // Ensure empty path after slash also maps to index.html
        const currentFile = currentPath || 'index.html';

        console.log(`Updating active menu state for path: ${currentFile}`);
        menuItems.forEach(item => {
            const itemHref = item.getAttribute('href');
            // Ensure comparison handles potential leading slashes or relative paths consistently
            const itemFile = itemHref ? (itemHref.split('/').pop() || 'index.html') : ''; // Default to index.html if href is just '/' or empty

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
