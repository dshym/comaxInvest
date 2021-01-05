import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import Gradient from '../components/Gradient';

import SignalItem from '../components/SignalItem';


const BankingSignalsScreen = props => {
    
    return (
        <Gradient style={styles.screen}>
            <View>
                <Text>Banking signals in process of development</Text>
            </View>
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

export default BankingSignalsScreen;