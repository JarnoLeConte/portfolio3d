import { useVideoTexture } from "@react-three/drei";
import { useMainStore } from "~/store";

export function ScreenMaterial({ videoSource }: { videoSource: string }) {
  const pageProgress = useMainStore((state) => state.pageProgress);

  // Create a video texture
  const texture = useVideoTexture(videoSource, {
    playsInline: true,
    muted: true,
    loop: false,
    autoplay: true, // Required for iOS, otherwise it just renders a black screen
    start: false, // this ensures the video doesn't start playing immediately
  });

  texture.flipY = false;

  // Scrubbing the video when scroll position changes
  texture.image.currentTime = pageProgress * (texture.image.duration || 0);

  return texture && <meshBasicMaterial map={texture} toneMapped={false} />;
}
