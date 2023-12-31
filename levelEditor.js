/** Todo
 * Mini map (clickable, will take you to approximate location of click)
 * Hotbar with key or mouse controls
 * Certain automated features (volcano mist, lava haze)
 * But manual overrides given for each block
 * 
 * Map data includes: 3 block layers, player start position, 
*/

class LevelEditor {
	constructor(){
		this.mapWidth = 40;
		this.mapHeight = 20;

		// 3 layers of blocks and decor blocks
		this.blocks = this.create2dArray(this.mapHeight, this.mapWidth);
		this.stoneDecor = this.create2dArray(this.mapHeight, this.mapWidth);
		this.decor = this.create2dArray(this.mapHeight, this.mapWidth);

		this.player = new Player(WIDTH/2, HEIGHT/2, BLOCK_SIZE * 3/4, BLOCK_SIZE * 3/4, "player");

		// Shadow gradient
		this.grad = ctx.createRadialGradient(WIDTH/2, HEIGHT/2, 100, WIDTH/2, HEIGHT/2, 450);
		this.grad.addColorStop(0, "rgb(0, 0, 0, 0)");
		this.grad.addColorStop(1, "rgb(0, 0, 0)");


		// Testing
		for(let i = 0; i < this.mapHeight; i++){
			for(let j = 0; j < this.mapWidth; j++){
				this.blocks[i][j] = new Block(j*BLOCK_SIZE + 200, i*BLOCK_SIZE + 400, BLOCK_SIZE, BLOCK_SIZE, "filler");

				this.stoneDecor[i][j] = new DecorBlock(j*BLOCK_SIZE + 200, i*BLOCK_SIZE + 400, BLOCK_SIZE, BLOCK_SIZE, []);
				this.decor[i][j] = new DecorBlock(j*BLOCK_SIZE + 200, i*BLOCK_SIZE + 400, BLOCK_SIZE, BLOCK_SIZE, []);
			}
		}
	}

	create2dArray(rows, cols){
		let a = new Array(rows);
		for(let i = 0; i < a.length; i++){
			a[i] = new Array(cols);
		}
		return a;
	}

	run(){
		for(let i = 0; i < this.blocks.length; i++){
			for(let j = 0; j < this.blocks[i].length; j++){
				// Todo
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

		

		ctx.beginPath();
			ctx.fillStyle = this.grad;
			ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.closePath();
	}
}