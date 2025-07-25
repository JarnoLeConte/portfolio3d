import { getPublicEnv } from "./lib/env";

const { assetsUrl } = getPublicEnv();

export const pages = [
  {
    page: "login" as const,
    scrollDuration: 5,
    videoSource: undefined,
  },
  {
    page: "shimejis" as const,
    videoSource: assetsUrl + "/shimejis.mp4",
    scrollDuration: 30,
  },
  {
    page: "flipperkast" as const,
    videoSource: assetsUrl + "/flipperkast.mp4",
    scrollDuration: 30,
  },
  {
    page: "rxmarbles" as const,
    videoSource: assetsUrl + "/rxmarbles.mp4",
    scrollDuration: 30,
  },
  {
    page: "anime.coach" as const,
    videoSource: assetsUrl + "/anime.coach.mp4",
    scrollDuration: 30,
  },
] as const;
