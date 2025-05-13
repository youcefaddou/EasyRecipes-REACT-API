import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Header.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-container">
          <Link to="/" className="logo">
            EasyRecipes
          </Link>

          <button 
            className={`menu-button ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span className="menu-icon"></span>
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/recipes" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Les recettes
              </Link>
            </li>
            <li>
              <Link to="/news" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Actualités
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}