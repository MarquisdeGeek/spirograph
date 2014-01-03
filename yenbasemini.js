
Inheritance_Manager = {};

Inheritance_Manager.extend = function(subClass, baseClass) {
    function inheritance() { }
    inheritance.prototype = baseClass.prototype;
    subClass.prototype = new inheritance();
    subClass.prototype.constructor = subClass;
    subClass.baseConstructor = baseClass;
    subClass.superClass = baseClass.prototype;
}
    

function YenHTML5Graphics(canvasID) {
	this.canvas = document.getElementById(canvasID);
	this.context = this.canvas.getContext('2d');
	this.context.save();
	//
	this.cursorX = 0;
	this.cursorY = 0;
	this.currentFont = null;
	this.clearColor = "#7f7f7f";
	this.drawColor = "#000000";
	this.fillColor = "#4130A4";

}

YenHTML5Graphics.prototype.setFont = function(font) {
	this.currentFont = font;
}

YenHTML5Graphics.prototype.getScreenWidth = function() {
	return this.canvas.width;
}

YenHTML5Graphics.prototype.getScreenHeight = function() {
	return this.canvas.height;
}



YenHTML5Graphics.prototype.clearScreen = function() {

	var screenWidth = this.canvas.width;
	var screenHeight = this.canvas.height;
	
	this.context.fillStyle = this.clearColor;
	this.context.fillRect(0, 0, screenWidth, screenHeight);
}

YenHTML5Graphics.prototype.drawString = function(text, x, y) {
}


YenHTML5Graphics.prototype.moveTo = function(x, y){
	this.cursorX = x;
	this.cursorY = y;
}

YenHTML5Graphics.prototype.drawTo = function(x, y){
	this.context.beginPath();
    this.context.moveTo(this.cursorX, this.cursorY);
    this.context.lineTo(x, y);
    this.context.closePath();
	this.context.strokeStyle = this.drawColor;
    this.context.stroke();
    
	this.cursorX = x;
	this.cursorY = y;
}

YenHTML5Graphics.prototype.setDrawColor = function(color){
	this.drawColor = color;
	this.context.strokeStyle = "#"+color;	//TODO: determine palette
}

YenHTML5Graphics.prototype.setFillColor = function(color){
	this.fillColor = color;
	this.context.strokeStyle = "#"+color;	//TODO: determine palette
}




function YenHTML5Input() {
	this.lastKeyCode = "";
}

YenHTML5Input.prototype.getLastKey = function() {
	return this.lastKeyCode;
}

YenHTML5Input.prototype.flushKeyboard = function() {
	this.lastKeyCode = "";
}

YenHTML5Input.prototype.applyKeyboardKeyUp = function(keyCode) {
	this.lastKeyCode = "";
}

YenHTML5Input.prototype.applyKeyboardKeyDown = function(keyCode) {
	this.lastKeyCode = keyCode;
}


function YenHTML5Audio() {
	// TODO
}



function YenSuite(gfx, inp, aud) {
	// TODO: Write NULL drivers
	this.graphics = gfx;
	this.input = inp;
	this.audio = aud;
}

