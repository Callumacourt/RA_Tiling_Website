import styles from "./ExpandedImg.module.css";
import { useRef } from "react";
import { ExpandedState } from "../../pages/GalleryPage";

interface ExpandedImgProps {
    setExpanded : React.Dispatch<React.SetStateAction<ExpandedState | null>>;
    image: string;
    cat: string;
    images : Array<string>  
}


export default function ExpandedImg ({ image, cat, images, setExpanded }: ExpandedImgProps) {
    const currentIndex = images.indexOf(image);
    const touchStartX = useRef<number | null>(null);


    const handlePrev = () => {
        const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        setExpanded({ image: images[prevIndex], cat });
    }

    const handleNext= () => {
        const prevIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        setExpanded({ image: images[prevIndex], cat });
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(delta) < 40) return;     
        if (delta < 0) handleNext(); else handlePrev();
    };

    return (
        <main className={styles.expandedContainer}>
            <button className={styles.closeBtn} onClick={() => setExpanded(null)}>X</button>
            <p>{currentIndex + 1} / {images.length}</p>
            <div
                className={styles.imgWrapper}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <img className={styles.heroImg} src={image} alt="A job" />
                <button onClick={handlePrev} className={styles.prevBtn}>&lt;</button>
                <button onClick={handleNext} className={styles.nextBtn}>&gt;</button>
            </div>
            <div className={styles.imgNav}>
                {images.filter(img => img !== image).map((img) => (
                    <img onClick={() => setExpanded({ image: img, cat })} key={img} src={img} alt={`Another ${cat} job`} />
                ))}
            </div>
        </main>
    );
}