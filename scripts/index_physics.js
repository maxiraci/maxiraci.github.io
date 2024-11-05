// Fetch all the details element.
const details = document.querySelectorAll("details");

// Add the onclick listeners.
details.forEach((detail) => {
    detail.addEventListener("toggle", () => {
        if (detail.open) {
            setTargetDetail(detail);
        }
        else {
            let group = detail.dataset.group;
            if (current_constraint_group == group) {
                removeConstraintGroup(group);
            }
        }
    });
});

// Close all the details that are not targetDetail.
function setTargetDetail(targetDetail) {
    details.forEach((detail) => {
        let group = detail.dataset.group;
        if (detail !== targetDetail) {
            detail.open = false;
            if (current_constraint_group == group) {
                console.log(`removing id ${group}`);
                removeConstraintGroup(group);
            }
        }
    });
    
    setConstraintGroup(targetDetail.dataset.group);
}

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Common = Matter.Common,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Body = Matter.Body,
    Bodies = Matter.Bodies;


/*
to add:
    - linux
    - ubuntu (?)
    - godot
    - ajax
*/

var logo_sprites = {
    "cpp":      [48, 0, "circle"],
    "csharp":   [48, 0, "circle"],
    "dynamodb": [32, 0, "circle"],
    "unity":    [32, 0, "circle"],
    "aws":      [40, 0, "circle"],
    "css3":     [48, 64, "rect" ],
    "dotnet":   [64, 64, "rect" ],
    "html5":    [48, 64, "rect" ],
    "java":     [64, 64, "rect" ],
    "js":       [96, 96, "rect" ],
    "npm":      [64, 64, "rect" ],
    "python":   [48, 0, "circle"],
    "lambda":   [64, 64, "rect" ],
    "steamvr":  [64, 64, "rect" ],
    "vuejs":    [64, 64, "rect" ],
    "reactjs":  [32, 0, "circle"]
}

var sprite_list = [];
var sprites = {};
var constraints = {};
var current_constraint_group = "";
var constraint_groups = {
    "general": ["cpp", "csharp", "dotnet", "java", "python"],
    "frontend": ["html5", "js", "css3", "vuejs", "reactjs"],
    "backend": ["js", "npm", "aws", "python"],
    "gamedev": ["csharp", "dotnet", "unity", "java", "python"],
    "vr": ["csharp", "dotnet", "unity", "steamvr"],
    "cloud": ["aws", "lambda", "dynamodb", "python"],
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBody(x, y, icon, details) {
    let body = null;
    switch (details[2]) {
        case "rect":
            body = Bodies.rectangle(x, y, details[0], details[1], {
                render: {
                    strokeStyle: '#ffffff',
                    sprite: {
                        texture: `./images/index/physics_sim/${icon}_logo.png`
                    }
                },
                details: details,
                icon: icon,
                id: `body_${icon}`
            });
            break;
        case "circle":
            body = Bodies.circle(x, y, details[0], {
                // density: 0.0005,
                // frictionAir: 0.06,
                // restitution: 0.3,
                // friction: 0.01,
                render: {
                    sprite: {
                        texture: `./images/index/physics_sim/${icon}_logo.png`
                    }
                },
                details: details,
                icon: icon,
                id: `body_${icon}`
            });
            break;
    }
    return body;
}
let width = 700, height = 450;

// create engine
var engine = Engine.create(),
    world = engine.world;

// create renderer
var render = Render.create({
    element: document.querySelector("#sim-element"),
    engine: engine,
    options: {
        width: width,
        height: height,
        showAngleIndicator: false,
        wireframes: false,
        background: "transparent"
    }
});


// create runner
var runner = Runner.create();

// add bodies
var offset = 10,
    options = { 
        isStatic: true
    },
    options_transparent = {
        isStatic: true,
        render: {
            fillStyle: '#00000000',
            strokeStyle: '#00000000',
        }
    };

world.bodies = [];

Composite.add(world, [
    Bodies.rectangle(width/2, -height-offset, (width + 0.5) + 2 * offset, 50.5, options),
    Bodies.rectangle(width/2, height + offset, (width + 0.5) + 2 * offset, 50.5, options),
    Bodies.rectangle(width + offset, height/2, 25.5, (height * 4 + 0.5) + 2 * offset, options_transparent),
    Bodies.rectangle(-offset, height/2, 25.5, (height * 4 + 0.5) + 2 * offset, options_transparent)
]);

var logos = Object.entries(logo_sprites);
shuffleArray(logos);
var index = 0;

var stack = Composites.stack(width/4, -400, 4, 4, 0, 0, function (x, y) {
    let [logo, details] = logos[index];
    index += 1;
    let body = createBody(x, y, logo, details);
    sprites[logo] = body;
    sprite_list.push(body);
    return body;
});

Composite.add(world, stack);

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

Composite.add(world, mouseConstraint);
mouseConstraint.mouse.element.removeEventListener("wheel", mouseConstraint.mouse.mousewheel);
mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

// add "grab" cursor on mouse-over
Matter.Events.on(mouseConstraint, 'mousemove', function (event) {
    var foundPhysics = Matter.Query.point(sprite_list, event.mouse.position);
    render.canvas.style.cursor = (foundPhysics.length > 0) ? "grab" : "default"; 
});

function startRender() {
    Render.run(render);
    // keep the mouse in sync with rendering
    render.mouse = mouse;
    Runner.run(runner, engine);
    
    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: width, y: height }
    });
}

