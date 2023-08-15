import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import { storeUser } from '../services/storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');

    const handleLogin = async () => {
        if (!username) {
            Alert.alert('Advertencia', 'Por favor, ingresa un nombre.');
            return;
        }

        try {
            storeUser(username);
            Alert.alert('¡Exito!', 'Nombre guardado exitosamente.');
            navigation.navigate('CryptoList');
        } catch (error) {
            console.error('Error guardando el nombre:', error);
            Alert.alert('Error', 'Hubo un problema guardando tu nombre. Inténtalo de nuevo.');
        }
    };

    return (
        // <View style={styles.container}>
        //     <StatusBar style="auto" />
        //     <View style={styles.inputView}>
        //         <TextInput
        //             style={styles.TextInput}
        //             value={username}
        //             onChangeText={setUsername}
        //             placeholder="Ingresa tu nombre"
        //             placeholderTextColor="#003f5c"
        //         />
        //     </View>
        //     <Button title="Iniciar sesión" onPress={handleLogin} />

        // </View>
        <View style={styles.mainBody}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View>
                    <KeyboardAvoidingView enabled>
                        <View style={{ alignItems: 'center', marginBottom: 80 }}>
                            <MaterialCommunityIcons name="hand-coin-outline" size={100} color="black" />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={setUsername}
                                placeholder="Ingresa tu nombre"
                                placeholderTextColor="#8b9cb5"
                                blurOnSubmit={false}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={handleLogin}>
                            <Text style={styles.buttonTextStyle}>
                                Iniciar sesión
                            </Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 44,
        alignItems: 'center',
        borderRadius: 20,
        margin: 30,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#dadae8',
    },

});

export default LoginScreen;
