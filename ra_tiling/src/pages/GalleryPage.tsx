import { useEffect, useState } from "react";
import fetchGallery from "../utils/fetchGallery";
import styles from './css/GalleryPage.module.css';
import { getWindowWidth } from "../utils/getViewportDimension";

export default function GalleryPage() {
    const [images, setImages] = useState<string[]>([]);
    const [viewPort, setViewport] = useState(getWindowWidth());

    useEffect(() => {
        const handleResize = () => setViewport(getWindowWidth());
        window.addEventListener("resize", handleResize);  
    }, []);

    useEffect(() => {
        fetchGallery()
            .then(imgs => {
                const filtered = imgs.filter(img => img.includes(viewPort));
                setImages(filtered);
            })
            .catch(console.error);
    }, [viewPort]);

    return (
        <>
            <h1>Gallery Page</h1>
            <div className = {styles.imgContainer}>
                {images.map((url) => (
                    <img className = {styles.img} src={url} alt={`Gallery image}`} />
                ))}
            </div>
        </>
    );
}