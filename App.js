import { Text, View, Button, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function TelaInicio({ navigation }) {
    return (
        <View style={styles.container}>
            <FundoEntrevista />
            <Image
                source={require('./assets/vini_jr.png')}
                style={styles.foto}
            />
            <Text style={styles.titulo}>⚽ App Oficial do Vini Jr.</Text>
            <Button
                title="Ver Títulos"
                onPress={() => navigation.navigate('Titulos')}
            />
        </View>
    );
}

function TelaTitulos({ navigation }) {
    return (
        <View style={styles.container}>
            <FundoEntrevista />
            <Text style={styles.titulo}>🏆 Títulos de Vini Jr.</Text>
            <Text style={styles.lista}>
                Pelo Real Madrid

                • 2x Liga dos Campeões da UEFA (2021–22 e 2023–24)
                • 3x La Liga (2019–20, 2021–22 e 2023–24)
                • 3x Supercopa da Espanha (2019–20, 2021–22 e 2023–24)
                • 2x Supercopa da UEFA (2022 e 2024)
                • 3x Copa do Mundo de Clubes da FIFA / Copa Intercontinental (2018, 2022 e 2024)
                • 1x Copa do Rei (2022–23)

                Pela Seleção Brasileira (Categorias de Base)

                • 1x Campeonato Sul-Americano Sub-17 (2017)
                • 1x Campeonato Sul-Americano Sub-15 (2015)

                Prêmios Individuais de Destaque

                • The Best FIFA / Melhor Jogador do Mundo (2024)
            </Text>
            <Button
                title="Voltar"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}

const TIMES = [
    {
        logo: require('./assets/cbf_bw.svg'),
        cor: '#000',
    },
    {
        logo: require('./assets/rmcf_bw.svg'),
        cor: '#fff',
    }
]

function FundoEntrevista() {
    const quadrados = Array.from({ length: 45 });

    return (
        <View style={styles.fundoXadrez}>
            {quadrados.map((_, i) => {
                const time = TIMES[i % 2];

                return (
                    <View key={i} style={[styles.quadrados, { backgroundColor: time.cor }]}>
                        <Image source={time.logo} style={styles.logoPatrocinio} contentFit='contain' />
                    </View>
                )
            })}
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{
                    headerStyle: { backgroundColor: '#fff' },
                    headerTintColor: '#000',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            >
                <Stack.Screen name="Inicio" component={TelaInicio} options={{ title: 'Perfil do Vini Jr.' }} />
                <Stack.Screen name="Titulos" component={TelaTitulos} options={{ title: 'Galeria de Troféus' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
    },
    foto: {
        width: 300,
        height: 400,
        // borderRadius: 70,
        marginBottom: 15,
    },
    lista: {
        fontSize: 16,
        color: '#ffffff',
        marginBottom: 10,
    },
    fundoXadrez: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        opacity: 0.15,
    },
    quadrados: {
        width: '20%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoPatrocinio: {
        width: 80,
        height: 80,
        opacity: 0.6,
    }
});
