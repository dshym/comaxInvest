import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, Pressable, Alert, Button } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const PdfItem = props => {

    
    return (
        <View style={styles.container}>  
            <View style={{overflow: 'hidden', borderRadius: 10}}>
                <TouchableNativeFeedback onPress={props.onSelect}>
                    <View style={styles.description}>
                        <View style={styles.descriptionContainer}>
                        <Ionicons name="md-document" size={30} color="red"/>
                        <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 50,
        margin: 8
    },
    description: {
        height: '100%', 
        width: '100%',
    },
    descriptionContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row'
    },  
    title: {
        fontSize: 16,
        color: 'black',
        width: '90%'
    }
});

export default PdfItem;

