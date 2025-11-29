import styles from "./css/HomePage.module.css";

export default function HomePage() {
    return (
        <>
        <main>
            <div className = {styles.heroContainer}>
                <div className={styles.hero}>
                    <h1>30+ Years Of Tiling Experience,</h1>
                    <h1>30+ Years Of Stonemasonry Experience,</h1>
                    <h2>For when you just want things done <i>right</i>.</h2>
                </div>

                <button>Get A Free Quote</button>
            </div>
        </main>
        <section className = {styles.portfolioOverview}>
            <div>
                <h2>Kitchens</h2>
            </div>
            <div>
                <h2>Bathrooms</h2>
            </div>
            <div>
                <h2>Patios</h2>
            </div>
        </section>
        </>
    )
}