function addPauseListener()
{
    document.querySelectorAll("audio").forEach(o => {
        o.addEventListener('contextmenu', event => event.preventDefault());
        o.addEventListener("play", function(o) { pauseAll(o);});
    });

    
}

function pauseAll(audio)
{
    document.querySelectorAll("audio").forEach(o => {
        if(o != audio.target) o.pause();
    });
}

// set the sidebar to closed when the page is fully loaded
if (window.addEventListener) {
    window.addEventListener('load', addPauseListener, false);
} else if (window.attachEvent) { // IE 6-10 support
    window.attachEvent('onload', addPauseListener);
}