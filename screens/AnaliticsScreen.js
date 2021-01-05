import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Gradient from '../components/Gradient';

import SignalGroupItem from '../components/SignalGroupItem';

const AnaliticsScreen = props => {
    return (
        <Gradient style={styles.screen}>
            <SignalGroupItem
                title="Comax Invest Signals"
                onSelect={() => {props.navigation.navigate('ComaxInvestSignals')}}
            />
        </Gradient>
        
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    }
});

export default AnaliticsScreen;