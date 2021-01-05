import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Text, Alert, Share} from 'react-native';
import { useSelector } from 'react-redux';
import storage from '@react-native-firebase/storage';
import Pdf from 'react-native-pdf';
import Colors from '../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import vars from '../evn';

const PdfViewerScreen = props => {
    const [url, setUrl] = useState();
    const getUrl = async () => {
        const link = await storage().ref(`${props.navigation.getParam('source')}`).getDownloadURL();
        setUrl(link);
    }

    useEffect(() => {
        getUrl();
    }, []);

    const deletePdf = async () => {
        const reference = storage().ref(`${props.navigation.getParam('source')}`);
        const update = props.navigation.getParam('updateList');
        try {
            const resData = await reference.delete();
        } catch (error) {
            Alert.alert(
                "An error occurred", 
                `${error}`, 
                [{text: "OK", onPress: ()=>{}, style: 'default'}]
            );
        }   
        update();
        props.navigation.navigate('TradingStrategies');
        Alert.alert("Pdf successfully deleted", "", [{text: "OK", onPress: ()=>{}, style: 'default'}]);
    } 

    const uId = useSelector(state => state.auth.userId);
    useEffect(() => {
        props.navigation.setParams({userId: uId});
        props.navigation.setParams({deletePdf: deletePdf});
    }, [uId]);

    const onShare = async () => {
        const link = await storage().ref(`${props.navigation.getParam('source')}`).getDownloadURL();
        try {
            Share.share({
                title: props.navigation.getParam('title'),
                message: `${link}`,
                url: link
            },);
        } catch (error) {
            Alert.alert("An error occurred", `${error}`, [{text: "OK", onPress: ()=> {}, style: 'default'}]);
        }
    }

    useEffect(() => {
        props.navigation.setParams({share: onShare});
    }, []);

    return(
        <View style={styles.container}>
        <Pdf
            source={{uri: `${url}`}}
            style={styles.pdf}
            cache={true}
        />
        </View>    
    );
}

PdfViewerScreen.navigationOptions = navData => {
    const title = navData.navigation.getParam('title');
    const userId = navData.navigation.getParam('userId');
    const deleteItem = navData.navigation.getParam('deletePdf');
    const share = navData.navigation.getParam('share');
    let enableAdding = false;
    if(userId === vars.admin) {
        enableAdding = true;
    }
    return {
        headerTitle: title,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        {enableAdding ? 
        <Item title="DeleteFile" iconName='md-trash' onPress={deleteItem}/> 
        : 
        <Item title="Share" iconName='md-share' onPress={share}/> 
        }
        </HeaderButtons>
    };
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },  
    title: {
        fontSize: 16,
        color: Colors.accent
    },  
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});

export default PdfViewerScreen;