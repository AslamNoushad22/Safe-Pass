const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");
const strengthLabel = document.getElementById("strengthLabel");

const ruleLength = document.getElementById("rule-length");
const ruleUpper = document.getElementById("rule-upper");
const ruleNumber = document.getElementById("rule-number");
const ruleSymbol = document.getElementById("rule-symbol");

const togglePassword = document.getElementById("togglePassword");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");

/* ------------ Strength Logic ------------- */
function getStrength(password) {
  let score = 0;

  if (password.length >= 6) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score;
}

function updateRules(password) {
  ruleLength.classList.toggle("active", password.length >= 6);
  ruleUpper.classList.toggle("active", /[A-Z]/.test(password));
  ruleNumber.classList.toggle("active", /[0-9]/.test(password));
  ruleSymbol.classList.toggle("active", /[^A-Za-z0-9]/.test(password));
}

function updateStrength(password) {
  const score = getStrength(password);
  let width = 0;
  let color = "transparent";
  let label = "Strength: -";

  if (score === 1) { width = 25; color = "var(--weak)"; label = "Strength: Weak"; }
  if (score === 2) { width = 50; color = "var(--fair)"; label = "Strength: Fair"; }
  if (score === 3) { width = 75; color = "var(--good)"; label = "Strength: Good"; }
  if (score === 4) { width = 100; color = "var(--strong)"; label = "Strength: Strong"; }

  strengthBar.style.width = `${width}%`;
  strengthBar.style.background = color;
  strengthLabel.textContent = label;
}

passwordInput.addEventListener("input", (e) => {
  const value = e.target.value;
  updateRules(value);
  updateStrength(value);
});

/* ------------ Show / Hide Password ------------- */
togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  togglePassword.textContent = isHidden ? "Hide" : "Show";
});

/* ------------ Clear Field ------------- */
clearBtn.addEventListener("click", () => {
  passwordInput.value = "";
  updateRules("");
  updateStrength("");
});

/* ------------ Copy Password ------------- */
copyBtn.addEventListener("click", async () => {
  if (!passwordInput.value) return alert("Enter a password first.");
  await navigator.clipboard.writeText(passwordInput.value);
  copyBtn.textContent = "Copied!";
  setTimeout(() => copyBtn.textContent = "Copy", 1200);
});
