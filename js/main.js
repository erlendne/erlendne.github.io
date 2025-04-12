// This file contains JavaScript code for handling dynamic behavior on the webpage.

document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const currentPath = window.location.pathname.split('/').pop(); // Get the current file name (e.g., "index.html")

    menuItems.forEach(item => {
        const itemPath = item.getAttribute('href').split('/').pop();

        // Remove existing active class from all items first
        item.classList.remove('active');

        // Add active class if the item's href matches the current page
        // Handle the case for the root/index page explicitly
        if (currentPath === itemPath || (currentPath === '' && itemPath === 'index.html')) {
            item.classList.add('active');
        }

        // Keep the click listener if you want immediate feedback without page reload (for SPA behavior, not used here)
        // item.addEventListener('click', function(event) {
        //     // Optional: Prevent default navigation if building a Single Page Application
        //     // event.preventDefault();
        //
        //     // Remove active class from all items
        //     menuItems.forEach(i => i.classList.remove('active'));
        //     // Add active class to the clicked item
        //     this.classList.add('active');
        //
        //     // Optional: Load content dynamically if SPA
        //     // loadPageContent(this.getAttribute('href'));
        // });
    });

    // Adjust body padding dynamically based on menu height (useful if menu height changes responsively)
    const menuBar = document.querySelector('.menu-bar');
    function adjustBodyPadding() {
        if (menuBar) {
            const menuHeight = menuBar.offsetHeight;
            document.body.style.paddingTop = menuHeight + 'px';
        }
    }

    // Initial adjustment
    adjustBodyPadding();

    // Adjust on window resize
    window.addEventListener('resize', adjustBodyPadding);

});
