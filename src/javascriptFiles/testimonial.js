import '../cssFiles/testimonial.css';
import img1 from "../images/testimony3.jpg";
import img2 from "../images/testimony2.jpg";

export default function createTestimonialSection() {
    const sectionHolder = document.querySelector('.sections-holder');
  
    const section = document.createElement('section');
    section.classList.add('testimonial-section');
    section.id = 'testimonials';
  
    const heading = document.createElement('h1');
    heading.textContent = 'Happy Clients';
  
    const description = document.createElement('p');
    description.textContent = 'Read what our happy clients have to say';
  
    const testimonialContainer = document.createElement('div');
    testimonialContainer.classList.add('testimonial-container');
  
    const testimonial1 = createTestimonial('Mary Kendi', '"Felly\'s massage was perfect for my busy schedule.The therapist was punctual, professional and gave an amazing massage and left me feeling refreshed and relaxed."', 5, img1);
    const testimonial2 = createTestimonial('Ivy Otiende', '"Having Felly come to my home was incredibly convenient, and the massage provided real relief for my chronic back pain."', 4, img2);
  
    testimonialContainer.appendChild(testimonial1);
    testimonialContainer.appendChild(testimonial2);
  
    section.appendChild(heading);
    section.appendChild(description);
    section.appendChild(testimonialContainer);
  
    sectionHolder.appendChild(section);
}

function createTestimonial(name, text, rating, imgSrc) {
    const testimonial = document.createElement('div');
    testimonial.classList.add('testimonial');
  
    const ratingDiv = document.createElement('div');
    ratingDiv.classList.add('rating');
  
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.classList.add('star');
      if (i <= rating) {
        star.textContent = '★';
      } else {
        star.textContent = '☆';
      }
      ratingDiv.appendChild(star);
    }
  
    const testimony = document.createElement('p');
    testimony.textContent = text;
  
    const clientInfo = document.createElement('div');
    clientInfo.classList.add('client-info');
  
    const clientName = document.createElement('span');
    clientName.textContent = name;
  
    const clientPhoto = document.createElement('img');
    clientPhoto.src = imgSrc; 
  
    clientInfo.appendChild(clientName);
    clientInfo.appendChild(clientPhoto);
  
    testimonial.appendChild(ratingDiv);
    testimonial.appendChild(testimony);
    testimonial.appendChild(clientInfo);
  
    return testimonial;
}
