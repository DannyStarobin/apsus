import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

export const carService = {
    getById,
    query,
    add,
    update,
    remove,
    getVendors
}

const KEY = 'carsDB'
var gVendors = ['audi', 'fiat', 'suzuki', 'honda', 'mazda']

_createCars()

function query() {
    const cars = _loadFromStorage()
    return Promise.resolve(cars)
}

function getById(carId) {
    const cars = _loadFromStorage()
    const car = cars.find(car => carId === car.id)
    return Promise.resolve(car)
}

function remove(carId) {
    var cars = _loadFromStorage()
    cars = cars.filter(car => car.id !== carId)
    _saveToStorage(cars)
    return Promise.resolve()
}

function add(vendor, speed) {
    var cars = _loadFromStorage()
    const car = _createCar(vendor, speed)
    cars = [car, ...cars]
    _saveToStorage(cars)
    return Promise.resolve(car)
}

function update(carId, maxSpeed) {
    var cars = _loadFromStorage()
    var car = cars.find(car => car.id === carId)
    car = {...car, maxSpeed}
    _saveToStorage(cars)
    return Promise.resolve(car)
}

function getVendors() {
    return gVendors
}

function _createCar(vendor, maxSpeed = utilService.getRandomIntInclusive(1, 200)) {
    return {
        id: utilService.makeId(),
        vendor,
        maxSpeed,
        desc: utilService.makeLorem()
    }
}

function _createCars() {
    const cars = _loadFromStorage()
    if (!cars || !cars.length) {
        const cars = []
        for (let i = 0; i < 20; i++) {
            const vendor = gVendors[utilService.getRandomIntInclusive(0, gVendors.length-1)]
            cars.push(_createCar(vendor))
        }
        _saveToStorage(cars)
    }
}

function _saveToStorage(cars) {
    storageService.saveToStorage(KEY, cars)
}
function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}
