document.addEventListener("DOMContentLoaded", async function() {
    const countryList = document.getElementById("country-list");
    const counter = document.getElementById("counter");
    const filePath = 'country-list.txt'; // Path to the local text file

    const updateCounter = () => {
        const crossedOutCount = document.querySelectorAll('.crossed-out').length;
        counter.textContent = `Crossed out countries: ${crossedOutCount}`;
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
