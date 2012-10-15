Canvas.Views.Text = Canvas.Views.View.extend({
	'font' : '10px sans-serif',
	'align' : 'start',
	'baseline' : 'alphabetic',
	'text' : '',
	'maxWidth' : null,
	'draw' : function draw(scene){
		if(!scene && !scene.ctx) return;
		var self = this;
		scene.ctx.font = self.font;
		scene.ctx.textAlign = self.align;
		scene.ctx.textBaseline = self.baseline;
		if(self.fill) scene.ctx.fillText(self.text, self.origin.x, self.origin.y);
		if(self.stroke) scene.ctx.strokeText(self.text, self.origin.x, self.origin.y);
	}
});