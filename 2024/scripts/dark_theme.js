function getPrefersDark() {
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

let dark_mode = localStorage.getItem("dark-theme") ?? getPrefersDark();
if (typeof (dark_mode) == "string") dark_mode = (dark_mode === "true");

function setDarkTheme(dark) {
    dark_mode = dark;

    document.body.classList.toggle("dark", dark);
    document.documentElement.classList.toggle("dark", dark);

    document.querySelectorAll(".dark-theme-status").forEach(element => {
        element.innerText = (dark) ? "🌑" : "☀"; 
    });

    let computer = document.querySelector("#computer");
    if (computer) {
        computer.environmentImage = `./images/hdri/${dark_mode ? "night" : "day"}.jpg`;
        // computer.exposure = (dark_mode) ? 0.2 : 1;

        let bloomEffect = computer.querySelector("bloom-effect");
        console.log(bloomEffect);
        bloomEffect.strength = dark_mode ? 0.75 : 0;
        // bloomEffect.radius = dark_mode ? 0.5 : 0;

        computer.variantName = (dark_mode) ? "night" : "day";
        // bloomEffect.radius = dark_mode ? 3 : 0;
        // computer.shadowIntensity = (dark_mode) ? 10 : 1;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // run it once to make sure
    setDarkTheme(dark_mode);
}); 