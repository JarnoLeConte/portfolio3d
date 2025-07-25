export enum PageId {
  Login = "login",
  Shimejis = "shimejis",
  Flipperkast = "flipperkast",
  RxMarbles = "rxmarbles",
  AnimeCoach = "anime.coach",
}

export type StaticPage = {
  id: PageId;
  height: number; // Height of the page within scroll area
  videoSource?: string;
  imageSource?: string;
  title: string;
};

/**
 * Dynamic properties of a page that are calculated at runtime.
 **/
export type DynamicPage = StaticPage & {
  index: number; // Index of the page in the pages array
  top: number; // Top position of the page in the scroll area
  bottom: number; // Bottom position of the page in the scroll area
};
