const selectImage = document.querySelector('.select-image');
const inputFile = document.querySelector('#file');
const imgArea = document.querySelector('.img-area');
const submitButton = document.querySelector('#submit-button');
const loadingMessage = document.querySelector('#loading-message'); // Ajout de la sélection de la div de message de patience

// Masquer le message de patience initialement
loadingMessage.style.display = 'none';

selectImage.addEventListener('click', function () {
    inputFile.click();
})

inputFile.addEventListener('change', function () {
    const image = this.files[0];
    if (image.size < 2000000) {
        const reader = new FileReader();
        reader.onload = () => {
            // Supprimer toutes les images existantes dans la zone d'image
            imgArea.innerHTML = '';
            
            // Créer et ajouter la nouvelle image
            const imgUrl = reader.result;
            const img = document.createElement('img');
            img.src = imgUrl;
            imgArea.appendChild(img);
            imgArea.classList.add('active');
            imgArea.dataset.img = image.name;
            
            // Afficher le bouton de soumission une fois que l'image a été sélectionnée
            submitButton.hidden = false;
        };
        reader.readAsDataURL(image);
    } else {
        alert("Image size more than 2MB");
    }
});

submitButton.addEventListener('click', function () {
    // Désactiver le bouton de soumission pour éviter les soumissions multiples
    submitButton.disabled = true;
    
    // Afficher le message de patience juste avant d'envoyer la requête au serveur
    loadingMessage.style.display = 'block';

    const formData = new FormData();
    const imageFile = document.querySelector('#file').files[0];
    formData.append('file', imageFile);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result_message => {
        // Rediriger vers la page de résultat et passer le message en paramètre
        window.location.href = '/resultat?message=' + encodeURIComponent(result_message);
    })
    .catch(error => console.error('Error:', error))
    .finally(() => {
        // Masquer le message de patience une fois que la réponse du serveur est reçue
        loadingMessage.style.display = 'none';
    });
});
