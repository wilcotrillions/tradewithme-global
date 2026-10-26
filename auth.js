const STORAGE_KEY = "tradewithme_user";

function showMessage(element, message, error = false) {
  if (!element) return;

  element.textContent = message;
  element.classList.toggle("error", error);
  element.classList.toggle("success", !error);
}

function getUser() {
  try {
    if (
      typeof globalThis === "undefined" ||
      !globalThis.localStorage
    ) {
      return null;
    }

    const storedUser =
      globalThis.localStorage.getItem(STORAGE_KEY);

    if (!storedUser) return null;

    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Unable to read stored user:", error);
    return null;
  }
}

function saveUser(user) {
  try {
    if (
      typeof globalThis === "undefined" ||
      !globalThis.localStorage
    ) {
      return false;
    }

    globalThis.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(user)
    );

    return true;
  } catch (error) {
    console.error("Unable to save user:", error);
    return false;
  }
}

function logout() {
  try {
    if (
      typeof globalThis !== "undefined" &&
      globalThis.localStorage
    ) {
      globalThis.localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error("Unable to clear stored user:", error);
  }

  if (
    typeof globalThis !== "undefined" &&
    globalThis.location
  ) {
    globalThis.location.href = "login.html";
  }
}

export function requireLogin() {
  const user = getUser();

  if (!user) {
    if (
      typeof globalThis !== "undefined" &&
      globalThis.location
    ) {
      globalThis.location.href = "login.html";
    }

    return null;
  }

  return user;
}

function redirectToDashboard() {
  if (
    typeof globalThis !== "undefined" &&
    globalThis.location
  ) {
    globalThis.location.href = "dashboard.html";
  }
}

export function initAuth() {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const logoutButton = document.getElementById("logout-button");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const emailInput =
        loginForm.querySelector('[name="email"]');
      const passwordInput =
        loginForm.querySelector('[name="password"]');
      const messageElement =
        loginForm.querySelector(".form-message");

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
        showMessage(messageElement, "Login successful. Redirecting...");
        setTimeout(redirectToDashboard, 1000);
      } else {
        showMessage(
          messageElement,
          "Invalid email or password.",
          true
        );
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput =
        registerForm.querySelector('[name="name"]');
      const emailInput =
        registerForm.querySelector('[name="email"]');
      const passwordInput =
        registerForm.querySelector('[name="password"]');
      const messageElement =
        registerForm.querySelector(".form-message");

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

      if (password.length < 8) {
        showMessage(
          messageElement,
          "Password must be at least 8 characters long.",
          true
        );
        return;
      }

      const user = {
        name,
        email,
        password
      };

      if (!saveUser(user)) {
        showMessage(
          messageElement,
          "Unable to save your account in this browser.",
          true
        );
        return;
      }

      showMessage(
        messageElement,
        "Registration successful. Redirecting to login..."
      );

      setTimeout(() => {
        if (
          typeof globalThis !== "undefined" &&
          globalThis.location
        ) {
          globalThis.location.href = "login.html";
        }
      }, 1000);
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      logout();
    });
  }
}

if (
  typeof globalThis !== "undefined" &&
  globalThis.document
) {
  if (globalThis.document.readyState === "loading") {
    globalThis.document.addEventListener(
      "DOMContentLoaded",
      initAuth
    );
  } else {
    initAuth();
  }
}
