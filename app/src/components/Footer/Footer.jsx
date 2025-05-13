import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-title">Recettes</h3>
                        <ul className="footer-links">
                            <li>
                                <Link to="/recipes" className="footer-link">
                                    Toutes les recettes
                                </Link>
                            </li>
                            <li>
                                <Link to="/categories" className="footer-link">
                                    Catégories
                                </Link>
                            </li>
                            <li>
                                <Link to="/calculator" className="footer-link">
                                    Calculateur
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-title">Aide</h3>
                        <ul className="footer-links">
                            <li>
                                <Link to="/contact" className="footer-link">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="footer-link">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="footer-link">
                                    Politique de confidentialité
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="footer-link">
                                    Conditions d'utilisation
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} EasyRecipes. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    )
}


