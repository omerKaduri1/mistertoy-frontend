import { userService } from "../../services/user.service.js"
import { SET_USER } from "../reducers/user.reducer.js"
import { store } from "../store.js"

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
    } catch (err) {
        console.log('user actions -> Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
    } catch (err) {
        console.log('user actions -> Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.log('user actions -> Cannot logout', err)
        throw err
    }
}

// export function login(credentials) {
//     return userService.login(credentials)
//         .then((user) => {
//             store.dispatch({ type: SET_USER, user })
//         })
//         .catch((err) => {
//             console.log('user actions -> Cannot login', err)
//             throw err
//         })
// }

// export function signup(credentials) {
//     return userService.signup(credentials)
//         .then((user) => {
//             store.dispatch({ type: SET_USER, user })
//         })
//         .catch((err) => {
//             console.log('user actions -> Cannot signup', err)
//             throw err
//         })
// }

// export function logout(credentials) {
//     return userService.logout(credentials)
//         .then(() => {
//             store.dispatch({ type: SET_USER, user: null })
//         })
//         .catch((err) => {
//             console.log('user actions -> Cannot logout', err)
//         })
// }