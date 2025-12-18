export type Testimonial = {
  id: string;
  name: string;
  review: string;
  stars: number;
  link: string;
  dateISO: string; 
};

export const testimonials: Testimonial[] = [
  {
    id: "steve-2025-12-15",
    name: "Steve",
    review: `I’ve known Ricky of RA tiling and Stonemasonary for over a year , he has done the tiling for my kitchen, Bathroom and toilet in the past. I’ve grown to consider Ricky a friend and I would not trust anyone else to do this particular work. He is friendly, down to earth, reliable and Punctual, always showing up Ricky has tiled my driveway, something which he has not done before but he has done an exceptional spectacular job and I’m very pleased with the end result. What a fantastic result! The job was completed quickly and to a high standard. He truly is worth his weight in gold.`,
    stars: 5,
    link: "https://www.checkatrade.com/trades/ratilingandstonemasonary/reviews",
    dateISO: "2025-12-15",
  },
];