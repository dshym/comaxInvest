import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    ActivityIndicator, 
    Alert, 
    Modal, 
    Button, 
    ScrollView, 
    Switch,
    Dimensions
} from 'react-native';
import Colors from '../constants/Colors';
import Gradient from '../components/Gradient';
import SignalItem from '../components/SignalItem';


const ComaxInvestSignalsScreen = props => {

    const [numberOfSignals, setNumberOfSignals] = useState('200');

    const [comaxAlgoBot, setComaxAlgoBot] = useState(true);
    const [MPKMG, setMPKMG] = useState(true);
    const [comaxGold, setComaxGold] = useState(true);
    const [privatePro, setPrivatePro] = useState(true);
    const [scalperComax, setScalperComax] = useState(true);
    const [comaxDriver, setComaxDriver] = useState(true);
    const [comaxGoldenEURUSD, setComaxGoldenEURUSD] = useState(true);
    const [comaxGoldenGBPUSD, setComaxGoldenGBPUSD] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);
    const [signals, setSignals] = useState();
    const [filteredSignals, setFilteredSignals] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isError, setIsError] = useState(false);
    // const timeout = setTimeout(()=>{
    //     Alert.alert(
    //         "Error", 
    //         "Failed to load the signals, maybe try to check your internet connection.",
    //         [{text: "OK", onPress: ()=>{props.navigation.navigate('Analitics');}, style: 'default'}]
    //     );
    //     clearTimeout(timeout);
    // }, 10000);
    const getSignals = async () => {  
        setIsLoading(true);
        setIsRefreshing(true);
        try {
            const response = await fetch(`http://marketsignals.info/signals?count=${numberOfSignals}`);
            const resData = await response.json();
            setSignals(resData);
            setFilteredSignals(resData);
        }
        catch (error) {
            if(error) {
                setIsError(true);
                setIsRefreshing(false);
                setIsLoading(false);
            }
        }
        setIsRefreshing(false);
        setIsLoading(false);   
    }

    useEffect(() => {
        getSignals();
    }, []);

    const filterSignals = async () => {
        setIsLoading(true);
        let filteredSignals = [];
        signals.forEach(element => {
            if(comaxAlgoBot && element.signal.strategy === 'Comax Algo Bot') {
                filteredSignals.push(element);
                return;
            }
            if(MPKMG && element.signal.strategy === 'MPKMG') {
                filteredSignals.push(element);
                return;
            }
            if(comaxGold && element.signal.strategy === 'Comax Gold') {
                filteredSignals.push(element);
                return;
            }
            if(privatePro && element.signal.strategy === 'Private pro') {
                filteredSignals.push(element);
                return;
            }
            if(scalperComax && element.signal.strategy === 'Scalper Comax') {
                filteredSignals.push(element);
                return;
            }
            if(comaxDriver && element.signal.strategy === 'Comax Driver') {
                filteredSignals.push(element);
                return;
            }
            if(comaxGoldenEURUSD && element.signal.strategy === 'Comax Golden EURUSD') {
                filteredSignals.push(element);
                return;
            }
            if(comaxGoldenGBPUSD && element.signal.strategy === 'Comax Golden GBPUSD') {
                filteredSignals.push(element);
                return;
            }

        });
       
        setFilteredSignals(filteredSignals);
        if(modalVisible) {
            setModalVisible(!modalVisible);
        }
        setIsLoading(false);
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

    if(isLoading) {
        return(
            <Gradient style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </Gradient>
        );
    }

    if(isError) {
        return(
            <Gradient style={styles.centered}>
                <Text>Currently signals are not available.</Text>
            </Gradient>
        );
    }

    return (
        <Gradient>
            <View style={styles.buttonContainer}>
            <Button 
                title="Filters" 
                onPress={()=>{setModalVisible(true)}} 
                color={Colors.primary}
            />
            </View>
            
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                   setModalVisible(false)
                }}
            >
                <ScrollView>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>

                        <Text style={styles.modalTitle}>Trading strategies</Text>
                        <View style={styles.switches}>
                        <View style={styles.switchContainer}>
                        <Text style={styles.modalText}>Comax Algo Bot</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: Colors.primary }}
                            thumbColor={"white"}
                            value={comaxAlgoBot}
                            onValueChange={()=>{setComaxAlgoBot(!comaxAlgoBot)}}
                        />
                        </View>
                        <View style={styles.switchContainer}>
                        <Text style={styles.modalText}>MPKMG</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: Colors.primary }}
                            thumbColor={"white"}
                            value={MPKMG}
                            onValueChange={()=>{setMPKMG(!MPKMG)}}
                        />
                        </View>
                        <View style={styles.switchContainer}>
                        <Text style={styles.modalText}>Comax Gold</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: Colors.primary }}
                            thumbColor={"white"}
                            value={comaxGold}
                            onValueChange={()=>{setComaxGold(!comaxGold)}}
                        />
                        </View>
                        <View style={styles.switchContainer}>
                        <Text style={styles.modalText}>Private Pro</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: Colors.primary }}
                            thumbColor={"white"}
                            value={privatePro}
                            onValueChange={()=>{setPrivatePro(!privatePro)}}
                        />
                        </View>
                        <View style={styles.switchContainer}>
                        <Text style={styles.modalText}>Scalper Comax</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: Colors.primary }}
                            thumbColor={"white"}
                            value={scalperComax}
                            onValueChange={()=>{setScalperComax(!scalperComax)}}
                        />
                        </View>
                        <View style={styles.switchContainer}>
                        <Text style={styles.modalText}>Comax Driver</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: Colors.primary }}
                            thumbColor={"white"}
                            value={comaxDriver}
                            onValueChange={()=>{setComaxDriver(!comaxDriver)}}
                        />
                        </View>
                        <View style={styles.switchContainer}>
                        <Text style={styles.modalText}>Comax Golden EURUSD</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: Colors.primary }}
                            thumbColor={"white"}
                            value={comaxGoldenEURUSD}
                            onValueChange={()=>{setComaxGoldenEURUSD(!comaxGoldenEURUSD)}}
                        />
                        </View>
                        <View style={styles.switchContainer}>
                        <Text style={styles.modalText}>Comax Golden GBPUSD</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: Colors.primary }}
                            thumbColor={"white"}
                            value={comaxGoldenGBPUSD}  
                            onValueChange={()=>{setComaxGoldenGBPUSD(!comaxGoldenGBPUSD)}} 
                        />
                        </View>
                        </View>
                        
                        <View style={styles.modalButtonContainer}>
                             <Button 
                                title="Set filters" 
                                onPress={filterSignals} 
                                color={Colors.primary}/>
                        </View>
                        
                        </View>
                </View>
                </ScrollView>
            </Modal>
            
            <FlatList 
                data={filteredSignals}
                extraData
                onRefresh={filterSignals}
                refreshing={isRefreshing}
                keyExtractor={item => item.id}
                renderItem={itemData => 
                    <SignalItem 
                        allSignals={signals}
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
    },
    buttonContainer: {
        marginHorizontal: 10,
        marginVertical: 5
    }, 
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: Dimensions.get('window').height * 0.2
    },  
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        width: '90%',
        elevation: 5,
        backgroundColor: '#ededed',
        borderColor: '#ccc',
        borderWidth: 1
    },
    modalTitle: {
        fontSize: 20,
        color: 'black'
    },  
    modalText: {
        fontSize: 16,
        color: 'black'
    },
    modalButtonContainer: {
        width: '90%',
        margin: 10
    },
    switches: {
        width: '90%'
    },  
    switchContainer: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       marginVertical: 5
    }
});

export default ComaxInvestSignalsScreen;