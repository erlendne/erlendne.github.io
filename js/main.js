// This file contains JavaScript code for handling dynamic behavior on the webpage.

document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add active class to the clicked menu item
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});