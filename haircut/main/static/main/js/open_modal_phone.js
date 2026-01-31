const buttonsConsultationFormPhone = document.querySelectorAll(".button-consultation-form");
const consultationFormPhone = document.querySelector(".consultation-form-phone");
const phoneCloseButtonModal = document.querySelector(".modal-consultation-hat-button")
buttonsConsultationFormPhone.forEach((button)=>{
    button.addEventListener("click", ()=>{
        consultationFormPhone.classList.toggle("hidden");
    })
})
phoneCloseButtonModal.addEventListener("click", ()=>{
    consultationFormPhone.classList.toggle("hidden");
})