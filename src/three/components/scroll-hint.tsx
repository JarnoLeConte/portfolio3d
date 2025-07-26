import { animated } from "@react-spring/three";
import { Text } from "@react-three/drei";

const AnimatedText = animated(Text);

export function ScrollHint() {
  return (
    <>
      <AnimatedText
        rotation-y={Math.PI}
        position-z={2}
        position-y={-7}
        color="#777"
        material-depthWrite={false}
        fontSize={0.3}
      >
        Scroll down to explore all projects
      </AnimatedText>
    </>
  );
}
