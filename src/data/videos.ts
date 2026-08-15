export interface VideoItem {
  id: string;
  title: string;
  date: string;
  category: "Outreach" | "Keta Surgeries" | "Volunteers" | "Foundation";
}

export const CHANNEL_URL = "https://www.youtube.com/@vivahealthmedicalfoundation";

// Ordered newest first
export const videos: VideoItem[] = [
  {
    id: "uLxvfDXVulI",
    title:
      "VivaHealth x Eastern Naval Command x Tema Youth Association — Tema New Town Health Outreach 2026",
    date: "August 2026",
    category: "Outreach",
  },
  {
    id: "fBJBpygMlKA",
    title: "Reflections from the Co-Founder of VivaHealth, Dr Carl",
    date: "July 2026",
    category: "Foundation",
  },
  {
    id: "7ZVZPHkzMHg",
    title: "Thank You Keta Communities",
    date: "December 2025",
    category: "Keta Surgeries",
  },
  {
    id: "8crjB7Ka1Fw",
    title: "Fun Studio Session with KobbiBlaq",
    date: "December 2025",
    category: "Foundation",
  },
  {
    id: "qcE_-ki6MS0",
    title: "Thank You Keta Communities — Keta Surgeries",
    date: "December 2025",
    category: "Keta Surgeries",
  },
  {
    id: "S97V3Q3TuM8",
    title: "Keta Surgeries at Keta Municipal Hospital",
    date: "December 2025",
    category: "Keta Surgeries",
  },
  {
    id: "AC4rEv5Ac_Q",
    title: "Keta Surgeries at Keta Municipal Hospital — Part 2",
    date: "December 2025",
    category: "Keta Surgeries",
  },
  {
    id: "qL-CfHD306k",
    title: "Keta Surgeries — Appreciation",
    date: "December 2025",
    category: "Keta Surgeries",
  },
  {
    id: "7eJ6Xdach60",
    title: "Keta Surgeries — Appreciation from the Community",
    date: "December 2025",
    category: "Keta Surgeries",
  },
  {
    id: "S9aKPli9fok",
    title: "Keta Surgeries with Major Randy Tawiah",
    date: "December 2025",
    category: "Keta Surgeries",
  },
  {
    id: "t4pbxjoUK3c",
    title: "Free Surgeries, Free Care, Real Impact — VivaHealth Reaches Tegbi & Keta",
    date: "October 2025",
    category: "Keta Surgeries",
  },
  {
    id: "bwEGa8t1l80",
    title: "Why We Serve: Volunteers Share Their Powerful Stories",
    date: "May 2025",
    category: "Volunteers",
  },
  {
    id: "tPrK-f9iXEk",
    title: "Outreach in Hatorgodo, Volta Region — 20th July 2024",
    date: "September 2024",
    category: "Outreach",
  },
  {
    id: "ic-RDXuUa5M",
    title: "Outreach to Akrade in the Eastern Region of Ghana",
    date: "September 2024",
    category: "Outreach",
  },
  {
    id: "-MEexAkiM54",
    title: "Outreach to Podoe Near Juapong",
    date: "September 2024",
    category: "Outreach",
  },
];

export const videoCategories = [
  "All",
  "Outreach",
  "Keta Surgeries",
  "Volunteers",
  "Foundation",
] as const;

export const thumbnailUrl = (id: string) =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