function setConstraintGroup(id) {
    current_constraint_group = id;
    let len = constraint_groups[id].length;
    let padding = 200 - (20*len);
    let left = padding, right = width - padding;
    for (let i = 0; i < len; i++) {
        let xpos = left + (right - left) * (i / (len - 1));
        const element = constraint_groups[id][i];
        addConstraint(element, xpos, 100);
    }
}

function removeConstraintGroup(id) {
    let len = constraint_groups[id].length;
    for (let i = 0; i < len; i++) {
        const element = constraint_groups[id][i];
        removeConstraint(element);
    }
    current_constraint_group = "";
}

function setCollision(body, enabled) {
    body.isSensor = !enabled;
}

function addConstraint(id, x, y) {
    let sprite = sprites[id];
    let pos = JSON.parse(JSON.stringify(sprite.position));
    setCollision(sprite, false);

    Body.setPosition(sprite, { x: x, y: y });
    Body.rotate(sprite, -sprite.angle);
    Body.setAngularVelocity(sprite, 0);
    Body.setInertia(sprite, Infinity);
    var constraint = Constraint.create({
        pointA: { x: x, y: y },
        bodyB: sprite,
        stiffness: 0.05,
        render: {
            visible: false
        }
    });
    constraints[id] = constraint;

    Composite.add(world, constraint);
    Body.setVelocity(sprite, { x: 0, y: 0 });

    // smoothly slide over if they're already "up"
    if (Math.abs(pos.y-y > 5)) {
        Body.setPosition(sprite, { x: x, y: y + 50});
    } else {
        Body.setPosition(sprite, pos);
    }
    // Body.setPosition(sprite, pos);

    setTimeout(() => {    
        Body.setPosition(sprite, { x: x, y: y });
    }, 300);
}

function removeConstraint(id) {
    Composite.remove(world, constraints[id], true);
    Matter.Body.setInertia(sprites[id], 32000);
    delete constraints[id];
    setCollision(sprites[id], true);
}

let load = false;
const physics_observer_config = {
    root: null, // Sets the framing element to the viewport
    rootMargin: "0px",
    threshold: 0.5
},
    physics_observer = new IntersectionObserver((entries) => entries
        .forEach(({ target: { _ }, intersectionRatio }) => {
            if (intersectionRatio >= 0.5 && !load) {
                load = true;
                startRender();
            }
        }), physics_observer_config);

physics_observer.observe(document.querySelector("#fun-physics-sim"));