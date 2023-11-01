class Slideshow {
	constructor(scenes, interval){
		this.scenes = scenes; // List of scenes (images)
		this.interval = interval; // milliseconds of pause between scenes

		this.index = 0;

		this.x = 0;
		this.y = 0;
	}
	run(frameCount, callback){
		// Framecount = 0 case must be ignored to avoid instantaneous switches
		if(frameCount > 0 && frameCount % this.interval == 0){
			this.index++;

			if(this.index >= this.scenes.length){
				callback();
				this.index = this.scenes.length - 1;
			}
		}

		ctx.drawImage(images[this.scenes[this.index]], WIDTH/2, HEIGHT/2, 100, 100);
	}
}
