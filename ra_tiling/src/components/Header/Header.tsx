import { Link } from "react-router";
import styles from './header.module.css';

export default function Header () {
    return (
        <header className = {styles.header}>
            <nav>
                <li><Link to = "/">Ra Tiling</Link></li>
                <ul>
                    <li><Link to = "/gallery">Gallery</Link></li>
                    <li><Link to = "/about">About Us</Link></li>
                    <li><Link to = "/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    ) 
}