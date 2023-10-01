const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.oncontextmenu = function(e){
	e.preventDefault();
}

// Resize (spent hours debugging after putting this in separate script tag -_-)
canvas.width = window.screen.width;
canvas.height = window.screen.height;

let WIDTH = canvas.width;
let HEIGHT = canvas.height;

const titlePixMap = [
	"11110110111000111111",
	"11111111111101110110",
	"11011111111110111111",
	"01001011111111111111",
	"10011111111111100111",
	"01110111101111111110",
	"11111101111110111110",
	"11100101111010111111",
	"11011100011101011110",
	"11111001101110101111",
	"01110111101111111110",
];


var imgURLs = [
	{ name: "stone", url: "images/stone.png" },
	{ name: "mossy", url: "images/mossy.png" }
];
var images = {};

const fonts = [
	{ name: "Young Serif", url: "https://fonts.gstatic.com/s/youngserif/v2/3qTpojO2nS2VtkB3KtkQZ1t93kY.woff2" },
	{ name: "Suez One", url: "https://fonts.gstatic.com/s/suezone/v13/taiJGmd_EZ6rqscQgOFOmos.woff2" }
];

function loadImgs(callback){
	var numLoaded = 0;

	for(var i = 0; i < imgURLs.length; i++){
		var img = new Image();
		images[imgURLs[i].name] = img;

		// When loaded
		img.onload = function(){
			numLoaded++;
			if(numLoaded == imgURLs.length){
				callback();
			}
		};

		// Add image source
		img.src = imgURLs[i].url;
	}
};

function loadFonts(callback){
	let numLoaded = 0;

	for(let i = 0; i < fonts.length; i++){

		let f = new FontFace(fonts[i].name, "url(" + fonts[i].url + ")");
		// Cache fonts
		f.load().then(() => {
			document.fonts.add(f);

			numLoaded++;

			if(numLoaded == fonts.length){
				// This is the game
				console.log("Complete.");
				console.log("%cHi! If you're seeing this, maybe you want to see the source code (or diagnose an error). Here's the link, feel free to contribute or open an issue as well: https://github.com/gyang0/lost-game", "color:green");
				callback();
			}
		});

	}
}


const size = 80;

function game(){
	ctx.beginPath();

	for(let i = 0; i < titlePixMap.length; i++){
		for(let j = 0; j < titlePixMap[i].length; j++){
			if(titlePixMap[i][j] == '0')
				ctx.drawImage(images.mossy, j*size, i*size, size, size);
			else if (titlePixMap[i][j] == '1')
				ctx.drawImage(images.stone, j*size, i*size, size, size);
		}
	}

	ctx.closePath();

	// Title
	ctx.beginPath();
		ctx.font = "150px Young Serif";
		ctx.lineWidth = 5;
		ctx.strokeStyle = "white";
		ctx.textAlign = "center";

		ctx.strokeText("L O S T", WIDTH/2, HEIGHT/3.5);

		ctx.fillStyle = "0x000000";
		ctx.fillText("L O S T", WIDTH/2, HEIGHT/3.5);
	ctx.closePath();

	// "Click to Play"
	ctx.beginPath();
		ctx.font = "40px Suez One";

		ctx.fillStyle = "white";
		ctx.lineWidth = 1;
		ctx.strokeText("Click to Play".split("").join(String.fromCharCode(8202)), WIDTH/2, HEIGHT/2.5);

		ctx.fillStyle = "black";
		ctx.fillText("Click to Play".split("").join(String.fromCharCode(8202)), WIDTH/2, HEIGHT/2.5);
	ctx.closePath();
}

new Promise(function(resolve, reject){
	console.log("Loading images...");
	loadImgs(resolve);

}).then(() => {
	// Load fonts and run game() when done
	console.log("Loading fonts...");
	loadFonts(game);
});
