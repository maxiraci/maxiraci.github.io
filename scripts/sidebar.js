$("#page-sidebar-header").load( "./sidebar.html", function() {
    $("#me_img").attr("src",$("#temp-img").attr('src'));
    $("#temp-img").remove();
    close_sidebar();
    type_out_profession();
});

function set_sidebar_status(sidebar, status)
{
    if(status) sidebar.classList.add("open");
    else sidebar.classList.remove("open");

    document.getElementById("toggle-sidebar").innerHTML = status ? '&times;' : '&#9776;';
}

function toggle_sidebar()
{
    var sidebar = document.getElementById("sidebar");
    set_sidebar_status(sidebar, !sidebar.classList.contains("open"));
}

function close_sidebar()
{
    var sidebar = document.getElementById("sidebar");
    set_sidebar_status(sidebar, false);
}

// // set the sidebar to closed when the page is fully loaded
// if (window.addEventListener) {
//     window.addEventListener('load', close_sidebar, false);
// } else if (window.attachEvent) { // IE 6-10 support
//     window.attachEvent('onload', close_sidebar);
// }