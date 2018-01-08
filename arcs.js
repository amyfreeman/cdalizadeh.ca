//constants
var height = window.innerHeight;
var width = window.innerWidth;
var c_x = Math.floor(0.9 * width);
var c_y = Math.floor(0.9 * height);
var color = '#444444';
var lineWidth = 1;
var minRadius = 10;
var maxRadius = Math.floor(0.9 * Math.max(height, width));
var minDtheta = Math.PI / 2;
var maxDtheta = 2 * Math.PI;
var numArcs = 10;

//classes
function arc() {
    this.x = c_x;
    this.y = c_y;
    this.color = color;
    this.r = getRandomRadius();
    this.theta = getRandomTheta();
    this.d_theta = getRandomDtheta();
    this.velocity = Math.PI / 10; //rads per second
}
arc.prototype.draw = function() {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, this.theta, this.theta + this.d_theta);
    ctx.stroke();
}

//main
var canvas;
var ctx;

initCanvas();

arcs = []
for (var i = 0; i < numArcs; i++){
    arcs.push(new arc());
    arcs[i].draw();
}

//functions
function initCanvas() {
    canvas = document.querySelector("#back");
    ctx = canvas.getContext("2d");
    ctx.canvas.width  = width;
    ctx.canvas.height = height;
    ctx.lineWidth = lineWidth;
}

function getRandomRadius(){
    return Math.random() * (maxRadius - minRadius) + minRadius;
}

function getRandomTheta(){
    return Math.random() * 2 * Math.PI;
}

function getRandomDtheta(){
    return Math.random() * (maxDtheta - minDtheta) + minDtheta;
}