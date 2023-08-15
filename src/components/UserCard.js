import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { getUser } from '../services/storage';

const UserCard = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserFromStorage = async () => {
            try {
                const storedUser = await getUser();
                if (storedUser) {
                    setUser(storedUser);
                }
            } catch (error) {
                console.error('Error fetching user from storage:', error);
            }
        };

        fetchUserFromStorage();
    }, []);

    if (!user) {
        return <Text>Loading user...</Text>;
    }

    return (
        <View style={styles.container}>
            <FontAwesome5 name="coins" size={30} style={styles.coin} />
            <Text style={styles.title}>
                ¡Hola, {user}!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 9,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'start',
        alignItems: 'center',
    },
    coin: {
        marginRight: 20,
        color: 'black',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default UserCard;
