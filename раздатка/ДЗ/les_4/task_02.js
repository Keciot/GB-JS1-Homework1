var event, ok;
var answers_save = true;
var answers = [];

function Answer(text, answer)
{
    this.text = text;
    this.answer = answer;
}

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

    if (answers_save) {
        var answer = new Answer(text, event);
        answers.push(answer);
    }
}

ScreenView(works.a00 + works.a1 + works.a2, works.a0);
switch (event) {
    case 1: // Первое действие  - если в первом окне ввели 1 то открываем серию окон - окно 2
        ScreenView(works.b00 + works.b1 + works.b2, works.b0);
        switch (event) {
            case 1:
            case 2:
                ScreenView(works.d00 + works.d1 + works.d2, works.d0);
                break;
            case -1:
                break;
            default:
                alert('Ошибка');
        }
        break;
    case 2: // Первое действие    Если в 1 окне ввели 2 то переходим к 3 окну
        ScreenView(works.c00 + works.c1 + works.c2, works.c0);
        switch (event) {
            case 1: // Второе действие
            case 2: // Второе действие
                ScreenView(works.d00 + works.d1 + works.d2, works.d0);
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
answers_save = false;
do {
    ScreenView("Посмотреть историю? Введите номер хода n из " + answers.length + ". ", answers.length);
    if (event != -1) {
        alert(answers[event-1].text + '\nВы выбрали ответ: ' + answers[event-1].answer);
    }
} while (event != -1);
alert('Досвидание');

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

