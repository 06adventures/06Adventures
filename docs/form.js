document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const phoneInput = form.querySelector('input[name="phone"]');
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, ""); // Only digits
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get values
    const firstName = form.querySelector('input[name="first_name"]').value.trim();
    const lastName = form.querySelector('input[name="last_name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const phone = form.querySelector('input[name="phone"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    // Error spans
    const firstNameError = document.getElementById("first-name-error");
    const lastNameError = document.getElementById("last-name-error");
    const emailError = document.getElementById("email-error");
    const phoneError = document.getElementById("phone-error");
    const messageError = document.getElementById("message-error");

    // Clear errors
    if (firstNameError) firstNameError.textContent = "";
    if (lastNameError) lastNameError.textContent = "";
    if (emailError) emailError.textContent = "";
    if (phoneError) phoneError.textContent = "";
    if (messageError) messageError.textContent = "";

    let hasError = false;

    // Validation
    if (!firstName) {
      firstNameError.textContent = "First name is required.";
      hasError = true;
    }

    if (!lastName) {
      lastNameError.textContent = "Last name is required.";
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address.";
      hasError = true;
    }

    if (!phone) {
      phoneError.textContent = "Phone number is required.";
      hasError = true;
    } else if (!/^\d+$/.test(phone)) {
      phoneError.textContent = "Phone number must contain only numbers.";
      hasError = true;
    } else if (phone.length < 8) {
      phoneError.textContent = "Phone number is too short.";
      hasError = true;
    }

    if (!message) {
      messageError.textContent = "Message is required.";
      hasError = true;
    }

    if (hasError) return; // Stop submission if errors

    // Send with EmailJS if no errors
    emailjs.sendForm("service_iv7hw4p", "template_ksqrzk5", form)
      .then(function () {
        alert("Message sent successfully!");
        form.reset();
      }, function (error) {
        alert("Something went wrong. Try again!");
        console.error("EmailJS error:", error);
      });
  });
});
