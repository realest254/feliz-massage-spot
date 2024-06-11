import '../cssFiles/home.css';
import createServicesSection from '../javascriptFiles/services.js';
import createTestimonialSection from '../javascriptFiles/testimonial.js';
import createContactSection from  '../javascriptFiles/contact.js';
import createFooter from '../javascriptFiles/footer.js';
import homeBg from '../images/background h1.jpg';
import logo from '../images/newLogo.jpeg';

function createHomePage() {
    const sectionHolder = document.querySelector('.sections-holder'); // Select the sections-holder

    const section = document.createElement('section');
    section.classList.add('homepage');
    section.id = 'home';

    const upperSection = document.createElement('div');
    upperSection.classList.add('upper-section');

    const lowerSection = document.createElement('div');
    lowerSection.classList.add('lower-section');
    lowerSection.style.backgroundImage = `url(${homeBg})`; // Apply the background image here

    // Create the back arrow element (new)
    const backArrow = document.createElement('div');
    backArrow.classList.add('back-arrow');

    // Create the arrow shape using spans (new)
    const leftArrowSpan = document.createElement('span');
    leftArrowSpan.classList.add('left-arrow');
    backArrow.appendChild(leftArrowSpan);

    const rightArrowSpan = document.createElement('span');
    rightArrowSpan.classList.add('right-arrow');
    backArrow.appendChild(rightArrowSpan);

    const navigationDiv = document.createElement('div');
    navigationDiv.classList.add('navigation');

    const logoContainer = document.createElement('div');
    logoContainer.classList.add('logo-container');

    // Create the logo image element
    const logoImage = document.createElement('img');
    logoImage.src = logo;
    logoImage.alt = 'Company Logo';
    logoImage.style.width = '100px';
    logoImage.style.height = '100px';

    // Append the logo image to the logo container
    logoContainer.appendChild(logoImage);

    const nav = document.createElement('nav');
    nav.classList.add('large-screen');

    const ul = document.createElement('ul');

    const navList = ['Services', 'About', 'Testimonials', 'Contacts'];

    navList.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + item.toLowerCase();
        a.textContent = item;
        a.addEventListener('click', function(event) {
            event.preventDefault();
            smoothScroll(item.toLowerCase());
            this.classList.toggle('clicked');
        });
        li.appendChild(a);
        ul.appendChild(li);
    });

    nav.appendChild(ul);
    navigationDiv.appendChild(nav);

    const hamburgerMenu = document.createElement('div');
    hamburgerMenu.classList.add('hamburger-menu');
    hamburgerMenu.innerHTML = `
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    `;
    hamburgerMenu.addEventListener('click', toggleMenu);

    navigationDiv.appendChild(hamburgerMenu);

    upperSection.appendChild(logoContainer);
    upperSection.appendChild(navigationDiv);
    upperSection.appendChild(backArrow); // Add back arrow to upper section

    const companyInfo = document.createElement('div');
    companyInfo.classList.add('home');

    const companyName = document.createElement('h1');
    companyName.innerHTML = '';

    const companyDescription = document.createElement('p');
    companyDescription.textContent = '';

    const bookButton = document.createElement('button');
    bookButton.textContent = 'Book Now';
    bookButton.addEventListener('click', function() {
        window.location.href = '#contacts';
    });
    
    bookButton.classList.add('book-now-button1');

    companyInfo.appendChild(companyName);
    companyInfo.appendChild(companyDescription);
    companyInfo.appendChild(bookButton);

    lowerSection.appendChild(companyInfo);

    section.appendChild(upperSection);
    section.appendChild(lowerSection);

    sectionHolder.appendChild(section);

    function toggleMenu() {
        const nav = document.querySelector('.navigation nav');
        const hamburgerMenu = document.querySelector('.hamburger-menu');

        if (nav.classList.contains('inactive')) {
            nav.classList.remove('inactive');
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
            nav.classList.add('inactive');
        }

        if (hamburgerMenu.classList.contains('active')) {
            hamburgerMenu.classList.remove('active');
        } else {
            hamburgerMenu.classList.add('active');
        }
    }

    // Function to load the background image when the lower section is in view
    const bgImage = new Image();
    bgImage.src = homeBg;

    bgImage.onload = function() {
        lowerSection.style.backgroundImage = `url(${bgImage.src})`;
    };

    function adjustLayout() {
        const nav = document.querySelector('.navigation nav');
        const hamburgerMenu = document.querySelector('.hamburger-menu');
    
        if (window.innerWidth < 769) {
            nav.classList.remove('large-screen');
            nav.classList.add('small-screen');
            if (!nav.classList.contains('active')) {
                nav.classList.add('inactive');
            }
            hamburgerMenu.style.display = 'block';
        } else {
            nav.classList.remove('small-screen');
            nav.classList.add('large-screen');
            nav.classList.remove('inactive'); // Ensure navigation is active on larger screens
            nav.classList.remove('active');
            hamburgerMenu.style.display = 'none';
        }
    }
    

    function handleItemClick() {
        const nav = document.querySelector('.navigation nav');
        const hamburgerMenu = document.querySelector('.hamburger-menu');

        const listItems = document.querySelectorAll('.navigation nav ul li a');
        listItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth < 769) {
                    nav.classList.add('inactive');
                    nav.classList.remove('active');
                    hamburgerMenu.classList.remove('active');
                }
            });
        });
    }

    // Function to show/hide back arrow based on current scroll position (new)
    function updateBackArrowVisibility() {
        const homeSection = document.getElementById('home');
        const rect = homeSection.getBoundingClientRect();
        if (rect.top < 0) {
            backArrow.style.display = 'block';
        } else {
            backArrow.style.display = 'none';
        }
    }

    // Add click event listener for back arrow (new)
    backArrow.addEventListener('click', function() {
        smoothScroll('home'); // Smooth scroll to the top of the page
    });

    // Add WhatsApp icon
    function addWhatsAppIcon() {
        const whatsappIcon = document.createElement('i');
        whatsappIcon.classList.add('fab', 'fa-whatsapp', 'whatsapp-icon');
        whatsappIcon.addEventListener('click', function() {
            window.open('https://wa.me/1234567890', '_blank'); // Replace the number with your WhatsApp number
        });
        sectionHolder.appendChild(whatsappIcon);
    }

    // Call the function to add the WhatsApp icon
    addWhatsAppIcon();

    window.addEventListener('DOMContentLoaded', () => {
        adjustLayout(); // Ensure layout is adjusted on load
        handleItemClick();
        updateBackArrowVisibility(); // Update back arrow visibility on load
        createServicesSection(); // Ensure services section is created on load
        createTestimonialSection();
        createContactSection();
        createFooter();
    });

    window.addEventListener('resize', adjustLayout);
    window.addEventListener('scroll', updateBackArrowVisibility); // Update arrow visibility on scroll
}

function smoothScroll(target) {
    const targetElement = document.getElementById(target);
    if (targetElement) {
        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.offsetTop;
        const duration = 1000; // Adjust duration as needed

        let startTime = null;

        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = timeElapsed / duration;
            const easedProgress = mathEaseInOutQuad(progress); // Use an easing function for smooth animation
            const newPosition = startPosition + (targetPosition - startPosition) * easedProgress;
            window.scrollTo(0, newPosition);

            if (progress < 1) {
                window.requestAnimationFrame(animate);
            }
        }

        function mathEaseInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        window.requestAnimationFrame(animate);
    }
}

createHomePage();
