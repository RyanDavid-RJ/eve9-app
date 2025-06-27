import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const API_URL = 'http://192.168.0.34:3000'; // SUBSTITUA PELO SEU IP!

export default function LoginScreen() {
  const [id, setId] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!id || !senha) return Alert.alert("Erro", "ID e Senha são obrigatórios.");
    try {
      const response = await axios.post(`${API_URL}/login`, { id, senha });
      const { token, usuario } = response.data;
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(usuario));
      router.replace('/(tabs)/home');
    } catch (error) { Alert.alert("Erro de Login", "ID ou Senha incorretos."); }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://placehold.co/150x150/3949ab/ffffff?text=EVE9' }} style={styles.logo} />
      <Text style={styles.title}>EVE9</Text>
      <Text style={styles.subtitle}>Manutenção de Transportes</Text>
      <TextInput 
        style={styles.input} 
        placeholder="ID do Usuário" 
        value={id} 
        onChangeText={setId} 
        keyboardType="number-pad"
        placeholderTextColor="#9ca3af" // CORRIGIDO
      />
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        value={senha} 
        onChangeText={setSenha} 
        secureTextEntry 
        placeholderTextColor="#9ca3af" // CORRIGIDO
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8', alignItems: 'center', justifyContent: 'center', padding: 20 },
  logo: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1e293b', marginBottom: 5 },
  subtitle: { fontSize: 18, color: '#64748b', marginBottom: 40 },
  input: { width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 15, fontSize: 16, marginBottom: 15, borderWidth: 1, borderColor: '#cbd5e1' },
  button: { width: '100%', height: 50, backgroundColor: '#3949ab', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 10, elevation: 3 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});