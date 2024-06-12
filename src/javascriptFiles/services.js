import '../cssFiles/services.css';
import Swedish from "../images/newSweedish.jpg";
import feet from "../images/newFeet.jpg";
import waxed from "../images/newWaxed.jpg";
import being from "../images/wellBeing.jpg";



// Define the data for each service part
const servicesData = [
    {
        title: "Discover the Benefits of Swedish Massage",
        description: "Experience the ultimate relaxation and rejuvenation with our Swedish massage. Our skilled therapists use long, flowing strokes to release tension and promote deep relaxation whether you are looking to unwind after a long day or relieve muscle soreness, Swedish massage is the perfect choice.",
        buttonText: "Book Now",
        imagePath: Swedish
    },
    {
        title: "Experience the Healing Power of Reflexology",
        description: "Reflexology is a natural therapy that promotes relaxation, relieves stress, and enhances overall well-being. Our skilled therapists use specific pressure techniques on the feet to stimulate the body's own healing process.",
        benefits: [
            { header: "Benefits", items: ["Reduces tension and improves circulation."] },
            { header: "Why Choose Us", items: ["Highly trained and experienced reflexologists."] }
        ],
        buttonText: "Book Now",
        imagePath: feet
    },
    {
        title: "Discover the Smoothest Skin with Our Professional Waxing Services",
        description: "We offer a wide range of waxing services to help you achieve silky smooth skin. Our experienced estheticians use high-quality products and techniques to ensure a comfortable and effective waxing experience.",
        points: [
            "Gentle and effective hair removal for lasting results.",
            "Say goodbye to unwanted hair with our expert waxing treatments.",
            "Experience the confidence of smooth, hair-free skin."
        ],
        buttonText: "Book Now",
        imagePath: waxed
    },
    {
        title: "Improve Your Well-being with Regular Massages",
        description: "Regular massages offer numerous health benefits, including stress reduction, pain relief, improved circulation, and enhanced relaxation. Treat yourself to a massage today and experience the positive impact it can have on your overall well-being.",
        buttonText: "Book Now",
        imagePath: being
    }
];

// Function to create a service part element
function createServicePart(service, index) {
    const servicePart = document.createElement('div');
    servicePart.classList.add('service-part');
    servicePart.id = `service-part-${index}`;
    servicePart.style.backgroundColor = index % 2 === 0 ? '#F3EAC2' : '#E5E5E5';

    // Create elements for service image
    const serviceImage = document.createElement('div');
    serviceImage.classList.add('service-image');
    const img = document.createElement('img');
    img.src = service.imagePath;
    img.alt = service.title;
    serviceImage.appendChild(img);

    // Create elements for service text
    const serviceText = document.createElement('div');
    serviceText.classList.add('service-text');

    // For the second part, create a special layout
    if (index === 1) {
        const serviceTextTop = document.createElement('div');
        serviceTextTop.classList.add('service-text-top');
        serviceTextTop.innerHTML = `
            <h1>${service.title}</h1>
            <p>${service.description}</p>
        `;

        const serviceTextBottom = document.createElement('div');
        serviceTextBottom.classList.add('service-text-bottom');
        
        const leftDiv = document.createElement('div');
        leftDiv.classList.add('left-div');
        leftDiv.innerHTML = `<h2>${service.benefits[0].header}</h2><p>${service.benefits[0].items.join('<br>')}</p>`;
        
        const rightDiv = document.createElement('div');
        rightDiv.classList.add('right-div');
        rightDiv.innerHTML = `<h2>${service.benefits[1].header}</h2><p>${service.benefits[1].items.join('<br>')}</p>`;

        serviceTextBottom.appendChild(leftDiv);
        serviceTextBottom.appendChild(rightDiv);

        const button = document.createElement('button');
        button.classList.add('book-now-button');
        button.textContent = service.buttonText;
        button.addEventListener('click', () => {
            window.location.href = '#contacts';
        });

        serviceText.appendChild(serviceTextTop);
        serviceText.appendChild(serviceTextBottom);
        serviceText.appendChild(button);
    } else {
        let serviceContent = `
            <small>Relax</small>
            <h1>${service.title}</h1>
            <p>${service.description}</p>
        `;

        if (service.benefits) {
            service.benefits.forEach(benefit => {
                serviceContent += `<h2>${benefit.header}</h2>`;
                serviceContent += `<p>${benefit.items.join('<br>')}</p>`;
            });
        } else if (service.points) {
            serviceContent += `<ul>`;
            service.points.forEach(point => {
                serviceContent += `<li>${point}</li>`;
            });
            serviceContent += `</ul>`;
        }

        serviceContent += `<button class="book-now-button">${service.buttonText}</button>`;
        serviceText.innerHTML = serviceContent;

        const button = serviceText.querySelector('.book-now-button');
        button.addEventListener('click', () => {
            window.location.href = '#contacts';
        });
    }

    // Append text and image to service part based on index
    if (index % 2 === 0) {
        servicePart.appendChild(serviceText);
        servicePart.appendChild(serviceImage);
    } else {
        servicePart.appendChild(serviceImage);
        servicePart.appendChild(serviceText);
    }

    return servicePart;
}

// Function to add services to the services section
function addServicesToSection(servicesData) {
    const servicesSection = document.createElement('section');
    servicesSection.classList.add('services');
    servicesSection.id = 'services';

    servicesData.forEach((service, index) => {
        const servicePart = createServicePart(service, index);
        servicesSection.appendChild(servicePart);
    });

    const sectionHolder = document.querySelector('.sections-holder');
    sectionHolder.appendChild(servicesSection);
}

// Export the function to create the services section
export default function createServicesSection() {
    addServicesToSection(servicesData);
}
