class Particle {
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.r = Math.random() * 2.5; // Radius

		this.maxHeight = Math.random() * HEIGHT;
		this.theta = 0;
		this.speed = Math.random() * 3 + 1;
	}

	update(){
		// Smooth random change of direction
		this.theta += Math.random() * Math.PI/5 - Math.PI/10;
		this.x += Math.cos(this.theta);

		this.y -= this.speed;
	}

	display(){
		ctx.beginPath();
			ctx.fillStyle = `rgb(255, 255, 0, ${(this.y - this.maxHeight)/(HEIGHT - this.maxHeight)})`;
			ctx.ellipse(this.x, this.y, this.r, this.r, 0, 0, 2*Math.PI);
			ctx.fill();
		ctx.closePath();
	}

	isDead(){
		return this.y <= this.maxHeight;
	}

	run(){
		this.update();
		this.display();
	}
}

class ParticleSystem {
	constructor(){
		this.particles = [];
	}

	addParticles(x, y){
		this.particles.push(new Particle(x, y));
	}

	run(){
		for(let i = this.particles.length - 1; i >= 0; i--){
			
			this.particles[i].run();

			if(this.particles[i].isDead()){
				this.particles.splice(i, 1);
			}
		}
	}
}
