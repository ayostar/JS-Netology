
function getPasswordChecker(password) {
    return function checker(inputPassword) {
        return (inputPassword === password)
    }
}

const checkPassword = getPasswordChecker('bestPassword');

console.log(checkPassword('1234567890'));
console.log(checkPassword('qwerty'));
console.log(checkPassword('08-08-2010'));
console.log(checkPassword('bestPassword'));
