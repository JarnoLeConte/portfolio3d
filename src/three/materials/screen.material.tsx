import { useVideoTexture } from "@react-three/drei";
import { useMainStore } from "~/store";

export function ScreenMaterial({ videoSource }: { videoSource: string }) {
  const pageProgress = useMainStore((state) => state.pageProgress);

  const texture = useVideoTexture(videoSource, { start: false, loop: false });
  texture.flipY = false;
  texture.image.currentTime = pageProgress * texture.image.duration;

  return <meshBasicMaterial map={texture} toneMapped={false} />;
}
