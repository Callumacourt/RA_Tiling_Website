import styles from "./ExpandedImg.module.css";
import { ExpandedState } from "../../pages/GalleryPage";

interface ExpandedImgProps {
    setExpanded : React.Dispatch<React.SetStateAction<ExpandedState | null>>;
    image: string;
    cat: string;
    images : Array<string>  
}


export default function ExpandedImg ({image, cat, images} : ExpandedImgProps) {
    return (
        <main className = {styles.expandedContainer}>
            <button onClick={() => setExpanded(null)}>X</button>
            <div className = {styles.imgWrapper}>
            <img className = {styles.heroImg} src={image} alt="A job" />
                <button className = {styles.prevBtn}>prev</button>
                <button className = {styles.nextBtn}>next</button>
            </div>
            <div className = {styles.imgNav}>
                {images.filter(img => img != image).map((img) => (
                    <img onClick={() => setExpanded({image : img, cat : cat})} key = {img} src = {img} alt= {`Another ${cat} job`}/>
                ))}
            </div>
        </main>
    )
}