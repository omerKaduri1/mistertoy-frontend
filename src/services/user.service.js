// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

// const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const BASE_URL = 'auth/'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials
}


function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

async function login({ username, password }) {
    const user = await httpService.post(BASE_URL + 'login', { username, password })
    if (user) return _setLoggedinUser(user)
}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }
    const savedUser = httpService.post(BASE_URL + 'signup', user)
    if (savedUser) return _setLoggedinUser(savedUser)
}


function updateScore(diff) {
    const loggedInUserId = getLoggedinUser()._id
    return userService.getById(loggedInUserId)
        .then(user => {
            if (user.score + diff < 0) return Promise.reject('No credit')
            user.score += diff
            return storageService.put(STORAGE_KEY, user)
        })
        .then(user => {
            _setLoggedinUser(user)
            return user.score
        })
}

async function logout() {
    await httpService.post(BASE_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    // const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}
