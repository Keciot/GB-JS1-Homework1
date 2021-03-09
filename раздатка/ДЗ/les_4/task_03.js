var ver = "0.0.1-dev"
var questions = 0;
var max_questions = sheet_questions.length;
var money = 0;
var event, ok;

function ScreenView(text, count_answer)
{
    do {
        ok = false;
        event = +prompt(text + '-1 - Выход из игры');
       
        if (event == -1) {
            break;
        }
        else {
            ok = isAnswer(count_answer, event);
        }
    } while (!ok);
}

alert('Кто хочет стать миллионером ' + ver);
do {
    var que = sheet_questions[questions];
    text = "Вопрос номер" + questions + "\n" + que.title + "\n";
    for (q of que.answer) {
        text += q + "\n";
    }
    text += "Ваш выбор\n"

    ScreenView(text, 4);
    if (que.good == event-1) {
        money += 100;
        alert('Правельный ответ!!! У вас уже ' + money + ' очков');
    } else if (event != -1) {
        alert('Мне очень жаль но вы ошиблись');
        event = -1;
    }

    questions++;
    console.log(event);
} while (event != -1 || questions < max_questions);

if (money > 0) {
    alert('Вы набрали ' + money + ' очков');
} else {
    alert('Спасибо за игру');
}

//------------------------------------------
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

