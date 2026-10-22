import { Easing } from 'react-native';

// Putih untuk background, biru untuk card/aksen
export const colors = {
  bg: '#FFFFFF',
  blue: '#0A84FF',
  blueDeep: '#0057D9',
  blueSoft: 'rgba(10,132,255,0.12)',
  blueBorder: 'rgba(10,132,255,0.28)',
  text: '#0B1F3A',
  textMuted: '#5B6B82',
  danger: '#D92D20',
  glassBorder: 'rgba(255,255,255,0.75)',
};

export const radius = { card: 24, input: 16, button: 16 };

// Motion "Premium": 350-600ms, tanpa overshoot, kurva halus
export const motion = {
  easing: Easing.bezier(0.4, 0, 0.2, 1),
  quick: 150,
  standard: 400,
  slow: 600,
  stagger: 70,
};