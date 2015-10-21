(function () {
	self = this;
	window.onload = function () {
		var d = document.documentElement,
			widthMap = d.clientWidth,
			heightMap = d.clientHeight;
		app(widthMap, heightMap); // После загрузки страницы определяем ширину высоту. Пуск!
	}



	var app = function (widthMap, heightMap) {
		var gamearea = document.getElementById("gamearea"), // Создаем канвас
			ctx = gamearea.getContext('2d');
		gamearea.width = widthMap;
		gamearea.height = heightMap;
		
		
		// конструктор точки
		function Point(x, y, color) {
		  this.x = x;
		  this.y = y;
		  this.color = color;
		}
		// методы точки
		Point.prototype.draw = function(x, y, color) {
			ctx.strokeStyle = this.color;
			ctx.fillStyle = this.color;
			ctx.strokeRect(this.x, this.y, 9, 9);
			ctx.fillRect(this.x + 1, this.y + 1, 7, 7);
		}
		
		// горизонтальная линия
		function HorizontLine(xLeft, xRight, y, color) {
			this.xLeft = xLeft;
			this.xRight = xRight;
			this.y = y;
		  	this.color = color;
		}
		// рисуем линию
		HorizontLine.prototype.draw = function(xLeft, xRight, y, color) {
			for ( x = this.xLeft; x <= this.xRight; x=x+10) {
				var point = new Point(x,this.y, this.color);
				point.draw();
			}
		}
		
		// вертикальная линия
		function VerticalLine(yTop, xBottom, x, color) {
			this.yTop = yTop;
			this.xBottom = xBottom;
			this.x = x;
		  	this.color = color;
		}
		// рисуем линию
		VerticalLine.prototype.draw = function(yTop, xBottom, x, color) {
			for ( y = this.yTop; y <= this.xBottom; y=y+10) {
				var point = new Point(this.x,y, this.color);
				point.draw();
			}
		}
		
		var horizontLine = new HorizontLine(100, 180, 150, 'red');
		horizontLine.draw();
		
		var verticalLine = new VerticalLine(300, 500, 150, 'blue');
		verticalLine.draw();
//		function Snake (course, size, x, y, speed, color) { // Змейка
//			var self = this;
//			var defaultSettings = { // Значения змейки по умолчанию
//				course: 'top',
//				size: 2,
//				speed: 2,
//				x: widthMap / 2,
//				y: heightMap / 2
//			}
//			var settings = function () { // Если значения не заданы берем по умолчанию
//				if (course === undefined) {
//					course = defaultSettings.course;
//				}
//				if (size === undefined) {
//					size = defaultSettings.size;
//				}
//				if (x === undefined) {
//					x = defaultSettings.x;
//				}
//				if (y === undefined) {
//					y = defaultSettings.y;
//				}
//			}
//			
//			var render = function(){ // Рисуем змейку
//				var head = new Point(x,y, color);
//				head.draw();
//			}
//			
//			var init = function () {
//				settings();
//				render();
//			}
//			init();
//		}
//		var snake = new Snake();
//		var snake2 = new Snake('top', 2, 100, 100, 2, 'red');
	}

	
})()