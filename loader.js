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

	static addButtons(callback){
		let loc = document.getElementById("buttons");
		for(let scene in btns){
			for(let i = 0; i < btns[scene].length; i++){
				let el = document.createElement("button");
				el.textContent = btns[scene][i].text;
				el.style = `
					position: absolute;

					left: ${btns[scene][i].x}px;
					top: ${btns[scene][i].y}px;
					width: ${btns[scene][i].width};
					height: ${btns[scene][i].height};
					background-color: ${btns[scene][i].btnCol};
					color: ${btns[scene][i].textCol};

					display: block;
				`;
				el.addEventListener('click', () => {btns[scene][i].func});

				loc.appendChild(el);
			}
		}

		callback();
	}
}