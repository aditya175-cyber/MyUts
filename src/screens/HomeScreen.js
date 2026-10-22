import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Background, GlassCard } from '../components/Glass';
import { FadeUp, PressScale } from '../components/Motion';
import NavBar from '../components/NavBar';
import { colors, radius } from '../theme';

const FOTO_PROFIL = require('../../assets/foto-profil.png');

const MENUS = [
  { label: 'Menu 1', icon: 'book-outline' },
  { label: 'Menu 2', icon: 'calendar-outline' },
  { label: 'Menu 3', icon: 'chatbubbles-outline' },
  { label: 'Menu 4', icon: 'settings-outline' },
];

function Home({ name, onLogout }) {
  return (
    <>
      <FadeUp>
        <Text style={styles.header}>HOME PAGE</Text>
      </FadeUp>

      <FadeUp index={1}>
        <GlassCard style={{ marginTop: 20 }}>
          <View style={styles.profile}>
            {/* Ganti foto: timpa file assets/foto-profil.jpg dengan foto kamu */}
            <Image source={FOTO_PROFIL} style={styles.avatar} accessibilityLabel="Foto profil" />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.role}>Mahasiswa</Text>
          </View>
        </GlassCard>
      </FadeUp>

      <View style={styles.grid}>
        {MENUS.map((m, i) => (
          <FadeUp key={m.label} index={i + 2} style={styles.cell}>
            <PressScale accessibilityRole="button" accessibilityLabel={m.label}>
              <GlassCard radius={20}>
                <View style={styles.menu}>
                  <Ionicons name={m.icon} size={28} color={colors.blueDeep} />
                  <Text style={styles.menuText}>{m.label}</Text>
                </View>
              </GlassCard>
            </PressScale>
          </FadeUp>
        ))}
      </View>

      <FadeUp index={6}>
        <PressScale onPress={onLogout} accessibilityRole="button" accessibilityLabel="Logout" style={styles.logout}>
          <Ionicons name="log-out-outline" size={20} color={colors.blueDeep} />
          <Text style={styles.logoutText}>LOGOUT</Text>
        </PressScale>
      </FadeUp>
    </>
  );
}

function Row({ icon, label, value }) {
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={20} color={colors.blueDeep} />
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue} numberOfLines={1}>{value}</Text>
    </View>
  );
}

function Profile({ name, email }) {
  return (
    <>
      <FadeUp>
        <Text style={styles.header}>PROFIL</Text>
      </FadeUp>
      <FadeUp index={1}>
        <GlassCard style={{ marginTop: 20 }}>
          <View style={styles.profile}>
            <Image source={FOTO_PROFIL} style={styles.avatarLg} accessibilityLabel="Foto profil" />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.role}>Mahasiswa</Text>
          </View>
        </GlassCard>
      </FadeUp>
      <FadeUp index={2}>
        <GlassCard style={{ marginTop: 16 }}>
          <Row icon="person-outline" label="Nama" value={name} />
          <Row icon="mail-outline" label="Email" value={email} />
          <Row icon="school-outline" label="Status" value="Mahasiswa" />
        </GlassCard>
      </FadeUp>
    </>
  );
}

function Placeholder({ title }) {
  return (
    <FadeUp>
      <GlassCard style={{ marginTop: 60 }}>
        <Text style={styles.placeholder}>{title} — segera hadir</Text>
      </GlassCard>
    </FadeUp>
  );
}

export default function HomeScreen({ name, email, onLogout }) {
  const [tab, setTab] = useState('home');
  const insets = useSafeAreaInsets();
  return (
    <Background>
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingHorizontal: 24, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {tab === 'home' && <Home name={name} onLogout={onLogout} />}
        {tab === 'menu' && <Placeholder title="Menu" />}
        {tab === 'profile' && <Profile name={name} email={email} />}
      </ScrollView>
      <NavBar active={tab} onChange={setTab} />
    </Background>
  );
}

const styles = StyleSheet.create({
  header: { textAlign: 'center', fontSize: 20, fontWeight: '700', letterSpacing: 2, color: colors.text },
  profile: { alignItems: 'center', paddingVertical: 28 },
  avatar: {
    width: 88, height: 88, borderRadius: 28, backgroundColor: colors.blue,
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.8)',
  },
  avatarLg: {
    width: 120, height: 120, borderRadius: 36, backgroundColor: colors.blue,
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.8)',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 56, paddingHorizontal: 20 },
  rowLabel: { fontSize: 14, color: colors.textMuted, width: 60 },
  rowValue: { flex: 1, fontSize: 15, fontWeight: '600', color: colors.text, textAlign: 'right' },
  name: { marginTop: 14, fontSize: 20, fontWeight: '700', color: colors.text },
  role: { marginTop: 2, fontSize: 13, color: colors.textMuted },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 16, marginTop: 16 },
  cell: { width: '48%' },
  menu: { minHeight: 100, alignItems: 'center', justifyContent: 'center', gap: 8 },
  menuText: { fontSize: 15, fontWeight: '600', color: colors.text },
  logout: {
    alignSelf: 'center', marginTop: 28, minHeight: 48, paddingHorizontal: 28, borderRadius: radius.button,
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderWidth: 1.5, borderColor: colors.blue, backgroundColor: 'rgba(255,255,255,0.6)',
  },
  logoutText: { color: colors.blueDeep, fontWeight: '700', letterSpacing: 1.5 },
  placeholder: { padding: 32, textAlign: 'center', color: colors.textMuted, fontSize: 15 },
});