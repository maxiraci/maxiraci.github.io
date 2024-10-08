window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    var scroll = document.documentElement.scrollTop;
    document.body.style.setProperty('--scroll', scroll + "px");
    document.body.style.setProperty('--scroll-val', scroll);
}

function getRandomOffset(max, i, offset = 0, randomDir = 0) {
    randomDir = (randomDir != 0) ? randomDir : Math.sign(Math.random() - 0.5);
    let out = (Math.random() * max * (Math.pow(-1, i + 1)) + offset) * randomDir;
    console.log(typeof (out));
    return [out, randomDir];
}

function toggleDarkMode() {
    setDarkTheme(!dark_mode);
    localStorage.setItem("dark-theme", dark_mode);
}

function radians_to_degrees(radians) { return radians * (180 / Math.PI); }

// const header = document.querySelector("#header-title");
const modelViewer = document.querySelector('#computer');
const pixelation = computer.querySelector('pixelate-effect');
// modelViewer.addEventListener("camera-change", (event) => {
// });

function setPixelGranularity() {
    pixelation.granularity = window.devicePixelRatio * 3;
}

setPixelGranularity();