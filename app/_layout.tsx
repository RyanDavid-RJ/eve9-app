import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="transporte/[id]" options={{ headerShown: true }}/>
      <Stack.Screen name="componente/[id]" options={{ headerShown: true, presentation: 'modal' }}/>
    </Stack>
  );
}