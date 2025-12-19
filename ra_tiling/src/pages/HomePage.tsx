import TestimonialCard from "../components/TestimonialCard/TestimonialCard";
import { testimonials } from "../data/testimonials";
import { services } from "../data/services";
import styles from "./css/HomePage.module.css";
import { useRef, useState } from 'react';
import ServiceHero from "../components/ServiceHero/ServiceHero";

export default function HomePage() {
    const scrollRef = useRef(null);
    const [scrollPercent, setScrollPercent] = useState(0);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const percent = (scrollLeft / (scrollWidth - clientWidth)) * 100;
            setScrollPercent(percent);
        }
    };

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
            <h2>What Can I Help You With?</h2>
            {services.map(s => (
                <ServiceHero key={s.id} title={s.title} images={s.images} line = {s.line} />
            ))}
        </section>
        <section className = {styles.testimonials}>
            <h2>What Our Clients Say</h2>
            <h3>Testimonials</h3>
            <div className={styles.cardScroll} ref={scrollRef} onScroll={handleScroll}>
                <div className={styles.cardContainer}>
                    {testimonials.map(t => (
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
                </div>
            </div>
            <div className={styles.scrollIndicator} style={{
                background: `linear-gradient(to right, #333 0%, #333 ${scrollPercent}%, #e0e0e0 ${scrollPercent}%, #e0e0e0 100%)`
            }} />
            <sub className={styles.smallLink}><a href="https://www.checkatrade.com/trades/ratilingandstonemasonary/reviews">See more reviews</a></sub>
            <h2>Who Are RA Tiling?</h2>
            <p>I have been tiling for over 30 years. I take great pride in my work and have been lucky enough to work on major commercial projects such as 
                Stanley Hall, The Tower of London and XYZ. No job is too small and I treat each customer as a friend.
            </p>
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