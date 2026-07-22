/* ============================================================
   LUXE INTERIORS — Forms Validation & WhatsApp Integration
   ============================================================ */

const WHATSAPP_NUMBER = '919999999999';

/* ============================================================
   Utility Functions
   ============================================================ */
function showError(field, message) {
  const group = field.closest('.form-group');
  const errorEl = group.querySelector('.error-message');
  field.classList.add('error');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  }
}

function clearError(field) {
  const group = field.closest('.form-group');
  const errorEl = group.querySelector('.error-message');
  field.classList.remove('error');
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  }
}

function clearAllErrors(form) {
  form.querySelectorAll('.form-control').forEach(f => clearError(f));
}

function showSuccess(form, message) {
  const successEl = form.querySelector('.success-message');
  if (successEl) {
    successEl.textContent = message || 'Thank you! Your enquiry has been submitted successfully. We will contact you shortly.';
    successEl.classList.add('visible');
    setTimeout(() => successEl.classList.remove('visible'), 6000);
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[\d\s\+\-\(\)]{10,15}$/.test(phone);
}

/* ============================================================
   WhatsApp Redirect
   ============================================================ */
function redirectToWhatsApp(message) {
  const encodedMsg = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
  window.open(url, '_blank');
}

/* ============================================================
   Contact Form Validation
   ============================================================ */
function validateContactForm(e) {
  e.preventDefault();
  const form = e.target;
  clearAllErrors(form);

  let isValid = true;

  const name = form.querySelector('#contactName');
  const phone = form.querySelector('#contactPhone');
  const email = form.querySelector('#contactEmail');
  const service = form.querySelector('#contactService');
  const message = form.querySelector('#contactMessage');

  if (!name.value.trim()) {
    showError(name, 'Please enter your name');
    isValid = false;
  } else if (name.value.trim().length < 2) {
    showError(name, 'Name must be at least 2 characters');
    isValid = false;
  }

  if (!phone.value.trim()) {
    showError(phone, 'Please enter your phone number');
    isValid = false;
  } else if (!isValidPhone(phone.value)) {
    showError(phone, 'Please enter a valid phone number');
    isValid = false;
  }

  if (!email.value.trim()) {
    showError(email, 'Please enter your email');
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    showError(email, 'Please enter a valid email address');
    isValid = false;
  }

  if (service && !service.value) {
    showError(service, 'Please select a service');
    isValid = false;
  }

  if (!message.value.trim()) {
    showError(message, 'Please enter your message');
    isValid = false;
  } else if (message.value.trim().length < 10) {
    showError(message, 'Message must be at least 10 characters');
    isValid = false;
  }

  if (isValid) {
    showSuccess(form);
    form.reset();
  }

  return isValid;
}

/* ============================================================
   Booking Form Validation
   ============================================================ */
function validateBookingForm(e) {
  e.preventDefault();
  const form = e.target;
  clearAllErrors(form);

  let isValid = true;

  const name = form.querySelector('#bookName');
  const phone = form.querySelector('#bookPhone');
  const email = form.querySelector('#bookEmail');
  const propertyType = form.querySelector('#bookProperty');
  const budget = form.querySelector('#bookBudget');
  const date = form.querySelector('#bookDate');
  const time = form.querySelector('#bookTime');

  if (!name.value.trim()) {
    showError(name, 'Please enter your full name');
    isValid = false;
  }

  if (!phone.value.trim()) {
    showError(phone, 'Please enter your phone number');
    isValid = false;
  } else if (!isValidPhone(phone.value)) {
    showError(phone, 'Please enter a valid phone number');
    isValid = false;
  }

  if (!email.value.trim()) {
    showError(email, 'Please enter your email');
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    showError(email, 'Please enter a valid email address');
    isValid = false;
  }

  const projectType = form.querySelector('input[name="projectType"]:checked');
  if (!projectType) {
    const radioGroup = form.querySelector('.radio-group');
    if (radioGroup) {
      const errorEl = radioGroup.closest('.form-group').querySelector('.error-message');
      if (errorEl) {
        errorEl.textContent = 'Please select a project type';
        errorEl.classList.add('visible');
      }
    }
    isValid = false;
  }

  if (propertyType && !propertyType.value) {
    showError(propertyType, 'Please select a property type');
    isValid = false;
  }

  if (budget && !budget.value) {
    showError(budget, 'Please select a budget range');
    isValid = false;
  }

  if (date && !date.value) {
    showError(date, 'Please select a preferred date');
    isValid = false;
  }

  if (time && !time.value) {
    showError(time, 'Please select a preferred time');
    isValid = false;
  }

  if (isValid) {
    showSuccess(form, 'Your consultation has been booked successfully! Our team will contact you to confirm the appointment.');
    form.reset();
  }

  return isValid;
}

/* ============================================================
   WhatsApp Button Handlers
   ============================================================ */
function handleContactWhatsApp() {
  const form = document.getElementById('contactForm');
  const name = form.querySelector('#contactName').value.trim() || 'there';
  const service = form.querySelector('#contactService')?.value || 'Interior Design';
  const message = `Hello, I'm ${name}. I'm interested in your ${service} services and would like to schedule a consultation.`;
  redirectToWhatsApp(message);
}

function handleBookingWhatsApp() {
  const form = document.getElementById('bookingForm');
  const name = form.querySelector('#bookName').value.trim() || 'there';
  const projectType = form.querySelector('input[name="projectType"]:checked');
  const type = projectType ? projectType.value : 'Interior Design';
  const budget = form.querySelector('#bookBudget')?.value || '';
  const message = `Hello, I'm ${name}. I'd like to book a consultation for a ${type} project${budget ? ' with a budget of ' + budget : ''}. Please let me know your available time slots.`;
  redirectToWhatsApp(message);
}
