import styles from "./TestimoinalCard.module.css"
import star from "../../assets/whitestar.svg";

type Props = {
    name: string;
    review: string;
    stars: number;
    link: string;
    date: string
};

export default function TestimonialCard ({name, review, stars, link, date}: Props) {
    
    return (
        <div className = {styles.card}>

            <h3>{name}</h3>
            <span className= {styles.starContainer}>
                {Array.from({length: stars}, (_, i) => (
                    <img key = {i} src = {star} alt = "star" />
                ))}
            </span>
            <p>{review}</p>
            <span className = {styles.bottomWrapper}>
            <sub className = {styles.date}>{date}</sub>
            <sub className = {styles.link}><a href={link}>Verified review by Checkatrade</a></sub>
            </span>
        </div>
    )
}