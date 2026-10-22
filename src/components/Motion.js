import React, { useEffect, useRef, useState } from 'react';
import { Animated, AccessibilityInfo, Pressable } from 'react-native';
import { motion } from '../theme';

// Hormati pengaturan "Reduce Motion" milik sistem
function useReduceMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduce);
  }, []);
  return reduce;
}

// Masuk: naik 20px + fade, easing decelerate, bisa di-stagger lewat `index`
export function FadeUp({ index = 0, style, children }) {
  const reduce = useReduceMotion();
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(v, {
      toValue: 1,
      duration: reduce ? 0 : motion.standard,
      delay: reduce ? 0 : index * motion.stagger,
      easing: motion.easing,
      useNativeDriver: true,
    }).start();
  }, [reduce]);
  return (
    <Animated.View
      style={[
        style,
        {
          opacity: v,
          transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

// Tekan: scale 0.97 cepat, lepas halus
export function PressScale({ onPress, style, children, ...rest }) {
  const s = useRef(new Animated.Value(1)).current;
  const to = (toValue, duration) =>
    Animated.timing(s, { toValue, duration, easing: motion.easing, useNativeDriver: true }).start();
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => to(0.97, 120)}
      onPressOut={() => to(1, 220)}
      {...rest}
    >
      <Animated.View style={[style, { transform: [{ scale: s }] }]}>{children}</Animated.View>
    </Pressable>
  );
}

// Shake untuk error (3 osilasi, ~360ms)
export function useShake() {
  const x = useRef(new Animated.Value(0)).current;
  const shake = () =>
    Animated.sequence(
      [10, -10, 8, -8, 4, 0].map((toValue) =>
        Animated.timing(x, { toValue, duration: 60, easing: motion.easing, useNativeDriver: true })
      )
    ).start();
  return { shakeStyle: { transform: [{ translateX: x }] }, shake };
}