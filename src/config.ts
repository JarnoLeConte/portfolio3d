import { DynamicPage, PageId, StaticPage } from "./types";

const PAGES: StaticPage[] = [
  {
    id: PageId.Login,
    imageSource: "/images/wallpaper.jpg",
    height: 600,
    title: "",
    description: "",
  },
  {
    id: PageId.Shimejis,
    videoSource: "/videos/shimejis.mp4",
    height: 2000,
    title: "Shimeji Browser Extension",
    description: "Playful little characters interact with your web browser",
  },
  {
    id: PageId.Pinball,
    videoSource: "/videos/pinball.mp4",
    height: 2500,
    title: "Pinball Game",
    description: "Add-on for sjoet.xyz",
  },
  {
    id: PageId.RxMarbles,
    videoSource: "/videos/rxmarbles.mp4",
    height: 2000,
    title: "RxMarbles",
    description: "Real-time visualisation of reactive programming concepts",
  },
  {
    id: PageId.AnimeCoach,
    videoSource: "/videos/animecoach.mp4",
    height: 3000,
    title: "Anime AI",
    description: "Neural Network built & trained for Anime recommendations",
  },
  {
    id: PageId.Sjoet,
    videoSource: "/videos/sjoet.mp4",
    height: 4000,
    title: "Sjoet.xyz",
    description: "Website built for children's casting shoots",
  },
  {
    id: PageId.LightProjection,
    videoSource: "/videos/lightprojection.mp4",
    height: 4000,
    title: "Video & Light",
    description:
      "WebRTC video projection mapping and light control using TouchDesigner",
  },
  {
    id: PageId.StreamDeck,
    imageSource: "/images/streamdeck.png",
    height: 1000,
    title: "Stream Deck",
    description: "Plug-ins for Elgato Stream Deck developed in Swift",
  },
  {
    id: PageId.GallerTv,
    imageSource: "/images/gallerytv.png",
    height: 1000,
    title: "Gallery TV",
    description: "Remotely set wallpaper on TV screen using Raspberry Pi",
  },
];

const createDynamicPages = (pages: StaticPage[]): DynamicPage[] => {
  let top = 0;

  return pages.map((page, index) => {
    const bottom = top + page.height;

    const dynamicPage: DynamicPage = {
      ...page,
      top,
      bottom,
      index,
    };

    top += page.height;

    return dynamicPage;
  });
};

export const pages = createDynamicPages(PAGES);
