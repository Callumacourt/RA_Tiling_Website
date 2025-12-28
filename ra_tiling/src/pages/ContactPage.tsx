import ContactForm from "../components/ContactForm/ContactForm";
import styles from "./css/ContactPage.module.css";
export default function ContactPage () {
    return (
        <main className = {styles.contentWrapper}>
            <div className={styles.formWrapper}>
                <ContactForm/>
            </div>
        </main>
    )
}