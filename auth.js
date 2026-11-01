const STORAGE_KEY = "tradewithme_user";

/* Check browser environment safely */
function isBrowser() {
  return (
    typeof globalThis !== "undefined" &&
    typeof globalThis.document !== "undefined"
  );
}

/* Safely access local storage */
function getStorage() {
  try {
    if (!isBrowser()) return null;
    return globalThis.localStorage;
  } catch (error) {
    console.error("Storage access error:", error);
    return null;
  }
}

/* Display messages */
function showMessage(element, message, error = false) {
  if (!element) return;

  element.textContent = message;
  element.classList.toggle("error", error);
  element.classList.toggle("success", !error);
}

/* Get stored user */
function getUser() {
  try {
    const storage = getStorage();

    if (!storage) return null;

    const storedUser = storage.getItem(STORAGE_KEY);

    if (!storedUser) return null;

    const user = JSON.parse(storedUser);

    if (
      !user ||
      typeof user.email !== "string" ||
      typeof user.password !== "string"
    ) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Unable to read stored user:", error);
    return null;
  }
}

/* Save user */
function saveUser(user) {
  try {
    const storage = getStorage();

    if (!storage) return false;

    storage.setItem(STORAGE_KEY, JSON.stringify(user));

    return true;
  } catch (error) {
    console.error("Unable to save user:", error);
    return false;
  }
}

/* Redirect safely */
function redirectTo(page) {
  if (!isBrowser()) return;

  try {
    globalThis.location.href = page;
  } catch (error) {
    console.error("Redirect error:", error);
  }
}

/* Logout */
function logout() {
  try {
    const storage = getStorage();

    if (storage) {
      storage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error("Logout error:", error);
  }

  redirectTo("login.html");
}

/* Protect dashboard pages */
export function requireLogin() {
  if (!isBrowser()) return null;

  const user = getUser();

  if (!user) {
    redirectTo("login.html");
    return null;
  }

  return user;
}

/* Redirect after successful login */
function redirectToDashboard() {
  redirectTo("dashboard.html");
}

/* Initialize authentication */
export function initAuth() {
  if (!isBrowser()) return;

  const doc = globalThis.document;

  const loginForm = doc.getElementById("login-form");
  const registerForm = doc.getElementById("register-form");
  const logoutButton = doc.getElementById("logout-button");

  /* LOGIN */
  if (loginForm && !loginForm.dataset.authInitialized) {
    loginForm.dataset.authInitialized = "true";

    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const emailInput = loginForm.querySelector('[name="email"]');
      const passwordInput = loginForm.querySelector('[name="password"]');
      const messageElement = loginForm.querySelector(".form-message");

      const email = emailInput?.value.trim().toLowerCase();
      const password = passwordInput?.value;

      if (!email || !password) {
        showMessage(
          messageElement,
          "Please enter your email and password.",
          true
        );
        return;
      }

      const user = getUser();

      if (
        user &&
        user.email === email &&
        user.password === password
      ) {
        showMessage(messageElement, "Login successful.");
        redirectToDashboard();
      } else {
        showMessage(
          messageElement,
          "Invalid email or password.",
          true
        );
      }
    });
  }

  /* REGISTRATION */
  if (registerForm && !registerForm.dataset.authInitialized) {
    registerForm.dataset.authInitialized = "true";

    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = registerForm.querySelector('[name="name"]');
      const emailInput = registerForm.querySelector('[name="email"]');
      const passwordInput = registerForm.querySelector('[name="password"]');
      const messageElement = registerForm.querySelector(".form-message");

      const name = nameInput?.value.trim();
      const email = emailInput?.value.trim().toLowerCase();
      const password = passwordInput?.value;

      if (!name || !email || !password) {
        showMessage(
          messageElement,
          "Please complete all required fields.",
          true
        );
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMessage(
          messageElement,
          "Please enter a valid email address.",
          true
        );
        return;
      }

      if (password.length < 8) {
        showMessage(
          messageElement,
          "Password must contain at least 8 characters.",
          true
        );
        return;
      }

      const existingUser = getUser();

      if (existingUser && existingUser.email === email) {
        showMessage(
          messageElement,
          "An account with this email already exists.",
          true
        );
        return;
      }

      const user = {
        name,
        email,
        password
      };

      const saved = saveUser(user);

      if (!saved) {
        showMessage(
          messageElement,
          "Unable to create your account. Please try again.",
          true
        );
        return;
      }

      showMessage(
        messageElement,
        "Registration successful. Redirecting to login..."
      );

      redirectTo("login.html");
    });
  }

  /* LOGOUT */
  if (logoutButton && !logoutButton.dataset.authInitialized) {
    logoutButton.dataset.authInitialized = "true";

    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      logout();
    });
  }
}

/* Browser-only initialization */
if (isBrowser()) {
  const doc = globalThis.document;

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", initAuth, {
      once: true
    });
  } else {
    initAuth();
  }
}
