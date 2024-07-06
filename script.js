document.addEventListener("DOMContentLoaded", async function() {
    const countryList = document.getElementById("country-list");
    const filePath = 'country-list.txt'; // Path to the local text file

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const text = await response.text();
        const countries = text.split('\n').map(country => country.trim()).filter(Boolean);

        countries.forEach(country => {
            const li = document.createElement("li");
            li.textContent = country;
            li.addEventListener("click", function() {
                li.classList.toggle("crossed-out");
            });
            countryList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching country list:', error);
        countryList.innerHTML = '<li>Error loading countries</li>';
    }
});
