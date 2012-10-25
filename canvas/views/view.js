if(typeof(Canvas.Views) != 'object')Canvas.Views = {};
 
(function(){
	Canvas.Views.View = function(options){
		var self = this;
		for(var paramKey in options){
			if(typeof(self[paramKey]) != 'undefined') self[paramKey] = options[paramKey];
		}
	};

	Canvas.Views.View.prototype = {
		'origin' : {'x':0, 'y':0},
		'scale' : {'x':1, 'y':1},
		'rotate' : 0,
		'translate' : {'x':0, 'y':0},
		'transform' : {'m11':1,'m12':0,'m21':0,'m22':1,'dx':0,'dy':0},
		'useMatrix' : false,
		'setMatrix' : false,
		'alpha' : 1,
		'compositeOperation' : 'source-over',
		'lineWidth' : 1,
		'lineCap' : 'butt',
		'lineJoin' : 'miter',
		'miterLimit' : 10,
		'strokeStyle' : 'rgb(0,0,0)',
		'fillStyle' : 'rgb(0,0,0)',
		'shadowOffsetX' : 0,
		'shadowOffsetY' : 0,
		'shadowBlur' : 0,
		'shadowColor' : 'rgba(0,0,0,0.5)',
		'fill' : true,
		'stroke' : false,
		'clipView' : null,
		'subviews' : null,
		'parentView' : null,
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
		'render' : function render(scene){
			if(!scene || !scene.ctx) return;
			var self = this;
			if(self.useMatrix){
				var t = self.transform;
				self.setMatrix ? scene.ctx.setTransform(t.m11,t.m12,t.m21,t.m22,t.dx,t.dy) : scene.ctx.transform(t.m11,t.m12,t.m21,t.m22,t.dx,t.dy);
			}else{
				scene.ctx.translate(self.translate.x,self.translate.y);
				scene.ctx.rotate(self.rotate);
				scene.ctx.scale(self.scale.x,self.scale.y);
			}

			scene.ctx.globalAlpha = self.parentView ? self.alpha * self.parentView.alpha : self.alpha;
			scene.ctx.globalCompositeOperation = self.compositeOperation;

			scene.ctx.lineWidth = self.lineWidth;
			scene.ctx.lineCap = self.lineCap;
			scene.ctx.lineJoin = self.lineJoin;
			scene.ctx.miterLimit = self.miterLimit;

			scene.ctx.strokeStyle = self.strokeStyle;
			scene.ctx.fillStyle = self.fillStyle;

			scene.ctx.shadowOffsetX = self.shadowOffsetX;
			scene.ctx.shadowOffsetY = self.shadowOffsetY;
			scene.ctx.shadowBlur = self.shadowBlur;
			scene.ctx.shadowColor = self.shadowColor;

			self.draw(scene);

			// if(self.fill) scene.ctx.fill();
			// if(self.stroke) scene.ctx.stroke();
			for(var v in self.subviews){
				scene.ctx.save();
				self.subviews[v].render(scene);
				scene.ctx.restore();
			}
		},
		'draw' : function draw(scene){
			if(!scene || !scene.ctx) return;
		},
		'update' : function update(scene){
			if(!scene || !scene.ctx) return;
			var self = this;
			for(var v in self.subviews){
				self.subviews[v].update(scene);
			}
		},
		'onInput' : function onInput(){
			if(!scene || !scene.ctx) return;
		}
	}
})();