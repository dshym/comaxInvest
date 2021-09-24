import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import storage from '@react-native-firebase/storage';

import * as DocumentPicker from 'expo-document-picker';
import Colors from '../../constants/Colors';
import Gradient from '../../components/Gradient';

const AddPdfScreen = props => {
    const [bytesTransferred, setBytesTransffered] = useState();
    const [totalBytes, setTotalBytes] = useState();
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const uploadPdf = async () => {
        const pdfFile = await DocumentPicker.getDocumentAsync();
        const path  = pdfFile.uri;
        const reference = storage().ref(`pdf/${pdfFile.name}`);
        setTitle(pdfFile.name);
        setIsLoading(true);
        try {
            const task = reference.putFile(path);
            task.on('state_changed', taskSnapshot => {
                setBytesTransffered((taskSnapshot.totalBytes/1048576).toFixed(2));
                setTotalBytes((taskSnapshot.totalBytes/1048576).toFixed(2));
            });
            task.then(taskSnapshot => {
                Alert.alert(
                    "Upload successful", 
                    "Pdf uploaded.", 
                    [{text: "OK", onPress: ()=>{}, style: 'default'}]
                );
            })
        } catch (error) {
            setIsLoading(false);
        }
    }

    return (
    <Gradient>
        <View style={styles.textContainer}>
            <Text style={styles.title}>Title: <Text style={{color: Colors.primary}}>{title}</Text></Text>
            <Text style={styles.title}>Transffered:</Text>
            {isLoading ? 
                <Text style={styles.title}> 
                    <Text style={{color: Colors.primary}}>{bytesTransferred} MB out of {totalBytes} MB</Text>
                </Text> 
            : 
            <Text></Text>}
        </View>
        <Button 
            title="Choose file" 
            color={Colors.primary} 
            onPress={uploadPdf}
        />
    </Gradient> 
    );
}

AddPdfScreen.navigationOptions = {
    headerTitle: 'Add Pdf'
}

const styles = StyleSheet.create({
    title:{
        fontSize: 16,
        color: Colors.accent
    },
    textContainer: {
        margin: 10
    }
});

export default AddPdfScreen;