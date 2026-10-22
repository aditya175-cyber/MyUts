import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

// Nama tampilan diambil dari bagian depan email: "budi.santoso@x.com" -> "Budi Santoso"
const nameFromEmail = (email) =>
  email.split('@')[0].split(/[._-]+/).filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {user ? (
        <HomeScreen name={user.name} email={user.email} onLogout={() => setUser(null)} />
      ) : (
        <LoginScreen onLogin={(email) => setUser({ email, name: nameFromEmail(email) })} />
      )}
    </SafeAreaProvider>
  );
}