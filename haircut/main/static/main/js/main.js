const buttonMenu = document.querySelector(".button-menu");
const menuContainer = document.querySelector(".modal-hat-frame");
const closeMenu = document.querySelector(".button-cross");


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