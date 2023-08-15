import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchSpecificCrypto } from '../services/api';
import CryptoChart from '../components/CryptoChart';

const CryptoChartScreen = ({ route, navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { crypto } = route.params;

    useEffect(() => {
        const getCurrentTime = () => {
            const now = new Date();
            return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        };

        const fetchData = async () => {
            try {
                const response = await fetchSpecificCrypto(crypto.id);
                const price = parseFloat(response.price_usd);
                const change1h = parseFloat(response.percent_change_1h) / 100;

                // Calcular el precio de hace una hora
                const priceOneHourAgo = price / (1 + change1h);

                const timestamp = getCurrentTime();

                setData(prevData => {

                    if (prevData.length === 0) {
                        const timestampOneHourAgo = getCurrentTime(new Date(new Date().getTime() - 60 * 60 * 1000));
                        return [
                            { timestamp: timestampOneHourAgo, price: priceOneHourAgo },
                            { timestamp, price }
                        ];
                    }

                    // Si no hay datos previos o si el último precio es diferente al precio actual
                    if (prevData.length === 0 || prevData[prevData.length - 1].price !== price) {
                        const newData = [...prevData, { timestamp, price }];
                        return newData.length > 5 ? newData.slice(-5) : newData;
                    }
                    // Si el precio es el mismo, retornamos prevData sin cambios
                    return prevData;
                });
            } catch (error) {
                console.error("Couldn't fetch data", error);
            }
            setLoading(false);
        };

        fetchData();
        const interval = setInterval(fetchData, 30000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{crypto.name} ({crypto.symbol})</Text>
            <Text style={styles.price}>${crypto.price_usd}</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <CryptoChart data={data} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 20,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 20,
        marginTop: 0,
        color: 'blue',
    },
});

export default CryptoChartScreen;
