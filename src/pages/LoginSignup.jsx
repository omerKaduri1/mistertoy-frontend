import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { login, signup } from '../store/actions/user.actions.js'
import { LoginForm } from '../cmps/LoginForm.jsx'

export function LoginSignup() {
    const [isSignup, setIsSignUp] = useState(false)
    const navigate = useNavigate()

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    function toggleSignup(e) {
        e.preventDefault()
        setIsSignUp(!isSignup)
    }

    async function _login(credentials) {
        try {
            await login(credentials)
            // showSuccessMsg('Logged in successfully')
            navigate('/')
        } catch (err) {
            showErrorMsg('Oops try again')
        }
    }

    async function _signup(credentials) {
        try {
            await signup(credentials)
            // showSuccessMsg('Signed in successfully')
            navigate('/')
        } catch (err) {
            showErrorMsg('Oops try again')
        }
    }

    // function _login(credentials) {
    //     login(credentials)
    //         .then(() => { showSuccessMsg('Logged in successfully') })
    //         .catch((err) => { showErrorMsg('Oops try again') })
    // }

    // function _signup(credentials) {
    //     signup(credentials)
    //         .then(() => { showSuccessMsg('Signed in successfully') })
    //         .catch((err) => { showErrorMsg('Oops try again') })
    // }

    return (
        <div className="login-page flex column justify-center align-center">
            <LoginForm
                onLogin={onLogin}
                isSignup={isSignup}
            />
            <a href="#" onClick={toggleSignup}>
                {isSignup ?
                    'Already a member? Login' :
                    'New user? Signup here'
                }
            </a >
        </div >
    )
}
