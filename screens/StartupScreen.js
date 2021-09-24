import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import Gradient from '../components/Gradient';

const StartupScreen = props => {
    const [isConnected, setIsConnected] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true;
        NetInfo.fetch().then(state => {
            if (isMounted) {
                setIsConnected(state.isConnected);
            } 
        });
        return () => {isMounted = false };
    }, [])

    useEffect(() => {
        const tryLogin = async () => {
            
            if(!isConnected) {
                props.navigation.navigate('Main');
                return;
            }
            const userData = await AsyncStorage.getItem('userData');
            if(!userData) {
                props.navigation.navigate('Main');
                return;
            }
            const transformedData = JSON.parse(userData);
            
            const { token, userId, expiryDate } = transformedData;
            const expirationDate = new Date(expiryDate);
            
            
            if(expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Main');
                return;
            }

            props.navigation.navigate({routeName: 'Main', params: {
                login: true
            }});
            dispatch(authActions.authenticate(userId, token));
        };
        
        tryLogin();
        
    }, [dispatch]);

    return (
        <Gradient style={styles.screen}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </Gradient>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;