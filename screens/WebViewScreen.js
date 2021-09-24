import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import Gradient from '../components/Gradient';
import Colors from '../constants/Colors';

const WebViewScreen = props => {
    const [link, setLink] = useState();

    useEffect(() => {
        let link = props.navigation.getParam('link');
        setLink(link);   
    }, []);
    return (
       
        <WebView 
            source={{ uri: link }} 
            startInLoadingState={true}
            renderLoading={() => <Gradient>
                <ActivityIndicator 
                size="large" 
                color={Colors.primary} 
                style={styles.centered}
                />
            </Gradient> 
            }
            onError={syntheticEvent=>{
                const { nativeEvent } = syntheticEvent;
                if(nativeEvent.description === 'net::ERR_INTERNET_DISCONNECTED') {
                    Alert.alert(
                        'An error occurred', 
                        'Check your internet connection and try again.', 
                        [{text: 'OK', onPress: ()=>{props.navigation.navigate('BankingSignals')}}]
                    );
                } else {
                    Alert.alert(
                        'An error occurred', 
                        `${nativeEvent.description}`,
                        [{text: 'OK', onPress: ()=>{props.navigation.navigate('BankingSignals')}}]
                    );
                }
                
            }}
        />
        
    );
}

WebViewScreen.navigationOptions = navData => {
    const title = navData.navigation.getParam('title');
    return {
        headerTitle: title
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default WebViewScreen;