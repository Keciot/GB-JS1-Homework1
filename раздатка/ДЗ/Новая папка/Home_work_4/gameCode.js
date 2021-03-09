var record = []; //история ответов
function isAnswer(q, event) {
    if (isNaN(event) || !isFinite(event)) {
        alert('Вы ввели недопустимый символ');
        return false;
    }
    else if (event < 1 || event > q) {
        alert('Ваше число выходит из допустимого диапозона');
        return false;
    }
    return true;  
}
function ansver(arg1, arg2, arg3){
    var ok = false;
    do {
    event = +prompt(arg1 + arg2 + arg3 + '-1 - Выход из игры'); 
        if (event == -1) {
        break;
        }
        else {
        ok = isAnswer(works.a0, event);
        }
    } while (!ok);
    switch(event) {
        case 1: record.push([arg1, arg2]);
            break;
        case 2: record.push([arg1, arg3]);
            break;
        case -1: record.push([arg1, "Вышли из игры"]);
            break;
    }
return event;
}
/////////
switch (ansver(works.a00, works.a1, works.a2)) {
    case 1: // Первое действие  - если в первом окне ввели 1 то открываем серию окон - окно 2
        switch (ansver(works.b00, works.b1, works.b2)) {
            case 1: // Второе действие, если во 2 окне ввели 1 то переходим на 4 окно
            case 2: // если ввели 2 то также переходим на 4 окно
                ansver(works.d00, works.d1, works.d2);
                break;
            case -1: // Второе действие
                break;
            default:
                alert('Ошибка');
        }
        break;
    case 2: // Первое действие    Если в 1 окне ввели 2 то переходим к 3 окну
        switch (ansver(works.c00, works.c1, works.c2)) {
            case 1: // Второе действие, если во 2 окне ввели 1 то переходим на 4 окно
            case 2: // если ввели 2 то также переходим на 4 окно
                ansver(works.d00, works.d1, works.d2);
                break;
            case -1: // Второе действие
                break;
            default:
                alert('Ошибка');
        }
        break;
    case -1: // Первое действие
        break;
    default:
        alert('Ошибка');
}
alert('Спасибо за игру');
console.log(record);
var step = +prompt("введите номер хода");
var stepHistory ="В ходе № " + step + " " + record[step-1][0] + "Ваш выбор " + record[step-1][1];
alert(stepHistory);