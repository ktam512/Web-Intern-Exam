document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting automatically

    // Clear previous errors
    clearErrors();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let isValid = true;

    // Name validation
    if (name === "") {
        showError("nameError", "Name is required");
        isValid = false;
    } else if (name.length < 3) {
        showError("nameError", "Name must be at least 3 characters long");
        isValid = false;
    }

    // Email validation
    if (email === "") {
        showError("emailError", "Email is required");
        isValid = false;
    } else if (!validateEmail(email)) {
        showError("emailError", "Please enter a valid email address");
        isValid = false;
    }

    // Password validation
    if (password === "") {
        showError("passwordError", "Password is required");
        isValid = false;
    } else if (password.length < 8) {
        showError("passwordError", "Password must be at least 8 characters long");
        isValid = false;
    }

    // Confirm Password validation
    if (confirmPassword === "") {
        showError("confirmPasswordError", "Confirming your password is required");
        isValid = false;
    } else if (password !== confirmPassword) {
        showError("confirmPasswordError", "Passwords do not match");
        isValid = false;
    }

    if (isValid) {
        alert("Form submitted successfully!");
        // You can also add the actual form submission code here if needed.
    }
});

function showError(elementId, message) {
    let errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = "block";
}

function clearErrors() {
    let errorElements = document.querySelectorAll(".error");
    errorElements.forEach(function (element) {
        element.style.display = "none";
    });
}


function validateEmail(email) {
    // Simple email validation regex
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}