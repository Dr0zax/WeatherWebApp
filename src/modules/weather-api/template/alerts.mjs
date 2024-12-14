const dropdownElement = document.querySelectorAll(".dropdown");

dropdownElement.forEach(element => {
    element.addEventListener("click", (e) => {
        if (e.target.classList.contains("dropbtn")) {
            e.target.parentElement.querySelector(".dropdown-content").classList.toggle("active");
        }
    })
    
});

export default function createAlertHTML(feature) {
    return `
        <div class="alert">
            <section class="severity ${(feature.properties.severity.toLowerCase() || "Unknown")}">
                <h1><span id="severity">${feature.properties.severity || "Unknown"}</span> Alert</h1>
            </section>
            <section class="alert-content">
                <h2 class="headline">${feature.properties.event || "Unknown Event"}</h2>
                <p class="time">Effective: <span>${feature.properties.effective || "N/A"}</span> Expires: <span>${feature.properties.expires || "N/A"}</span></p>
                <p class="Counties">${feature.properties.areaDesc || "Unknown Area"}</p>
                <p class="description">${feature.properties.description || "No description available."}</p>
            </section>
        </div>
    `;
}
