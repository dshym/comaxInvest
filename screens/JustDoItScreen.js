import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Gradient from '../components/Gradient';
import * as Linking from 'expo-linking';
import Colors from '../constants/Colors';

const JustDoItScreen = () => {
    const openURL = () => {
        Linking.openURL("https://wep.wf/svt2se");
    }

    return (
        <Gradient>
            <View style={styles.contentContainer}>
            <Text style={styles.title}>Want to get even more interesting content?</Text>
            <Text style={styles.text}>Follow the <TouchableWithoutFeedback onPress={openURL}><Text style={styles.primaryText}>link</Text></TouchableWithoutFeedback>
                , choose your convenient messenger and subscribe to our channel.
            </Text>
            <Image source={require("../assets/logo.png")} style={styles.image}/>
            <TouchableWithoutFeedback onPress={openURL}>
                <Text style={styles.primaryText}>Click to subscribe and get useful content right now.</Text>
            </TouchableWithoutFeedback>
            </View>
        </Gradient>
    );
}

JustDoItScreen.navigationOptions = navData => {
    return {
        headerTitle: "Just do it",
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="GoBack" iconName='menu' onPress={()=>{
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>
    }
    
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        margin: 10
    },
    title: {
        fontSize: 18,
        color: 'black'
    },
    text: {
        fontSize: 17,
        color: 'black'
    },
    primaryText: {
        color: Colors.primary,
        fontSize: 17
    },
    image: {
        resizeMode: 'contain',
        width: '90%',
        margin: 10
    }
});

export default JustDoItScreen;