const inputPhoto = document.getElementById("idPhoto");
const photosContainer = document.querySelector(".photos-container");

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