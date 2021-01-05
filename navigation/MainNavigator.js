import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import React from 'react';
import { View, SafeAreaView, ScrollView, Image, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import AnaliticsScreen from '../screens/AnaliticsScreen';
import AuthenticationScreen from '../screens/AuthenticationScreen';
import BankingSignalsScreen from '../screens/BankingSignalsScreen';
import ContactsScreen from '../screens/ContactsScreen';
import ExclusiveOfferScreen from '../screens/ExclusiveOfferScreen';
import SignalsScreen from '../screens/SignalsScreen';
import TradingStrategiesScreen from '../screens/TradingStrategiesScreen';
import VideoScreen from '../screens/VideoScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddVideoScreen from '../screens/editingScreens/AddVideoScreen';
import ComaxInvestSignalsScreen from '../screens/ComaxInvestSignalsScreen';
import PdfViewerScreen from '../screens/PdfViewerScreen';
import AddPdfScreen from '../screens/editingScreens/AddPdfScreen';
import EditContactsScreen from '../screens/editingScreens/EditContactsScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTintColot: Colors.accent
}

const ProfileNavigator = createStackNavigator({
    Profile: ProfileScreen
});

// const AnaliticsNavigator = createStackNavigator({
//     Analitics: AnaliticsScreen,
//     ComaxInvestSignals: ComaxInvestSignalsScreen
// });

const SignalsNavigator = createStackNavigator({
    Signals: {
        screen: SignalsScreen,
        navigationOptions: {
            headerTitle: 'Main'
        }
    },
    BankingSignals: {
        screen: BankingSignalsScreen,
        navigationOptions: {
            headerTitle: 'Banking signals'
        }
    },
    Analitics: {
        screen: AnaliticsScreen,
        navigationOptions: {
            headerTitle: 'Analitics'
        }
    },
    ComaxInvestSignals: {
        screen: ComaxInvestSignalsScreen,
        navigationOptions: {
            headerTitle: 'Comax Invest Signals'
        }
    },
    Authentication: AuthenticationScreen,
    Profile: ProfileScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});


const TradingStrategiesNavigator = createStackNavigator({
    TradingStrategies: TradingStrategiesScreen,
    Pdf: PdfViewerScreen,
    AddPdf: AddPdfScreen

}, {
    defaultNavigationOptions: defaultNavOptions
});

const VideoNavigator = createStackNavigator({
    Video: VideoScreen,
    AddVideo: AddVideoScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

const ExclusiveOfferNavigator = createStackNavigator({
    ExclusiveOffer: ExclusiveOfferScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

const ContactsNavigator = createStackNavigator({
    Contacts: ContactsScreen,
    EditContacts: EditContactsScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

const MainNavigator = createDrawerNavigator({
    Signals: {
        screen: SignalsNavigator,
        navigationOptions: {
            drawerLabel: 'Main'
        }
    },
    TradingStrategies: {
        screen: TradingStrategiesNavigator,
        navigationOptions: {
            drawerLabel: 'Trading strategies'
        }
    },
    Video: VideoNavigator,
    ExclusiveOffer: {
        screen: ExclusiveOfferNavigator,
        navigationOptions: {
            drawerLabel: 'Exclusive offer',
            
        }
    },
    Contacts: ContactsNavigator,

}, {
    contentOptions: {
        activeTintColor: Colors.accent,
        activeBackgroundColor: Colors.primary,
        labelStyle: {
            fontSize: 18
        },
        activeLabelStyle: {
            fontSize: 20
        }
    },
    drawerBackgroundColor: '#ccc',
    contentComponent: (props) => (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/logo.png')} style={styles.image} />
            </View>
            <ScrollView>
                <DrawerItems {...props} />
            </ScrollView>
        </SafeAreaView>
    )
});

const styles = StyleSheet.create({
    imageContainer: {
        height: 100,
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingTop: 40, 
        paddingHorizontal: 10
    },
    image: {
        width: "100%", 
        height: 100, 
        resizeMode: 'contain'
    }
});

export default createAppContainer(MainNavigator);