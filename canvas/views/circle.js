Canvas.Views.Circle = Canvas.Views.View.extend({
	'radius' : 30,
	'draw' : function draw(scene){
		if(!scene || !scene.ctx) return;
		var self = this;
		scene.ctx.beginPath();
		scene.ctx.arc(self.origin.x,self.origin.y,self.radius,0,Math.PI*2,false);
		if(self.fill) scene.ctx.fill();
		if(self.stroke) scene.ctx.stroke();
	}
});