import { getPublicEnv } from "./lib/env";

const { assetsUrl } = getPublicEnv();

export const pages = [
  {
    page: "shimejis" as const,
    videoSource: assetsUrl + "/shimejis.mp4",
  },
  {
    page: "flipperkast" as const,
    videoSource: assetsUrl + "/flipperkast.mp4",
  },
  {
    page: "rxmarbles" as const,
    videoSource: assetsUrl + "/rxmarbles.mp4",
  },
  {
    page: "anime.coach" as const,
    videoSource: assetsUrl + "/anime.coach.mp4",
  },
];
