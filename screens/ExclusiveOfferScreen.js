import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert, Share } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import PdfViewer from '../components/PdfViewer';

import storage from '@react-native-firebase/storage';
import * as DocumentPicker from 'expo-document-picker';
import vars from '../evn';
import { useSelector } from 'react-redux';

const ExclusiveOfferScreen = props => {
    const uId = useSelector(state => state.auth.userId);
    useEffect(() => {
        props.navigation.setParams({userId: uId})
    }, [uId]);

    const [url, setUrl] = useState();
    const [fullPath, setFullPath] = useState();
    const reference = storage().ref("/Exclusive offer");
    
    const getUrl = async (link) => {
        const url = await storage().ref(`${link}`).getDownloadURL();
        setUrl(url);
    }
    
    const getPdf = () => {
        reference.list().then(res => {
            res.items.forEach(ref => {
                setFullPath(ref.fullPath);
                getUrl(ref.fullPath);
            })
        });
    }

    const getFullPath = () => {
        reference.list().then(res => {
            res.items.forEach(ref => {
                setFullPath(ref.fullPath);
                console.log(fullPath);
            })
        });            
    }

    const deleteFile = async () => {
        getFullPath();
        const deleteReference = storage().ref(`${fullPath}`);
        try {
            const resData = await deleteReference.delete();
        } catch (error) {
            return;
        }
    }

    const uploadFile = async () => {
        const pdfFile = await DocumentPicker.getDocumentAsync();
        const path  = pdfFile.uri;
        const uploadReference = storage().ref(`Exclusive offer/${pdfFile.name}`);
        try {
            const task = uploadReference.putFile(path);
            task.then(taskSnapshot => {
                Alert.alert(
                    "Upload successful", 
                    "Pdf uploaded.", 
                    [{text: "OK", onPress: ()=>{}, style: 'default'}]
                );
            })
        } catch (error) {
            return;
        }
    }

    const changeFile = () => {
       uploadFile();
       deleteFile();
    }
    

    

    const onShare = async () => {
        try {
            const res = Share.share({
                title: props.navigation.getParam('title'),
                message: `${url}`,
                url: url
            },);
        } catch (error) {
            Alert.alert("An error occurred", `${error}`, [{text: "OK", onPress: ()=> {}, style: 'default'}]);
        }
    }
    useEffect(() => {
        getPdf();
        props.navigation.setParams({changeFile: changeFile});
        props.navigation.setParams({share: onShare});
    },[url]);

    return (
        <PdfViewer url={url}/>
    );
}

ExclusiveOfferScreen.navigationOptions = navData => {
    const userId = navData.navigation.getParam('userId');
    const changeFile = navData.navigation.getParam('changeFile');
    const share = navData.navigation.getParam('share');
    let enableAdding = false;
    if(userId === vars.admin) {
        enableAdding = true;
    }
    return {
        headerTitle: 'Exclusive offer',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName='md-menu' onPress={()=>{
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            {enableAdding ? 
            <Item title="Edit" iconName='md-cloud-upload' onPress={changeFile}
            /> 
            : 
            <Item title="Share" iconName='md-share' onPress={share}/> 
            }
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ExclusiveOfferScreen;