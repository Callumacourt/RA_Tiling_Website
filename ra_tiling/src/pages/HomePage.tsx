import TestimonialCard from "../components/TestimonialCard/TestimonialCard";
import { testimonials } from "../data/testimonials";
import styles from "./css/HomePage.module.css";

export default function HomePage() {
    return (
        <>
        <main>
            <div className={styles.heroContainer}>
                <div className={styles.hero}>
                    <h1>30+ Years Of Tiling Experience,</h1>
                    <h1>30+ Years Of Stonemasonry Experience,</h1>
                    <h2>For when you just want things done <i>right</i>.</h2>
                </div>

                <button>Get A Free Quote</button>
            </div>
        </main>
        <section className={styles.services}>
            <h3>What Can I Help You With?</h3>
            <ul>
                <li>Floor Tiling</li>
                <li>Wall Tiling</li>
                <li>Mosaics</li>
            </ul>
        </section>
        <section className = {styles.projects}>
            <h2>Recent Projects</h2>
        </section>
        <section className = {styles.testimonials}>
            <h2>What Our Clients Say</h2>
            <h3>Testimonials</h3>
            {testimonials.map (t => (
                <TestimonialCard 
                    key={t.id}
                    name={t.name}
                    review={t.review}
                    stars = {t.stars}
                    link = {t.link}
                    date = {new Date(t.dateISO).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                />
            ))}
            <h2>Who Are RA Tiling?</h2>
        </section>
        <section className = {styles.affiliate}>
            <h3>Tile Supply</h3>
            <p>I partner with Mayfield Porcelain and can facilitate the supply of their premium tiles at competitive prices.</p>
            <button><a href="https://mayfieldporcelain.co.uk/">Browse Tiles</a></button>
        </section>
        <section className = {styles.cta}>
            <h2>Ready to Start Your Project?</h2>
            <button>Get a Free Quote</button>
        </section>
        </>
    )
}