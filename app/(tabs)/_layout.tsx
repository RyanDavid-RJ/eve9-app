import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#3949ab' }}>
      <Tabs.Screen name="home" options={{ title: 'Início', headerShown: false }} />
      <Tabs.Screen name="ia-report" options={{ title: 'Relatório IA', headerShown: false }} />
    </Tabs>
  );
}