document.addEventListener("DOMContentLoaded", async function() {
    const countryList = document.getElementById("country-list");
    const corsProxy = 'https://corsproxy.io/?';
    const wikipediaUrl = 'https://simple.wikipedia.org/wiki/List_of_countries';

    try {
        const response = await fetch(`${corsProxy}${encodeURIComponent(wikipediaUrl)}`);
        const text = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // Modify this selector if Wikipedia's structure changes
        const countryLinks = doc.querySelectorAll('.wikitable tbody tr td:first-child a');

        if (countryLinks.length === 0) {
            throw new Error('No countries found');
        }

        countryLinks.forEach(link => {
            const country = link.textContent.trim();
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
