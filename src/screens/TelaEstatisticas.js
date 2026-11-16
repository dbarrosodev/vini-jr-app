import { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import FundoEntrevista from '../components/FundoEntrevista';

const BASE_URL = 'https://v3.football.api-sports.io';
const API_KEY = process.env.EXPO_PUBLIC_API_SPORTS_TOKEN;
const PLAYER_ID = '762';
const TEMPORADAS = [2022, 2023, 2024];

async function buscarEndpoint(endpoint) {
    const resposta = await fetch(`${BASE_URL}${endpoint}`, {
        headers: { 'x-apisports-key': API_KEY },
    });

    if (!resposta.ok) {
        throw new Error(`Erro na API: ${resposta.status}`);
    }

    const dados = await resposta.json();
    const errosApi = dados?.errors && !Array.isArray(dados.errors)
        ? Object.values(dados.errors).join(' ')
        : null;

    if (errosApi) {
        throw new Error(errosApi);
    }

    return dados?.response ?? [];
}

export default function TelaEstatisticas({ navigation }) {
    const [temporada, setTemporada] = useState(2024);
    const [dadosJogador, setDadosJogador] = useState(null);
    const [trofeus, setTrofeus] = useState([]);
    const [lesoes, setLesoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    const cacheTemporadas = useRef({});
    const extrasCarregados = useRef(false);

    const carregarDados = async (ano) => {
        setErro(null);

        if (cacheTemporadas.current[ano]) {
            setDadosJogador(cacheTemporadas.current[ano]);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const promessas = [buscarEndpoint(`/players?id=${PLAYER_ID}&season=${ano}`)];

            if (!extrasCarregados.current) {
                promessas.push(
                    buscarEndpoint(`/trophies?player=${PLAYER_ID}`),
                    buscarEndpoint(`/sidelined?player=${PLAYER_ID}`)
                );
            }

            const resultados = await Promise.allSettled(promessas);
            const resJogador = resultados[0];

            if (resJogador.status === 'rejected') {
                throw resJogador.reason;
            }

            const encontrado = resJogador.value?.[0] ?? null;
            if (!encontrado) {
                setErro('Nenhum dado encontrado para o jogador nessa temporada.');
            } else {
                cacheTemporadas.current[ano] = encontrado;
            }
            setDadosJogador(encontrado);

            if (!extrasCarregados.current) {
                if (resultados[1]?.status === 'fulfilled') {
                    setTrofeus(resultados[1].value);
                }
                if (resultados[2]?.status === 'fulfilled') {
                    setLesoes(resultados[2].value);
                }
                extrasCarregados.current = true;
            }
        } catch (err) {
            console.log(err);
            setErro(err?.message || 'Não foi possível conectar à API-Football.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarDados(temporada);
    }, [temporada]);

    const player = dadosJogador?.player;
    const estatisticas = dadosJogador?.statistics ?? [];

    return (
        <View style={styles.container}>
            <FundoEntrevista />
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.titulo}>📊 Estatísticas Oficiais</Text>

                <View style={styles.seletorContainer}>
                    {TEMPORADAS.map((ano) => {
                        const ativo = ano === temporada;
                        return (
                            <Pressable
                                key={ano}
                                style={[styles.abaBotao, ativo && styles.abaBotaoAtivo]}
                                onPress={() => setTemporada(ano)}
                            >
                                <Text style={[styles.abaTexto, ativo && styles.abaTextoAtivo]}>
                                    {ano}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

                {loading ? (
                    <View style={styles.estadoBox}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={styles.estadoTexto}>
                            Buscando dados de {temporada}...
                        </Text>
                    </View>
                ) : erro ? (
                    <View style={styles.card}>
                        <Text style={styles.erroTexto}>{erro}</Text>
                        <Pressable style={styles.button} onPress={() => carregarDados(temporada)}>
                            <Text style={styles.buttonText}>Tentar novamente</Text>
                        </Pressable>
                    </View>
                ) : player ? (
                    <View style={styles.conteudo}>
                        {player.photo ? (
                            <Image
                                source={{ uri: player.photo }}
                                style={styles.foto}
                                contentFit="cover"
                            />
                        ) : null}

                        <View style={styles.card}>
                            <Text style={styles.subtitulo}>{player.name}</Text>
                            <Text style={styles.item}>
                                Nome completo: {player.firstname} {player.lastname}
                            </Text>
                            <Text style={styles.item}>Idade: {player.age ?? '-'} anos</Text>
                            <Text style={styles.item}>Nacionalidade: {player.nationality || '-'}</Text>
                            <Text style={styles.item}>
                                Nascimento: {player.birth?.date || '-'} ({player.birth?.place || '-'})
                            </Text>
                            <Text style={styles.item}>Altura: {player.height ? `${player.height} cm` : '-'}</Text>
                            <Text style={styles.item}>Peso: {player.weight ? `${player.weight} kg` : '-'}</Text>
                        </View>

                        {estatisticas.map((stat, index) => {
                            const nota = stat.games?.rating
                                ? Number(stat.games.rating).toFixed(2)
                                : '-';

                            return (
                                <View key={`${stat.league?.id ?? index}-${index}`} style={styles.card}>
                                    <View style={styles.cardHeader}>
                                        {stat.team?.logo ? (
                                            <Image
                                                source={{ uri: stat.team.logo }}
                                                style={styles.escudo}
                                                contentFit="contain"
                                            />
                                        ) : null}
                                        {stat.league?.logo ? (
                                            <Image
                                                source={{ uri: stat.league.logo }}
                                                style={styles.escudo}
                                                contentFit="contain"
                                            />
                                        ) : null}
                                        <View style={styles.cardHeaderTexto}>
                                            <Text style={styles.subtituloSemMargem}>
                                                {stat.league?.name || 'Competição'} ({stat.league?.season || temporada})
                                            </Text>
                                            <Text style={styles.timeTexto}>{stat.team?.name || '-'}</Text>
                                        </View>
                                    </View>

                                    <Text style={styles.item}>Posição: {stat.games?.position || '-'}</Text>
                                    <Text style={styles.item}>
                                        Jogos: {stat.games?.appearences ?? 0} (Titular: {stat.games?.lineups ?? 0})
                                    </Text>
                                    <Text style={styles.item}>Minutos: {stat.games?.minutes ?? 0}</Text>
                                    <Text style={styles.item}>Gols: {stat.goals?.total ?? 0}</Text>
                                    <Text style={styles.item}>Assistências: {stat.goals?.assists ?? 0}</Text>
                                    <Text style={styles.item}>
                                        Dribles certos: {stat.dribbles?.success ?? 0} / {stat.dribbles?.attempts ?? 0}
                                    </Text>
                                    <Text style={styles.item}>Nota média: {nota}</Text>
                                    <Text style={styles.item}>
                                        Cartões: {stat.cards?.yellow ?? 0} amarelos, {stat.cards?.red ?? 0} vermelhos
                                    </Text>
                                </View>
                            );
                        })}

                        {trofeus.length > 0 ? (
                            <View style={styles.card}>
                                <Text style={styles.subtitulo}>🏆 Troféus na Carreira ({trofeus.length})</Text>
                                {trofeus.slice(0, 15).map((item, idx) => {
                                    const icone = item.place === 'Winner' ? '🏆' : '🥈';
                                    return (
                                        <Text key={`${item.league}-${item.season}-${idx}`} style={styles.item}>
                                            {icone} {item.league} ({item.season}) — {item.place}
                                        </Text>
                                    );
                                })}
                            </View>
                        ) : null}

                        {lesoes.length > 0 ? (
                            <View style={styles.card}>
                                <Text style={styles.subtitulo}>🩹 Histórico de Lesões ({lesoes.length})</Text>
                                {lesoes.map((lesao, idx) => (
                                    <Text key={`${lesao.type}-${lesao.start}-${idx}`} style={styles.item}>
                                        • {lesao.type}: {lesao.start} até {lesao.end}
                                    </Text>
                                ))}
                            </View>
                        ) : null}
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
        fontSize: 24,
        fontFamily: 'Inter_700Bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 14,
    },
    seletorContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 18,
    },
    abaBotao: {
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 20,
        backgroundColor: 'rgba(30, 30, 30, 0.9)',
        borderWidth: 1,
        borderColor: '#555',
    },
    abaBotaoAtivo: {
        backgroundColor: '#fff',
        borderColor: '#fff',
    },
    abaTexto: {
        color: '#fff',
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
    },
    abaTextoAtivo: {
        color: '#000',
    },
    conteudo: {
        width: '100%',
        alignItems: 'center',
    },
    foto: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#fff',
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
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 10,
    },
    cardHeaderTexto: {
        flex: 1,
    },
    escudo: {
        width: 34,
        height: 34,
        backgroundColor: '#fff',
        borderRadius: 6,
        padding: 2,
    },
    subtitulo: {
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
        color: '#fff',
        marginBottom: 10,
    },
    subtituloSemMargem: {
        fontSize: 17,
        fontFamily: 'Inter_700Bold',
        color: '#fff',
    },
    timeTexto: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: '#ccc',
        marginTop: 2,
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
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 10,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#000',
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
    },
});
