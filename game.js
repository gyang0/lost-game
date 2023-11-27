const BLOCK_SIZE = 80;

class Game {
	constructor(){
		this.mapWidth = 40;
		this.mapHeight = 20;

		// 3 layers of blocks and decor blocks
		this.blocks = this.create2dArray(this.mapHeight, this.mapWidth);
		this.stoneDecor = this.create2dArray(this.mapHeight, this.mapWidth);
		this.decor = this.create2dArray(this.mapHeight, this.mapWidth);

		this.player = new Player(WIDTH/2, HEIGHT/2, BLOCK_SIZE * 3/4, BLOCK_SIZE * 3/4, "player");


		// Testing
		for(let i = 0; i < this.mapHeight; i++){
			for(let j = 0; j < this.mapWidth; j++){
				this.blocks[i][j] = new Block(j*BLOCK_SIZE + 200, i*BLOCK_SIZE + 400, BLOCK_SIZE, BLOCK_SIZE, "filler");

				this.stoneDecor[i][j] = new DecorBlock(j*BLOCK_SIZE + 200, i*BLOCK_SIZE + 400, BLOCK_SIZE, BLOCK_SIZE, []);
				this.decor[i][j] = new DecorBlock(j*BLOCK_SIZE + 200, i*BLOCK_SIZE + 400, BLOCK_SIZE, BLOCK_SIZE, []);
			}
		}

		this.generateLevel();
	}

	create2dArray(rows, cols){
		let a = new Array(rows);
		for(let i = 0; i < a.length; i++){
			a[i] = new Array(cols);
		}
		return a;
	}

	randomDecor(obj){
		/*
		Form: 
			obj = {
				"block_name_1": rarity_1
				"block_name_2": rarity_2
				...
			};

			Must be sorted in increasing order of rarity
		*/

		let m = Math.random();
		let probSum = 0.0;

		for(const key in obj){
			probSum += obj[key];

			if(probSum >= m){
				return key;
				return;
			}
		}

		// nulls are skipped in display (blocks.js)
		return null;
	}

	generateLevel(){
		// Fill in blocks according to map key
		for(let i = 0; i < this.mapHeight; i++){
			for(let j = 0; j < this.mapWidth; j++){

				// No blocks on edges
				if(i == 0 || i == this.mapHeight - 1 || j == 0 || j == this.mapWidth - 1){
					continue;
				}

				this.blocks[i][j] = new Block(
					j*BLOCK_SIZE + 200,
					i*BLOCK_SIZE + 400,
					BLOCK_SIZE, BLOCK_SIZE,
					this.randomDecor({
						"filler": 0.6,
						"stone": 0.2,
						"mossy": 0.1,
						"dirt": 0.1
					})
				);
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

					if(this.blocks[i - 1][j].imgSrc == "filler"){
						this.stoneDecor[i - 1][j].imgSrcList.push(this.randomDecor({
							"stalagmite_1": 0.11,
							"volcano": 0.12,
							"stalagmite_3": 0.33,
							"stalagmite_2": 0.44
						}));
						this.decor[i - 1][j].imgSrcList.push(this.randomDecor({
							"mushroom": 0.34,
							"grass": 0.66
						}));
					}

					if(this.blocks[i + 1][j].imgSrc == "filler"){
						this.stoneDecor[i + 1][j].imgSrcList.push(this.randomDecor({
							"stalactite_3": 0.12,
							"stalactite_2": 0.33,
							"stalactite_1": 0.55
						}));
						this.decor[i + 1][j].imgSrcList.push(this.randomDecor({
							"vine": 0.55,
						}));
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