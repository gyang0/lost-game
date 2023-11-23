class Slideshow {
	constructor(scenes, durations, x, y, w, h){
		this.scenes = scenes; // List of scenes (images)
		this.durations = durations; // Duration (milliseconds) for each scene
		
		this.index = 0;

		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;

		this.timer = 0;
	}
	run(callback){
		// WARNING: framecount = 0 case must be ignored to avoid instantaneous switches
		this.timer++;

		if(this.timer >= this.durations[this.index]){
			this.index++;

			if(this.index >= this.scenes.length){
				callback();
				this.index = this.scenes.length - 1;
			}

			this.timer = 0;
		}

		ctx.drawImage(images[this.scenes[this.index]], this.x, this.y, this.w, this.h);
	}
}