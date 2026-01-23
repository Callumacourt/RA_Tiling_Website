import styles from "./ExpandedCategory.module.css";
import { ExpandedCategoryType, ExpandedState } from "../../pages/GalleryPage";
import { useState } from "react";
import ExpandedImg from "./ExpandedImg";


interface ExpandedCategoryProps {
    cat: string;
    images : Array<string>;  
    setExpandedCategory : React.Dispatch<React.SetStateAction<string | undefined>>;
}



export default function ExpandedCategory ({images, cat, setExpandedCategory} : ExpandedCategoryProps) {
    const [expanded, setExpanded] = useState<ExpandedState | null>(null);
    
    return (
        <>
        {expanded && <ExpandedImg image={expanded.image} cat= {expanded.cat} images={images} setExpanded={setExpanded} />}
        <main className = {styles.expandedContainer}>
            <span className = {styles.categoryHeader}>
                <button onClick={()=>setExpandedCategory(undefined)}>X</button>
            </span>
            <section>
            {
            images.map((img) => (
                <img key={img} src = {img} alt={`${cat} job`} onClick={() => setExpanded({ image: img, cat })} />
            ))}
            </section>
        </main>
        </>
    )
}