export interface GalleryItem {
  id: number;
  num: string;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    num: "01",
    tag: "BESPOKE ISLAND",
    title: "The Aldgate",
    subtitle: "BOOK-MATCHED RED MARBLE & WARM SAND",
    image: "/assets/gallery/5.jpg",
    alt: "The Aldgate bespoke kitchen with book-matched red marble",
  },
  {
    id: 2,
    num: "02",
    tag: "ARCHITECTURAL JOINERY",
    title: "The Petersham",
    subtitle: "FLUTED OAK, MARBLE & SUSPENDED BRASS",
    image: "/assets/gallery/7.jpg",
    alt: "The Petersham kitchen with fluted oak and suspended brass",
  },
  {
    id: 3,
    num: "03",
    tag: "WINE CELLAR & BAR",
    title: "The Kew",
    subtitle: "ILLUMINATED WINE VAULT & DOUBLE NERO ISLAND",
    image: "/assets/gallery/2.jpg",
    alt: "The Kew kitchen with illuminated wine vault and double nero island",
  },
  {
    id: 4,
    num: "04",
    tag: "WATERFALL STONE",
    title: "The Barnes",
    subtitle: "MONOLITHIC ROSSO QUARTZITE & FLUTED WALNUT",
    image: "/assets/gallery/6.jpg",
    alt: "The Barnes kitchen with monolithic rosso quartzite and fluted walnut",
  },
  {
    id: 5,
    num: "05",
    tag: "HERITAGE SHAKER",
    title: "The Surrey Estate",
    subtitle: "HAND-SPRAYED OLIVE SHAKER & BRASS CANOPY",
    image: "/assets/gallery/4.jpg",
    alt: "The Surrey Estate heritage joinery kitchen",
  },
  {
    id: 6,
    num: "06",
    tag: "MINIMALIST RETREAT",
    title: "The Chelsea",
    subtitle: "CHARCOAL MINIMALISM & POLISHED CARRARA COOL",
    image: "/assets/gallery/3.jpg",
    alt: "The Chelsea minimalist charcoal and stone kitchen",
  },
  {
    id: 7,
    num: "07",
    tag: "FLUTED STATEMENT",
    title: "The Richmond",
    subtitle: "FLUTED WALNUT CABINETRY & RAW QUARTZITE",
    image: "/assets/gallery/1.jpg",
    alt: "The Richmond fluted walnut cabinetry kitchen",
  },
  {
    id: 8,
    num: "08",
    tag: "GLAZED PANTRY",
    title: "The Fulham",
    subtitle: "GLAZED DISPLAY CABINETRY & INTEGRATED PANTRY",
    image: "/assets/gallery/8.jpg",
    alt: "The Fulham glazed cabinetry and pantry",
  },
  {
    id: 9,
    num: "09",
    tag: "OPEN-PLAN ARCHITECTURE",
    title: "The Putney",
    subtitle: "OPEN-PLAN ARCHITECTURE & WALL-TO-WALL QUARTZ",
    image: "/assets/gallery/9.jpg",
    alt: "The Putney open-plan quartz kitchen",
  },
  {
    id: 10,
    num: "10",
    tag: "SCULPTED SILHOUETTE",
    title: "The Wimbledon",
    subtitle: "SCULPTED ISLAND SILHOUETTE & FLUTED GLASS",
    image: "/assets/gallery/10.jpg",
    alt: "The Wimbledon sculpted silhouette kitchen",
  },
  {
    id: 11,
    num: "11",
    tag: "WARM MASONRY",
    title: "The Kingston",
    subtitle: "WARM STONE & MONOLITHIC BREAKFAST BAR AXIS",
    image: "/assets/gallery/11.jpg",
    alt: "The Kingston warm stone breakfast bar kitchen",
  },
  {
    id: 12,
    num: "12",
    tag: "DUAL-TONE FORM",
    title: "The Twickenham",
    subtitle: "DUAL-TONE SHAKER JOINERY & SOLID BRASS TAPS",
    image: "/assets/gallery/12.jpg",
    alt: "The Twickenham dual-tone shaker kitchen",
  },
  {
    id: 13,
    num: "13",
    tag: "HERITAGE HEARTH",
    title: "The Hampton",
    subtitle: "HERITAGE JOINERY & WATER-MILLED MARBLE HEARTH",
    image: "/assets/gallery/13.jpg",
    alt: "The Hampton heritage hearth detail kitchen",
  },
];

export const TRAIL_IMAGES = GALLERY_ITEMS.map((item) => item.image);
