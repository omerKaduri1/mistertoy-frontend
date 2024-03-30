import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

// import { UserMsg } from './UserMsg.jsx'
// import { LoginSignup } from './LoginSignup.jsx'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'

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
        <header className="app-header flex column">
            <section className="header-container flex column">
                <h1 className='logo'>Toy App</h1>
                <nav className="app-nav flex">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                </nav>
            </section>
            {user ? (
                < section >
                    <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <Link to='/login'><button className="fa fa-user"></button></Link>
                </section>
            )}
            {/* <UserMsg /> */}
        </header>
    )
}