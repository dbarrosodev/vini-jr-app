import { Text, View, Button, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function TelaInicio({ navigation }) {
    return (
        <View style={styles.container}>
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

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Inicio" component={TelaInicio} />
                <Stack.Screen name="Titulos" component={TelaTitulos} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffd700',
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
});
