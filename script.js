/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var canvas = document.getElementById("mainCanvas");
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//var color = ['#fc2741', 'cyan', 'Khaki', 'Coral', '#F4EFE7', '#E5B6B6'];
var particle = [], x, y, timerId, angle = 0, title, font, colors, Name;

 /* Gets all the values from forms
 * stores them in the correct variable
 * Starts the animation
 */
function startAnimation() {
    document.getElementById("forms").style.display="none";
    document.getElementById("mainCanvas").style.display="block"
    font = document.getElementById("font").value;
    colors = document.getElementById("color").value;
    Name = document.getElementById("Name").value;
    if (document.getElementById("Christmas").checked) {
        title = document.getElementById("Christmas").value;
    }
    else {
        title = document.getElementById("NewYear").value;
    }
    timerId = setInterval(draw_particle, 50);
}

// stops the animation
function stopAnimation() {
    clearTimeout(timerId);
}

/*
 * creating snow flakes
 */
var MouseMove = function() {
    handleMouseMove();
    //canvas.onmousemove = handleMouseMove;
    function handleMouseMove() {
        x = canvas.width * Math.random();
        y = canvas.height * Math.random();
        for (var h = 0; h < 50; h++) {
            particle.push({
                //x-coordinate of the snowflake
                x: Math.random() * canvas.width,
                //y-coordinate of the snowflake
                y: Math.random() * canvas.height,
                //radius of the flakes
                r: Math.random() * 4,
                //density of the flakes
                d: Math.random() * 50});
        }
    }
};
/*
 * Drawing the snowflakes
 */
var draw_particle = function() {
    MouseMove();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#F2F2F2';
    ctx.beginPath();
    for (var i = 0; i < 50; i++) {
        var p = particle[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    }
    ctx.fill();
   
   //Fonts are changed based on user's input
    if (font === "Arial") {
        ctx.font = "35pt Arial";
    }
    if (font === "Georgia") {
        ctx.font = "35pt Georgia";
    }
    //Color is chnaged based on user's input
    ctx.fillStyle = colors;
    ctx.textAlign="Center";
    // textwidth holds the width of title
    var textwidth = ctx.measureText(title).width;
    //text is aligned to the center using textwidth
    ctx.fillText(title, (canvas.width/2) - (textwidth / 2), canvas.height/2);
    textwidth = ctx.measureText(Name).width;
    ctx.fillText(Name, (canvas.width/2) - (textwidth / 2), canvas.height/2 + 50);
    //move the snowflake down
    update();
    //requestAnimationFram(start_loop);
};
/*
 * moving the snowflake down
 */
function update() {
    for (var i = 0; i < particle.length; i++) {
        angle += 0.01;
        //push the snowflake down
        particle[i].y += Math.cos(angle + Math.random() * particle[i].d) + 4;
        particle[i].x += Math.sin(angle) * 0.5;
        //snowflakes resets when out of frame
        if (particle[i].x > canvas.width || particle[i].x < 0 || particle[i].y > canvas.height) {
            particle[i].x = Math.random() * canvas.width;
            particle[i].y = -10;
        }
    }
}
//onLoad = startAnimation();
