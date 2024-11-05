let root = document.documentElement;
root.addEventListener("mousemove", e => {
    root.style.setProperty('--mouse-x', e.pageX + "px");
    root.style.setProperty('--mouse-y', e.pageY + "px");

    let bg_mouse = document.querySelector("#bg-mouse");

    let pixelSize = 8;
    let mouseX = Math.round(e.pageX / pixelSize) * pixelSize;
    let mouseY = Math.round(e.pageY / pixelSize) * pixelSize;

    bg_mouse.style = `background: radial-gradient(circle at ${mouseX}px ${mouseY}px, var(--color-bg-mouse) 0%, transparent 15%);` //#2e5cbe66 15%, 
    // console.log(`radial-gradient(circle at ${e.clientX}px ${e.clientY}px, #2e5cbe 32px, transparent 80%);`);
});