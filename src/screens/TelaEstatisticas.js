import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import FundoEntrevista from '../components/FundoEntrevista';

export default function TelaEstatisticas({ navigation }) {
    const [jogador, setJogador] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=Vinicius_Junior')
            .then((resposta) => resposta.json())
            .then((dados) => {
                setJogador(dados.player[0]);
                setLoading(false);
            })
            .catch((erro) => {
                console.log(erro);
                setLoading(false);
            });
    }, []);

    return (
        <View>
            <FundoEntrevista />
            <ScrollView>
                <Text>📊 Dados da API</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#000" />
                ) : jogador ? (
                    <View>
                        <Text>{jogador.strPlayer}</Text>
                    </View>
                ) : (
                    <Text>Nenhum jogador encontrado</Text>
                )}
            </ScrollView>
        </View>
    );
}