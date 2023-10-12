var imgURLs = [
	{ name: "stone", url: "images/stone.png" },
	{ name: "mossy", url: "images/mossy.png" },
	{ name: "dirt", url: "images/dirt.png" },
	{ name: "lava1", url: "images/lava1.png" },
	{ name: "lava2", url: "images/lava2.png" },
	{ name: "lava_top", url: "images/lava_top.png" },

	{ name: "stone_padding_right", url: "images/stone_padding_right.png" },
	{ name: "stone_padding_left", url: "images/stone_padding_left.png" },

	{ name: "stalactite_1", url: "images/stalactite_1.png" },
	{ name: "stalactite_2", url: "images/stalactite_2.png" },
	{ name: "stalactite_3", url: "images/stalactite_3.png" },
	{ name: "stalagmite_1", url: "images/stalagmite_1.png" },
	{ name: "stalagmite_2", url: "images/stalagmite_2.png" },
	{ name: "stalagmite_3", url: "images/stalagmite_3.png" },
	{ name: "volcano", url: "images/volcano.png" },
	{ name: "volcano_haze_1", url: "images/volcano_haze_1.png" },
	{ name: "volcano_haze_2", url: "images/volcano_haze_2.png" },
	{ name: "volcano_haze_3", url: "images/volcano_haze_3.png" },
	{ name: "volcano_haze_4", url: "images/volcano_haze_4.png" },
	
	{ name: "grass", url: "images/grass.png" },
	{ name: "mushroom", url: "images/mushroom.png" },
	{ name: "vine", url: "images/vine.png" },

	{name: "scene0", url: "images/scene0.png" },
	{name: "titleScreenImg", url: "images/titleScreenImg.png" }
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
				callback();
			}
		});

	}
}


const size = 80;
const titlePixMap = [
	"12222222211100022222",
	"10022222221102210122",
	"110210-------1211111",
	"01001---------111101",
	"10010---------100111",
	"01110---------111110",
	"11110---------111010",
	"111001-------1011111",
	"10011111012221011110",
	"11101100101110222211"
];

// stone padding (to remove too-straight edges on sides)
const stonePadding = [
	"--------------------",
	"--------------------",
	"------>-----<-------",
	"----->-------<------",
	"----->-------<------",
	"----->-------<------",
	"----->-------<------",
	"------>-----<-------",
	"--------------------",
	"--------------------"
];

// stalagmites, stalactites, & volcanos
const primaryDecor = [
	"--------------------",
	"--------------------",
	"------)|((((|-------",
	"-----|-------)------",
	"--------------------",
	"--------------------",
	"-----/-------.------",
	"------./,..^/-------",
	"--------------------",
	"--------------------"
];

// mushrooms, grass, vines, etc.
const secondaryDecor = [
	"--------------------",
	"--------------------",
	"------V--V-VV-------",
	"-----V--------------",
	"--------------------",
	"--------------------",
	"-----M-------G------",
	"------GGMMGGG-------",
	"--------------------",
	"--------------------"
];

