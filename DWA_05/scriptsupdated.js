// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);
  result.innerText = dividend / divider;

  const dividendInput = document.getElementById("dividend");
  const dividerInput = document.getElementById("divider");
  
  //const dividend = parseFloat(dividendInput.value);
  //const divider = parseFloat(dividerInput.value);
  
  if (isNaN(dividend) || isNaN(divider)) {
    result.innerText = "Something critical went wrong. Please reload the page.";
    console.error("Invalid input. Please provide valid numbers.");
    return;
  }

  if (divider === 0) {
    result.innerText = "Division not performed. Cannot divide by zero. Try again.";
    console.error("Division by zero. Please provide a non-zero divider.");
    return;
  }
  
  if (Number.isInteger(dividend / divider)) {
    result.innerText = dividend / divider;
  } else {
    result.innerText = Math.floor(dividend / divider);
    console.warn("Division resulted in a decimal number. Displaying the integer part only.");
  }
});
