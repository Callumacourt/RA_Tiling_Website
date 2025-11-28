import { useState, ChangeEvent, FormEvent } from "react";
import Loader from  '../Loader/Loader';
import styles from './ContactForm.module.css';

type FormDetails = {
  fullName: string;
  email: string;
  enquiry: string;
};

type FormErrors = Partial<Record<keyof FormDetails, string>>;

export default function ContactForm() {

  const [formDetails, setFormDetails] = useState<FormDetails>({
    fullName: "",
    email: "",
    enquiry: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFormDetails(prev => ({ ...prev, [name]: value } as FormDetails));
    // clear error on change
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validate = (data: FormDetails): FormErrors => {
    const next: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.fullName.trim()) next.fullName = "Full name is required";
    if (!data.email.trim()) next.email = "Email is required";
    if (!data.enquiry.trim()) next.enquiry = "Enquiry is required";
    if (data.email.trim() && !emailRegex.test(data.email)) next.email = "Invalid email address";
    return next;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(formDetails);
    setErrors(nextErrors);
    
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setSubmitStatus('loading')

      const res = await fetch ('/contactForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDetails),
      })

      if (res.status === 200 && res.ok) {
        setSubmitStatus("Thank you for your enquiry, we'll be in touch soon.")
      }

    } catch (error) {
      setSubmitStatus('There was an unexpected error. Try again or contact us at...')
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className={styles.formGroup}>
        <label htmlFor="fullName">Full name</label>
        <input
          id="fullName"
          name="fullName"
          value={formDetails.fullName}
          onChange={handleChange}
        />
        <span className = {errors.fullName ? styles.active : styles.hidden}>{errors.fullName || ""}</span>
    </div>
    <div className = {styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formDetails.email}
          onChange={handleChange}
        />
        <span className = {errors.email ? styles.active : styles.hidden}>{errors.email || ""}</span>
    </div>
    <div className = {styles.formGroup}>
      <label htmlFor="enquiry"> Enquiry</label>
        <textarea
          id="enquiry"
          name="enquiry"
          value={formDetails.enquiry}
          onChange={handleChange}
        />
       <span className = {errors.enquiry ? styles.active : styles.hidden}>{errors.enquiry || ""}</span>
      </div>
        
        <div className = {styles.formGroup}>
        <button className = {styles.submitBtn} type="submit">{submitStatus === 'loading' ?  <Loader/> : 'Send'}</button>
        {submitStatus === "Thank you for your enquiry, we'll be in touch soon." && <span>{submitStatus}</span>}
      </div>
    </form>
  );
}