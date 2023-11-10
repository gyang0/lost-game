class Block {
	constructor(x, y, w, h, imgSrc){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.imgSrc = imgSrc;
	}

	display(){
		ctx.drawImage(images[this.imgSrc], this.x, this.y, this.w, this.h);
	}

	update(){

	}
}

class SolidBlock extends Block {}

class LiquidBlock extends Block {}

class DecorBlock extends Block {}



class Enemy {}

class Player extends Block {
	constructor(x, y, w, h, imgSrc){
		super(x, y, w, h, imgSrc);

		this.speed = 5;
		this.gravity = 4.8;
	}

	update(){
		if(keys.w || keys.W || keys.ArrowUp) this.y -= this.speed;
		if(keys.a || keys.A || keys.ArrowLeft) this.x -= this.speed;
		if(keys.s || keys.S || keys.ArrowDown) this.y += this.speed;
		if(keys.d || keys.D || keys.ArrowRight) this.x += this.speed;

		//this.y += this.gravity;
		this.y = Math.min(this.y, HEIGHT - 400);
	}
}

class Rocket {}
