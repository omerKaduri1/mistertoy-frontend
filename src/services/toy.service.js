// import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service-old.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
// _createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter,
    getDefaultSort,
    getLabels
}

// function query(filterBy = {}) {
//     return storageService.query(STORAGE_KEY)
//         .then(toys => {
//             let updatedToys = toys
//             if (filterBy.txt) {
//                 const regex = new RegExp(filterBy.txt, 'i')
//                 updatedToys = toys.filter(toy => regex.test(toy.name))
//             }
//             if (filterBy.isInStock !== 'all') {
//                 updatedToys = toys.filter((toy) => (filterBy.isInStock === 'inStock' ? toy.inStock : !toy.inStock))
//             }
//             return updatedToys
//         })
// }
function query(filterBy, sort) {
    return httpService.get('toy', { params: { filterBy, sort } })
}

// function getById(toyId) {
//     return storageService.get(STORAGE_KEY, toyId)
// }
function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

// function remove(toyId) {
//     // return Promise.reject('Not now!')
//     return storageService.remove(STORAGE_KEY, toyId)
// }
function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}

// function save(toy) {
//     if (toy._id) {
//         return storageService.put(STORAGE_KEY, toy)
//     } else {
//         // when switching to backend - remove the next line
//         toy.createdAt = Date.now()
//         toy.labels = [labels[utilService.getRandomIntInclusive(0, labels.length - 1)]]
//         toy.inStock = Math.random() < 0.5
//         return storageService.post(STORAGE_KEY, toy)
//     }
// }
function save(toy) {
    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy)
    } else {
        return httpService.post('toy', toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: true
    }
}

function getLabels() {
    return [...labels]
}

function getRandomToy() {
    return {
        name: 'Toy',
        price: utilService.getRandomIntInclusive(20, 300),
        labels: [labels[utilService.getRandomIntInclusive(0, labels.length - 1)]],
        inStock: Math.random() < 0.5,
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        labels: [],
        inStock: 'all'
    }
}

function getDefaultSort() {
    return {
        by: 'name',
        asc: true
    }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            {
                _id: utilService.makeId(),
                name: 'Toy Car',
                price: 12.99,
                labels: [labels[0], labels[6]],
                createdAt: Date.now(),
                inStock: true
            },
            {
                _id: utilService.makeId(),
                name: 'Building Blocks',
                price: 19.99,
                labels: [labels[1], labels[2]],
                createdAt: Date.now(),
                inStock: false
            },
            {
                _id: utilService.makeId(),
                name: 'Soft Toy Elephant',
                price: 9.99,
                labels: [labels[3], labels[4]],
                createdAt: Date.now(),
                inStock: true
            },
            {
                _id: utilService.makeId(),
                name: 'Jigsaw Puzzle',
                price: 15.49,
                labels: [labels[5]],
                createdAt: Date.now(),
                inStock: true
            },
            {
                _id: utilService.makeId(),
                name: 'Remote Control Helicopter',
                price: 39.99,
                labels: [labels[0], labels[6], labels[7]],
                createdAt: Date.now(),
                inStock: true
            }
        ]
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
    return toys
}