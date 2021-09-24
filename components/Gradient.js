import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Gradient = props => {
    return (
        <LinearGradient colors={['white','#00ffdd']} style={{...styles.screen, ...props.style}}>
            {props.children}
        </LinearGradient>
    );
    
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});

export default Gradient;

