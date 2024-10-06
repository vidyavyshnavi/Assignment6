document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");

    // Input fields
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const mobile = document.getElementById("mobile");

    // Error message spans
    const firstnameError = document.getElementById("firstnameError");
    const lastnameError = document.getElementById("lastnameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const mobileError = document.getElementById("mobileError");

    // Helper functions for validation
    function validateName(name) {
        return /^[A-Za-z]+$/.test(name); // Only alphabets
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Simple email validation
    }

    function validatePassword(password) {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password); // Password rules
    }

    function validateMobile(mobile) {
        return /^\d{10}$/.test(mobile); // 10-digit mobile number
    }

    // Form submission event listener
    form.addEventListener("submit", function (event) {
        // Clear all error messages
        firstnameError.textContent = "";
        lastnameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        confirmPasswordError.textContent = "";
        mobileError.textContent = "";

        let valid = true;

        // Firstname validation
        if (!validateName(firstname.value)) {
            firstnameError.textContent = "Firstname should only contain letters.";
            valid = false;
        }

        // Lastname validation
        if (!validateName(lastname.value)) {
            lastnameError.textContent = "Lastname should only contain letters.";
            valid = false;
        }

        // Email validation
        if (!validateEmail(email.value)) {
            emailError.textContent = "Please enter a valid email address.";
            valid = false;
        }

        // Password validation
        if (!validatePassword(password.value)) {
            passwordError.innerHTML = `
            <ul>
                <li>Password must be at least 8 characters</li>
                <li>Contain one uppercase letter</li>
                <li>Contain one number</li>
                <li>Contain one special character</li>
            </ul>`;
            valid = false;
        }

        // Confirm password validation
        if (password.value !== confirmPassword.value) {
            confirmPasswordError.textContent = "Passwords do not match.";
            valid = false;
        }

        // Mobile number validation
        if (!validateMobile(mobile.value)) {
            mobileError.textContent = "Please enter a valid 10-digit mobile number.";
            valid = false;
        }

        // If the form is valid, allow submission and reset the form
        if (valid) {
            form.reset();  // Reset the form after successful submission
            document.getElementById('player-list').innerHTML = ''; // Clear player list
        } else {
            event.preventDefault();  // Prevent form submission if invalid
        }
    });

    // Add Player Button functionality
    const addPlayerButton = document.getElementById("add-player");
    const playerList = document.getElementById("player-list");
    const favoritePlayerInput = document.getElementById("favoritePlayer");

    addPlayerButton.addEventListener("click", function () {
        const newValue = favoritePlayerInput.value.trim();

        // Check for duplicate player names
        const existingPlayers = Array.from(playerList.children).map(li => li.innerText.replace('Remove', '').trim());
        if (newValue === '') return;
        if (existingPlayers.includes(newValue)) {
            alert('This player is already in the list.');
            favoritePlayerInput.value = ''; // Clear the input if duplicate
            return;
        }

        const playerItem = document.createElement('li');
        playerItem.innerHTML = `${newValue}<button class="remove-btn">Remove</button>`;
        playerItem.querySelector('.remove-btn').addEventListener('click', () => {
            playerList.removeChild(playerItem);
        });
        playerList.appendChild(playerItem);
        favoritePlayerInput.value = '';
    });
});
