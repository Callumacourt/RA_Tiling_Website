import { Link } from "react-router";
import styles from "./MobileDropdown.module.css";

export default function MobileDropdown ({expanded, setIsExpanded}) {

    return (
        <>
        {expanded && 
            <div className={styles.dropDownContainer}>
                <button onClick={() => setIsExpanded(false)}>X</button>
                <nav>
                    <ul>
                        <li><Link>Gallery</Link></li>
                        <li><Link>Tiles</Link></li>
                        <li><Link>About Us</Link></li>
                        <li><Link>Contact</Link></li>
                    </ul>
                </nav>
            </div>
        }
        </>
    )
}