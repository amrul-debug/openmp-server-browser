import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="server/[ip]" options={{ presentation: 'modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </FavoritesProvider>
    </ThemeProvider>
  );
}