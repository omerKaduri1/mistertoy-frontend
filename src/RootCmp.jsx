import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import '../src/assets/style/main.css'

import { AppHeader } from './cmps/AppHeader.jsx'
// import { AppFooter } from './cmps/AppFooter.jsx'

import { HomePage } from './pages/HomePage.jsx'
// import { AboutUs } from './pages/AboutUs.jsx'
import { store } from './store/store.js'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
// import { UserDetails } from './pages/UserDetails.jsx'


export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />
          <main className='main-layout'>
            <Routes>
              <Route element={<HomePage />} path="/" />
              {/* <Route element={<AboutUs />} path="/about" /> */}
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<LoginSignup />} path='/login' />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route element={<UserDetails />} path="/user/:userId" /> */}
            </Routes>
          </main>
          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider>

  )
}


