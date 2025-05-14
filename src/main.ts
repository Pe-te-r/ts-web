// DOM Elements
const loginForm = document.getElementById('loginForm') as HTMLFormElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const togglePasswordBtn = document.getElementById('togglePassword') as HTMLButtonElement;

// Toggle password visibility
let isPasswordVisible = false;

togglePasswordBtn.addEventListener('click', () => {
    isPasswordVisible = !isPasswordVisible;

    if (isPasswordVisible) {
        passwordInput.type = 'text';
        togglePasswordBtn.textContent = '👁️';
    } else {
        passwordInput.type = 'password';
        togglePasswordBtn.textContent = '👁️';
    }
});

// Form submission
loginForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    console.log('Login attempt with:', { email, password });

    // Simulate API call
    simulateLogin(email, password);
});

// Email validation
function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Simulate login API call
function simulateLogin(email: string, password: string): void {
    const submitBtn = loginForm.querySelector('button[type="submit"]') as HTMLButtonElement;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';

    setTimeout(() => {
        console.log(`Simulated login for ${email}`);
        alert(`Login successful for ${email}`);

        // Reset form
        submitBtn.disabled = false;
        submitBtn.textContent = 'Login';
        loginForm.reset();
    }, 1500);
}