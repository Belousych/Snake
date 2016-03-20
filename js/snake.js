(function () {
	self = this;
	window.onload = function () {
		var d = document.documentElement,
			widthMap = d.clientWidth, // ширина окна пользователя
			heightMap = d.clientHeight; // высота
       
        widthMap = Math.floor(widthMap * 0.1) * 10; //округляем до десятков
        heightMap = Math.floor(heightMap * 0.1) * 10; // округляем
       
        if (widthMap > 810) {
            widthMap = 810;
        }
        if (heightMap > 810) {
            heightMap = 810;
        }
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

		function PointP(p) {
			Point.apply(this);
			this.x = p.x;
			this.y = p.y;
			this.color = p.color;
		}
		PointP.prototype = Object.create(Point.prototype);
		// методы точки
		//Рисуем
		Point.prototype.draw = function () {
				ctx.strokeStyle = this.color;
				ctx.fillStyle = this.color;
				ctx.strokeRect(this.x, this.y, 8, 8);
				ctx.fillRect(this.x + 2, this.y + 2, 4, 4);
			}
			//Стираем
		Point.prototype.clear = function () {
			ctx.clearRect(this.x - 1, this.y - 1, 10, 10);
		}



		// Сдвигаем
		Point.prototype.move = function (offset, direction) {
			this.offset = offset;
			this.direction = direction;
			switch (this.direction) {
			case 'top':
				this.y = this.y - (this.offset * 10);
				break;
			case 'down':
				this.y = this.y + (this.offset * 10);
				break;
			case 'right':
				this.x = this.x + (this.offset * 10);
				break;
			case 'left':
				this.x = this.x - (this.offset * 10);
				break;
			}
		}



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
				var point = new Point(x, y, color);
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

        // руисуем границы
        var topBorder = new HorizontLine (0, widthMap, 0);
        var bottomBorder = new HorizontLine (0, widthMap, heightMap - 10);
        var leftBorder = new VerticalLine (0, heightMap, 0);
        var rightBorder = new VerticalLine (0, heightMap, widthMap - 10);
        topBorder.draw();
        bottomBorder.draw();
        leftBorder.draw();
        rightBorder.draw();
		// Змейка

		//направления
		var direction = {
			top: 'top',
			right: 'right',
			left: 'left',
			down: 'down'
		}
		var tail = new Point(50, 50); // хвост змейки

		function Snake(tail, lenght, direction) {
			Figure.apply(this);

			this.tail = tail;
			this.lenght = lenght;
			this.direction = direction;
			this.ready = true;

			for (var i = 0; i < this.lenght; i++) {
				var point = new PointP(this.tail);
				point.move(i, this.direction);
				this.listPoint.push(point);
			};


		}


		Snake.prototype = Object.create(Figure.prototype);
		Snake.prototype.getNextPoint = function () {
			var direction = this.direction,
				listPoint = this.listPoint;

			head = listPoint[listPoint.length - 1];
			nextPoint = new PointP(head);
			nextPoint.move(1, direction);
			return nextPoint;
		}
		Snake.prototype.move = function (e) {
			var direction = this.direction,
				listPoint = this.listPoint,
				tail = this.listPoint[0];

			

			this.listPoint.shift(); // удаляем хвост
			var head = this.getNextPoint(); // получаем следующую за головой точку
			this.listPoint.push(head); // записываем новую голову

			tail.clear(); //Стираем хвост
			head.draw(); // Рисуем голову



		};

		Snake.prototype.eat = function (food) {
			var foodX = food.x,
				foodY = food.y;
				
			
			var head = this.getNextPoint();  // получаем следующую за головой точку
				headX = head.x;
				headY = head.y;
			
			if (headX == foodX && headY == foodY) {
				this.lenght++;
				this.listPoint.push(head); // записываем новую голову

			
				head.draw(); // Рисуем голову
				return true;
			}

		}


		snake = new Snake(tail, 2, direction.right);
		snake.draw();




		// Еда
		function FoodCreator(widthMap, heightMap) {

			this.widthMap = widthMap;
			this.heightMap = heightMap;
			this.x = 0;
			this.y = 0;
		}


		//Рисуем еду
		FoodCreator.prototype.createFood = function () {
			var getRandomInt = function (min, max) {
				return Math.floor((Math.random() * (max - min + 1)) / 10) * 10 + min;
			}

			this.x = getRandomInt(0, widthMap - 20);
			this.y = getRandomInt(0, heightMap - 20);
            console.log(this.x);
            console.log(this.y);
			return new Point(this.x, this.y);
            
		}

		var foodCreatop = new FoodCreator(widthMap, heightMap);
		var food = foodCreatop.createFood();
		food.draw();
		//Управление
		document.onkeydown = function checkKeycode(event) {

			var keycode;
			if (!event) var event = window.event;
			if (event.keyCode) keycode = event.keyCode; // IE
			else if (event.which) keycode = event.which; // all browsers



			switch (keycode) {
			case 37:
				if (snake.direction == 'right') {
					return false;
				}
				snake.direction = 'left';
				break;
			case 38:
				if (snake.direction == 'down') {
					return false;
				}
				snake.direction = 'top';
				break;
			case 39:
				if (snake.direction == 'left') {
					return false;
				}
				snake.direction = 'right';
				break;
			case 40:
				if (snake.direction == 'top') {
					return false;
				}
				snake.direction = 'down';
				break;

			}



		}



		setInterval(function () {
			if (snake.eat(food)) {
				food = foodCreatop.createFood();
				food.draw();
			} else {
				snake.move();
				
			}


		}, 300);
	}



})()