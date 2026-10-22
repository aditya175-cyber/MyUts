import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Background, GlassCard } from '../components/Glass';
import { FadeUp, PressScale, useShake } from '../components/Motion';
import { colors, radius } from '../theme';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({ label, error, icon, right, ...props }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.input, error && { borderColor: colors.danger }]}>
        <Ionicons name={icon} size={20} color={colors.blueDeep} />
        <TextInput
          style={styles.textInput}
          placeholderTextColor={colors.textMuted}
          accessibilityLabel={label}
          {...props}
        />
        {right}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const { shakeStyle, shake } = useShake();

  const submit = () => {
    const e = {};
    if (!EMAIL_RE.test(email.trim())) e.email = 'Format email tidak valid';
    if (password.length < 6) e.password = 'Password minimal 6 karakter';
    setErrors(e);
    if (Object.keys(e).length) return shake();
    onLogin(email.trim());
  };

  return (
    <Background>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <FadeUp>
            <View style={styles.logo}>
              <Ionicons name="sparkles" size={30} color="#fff" />
            </View>
            <Text style={styles.title}>MY APP</Text>
            <Text style={styles.subtitle}>UTS MOBILE 1</Text>
          </FadeUp>

          <Animated.View style={shakeStyle}>
            <FadeUp index={1}>
              <GlassCard style={{ marginTop: 32 }}>
                <View style={{ padding: 20 }}>
                  <Field
                    label="Email"
                    icon="mail-outline"
                    placeholder="nama@email.com"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    error={errors.email}
                  />
                  <Field
                    label="Password"
                    icon="lock-closed-outline"
                    placeholder="Minimal 6 karakter"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!show}
                    onSubmitEditing={submit}
                    error={errors.password}
                    right={
                      <PressScale
                        onPress={() => setShow(!show)}
                        accessibilityLabel={show ? 'Sembunyikan password' : 'Tampilkan password'}
                        style={{ padding: 6 }}
                      >
                        <Ionicons name={show ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.textMuted} />
                      </PressScale>
                    }
                  />
                  <PressScale onPress={submit} accessibilityRole="button" accessibilityLabel="Login" style={styles.button}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                  </PressScale>
                </View>
              </GlassCard>
            </FadeUp>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logo: {
    alignSelf: 'center', width: 64, height: 64, borderRadius: 20, marginBottom: 16,
    backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center',
    shadowColor: colors.blue, shadowOpacity: 0.4, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 8,
  },
  title: { textAlign: 'center', fontSize: 30, fontWeight: '800', letterSpacing: 2, color: colors.text },
  subtitle: { textAlign: 'center', fontSize: 16, fontWeight: '600', letterSpacing: 3, color: colors.blueDeep, marginTop: 4 },
  label: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6 },
  input: {
    flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 50, paddingHorizontal: 14,
    borderRadius: radius.input, borderWidth: 1, borderColor: colors.blueBorder,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  textInput: { flex: 1, fontSize: 16, color: colors.text, paddingVertical: 12 },
  error: { color: colors.danger, fontSize: 12, marginTop: 4 },
  button: {
    marginTop: 6, minHeight: 50, borderRadius: radius.button, backgroundColor: colors.blue,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: colors.blue, shadowOpacity: 0.35, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 5,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 1.5 },
});