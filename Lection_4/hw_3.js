const path = require('path')
const gameNumber = Math.floor(Math.random() * 1000)
const gameWelcome = 'Node загадал число от 0 до 999. Ваш выбор?'
const numberWelcome = 'Введите число или выберите "q" для выхода: '

const fs = require('fs')

let gameQuery = (attempt, _numberWelcome=numberWelcome) => {return `Попытка №${attempt}. ${_numberWelcome}`}

let rl = require('readline').createInterface(process.stdin, process.stdout)

function getPathlog() {
    const pathToLog = path.resolve('log', 'hw_3.log')
    return pathToLog
}

function getCurrentAttempt(attempt=0) {

    let currentAttempt = attempt
    return function increment() {
        currentAttempt++
        return currentAttempt
    }
}

function writeLog(fileName, inputData) {
    let incomingData = ''

    incomingData = new Date().toLocaleString('ru-RU') + ' - ' + inputData + '\n'

    fs.writeFileSync(fileName,incomingData, {flag: 'a+'}, (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
}

function question(_numberWelcome) {
    return new Promise((resolve) => {
        rl.question(_numberWelcome, (data) => {
            resolve(data)
        })
    })
}

async function getAnswer(_numberWelcome) {

    while (true) {
        const answerInput = await question(_numberWelcome)
        let quit = false

        writeLog(logFileName, _numberWelcome + answerInput)

        let interfaceOutput = ''
        
        if (answerInput == 'q') {
            interfaceOutput = 'Приходите ещё!'
            quit = true
        } else if(isNaN(answerInput)) {
            interfaceOutput = 'Вы ввели не число. Введите число от 0 до 999.'
        } else if (answerInput == gameNumber) {
            interfaceOutput = `Вы угадали моё число ${answerInput}`
            quit = true
        } else {   
            if (answerInput > gameNumber) {
                interfaceOutput = `Моё число меньше вашего:: ${answerInput}`
                console.log(`Подсказка, число от ${gameNumber - 5} до ${gameNumber + 5}`)
            } else if (answerInput < gameNumber) {
                interfaceOutput = `Моё число больше вашего: ${answerInput}`
                console.log(`Подсказка, число от ${gameNumber - 5} до ${gameNumber + 5}`)
            } 
}

        console.log(interfaceOutput)

        writeLog(logFileName, interfaceOutput)

        if (quit) {
            rl.close()
            break
        } else {
            _numberWelcome = gameQuery(nextAttempt())
        }    
    }
}

const nextAttempt = getCurrentAttempt()

console.log(gameWelcome)

const logFileName = getPathlog()
writeLog(logFileName, gameWelcome)

getAnswer(gameQuery(nextAttempt()))