// /components/CryptoCard.js

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CryptoCard = ({ crypto, viewDetail }) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => viewDetail ? navigation.navigate('CryptoChart', { crypto: crypto }) : null}>
            <View style={styles.container}>
                <View style={styles.leftSection}>
                    <Text style={styles.title}>
                        {crypto.name}
                    </Text>
                    <Text style={styles.price}>${crypto.price_usd}</Text>
                </View>

                <View style={styles.rightSection}>
                    <Text style={[
                        styles.change,
                        crypto.percent_change_24h > 0 ? styles.positive : styles.negative
                    ]}>
                        {crypto.percent_change_24h}%
                    </Text>
                    {
                        crypto.percent_change_24h > 0 ?
                            <MaterialIcons name="trending-up" size={34} style={styles.positive} /> :
                            <MaterialIcons name="trending-down" size={34} style={styles.negative} />
                    }
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 9,
        margin: 10,
        marginTop: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#3d447b',
    },
    leftSection: {
        flexDirection: 'column',
        alignItems: 'left',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    price: {
        fontSize: 16,
        color: '#fff',
    },
    change: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 20,
    },
    positive: {
        color: '#129aee',
    },
    negative: {
        color: '#df5e84',
    },

});

export default CryptoCard;
