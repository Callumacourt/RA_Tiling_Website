import styles from "./TestimoinalCard.module.css";

type Props = {
    name: string;
    review: string;
    stars: number; // 0–5
    link: string;
    date: string;
};

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={styles.star}
      viewBox="0 0 24 24"
      fill={filled ? "#fff" : "transparent"}
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  );
}

export default function TestimonialCard({ name, review, stars, link, date }: Props) {
  const clampedStars = Math.max(0, Math.min(5, stars));

  return (
    <div className={styles.card}>
      <h3>{name}</h3>

      <span
        className={styles.starContainer}
        role="img"
        aria-label={`${clampedStars} out of 5 stars`}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} filled={i < clampedStars} />
        ))}
      </span>

      <p>{review}</p>

      <span className={styles.bottomWrapper}>
        <sub className={styles.date}>{date}</sub>
        <sub className={styles.link}>
          <a href={link}>Verified review by Checkatrade</a>
        </sub>
      </span>
    </div>
  );
}