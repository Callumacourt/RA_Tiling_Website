import { Link } from "react-router";
import styles from './header.module.css';
import dropDownIcn from "../../assets/dropdownIcn.svg";
import { useEffect, useState } from "react";
import MobileDropdown from "./MobileDropdown";

export default function Header () {

    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [isExpanded]);

    return (
        <>
        {isExpanded && (<MobileDropdown expanded={isExpanded} setIsExpanded={setIsExpanded} />)}
        <header className = {styles.header}>
            <nav>
                <button onClick={() => setIsExpanded(true)} className = {styles.mobileDropdown}><img src={dropDownIcn} alt="Open" /></button>
                <ul className = {styles.desktopNav}>
                    <li><Link to = "/gallery">Gallery</Link></li>
                    <li><Link to = "/tiles">Tiles</Link></li>
                    <li><Link to = "/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
        </>
    ) 
}