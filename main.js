const generateForm = document.querySelector('.generate-form');
const imageGallery = document.querySelector('.image-gallery');

const handleFormSubmission = (e) => {
    e.preventDefault();
    // console.log(e.srcElement);
   
   
    // Get user input and image quantity values from the form
    const userPrompt = e.srcElement[0].value;
    const userImgQuantity = e.srcElement[1].value;

    // console.log(userPrompt, userImgQuantity);



    // Creating HTML markup for image cards with loading state
    const imgCardMarkup = Array.from({length: userImgQuantity}, () =>
        `
            <div class="img-card loading">
                <img src="./loading-svgrepo-com.svg" alt="bg">
                <a href="#" class="download-btn"><i class="fa-solid fa-download"></i></a>
            </div>
        `
    ).join('');
    // console.log(imgCardMarkup);
    imageGallery.innerHTML = imgCardMarkup;
    generateAiImages(userPrompt, )

}

generateForm.addEventListener('submit', handleFormSubmission);