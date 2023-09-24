const generateForm = document.querySelector('.generate-form');
const imageGallery = document.querySelector('.image-gallery');

const OPENAI_API_KEY ="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";

const updateImageCard = (imgDataArry) => {
    imgDataArry.forEach((imgObject, index) =>{
        const imgCard = imageGallery.querySelectorAll(".img-card")[index];
        const imgElement = imgCard.querySelector("img");

        // Set the image source to the AI-generated image data
        const aiGeneratedImg = `data:image/jpeg;base64,${imgObject.b64_json}`
        imgElement.src = aiGeneratedImg;

        // When the image is loaded, remove the loading class
        imgElement.onload = () => {
            imgCard.classList.remove("loading");
        }
    })
}

const  generateAiImages = async (userPrompt, userImgQuantity) => {
    try {
        // Send a request to the OpenAI API to generated images bases on user inputs
        const response = await fetch ("https://api.openai.com/v1/images/generations",{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n:parseInt(userImgQuantity),
                size: "512x512",
                response_format:"b64_json",
            })
            
        });

        if(!response.ok) throw new error("Failed to generated images! Please try again.");

        const { data } = await response.json(); //Get data from the response
        updateImageCard([...data]);
    } catch (error) {
        alert(error.message);
    }
}

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
    generateAiImages(userPrompt, userImgQuantity);

}

generateForm.addEventListener('submit', handleFormSubmission);