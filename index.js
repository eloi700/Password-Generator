//DOM Elements
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const symbolsEl = document.getElementById("symbols");
const numbersEl = document.getElementById("numbers");
const lengthEl = document.getElementById("length");
const clipboardEl = document.getElementById("clipboard");
const generateEl = document.getElementById("generate");
const resultEl = document.getElementById("result");
const strengthBadge = document.querySelector(".strength-badge");
const strongPassword = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);
const mediumPassword = new RegExp(
  "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
);

const randomFunction = {
  upper: getRandomUpper,
  lower: getRandomLower,
  symbols: getRandomSymbols,
  numbers: getRandomNumbers,
};

// Generate Functions
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// function getRandomSymbols(){
//     return String.fromCharCode(Math.floor(Math.random()*15) + 33);
// }

function getRandomSymbols() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function getRandomNumbers() {
  const numbers = "0123456789";
  return numbers[Math.floor(Math.random() * numbers.length)];
  // return String.fromCharCode(Math.floor(Math.random)*10 + 48);
}

// Generate Event Listener
generateEl.addEventListener("click", () => {
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;
  const length = +lengthEl.value;
  let timeout;

  resultEl.innerText = generatePassword(
    hasLower,
    hasNumber,
    hasSymbol,
    hasUpper,
    length
  );
  strengthBadge.style.visibility = "visible";
  clearTimeout(timeout);
});

// Generate Password Function
function generatePassword(lower, numbers, symbols, upper, length) {
  // Initialize password variable
  let generatedPassword = "";

  // Count the number of the checked values
  const typesCount = lower + numbers + symbols + upper;

  // Filter out unchecked types - wrapping in curly bracket (setting it as a key) Filter - higher order array method ().
  // Getting the value wether it false [0] or true
  const typesArr = [{ lower }, { upper }, { numbers }, { symbols }].filter(
    (item) => Object.values(item)[0]
  );

  // If doesn't have selected type
  if (typesCount === 0) {
    return "";
  }

  // Loop over length call generator function for each type
  // functionName - these are the Object keys such as lower, upper, symbol, number

    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
        const functionName = Object.keys(type)[0];

        //Add final password to the password variable and return
        generatedPassword += randomFunction[functionName]();
      });
  }
  const finalPassword = generatedPassword.slice(0, length);

  timeout = setTimeout(() => PasswordStrengthChecker(finalPassword), 500);

  return finalPassword;
}

// Copy Password to Clipboard
clipboardEl.addEventListener("click", () => {
  const textArea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  // alert("Password copied to Clipboard");
});

// Password Strength Checker
function PasswordStrengthChecker(PasswordParameter) {
    strengthBadge.classList.remove("strong");
    strengthBadge.classList.remove("medium");
    strengthBadge.classList.remove("weak");

  if (strongPassword.test(PasswordParameter)) {
    strengthBadge.classList.add("strong");
    strengthBadge.textContent = "Strong";
  } else if (mediumPassword.test(PasswordParameter)) {
    strengthBadge.classList.add("medium");
    strengthBadge.textContent = "Medium";
  } else {
    strengthBadge.classList.add("weak");
    strengthBadge.textContent = "Weak";
  }
}
