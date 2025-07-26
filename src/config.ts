import { getPublicEnv } from "./lib/env";
import { DynamicPage, PageId, StaticPage } from "./types";

const { assetsUrl } = getPublicEnv();

const PAGES: StaticPage[] = [
  {
    id: PageId.Login,
    imageSource: "/images/wallpaper.jpg",
    height: 600,
    title: "Jarno Le Conté",
    description: "Creative (Web) Application Developer",
  },
  {
    id: PageId.Shimejis,
    videoSource: assetsUrl + "/shimejis.mp4",
    height: 3000,
    title: "Shimeji Browser Extension",
    description: "Playful characters interact with your browser",
  },
  {
    id: PageId.Pinball,
    videoSource: assetsUrl + "/pinball.mp4",
    height: 3000,
    title: "Pinball Game",
    description: "Created for website Sjoet.xyz",
  },
  {
    id: PageId.RxMarbles,
    videoSource: assetsUrl + "/rxmarbles.mp4",
    height: 3000,
    title: "RxMarbles",
    description: "Visualisation of RxJS Observables",
  },
  {
    id: PageId.AnimeCoach,
    videoSource: assetsUrl + "/animecoach.mp4",
    height: 3000,
    title: "Anime Coach",
    description: "AI Neural Network built & trained for Anime recommendations",
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
