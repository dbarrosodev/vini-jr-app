import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import FundoEntrevista from '../components/FundoEntrevista';

const API_URL = 'https://www.thesportsdb.com/api/v1/json/123/lookupplayer.php?id=34161324';

export default function TelaEstatisticas({ navigation }) {
    const [jogador, setJogador] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    const carregarDados = async () => {
        setLoading(true);
        setErro(null);

        try {
            const resposta = await fetch(API_URL);
            if (!resposta.ok) {
                throw new Error(`Erro na API: ${resposta.status}`);
            }

            const dados = await resposta.json();
            const encontrado = dados?.players?.[0] ?? null;

            if (!encontrado) {
                setErro('Nenhum dado encontrado para o jogador.');
            }
            setJogador(encontrado);
        } catch (err) {
            console.log(err);
            setErro('Não foi possível conectar à API. Verifique sua internet e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarDados();
    }, []);

    return (
        <View style={styles.container}>
            <FundoEntrevista />
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.titulo}>📊 Dados da API</Text>

                {loading ? (
                    <View style={styles.estadoBox}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={styles.estadoTexto}>Buscando dados do Vini Jr...</Text>
                    </View>
                ) : erro ? (
                    <View style={styles.card}>
                        <Text style={styles.erroTexto}>{erro}</Text>
                        <Pressable style={styles.button} onPress={carregarDados}>
                            <Text style={styles.buttonText}>Tentar novamente</Text>
                        </Pressable>
                    </View>
                ) : jogador ? (
                    <View style={styles.conteudo}>
                        {(jogador.strCutout || jogador.strThumb) && (
                            <Image
                                source={{ uri: jogador.strCutout || jogador.strThumb }}
                                style={styles.foto}
                                contentFit="contain"
                            />
                        )}

                        <View style={styles.card}>
                            <Text style={styles.subtitulo}>{jogador.strPlayer}</Text>
                            {jogador.strPlayerAlternate ? (
                                <Text style={styles.item}>Nome completo: {jogador.strPlayerAlternate}</Text>
                            ) : null}
                            <Text style={styles.item}>Clube: {jogador.strTeam || '-'}</Text>
                            <Text style={styles.item}>Seleção: {jogador.strTeam2 || '-'}</Text>
                            <Text style={styles.item}>Camisa: #{jogador.strNumber || '-'}</Text>
                            <Text style={styles.item}>Posição: {jogador.strPosition || '-'}</Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.subtitulo}>Ficha Técnica</Text>
                            <Text style={styles.item}>Nacionalidade: {jogador.strNationality || '-'}</Text>
                            <Text style={styles.item}>Nascimento: {jogador.dateBorn || '-'}</Text>
                            <Text style={styles.item}>Cidade natal: {jogador.strBirthLocation || '-'}</Text>
                            <Text style={styles.item}>Altura: {jogador.strHeight || '-'}</Text>
                            <Text style={styles.item}>Peso: {jogador.strWeight || '-'}</Text>
                            <Text style={styles.item}>Pé dominante: {jogador.strSide || '-'}</Text>
                        </View>
                    </View>
                ) : (
                    <Text style={styles.estadoTexto}>Nenhum jogador encontrado</Text>
                )}

                <Pressable style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    scroll: {
        padding: 20,
        alignItems: 'center',
    },
    titulo: {
        fontSize: 26,
        fontFamily: 'Inter_700Bold',
        color: '#fff',
        marginBottom: 20,
    },
    conteudo: {
        width: '100%',
        alignItems: 'center',
    },
    foto: {
        width: 180,
        height: 180,
        marginBottom: 16,
    },
    card: {
        width: '100%',
        backgroundColor: 'rgba(20, 20, 20, 0.85)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#fff',
    },
    subtitulo: {
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
        color: '#fff',
        marginBottom: 10,
    },
    item: {
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
        color: '#fff',
        marginBottom: 6,
    },
    estadoBox: {
        alignItems: 'center',
        marginVertical: 30,
    },
    estadoTexto: {
        color: '#fff',
        fontFamily: 'Inter_400Regular',
        fontSize: 15,
        marginTop: 12,
    },
    erroTexto: {
        color: '#ff6b6b',
        fontFamily: 'Inter_400Regular',
        fontSize: 15,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#000',
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
    },
});
