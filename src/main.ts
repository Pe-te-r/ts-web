// Auth state
interface AuthState {
    isLoggedIn: boolean;
    userEmail: string | null;
    lastLogin: string | null;
}

// Initialize auth state
let authState: AuthState = {
    isLoggedIn: false,
    userEmail: null,
    lastLogin: null
};

// DOM Elements
const loginContainer = document.getElementById('loginContainer') as HTMLDivElement;
const dashboardContainer = document.getElementById('dashboardContainer') as HTMLDivElement;
const loginForm = document.getElementById('loginForm') as HTMLFormElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const togglePasswordBtn = document.getElementById('togglePassword') as HTMLButtonElement;
const emailError = document.getElementById('emailError') as HTMLDivElement;
const passwordError = document.getElementById('passwordError') as HTMLDivElement;
const logoutBtn = document.getElementById('logoutBtn') as HTMLButtonElement;
const userEmailSpan = document.getElementById('userEmail') as HTMLSpanElement;
const lastLoginSpan = document.getElementById('lastLogin') as HTMLSpanElement;
const refreshBtn = document.getElementById('refreshBtn') as HTMLButtonElement;

// Check if user is already logged in (from session)
function checkAuthState(): void {
    const savedAuth = localStorage.getItem('authState');
    if (savedAuth) {
        authState = JSON.parse(savedAuth);
        if (authState.isLoggedIn) {
            showDashboard();
        }
    }
}

// Toggle password visibility
let isPasswordVisible = false;

togglePasswordBtn.addEventListener('click', () => {
    isPasswordVisible = !isPasswordVisible;
    passwordInput.type = isPasswordVisible ? 'text' : 'password';
    togglePasswordBtn.textContent = isPasswordVisible ? '👁️' : '👁️';
});

// Form submission
loginForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    clearErrors();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate inputs
    if (!validateEmail(email)) {
        showError(emailError, 'Please enter a valid email address');
        return;
    }

    if (password.length < 6) {
        showError(passwordError, 'Password must be at least 6 characters');
        return;
    }

    // Check credentials (hardcoded for demo)
    if (email !== 'phantom@duck.com' || password !== '123456') {
        showError(passwordError, 'Invalid email or password');
        return;
    }

    // Login successful
    authState = {
        isLoggedIn: true,
        userEmail: email,
        lastLogin: new Date().toLocaleString()
    };

    // Save to localStorage
    localStorage.setItem('authState', JSON.stringify(authState));

    // Show dashboard
    showDashboard();
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    authState = {
        isLoggedIn: false,
        userEmail: null,
        lastLogin: null
    };
    localStorage.removeItem('authState');
    showLogin();
    loginForm.reset();
});

// Refresh dashboard data
refreshBtn.addEventListener('click', () => {
    lastLoginSpan.textContent = new Date().toLocaleString();
});

// Show dashboard function
function showDashboard(): void {
    loginContainer.style.display = 'none';
    dashboardContainer.style.display = 'block';
    userEmailSpan.textContent = authState.userEmail || '';
    lastLoginSpan.textContent = authState.lastLogin || new Date().toLocaleString();
}

// Show login function
function showLogin(): void {
    loginContainer.style.display = 'block';
    dashboardContainer.style.display = 'none';
}

// Error handling
function showError(element: HTMLElement, message: string): void {
    element.textContent = message;
}

function clearErrors(): void {
    emailError.textContent = '';
    passwordError.textContent = '';
}

// Email validation
function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Initialize app
checkAuthState();