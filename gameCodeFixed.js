var step = 1;

var answerLog = [];
var i = 0

while (fetchNextStep()) {
    fetchNextStep();
}

function fetchNextStep() {
    if (step <= 2 && step > 0) {

        if (i < 3) {
            step = +prompt(steps[i][0] + steps[i][1] + steps[i][2] + 'Что-то еще - Выход из игры');
            answerLog.push(i + '' + step);
            i += step;
            console.log(answerLog);
            console.log(i);
            return true;
        } else if (i == 3 || i == 5) {
            alert(steps[i][0]);

            return false;
        } else if (i == 4) {
            step = +prompt(steps[4][0] + steps[4][1] + steps[4][2] + 'Что-то еще - Выход из игры');
            answerLog.push(i + '' + step);
            if (step == 1) {
                i = 3;
            } else {
                i = 5;
            }
            return true;
        }
    } else {
        alert('Конец игры(');
    }

}