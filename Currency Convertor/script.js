// const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/currencies";

// const dropdowns = document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("#bttn");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");
// const msg = document.querySelector(".msg");

// for (let select of dropdowns) {
//   for (const currCode in countryList) {
//     let newOption = document.createElement("option");
//     newOption.innerText = currCode;
//     newOption.value = currCode;
//     if (select.name === "from" && currCode === "USD") {
//       newOption.selected = "selected";
//     } else if (select.name === "to" && currCode === "INR") {
//       newOption.selected = "selected";
//     }
//     select.append(newOption);
//   }

//   select.addEventListener("change", (e) => {
//     updateFlag(e.target);
//   });
// }

// const updateFlag = (element) => {
//   let currCode = element.value;
//   let countryCode = countryList[currCode];
//   let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
//   let img = element.parentElement.querySelector("img");
//   img.src = newSrc;
// };

// btn.addEventListener("click", async (e) => {
//   e.preventDefault();

//   let amt = document.querySelector(".amount input");
//   let amtVal = amt.value;
//   if (amtVal === "" || parseFloat(amtVal) < 1) {
//     amtVal = 1;
//     amt.value = "1";
//   }

//   const URL = `${BASE_URL}?base=${fromCurr.value.toLowerCase()}&symbols=${toCurr.value.toLowerCase()}`; // Updated URL structure
//   let response = await fetch(URL);
//   let data = await response.json();
//   let rate = data.rates[toCurr.value.toLowerCase()]; // Access rate from nested object

//   if (rate === undefined) {
//     // Handle potential error if requested currency is not available
//     msg.innerText = "Error: Selected currency is not available.";
//     return;
//   }

//   let finalAmt = amtVal * rate;
//   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt.toFixed(2)} ${toCurr.value}`; // Limit finalAmt to 2 decimal places
// });

const BASE_URL = "https://api.exchangeratesapi.io/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#bttn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (e) => {
    e.preventDefault();

    let amt = document.querySelector(".amount input");
    let amtVal = amt.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amt.value = "1";
    }

    const URL = `${BASE_URL}`; // No additional parameters needed for this API

    let response = await fetch(URL);
    let data = await response.json();

    // Extract the rate for the target currency
    let rate = data.rates[toCurr.value.toUpperCase()];

    if (rate === undefined) {
        // Handle error: Target currency not found in the response
        msg.innerText = "Error: Target currency not supported by the API.";
        return;
    }

    let finalAmt = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
    
    if (data.hasOwnProperty('rates') && data.rates[toCurr.value.toUpperCase()] !== undefined) {
        // Proceed with extracting the rate as usual
        let rate = data.rates[toCurr.value.toUpperCase()];
      } else {
        // Handle error: Target currency not found in the response
        msg.innerText = "Error: Target currency not supported by the API.";
        return;
      }
});
