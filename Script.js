document.addEventListener("DOMContentLoaded", function() {
    const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", //... add all countries
    ];

    const countryList = document.getElementById("country-list");

    countries.forEach(country => {
        const li = document.createElement("li");
        li.textContent = country;
        li.addEventListener("click", function() {
            li.classList.toggle("crossed-out");
        });
        countryList.appendChild(li);
    });
});
