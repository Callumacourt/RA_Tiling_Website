import styles from "./Footer.module.css";
import whatsapp from "../../assets/icons/whatsapp_3670025.png"
import instagram from "../../assets/icons/instagram.svg"
import logo from "../../assets/icons/logo.png"

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
                <img src={whatsapp} alt="Whatsapp Link" />
                <img src={instagram} alt="Instagram Link" />
            </span>
        </footer>
    )
}