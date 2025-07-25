import { useSpringValue } from "@react-spring/three";
import { useEffect } from "react";
import { MainStore, useMainStore } from "~/store";

/**
 * Use this hook to make a spring value for a value in the main store
 * that updates heavily, like scrollTop. Spring values are more performant
 * than normal values in this case, because they don't cause re-renders
 */
export function useSpringValueFromStore(
  selector: (state: MainStore) => number
) {
  // Create a spring value
  const springValue = useSpringValue(0);

  // Update the spring value once the store is being updated
  useEffect(
    () =>
      useMainStore.subscribe((state) => {
        const value = selector(state);
        springValue.set(value);
      }),
    []
  );

  return springValue;
}
