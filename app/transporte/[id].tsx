import axios from 'axios';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const API_URL = 'http://192.168.0.34:3000'; // SEU IP

export default function TransporteDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [componentes, setComponentes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComponentes = async () => {
            try {
                const response = await axios.get(`${API_URL}/transportes/${id}/componentes`);
                setComponentes(response.data);
            } catch (error) { alert('Erro ao carregar componentes.'); }
            finally { setLoading(false); }
        };
        fetchComponentes();
    }, [id]);

    if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Transporte ${id}` }} />
            <Text style={styles.title}>Componentes do Transporte {id}</Text>
            <FlatList
                data={componentes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => router.push({ pathname: `/componente/${item.id}`, params: { nome: item.nome, tipo: item.tipo } })}>
                        <Text style={styles.itemText}>{item.nome}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f4f8', padding: 15 },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#1e293b' },
    item: { backgroundColor: '#fff', padding: 20, borderRadius: 8, marginVertical: 8, elevation: 2 },
    itemText: { fontSize: 18 }
});
