import styles from "./ExpandedCategory.module.css";
import { ExpandedCategoryType } from "../../pages/GalleryPage";


interface ExpandedCategoryProps {
    cat: string;
    images : Array<string>;  
    setExpandedCategory : React.Dispatch<React.SetStateAction< ExpandedCategoryType | undefined>>;
}



export default function ExpandedCategory ({images, cat, setExpandedCategory} : ExpandedCategoryProps) {
    return (
        <main className = {styles.expandedContainer}>
            <span className = {styles.categoryHeader}>
                <h3>{cat}</h3>
                <button onClick={()=>setExpandedCategory(undefined)}>X</button>
            </span>
            <section>
            {images.map((img) => (
                <img key={img} src = {img}/>
            ))}
            </section>
        </main>
    )
}