
function SimpleNumbersQuantity(quantity) {

    if (isNaN(quantity) || quantity === 0) {
        return (`${quantity} - Не корректный ввод, введите целое число больше 0.`)
    }
    
    let simpleNumbersArray = []
    let number = 1
    let counter = 0

    while (counter < quantity) {
        ++number

        let divider = 1
        do {
            ++divider
        } while (number % divider != 0) 

        if (number == divider) {
            simpleNumbersArray[counter] = number
            ++counter
        }
    }

    return simpleNumbersArray
}

console.time()

// запускаем скрипт с передачей параметра количества необходимых простых чисел
// например node hw_1.js 100
console.log(SimpleNumbersQuantity(process.argv[2]))

console.timeEnd()
