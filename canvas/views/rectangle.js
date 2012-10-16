(function(){
	Canvas.Views.Rectangle = function(options){
		var self = this;
		for(var paramKey in options){
			if(typeof(self[paramKey]) != 'undefined') self[paramKey] = options[paramKey];
		}
	};
	Canvas.Views.Rectangle.prototype = {
		'size' : {'w':100,'h':50},
		'cornerRadius' : 0,
		'draw' : function draw(scene){
			if(!scene || !scene.ctx) return;
			var self = this;
			if(self.cornerRadius <= 0){
				if(self.fill) scene.ctx.fillRect(self.origin.x,self.origin.y,self.size.w,self.size.h);
				if(self.stroke) scene.ctx.strokeRect(self.origin.x,self.origin.y,self.size.w,self.size.h);
			}else{
				
				self.cornerRadius = Math.min.apply(Math,[self.cornerRadius, self.size.w/2, self.size.h/2]);

				scene.ctx.beginPath();

				 // draw top and top right corner
			    scene.ctx.moveTo(self.origin.x+self.cornerRadius,self.origin.y);
			    scene.ctx.arcTo(self.origin.x+self.size.w,self.origin.y,self.origin.x+self.size.w,self.origin.y+self.cornerRadius,self.cornerRadius);

			    // draw right side and bottom right corner
			    scene.ctx.arcTo(self.origin.x+self.size.w,self.origin.y+self.size.h,self.origin.x+self.size.w-self.cornerRadius,self.origin.y+self.size.h,self.cornerRadius); 

			    // draw bottom and bottom left corner
			    scene.ctx.arcTo(self.origin.x,self.origin.y+self.size.h,self.origin.x,self.origin.y+self.size.h-self.cornerRadius,self.cornerRadius);

			    // draw left and top left corner
			    scene.ctx.arcTo(self.origin.x,self.origin.y,self.origin.x+self.cornerRadius,self.origin.y,self.cornerRadius);

				if(self.fill) scene.ctx.fill();
				if(self.stroke) scene.ctx.stroke();
			}
		}
	};
	for(var protoKey in Canvas.Views.View.prototype){
		if(typeof(Canvas.Views.Rectangle.prototype[protoKey]) == 'undefined') Canvas.Views.Rectangle.prototype[protoKey] = Canvas.Views.View.prototype[protoKey];
	};
})();