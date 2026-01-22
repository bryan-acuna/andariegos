import { useState, useEffect } from 'react'
import './Home.css'

const images = [
  '/images/WhatsApp Image 2026-01-21 at 18.37.58.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 18.43.15.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 18.43.16.jpeg',
  '/images/WhatsApp Image 2026-01-21 at 18.43.16 (1).jpeg',
]

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="page">
      <h1>Welcome to Clever Acuna</h1>
      <p>Adventures and stories from the road.</p>
      <div className="slideshow">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="slideshow-image"
        />
        <div className="slideshow-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
