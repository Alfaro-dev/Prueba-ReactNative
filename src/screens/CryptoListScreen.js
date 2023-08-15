import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { fetchCryptos } from '../services/api';
import { storeData } from '../services/storage';
import CryptoCard from '../components/CryptoCard';
import UserCard from '../components/UserCard';

const CryptoListScreen = ({ navigation }) => {
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [viewDetail, setViewDetail] = useState(true);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const getCryptos = async () => {
      try {
        // Verificar conexión a la red
        const netInfo = await NetInfo.fetch();

        if (netInfo.isConnected && netInfo.isInternetReachable) {
          const data = await fetchCryptos();
          const cleanData = data.slice(0, 40);
          await storeData('cryptos', cleanData);
          setCryptos(cleanData);

          setFilteredCryptos(cleanData);
        } else {
          // Si no hay conexión, obtenemos datos de AsyncStorage
          const storedCryptos = await getData('cryptos');
          if (storedCryptos) {
            setViewDetail(false);
            setCryptos(storedCryptos);
            setFilteredCryptos(storedCryptos);
          } else {
            console.warn('No hay datos almacenados localmente.');
          }
        }
      } catch (error) {
        console.error('Error fetching cryptos:', error);
      }
    };

    getCryptos();

    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert('Sin Conexión', 'Actualmente estás desconectado. Algunas funciones pueden no estar disponibles.');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const applyFilter = () => {
    if (filterValue === '') {
      setFilteredCryptos(cryptos);
    } else {
      const threshold = parseFloat(filterValue);
      const filtered = cryptos.filter(crypto => crypto.percent_change_24h >= threshold);
      setFilteredCryptos(filtered);
    }
  };

  return (
    <View>

      <UserCard />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="% de cambio mínimo en 24 hrs"
          keyboardType="numeric"
          value={filterValue}
          onChangeText={setFilterValue}
        />
        <Button
          style={styles.button}
          title="Filtro"
          onPress={applyFilter}
        />
      </View>
      <FlatList
        data={filteredCryptos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <CryptoCard crypto={item} viewDetail={viewDetail} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    flex: 3,
    marginRight: 20,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#dadae8',
  },
  button: {
    flex: 1,
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 44,
    alignItems: 'center',
    borderRadius: 20,
    margin: 30,
  }
});

export default CryptoListScreen;
