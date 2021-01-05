import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const SignalItem = props => {
    
    return (
        <View style={styles.signal}>
            <View style={styles.titleContainer}> 
                <Text style={styles.title}>
                    <Text style={styles.titleName}>Timestamp:</Text>
                    <Text style={styles.titleInfo}> {props.timestamp}</Text>
                </Text>
            </View>

            <View style={styles.titleContainer}> 
            <Text style={styles.title}>
                <Text style={styles.titleName}>Type:</Text>
                <Text style={styles.titleInfo}> {props.type}</Text>
            </Text>
            </View>

            <View style={styles.titleContainer}> 
            <Text style={styles.title}>
                <Text style={styles.titleName}>Strategy:</Text>
                <Text style={styles.titleInfo}> {props.strategy}</Text>
            </Text>
            </View>

            <View style={styles.titleContainer}> 
            <Text style={styles.title}>
                <Text style={styles.titleName}>Market:</Text>
                <Text style={styles.titleInfo}> {props.market}</Text>
            </Text>
            </View>

            <View style={styles.titleContainer}> 
            <Text style={styles.title}>
                <Text style={styles.titleName}>Direction:</Text>
                <Text style={styles.titleInfo}> {props.direction}</Text>
            </Text>
            </View>

            <View style={styles.titleContainer}> 
            <Text style={styles.title}>
                <Text style={styles.titleName}>Price:</Text>
                <Text style={styles.titleInfo}> {props.price}</Text>
            </Text>
            </View>

            <View style={styles.titleContainer}>
            <Text style={styles.title}>
                <Text style={styles.titleName}>Quantity:</Text>
                <Text style={styles.titleInfo}> {props.quantity}</Text>
            </Text>    
            </View>
            
            {props.stopLevel ? (
                <View style={styles.detailsContainer}>
                <View style={styles.stopSection}>
                    <View style={styles.stopContainer}>
                        <Text style={styles.stop}>STOP</Text>
                    </View>
                    <Text style={styles.titleName}>Level:<Text style={styles.titleInfo}> {props.stopLevel}</Text></Text>
                    <Text style={styles.titleName}>Trailing:<Text style={styles.titleInfo}> {props.trailing}</Text></Text>
                </View>
                <View style={styles.limitSection}>
                    <View style={styles.limitContainer}>
                        <Text style={styles.limit}>LIMIT</Text>
                    </View>
                    <Text style={styles.titleName}>Level:<Text style={styles.titleInfo}> {props.limitLevel}</Text></Text>
                </View>
            </View>
            ) :
            (<View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        <Text style={styles.titleName}>Opening price:</Text>
                        <Text style={styles.titleInfo}> {props.openingPrice}</Text>
                    </Text>    
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        <Text style={styles.titleName}>Profit/Loss:</Text>
                        <Text style={styles.titleInfo}> {props.profitLoss}</Text>
                    </Text>    
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        <Text style={styles.titleName}>Strategy P/L:</Text>
                        <Text style={styles.titleInfo}> {props.strategyPL}</Text>
                    </Text>    
                </View>
            </View>)
            } 
        </View>
    );
}

const styles = StyleSheet.create({
    signal: {
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 10,
        padding: 10
    },
    title: {    
        fontSize: 15
    },
    titleContainer: {
        borderBottomColor: '#d9d9d9',
        borderBottomWidth: 1,
        marginBottom: 5
    },
    titleName: {
        color: Colors.accent
    },
    titleInfo: {
        color: Colors.primary
    },
    detailsContainer: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 5
    },
    stop: {
        color: 'white'
    },
    stopContainer: {
        backgroundColor: "#ff2b2b",
        borderRadius: 2,
        alignItems: 'center'
    },
    limit: {
        color: 'white'
    },
    limitContainer: {
        backgroundColor: Colors.primary,
        borderRadius: 2,
        alignItems: 'center'
    }
});

export default SignalItem;