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
    id: "steve-2025-15-12",
    name: "Steve",
    review: `I’ve known Ricky of RA tiling and Stonemasonary for over a year , he has done the tiling for my kitchen, Bathroom and toilet in the past. I’ve grown to consider Ricky a friend and I would not trust anyone else to do this particular work. He is friendly, down to earth, reliable and Punctual, always showing up Ricky has tiled my driveway, something which he has not done before but he has done an exceptional spectacular job and I’m very pleased with the end result. What a fantastic result! The job was completed quickly and to a high standard. He truly is worth his weight in gold.`,
    stars: 5,
    link: "https://www.checkatrade.com/trades/ratilingandstonemasonary/reviews",
    dateISO: "2025-12-15",
  },
  {
    id: "adam-2025-08-05",
    name: "Adam",
    review: `Ricki recently completed floor and wall tiles for our bathroom refurb. We are extremely happy with the finished results and have had lots of comments from friends saying how the bathroom looks like it’s from a magazine. Communication was very good, and Ricki made sure he talked through different options of tile lay outs that he thinks would work well, as well as helping get the choice of grout colour correct`,
    stars: 5,
    link: "https://www.checkatrade.com/trades/ratilingandstonemasonary/reviews",
    dateISO: "2025-08-05",
  },
  {
    id: "kevin-2025-03-04",
    name: "Kevin",
    review: `Ricki Acourt is very professional, reliable and trustworthy and was great to work with. He is very knowledgeable about potential issues and got it fixed very quickly . He was always on time and finished the job when he promised to. By far , Ricki is the best tradesperson I’ve ever encountered, in fact , he’s now a friend . He is very patient , meticulous and excellent with his work , if I can give him an eleven out 10 , he would deserve this , and I would highly recommend his work , it’s top notch , he always has time to answer my questions/issues I would definitely use him again. Genius !!`,
    stars: 5,
    link: "https://www.checkatrade.com/trades/ratilingandstonemasonary/reviews",
    dateISO: "2025-03-04",
  }
];