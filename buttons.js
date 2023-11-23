class Button {
	constructor(x, y, w, h, baseColor, txtColor, txt, func){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;

		this.baseColor = baseColor;
		this.txtColor = txtColor;
		this.txt = txt;

		this.func = func;
	}

	display(){
		ctx.beginPath();
			ctx.fillStyle = this.baseColor;
			ctx.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);

			ctx.font = "40px Young Serif";
			ctx.fillStyle = this.txtColor;
			ctx.fillText(this.txt, this.x, this.y);
		ctx.closePath();
	}

	// Checks if the button was clicked
	mouseInRange(mouseX, mouseY){
		return mouseX >= (this.x - this.w/2) &&
			   mouseX <= (this.x + this.w/2) &&
			   mouseY >= (this.y - this.h/2) &&
			   mouseY <= (this.y + this.h/2);
	}

	doFunc(){
		this.func();
	}
}