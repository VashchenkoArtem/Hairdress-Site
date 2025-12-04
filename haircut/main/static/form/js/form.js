const screenWidth = window.innerWidth;
const buttons = document.querySelectorAll(".button");
const laptopDesign = document.querySelector(".design-for-laptop");
const phoneDesign = document.querySelector(".design-for-phone");
const modalPayload = document.querySelector(".modal-payload-frame");
const modalPayloadBg = document.querySelector(".blur-payload-bg");


if (screenWidth < 768){
    phoneDesign.classList.remove("hidden");
    laptopDesign.classList.add("hidden");
}else if(screenWidth > 767){
    laptopDesign.classList.remove("hidden");
    phoneDesign.classList.add("hidden");
}

buttons.forEach((button)=>{
    button.addEventListener("click", ()=>{
        modalPayload.classList.toggle("hidden");
        modalPayloadBg.classList.toggle("hidden");
    })
})
modalPayloadBg.addEventListener("click", ()=>{
    modalPayload.classList.toggle("hidden");
    modalPayloadBg.classList.toggle("hidden");
})
