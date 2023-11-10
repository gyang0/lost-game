class Game {
	constructor(){
		this.blocks = [];
		this.player = new Player(WIDTH/2, HEIGHT/2, 30, 30, "mossy");
	}

	run(){
		for(let i = 0; i < this.blocks.length; i++){
			this.blocks[i].display();
		}

		this.player.update();
		this.player.display();
	}
}
