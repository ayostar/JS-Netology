
/* alert('Hello, world!');
console.log('Hello, developers!');

 */


while (true) {

    let n = Math.floor(Math.random() * 1000);

    console.log('Компьютер выбрал', n);

    const guess = prompt('Угадайте число или нажчите q для выхода: ');

    console.log('Вы ввели:', guess);

    if (guess == 'q') {
        break;
    }

    if (isNaN(guess)) {
        alert('Вы ввели не число! Введите число.')
    } else if (n > guess) {
        alert('Ваше число меньше! :)');
    } else if (n < guess) {
        alert('Ваше число больше! :(');
    } else {
        alert('Невероятно, вы угадали!!!');
    }

}

alert('Игра завершена!')




const n = Math.floor(Math.random() * 1000);

console.log('Компьютер выбрал', n);

let counter = 0;

while (counter < 10) {

    let guess = prompt('Угадайте число или нажчите q для выхода. У вас 10 попыток: ');
    console.log('Вы ввели:', guess);

    if (guess == 'q') {
        break;
    }

    if (isNaN(guess)) {
        alert('Вы ввели не число! Введите число.')
    } else if (n > guess) {
        alert('Ваше число меньше! :)');
    } else if (n < guess) {
        alert('Ваше число больше! :(');
    } else {
        alert('Невероятно, вы угадали!!!');
        break
    }
    counter += 1; 
}

alert('Игра завершена!')