document.getElementById("enableLocation").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchCityName(latitude, longitude);
            },
            (error) => {
                document.getElementById("locationStatus").innerText = 
                    "Unable to fetch location: " + error.message;
            }
        );
    } else {
        document.getElementById("locationStatus").innerText = 
            "Geolocation is not supported by your browser.";
    }
});

function fetchCityName(latitude, longitude) {
    const apiKey = "2c75fbf6d3044b229e1b1c5e69d01e06";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.status.code === 200 && data.results.length > 0) {
                const city = data.results[0].components.city || data.results[0].components.town || data.results[0].components.village;

                document.getElementById("locationStatus").innerText = 
                    city ? `You are in ${city} ` : "City name not found.";
                    document.getElementById("locationStatus").innerHTML = 
    `<button class="btn btn-success w-100 mt-3">
        <a href="./MealPartnerLogin.html" class="text-white text-decoration-none">Find Partner in ${city}</a>
    </button>`;

                    
            } else {
                document.getElementById("locationStatus").innerText = 
                    "Unable to retrieve city name.";
            }
        })
        .catch((error) => {
            document.getElementById("locationStatus").innerText = 
                "Error fetching city name: " + error.message;
        });
}

