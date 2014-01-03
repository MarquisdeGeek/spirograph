  
SimpleSpirograph = function(suite) {
	this.teethOuter = 100;
	this.teethInner = 90; // a % of outer
	this.radiusInner = 50;
	this.radiusOuter = 200;
	this.radiusPen = 15;
	//
	this.drawColor = '000000';
	//
	this.gfx = suite.graphics;
	this.drawResolution = 0.1;
	this.drawLimit = 360;
}

SimpleSpirograph.prototype.refresh = function() {
	this.gfx.clearScreen();
	this.draw();
}

SimpleSpirograph.prototype.draw = function() {

	this.gfx.setDrawColor(this.drawColor);

	var ox, oy;
	for(var i=0;i<this.drawLimit;i += this.drawResolution) {
		// Where is the outer 
		var r = this.radiusOuter - this.radiusInner;
		var theta = (i * Math.PI) / 180;
		var x = Math.cos(theta) * r;
		var y = -Math.sin(theta) * r;
		// x,y is now a point parallel to the outer circle

		var innerTheta = (i * this.teethOuter) / this.teethInner;
		x += Math.cos(innerTheta) * this.radiusPen;
		y += -Math.sin(innerTheta) * this.radiusPen;
	
	
		x += this.gfx.getScreenWidth() / 2;
		y += this.gfx.getScreenHeight() / 2;

		if (ox == undefined) {
			ox = x;
			oy = y;
			this.gfx.moveTo(x,y);
		} else {	
			this.gfx.drawTo(x,y);
		}
	}

}
