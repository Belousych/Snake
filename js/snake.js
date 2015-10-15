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

		var Block = function (x, y) { // Строительный блок 10 на 10 пикселей
			ctx.strokeStyle = "#1c1c1c";
			ctx.strokeRect(x, y, 10, 10);
			ctx.fillRect(x + 1, y + 1, 8, 8);
		}
		
		var Snake = function (course, size, x, y, speed) { // Змейка
			var self = this;
			var defaultSettings = { // Значения змейки по умолчанию
				course: 'top',
				size: 2,
				speed: 5,
				x: widthMap / 2,
				y: heightMap / 2
			}
			var settings = function () { // Если значения не заданы берем по умолчанию
				if (course === undefined) {
					course = defaultSettings.course;
				}
				if (size === undefined) {
					size = defaultSettings.size;
				}
				if (x === undefined) {
					x = defaultSettings.x;
				}
				if (y === undefined) {
					y = defaultSettings.y;
				}
			}
			
			var render = function(){ // Рисуем змейку
				var head = new Block(x,y);
			}
			
			var init = function () {
				settings();
				render();
			}
			init();
		}
		var snake = new Snake();
	}

	
})()