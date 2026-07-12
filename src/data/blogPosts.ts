import outreach1 from "@/assets/blog/outreach-1.jpeg";
import accraGirls from "@/assets/blog/accra-girls.jpg";
import mentalHealth from "@/assets/blog/mental-health.png";
import surgeonPreparing from "@/assets/keta-outreach/surgeon-preparing.jpg";
import ajumakoHero from "@/assets/blog/ajumako-hero.jpg";
import safeSchoolHero from "@/assets/blog/safe-school-hero.jpg";
import podoeHero from "@/assets/blog/podoe-hero.jpg";
import temaFlyer from "@/assets/blog/tema-outreach-flyer.jpeg.asset.json";

export interface BlogPost {
  slug: string;
  image: string;
  date: string;
  author: string;
  category: string;
  title: string;
  excerpt: string;
  featured: boolean;
  hasArticle?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "free-medical-outreach-tema-naval-base",
    image: temaFlyer.url,
    date: "Jul 12, 2026",
    author: "Viva Health Media",
    category: "Outreach",
    title: "Free Medical Outreach for Tema Community at Tema Naval Base",
    excerpt:
      "Viva Health Medical Foundation, in partnership with the Eastern Naval Command and the Tema Youth Association, announces a Free Medical Outreach for the Tema community on 25th July 2026 at the Tema Naval Base, Junior Rates Mess.",
    featured: true,
    hasArticle: true,
  },
  {
    slug: "podoe-community-health-outreach",
    image: podoeHero,
    date: "Apr 3, 2026",
    author: "Viva Health Media",
    category: "Outreach",
    title: "Podoe Community Benefits from Viva Health Medical Foundation Outreach",
    excerpt:
      "Viva Health Medical Foundation successfully conducted a community health outreach in Podoe, delivering free services across multiple health sectors to 514 individuals over an intensive 14-hour period.",
    featured: false,
    hasArticle: true,
  },
  {
    slug: "ajumako-world-oral-health-day-outreach",
    image: ajumakoHero,
    date: "Mar 21, 2026",
    author: "Viva Health Media",
    category: "Outreach",
    title: "Ajumako Community Benefits from Major World Oral Health Day Outreach",
    excerpt:
      "In a decisive step toward addressing Ghana's growing oral health challenges, the Viva Health Medical Foundation conducted a large-scale medical outreach in Ajumako to mark World Oral Health Day, delivering critical dental care and health education to hundreds of residents.",
    featured: false,
    hasArticle: true,
  },
  {
    slug: "safe-school-project-bullying-cyberbullying",
    image: safeSchoolHero,
    date: "Mar 18, 2026",
    author: "Viva Health Media",
    category: "Health Tips",
    title: "Building Safer Schools: Viva Health Leads Conversations on Bullying and Cyberbullying",
    excerpt:
      "Viva Health Medical Foundation conducted impactful visits to two schools as part of its Safe School Project, addressing bullying and cyberbullying among young people through interactive sessions with psychologists.",
    featured: false,
    hasArticle: true,
  },
  {
    slug: "outreach-pupuni-tortibo",
    image: outreach1,
    date: "Oct 14, 2024",
    author: "James",
    category: "Outreach",
    title: "Vivahealth Medical Foundation embarks on another outreach at Pupuni and Tortibo",
    excerpt:
      "Our team traveled to the rural communities of Pupuni and Tortibo to provide free medical screenings and health education to over 300 residents.",
    featured: false,
  },
  {
    slug: "world-menstrual-hygiene-day-accra-girls",
    image: accraGirls,
    date: "May 28, 2024",
    author: "Sarah",
    category: "Outreach",
    title: "Celebrating World Menstrual Hygiene Day at Accra Girls SHS",
    excerpt:
      "A special outreach dedicated to menstrual health education and providing sanitary supplies to students.",
    featured: false,
  },
  {
    slug: "mental-health-awareness-oreilly-shs",
    image: mentalHealth,
    date: "Oct 10, 2024",
    author: "Dr. Mensah",
    category: "Health Tips",
    title: "Mental Health Awareness Month outreach at O'Reilly SHS",
    excerpt:
      "Breaking the stigma around mental health through education and open conversations with students.",
    featured: false,
  },
  {
    slug: "keta-surgical-outreach-preparation",
    image: surgeonPreparing,
    date: "Nov 15, 2024",
    author: "Viva Health Team",
    category: "Stories",
    title: "Behind the Scenes: Preparing for the Keta Surgical Outreach",
    excerpt:
      "A look at the meticulous preparation that goes into organizing a successful surgical mission.",
    featured: false,
  },
];
