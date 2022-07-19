// переменные интерактивного общения
const gameWelcome = 'Node загадал число от 0 до 999. Ваш выбор?'
const numberWelcome = 'Введите число или выберите "q" для выхода: '

// счетчик попыток
let currentAttempt = 1

// основной запрос пользователю
let gameQuery = (attempt, textContent = numberWelcome) => {return `Попытка №${attempt}. ${textContent}`}

// заводим файл лога
const fs = require('fs')
const folderName = './log'

try {
    if (!fs.existsSync(folderName)){
      fs.mkdirSync(folderName)
    }
  } catch (err) {
    console.error(err)
  }

const logFileName = `${folderName}/hw_2.log`

// записываем события в лог.
function writeLog(fileName, inputData) {
    let incomingData = ''

    incomingData = new Date().toLocaleString('ru-RU') + ' - ' + inputData + '\n'

    fs.writeFileSync(fileName, incomingData, {flag: 'a+'}, (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
/*     fs.appendFile(fileName, incomingData, (err) => {
        if (err) {
          console.error(err)
          return
        }
      }) */
}

// создаём полльзовательский интерфейс
let rl = require('readline').createInterface(process.stdin, process.stdout)

// получаем случайное число
const gameNumber = Math.floor(Math.random() * 1000)

// начинаем игру выводим приветствие и записываем в лог приветствие
console.log(gameWelcome)
writeLog(logFileName, gameWelcome)

// консольный ввод

// The rl.setPrompt() method sets the prompt that will be written to output whenever rl.prompt() is called.
rl.setPrompt(gameQuery(currentAttempt))

writeLog(logFileName, gameQuery(currentAttempt))

// The rl.prompt() method writes the InterfaceConstructor instances configured prompt to a new line in output in order to provide a user with a new location at which to provide input.
rl.prompt()


// The listener function is called with a string containing the single line of received input.
rl.on('line', (answerInput) => {
    currentAttempt++

    let interfaceOutput = ''
    let quit = false

    if (answerInput == 'q') {
        interfaceOutput = 'Приходите ещё!'
        quit = true
    } else if (isNaN(answerInput)) {
        interfaceOutput = `Вы ввели не число. Введите число от 0 до 999. ${gameQuery(currentAttempt)}`
    } else if (answerInput == gameNumber) {
        interfaceOutput = `Вы угадали моё число ${answerInput}!`
        quit = true
    } else if (answerInput > gameNumber) {
        interfaceOutput = `Моё число меньше вашего: ${answerInput}\n${gameQuery(currentAttempt)}`
    } else if (answerInput < gameNumber) {
        interfaceOutput = `Моё число больше вашего: ${answerInput}\n${gameQuery(currentAttempt)}`
    }

    console.log(interfaceOutput)
    writeLog(logFileName, interfaceOutput)

    if (quit) {
        rl.close()
    }

})
