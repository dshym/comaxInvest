import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import AnaliticsGroupItem from '../components/AnaliticsGroupItem';
import BankingGroupItem from '../components/BankingGroupItem';
import Gradient from '../components/Gradient';

const SignalsScreen = props => {
    return (
    <Gradient>
        <View style={styles.screen}>
        <BankingGroupItem title="Banking signals" onSelect={() =>{
            props.navigation.navigate({routeName: 'BankingSignals'});
        }}
        />
        <AnaliticsGroupItem title="Analitics" onSelect={() =>{
            props.navigation.navigate({routeName: 'Analitics'});
        }}
        />
        </View>  
    </Gradient>
    );
};

SignalsScreen.navigationOptions = navData => {
    return {
        headerTitle: "Main",
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName='ios-menu' onPress={()=>{
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Profile" iconName='ios-person' onPress={()=>{
                navData.navigation.navigate({routeName: 'Profile'});
            }}/>
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    languageTitle: {
        fontSize: 17,
        color: 'black',
        marginRight: 10
    }
});

export default SignalsScreen;