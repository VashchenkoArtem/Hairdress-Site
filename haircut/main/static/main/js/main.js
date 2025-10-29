const buttonMenu = document.querySelector(".button-menu");
const buttonMenuPhone = document.querySelector(".button-menu-phone");
const menuContainer = document.querySelector(".modal-hat-frame");
const closeMenu = document.querySelector(".button-cross");
const closeMenuPhone = document.querySelector(".button-cross-phone");
const screenWidth = window.innerWidth;
const laptopDesign = document.querySelector(".design-for-laptop");
const phoneDesign = document.querySelector(".design-for-phone");
const modalPhone = document.querySelector(".modal-frame-phone");
const titlePhone = document.querySelector(".title-hat-phone");


if (screenWidth < 768){
    phoneDesign.classList.remove("hidden");
    laptopDesign.classList.add("hidden");
}else if(screenWidth > 767){
    laptopDesign.classList.remove("hidden");
    phoneDesign.classList.add("hidden");
}

buttonMenu.addEventListener("click", ()=>{
    buttonMenu.classList.toggle("hidden");
    menuContainer.classList.toggle("hidden");
    menuContainer.classList.toggle("hide-or-show-modal");
})

closeMenu.addEventListener("click", ()=> {
    buttonMenu.classList.toggle("hidden");
    menuContainer.classList.toggle('hidden');
    menuContainer.classList.toggle("hide-or-show-modal");
})

buttonMenuPhone.addEventListener("click", () => {
    buttonMenuPhone.classList.toggle("hide");
    titlePhone.classList.toggle("hide");
    modalPhone.classList.toggle("hide");
})

closeMenuPhone.addEventListener("click", () => {
    buttonMenuPhone.classList.toggle("hide");
    titlePhone.classList.toggle("hide");
    modalPhone.classList.toggle("hide");
})
