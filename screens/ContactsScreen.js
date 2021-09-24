import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Gradient from '../components/Gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import * as Linking from 'expo-linking';
import database from '@react-native-firebase/database';
import vars from '../env';

const ContactsScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState();
    const [locationName, setLocationName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [webpage, setWebpage] = useState();

    const uId = useSelector(state => state.auth.userId);
    useEffect(() => {
        props.navigation.setParams({userId: uId})
    }, [uId]);

    const getInitialState = async () => {
        setIsLoading(true);
        let contacts;
        await database().ref('/contacts').once('value').then(snapShot => snapShot.forEach(
            childSnapshot => contacts = childSnapshot.val()
        ));
        
        let {location, email, phoneNumber, webpage, locationName} = contacts;
        setLocation(location);
        setPhone(phoneNumber);
        setEmail(email);
        setWebpage(webpage);
        setLocationName(locationName);
        setIsLoading(false);
    }

    useEffect(() => {
        getInitialState();
    }, []);

    const showLocation = () => {
        Linking.openURL(`${location}`)
    }

    const showPhoneNumber = () => {
        Linking.openURL(`tel:${phone}`);
    }

    const showEmail = () => {
        Linking.openURL(`mailto:${email}`);
    }

    const showWebpage = () => {
        Linking.openURL(`${webpage}`);
    }

    
    return (
        <Gradient>
            {isLoading ? <ActivityIndicator size="large" color={Colors.primary} style={styles.centered}/> 
                :
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={showLocation}>
                        <View style={styles.contactContainer}> 
                        <Ionicons name="md-map" size={30} color="black" />
                        <Text style={styles.title}>{locationName}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={showPhoneNumber}>
                        <View style={styles.contactContainer}> 
                        <Ionicons name="md-call" size={30} color="black" />
                        <Text style={styles.title}>{phone}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={showEmail}>
                        <View style={styles.contactContainer}> 
                        <Ionicons name="md-mail" size={30} color="black" />
                        <Text style={styles.title}>{email}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={showWebpage}>
                        <View style={styles.contactContainer}> 
                        <Ionicons name="md-globe" size={30} color="black" />
                        <Text style={styles.title}>Comax Invest Webpage</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            }
        </Gradient>
    );
}

ContactsScreen.navigationOptions = navData => {
    const userId = navData.navigation.getParam('userId');
    let enableAdding = false;
    if(userId === vars.admin) {
        enableAdding = true;
    }
    return {
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName='ios-menu' onPress={()=>{
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            {enableAdding ? 
            <Item title="Edit contacts" iconName='md-create' onPress={()=>{
                navData.navigation.navigate('EditContacts')}
            }/> 
            : 
            <Text></Text>
            }
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        padding: 10
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    title: {
        fontSize: 16,
        color: "black",
        margin: 5
    }
});

export default ContactsScreen;