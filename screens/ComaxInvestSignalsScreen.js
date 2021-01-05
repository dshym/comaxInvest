import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import Colors from '../constants/Colors';
import Gradient from '../components/Gradient';

import SignalItem from '../components/SignalItem';


const ComaxInvestSignalsScreen = props => {
    const [signals, setSignals] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const getSignals = async () => {
        try {
            setIsLoading(true);
            setIsRefreshing(true);
            let response = await fetch('http://marketsignals.info/signals?count=10');
            const resData = await response.json();
            setSignals(resData);
            setIsLoading(false);
            setIsRefreshing(false);
        } catch (error) {
            Alert.alert(
                "An error occurred", 
                `${error}`, 
                [{text: "OK", onPress: ()=>{}, style: 'default'}]
            );
        }
    }

    useEffect(() => {
        
        getSignals();
        
    }, []);

    if(isLoading) {
        return(
            <Gradient style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </Gradient>
        );
    }

    const hasStopLevel = (param) => {
        if(!param) {
            return false;
        } else {
            return param.level;
        }
    }

    const hasTrailing = (param) => {
        if(!param) {
            return false;
        } else {
            return param.trailing;
        }
    }
    
    const hasLimit = (param) => {
        if(!param) {
            return false;
        } else {
            return param.level;
        }
    }

    return (
        <Gradient>
            <FlatList 
                data={signals}
                onRefresh={getSignals}
                refreshing={isRefreshing}
                keyExtractor={item => item.id}
                renderItem={itemData => 
                    <SignalItem 
                        timestamp={itemData.item.timestamp}
                        type={itemData.item.signal.type}
                        strategy={itemData.item.signal.strategy}
                        market={itemData.item.signal.market}
                        direction={itemData.item.signal.direction}
                        price={itemData.item.signal.price}
                        quantity={itemData.item.signal.quantity}
                        stopLevel={hasStopLevel(itemData.item.signal.stop)}
                        trailing={hasTrailing(itemData.item.signal.stop)}
                        limitLevel={hasLimit(itemData.item.signal.limit)}
                        openingPrice={itemData.item.signal.openingPrice}
                        profitLoss={itemData.item.signal.profitLoss}
                        strategyPL={itemData.item.signal.totalStrategyPL}
                    />
                }
            />
        </Gradient>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centered: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
});

export default ComaxInvestSignalsScreen;