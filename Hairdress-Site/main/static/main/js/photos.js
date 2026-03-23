const inputsPhoto = document.querySelectorAll(".input-photo")
const inputsPhotoPhone = document.querySelectorAll("#idPhotoPhone");
const photosContainer = document.querySelector(".client-photos");
const photosContainerPhone = document.querySelector(".photos-container-phone");

inputsPhoto.forEach((inputPhoto) => {
    inputPhoto.addEventListener("change", ()=>{
        photosContainer.innerHTML = "";
        const photosFiles = inputPhoto.files;
        Array.from(photosFiles).forEach(file => {
            if (!file.type.startsWith("image/")) return;
    
            const reader = new FileReader();
    
            reader.onload = (e) => {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.classList.add("preview-photo");
    
            photosContainer.appendChild(img);
            };
    
            reader.readAsDataURL(file);
        });
    })
})

if (inputsPhotoPhone){
    inputsPhotoPhone.forEach((inputPhotoPhone) => {
        inputPhotoPhone.addEventListener("change", ()=>{
            photosContainerPhone.innerHTML = "";
            const photosFiles = inputPhotoPhone.files;
            console.log("sadasd")
            Array.from(photosFiles).forEach(file => {
                if (!file.type.startsWith("image/")) return;
        
                const reader = new FileReader();
        
                reader.onload = (e) => {
                const img = document.createElement("img");
                img.src = e.target.result;
                img.classList.add("preview-photo-phone");
        
                photosContainerPhone.appendChild(img);
                };
        
                reader.readAsDataURL(file);
            });
        })
    })
}