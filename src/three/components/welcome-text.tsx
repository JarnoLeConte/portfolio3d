import { animated, useSpring } from "@react-spring/three";
import { Text } from "@react-three/drei";
import { useSpringValueFromStore } from "~/hooks/use-spring-value-form-store";

const AnimatedText = animated(Text);

export function WelcomeText() {
  const scroll = useSpringValueFromStore((state) => state.scrollTop);

  const { opacity } = useSpring({
    opacity: scroll.to([0, 50], [1, 0]).to((v) => Math.max(0, Math.min(1, v))),
  });

  return (
    <AnimatedText
      rotation-y={Math.PI}
      position-z={2}
      fillOpacity={opacity}
      material-depthWrite={false}
      fontSize={1}
    >
      Portfolio
    </AnimatedText>
  );
}