function titleScreen(){
	// Scene	
	ctx.drawImage(images.titleScreenImg, WIDTH/2 - 420, HEIGHT/2 - 280, 889, 500);

	// Image gradient for depth
	const imgGrad = ctx.createRadialGradient(WIDTH/2, HEIGHT/2, 100, WIDTH/2, HEIGHT/2, 350);
	imgGrad.addColorStop(0, "rgb(0, 0, 0, 0)");
	imgGrad.addColorStop(1, "rgb(0, 0, 0)");

	ctx.beginPath();
		ctx.fillStyle = imgGrad;
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
	ctx.closePath();


	// Pixel art cover
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

			switch(stonePadding[i][j]){
			case '<':
				ctx.drawImage(images.stone_padding_right, j*size, i*size, size, size);
				break;
			case '>':
				ctx.drawImage(images.stone_padding_left, j*size, i*size, size, size);
				break;
			}

			// Decor
			switch(primaryDecor[i][j]){
				case '(':
					ctx.drawImage(images.stalactite_1, j*size, i*size, size, size);
					break;

				case '|':
					ctx.drawImage(images.stalactite_2, j*size, i*size, size, size);
					break;

				case ')':
					ctx.drawImage(images.stalactite_3, j*size, i*size, size, size);
					break;

				case ',':
					ctx.drawImage(images.stalagmite_1, j*size, i*size, size, size);
					break;
				case '.':
					ctx.drawImage(images.stalagmite_2, j*size, i*size, size, size);
					break;
				case '/':
					ctx.drawImage(images.stalagmite_3, j*size, i*size, size, size);
					break;
				case '^':
					ctx.drawImage(images.volcano, j*size, i*size, size, size);
					ctx.drawImage(images.volcano_haze_1, j*size, i*size, size, size);
					break;
			}

			// Decor 2
			switch(secondaryDecor[i][j]){
				case 'G':
					ctx.drawImage(images.grass, j*size, i*size, size, size);
					break;
				case 'M':
					ctx.drawImage(images.mushroom, j*size, i*size, size, size);
					break;
				case 'V':
					ctx.drawImage(images.vine, j*size, i*size, size, size);
					break;
			}
		}
	}

	ctx.closePath();


	// Light effect (radial gradient)
	// Took a stupidly long time to figure out.
	const grad = ctx.createRadialGradient(WIDTH/2, HEIGHT/2, 100, WIDTH/2, HEIGHT/2, 700);
	grad.addColorStop(0, "rgb(0, 0, 0, 0)");
	grad.addColorStop(1, "rgb(0, 0, 0)");

	ctx.beginPath();
		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
	ctx.closePath();
}


let ps = new ParticleSystem();
let frameCount = 0;
function game(){
	titleScreen();

	// Title
	ctx.beginPath();
		ctx.font = "150px Young Serif";
		ctx.lineWidth = 5;
		ctx.strokeStyle = `rgb(255, 255, 0, ${(frameCount % 301 == 0 || frameCount % 321 == 0) ? 0.2 : 0.5})`;
		ctx.textAlign = "center";

		ctx.strokeText("L O S T", WIDTH/2, HEIGHT/3.5);

		ctx.fillStyle = "rgb(0, 0, 0, 0.2)";
		ctx.fillText("L O S T", WIDTH/2, HEIGHT/3.5);
	ctx.closePath();

	// "Click to Play"
	ctx.beginPath();
		ctx.font = "40px Suez One";

		ctx.strokeStyle = `rgb(255, 255, 0, ${(frameCount % 453 == 0 || frameCount % 379 == 0) ? 0.2 : 0.5})`;
		ctx.lineWidth = 1;
		ctx.strokeText("Click to Play".split("").join(String.fromCharCode(8202)), WIDTH/2, HEIGHT/2.5);

		ctx.fillStyle = "rgb(0, 0, 0, 0.2)";
		ctx.fillText("Click to Play".split("").join(String.fromCharCode(8202)), WIDTH/2, HEIGHT/2.5);
	ctx.closePath();


	frameCount++;
	frameCount %= 100000; // I'm scared of overflow

	if(frameCount % 10 == 0){
		ps.addParticles(Math.random() * WIDTH, HEIGHT);
	}
	ps.run();

	window.requestAnimationFrame(game);
}


// Run
new Promise(function(resolve, reject){
	// Loading...
	ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, WIDTH, HEIGHT);

		ctx.fillStyle = "white";
		ctx.font = "60px serif"; // No fonts loaded yet
		ctx.textAlign = "center";
		ctx.fillText("Loading...", WIDTH/2, HEIGHT/2.5);
	ctx.closePath();

	// Load images
	console.log("Loading images...");
	loadImgs(resolve);

}).then(() => {
	// Load fonts
	console.log("Loading fonts...");
	return new Promise((resolve, reject) => loadFonts(resolve));

})/*.then(() => {
	// Intro
	const s = new Scene();

	return new Promise((resolve, reject) => s.intro(ctx, resolve));

})*/.then(() => {
	// Game
	console.log("Complete.");
	console.log("%cHi! If you're seeing this, maybe you want to see the source code (or diagnose an error). Here's the link, feel free to contribute or open an issue as well: https://github.com/gyang0/lost-game", "color:green");			
	
	window.requestAnimationFrame(game);
});
