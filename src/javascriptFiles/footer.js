import '../cssFiles/footer.css';

// Function to create the footer section
export default function createFooter() {

    const sectionsHolder = document.querySelector('.sections-holder');

    const footer = document.createElement('footer');
    footer.classList.add('footer');

    
    const iconsDiv = document.createElement('div');
    iconsDiv.classList.add('footer-icons');

    
    const socialMediaLinks = [
        { iconClass: 'fab fa-facebook-f', url: 'https://www.facebook.com/yourpage' },
        { iconClass: 'fab fa-twitter', url: 'https://twitter.com/youraccount' },
        { iconClass: 'fab fa-instagram', url: 'https://www.instagram.com/youraccount' },
        { iconClass: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/yourprofile' }
    ];

   
    socialMediaLinks.forEach(linkInfo => {
        const iconLink = document.createElement('a');
        iconLink.href = linkInfo.url;
        iconLink.target = '_blank'; // Open link in a new tab
        iconLink.classList.add('icon-link');
        const icon = document.createElement('i');
        // Set Font Awesome icon class directly
        icon.className = `fab ${linkInfo.iconClass}`;
        iconLink.appendChild(icon);
        iconsDiv.appendChild(iconLink);
    });


    const year = new Date().getFullYear();
    const copyrightPara = document.createElement('p');
    copyrightPara.textContent = `\u00A9 ${year} Your Website. All rights reserved.`;

    
    footer.appendChild(iconsDiv);
    footer.appendChild(copyrightPara);

    
    sectionsHolder.appendChild(footer);
}
