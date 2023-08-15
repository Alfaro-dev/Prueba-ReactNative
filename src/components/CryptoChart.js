import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const CryptoChart = ({ data }) => {
    // Extraemos las etiquetas y los precios de los datos
    const labels = data.map(item => item.timestamp);
    const prices = data.map(item => item.price);

    const isRising = data.length > 1 ? data[data.length - 1].price > data[data.length - 2].price : null;

    const chartData = {
        labels: labels,
        datasets: [{
            data: prices,
            strokeWidth: 2
        }]
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 10 }}>
                Precio en USD (últimas actualizaciones)
            </Text>
            <LineChart
                data={chartData}
                width={Dimensions.get('window').width - 40}
                height={200}
                yAxisLabel="$"
                chartConfig={{
                    backgroundColor: '#fff',
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    decimalPlaces: 2,
                    color: (opacity = 1) => isRising === null ? `rgba(134, 65, 244, ${opacity})` : (isRising ? `rgba(0, 255, 0, ${opacity})` : `rgba(255, 0, 0, ${opacity})`),
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    );
};

export default CryptoChart;
