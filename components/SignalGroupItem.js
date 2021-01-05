import React from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';
import Colors from '../constants/Colors';

const SignalGroupItem = props => {
    return(
        <View style={styles.groupItem}>
            <TouchableNativeFeedback onPress={props.onSelect}>
                <View style={styles.container}>
                    <View>
                        <Image source={require('../assets/logo.png')} style={styles.image} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{props.title}</Text>
                    </View>
                    
                </View>
            </TouchableNativeFeedback>    
        </View>
        
    );
};

const styles = StyleSheet.create({
   groupItem: {
        height: 150,
        width: '95%',
        backgroundColor: "white",
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
        elevation: 8
   },
   container: {
        padding: 10
   },   
   titleContainer: {
        flexDirection: 'row',
        paddingLeft: 10
   },   
   image: {
        width: '100%',
        height: '80%',
        resizeMode: 'contain'
   },
   title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.accent
   }
});

export default SignalGroupItem;