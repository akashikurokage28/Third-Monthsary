"use strict";

let canvas, width, height, ctx;
let fireworks = [];
let particles = [];

function setup() {
	canvas = document.getElementById("canvas");
	setSize(canvas);
	ctx = canvas.getContext("2d");
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, width, height);
	fireworks.push(new Firework(Math.random()*(width-200)+100));
	window.addEventListener("resize",windowResized);
	document.addEventListener("click",onClick);
}

setTimeout(setup,1);

function loop(){
	ctx.globalAlpha = 0.1;
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, width, height);
	ctx.globalAlpha = 1;

	for(let i=0; i<fireworks.length; i++){
		let done = fireworks[i].update();
		fireworks[i].draw();
		if(done) fireworks.splice(i, 1);
	}

	for(let i=0; i<particles.length; i++){
		particles[i].update();
		particles[i].draw();
		if(particles[i].lifetime>80) particles.splice(i,1);
	}

	if(Math.random()<1/60) fireworks.push(new Firework(Math.random()*(width-200)+100));
}
setInterval(loop, 1/60);
//setInterval(loop, 100/60);
class Particle{
	constructor(x, y, col){
		this.x = x;
		this.y = y;
		this.col = col;
		this.vel = randomVec(2);
		this.lifetime = 0;
	}

	update(){
		this.x += this.vel.x;
		this.y += this.vel.y;
		this.vel.y += 0.02;
		this.vel.x *= 0.99;
		this.vel.y *= 0.99;
		this.lifetime++;
	}

	draw(){
		ctx.globalAlpha = Math.max(1-this.lifetime/80, 0);
		ctx.fillStyle = this.col;
		ctx.fillRect(this.x, this.y, 2, 2);
	}
}

class Firework{
	constructor(x){
		this.x = x;
		this.y = height;
		this.isBlown = false;
		this.col = randomCol();
	}

	update(){
		this.y -= 3;
		if(this.y < 350-Math.sqrt(Math.random()*500)*40){
			this.isBlown = true;
			for(let i=0; i<60; i++){
				particles.push(new Particle(this.x, this.y, this.col))
			}
		}
		return this.isBlown;
	}

	draw(){
		ctx.globalAlpha = 1;
		ctx.fillStyle = this.col;
		ctx.fillRect(this.x, this.y, 2, 2);
	}
}

function randomCol(){
	var letter = '0123456789ABCDEF';
	var nums = [];

	for(var i=0; i<3; i++){
		nums[i] = Math.floor(Math.random()*256);
	}

	let brightest = 0;
	for(var i=0; i<3; i++){
		if(brightest<nums[i]) brightest = nums[i];
	}

	brightest /=255;
	for(var i=0; i<3; i++){
		nums[i] /= brightest;
	}

	let color = "#";
	for(var i=0; i<3; i++){
		color += letter[Math.floor(nums[i]/16)];
		color += letter[Math.floor(nums[i]%16)];
	}
	return color;
}

function randomVec(max){
	let dir = Math.random()*Math.PI*2;
	let spd = Math.random()*max;
	return{x: Math.cos(dir)*spd, y: Math.sin(dir)*spd};
}

function setSize(canv){
	canv.style.width = (innerWidth) + "px";
	canv.style.height = (innerHeight) + "px";
	width = innerWidth;
	height = innerHeight;

	canv.width = innerWidth*window.devicePixelRatio;
	canv.height = innerHeight*window.devicePixelRatio;
	canvas.getContext("2d").scale(window.devicePixelRatio, window.devicePixelRatio);
}

function onClick(e){
	fireworks.push(new Firework(e.clientX));
}

function windowResized(){
	setSize(canvas);
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, width, height);
}





// LYRICS LOGIC
const lrcString = `[00:16.50]First night, heart racing in my chest
[00:21.00] 
[00:23.66]Every love, every touch, felt like we'd never rest
[00:29.00] 
[00:32.86]You brush my hand and the room spun around
[00:38.00] 
[00:40.50]Every look, every word was a brand new sound
[00:45.50] 
[00:47.70]Butterflies will fade, but love doesn't
[00:50.50] 
[00:51.40]Fireworks come down, but there's still buzzes
[00:54.50] 
[00:55.42]When the rush runs out and the colors fall away
[00:58.50] 
[00:59.50]I'm still choosing you
[01:02.50] 
[01:03.86]Day after day
[01:08.00] 
[01:21.62]Next day our eyes open wide, we feel our hearts collide
[01:25.50] 
[01:25.98]Arguing about a word that we misunderstood
[01:29.30] 
[01:29.82]You fall asleep
[01:31.50] 
[01:32.06]Halfway through the scene
[01:36.00] 
[01:37.84]I'm turning off the lights
[01:39.50] 
[01:39.86]Kissing you on the cheek
[01:45.00] 
[01:52.38]Butterflies will fade, but love doesn't
[01:55.50] 
[01:56.46]Fireworks come down, but there's still buzzes
[01:59.50] 
[02:00.54]When the rush runs out and the colors fall away
[02:03.50] 
[02:04.36]I'm still choosing you
[02:07.50] 
[02:08.24]Day after day
[02:15.00] 
[02:25.50]When it's quiet and plain
[02:27.50] 
[02:27.91]And the sky’s just gray
[02:29.50] 
[02:30.27]When we're worn
[02:31.00] 
[02:31.36]When we're bored
[02:32.00] 
[02:32.40]When there's nothing to say
[02:34.00] 
[02:34.48]I'll be holding your hand
[02:36.00] 
[02:36.49]Like it's our first date
[02:40.00] 
[02:42.62]Not choosing the spark
[02:45.50] 
[02:46.68]We're now guarding the flame
[02:51.00] 
[02:53.50]Butterflies will fade, but love doesn't
[02:56.50] 
[02:56.94]Fireworks come down, but there's still buzzes
[03:00.50] 
[03:01.12]When the rush runs out and the colors fall away
[03:04.50] 
[03:04.96]I'm still choosing you
[03:08.50] 
[03:09.11]Day after day
[03:12.00] `;

const audio = document.querySelector('audio');
const lyricPara = document.querySelector('.lyrics');

// 1. Set audio to loop
audio.loop = true;

const lyrics = lrcString.split('\n').map(line => {
    const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
    if (match) {
        return {
            time: parseInt(match[1]) * 60 + parseFloat(match[2]),
            text: match[3].trim()
        };
    }
    return null;
}).filter(l => l !== null);

window.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
    }
}, { once: true });

let lastIndex = -1;

// 2. Reset the lyric index when the audio loops back to the start
audio.addEventListener('seeked', () => {
    lastIndex = -1;
});

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const index = lyrics.findLastIndex(l => currentTime >= l.time);

    if (index !== -1 && index !== lastIndex) {
        lastIndex = index;
        const currentLyric = lyrics[index];

        // Start Fade Out
        lyricPara.classList.remove('show');

        // Wait for fade-out transition, then update
        setTimeout(() => {
            if (currentLyric.text === "") {
                lyricPara.innerText = "";
            } else {
                lyricPara.innerText = currentLyric.text;
                lyricPara.classList.add('show');
            }
        }, 250); 
    }
});