import { useState, useEffect } from 'react';
import './HomeCarousel.css'

const HomeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Exemple de données pour le carousel
  const carouselItems = [
    {
      id: 1,
      title: "Pâtes Carbonara",
      description: "Une recette italienne classique",
      image: "/src/assets/images/carbonara.jpg",
      category: "Italien"
    },
    {
      id: 2,
      title: "Salade César",
      description: "Fraîche et croquante",
      image: "/src/assets/images/cesar.jpg",
      category: "Salade"
    },
    {
      id: 3,
      title: "Tarte aux Pommes",
      description: "Un dessert traditionnel",
      image: "/src/assets/images/tarte-pommes.jpg",
      category: "Dessert"
    },
    {
      id: 4,
      title: "Risotto aux Champignons",
      description: "Crémeux et parfumé",
      image: "/src/assets/images/risotto.webp",
      category: "Italien"
    }
  ];

  
  // Auto-rotation du carousel
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex >= carouselItems.length) {
      setCurrentIndex(0);
    } else if (currentIndex < 0) {
      setCurrentIndex(carouselItems.length - 1);
    }
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <button className="carousel-button prev" onClick={handlePrev}>
          <span>←</span>
        </button>
        
        <div className="carousel-content">
          <div 
            className="carousel-track"
            style={{
              transform: `translateX(${-currentIndex * 100}%)`,
              transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {[...carouselItems, carouselItems[0]].map((item, index) => (
              <div
                key={index}
                className="carousel-item"
                style={{ width: '100%' }}
              >
                <div className="bento-card">
                  <div className="bento-image">
                    <img src={item.image} alt={item.title} />
                    <div className="category-tag">{item.category}</div>
                  </div>
                  <div className="bento-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="carousel-button next" onClick={handleNext}>
          <span>→</span>
        </button>
      </div>

      <div className="carousel-dots">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex % carouselItems.length ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;
