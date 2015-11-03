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
		Point.prototype.draw = function (x, y, color) {
			ctx.strokeStyle = this.color;
			ctx.fillStyle = this.color;
			ctx.strokeRect(this.x, this.y, 9, 9);
			ctx.fillRect(this.x + 1, this.y + 1, 7, 7);
		}

//		function Figure() {
//			this._listPoint = [];
//			this.draw = function (listPoint) {
//				for (var i = 0; i < this._listPoint.length; i++) {
//					this._listPoint[i].draw();
//				}
//			}
//		}
//		
//			// горизонтальная линия
//		function HorizontLine(xLeft, xRight, y, color) {
//			Figure.call(this);
//			for (x = xLeft; x <= xRight; x = x + 10) {
//				var point = new Point(x, y,color);
//				this._listPoint.push(point);
//			}
//		}
//		
//		
//
//		// вертикальная линия
//		function VerticalLine(yTop, xBottom, x, color) {
//			Figure.call(this);
//			for (y = yTop; y <= xBottom; y = y + 10) {
//				var point = new Point(x, y, color);
//				this._listPoint.push(point);
//			}
//		}
		
//		Конструктор фигуры
		function Figure() {
			this.listPoint = []; //массив для точек фигуры
		}
		//Рисуем фигуру
		Figure.prototype.draw = function () {
			for (var i = 0; i < this.listPoint.length; i++) {
				this.listPoint[i].draw();
			}
		}
		
		
		// горизонтальная линия
		function HorizontLine(xLeft, xRight, y, color) {
			Figure.apply(this);
			for (x = xLeft; x <= xRight; x = x + 10) {
				var point = new Point(x, y,color);
				this.listPoint.push(point);
				
			}
		}
		HorizontLine.prototype = Object.create(Figure.prototype);
		

		// вертикальная линия
		function VerticalLine(yTop, xBottom, x, color) {
			Figure.apply(this);
			for (y = yTop; y <= xBottom; y = y + 10) {
				var point = new Point(x, y, color);
				this.listPoint.push(point);
			}
		}
		VerticalLine.prototype = Object.create(Figure.prototype);
		
		var horizontLine = new HorizontLine(100, 180, 150, 'red');
		horizontLine.draw();

		var verticalLine = new VerticalLine(10, 600, 400, 'blue');
		verticalLine.draw();
		
	}


})()