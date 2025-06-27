import axios from 'axios';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const API_URL = 'http://192.168.0.34:3000'; // SEU IP

export default function IaReportScreen() {
    const [relatorio, setRelatorio] = useState('');
    const [loading, setLoading] = useState(false);

    const gerarRelatorio = async () => {
        setLoading(true);
        setRelatorio('');
        try {
            const historicoFixo = "Componente Rolamento Interno: injetou graxa, bico injetor presente. Componente Rolamento Externo: trocou rolamento, folga aparente leve. Componente Redutor: trocou óleo, temperatura 55C, sem vazamento.";
            const response = await axios.post(`${API_URL}/gerar-relatorio-ia`, { historico: historicoFixo });
            setRelatorio(response.data.relatorio);
        } catch (error) { alert('Erro ao gerar relatório da IA.'); }
        finally { setLoading(false); }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Relatório da IA</Text>
            <TouchableOpacity style={styles.button} onPress={gerarRelatorio} disabled={loading}>
                <Text style={styles.buttonText}>Gerar Novo Plano de Manutenção</Text>
            </TouchableOpacity>
            {loading && <ActivityIndicator size="large" color="#3949ab" style={{ marginTop: 20 }} />}
            {relatorio && <ScrollView style={styles.reportContainer}><Text style={styles.reportText}>{relatorio}</Text></ScrollView>}
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f4f8', padding: 20, paddingTop: 60 },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#1e293b', marginBottom: 20 },
    button: { backgroundColor: '#3949ab', padding: 15, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    reportContainer: { marginTop: 20, backgroundColor: '#fff', padding: 15, borderRadius: 8, flex: 1 },
    reportText: { fontSize: 16, lineHeight: 24, color: '#334155' }
});
