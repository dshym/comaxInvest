import React from 'react';
import { StyleSheet } from 'react-native';
import Gradient from '../components/Gradient';

import AnaliticsGroupItem from '../components/AnaliticsGroupItem';

const AnaliticsScreen = props => {
    return (
        <Gradient style={styles.screen}>
            <AnaliticsGroupItem
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