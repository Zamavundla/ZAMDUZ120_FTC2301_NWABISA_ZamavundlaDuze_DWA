// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");
const body = document.querySelector("body")

form.addEventListener("submit", (event) => {
  event.preventDefault();


  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);
  
  if (dividend === "" || divider === "") {    //if you haven't put any input or you input is incomplete.
		result.innerText = "Division not performed. Both values are required in inputs. Try again"

	} else if (dividend < 0 || divider < 0) { // if you have provided a string input
		result.innerText = "Division not performed. Invalid number provided. Try again"
		console.error("Division not performed. Invalid number provided. Try again");

	} else if (dividend == "YOLO" || divider == "+++") { 
		body.innerText = "Something critical went wrong. Please reload the page"
		console.error("Something critical went wrong. Please reload the page");
	} else {
		result.innerText = Math.floor(dividend / divider); // Math.floor used to remove decimals
	}

});