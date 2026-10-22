import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassCard } from './Glass';
import { PressScale } from './Motion';
import { colors } from '../theme';

const TABS = [
  { key: 'home', label: 'Beranda', icon: 'home' },
  { key: 'menu', label: 'Menu', icon: 'grid' },
  { key: 'profile', label: 'Profil', icon: 'person' },
];

// Navbar bawah melayang bergaya glass (floating pill)
export default function NavBar({ active, onChange }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { bottom: Math.max(insets.bottom, 12) }]} pointerEvents="box-none">
      <GlassCard radius={28} intensity={60} style={styles.card}>
        <View style={styles.row}>
          {TABS.map((t) => {
            const on = t.key === active;
            return (
              <PressScale
                key={t.key}
                onPress={() => onChange(t.key)}
                accessibilityRole="tab"
                accessibilityState={{ selected: on }}
                accessibilityLabel={t.label}
                style={[styles.tab, on && styles.tabOn]}
              >
                <Ionicons name={on ? t.icon : `${t.icon}-outline`} size={22} color={on ? '#fff' : colors.blueDeep} />
                {on && <Text style={styles.label}>{t.label}</Text>}
              </PressScale>
            );
          })}
        </View>
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 24, right: 24 },
  card: {},
  row: { flexDirection: 'row', justifyContent: 'space-around', padding: 8 },
  tab: {
    minHeight: 44,
    minWidth: 56,
    paddingHorizontal: 16,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  tabOn: { backgroundColor: colors.blue },
  label: { color: '#fff', fontWeight: '600', fontSize: 14 },
});