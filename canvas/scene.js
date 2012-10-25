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

(function(){
	Canvas.Scene = function(options){
		var self = this;
		for(var paramKey in options){
			if(typeof(self[paramKey]) != 'undefined') self[paramKey] = options[paramKey];
		}
	};

	Canvas.Scene.prototype = {
		'input' : {'state':null,'event':null},
		'alpha' : 1,
		'showDebug' : false,
		'lastCalledTime' : null,
		'fps' : null,
		'ctx' : null,
		'subviews' : null,
		'container' : window,
		'animate' : true,
		'center' : {'x':0, 'y':0},
		'addSubview' : function addSubView(subview){
			var self = this;
			if(subview && typeof(subview.update) == 'function' && typeof(subview.draw) == 'function'){
				if(!self.subviews) self.subviews = [];
				subview.parentView = self;
				self.subviews.push(subview);
			}else{
				throw 'Rosie: Subviews must implement draw() and update()';
			}
		},
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

			// self.input.state = null;
			// self.input.event = null;

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
			self.center = {'x':self.container.innerWidth/2, 'y':self.container.innerHeight/2};
		}
	};
})();