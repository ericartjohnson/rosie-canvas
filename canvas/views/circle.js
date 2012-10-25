(function(){
	Canvas.Views.Circle = function(options){
		var self = this;
		for(var paramKey in options){
			if(typeof(self[paramKey]) != 'undefined') self[paramKey] = options[paramKey];
		}
	};
	Canvas.Views.Circle.prototype = {
		'radius' : 30,
		'draw' : function draw(scene){
			if(!scene || !scene.ctx) return;
			var self = this;
			scene.ctx.beginPath();
			scene.ctx.arc(self.origin.x,self.origin.y,self.radius,0,Math.PI*2,false);
			self.onInput(scene);
			if(self.fill) scene.ctx.fill();
			if(self.stroke) scene.ctx.stroke();
		}
	};
	for(var protoKey in Canvas.Views.View.prototype){
		if(typeof(Canvas.Views.Circle.prototype[protoKey]) == 'undefined') Canvas.Views.Circle.prototype[protoKey] = Canvas.Views.View.prototype[protoKey];
	};
})();