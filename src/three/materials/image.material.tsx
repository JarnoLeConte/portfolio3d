import { useTexture } from "@react-three/drei";

export function ImageMaterial({ imageSource }: { imageSource: string }) {
  const texture = useTexture(imageSource);
  texture.flipY = false; // Fixes the texture orientation
  return <meshStandardMaterial map={texture} toneMapped={false} />;
}
