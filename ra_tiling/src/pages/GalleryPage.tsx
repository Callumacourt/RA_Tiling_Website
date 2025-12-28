import { useEffect, useMemo, useState } from "react";
import fetchGallery from "../utils/fetchGallery";
import styles from './css/GalleryPage.module.css';
import { getWindowWidth } from "../utils/getViewportDimension";

export default function GalleryPage() {
    const [images, setImages] = useState<string[]>([]);
    const [viewPort, setViewport] = useState(getWindowWidth());


    const getCategories = (imgs: string[]) => {
        const groups : Record<"Patios" | "Bathrooms" | "Kitchens", string[]> = {
            Patios: [], 
            Bathrooms: [],
            Kitchens: [] 
        };
        imgs.forEach((img) => {
            const raw = img.match(/Bathrooms|Patios|Kitchens/i)?.[0];
            if (!raw) return;
            const key = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase() as keyof typeof groups;
            if (key in groups) groups[key].push(img);
        });
        return groups;
    };

    const categories = useMemo(() => getCategories(images), [images]);

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
        <main className = {styles.gallery}>
            {Object.entries(categories).map(([category, urls]) => (
                <section className = {styles.category}>
                    <h2>{category}</h2>
                    <div className = {styles.imgContainer}>
                        {urls.map((url) => (<img key={url} src={url} alt={`${category} tile job`}/>))}
                    </div>
                    <button>See more</button>
                </section>
            ))}
        </main>
    );
}