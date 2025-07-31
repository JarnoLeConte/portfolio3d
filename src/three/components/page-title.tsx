import { animated, useSpring } from "@react-spring/three";
import { Text } from "@react-three/drei";
import { useSpringValueFromStore } from "~/hooks/use-spring-value-form-store";
import { DynamicPage } from "~/types";

const AnimatedText = animated(Text);

export function PageTitle({ page }: { page: DynamicPage }) {
  const scroll = useSpringValueFromStore((state) => state.scrollTop);

  const range = [
    page.top - 100,
    page.top + 100,
    page.bottom - 0,
    page.bottom + 200,
  ];

  const { opacity, y, scale } = useSpring({
    opacity: scroll
      .to(range, [0, 1, 1, 0])
      .to((v) => Math.max(0, Math.min(1, v))),
    y: scroll
      .to(range, [-0.5, 0, 0, 0.5])
      .to((v) => Math.max(-0.5, Math.min(0.5, v))),
    scale: scroll
      .to(range, [0.9, 1, 1, 0.9])
      .to((v) => Math.max(0.9, Math.min(1, v))),
  });

  return (
    <AnimatedText
      rotation-y={Math.PI}
      position-y={y}
      scale={scale}
      color="#aaa"
      fillOpacity={opacity}
      material-depthWrite={false}
      fontSize={0.48}
    >
      {page.title}
    </AnimatedText>
  );
}
