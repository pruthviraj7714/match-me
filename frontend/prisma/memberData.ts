export type Member = {
  name: string;
  username: string;
  bio: string;
  country: string;
  gender: "MALE" | "FEMALE";
  password: string;
  image: string;
  dateOfBirth: string;
  interests: string[];
};

const MEMBERS_DATA: Member[] = [
  {
    name: "Alice Johnson",
    username: "alicej123",
    bio: "Adventure seeker, coffee enthusiast, and amateur photographer.",
    country: "United States",
    gender: "FEMALE",
    image:
      "https://i.pinimg.com/736x/dd/94/8b/dd948bfe44f7064eab2e5f5c2228e4e2.jpg",
    password: "password123",
    interests: ["Travel", "Photography", "Reading"],
    dateOfBirth: "2004-05-21",
  },
  {
    name: "Michael Smith",
    username: "mike_smith",
    bio: "Tech geek, gamer, and foodie. Always up for a good conversation.",
    country: "Canada",
    gender: "MALE",
    image:
      "https://i.pinimg.com/736x/8b/7c/dd/8b7cdd899d2e0f716967e71d2453931d.jpg",
    password: "securePass123",
    interests: ["Movies"],
    dateOfBirth: "2013-05-21",
  },
  {
    name: "Sophia Williams",
    username: "sophiaw",
    bio: "Dog mom, nature lover, and yoga enthusiast. Let's connect!",
    country: "Australia",
    gender: "FEMALE",
    image:
      "https://i.pinimg.com/736x/31/80/f5/3180f5646fe6326a0578a4c51bdf9525.jpg",
    password: "yogaLife456",
    interests: ["Yoga"],
    dateOfBirth: "2002-05-21",
  },
  {
    name: "David Brown",
    username: "david_b",
    bio: "Fitness coach by day, musician by night. Life is better with music!",
    country: "United Kingdom",
    gender: "MALE",
    image:
      "https://i.pinimg.com/736x/bf/dd/3c/bfdd3ce8b53717e0d94cd8c0f6a3f5e7.jpg",
    password: "fitMusic789",
    interests: ["Music", "Travel"],
    dateOfBirth: "2001-05-21",
  },
  {
    name: "Emily Davis",
    username: "emilyd",
    bio: "Bookworm and coffee lover. Let's talk about your favorite novels.",
    country: "New Zealand",
    gender: "FEMALE",
    image:
      "https://i.pinimg.com/736x/86/26/2e/86262e352799de4525021a5482309e7c.jpg",
    password: "bookLover123",
    interests: ["Reading"],
    dateOfBirth: "2013-05-21",
  },
  {
    name: "James Wilson",
    username: "jamesw",
    bio: "Cycling enthusiast and aspiring chef. Love exploring new cuisines.",
    country: "Germany",
    gender: "MALE",
    image:
      "https://i.pinimg.com/736x/6b/31/54/6b3154b98a957d28e37d9a60a48bb52a.jpg",
    password: "chefCycle456",
    interests: ["Photography"],
    dateOfBirth: "2006-05-21",
  },
  {
    name: "Olivia Martinez",
    username: "olivia_m",
    bio: "Artist, traveler, and foodie. Let's create something beautiful!",
    country: "Spain",
    gender: "FEMALE",
    image:
      "https://i.pinimg.com/736x/37/03/19/370319f8b8c20356d7cb02e44210d637.jpg",
    password: "creativeArt789",
    interests: ["Travel"],
    dateOfBirth: "2007-05-21",
  },
  {
    name: "Ethan Taylor",
    username: "ethan_t",
    bio: "Software engineer who loves hiking and playing guitar. Let's vibe!",
    country: "India",
    gender: "MALE",
    image:
      "https://i.pinimg.com/736x/53/83/f7/5383f718c9d8e2a7df793e1abdc0584b.jpg",
    password: "techHike123",
    interests: ["Movies"],
    dateOfBirth: "2000-05-21",
  },
  {
    name: "Amelia Moore",
    username: "amelia_m",
    bio: "Fashion enthusiast and coffee addict. Love deep conversations.",
    country: "Italy",
    gender: "FEMALE",
    image:
      "https://i.pinimg.com/736x/a6/5d/07/a65d07e82479ff022355ff41aa58a877.jpg",
    password: "fashionista456",
    interests: ["Travel"],
    dateOfBirth: "1999-05-21",
  },
  {
    name: "Liam Anderson",
    username: "liam_a",
    bio: "Nature lover, photographer, and occasional poet.",
    country: "Brazil",
    gender: "MALE",
    image:
      "https://i.pinimg.com/736x/fc/ef/30/fcef306368649b257431d9538b1566e2.jpg",
    password: "poetryNature789",
    interests: ["Photography", "Sports"],
    dateOfBirth: "1984-05-21",
  },
];

export default MEMBERS_DATA;
