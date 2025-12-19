import { useEffect, useState } from "react";
import styles from "./ServiceHero.module.css";

type Props = {
    title: string,
    images: string [],
    line: string,
}

export default function ServiceHero({ title, images, line } : Props) {
  const [idx, setIdx] = useState(0);
  const INTERVAL = 3000;

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const minSwipeDistance = 50; // Minimum distance for a swipe

  const onTouchStart = (e) => {
    setTouchEnd(0); // Reset
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
  
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      // Swipe left - go to next image
      setIdx(prev => (prev + 1) % images.length);
    }
    if (isRightSwipe) {
      // Swipe right - go to previous image
      setIdx(prev => (prev - 1 + images.length) % images.length);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
        setTimeout(() => {
            setIdx(prev => (prev + 1) % images.length);
        }, 500)
    }, INTERVAL)
    return () => clearInterval(timer);
  }, [idx, images.length, INTERVAL])

  return (
<div className={styles.carousel} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchMove={onTouchMove}>
  {/* Sliding images container */}
  <div 
    className={styles.imageTrack}
    style={{ transform: `translateX(-${idx * 100}%)` }}
  >
    {images.map((img, i) => (
      <div key={i} className={styles.imgDiv}>
        <img src={img} alt="An image of a patio" />
      </div>
    ))}
  </div>
  
  {/* Dark overlay on top of images */}
  <div className={styles.overlay} />
  
  {/* Fixed text */}
  <h3 className={styles.title}>{title}</h3>
  <h4 className={styles.line}>{line}</h4>
  
  {/* Fixed dots */}
  <div className={styles.dots}>
    {images.map((_, i) => (
      <div onClick={() => setIdx(i)} key={i} className={i === idx ? styles.dotActive : styles.dot} />
    ))}
  </div>
</div>
  )
}