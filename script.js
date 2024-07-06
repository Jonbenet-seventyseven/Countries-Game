document.addEventListener("DOMContentLoaded", async function() {
    const countryList = document.getElementById("country-list");
    const totalCountriesElement = document.getElementById("total-countries");
    const crossedOutCountElement = document.getElementById("crossed-out-count");
    const remainingCountriesElement = document.getElementById("remaining-countries");
    const searchBar = document.getElementById("search-bar");
    const clearButton = document.getElementById("clear-crossed-out");
    const filePath = 'country-list.txt'; // Path to the local text file

    let countries = [];

    const updateCounter = () => {
        const totalCountries = document.querySelectorAll('#country-list li').length;
        const crossedOutCount = document.querySelectorAll('.crossed-out').length;
        const remainingCountries = totalCountries - crossedOutCount;

        totalCountriesElement.textContent = totalCountries;
        crossedOutCountElement.textContent = crossedOutCount;
        remainingCountriesElement.textContent = remainingCountries;
    };

    const filterCountries = (query) => {
        const lowerCaseQuery = query.toLowerCase();
        document.querySelectorAll('#country-list li').forEach(li => {
            const matches = li.textContent.toLowerCase().includes(lowerCaseQuery);
            li.style.display = matches ? '' : 'none';
        });
    };

    const clearCrossedOut = () => {
        document.querySelectorAll('.crossed-out').forEach(li => {
            li.classList.remove('crossed-out');
        });
        updateCounter();
    };

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const text
