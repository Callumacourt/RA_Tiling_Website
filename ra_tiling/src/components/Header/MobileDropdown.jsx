import { Link } from "react-router";
import styles from "./MobileDropdown.module.css";

export default function MobileDropdown ({expanded, setIsExpanded}) {

    const closePage = () => {
        setIsExpanded(false);
    }

    return (
        <>
        {expanded && 
            <div className={styles.dropDownContainer}>
                <button onClick={closePage}>X</button>
                <nav>
                    <ul>
                        <li onClick={closePage}><Link to="/">Home</Link></li>
                        <li onClick={closePage}><Link to="/gallery">Gallery</Link></li>
                        <li onClick={closePage}><Link to="/tiles">Tiles</Link></li>
                        <li onClick={closePage}><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </div>
        }
        </>
    )
}