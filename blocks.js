class Block {
	constructor(x, y, w, h, imgSrc){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.imgSrc = imgSrc;
	}

	// Blocks are drawn on the screen with an offset based on the player.
	display(xOff, yOff){
		ctx.drawImage(images[this.imgSrc], this.x - this.w/2 + xOff, this.y - this.h/2 + yOff, this.w, this.h);
	}

	// Blocks are updated with normal coordinates
	update(){

	}

	// AABB collision
	// Blocks are collided with normal coordinates.
	collided(obj1, obj2){
		return (obj1.x + obj1.w/2 > obj2.x - obj2.w/2 &&
            	obj1.x - obj1.w/2 < obj2.x + obj2.w/2 &&
            	obj1.y + obj1.h/2 > obj2.y - obj2.h/2 &&
            	obj1.y - obj1.h/2 < obj2.y + obj2.h/2);
	}
}

class SolidBlock extends Block {}

class LiquidBlock extends Block {}

class DecorBlock extends Block {
	constructor(x, y, w, h, imgSrcList){
		super();
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.imgSrcList = imgSrcList;
	}

	display(xOff, yOff){
		for(let i = 0; i < this.imgSrcList.length; i++){
			if(this.imgSrcList[i] == null)
				continue;
			
			ctx.drawImage(images[this.imgSrcList[i]], this.x - this.w/2 + xOff, this.y - this.h/2 + yOff, this.w, this.h);
		}
	}
}



class Enemy {}

class Player extends Block {
	constructor(x, y, w, h, imgSrc){
		super(x, y, w, h, imgSrc);

		this.canJump = false;
		this.jumpVel = 0;
		this.jumpAccel = 0.2;
		this.jumpAmt = -6.5;

		this.xVel = 0;
		this.speed = 4.5;
	}

	xCollide(blocks){
		for(let i = 0; i < blocks.length; i++){
			for(let j = 0; j < blocks[i].length; j++){

				if(blocks[i][j].imgSrc == "filler") continue;
            	
            	if(this.collided(blocks[i][j], this)){
            		// Stop moving against the wall
            		this.xVel = 0;
        	        
        	        if(this.x < blocks[i][j].x)
    	            	this.x = blocks[i][j].x - blocks[i][j].w/2 - this.w/2;
	                else
                		this.x = blocks[i][j].x + blocks[i][j].w/2 + this.w/2;
            	}
        	}
        }
	}

	yCollide(blocks){
		this.canJump = false;

		for(let i = 0; i < blocks.length; i++){
            for(let j = 0; j < blocks[i].length; j++){

            	if(blocks[i][j].imgSrc == "filler") continue;

            	if(this.collided(blocks[i][j], this)){
        	        if(this.y < blocks[i][j].y){
    	          		this.y = blocks[i][j].y - blocks[i][j].h/2 - this.h/2;
	              		this.canJump = true;
              			this.jumpVel = 0;
                	}
            	    else {
        	            this.y = blocks[i][j].y + blocks[i][j].h/2 + this.h/2;
        	            
        	            // No sticking to walls
        	            this.jumpVel = 0;
            	    }
    	        }
	        }
        }
	}

	moveX(){
		var left = 0;
		var right = 0;
		if(keys.a || keys.A || keys.ArrowLeft){ left = 1; }
		if(keys.d || keys.D || keys.ArrowRight){ right = 1; }

		// Determine direction
		this.xVel += (-left + right) * 0.3;

		// Return to 0 velocity if not moving
		// Epsilon = 0.1 because floating-point errors
		if(left == 0 && right == 0 && Math.abs(this.xVel) >= 0.1){
			this.xVel -= 0.3 * Math.sign(this.xVel);
		}

		// Clamping values
		this.xVel = (this.xVel <= -this.speed ? -this.speed : this.xVel);
		this.xVel = (this.xVel >= this.speed ? this.speed : this.xVel);

		this.x += this.xVel;
	}

	moveY(){
		if(this.canJump && (keys.w || keys.W || keys.ArrowUp)){
			this.jumpVel = this.jumpAmt;
			this.canJump = false;
		}

		this.jumpVel += this.jumpAccel;
		this.jumpVel = Math.min(this.jumpVel, 10);
		

		this.y += this.jumpVel;
	}

	update(blocks){
		// x-axis movement
		this.moveX();
		this.xCollide(blocks);

		// y-axis movement
		this.moveY();
		this.yCollide(blocks);
	}

	display(){
		// Always appear in the center, no matter this.x or this.y
		ctx.drawImage(images[this.imgSrc], WIDTH/2 - this.w/2, HEIGHT/2 - this.h/2, this.w, this.h);
	}
}

class Rocket {}
