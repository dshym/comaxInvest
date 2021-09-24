import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const AnaliticsGroupItem = props => {
    return(
        <View style={styles.groupItem}>
        <TouchableOpacity onPress={props.onSelect} activeOpacity={0.4}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/logo.png')} style={styles.image} />
                </View>
                </View>
            </View>
        </TouchableOpacity>    
    </View> 
    );
};

const styles = StyleSheet.create({
    groupItem: {
        height: 120,
        width: '95%',
        backgroundColor: "white",
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
        elevation: 8
   },
   container: {
        height: '100%',
        paddingVertical: 10,
        paddingHorizontal: 5
   },   
   titleContainer: {
        flexDirection: 'row',
        paddingLeft: 10
   },   
   imageContainer: {
        height: 40,
        width: 100,
        marginTop: 10
   },   
   image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
   },
   title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.accent
   }
});

export default AnaliticsGroupItem;