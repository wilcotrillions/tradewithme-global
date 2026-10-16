// deno-lint-ignore-file no-window
const STORAGE_KEY = "tradewithme_user";

function showMessage(element, message, error = false) {
  if (!element) return;

  element.textContent = message;

  element.className = error
    ? "message error"
    : "message";

  element.style.display = "block";
}

function getUser() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return null;
  }

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function saveUser(user) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(user)
  );
}

function logout() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = "login.html";
}

function requireLogin() {
  const user = getUser();

  if (!user) {
    window.location.href = "login.html";
    return null;
  }

  return user;
}

function setupPasswordToggle() {
  document
    .querySelectorAll(".toggle-password")
    .forEach(button => {

      button.addEventListener("click", () => {

        const input = document.getElementById(
          button.dataset.target
        );

        if (!input) return;

        if (input.type === "password") {
          input.type = "text";
          button.textContent = "Hide";
        } else {
          input.type = "password";
          button.textContent = "Show";
        }
      });
    });
}

document.addEventListener("DOMContentLoaded", () => {

  setupPasswordToggle();

  /* REGISTER */

  const registerForm =
    document.getElementById("registerForm");

  if (registerForm) {

    registerForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const name =
          document.getElementById("name").value.trim();

        const email =
          document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase();

        const password =
          document.getElementById("password").value;

        const confirmPassword =
          document
            .getElementById("confirmPassword")
            .value;

        const message =
          document.getElementById("message");

        if (
          !name ||
          !email ||
          !password ||
          !confirmPassword
        ) {
          showMessage(
            message,
            "Please complete all fields.",
            true
          );
          return;
        }

        if (password.length < 8) {
          showMessage(
            message,
            "Password must contain at least 8 characters.",
            true
          );
          return;
        }

        if (password !== confirmPassword) {
          showMessage(
            message,
            "Passwords do not match.",
            true
          );
          return;
        }

        const user = {
          name: name,
          email: email,
          password: password
        };

        saveUser(user);

        showMessage(
          message,
          "Account created successfully. Redirecting..."
        );

        setTimeout(() => {
          window.location.href =
            "dashboard.html";
        }, 1000);
      }
    );
  }

  /* LOGIN */

  const loginForm =
    document.getElementById("loginForm");

  if (loginForm) {

    loginForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const email =
          document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase();

        const password =
          document.getElementById("password").value;

        const message =
          document.getElementById("message");

        const user = getUser();

        if (!user) {
          showMessage(
            message,
            "No demo account found. Please register first.",
            true
          );
          return;
        }

        if (
          user.email !== email ||
          user.password !== password
        ) {
          showMessage(
            message,
            "Incorrect email or password.",
            true
          );
          return;
        }

        showMessage(
          message,
          "Login successful. Redirecting..."
        );

        setTimeout(() => {
          window.location.href =
            "dashboard.html";
        }, 700);
      }
    );
  }

  /* FORGOT PASSWORD */

  const forgotForm =
    document.getElementById("forgotForm");

  if (forgotForm) {

    forgotForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const email =
          document
            .getElementById("email")
            .value
            .trim();

        const message =
          document.getElementById("message");

        if (!email) {
          showMessage(
            message,
            "Please enter your email.",
            true
          );
          return;
        }

        showMessage(
          message,
          "Demo reset request received. Real email delivery will be connected to the backend."
        );
      }
    );
  }

  /* DASHBOARD */

  const dashboard =
    document.getElementById("dashboard");

  if (dashboard) {

    const user = requireLogin();

    if (!user) {
      return;
    }

    const nameElement =
      document.getElementById("userName");

    const emailElement =
      document.getElementById("userEmail");

    if (nameElement) {
      nameElement.textContent =
        user.name;
    }

    if (emailElement) {
      emailElement.textContent =
        user.email;
    }
  }

  /* LOGOUT */

  const logoutButton =
    document.getElementById("logout");

  if (logoutButton) {
    logoutButton.addEventListener(
      "click",
      logout
    );
  }

});
