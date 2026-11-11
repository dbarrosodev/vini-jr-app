import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaInicio from './src/screens/TelaInicio';
import TelaTitulos from './src/screens/TelaTitulos';

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }
    
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