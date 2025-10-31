import { useState, ChangeEvent, FormEvent } from "react";
import styles from './ContactForm.module.css';

type FormDetails = {
  fullName: string;
  mobile: string;
  enquiry: string;
};

type FormErrors = Partial<Record<keyof FormDetails, string>>;

export default function ContactForm() {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    fullName: "",
    mobile: "",
    enquiry: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFormDetails(prev => ({ ...prev, [name]: value } as FormDetails));
    // clear error on change
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validate = (data: FormDetails): FormErrors => {
    const next: FormErrors = {};
    const ukPhoneRegex = /^(?:\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;

    if (!data.fullName.trim()) next.fullName = "Full name is required";
    if (!data.mobile.trim()) next.mobile = "Mobile is required";
    if (!data.enquiry.trim()) next.enquiry = "Enquiry is required";
    if (data.mobile.trim() && !ukPhoneRegex.test(data.mobile)) next.mobile = "Invalid UK phone number";
    return next;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(formDetails);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    // submit
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
        <label htmlFor="mobile">Mobile</label>
        <input
          id="mobile"
          name="mobile"
          type="tel"
          value={formDetails.mobile}
          onChange={handleChange}
        />
        <span className = {errors.mobile ? styles.active : styles.hidden}>{errors.mobile || ""}</span>
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
        <button className = {styles.submitBtn} type="submit">Send</button>
      </div>
    </form>
  );
}