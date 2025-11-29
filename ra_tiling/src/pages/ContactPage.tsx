import ContactForm from "../components/ContactForm/ContactForm";
import styles from "./css/ContactPage.module.css";
export default function ContactPage () {
    return (
        <>
            <div className={styles.formWrapper}>
                <ContactForm/>
            </div>
            <a href="https://wa.me/447926262989">WhatsApp</a>
        </>
    )
}