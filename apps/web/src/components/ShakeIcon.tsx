import { ReactNode, useRef } from "react";
import { Animated, Easing, Pressable } from "react-native";

// A small shake wiggle on hover, for icon buttons.
export function ShakeIcon({ onPress, children }: { onPress: () => void; children: ReactNode }) {
  const shake = useRef(new Animated.Value(0)).current;
  const triggerShake = () => {
    shake.setValue(0);
    Animated.sequence([
      Animated.timing(shake, { toValue: 1, duration: 55, easing: Easing.linear, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -1, duration: 55, easing: Easing.linear, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 1, duration: 55, easing: Easing.linear, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -0.5, duration: 55, easing: Easing.linear, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 55, easing: Easing.linear, useNativeDriver: true }),
    ]).start();
  };
  const translateX = shake.interpolate({ inputRange: [-1, 1], outputRange: [-6, 6] });

  return (
    <Pressable onPress={onPress} onHoverIn={triggerShake} hitSlop={12}>
      <Animated.View style={{ transform: [{ translateX }] }}>{children}</Animated.View>
    </Pressable>
  );
}
