import { animated, useSpring } from "@react-spring/three";
import { Text } from "@react-three/drei";
import { useSpringValueFromStore } from "~/hooks/use-spring-value-form-store";

const AnimatedText = animated(Text);

export function WelcomeText() {
  const scroll = useSpringValueFromStore((state) => state.scrollTop);

  const { opacity } = useSpring({
    opacity: scroll.to([0, 70], [1, 0]).to((v) => Math.max(0, Math.min(1, v))),
  });

  return (
    <group position-y={3}>
      <AnimatedText
        rotation-y={Math.PI}
        position-z={2}
        position-y={-1.8}
        color="#aaa"
        fillOpacity={opacity}
        material-depthWrite={false}
        fontSize={0.3}
      >
        Portfolio by Jarno Le Conté
      </AnimatedText>
      <AnimatedText
        rotation-y={Math.PI}
        position-z={2}
        position-y={-0.6}
        color="#aaa"
        fillOpacity={opacity}
        material-depthWrite={false}
        fontSize={0.9}
      >
        Creative Developer
      </AnimatedText>
      {/* <AnimatedText
        rotation-y={Math.PI}
        position-z={2}
        position-y={-1.9}
        color={"#555"}
        fillOpacity={opacity}
        material-depthWrite={false}
        fontSize={0.3}
      >
        About Me | Github | LinkedIn
      </AnimatedText> */}
    </group>
  );
}
