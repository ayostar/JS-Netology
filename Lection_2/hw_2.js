
const goods = {                             // Массив запасов
    1: {
        id: 1,                              // Код товара
        name: 'штаны',                      // Наименование
        description: 'верхняя одежда',      // Описание
        sizes: ['S', 'M', 'L', 'XL', ],     // массив возможных размеров
        price: 1000,                        // цена товара
        available: true,                    // Признак доступности для продажи
    },
    2: {
        id: 2,
        name: 'портки',
        description: 'верхняя одежда',
        sizes: ['M', 'L', 'XL', 'XXL', ],
        price: 1000,
        available: true,
    },
    3: {
        id: 3,
        name: 'футболка',
        description: 'верхняя одежда',
        sizes: ['M', 'L', 'XL', 'XXL', 'XXXL', ],
        price: 1000,
        available: true,
    },
    4: {
        id: 4,
        name: 'кеды',
        description: 'обувь',
        sizes: [40, 41, 42, 45, 56, ],
        price: 1000,
        available: true,
    },
    5: {
        id: 5,
        name: 'кепка',
        description: 'головные уборы',
        sizes: ['четкий', 'дальнобой', 'круглый', ],
        price: 1000,
        available: true,
    },
}


const goodsValues = [goods[0], goods[1], goods[2], goods[3], goods[4], ];


const cart = [
    {
        good: 1,                    // ссылка на товар в каталоге
        amount: 10,                 // количество товара в корзине
    },
    {
        good: 5,
        amount: 20,
    },
    {
        good: 3,
        amount: 30,
    },
]


cart.clearCart = function() {

    this.length = 0
    return `Количество товаров в корзине: ${this.length}.`
}

cart.searchGood = function(id) {
    const _good = this.find(({good}) => good === id)

    if (_good != undefined) {      
        const _index = this.findIndex(({good}) => good === id)
        
        return [_good, _index]

    
    } else {
        return [{good: undefined, amount: 0}, undefined]

    }
}


cart.addGood = function(id, quantity) {

    const _good = this.searchGood(id)
    foundGood = _good[0]
    cartIndex = _good[1]

    foundGood.amount += quantity
    foundGood.good = id
    

    if (cartIndex === undefined) {

        this.push(foundGood)

    } else {
        
        this[cartIndex] = foundGood
    }
    return cart
}


cart.deleteGood = function(id, quantity=0) {

    const _good = this.searchGood(id)
    cartIndex = _good[1]
    foundGood = _good[0]

    if (cartIndex === undefined) {
        return `Товар с id: ${id} не найден!`

    } else {

        if (foundGood.amount - quantity > 0){
            foundGood.amount -= quantity;
        } else if (foundGood.amount - quantity == 0) {
            this.splice(cartIndex, 1);
            console.log(`Товар с id: ${id} закончился.`)

        } else {
            return `Запрашиваемое количество товара с id: ${id} не доступно.`
        }

        return cart
    }
}


cart.totalCalc = function() {

    let totalAmount = 0
    let totaltSumm = 0

    for (let index = 0; index < this.length; index++) {

        let goodId = this[index].good

        totalAmount += this[index].amount
        totaltSumm += goods[goodId].price * this[index].amount 
    }

    return {
        totalAmount,
        totaltSumm,
    }
}


console.log(cart.clearCart())

console.log(cart.addGood(1, 7))
console.log(cart.addGood(2, 10))
console.log(cart.addGood(2, 5))
console.log(cart.addGood(3, 5))
console.log(cart.addGood(4, 10))

console.log(cart.deleteGood(1, 8))
console.log(cart.deleteGood(2, 5))

console.log(cart.totalCalc())

