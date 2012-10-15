Canvas.Views.Rectangle = Canvas.Views.View.extend({
	'size' : {'w':100,'h':50},
	'draw' : function draw(scene){
		if(!scene || !scene.ctx) return;
		var self = this;
		if(self.fill) scene.ctx.fillRect(self.origin.x,self.origin.y,self.size.w,self.size.h);
		if(self.stroke) scene.ctx.strokeRect(self.origin.x,self.origin.y,self.size.w,self.size.h);
	}
});