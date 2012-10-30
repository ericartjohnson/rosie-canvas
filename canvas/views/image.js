(function(){
	Canvas.Views.Image = function(options){
		var self = this;
		for(var paramKey in options){
			if(typeof(self[paramKey]) != 'undefined') self[paramKey] = options[paramKey];
		}
	};
	Canvas.Views.Image.prototype = {
		'image' : null,
		'size' : {'w':50,'h':50},
		'draw' : function draw(scene){
			if(!scene || !scene.ctx) return;
			var self = this;
			// scene.ctx.beginPath();
			scene.ctx.drawImage(self.image, self.origin.x, self.origin.y, self.size.w, self.size.h);
			// if(self.fill) scene.ctx.fill();
			// if(self.stroke) scene.ctx.stroke();
		}
	};
	for(var protoKey in Canvas.Views.View.prototype){
		if(typeof(Canvas.Views.Image.prototype[protoKey]) == 'undefined') Canvas.Views.Image.prototype[protoKey] = Canvas.Views.View.prototype[protoKey];
	};
})();