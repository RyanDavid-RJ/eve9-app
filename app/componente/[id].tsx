import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

const API_URL = 'http://192.168.0.34:3000'; // SEU IP

const FormRow = ({ label, children }) => (<View style={styles.row}><Text style={styles.label}>{label}</Text>{children}</View>);

export default function ComponenteDetailScreen() {
    const { id, nome, tipo } = useLocalSearchParams();
    const router = useRouter();
    const [trocouRolamento, setTrocouRolamento] = useState(false);
    const [injetouGraxa, setInjetouGraxa] = useState(false);
    const [bicoAusente, setBicoAusente] = useState(false);
    const [folga, setFolga] = useState('');
    const [trocouMancal, setTrocouMancal] = useState(false);
    const [trocouOleo, setTrocouOleo] = useState(false);
    const [temperatura, setTemperatura] = useState('');
    const [vazamento, setVazamento] = useState(false);

    const handleSubmit = async () => {
        const userDataJson = await AsyncStorage.getItem('userData');
        const usuario = JSON.parse(userDataJson);
        let inspecaoData = { componenteId: parseInt(id), autorId: usuario.id };

        if (tipo === 'Rolamento') {
            inspecaoData = { ...inspecaoData, trocouRolamento, injetouGraxa, bicoInjetorAusente: bicoAusente, folgaAparente: folga };
        } else {
            inspecaoData = { ...inspecaoData, trocouMancal, trocouOleo, temperatura: parseInt(temperatura) || null, vazamentoOleo: vazamento };
        }
        
        try {
            await axios.post(`${API_URL}/inspecoes`, inspecaoData);
            Alert.alert('Sucesso', 'Relatório de inspeção salvo!', [{ text: 'OK', onPress: () => router.back() }]);
        } catch (error) { Alert.alert('Erro', 'Não foi possível salvar o relatório.'); }
    };

    return (
        <ScrollView contentContainerStyle={{padding:20}}>
            <Stack.Screen options={{ title: `Inspecionar ${nome}`}}/>
            {tipo === 'Rolamento' && (
                <>
                    <FormRow label="Trocou o rolamento?"><Switch value={trocouRolamento} onValueChange={setTrocouRolamento} /></FormRow>
                    <FormRow label="Injetou graxa?"><Switch value={injetouGraxa} onValueChange={setInjetouGraxa} /></FormRow>
                    <FormRow label="Bico injetor ausente?"><Switch value={bicoAusente} onValueChange={setBicoAusente} /></FormRow>
                    <FormRow label="Obs. de folga:"><TextInput style={styles.input} value={folga} onChangeText={setFolga} placeholder="Descreva..." /></FormRow>
                </>
            )}
            {tipo === 'Redutor' && (
                <>
                    <FormRow label="Trocou o mancal?"><Switch value={trocouMancal} onValueChange={setTrocouMancal} /></FormRow>
                    <FormRow label="Trocou o óleo?"><Switch value={trocouOleo} onValueChange={setTrocouOleo} /></FormRow>
                    <FormRow label="Vazamento de óleo?"><Switch value={vazamento} onValueChange={setVazamento} /></FormRow>
                    <FormRow label="Temperatura (°C):"><TextInput style={styles.input} value={temperatura} onChangeText={setTemperatura} keyboardType="numeric" placeholder="Ex: 60" /></FormRow>
                </>
            )}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}><Text style={styles.buttonText}>Salvar Relatório</Text></TouchableOpacity>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15 },
    label: { fontSize: 16, flex: 1, marginRight: 10 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 8, flex: 0.5 },
    button: { backgroundColor: '#16a34a', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
