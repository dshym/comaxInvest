import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import SignalGroupItem from '../components/SignalGroupItem';
import Gradient from '../components/Gradient';

const SignalsScreen = props => {
    
    return (
        <Gradient>
            <View style={styles.screen}>
            <SignalGroupItem title="Banking signals" onSelect={() =>{
                props.navigation.navigate({routeName: 'BankingSignals'});
            }}/>
            <SignalGroupItem title="Analitics" onSelect={() =>{
                props.navigation.navigate({routeName: 'Analitics'});
            }}/>
            </View>
        </Gradient>
        
    );
};

SignalsScreen.navigationOptions = navData => {
   
    const isReg = navData.navigation.getParam('isReg');
    return {
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName='ios-menu' onPress={()=>{
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            {isReg ? (<Item title="Profile" iconName='ios-person' onPress={()=>{
                navData.navigation.navigate({routeName: 'Profile'});
            }}/>) :
            (<Item title="Authentication" iconName='ios-log-in' onPress={()=>{
            navData.navigation.navigate({routeName: 'Authentication'});
            }}/>)}
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    }
});

export default SignalsScreen;