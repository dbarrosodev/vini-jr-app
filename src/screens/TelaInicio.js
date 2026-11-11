import { Text, View, Button, StyleSheet, Image } from 'react-native';
import FundoEntrevista from '../components/FundoEntrevista';

export default function TelaInicio({ navigation }) {
    return (
        <View style={styles.container}>
            <FundoEntrevista />
            <Image
                source={require('../../assets/vini_jr.png')}
                style={styles.foto}
            />
            <Text style={styles.titulo}>⚽ App Oficial do Vini Jr.</Text>
            <Button title="Ver Títulos" buttonStyle={styles.button} onPress={() => navigation.navigate('Titulos')} />
        </View>
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
        fontFamily: 'Inter_700Bold',
        color: '#fff',
        marginBottom: 15,
    },
    foto: {
        width: 300,
        height: 400,
        // borderRadius: 70,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#fff',
        color: '#000',
        padding: 10,
        borderRadius: 5,
    },
});