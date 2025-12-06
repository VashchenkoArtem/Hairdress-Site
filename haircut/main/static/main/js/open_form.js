const firstStep = document.querySelector(".payment-buttons");
const firstArrow = document.querySelector(".first-arrow");

const secondStep = document.querySelector(".form-fields-and-button");
const secondArrow = document.querySelector(".second-arrow");

firstArrow.addEventListener("click", ()=>{
    firstArrow.classList.toggle("rotate");
    firstStep.classList.toggle("hidden");
})
secondArrow.addEventListener("click", ()=>{
    secondArrow.classList.toggle("rotate");
    secondStep.classList.toggle("hidden");
})