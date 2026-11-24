const apiKey = 'MDmk9KmHRFpFdwptMgD9bCjFkjtHp7CbTGMGFGNC';

const fetchBtn = document.getElementById('fetchBtn');
const dateInput = document.getElementById('dateInput');
const titleElem = document.getElementById('title');
const dateElem = document.getElementById('date');
const mediaContainer = document.getElementById('mediaContainer');
const explanationElem = document.getElementById('explanation');

async function fetchAPOD(date = '') {
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    if (date) {
        url += `&date=${date}`;
    }

    try {
        titleElem.innerText = "Loading space magic... 🌌";
        dateElem.innerText = "";
        explanationElem.innerText = "";
        mediaContainer.innerHTML = "";

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            titleElem.innerText = data.title;
            dateElem.innerText = data.date;
            
            if (data.media_type === 'video') {
                mediaContainer.innerHTML = <iframe width="100%" height="350" src="${data.url}" frameborder="0" allowfullscreen></iframe>;
            } else {
                mediaContainer.innerHTML = <img id="apodImage" src="${data.url}" alt="NASA Space Image" style="max-width: 100%; height: auto; border-radius: 8px; margin: 15px 0;">;

            explanationElem.innerText = data.explanation;
        } else {
            titleElem.innerText = "Error loading data!";
            explanationElem.innerText = data.msg;
        }
    } catch (error) {
        titleElem.innerText = "Network Error!";
        explanationElem.innerText = "Could not connect to NASA. Please check your internet connection.";
    }
}

fetchBtn.addEventListener('click', () => {
    const selectedDate = dateInput.value;
    if (selectedDate) {
        fetchAPOD(selectedDate);
    } else {
        alert("Please pick a date first!");
    }
});

fetchAPOD();
