class Scene {
	constructor(){
		this.introScenes = ["images/scene0.png", "images/scene0.png"];
		this.outroScenes = [];
	}
	intro(ctx, callback){
		let curScene = 0;

		const interval = setInterval(() => {
			console.log("scene " + curScene)

			if(curScene == 5){
				clearInterval(interval);
				callback();
			}

			curScene++;
		}, 1000);
	}

	outro(){}
}