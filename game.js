const BLOCK_SIZE = 80;

// Adapted from my WebGL utils program at https://github.com/gyang0/learning-webgl/blob/main/utilities.html
// 2D pseudorandom function that depends on coordinates
function rand2d(p){
	let arg = p[0] * 153.202 + p[1] * 36.14;
	let a = 208.17 * (arg - Math.floor(arg));
	
	let arg2 = Math.sin(a) * 511.12;
	return arg2 - Math.floor(arg2);
}


// Adapted from my WebGL utils program at https://github.com/gyang0/learning-webgl/blob/main/utilities.html
// 2D perlin noise using interpolation between square coordinates
function perlin2d(p){
	let pos = [Math.floor(p[0]), Math.floor(p[1])];
	let frac = [p[0] - pos[0], p[1] - pos[1]];

	// Smoothstep
	// https://en.wikipedia.org/wiki/Smoothstep
	let s = [
		frac[0] * frac[0] * (3.0 - 2.0*frac[0]),
		frac[1] * frac[1] * (3.0 - 2.0*frac[1])
	];

	//float c0 = rand2d(pos + vec2(0.0, 0.0)); // bottom left (original point)
	//float c1 = rand2d(pos + vec2(1.0, 0.0)); // bottom right
	//float c2 = rand2d(pos + vec2(0.0, 1.0)); // top left
	//float c3 = rand2d(pos + vec2(1.0, 1.0)); // top right
	let c = [
		rand2d([pos[0] + 0, pos[1] + 1]),
		rand2d([pos[0] + 1, pos[1] + 0]),
		rand2d([pos[0] + 0, pos[1] + 1]),
		rand2d([pos[0] + 1, pos[1] + 1])
	];

	// The math here is probably wrong, but it's simple and it looks okay.
	// i1 is the interpolation between c0 and c1
	// i2 is the interpolation between c2 and c3.
	// Then I interpolate those results with weight s.y (best seen by drawing a diagram)
	//float i1 = mix(c0, c1, s.x);
	//float i2 = mix(c2, c3, s.x);

	//return mix(i1, i2, s.y);

	let i1 = (1 - s[0])*c[0] + s[0]*c[1];
	let i2 = (1 - s[0])*c[2] + s[0]*c[3];

	return (1 - s[1])*i1 + s[1]*i2;
}


class Game {
	constructor(){
		this.blocks = [];
		this.stoneDecor = [];
		this.decor = [];

		this.player = new Player(WIDTH/2, HEIGHT/2, BLOCK_SIZE/2, BLOCK_SIZE/2, "mossy");

		this.mapWidth = 40;
		this.mapHeight = 20;

		// Testing
		this.map = [];
		for(let i = 0; i < this.mapHeight; i++){
			this.blocks.push([]);
			this.stoneDecor.push([]);
			this.decor.push([]);

			for(let j = 0; j < this.mapWidth; j++){
				this.blocks[i].push(new Block(j*BLOCK_SIZE + 200, i*BLOCK_SIZE + 400, BLOCK_SIZE, BLOCK_SIZE, "filler"));

				this.stoneDecor[i].push(new DecorBlock(j*BLOCK_SIZE + 200, i*BLOCK_SIZE + 400, BLOCK_SIZE, BLOCK_SIZE, []));
				this.decor[i].push(new DecorBlock(j*BLOCK_SIZE + 200, i*BLOCK_SIZE + 400, BLOCK_SIZE, BLOCK_SIZE, []));
			}
		}

		this.generateLevel();
	}

	randomDecor(arr){
		return arr[Math.floor(Math.random() * arr.length)];
	}

	generateLevel(){
		// Fill in blocks according to map key
		for(let i = 0; i < this.mapHeight; i++){
			for(let j = 0; j < this.mapWidth; j++){

				// No blocks on edges
				if(i == 0 || i == this.mapHeight - 1 || j == 0 || j == this.mapWidth - 1){
					continue;
				}

				//let r = perlin2d([i, j]);
				let r = Math.random();
				let type = "";

				if(r < 0.25) type = "stone";
				else if(r < 0.5) type = "mossy";
				else if(r < 0.75) type = "dirt";
				else type = "filler";

				this.blocks[i][j] = new Block(j*BLOCK_SIZE + 200, i*BLOCK_SIZE + 400, BLOCK_SIZE, BLOCK_SIZE, type);
			}
		}

		// Decoration
		for(let i = 1; i < this.mapHeight - 1; i++){
			for(let j = 1; j < this.mapWidth - 1; j++){
				if(this.blocks[i][j].imgSrc != "filler"){

					// Decor blocks can overlap
					if(this.blocks[i][j - 1].imgSrc == "filler")
						this.stoneDecor[i][j - 1].imgSrcList.push("stone_padding_right");

					if(this.blocks[i][j + 1].imgSrc == "filler")
						this.stoneDecor[i][j + 1].imgSrcList.push("stone_padding_left");

					if(this.blocks[i + 1][j].imgSrc == "filler"){
						this.stoneDecor[i + 1][j].imgSrcList.push(this.randomDecor(["stalactite_1", "stalactite_2", "stalactite_3"]));
						this.decor[i + 1][j].imgSrcList.push(this.randomDecor(["vine"]));
					}

					if(this.blocks[i - 1][j].imgSrc == "filler"){
						this.stoneDecor[i - 1][j].imgSrcList.push(this.randomDecor(["stalagmite_1", "stalagmite_2", "stalagmite_3", "volcano"]));
						this.decor[i - 1][j].imgSrcList.push(this.randomDecor(["grass", "mushroom"]));
					}
					
				}
			}
		}
	}

	run(){
		for(let i = 0; i < this.blocks.length; i++){
			for(let j = 0; j < this.blocks[i].length; j++){
				if(this.blocks[i][j] != null) 
					this.blocks[i][j].display(WIDTH/2 - this.player.x, HEIGHT/2 - this.player.y);
				if(this.stoneDecor[i][j] != null)
					this.stoneDecor[i][j].display(WIDTH/2 - this.player.x, HEIGHT/2 - this.player.y);
			}
		}
		
		this.player.display();

		for(let i = 0; i < this.blocks.length; i++){
			for(let j = 0; j < this.blocks[i].length; j++){
				if(this.decor[i][j] != null)
					this.decor[i][j].display(WIDTH/2 - this.player.x, HEIGHT/2 - this.player.y);

				// Shadow effect for blocks
				//ctx.beginPath();
				//	ctx.fillStyle = `rgb(0, 0, 0, ${Math.sqrt(Math.pow(this.blocks[i][j].x - this.player.x, 2) + Math.pow(this.blocks[i][j].y - this.player.y, 2))/600.0})`;
				//	ctx.fillRect(this.blocks[i][j].x - BLOCK_SIZE/2, this.blocks[i][j].y - BLOCK_SIZE/2, BLOCK_SIZE, BLOCK_SIZE);
				//ctx.closePath();
			}
		}

		this.player.update(this.blocks);
		

		const grad = ctx.createRadialGradient(WIDTH/2, HEIGHT/2, 100, WIDTH/2, HEIGHT/2, 450);
		grad.addColorStop(0, "rgb(0, 0, 0, 0)");
		grad.addColorStop(1, "rgb(0, 0, 0)");

		ctx.beginPath();
			ctx.fillStyle = grad;
			ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.closePath();
	}
}