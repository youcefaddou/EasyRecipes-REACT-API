import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import News from './pages/News'
import FAQ from './pages/FAQ'
import Ingredients from './pages/Ingredients'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/news" element={<News />} />
            
            <Route path="/faq" element={<FAQ />} />
            <Route path="/ingredients" element={<Ingredients />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App


