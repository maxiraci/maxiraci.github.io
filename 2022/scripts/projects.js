function set_recursive_site_width()
{
    //(${Math.round(percent*100)}%)
    $("#recursive-site-width").text(`${Math.round($("#recursive-site").width()*2)}px`);
}

$(document).ready(function() {
    $(function() { $("#recursive-site").resizable({
        handles: {
            'w': ".resize-handle-left"
        },
        resize: function (event,ui) {
            ui.position.left = ui.originalPosition.left;
            ui.size.width = (ui.size.width
                - ui.originalSize.width )
                + ui.originalSize.width;
            set_recursive_site_width(ui.size.width / ui.originalSize.width);
        }
        }); 
    });

});

var dom_length = 0, max_length = 0;
var dom_text = "";
function typewriter_body()
{
    dom_text = document.querySelector("body").innerHTML;
    document.querySelector("#bg-body").innerText = dom_text;
    document.querySelector("#bg-body2").innerText = document.querySelector("link#projstyle").sheet;
    // max_length = dom_text.length;
    // dom_length = 100;
    // setTimeout(type_body,500);
}

function type_body()
{
    dom_length = (dom_length + 1) % max_length; 
    document.querySelector("#bg-body").innerText = dom_text.substr(0,dom_length);
    setTimeout(type_body,20);
}


typewriter_body();

set_recursive_site_width();

