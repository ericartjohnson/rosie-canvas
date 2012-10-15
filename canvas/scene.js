//Canvas object for namespacing all canvas related 'classes'
window.Canvas = {};

window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || 
	window.webkitRequestAnimationFrame || 
	window.mozRequestAnimationFrame || 
	window.oRequestAnimationFrame || 
	window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();

Canvas.Scene = Base.extend({
	'initialize' : function initialize(options){
		this.merge(options);
	},
	'showDebug' : false,
	'lastCalledTime' : null,
	'fps' : null,
	'ctx' : null,
	'subviews' : [],
	'container' : window,
	'animate' : true,
	'center' : {'x':0, 'y':0},
	'render' : function(){
		var self = this;
		if(!self.ctx) return;
		self.ctx.clearRect(0,0,self.ctx.canvas.width,self.ctx.canvas.height);

		for(var v in self.subviews){
			self.subviews[v].update(self);
		}

		for(var v in self.subviews){
			self.ctx.save();
			self.subviews[v].render(self);
			self.ctx.restore();
		}
		if(self.animate){
			requestAnimFrame(function() {
				if(self.showDebug){
					if(!self.lastCalledTime) {
						self.lastCalledTime = new Date().getTime();
						self.fps = 0;
					}else{
						var delta = (new Date().getTime() - self.lastCalledTime)/1000;
						self.lastCalledTime = new Date().getTime();
						self.fps = 1/delta;
					}

					if(self.fps) document.getElementById('framerate').innerHTML = self.fps.toFixed(1);
				}

				self.render();
			});
		}
	},
	'resize' : function(){
		var self = this;
		if(!self.ctx) return;
		self.ctx.canvas.width = self.container.innerWidth;
		self.ctx.canvas.height = self.container.innerHeight;
		self.center.x = self.container.innerWidth/2;
		self.center.y = self.container.innerHeight/2;
	}
});