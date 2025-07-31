import { animated, useSpring } from "@react-spring/three";
import { Text } from "@react-three/drei";
import { useSpringValueFromStore } from "~/hooks/use-spring-value-form-store";

const AnimatedText = animated(Text);

export function ScrollHint() {
  const scroll = useSpringValueFromStore((state) => state.scrollTop);

  const { opacity } = useSpring({
    opacity: scroll
      .to([0, 500], [1, 0.3])
      .to((v) => Math.max(0.3, Math.min(1, v))),
  });

  return (
    <group position-y={-7} position-z={2}>
      <AnimatedText
        rotation-y={Math.PI}
        color="#aaa"
        material-depthWrite={false}
        fillOpacity={opacity}
        fontSize={0.3}
      >
        Scroll down to explore projects
      </AnimatedText>
    </group>
  );
}
