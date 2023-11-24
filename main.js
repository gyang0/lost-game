/*
Idea in place as early as the start of 2023
Started coding early October 2023

Player
- Arrow keys/WASD to move
- Holds flickering torch (not shown)
- Glass bulb over head (to protect from environment)
- Rockets as defense (affected by gravity)


Enemies
- The wandering crab-beast (walks, when provoked jumps towards you.)
- Orangutan-inspired mob (has filaments that stick to ceilings, move around quickly)
- Mysterious holes (when provoked/in range, tentacles lash out and drag player in)

- When touched by enemy, screen flickers and turns black with the words "Regenerating Lifeform..."

Environment
- Rocks & boulders
- Fireflies
- Gas volcanoes (no damage, spew green mist)

- Lava
- At the end: ancient temple ruins
- Signposts (increase in frequency near the top)

- Second layer for cave wall (adds depth)

Other
- Show the time (days in, aka level)
- Checkpoints (campfires)
- Map of region (only show places that have been visited)

- Show areas that you need to place flags in
- At the end of every level, you need to set up camp and sleep.
- As the level progresses, show more and more structure


* Purple tints around the player's eyes should disappear.


Then get feedback from others, like on Discord.


BLOCKS:
	Decoration:
		Lava stream - 1
		Lava stream - 2 (slight cone-like convergence at meeting point)

		[COMBINE BUBBLE & LAVA]
		Lava bubble - 1
		Lava bubble - 2
		Lava bubble - 3
		Lava mist - 1
		Lava mist - 2
		Lava mist - 3

		Water?
		(if so, obsidian?)

		Fireflies
		Bats
		Dragon skulls
		Pixel the Pixel



	For each level, save the entire map as an image to the canvas.
	Then when the player moves, simply translate the image.

	Bah, easier way: just load the level once at the beginning of the level and only display the ones in range.
	Update stuff out of range, but maybe not too out-of-range.

	Play around with the lighting -- crab monster should emanate darkness, while lava blocks should emanate light.

	If possible - game lore later. Like caves to explore, mining shafts, dragon skeletons, etc.
	Procedural generation - first, make the level. Then, carve out the spaces to explore. Then add flowing stuff like lava. Decor will come later.
	
	Storyline & immersion >>
	Open source >>
	Ads or any form of monetization ruins a game

	Add fireflies and bats to image
	Add quote somewhere ("but how far will you go\nto get it back?")
	Add flickering lights? That kinda widn upwards and pop in a smaller burst? (harder to make)

	Remember to make things more cartoon-y
	Make sloped triangle blocks

	Carve out "chambers" before connecting them really lopsidedly.
	Place shards in such chambers.
	Then make a point that the player must get to, a "campsite" point that only shows up on the map after the player collects all shards.

	Large structures at the end: dragon skulls, minecarts, overgrown vine clumps, signposts.

	For the background, just do a cave wall. I think a second moving scene won't fit the claustrophobic atmosphere.

	Play around with raycast lighting. Or just simulate the effect.



	Simplified version.

	Introduction:
		LOST -> [Enter World]
		Screen goes black.
		15 years prior... (type out)
		Dark. We only see the green of the player's eyes. It's a side view of the cliff.
		Orb appears. Player looks on from cliff.
		(?) Lightning strikes orb, and it starts to vibrate.
		Orb shatters and drops.
		Player looks down
		Flash of lightning, then monster.
		Pixel blocks fade in.
			Halfway through, title fades in.

		ADD SKIP BUTTON FOR RETURNING PLAYERS

		Orb and lightning will have to be done in native JS.

	In-between levels:
		"How far will you go"
		"to get it back?"

		Introduce plants, caves, rooms, and enemies.

	Ending:
		Shards are placed on temple altar.
		They fly together (think lerp()) and are engulfed by a bright light.
		When it clears, orb is reformed. Still glowing.
		Black mass rises from player.
		Revealed as a swirling thick mist of the goat monster.
		Light starts to shine on one end.
		Player goes towards the light as the goat monster stays.
		We see the shot as the goat monster still in the section of the temple with stalagmites/stalactites and rough walls.
			Almost like the goat monster spirit is staying within the cave.

		Appropriate, gentle, and fitting quote appears on the screen.
		Credits roll.
			- LOST: A game of loss
			and what we do to get it back
			- Developed by Gene Yang, 2023-2024
			- Contributors: (add later if people open issues and such)
			- Thank you for playing


	Too much explaining and less freedom to speculate ruins a story.

	List of Reminders:
		https://gamedev.stackexchange.com/questions/105823/js-canvas-creating-2d-game-lighting-effect-like-terraria
		https://medium.com/geekculture/tricks-for-efficient-shadow-effect-in-pure-javascript-8064c0506728
		
		Maybe...
			Save the lighting as an image.
			Then display the image whenever needed.
			Will need for: rockets, player torch, and goat monster (absorb light, emanate darkness). Further uses may come up.
			Only optimize as needed.

			Or 2D raycast? seems tougher though. Only as a last resort, if the image looks bad.

		Make game un-hackable (using consts and class privates)

	The player's color should be revealed as green at the very end. After the corruption has been cleansed.
	For lightning strike, briefly reverse the colors? So black to white and white to black and so on. Might make things more jarring.

	Make the title screen an image (sort of?) with a transparent inner layer.

	Weird code, I know. But it's what I'm familiar with, and it works. Will gladly take any changes if it improves quality/readability.

	For levels: use a maze generator and add some dithering near the edges (while still retaining a gap).
		- Nevermind, just use the carve rooms -> connect with corridors model.
	
	Allow users to place flags as a way to get their bearings?
		- Or just do the map that expands as you go.

	Add volcano haze
	Add firefly hordes
	Make things more natural, like on the menu screen. Skip decorations sometimes.
	Make translation better (lerping)
	Maybe make player cast a shadow on the background
	Comment the classes and methods

	Note: if you run into collision bugs, try doing player.update() before player.display().
	Try overlaying an image of a gradient lighting background instead of calculating. Can also be used for main screen.

	Use the floodfill approach for terrain generation
	Use images when you can, instead of computations.
	A nice background would be great. Like other mountains, caves, stars above ground.
	Cave background - scuttling spiders, dancing torch lights & shadows, 
	Some above-ground structures would be nice.

	Same optimizations as before - only update & display blocks in scope.
	Replace filler block with cave background block
	It would be helpful if some shadows were given for non-solid blocks. So that openings can be seen more clearly.
*/



