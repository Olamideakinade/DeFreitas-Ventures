document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
    const successMessage = document.getElementById('successMessage');

    // Form validation rules
    const validators = {
        name: {
            validate: (value) => value.trim().length >= 2,
            message: 'Name must be at least 2 characters long'
        },
        email: {
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Please enter a valid email address'
        },
        phone: {
            validate: (value) => !value || /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, '')),
            message: 'Please enter a valid phone number'
        },
        message: {
            validate: (value) => value.trim().length >= 10,
            message: 'Message must be at least 10 characters long'
        }
    };

    // Real-time validation
    Object.keys(validators).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);
        const formGroup = field.parentElement;

        field.addEventListener('input', function() {
            validateField(field, errorElement, formGroup, validators[fieldName]);
            updateSubmitButton();
        });

        field.addEventListener('blur', function() {
            validateField(field, errorElement, formGroup, validators[fieldName]);
            updateSubmitButton();
        });

        // Add focus animations
        field.addEventListener('focus', function() {
            formGroup.classList.add('focused');
        });

        field.addEventListener('blur', function() {
            formGroup.classList.remove('focused');
        });
    });

    function validateField(field, errorElement, formGroup, validator) {
        const value = field.value.trim();
        const isValid = validator.validate(value);

        if (!isValid && (field.name !== 'phone' || value !== '')) {
            showError(errorElement, formGroup, validator.message);
            return false;
        } else {
            clearError(errorElement, formGroup);
            return true;
        }
    }

    function showError(errorElement, formGroup, message) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        formGroup.classList.add('error');
    }

    function clearError(errorElement, formGroup) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        formGroup.classList.remove('error');
    }

    function updateSubmitButton() {
        const isFormValid = validateForm();
        submitBtn.disabled = !isFormValid;
    }

    function validateForm() {
        let isValid = true;
        
        Object.keys(validators).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const errorElement = document.getElementById(`${fieldName}-error`);
            const formGroup = field.parentElement;
            
            if (!validateField(field, errorElement, formGroup, validators[fieldName])) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        loadingSpinner.style.display = 'block';

        // Simulate form submission (replace with actual API call)
        try {
            // For demo purposes, we'll simulate a successful submission
            await simulateFormSubmission();
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            clearAllErrors();
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error submitting your message. Please try again.');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            loadingSpinner.style.display = 'none';
        }
    });

    function simulateFormSubmission() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000); // Simulate 2 second API call
        });
    }

    function showSuccessMessage() {
        successMessage.style.display = 'flex';
        successMessage.classList.add('show');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 300);
        }, 5000);
    }

    function clearAllErrors() {
        Object.keys(validators).forEach(fieldName => {
            const errorElement = document.getElementById(`${fieldName}-error`);
            const formGroup = document.getElementById(fieldName).parentElement;
            clearError(errorElement, formGroup);
        });
    }

    // Initial validation state
    updateSubmitButton();

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});

// Smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Enhanced form interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add floating label effect
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    inputs.forEach(input => {
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('has-value');
        }
        
        input.addEventListener('input', function() {
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
    });
});

