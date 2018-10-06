//constants
var height = window.innerHeight;
var width = window.innerWidth;
var c_x = Math.floor(p_x * width);
var c_y = Math.floor(p_y * height);
var bgColor = '#252539';
var lineColor = [125, 125, 125];
var lineWidth = 1;
var minRadius = 10;
var maxRadius = Math.floor(0.9 * Math.max(height, width));
var minDtheta = Math.PI / 2;
var maxDtheta = 0.9 * 2 * Math.PI;
var numArcs = 50;
var omega = 0.0001; //rads per millisecond
var colors = ["#FF3F8E", "#04C2C9", "#2E55C1"];

//classes
function Arc(center){
    radius = getRandomRadius();
    this.circle = (new Circle(center)).setRadius(radius);
    thetaStart = getRandomTheta();
    thetaEnd = thetaStart + getRandomDtheta();
    this.start = new Vector(radius * Math.cos(thetaStart), radius * Math.sin(thetaStart));
    this.end = new Vector(radius * Math.cos(thetaEnd), radius * Math.sin(thetaEnd));
}

//main
var space;
var mouse = new Vector(c_x, c_y);
function arcSpace() {
    space = new CanvasSpace().setup({bgcolor: bgColor});
    var form = new Form(space);
    var center = new Vector(c_x, c_y);
    mouse = center.clone();

    var arcs = []
    for (var i = 0; i < numArcs; i++){
        arcs.push(new Arc(center));
    }
    
    space.add({
        animate: function(time, fps, context) {
            for (var i = 0; i < numArcs; i++){
                arc = arcs[i];
                arc.start.rotate2D( Const.one_degree / 20);
                arc.end.rotate2D( Const.one_degree / 20);

                color = getColorFromDistance(Math.abs(center.$subtract(mouse).magnitude() - arc.circle.radius));

                form.stroke(color, lineWidth).fill(false).arc(arc.circle, arc.start.angle(), arc.end.angle());
                form.stroke(false).fill(colors[i % 3]).point(arc.start.$add(center));
                form.stroke(false).fill(colors[i % 3]).point(arc.end.$add(center));
            }
        }
    });
    space.play();
}

arcSpace();

$(window).resize(function(){
    space.removeAll();
    arcSpace();
});

$("body").mousemove(function(e) {
    mouse.set(e.clientX, e.clientY);
})

//functions
function getRandomRadius(){
    return Math.random() * (maxRadius - minRadius) + minRadius;
}

function getRandomTheta(){
    return Math.random() * 2 * Math.PI;
}

function getRandomDtheta(){
    return Math.random() * (maxDtheta - minDtheta) + minDtheta;
}

function getColorFromDistance(distance){
    if (distance > 200){
        brightness = 0.5;
    }
    else if (distance < 10){
        brightness = 1;
    }
    else{
        brightness = 1 - 0.6/190 * (distance - 10);
    }
    return 'rgba(' + lineColor[0] + ', ' + lineColor[1] + ', ' + lineColor[2] + ', ' + brightness + ')';
}