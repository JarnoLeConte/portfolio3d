export default function Video({ src }: { src: string }) {
  return <video src={src} autoPlay loop muted />;
}
