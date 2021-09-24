import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Card } from 'react-native-elements';
import Colors from '../constants/Colors';
import { LineChart } from 'react-native-chart-kit';

const SignalItem = props => {
    const [chartVisible, setChartVisible] = useState(false);
    const [chartData, setchartData] = useState([]);
    const allSignals = props.allSignals;
    const screenWidth = Dimensions.get("window").width * 0.9;
    useEffect(() => {
        const retriveData = () => {
            let data = [];
            allSignals.forEach(element => {
                if(element.signal.strategy === props.strategy) {
                    data.push(element.signal.price);
                }
            });
            setchartData(data);
        }
        retriveData();
    }, []);
    
    const data = {
        datasets: [
          {
            data: chartData,
            color:  () => `rgba(0, 178, 118, 1)`,
            strokeWidth: 2 // optional
          }
        ],
        legend: [`Dynamic of ${props.strategy} price`]
    };
    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 1) => `rgba(0, 178, 118, ${opacity})`,
        decimalPlaces: 3,
        propsForVerticalLabels: {fontSize: 10}
    };
    
    return (
        <View>
            {chartVisible ? (
                <TouchableOpacity 
                    activeOpacity={0.4} 
                    onPress={()=>setChartVisible(!chartVisible)}
                    style={{flex: 1, alignItems: 'center', marginVertical: 20}}
                >
                    <LineChart
                        data={data}
                        width={screenWidth}
                        height={200}
                        chartConfig={chartConfig}
                        verticalLabelRotation={15}
                        style={{
                            borderRadius: 10
                        }}
                    />
                </TouchableOpacity>
            ) : 
            (
        <Card containerStyle={styles.signal}>
            <TouchableOpacity activeOpacity={0.4} onPress={()=>setChartVisible(!chartVisible)}>
                
            <View>
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
            
            
            </TouchableOpacity>           
        </Card>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    signal: {
        borderRadius: 10,
        marginVertical: 20
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