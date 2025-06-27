import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [usuario, setUsuario] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      const userDataJson = await AsyncStorage.getItem('userData');
      if (userDataJson) setUsuario(JSON.parse(userDataJson));
    };
    loadUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://placehold.co/80x80' }} style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{usuario?.nome || 'Usuário'}</Text>
          <Text style={styles.userRole}>{usuario?.cargo || 'Cargo'}</Text>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/transporte/M01')}>
            <Text style={styles.menuButtonText}>Iniciar Inspeção (Linha 100)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/(tabs)/ia-report')}>
            <Text style={styles.menuButtonText}>+ RELATÓRIOS DA IA +</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f4f8' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingTop: 50 },
    avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
    userName: { fontSize: 22, fontWeight: 'bold', color: '#1e293b' },
    userRole: { fontSize: 16, color: '#64748b' },
    menuContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    menuButton: { backgroundColor: '#3949ab', paddingVertical: 20, paddingHorizontal: 40, borderRadius: 12, marginVertical: 10, width: '90%', alignItems: 'center', elevation: 3 },
    menuButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});