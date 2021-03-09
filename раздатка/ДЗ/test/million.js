var userAnswer, goals = 0, wrongAnswer = 0; money = 0; 
for (var index = 0; index < questions.length; index++) {
    userAnswer = +prompt("Вопрос №"+(index+1)+"  "+questions[index].q+"\n"+"Варианты ответов:"+"\n"+questions[index].a1+"\n"+questions[index].a2+"\n"+questions[index].a3+"\n"+questions[index].a4+"\nВведите номер правильного ответа.\n\nДля выхода из игры введите -1");
    if (userAnswer == -1) {
        alert("Возвращайтесь, будем Вас ждать.")
        break;
    }
    if (userAnswer == questions[index].correct) {
        money += (index+1)*1000;
        alert("Поздравляем вы ответили правильно и получаете  за ответ "+((index+1)*1000)+" рублей");
        goals++;
        }
    else {
        wrongAnswer++;
        alert("К сожалению вы ответили неверно\n У вас осталось "+(3-wrongAnswer)+" попытки");
        if (wrongAnswer==3) {break;}
        }
}
alert("Вы  ответиили правильно на "+goals+" вопросов из "+questions.length+" и заработали за игру "+money+" рублей"); 
 