/*
Oct. 31- Intro scene & option to skip
Nov. 15 - Basic progression of levels & in-between scenes
Nov. 30 - Ending scene
Dec. 15 - Clean up code according to OOP principles
Dec. 31 - Make levels procedurally generated
Jan. 15 - Refine procedural generation, add lava (some shimering above?)
Jan. 31 - Add enemy #1: underground tentacles
Feb. 15 - Add enemy #2: orangutan
Feb. 28 - Add enemy #3: goat monster
Mar. 15 - Trinkets: map, shards, fireflies, bats, spiders, torches, signposts, etc.
Mar. 31 - Fix & release
*/







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

	ctx.globalAlpha = Math.min(1.0, frameCount/200);

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
	

	// Reset
	ctx.globalAlpha = 1.0;

	ctx.closePath();


	// Title
	ctx.beginPath();
		ctx.globalAlpha = Math.max(0, (frameCount - 250)/50);

		ctx.font = "150px Young Serif";
		ctx.lineWidth = 5;
		ctx.strokeStyle = `rgb(255, 255, 0, ${(frameCount % 301 == 0 || frameCount % 321 == 0) ? 0.2 : 0.5})`;
		ctx.textAlign = "center";

		ctx.strokeText("L O S T", WIDTH/2, HEIGHT/3.5);

		ctx.fillStyle = "rgb(0, 0, 0, 0.2)";
		ctx.fillText("L O S T", WIDTH/2, HEIGHT/3.5);

		ctx.globalAlpha = 1.0;
	ctx.closePath();


	// "Click to Play"
	ctx.beginPath();
		ctx.globalAlpha = Math.max(0, (frameCount - 350)/50);
		ctx.font = "40px Suez One";
	
		ctx.strokeStyle = `rgb(255, 255, 0, ${(frameCount % 453 == 0 || frameCount % 379 == 0) ? 0.2 : 0.5})`;
		ctx.lineWidth = 1;
		ctx.strokeText("Click to Play".split("").join(String.fromCharCode(8202)), WIDTH/2, HEIGHT/2.5);

		ctx.fillStyle = "rgb(0, 0, 0, 0.2)";
		ctx.fillText("Click to Play".split("").join(String.fromCharCode(8202)), WIDTH/2, HEIGHT/2.5);

		// Reset
		ctx.globalAlpha = 1.0;
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

let frameCount = 0;

let prevScene = "game";
let curScene = "game"; // Current scene
let startTrans = false; // Start transition
let timer = 0; // Transition timer

