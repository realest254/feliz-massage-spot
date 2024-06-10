// Import the CSS file for styling
import '../cssFiles/contact.css'; 

// Helper function to create input elements
function createInput(type, placeholder, name, hidden = false) {
    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    input.name = name;
    input.classList.add('input');
    if (hidden) {
        input.style.display = 'none'; // Hide the hidden field
    }
    return input;
}

// Function to create the contact section
export default function createContactSection() {
    const sectionsHolder = document.querySelector('.sections-holder'); // Assuming sectionsHolder is accessible globally

    // Create the contact section element
    const contactSection = document.createElement('section');
    contactSection.classList.add('contact-section', 'container');
    contactSection.id = 'contacts'; // Set the id for the section

    // Create the contact info div
    const contactInfoDiv = document.createElement('div');
    contactInfoDiv.classList.add('contact-info');

    // Add contact info
    const contactHeader = document.createElement('h2');
    contactHeader.textContent = 'Contact Us';
    contactHeader.classList.add('heading');
    contactInfoDiv.appendChild(contactHeader);

    const scriptParagraph = document.createElement('p');
    scriptParagraph.textContent = 'Please feel free to contact us for any inquiries or to book a massage.';
    contactInfoDiv.appendChild(scriptParagraph);

    // Create the contact form div
    const contactFormDiv = document.createElement('div');
    contactFormDiv.classList.add('contact-form', 'form');

    const form = document.createElement('form');
    form.action = 'https://api.web3forms.com/submit'; // Set action attribute for form submission

    // Add form inputs
    const accessKeyInput = document.createElement('input');
    accessKeyInput.type = 'hidden';
    accessKeyInput.name = 'access_key';
    accessKeyInput.value = 'your-access-key'; // Replace with your actual access key
    form.appendChild(accessKeyInput);

    const nameInput = createInput('text', 'Your Name', 'name');
    form.appendChild(nameInput);

    const telInputHidden = createInput('tel', 'Telephone', 'tel', true); // Hidden tel input for bot prevention
    form.appendChild(telInputHidden);

    const telInputVisible = createInput('tel', 'Your Contact', 'contact');
    form.appendChild(telInputVisible);

    const messageInput = document.createElement('textarea');
    messageInput.placeholder = 'Your Message';
    messageInput.name = 'message';
    messageInput.classList.add('input');
    form.appendChild(messageInput);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Send Message';
    submitButton.classList.add('login-button');
    form.appendChild(submitButton);

    const telErrorMessage = document.createElement('span');
    telErrorMessage.id = 'tel-error-message'; // Element to show error message
    contactFormDiv.appendChild(telErrorMessage);

    // Add form element to contact form div
    contactFormDiv.appendChild(form);

    // Append contact info div and contact form div to the contact section
    contactSection.appendChild(contactInfoDiv);
    contactSection.appendChild(contactFormDiv);

    // Append the contact section to the sections holder
    sectionsHolder.appendChild(contactSection);

    // Event listener for form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Additional validation for required fields
        if (!nameInput.value || !telInputVisible.value || !messageInput.value) {
            alert('Please fill out all required fields.');
            return;
        }

        // Prevent form submission if hidden field is filled
        if (telInputHidden.value) {
            return;
        }

        // Validate contact number format
        const telPattern = /^\+?\d{8,15}$/;
        if (!telPattern.test(telInputVisible.value)) {
            telErrorMessage.textContent = 'Please enter a valid telephone number.';
            return;
        } else {
            telErrorMessage.textContent = '';
        }

        // Submit the form if validation passes
        submitForm();
    });

    // Function to submit the form
    function submitForm() {
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        const result = document.createElement('div');
        result.id = 'result';
        result.innerHTML = 'Please wait...';
        contactFormDiv.appendChild(result);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: json,
        })
            .then(async (response) => {
                let jsonResponse = await response.json();
                if (response.status == 200) {
                    result.innerHTML = 'Form submitted successfully';
                } else {
                    result.innerHTML = jsonResponse.message;
                }
            })
            .catch(() => {
                result.innerHTML = 'Something went wrong!';
            })
            .then(() => {
                form.reset();
                setTimeout(() => {
                    result.style.display = 'none';
                }, 3000);
            });
    }
}
