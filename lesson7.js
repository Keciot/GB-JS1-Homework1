// Глобальные переменные:                            
var FIELD_SIZE_X = 20; //строки
var FIELD_SIZE_Y = 20; //столбцы
var SNAKE_SPEED = 200; // Интервал между перемещениями змейки
var snake = []; // Сама змейка
var direction = 'y-'; // Направление движения змейки
var gameIsRunning = false; // Запущена ли игра
var snake_timer; // Таймер змейки
var food_timer; // Таймер для еды
var score = 0; // Результат

function init() {
    prepareGameField(); // Генерация поля

    var wrap = document.getElementsByClassName('wrap')[0];
    wrap.style.width = '400px';
    // События кнопок Старт и Новая игра
    document.getElementById('snake-start').addEventListener('click', startGame);
    document.getElementById('snake-renew').addEventListener('click', refreshGame);

    // Отслеживание клавиш клавиатуры
    addEventListener('keydown', changeDirection);
}

/*  Функция генерации игрового поля */
function prepareGameField() {
    // Создаём таблицу
    var game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table');

    // Генерация ячеек игровой таблицы
    for (var i = 0; i < FIELD_SIZE_X; i++) {
        // Создание строки
        var row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (var j = 0; j < FIELD_SIZE_Y; j++) {
            // Создание ячейки
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;
            row.appendChild(cell); // Добавление ячейки
        }
        game_table.appendChild(row); // Добавление строки
    }
    document.getElementById('snake-field').appendChild(game_table); // Добавление таблицы
}

/* Старт игры */
function startGame() {
    if (!gameIsRunning) { // А.М. Убрана возможность запустить более одной змейки одновременно несколько раз нажимая "старт"
        gameIsRunning = true;
        respawn(); //создали змейку
        snake_timer = setInterval(move, SNAKE_SPEED); //каждые 200мс запускаем функцию move
        setTimeout(createFood, 5000);
        setTimeout(createBomb, 10000);
        setInterval(createBomb, 10000);
    } else {
        alert('Игра уже начата!');
    }
}

/* Функция расположения змейки на игровом поле */
function respawn() {
    // Змейка - массив td, Стартовая длина змейки = 2
    // Respawn змейки из центра
    var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
    var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);
    // Хвост змейки
    var snake_tail = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit');
    // Голова змейки
    var snake_head = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0];
    snake_head.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit');

    snake.push(snake_tail);
    snake.push(snake_head);
}

/* Движение змейки */
function move() {
    var snake_coords = snake[snake.length - 1].classList.item(1).split('-'); //преобразовали строку в массив
    var coord_y = parseInt(snake_coords[1]);
    var coord_x = parseInt(snake_coords[2]);
    // Определяем новую точку 
    switch (direction) { // А.М. переписано компактнее
        case 'x-':
            --coord_x;
            break;
        case 'x+':
            ++coord_x;
            break;
        case 'y-':
            --coord_y;
            break;
        case 'y+':
            ++coord_y;
            break;
    }
    var new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x))[0];


    // Проверки
    // 1) new_unit не часть змейки
    // 2) Змейка не ушла за границу поля
    if (!isSnakeUnit(new_unit) && new_unit !== undefined) {
        // Добавление новой части змейки
        new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit');
        snake.push(new_unit);

        // Проверяем, надо ли убрать хвост
        if (!haveFood(new_unit)) {
            // Находим хвост
            var removed = snake.splice(0, 1)[0].classList.remove('snake-unit', 'food-unit'); // А.М. переписано на 1 строку работы с классами вместо разбоки/сборки массива
        }
    } else {
        finishTheGame();
    }
}

/* Проверка на змейку */
function isSnakeUnit(unit) {
    var check = false;
    if (snake.includes(unit)) {
        check = true;
    }
    return check;
}
/* проверка на еду */
function haveFood(unit) {
    var check = false;

    var unit_classes = unit.getAttribute('class').split(' ');

    // Если еда
    if (unit_classes.includes('food-unit')) {
        check = true;
        createFood();
        score++;
        document.getElementById('score-info').innerText = 'Ваш счет: ' + score; // А.М. вывод текущего счета на экран
    }
    return check;
}

/* Создание еды */
function createFood() {
    var foodCreated = false;

    while (!foodCreated) { //пока еду не создали
        // рандом
        var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];
        if (food_cell.getAttribute('class').search('snake-unit') == -1) {
            food_cell.classList.add('food-unit'); // А.М. Убрала сборку/разборку классов из массива. 
            foodCreated = true;
        }
    }
}

function createBomb() {
    var isBomb = document.getElementsByClassName('bomb-unit')[0];
    if (isBomb) {
        isBomb.classList.remove('bomb-unit')
    }
    var bomb_x = Math.floor(Math.random() * FIELD_SIZE_X);
    var bomb_y = Math.floor(Math.random() * FIELD_SIZE_Y);
    var bomb_cell = document.getElementsByClassName('cell-' + bomb_x + '-' + bomb_y)[0];
    if (bomb_cell.getAttribute('class').search('snake-unit') == -1 || bomb_cell.getAttribute('class').search('food-unit' == -1)) {
        bomb_cell.classList.add('bomb-unit');
    }

}



/* Изменение направления движения змейки */ // А.М. Переписано движение по оси игрек так, чтобы знак все же совпадал с направлением движения. В исходном коде почему-то движение по оси игрек было инвертировано.
function changeDirection(e) {
    console.log(e);
    switch (e.keyCode) {
        case 37: // Клавиша влево
            if (direction != 'x+') {
                direction = 'x-'
            }
            break;
        case 38: // Клавиша вверх
            if (direction != 'y+') {
                direction = 'y-'
            }
            break;
        case 39: // Клавиша вправо
            if (direction != 'x-') {
                direction = 'x+'
            }
            break;
        case 40: // Клавиша вниз
            if (direction != 'y-') {
                direction = 'y+'
            }
            break;
        case 32: // А.М. Пробел - пауза
            alert('Пауза')
            break;

    }
}

/* Функция завершения игры */
function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    alert('Вы проиграли! Ваш результат: ' + score.toString());
}

/* Новая игра */
function refreshGame() {
    location.reload();
}

// Инициализация
window.onload = init;