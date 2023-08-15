import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUser = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('@user_key', jsonValue);
    } catch (e) {
        console.error("Error al guardar el usuario", e);

    }
};

export const getUser = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@user_key');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("Error al leer el usuario", e);
        return null;
    }
};

export const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('@myList_key', jsonValue);
    } catch (e) {
        console.error("Error al guardar la lista", e);
    }
};


export const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@myList_key');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("Error al leer la lista", e);
        return null;
    }
};
