const apiKey = 'MDmk9KmHRFpFdwptMgD9bCjFkjtHp7CbTGMGFGNC'; 

const fetchBtn = document.getElementById('fetchBtn');
const dateInput = document.getElementById('dateInput');
const titleElem = document.getElementById('title');
const dateElem = document.getElementById('date');
const apodImage = document.getElementById('apodImage');
const explanationElem = document.getElementById('explanation');

function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

async function fetchAPOD(date = '') {
    let url = `[https://api.nasa.gov/planetary/apod?api_key=$](https://api.nasa.gov/planetary/apod?api_key=$){apiKey}`;
    if (date) {
        url += `&date=${date}`;
    }

    try {
        titleElem.innerText = "Loading space magic... 🌌";
        dateElem.innerText = "";
        explanationElem.innerText = "";
        apodImage.src = "";

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            titleElem.innerText = data.title;
            dateElem.innerText = data.date;
            apodImage.src = data.url;
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
