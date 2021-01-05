import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Gradient from '../components/Gradient';

import { useSelector } from 'react-redux';

const ProfileScreen = props => {
    const user = useSelector(state => state.auth);
    //console.log(user);
    return (
        <Gradient>
            <View style={styles.screen}>
                <Text>Profile in process of development</Text>
            </View>
        </Gradient>
       
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProfileScreen;