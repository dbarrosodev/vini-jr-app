import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

const TIMES = [
    { logo: require('../../assets/cbf_bw.svg'), cor: '#000' },
    { logo: require('../../assets/rmcf_bw.svg'), cor: '#fff' },
]

export default function FundoEntrevista() {
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

const styles = StyleSheet.create({
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
