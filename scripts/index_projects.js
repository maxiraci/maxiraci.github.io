const { createApp } = Vue

class Project {
    constructor(id, name, date, description, imgsrc, main_link, links, tags = [], force_newpage = false) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.datetime = `${date}-01-01`;
        this.imgsrc = imgsrc;
        this.description = description;
        this.main_link = main_link;
        this.links = links;
        this.tags = tags;
        this.force_newpage = force_newpage;
    }
}

let projects = [
    new Project("vis", "vis (audio visualiser)", "2023",
        "Audio visualisation script written to help audio content embed properly on Discord when using mobile devices (but also makes it looks cool).",
        "./images/projects/vis/vis_in_action.png",
        "./projects/vis.html",
        {}, ["software-dev"]
    ),
    new Project("ultra-trivia", "\"Ultra Trivia\"", "2022",
        "Discord bot that lets users create and run their own trivia games, using Discord features such as slash commands and buttons for an intuitive user experience.",
        "./images/projects/ultra_trivia/question.png",
        "./projects/ultra_trivia.html", {}, ["gamedev", "software-dev"]
    ),
    // new Project("timeframe", "TimeFrame", "2021",
    //     "Project pitch for an AI-powered time management application designed to provide students with schedules they can actually follow.",
    //     "./images/projects/timeframe/timeframe_weekly.png",
    //     "./projects/timeframe.html", {}, ["machine-learning"]
    // ),
    new Project("clocking-out", "clocking out!", "2022",
        "Top-down shooter game about cycling positive and negative effects on a 10-second timer. Made in 72 hours as part of Ludum Dare 51.",
        "./images/projects/clocking_out/clocking_out_prep.png",
        "./projects/clocking_out.html", {
            "fa-solid fa-gamepad": "https://ldjam.com/events/ludum-dare/51/clocking-out",
            "fa-brands fa-github": "https://github.com/Sarexicus/clocking_out"
        }, ["gamedev", "music"]
    ),
    new Project("h5p-code-editor", "Code Editor for H5P", "2021",
        "Project to port a web-based code editor to the H5P platform, alongside an academic paper discussing the features and limitations of online code editors.",
        "./images/projects/h5p_code_editor/code_editor_final.png",
        "./projects/h5p_code_editor.html", {
            "fa-solid fa-file-pdf": "./papers/H5P - Code Editor.pdf",
            "fa-brands fa-github": "https://github.com/uofa-H5P-hub/H5P.CodeEditor"
        }, ["backend-dev", "frontend-dev"]
    ),
    new Project("scavenger-showdown", "Scavenger Showdown", "2021",
        "Competitive scavenger hunt game about finding every item first. Made in 48 hours as part of the 2021 Global Game Jam.",
        "./images/projects/scavenger_showdown/scavshow_gameplay.jpg",
        "./projects/scavenger_showdown.html", {
            // "fa-solid fa-gamepad": "https://sarexicus.itch.io/scavenger-showdown",
            // "fa-brands fa-github": "https://github.com/maxiraci/vrdd2_built_up"
        }, ["gamedev", "music"]
    ),
    new Project("built-up", "Built-Up!", "2020",
        "VR construction game about solving cup-based problems with building-block-based solutions.",
        "./images/projects/built_up/ui_board.png",
        "./projects/built_up.html", {
            "fa-brands fa-bandcamp": "https://maxiraci.bandcamp.com/album/built-up-ost"
            // "fa-brands fa-github": "https://github.com/maxiraci/vrdd2_built_up"
        }, ["gamedev", "VR", "music"]
    ),
    new Project("stack-overflow-post-improver", "Stack Overflow Post Improver", "2020",
        "Academic project about developing a natural-language machine-learning model to improve Stack Overflow posts based on existing edits.",
        "./images/projects/stack_overflow_post_improver/changes_and_warnings.png",
        "./projects/stack_overflow_post_improver.html",
        {
            "fa-solid fa-file-pdf": "./papers/Automatically improving natural language in software documentation using Stack Overflow edits.pdf"
        }, ["backend-dev", "frontend-dev", "machine-learning"]
    ),
    new Project("full-stack-site", "Full Stack Task Management Project", "2020",
        "Full-stack task-allocation site made with Vue.js and Express.js.",
        "./images/projects/full_stack_site/login_modal.png",
        "./projects/full_stack_site.html", {}, ["backend-dev", "frontend-dev"]
    ),
    // new Project("ramigo", "RAMiGo", "2020",
    //     "VR mini-golf game set in the middle of an apocalypse.",
    //     "./images/projects/built_up/ui_board.png",
    //     "./projects/built_up.html", {
    //         // "fa-brands fa-github": "https://github.com/maxiraci/vrdd2_built_up"
    //     }, ["gamedev", "VR"]
    // ),
    new Project("textalogue", "Textalogue", "2019",
        "Visual editor script for the Unity game engine to allow creation and editing of complex dialogue trees.",
        "./images/projects/textalogue/textalogue_dialogue_tree.png",
        "./projects/textalogue.html", {}, ["gamedev", "software-dev"]
    ),
    new Project("canvas", "Canvas", "2019",
        `Competitive rhythm-painting game about controlling as much of the map as possible with your team's colour while following the beat! This one was featured at the <cite><a target="_blank" href="https://www.avcon.org.au/get-involved/indie-games-room/">AVCon Indie Games Room</a></cite> twice.`,
        "./images/projects/canvas/canvas-bg.png",
        "./projects/canvas.html", {
            "fa-brands fa-bandcamp": "https://maxiraci.bandcamp.com/album/canvas-ost-first-batch"
        }, ["gamedev", "music"]
    ),
    new Project("code-on-the-street", "\"Code on the Street\"", "2019",
        "Full-stack Flask-based website project that pits two programming languages against each other based on their presence on Stack Overflow.",
        "./images/projects/code_on_the_street/python_2x.png",
        "./projects/code_on_the_street.html", {
            "fa-brands fa-github": "https://github.com/maxiraci/code-on-the-street"
        }, ["backend-dev", "frontend-dev"]
    ),
    new Project("portfolio-site", "This Portfolio Site", "2024",
        "I made this site fully myself! It's accessible, responsive, and feature-rich.",
        "./images/projects/portfolio_site/portfolio_site_2024.png",
        "./projects/portfolio_site.html", {}, ["frontend-dev"]
    ),
    // new Project("games", "Game Projects", "2024",
    //     "Project pitch.",
    //     "./images/projects/timeframe/timeframe_weekly.png",
    //     "./games.html", []
    // ),
];

const modal = document.querySelector("#active-project");
var active_project_url = modal.querySelector("iframe");

function onModalClick(event) {
    if (event.target === modal) { 
        closeModal();
    }
}

modal.addEventListener("click", onModalClick);
active_project_url.addEventListener("load", modalLoaded);

function modalLoaded() {
    modal.classList.toggle("loaded", true);
}

function setModalLink(link) {
    active_project_url.src = link;
    modal.showModal();
}

function closeModal() {
    active_project_url.src = "";
    modal.close();
    modal.classList.toggle("loaded", false);
}

createApp({
    data() {
        return {
            projects: projects
        }
    },
    methods: {
        show(link, event) {
            setModalLink(link);
            event.preventDefault();
        }
    }
}).mount('main');