const inputsForm = document.querySelectorAll(".input-form-laptop")

inputsForm.forEach((input) => {
    input.addEventListener("change", () => {
        const inputModalId = input.id + "Modal"
        const inputModal = document.getElementById(inputModalId)
        inputModal.value = input.value
    })
})