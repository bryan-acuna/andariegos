import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <div className="logo">
          <svg viewBox="0 0 100 100" className="mountain-icon">
            <polygon points="50,15 85,85 15,85" fill="#646cff" />
            <polygon points="50,35 70,85 30,85" fill="#535bf2" />
          </svg>
          <span className="brand-name">Andariegos</span>
        </div>
        <nav className="navbar">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
