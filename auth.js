const STORAGE_KEY = "tradewithme_user";

function showMessage(element, message, error = false) {
  if (!element) return;

  element.textContent = message;
  element.classList.toggle("error", error);
  element.classList.toggle("success", !error);
}

function getUser() {
  try {
    const storedUser = localStorage.getItem(STORAGE_KEY);

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Unable to read stored user:", error);
    return null;
  }
}

function saveUser(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function logout() {
  localStorage.removeItem(STORAGE_KEY);

  if (globalThis.location) {
    globalThis.location.href = "login.html";
  }
}

function requireLogin() {
  const user = getUser();

  if (!user) {
    if (globalThis.location) {
      globalThis.location.href = "login.html";
    }

    return null;
  }

  return user;
}

function redirectToDashboard() {
  if (globalThis.location) {
    globalThis.location.href = "dashboard.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const logoutButtons = document.querySelectorAll(
    '[data-action="logout"], .logout-btn',
  );

  logoutButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      logout();
    });
  });

  const loginForm = document.querySelector("#loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const emailInput = document.querySelector("#email");
      const passwordInput = document.querySelector("#password");
      const messageElement = document.querySelector("#loginMessage");

      const email = emailInput?.value.trim() || "";
      const password = passwordInput?.value || "";

      if (!email || !password) {
        showMessage(
          messageElement,
          "Please enter your email and password.",
          true,
        );
        return;
      }

      const user = {
        email,
        loggedIn: true,
        loginTime: new Date().toISOString(),
      };

      saveUser(user);

      showMessage(
        messageElement,
        "Login successful. Redirecting...",
      );

      setTimeout(() => {
        redirectToDashboard();
      }, 1000);
    });
  }

  const registerForm = document.querySelector("#registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = document.querySelector("#name");
      const emailInput = document.querySelector("#email");
      const passwordInput = document.querySelector("#password");
      const confirmPasswordInput =
        document.querySelector("#confirmPassword");

      const messageElement =
        document.querySelector("#registerMessage");

      const name = nameInput?.value.trim() || "";
      const email = emailInput?.value.trim() || "";
      const password = passwordInput?.value || "";
      const confirmPassword = confirmPasswordInput?.value || "";

      if (!name || !email || !password || !confirmPassword) {
        showMessage(
          messageElement,
          "Please complete all required fields.",
          true,
        );
        return;
      }

      if (password !== confirmPassword) {
        showMessage(
          messageElement,
          "Passwords do not match.",
          true,
        );
        return;
      }

      const user = {
        name,
        email,
        loggedIn: true,
        registeredAt: new Date().toISOString(),
      };

      saveUser(user);

      showMessage(
        messageElement,
        "Account created successfully. Redirecting...",
      );

      setTimeout(() => {
        redirectToDashboard();
      }, 700);
    });
  }
});
