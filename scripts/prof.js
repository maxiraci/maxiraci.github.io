/*
  PROFESSION TEXT SCROLL
*/

var currentProfessionIndex = 0;
var nextProfessionIndex = 0;
var professions = [
  "Game Developer",
  "Composer",
  "Programmer",
  "Jack-of-all-trades",
  "University Graduate",
  "Web Developer",
  "VR Developer"
];

var text_element = document.getElementById("profession-text");
var text_type_timeout;
var text_index = 0;

function set_text_value(value)
{
  text_element.innerText = value;
}
function get_text_value()
{
  return text_element.innerText;
}

var currentProfessionText = professions[currentProfessionIndex];
var speed = 50;

// type the profession string out forwards
function type_out_profession() {
  if(text_element == null) text_element = document.getElementById("profession-text");
  if (text_index < currentProfessionText.length + 1) {
    set_text_value("> " + currentProfessionText.substring(0, text_index));
    text_index++;
    text_type_timeout = setTimeout(type_out_profession, speed - (Math.random() * 20));
  }
  else {
    // if here, the string is fully typed out
    var blink_delay = Math.floor((Math.random() * 5) + 1) * 50;
    text_type_timeout = setTimeout(blink_cursor, blink_delay + 200);
    choose_next_profession();
  }
}

var cursor_blinks = 4;
function blink_cursor() {
  if (cursor_blinks > 0) {
    var undersc = "_";
    if (get_text_value().slice(-1) === "_") {
      undersc = "";
    }
    set_text_value("> " + currentProfessionText.substring(0, text_index) + undersc);
    cursor_blinks--;
    text_type_timeout = setTimeout(blink_cursor, 350);
  }
  else {
    cursor_blinks = Math.floor((Math.random() * 4) + 2) * 2;
    text_type_timeout = setTimeout(erase_profession_text, 0);
  }
}

//choose new profession to display ahead of time
function choose_next_profession()
{
    var profnew = -1;
    do {
      profnew = Math.floor((Math.random() * professions.length));
    } while (profnew == currentProfessionIndex);
    nextProfessionIndex = profnew;
}

// remove current profession text up until it would make sense for the typist to stop (as it's already there)
function erase_profession_text() {
  var _currentLen = get_text_value().length;
  var _newTextCheck = professions[nextProfessionIndex].substr(0,_currentLen-2);
  var _oldTextCheck = get_text_value().substr(2);
  // console.log("A: " + _oldTextCheck + ", B: " + _newTextCheck);
  if (_currentLen <= 2 || (_newTextCheck == _oldTextCheck)) {
    speed = Math.floor((Math.random() * 50) + 100);
    text_index = Math.max(0,_currentLen-2);

    currentProfessionText = professions[nextProfessionIndex];
    currentProfessionIndex = nextProfessionIndex;

    text_type_timeout = setTimeout(type_out_profession, 250);
    return;
  }

  set_text_value(get_text_value().slice(0, -1));
  text_type_timeout = setTimeout(erase_profession_text, 50);
}