class Loader {
	static loadImgs(callback){
		var numLoaded = 0;

		for(var i = 0; i < imgURLs.length; i++){
			var img = new Image();
			images[imgURLs[i].name] = img;

			// When loaded
			img.onload = function(){
				numLoaded++;
				if(numLoaded == imgURLs.length){
					callback();
				}
			};

			// Add image source
			img.src = imgURLs[i].url;
		}
	}

	static loadFonts(callback){
		let numLoaded = 0;

		for(let i = 0; i < fonts.length; i++){

			let f = new FontFace(fonts[i].name, "url(" + fonts[i].url + ")");
			// Cache fonts
			f.load().then(() => {
				document.fonts.add(f);

				numLoaded++;

				if(numLoaded == fonts.length){
					callback();
				}
			});

		}
	}
}