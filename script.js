document.addEventListener("DOMContentLoaded", async function() {
    const countryList = document.getElementById("country-list");
    const totalCountriesElement = document.getElementById("total-countries");
    const crossedOutCountElement = document.getElementById("crossed-out-count");
    const remainingCountriesElement = document.getElementById("remaining-countries");
    const filePath = 'country-list.txt'; // Path to the local text file

    const updateCounter = () => {
        const totalCountries = document.querySelectorAll('#country-list li').length;
        const crossedOutCount = document.querySelectorAll('.crossed-out').length;
        const remainingCountries = totalCountries - crossedOutCount;

        totalCountriesElement.textContent = totalCountries;
        crossedOutCountElement.textContent = crossedOutCount;
        remainingCountriesElement.textContent = remainingCountries;
    };

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const text = await response.text();
        const countries = text.split('\n').map(country => country.trim()).filter(Boolean);

        if (countries.length === 0) {
            throw new Error('No countries found in file');
        }

        countries.forEach(country => {
            const li = document.createElement("li");
            li.textContent = country;
            li.addEventListener("click", function() {
                li.classList.toggle("crossed-out");
                updateCounter();
            });
            countryList.appendChild(li);
        });

        // Initialize the counter
        updateCounter();
    } catch (error) {
        console.error('Error fetching country list:', error);
        countryList.innerHTML = `<li>${error.message}</li>`;
    }
});
