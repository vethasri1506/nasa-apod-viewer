const apiKey = "gQ7cFqJcQFHT7trWGGFLKD9ccBtrRnKGq7CQWpBm";


const fetchBtn = document.getElementById("fetchBtn");
const dateInput = document.getElementById("dateInput");
const titleElem = document.getElementById("title");
const dateElem = document.getElementById("date");
const mediaContainer = document.getElementById("mediaContainer");
const explanationElem = document.getElementById("explanation");


async function fetchAPOD(date = "") {

    const url = new URL("https://api.nasa.gov/planetary/apod");

    url.searchParams.set("api_key", apiKey);

    if (date) {
        url.searchParams.set("date", date);
    }

    try {
        titleElem.textContent = "Loading space magic... 🚀";
        dateElem.textContent = "";
        explanationElem.textContent = "";
        mediaContainer.replaceChildren();

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.msg || data.error?.message ||
                "NASA API request failed. Check your API key."
            );
        }

        
        titleElem.textContent = data.title;
        dateElem.textContent = data.date;

        
        if (data.media_type === "image") {

            const img = document.createElement("img");

            img.src = data.url;
            img.alt = data.title;
            img.style.maxWidth = "100%";
            img.style.height = "auto";
            img.style.borderRadius = "8px";
            img.style.margin = "15px 0";

            img.onerror = () => {
                explanationElem.textContent =
                    "Image could not be loaded. Please try again.";
            };

            mediaContainer.appendChild(img);

        } else if (data.media_type === "video") {

            const iframe = document.createElement("iframe");

            iframe.src = data.url;
            iframe.width = "100%";
            iframe.height = "350";
            iframe.allowFullscreen = true;
            iframe.title = data.title;

            mediaContainer.appendChild(iframe);

        } else {
            throw new Error("Unsupported media type.");
        }

        
        explanationElem.textContent = data.explanation;

    } catch (error) {

        console.error("NASA API Error:", error);

        titleElem.textContent = "Error loading data!";
        dateElem.textContent = "";
        mediaContainer.replaceChildren();

        explanationElem.textContent = error.message;
    }
}


fetchBtn.addEventListener("click", () => {

    const selectedDate = dateInput.value;

    if (selectedDate) {
        fetchAPOD(selectedDate);
    } else {
        alert("Please pick a date first!");
    }

});


fetchAPOD();
