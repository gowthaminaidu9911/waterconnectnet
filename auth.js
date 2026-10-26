// auth.js - simple client-side authentication for AquaConnect
// Users are stored in localStorage (persists across visits).
// The active session is stored in sessionStorage (cleared when the tab closes).

const AQUA_USERS_KEY = "aquaUsers";
const AQUA_SESSION_KEY = "aquaCurrentUser";

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(AQUA_USERS_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(AQUA_USERS_KEY, JSON.stringify(users));
}

// Returns { ok: true } on success or { ok: false, message } on failure.
function registerUser(user) {
  const users = getUsers();
  const usernameTaken = users.some(
    (u) => u.username.toLowerCase() === user.username.toLowerCase()
  );
  if (usernameTaken) {
    return { ok: false, message: "That username is already taken. Please choose another." };
  }
  const emailTaken = users.some(
    (u) => u.email.toLowerCase() === user.email.toLowerCase()
  );
  if (emailTaken) {
    return { ok: false, message: "An account with this email already exists." };
  }
  users.push(user);
  saveUsers(users);
  return { ok: true };
}

function validateLogin(username, password) {
  const users = getUsers();
  return users.find(
    (u) =>
      u.username.toLowerCase() === username.toLowerCase() &&
      u.password === password
  );
}

function setCurrentUser(username) {
  sessionStorage.setItem(AQUA_SESSION_KEY, username);
}

function getCurrentUser() {
  return sessionStorage.getItem(AQUA_SESSION_KEY);
}

function logoutUser() {
  sessionStorage.removeItem(AQUA_SESSION_KEY);
  window.location.href = "index.html";
}

// Call this at the top of any page that requires a logged-in user.
function requireAuth() {
  if (!getCurrentUser()) {
    window.location.href = "index.html";
  }
}