// Buttons
let btns = {
	"intro": [
		new Button(WIDTH * 9/10, HEIGHT * 1/10, 100, 50, 'rgb(255, 255, 255)', 'rgb(100, 0, 0)', 'Skip', function(){
			curScene = "menu";
			startTrans = true;
		})
	],
	"menu": [],
	"game": []
};


let sss = new Slideshow(
	/*scenes*/ ["introImg_1", "introImg_3", "introImg_1", "introImg_3", "introImg_1", "introImg_3", "introImg_1", "introImg_2", "titleScreenImg"],
	/*durations*/ [100, 2, 70, 2, 5, 2, 80, 2, 100],
	WIDTH/2 - 420, HEIGHT/2 - 280, 889, 500);

let ps = new ParticleSystem();

let game = new Game();

// Scenes
let scenes = {
	intro: function(){
		sss.run(function(){
			// Do these when done
			curScene = "menu";
			prevScene = "menu";
			frameCount = 0;
		});


		// Shadow gradients copied over from menu screen (to ensure smooth transition)
		// Shadow gradient #1
		const imgGrad = ctx.createRadialGradient(WIDTH/2, HEIGHT/2, 100, WIDTH/2, HEIGHT/2, 350);
		imgGrad.addColorStop(0, "rgb(0, 0, 0, 0)");
		imgGrad.addColorStop(1, "rgb(0, 0, 0)");

		ctx.beginPath();
			ctx.fillStyle = imgGrad;
			ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.closePath();

		// Shadow gradient #2
		const grad = ctx.createRadialGradient(WIDTH/2, HEIGHT/2, 100, WIDTH/2, HEIGHT/2, 700);
		grad.addColorStop(0, "rgb(0, 0, 0, 0)");
		grad.addColorStop(1, "rgb(0, 0, 0)");

		ctx.beginPath();
			ctx.fillStyle = grad;
			ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.closePath();

	},
	menu: function(){
		titleScreen();

		// Light particles
		if(frameCount % 10 == 0 && frameCount > 100){
			ps.addParticles(Math.random() * WIDTH, HEIGHT);
		}
		ps.run();

		if(click){
			curScene = "game";
			startTrans = true;
		}
	},
	game: function(){
		game.run();
	}
};



function draw(){
	// Clear previous frame
	ctx.clearRect(0, 0, WIDTH, HEIGHT);

	// Backdrops
	scenes[prevScene]();


	// Button display
	for(let i = 0; i < btns[prevScene].length; i++){
		btns[prevScene][i].display();
	}


	// Transitions
	if(startTrans){
		timer++;
		if(timer == 40){
			prevScene = curScene;
		} else if(timer >= 80){
			timer = 0;
			startTrans = false;
		}

		// Nice fade-out effect
		ctx.beginPath();
			ctx.fillStyle = `rgb(0, 0, 0, ${(timer < 40 ? timer*6.375 : 500 - timer*6.375)/255})`;
			ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.closePath();
	}
	

	frameCount++;

	// Reset
	click = false;

	window.requestAnimationFrame(draw);
}

// Mouse
window.onclick = function(e){
	// Buttons
	for(let i = 0; i < btns[prevScene].length; i++){
		if(btns[prevScene][i].mouseInRange(e.clientX, e.clientY)){
			btns[prevScene][i].doFunc();
		}
	}

	click = true;
};

window.onmousemove = function(e){
	// Cursor stuff
	// Check if the mouse is over a button
	let overButton = false;

	for(let i = 0; i < btns[prevScene].length; i++){
		if(btns[prevScene][i].mouseInRange(e.clientX, e.clientY)){
			overButton = true;
		}
	}

	if(overButton) document.body.style.cursor = "pointer";
	else document.body.style.cursor = "default";
}

// Keyboard
window.onkeydown = function(e){
	if(e.repeat) return;
	keys[e.key] = true;
}

window.onkeyup = function(e){
	keys[e.key] = false;
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
	Loader.loadImgs(resolve);

}).then(() => {
	// Load fonts
	console.log("Loading fonts...");
	return new Promise((resolve, reject) => Loader.loadFonts(resolve));

}).then(() => {
	// Main loop
	console.log("Complete.");
	console.log("%cHi! If you're seeing this, maybe you want to see the source code (or diagnose an error). Here's the link, feel free to contribute or open an issue as well: https://github.com/gyang0/lost-game", "color:green");			
	
	// Draw function
	window.requestAnimationFrame(draw);
});