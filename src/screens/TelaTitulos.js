import { Text, View, Button, StyleSheet, ScrollView } from 'react-native';
import FundoEntrevista from '../components/FundoEntrevista';

export default function TelaTitulos({ navigation }) {
    return (
        <View style={styles.container}>
            <FundoEntrevista />
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.titulo}>🏆 Títulos de Vini Jr.</Text>

                <View style={styles.card}>
                    <Text style={styles.subtitulo}>Pelo Real Madrid</Text>

                    <Text style={styles.item}>• 2x Liga dos Campeões da UEFA (2021–22 e 2023–24)</Text>
                    <Text style={styles.item}>• 3x La Liga (2019–20, 2021–22 e 2023–24)</Text>
                    <Text style={styles.item}>• 3x Supercopa da Espanha (2019–20, 2021–22 e 2023–24)</Text>
                    <Text style={styles.item}>• 2x Supercopa da UEFA (2022 e 2024)</Text>
                    <Text style={styles.item}>• 3x Copa do Mundo de Clubes da FIFA / Copa Intercontinental (2018, 2022 e 2024)</Text>
                    <Text style={styles.item}>• 1x Copa do Rei (2022–23)</Text>

                    <Text style={styles.subtitulo}>Pela Seleção Brasileira (Categorias de Base)</Text>

                    <Text style={styles.item}>• 1x Campeonato Sul-Americano Sub-17 (2017)</Text>
                    <Text style={styles.item}>• 1x Campeonato Sul-Americano Sub-15 (2015)</Text>

                    <Text style={styles.subtitulo}>Prêmios Individuais de Destaque</Text>

                    <Text style={styles.item}>• The Best FIFA / Melhor Jogador do Mundo (2024)</Text>
                </View>

                <Button title="Voltar" buttonStyle={styles.button} onPress={() => navigation.goBack()} />
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
    button: {
        backgroundColor: '#fff',
        color: '#000',
        padding: 10,
        borderRadius: 5,
    },
});