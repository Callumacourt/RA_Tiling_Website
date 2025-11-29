import { useEffect, useState } from "react";
import fetchGallery from "../utils/fetchGallery";
import styles from './css/GalleryPage.module.css';
import { getWindowWidth } from "../utils/getViewportDimension";

export default function GalleryPage() {
    const [images, setImages] = useState<string[]>([]);
    const [viewPort, setViewport] = useState(getWindowWidth());

    useEffect(() => {
        const handleResize = () => {
            const newViewport = getWindowWidth();
            setViewport(newViewport);
            console.log("New viewport:", newViewport); 
        };
        
        window.addEventListener("resize", handleResize);
        console.log("Initial viewport:", viewPort); 

        return () => window.removeEventListener("resize", handleResize);
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
                    <img id={viewPort} key = {url} className = {styles.img} src={url} alt={`Gallery image}`} />
                ))}
            </div>
        </>
    );
}