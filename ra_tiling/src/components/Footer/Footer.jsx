import styles from "./Footer.module.css";
import whatsapp from "../../assets/icons/whatsappIcn.png"
import instagram from "../../assets/icons/instagram.svg"

export default function Footer () {
    return (
        <footer className = {styles.footer}>
            <div className = {styles.main}>
                <p>© 2025 Ra Tiling & Stonemasonry</p>
                <sub>The expertise for your dream home</sub>
            </div>
            <ul className = {styles.links}>
                <p>Useful Links</p>
                <li>Home</li>
                <li>Gallery</li>
                <li>Tiles</li>
                <li>Contact</li>
            </ul>
            <span className = {styles.socials}>
                <a href="https://wa.me/447926262989"><img src={whatsapp} alt="Whatsapp Link" /></a>
                <a href= ""><img src={instagram} alt="Instagram Link" /></a>
            </span>
        </footer>
    )
}