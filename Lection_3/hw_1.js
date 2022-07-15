class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id
        this.name = name
        this.description = description
        this.sizes = sizes
        this.price = price
        this.available = available
    }



    // декоратор взял из подсказки VS Code
     /**
     * @param {boolean} value
     */
     set setAvailable (value) {
        this.available = value
    }

}

class GoodsList {

    #goods

    constructor (filter, sortPrice, sortDir) {
        this.#goods = []
        this.filter = filter
        this.sortPrice = sortPrice
        this.sortDir = sortDir
    }

    get list() {
        const filteredList = this.#goods.filter((input) => this.filter.test(input.name))

        if (this.sortPrice) {
            if (this.sortDir) {
                return filteredList.sort((good1, good2) => (good1.price - good2.price))
            }  else {
                return filteredList.sort((good1, good2) => (good2.price - good1.price))
            }
        } else {
            return filteredList;
        }
    }

    get listParams() {
        if (this.sortPrice) {
            return `Список товаров по параметрам:\n
                    - наименование товара (ключевая фраза) - ${this.filter},\n
                    - сортировака по цене - ${this.sortPrice ? "да" : "нет"},\n
                    - тип сортировки по цене - по ${this.sortDir ? "возрастанию" : "убыванию"}.`
        } else {
            return `Список товаров по параметрам:\n
                    - наименование товара (ключевая фраза) - ${this.filter},\n
                    - сортировака по цене - нет.`
        }      
    }

    add(good) {
        this.#goods.push(good)
    }

    remove(id) {
        const goodIndex = this.#goods.findIndex(good => good.id === id)
        if (goodIndex != undefined) {
            this.#goods.splice(goodIndex, 1)
        }
        return goodIndex
    }
}

class BasketGood extends Good {

    constructor(id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available)
        this.amount = amount
    }
}

class Basket {

    constructor() {
        this.goods = []
    }

    get totalAmount() {
        return this.goods.map(_good => _good.amount).reduce((good1, good2) => good1 + good2, 0)
    }

    get totalSum() {
        let cost = 0
        this.goods.forEach(good => cost += good.price * good.amount)
        return cost
    }

    add(good, amount) {
        const goodId = this.goods.findIndex(value => value.id === good.id)

        if (goodId >= 0) {
            this.goods[goodId].amount += amount;
        } else {
            const newBasketGood = new BasketGood(good.id, good.name, good.description, good.sizes, good.price, good.available, amount);
            this.goods.push(newBasketGood);
        }
    }

    remove(good, amount) {
        const goodIndex = this.goods.findIndex(good => good.id === good.id)
        let currentAmount = this.goods[goodIndex].amount

        if (goodIndex >= 0) {

            if (currentAmount - amount === 0) {
                console.log(`Товар ${good.id} удален из корзины.`)
                this.goods.splice(goodIndex, 1)
            } else if (currentAmount - amount < 0) {
                console.log(`Товара ${good.id} всего ${currentAmount}. Укажите меньшее число`)
            } else {
                currentAmount -= amount
                console.log(`Товара ${good.name} осталось ${currentAmount}.`)
            }
        } else {
            console.log(`Функция Basket.remove: не найден товар с id = ${good.id}`)
        }

    }

    removeUnavailable() {
        this.goods.filter(good => good.available === false).forEach(good => this.remove(good))
        console.log('Из корзины удалены недоступные в каталоге товары')
    }

    clear() {
        this.goods.length = 0
        console.log('Корзина очищена')
    }

}

// Номенклатура
const good_1 = new Good(1, 'штаны', 'верхняя одежда', ['S', 'M', 'L', 'XL', ], 1000, true)
const good_2 = new Good(2, 'штаны модные', 'верхняя одежда', ['M', 'L', 'XL', 'XXL', ], 10000, true)
const good_3 = new Good(3, 'футболка', 'верхняя одежда', ['M', 'L', 'XL', 'XXL', 'XXXL', ], 1000, true)
const good_4 = new Good(4, 'кеды', 'обувь', [40, 41, 42, 45, 56, ], 1000, true)
const good_5 = new Good(5, 'кепка', 'головные уборы', ['четкий', 'дальнобой', 'круглый', ], 5000, true)


// Маркируем закончившиеся товары
good_1.setAvailable = false
good_4.setAvailable = false

// Создаем экземпляр GoodsList с товарами по убыванию цены
const catalog = new GoodsList(/\W/i, true, false)

// Добавляем все товары
catalog.add(good_1)
catalog.add(good_2)
catalog.add(good_3)
catalog.add(good_4)
catalog.add(good_5)

console.log(catalog.listParams)
console.log(catalog.list, '\n')


// Добавляем с сортировкой товары, в название которых есть 'ке'
catalog.filter = /ке/i
catalog.sortPrice = false
catalog.sortDir = false
console.log(catalog.listParams)
console.log(catalog.list, '\n')


// Добавляем с сортировкой товары, в название которых есть 'штаны'
catalog.filter = /штаны/i
catalog.sortPrice = true;
catalog.sortDir = true;
console.log(catalog.listParams)
console.log(catalog.list, '\n')

// Удаляем товар
catalog.remove(3)
catalog.remove(10)

// Создаем экземпляр корзины
const basket = new Basket()

// добавляем товары в корзину с количеством
basket.add(good_1, 1)
basket.add(good_1, 2)
basket.add(good_3, 3)
basket.add(good_5, 1)
basket.add(good_2, 4)

console.log(`Всего в корзине товаров: ${basket.totalAmount} на сумму ${basket.totalSum} руб.`)


// удаляем товыра из корзины по количеству
basket.remove(good_3, 2)
basket.remove(good_3, 3)
basket.remove(good_3, 10)
basket.remove(good_4, 1)

// Удаляем недоступные товары из корзины
basket.removeUnavailable()
console.log(basket.goods, '\n')

basket.clear()
console.log(basket.goods)