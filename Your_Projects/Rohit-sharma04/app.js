function checkPasswordStrength(password) {
    const strengthMeter = document.getElementById('password-strength');

    // Define regular expressions for criteria
    const regexLowercase = /[a-z]/;
    const regexUppercase = /[A-Z]/;
    const regexNumbers = /[0-9]/;
    const regexSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    const regexLength = /^.{8,}$/;

    let strength = 0;

    if (regexLowercase.test(password)) {
        strength++;
    }

    if (regexUppercase.test(password)) {
        strength++;
    }

    if (regexNumbers.test(password)) {
        strength++;
    }

    if (regexSpecialChars.test(password)) {
        strength++;
    }

    if (regexLength.test(password)) {
        strength++;
    }

    // Update the strength meter and message
    let strengthClass = '';
    let strengthText = '';
    if (commonPasswords.includes(password)) {
        strength = 0;
    }
    switch (strength) {
        case 0:
            strengthClass = 'common';
            strengthText = 'Very Common and Weak';
            break;
        case 1:
            strengthClass = 'weak';
            strengthText = 'Weak';
            break;
        case 2:
            strengthClass = 'moderate';
            strengthText = 'Moderate';
            break;
        case 3:
            strengthClass = 'good';
            strengthText = 'Good';
            break;
        case 4:
            strengthClass = 'strong';
            strengthText = 'Strong';
            break;
        case 5:
            strengthClass = 'very-strong';
            strengthText = 'Very Strong';
            break;
        default:
            break;
    }



    strengthMeter.className = `password-strength ${strengthClass}`;
    strengthMeter.textContent = strengthText;
    // Apply glow effect based on strength
    applyGlowEffect(strength);
}

function applyGlowEffect(strength) {
    const strengthMeter = document.getElementById('password-strength');
    const passwordInput = document.getElementById('password');

    let glowColor = '';
    switch (strength) {
        case 0:
            glowColor = '#ff0000'; // common: Red
            break;
        case 1:
            glowColor = '#ff4da6'; // Weak: Pink
            break;
        case 2:
            glowColor = '#f0a500'; // Moderate: Orange
            break;
        case 3:
            glowColor = '#ffff00'; // Good: Yellow
            break;
        case 4:
            glowColor = '#4caf50'; // Strong: Green
            break;
        case 5:
            glowColor = '#007BFF'; // Very Strong: Blue
            break;
        default:
            break;
    }
    passwordInput.style.color = `${glowColor}`;
    strengthMeter.style.textShadow = `0 0 15px #fff, 0 0 0px ${glowColor}, 0 0 50px ${glowColor}`;
}


let passwordVisible = false;

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.getElementById('toggle-password');

    passwordVisible = !passwordVisible;
    if (passwordVisible) {
        passwordInput.type = 'text';
        toggleButton.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = 'Show';
    }
}
