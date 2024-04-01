import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../store/actions/user.actions.js'

// import { UserMsg } from './UserMsg.jsx'
// import { LoginSignup } from './LoginSignup.jsx'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    return (
        <header className="app-header flex align-center space-between">
            {/* <section className="header-container flex"> */}
            {/* <img src='../assets/img/logo.png' alt="logo" /> */}
            <h1 className='logo'>Toy App</h1>
            <nav className="app-nav flex">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/about" >About</NavLink>
                <NavLink to="/toy" >Toys</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                {user ? (
                    < section >
                        <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <NavLink to='/login'><button className="fa fa-user"></button></NavLink>
                    </section>
                )}
            </nav>
            {/* </section> */}
            {/* <UserMsg /> */}
        </header>
    )
}