import { getPublicEnv } from "./lib/env";
import { DynamicPage, PageId, StaticPage } from "./types";

const { assetsUrl } = getPublicEnv();

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
    videoSource: assetsUrl + "/shimejis.mp4",
    height: 3000,
    title: "Shimeji Browser Extension",
    description:
      "Characters interact with the browser, installed by 6M users worldwide.",
  },
  {
    id: PageId.Pinball,
    videoSource: assetsUrl + "/pinball.mp4",
    height: 3000,
    title: "Pinball Game",
    description: "Add-on for website sjoet.xyz",
  },
  {
    id: PageId.RxMarbles,
    videoSource: assetsUrl + "/rxmarbles.mp4",
    height: 2000,
    title: "RxMarbles",
    description: "Real-time visualisation of reactive programming concepts",
  },
  {
    id: PageId.AnimeCoach,
    videoSource: assetsUrl + "/animecoach.mp4",
    height: 3000,
    title: "AI Neural Network",
    description: "Custom built and trained for Anime recommendations",
  },
  {
    id: PageId.Sjoet,
    videoSource: assetsUrl + "/sjoet.mp4",
    height: 4000,
    title: "Sjoet.xyz",
    description: "Company's website for children's casting shoots",
  },
  {
    id: PageId.LightProjection,
    videoSource: assetsUrl + "/lightprojection.mp4",
    height: 4000,
    title: "Video & Light Projection",
    description:
      "Projection map and light control using TouchDesigner on WebRTC video stream",
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
