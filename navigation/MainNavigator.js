import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import React from 'react';
import { View, SafeAreaView, ScrollView, Image, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import AnaliticsScreen from '../screens/AnaliticsScreen';
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
import EditProfileScreen from '../screens/editingScreens/EditProfileScreen';
import StartupScreen from '../screens/StartupScreen';
import JustDoItScreen from '../screens/JustDoItScreen';
import WebViewScreen from '../screens/WebViewScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTintColot: Colors.accent
}

const SignalsNavigator = createStackNavigator({
    Signals: {
        screen: SignalsScreen
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
    WebView: WebViewScreen,
    Profile: ProfileScreen,
    EditProfile: EditProfileScreen
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

const JustDoItNavigator = createStackNavigator({
    JustDoIt: JustDoItScreen 
}, {
    defaultNavigationOptions: defaultNavOptions
});

const DrawerNavigator = createDrawerNavigator({
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
    JustDoIt: {
        screen: JustDoItNavigator,
        navigationOptions: {
            drawerLabel: 'Just do it',
        }
    }
}, {
    contentOptions: {
        activeTintColor: 'black',
        activeBackgroundColor: Colors.primary,
        labelStyle: {
            fontSize: 18
        },
        activeLabelStyle: {
            fontSize: 20
        }
    },
    drawerBackgroundColor: 'white',
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

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Main: DrawerNavigator
});

const styles = StyleSheet.create({
    imageContainer: {
        height: 100,
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingTop: 30, 
        paddingHorizontal: 10
    },
    image: {
        width: "100%", 
        height: 100, 
        resizeMode: 'contain'
    }
});

export default createAppContainer(MainNavigator);