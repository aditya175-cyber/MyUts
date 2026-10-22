import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius } from '../theme';

// Latar putih + blob biru lembut, supaya efek kaca punya sesuatu untuk di-blur
export function Background({ children }) {
  return (
    <View style={styles.bg}>
      <View style={[styles.blob, { top: -80, right: -60, width: 300, height: 300, backgroundColor: 'rgba(10,132,255,0.22)' }]} />
      <View style={[styles.blob, { top: 320, left: -120, width: 320, height: 320, backgroundColor: 'rgba(90,200,250,0.22)' }]} />
      <View style={[styles.blob, { bottom: -100, right: -40, width: 280, height: 280, backgroundColor: 'rgba(10,132,255,0.16)' }]} />
      {children}
    </View>
  );
}

// Kartu glassmorphism ala Apple: blur + tint biru + border putih tipis + highlight atas
export function GlassCard({ style, radius: r = radius.card, intensity = 45, children }) {
  return (
    <View style={[styles.shadow, { borderRadius: r }, style]}>
      <View style={[styles.clip, { borderRadius: r }]}>
        <BlurView
          intensity={intensity}
          tint="light"
          experimentalBlurMethod="dimezisBlurView"
          style={StyleSheet.absoluteFill}
        />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.blueSoft }]} />
        <LinearGradient
          colors={['rgba(255,255,255,0.55)', 'rgba(255,255,255,0)']}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 0.6 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={[StyleSheet.absoluteFill, styles.border, { borderRadius: r }]} pointerEvents="none" />
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: colors.bg, overflow: 'hidden' },
  blob: { position: 'absolute', borderRadius: 999 },
  shadow: {
    shadowColor: colors.blue,
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
    backgroundColor: 'rgba(255,255,255,0.01)',
  },
  clip: { overflow: 'hidden' },
  border: { borderWidth: 1, borderColor: colors.glassBorder },
});