import { getPublicEnv } from "./lib/env";
import { DynamicPage, PageId, StaticPage } from "./types";

const { assetsUrl } = getPublicEnv();

const PAGES: StaticPage[] = [
  {
    id: PageId.Login,
    imageSource: "/images/wallpaper.jpg",
    height: 400,
    title: "Jarno Le Conté",
  },
  {
    id: PageId.Shimejis,
    videoSource: assetsUrl + "/shimejis.mp4",
    height: 3000,
    title: "Shimejis",
  },
  {
    id: PageId.Flipperkast,
    videoSource: assetsUrl + "/flipperkast.mp4",
    height: 3000,
    title: "Flipperkast",
  },
  {
    id: PageId.RxMarbles,
    videoSource: assetsUrl + "/rxmarbles.mp4",
    height: 3000,
    title: "Observables",
  },
  {
    id: PageId.AnimeCoach,
    videoSource: assetsUrl + "/anime.coach.mp4",
    height: 3000,
    title: "AI Neural Network",
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
