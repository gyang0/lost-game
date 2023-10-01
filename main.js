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
	"12222222211100022222",
	"10022222221102210122",
	"11022221111220111111",
	"01001012221111111111",
	"10011111111111100111",
	"01111111101111111110",
	"11111101111110111010",
	"11101011111010111111",
	"10011111012221011110",
	"11101100101110222211"
];


var imgURLs = [
	{ name: "stone", url: "images/stone.png" },
	{ name: "mossy", url: "images/mossy.png" },
	{ name: "dirt", url: "images/dirt.png" },
	{ name: "lava1", url: "images/lava1.png" },
	{ name: "lava2", url: "images/lava2.png" },

	{ name: "lava_top", url: "images/lava_top.png" }
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
			switch(titlePixMap[i][j]){
			case '0':
				ctx.drawImage(images.mossy, j*size, i*size, size, size);
				break;
			case '1':
				ctx.drawImage(images.stone, j*size, i*size, size, size);
				break;
			case '2':
				ctx.drawImage(images.dirt, j*size, i*size, size, size);
				break;
			case '3':
				// For lava, we randomly choose between 2 images for less noticeable patterns.
				if(Math.random() >= 0.5)
					ctx.drawImage(images.lava1, j*size, i*size, size, size);
				else
					ctx.drawImage(images.lava2, j*size, i*size, size, size);

				break;
			case '4':
				ctx.drawImage(images.lava_top, j*size, i*size, size, size);
				break;
			}
		}
	}

	ctx.closePath();

	// Scene
	ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.fillRect(WIDTH/2 - 412, HEIGHT/2 - 250, 800, 450);
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

// Run
new Promise(function(resolve, reject){
	console.log("Loading images...");
	loadImgs(resolve);

}).then(() => {
	// Load fonts and run game() when done
	console.log("Loading fonts...");
	loadFonts(game);
});
