// src/data/article-content.js
import historyAppleImg from "./assets/images/historyapple.webp";
import appleStrategyImg from "./assets/images/applestrategy.jpg";
import iconicProductImg from "./assets/images/iconicproduct.png";
import steveJobsImg from "./assets/images/steve_jobs.jpeg";

const articles = [
  {
    id: 1,
    title: "Steve Jobs and the Birth of Apple",
    excerpt: "How one visionary changed the tech industry forever",
    image: steveJobsImg,
    name: "steve-jobs",
    content: [
      "In 1976, Steve Jobs co-founded Apple Computer with Steve Wozniak in the Jobs family garage. With an initial investment of $1,300, they began building the Apple I computer by hand.",

      "Jobs' vision for personal computing went beyond functionality - he believed technology should be beautifully designed and intuitive to use. This philosophy led to groundbreaking products like the Macintosh in 1984, which introduced the graphical user interface to mainstream consumers.",

      "After being ousted from Apple in 1985, Jobs returned in 1997 to rescue the struggling company. He streamlined product lines and introduced a series of revolutionary devices including the iMac (1998), iPod (2001), iPhone (2007), and iPad (2010) that redefined entire industries.",

      "Jobs' attention to detail was legendary. He obsessed over every aspect of product design, from the curve of corners to the feel of packaging. This commitment to excellence created Apple's reputation for premium, user-friendly devices.",
    ],
  },
  {
    id: 2,
    title: "The History of Apple Inc.",
    excerpt: "From garage startup to the world's first trillion-dollar company",
    image: historyAppleImg,
    name: "apple-history",
    content: [
      "April 1, 1976: Apple Computer is founded by Jobs, Wozniak, and Ronald Wayne, who sold his 10% stake for $800 just 12 days later. That stake would be worth over $300 billion today.",

      "The 1977 Apple II became the first mass-produced computer with color graphics. Its success funded the 1984 Macintosh development, which introduced the mouse and graphical interface to mainstream users.",

      "The 1990s nearly destroyed Apple. A succession of failed products (Newton, Pippin gaming console) and leadership changes led to $1.8 billion in losses. Microsoft's $150 million investment in 1997 kept Apple afloat.",

      "The 2000s saw Apple's resurgence: Retail stores opened in 2001 with the 'glass staircases' that cost $1 million each to engineer. The iTunes Store (2003) revolutionized music distribution, selling 1 million songs in its first week.",

      "Today, Apple designs its own silicon chips, with the M1 Ultra containing 114 billion transistors. The company now operates 518 retail stores across 25 countries and employs over 165,000 people worldwide.",
    ],
  },
  {
    id: 3,
    title: "Apple's Most Iconic Products",
    excerpt: "Devices that defined generations and transformed industries",
    image: iconicProductImg,
    name: "apple-products",
    content: [
      "1984 Macintosh: The first commercially successful PC with a GUI. Its $3.5 million Super Bowl ad remains one of the most famous commercials ever made. Only 10,000 units sold in the first 100 days.",

      "2001 iPod: The scroll wheel was inspired by Bang & Olufsen phones. The iconic silhouette ads featured 11,000 songs from 1,300 artists. Over 450 million iPods were sold before discontinuation in 2022.",

      "2007 iPhone: Developed under extreme secrecy as Project Purple. The first model lacked copy/paste and 3G. Today's iPhone 15 Pro contains over 100x more processing power than the original.",

      "2010 iPad: Jobs insisted it should launch at $499 when engineers suggested $999. The first million units sold in 28 days. The iPad popularized the 'tablet' form factor globally.",

      "2014 Apple Watch: The Digital Crown solved the problem of navigating small screens. The $17,000 gold Edition model sold out immediately. Now the world's best-selling watch, surpassing Rolex and Omega.",

      "2016 AirPods: Initially mocked, they now dominate 60% of the wireless earbud market. The H1 chip enables instant pairing - a feature competitors still can't perfectly replicate.",
    ],
  },
  {
    id: 4,
    title: "Innovation at Apple: Past, Present, and Future",
    excerpt: "How Apple continues pushing boundaries in technology and design",
    image: appleStrategyImg,
    name: "apple-innovation",
    content: [
      "Past Milestones:",
      "- 1983: Lisa computer introduced the first commercial GUI",
      "- 2006: Intel transition marked Apple's processor independence",
      "- 2008: App Store launched with 500 apps (now over 1.8 million)",
      "- 2013: 64-bit A7 chip made desktop-class mobile processing mainstream",

      "Current Breakthroughs:",
      "- M-series chips outperform Intel processors while using less power",
      "- Unified Memory Architecture allows GPU/CPU memory sharing",
      "- Ceramic Shield glass is more durable than any smartphone glass",
      "- Computational photography enables pro-quality shots from iPhone cameras",

      "Future Horizons:",
      "- Apple Car Project Titan (estimated 2026 launch)",
      "- AR Glasses with micro-OLED displays (development since 2015)",
      "- Non-invasive glucose monitoring for Apple Watch",
      "- Home robotics research (mobile manipulators for household tasks)",
      "- AI-powered Siri overhaul using large language models",

      "Apple spends $27 billion annually on R&D - more than NASA's entire budget. Their innovation process involves '10 to 3 to 1' - designers create 10 concepts, narrow to 3, then develop 1 final product.",
    ],
  },
];

export default articles;
