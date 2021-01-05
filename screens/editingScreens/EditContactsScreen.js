import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Button, 
    KeyboardAvoidingView,
    Alert, 
    ActivityIndicator,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';
import database from '@react-native-firebase/database';
import Colors from '../../constants/Colors';
import Gradient from '../../components/Gradient';

const EditContactsScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState();
    const [locationName, setLocationName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [webpage, setWebpage] = useState();

    const getInitialState = async () => {
        let contacts;
        await database().ref('/contacts').once('value').then(snapShot => snapShot.forEach(
            childSnapshot => contacts = childSnapshot.val()
        ));
        
        let {location, email, phoneNumber, webpage, locationName} = contacts;
        setLocation(location);
        setPhone(phoneNumber);
        setEmail(email);
        setWebpage(webpage);
        setLocationName(locationName);
    }

    useEffect(() => {
        getInitialState();
    }, [])

    const inputHandler = async () => {
        setIsLoading(true);
        let hasData;
        let key;
        await database().ref('/contacts').once('value').then(snapShot => snapShot.forEach(
            childSnapshot => key = childSnapshot.key
        ));
        await database().ref('/contacts').once('value').then(snapShot => hasData = snapShot.hasChildren());
        if(hasData) {
            await database().ref(`/contacts/${key}`).update({
                email: email,
                location: location,
                phoneNumber: phone,
                webpage: webpage,
                locationName: locationName
            }).then( () => Alert.alert("Data updated", "Contacts updated successfully", [{text: "OK", onPress: ()=>{}, style: 'default'}]));
        } else {
            pushData();
        }
        setIsLoading(false);
    }

    const pushData = async () => {
        const newReference = database().ref('/contacts').push();
        try {
            await newReference.set(
                {
                    location: location,
                    phoneNumber: phone,
                    email: email,
                    webpage: webpage,
                    locationName: locationName
                }
                ).then(()=>console.log("data pushed"));
        } catch (error) {
            Alert.alert("An error occurred", `${error}`, [{text: "OK", onPress: ()=>{}, style:'default'}]);
        }
    }

    return (
        <Gradient>
            <KeyboardAvoidingView behavior="height">
                <TouchableWithoutFeedback>
                    <ScrollView>
                    <View style={styles.inputContainer}>  
                        <Text style={styles.title}>Location link:</Text>
                        <TextInput 
                            style={styles.input}
                            value={location}
                            onChangeText={text=>setLocation(text)}    
                        />
                    </View>
                    <View style={styles.inputContainer}>  
                        <Text style={styles.title}>Location display name:</Text>
                        <TextInput 
                            style={styles.input}
                            value={locationName}
                            onChangeText={text=>setLocationName(text)} 
                            numberOfLines={2}   
                        />
                    </View>
                    <View style={styles.inputContainer}>  
                        <Text style={styles.title}>Phone number:</Text>
                        <TextInput 
                            style={styles.input}
                            value={phone}
                            onChangeText={text=>setPhone(text)}   
                            keyboardType="phone-pad"
                        />
                    </View>
                    <View style={styles.inputContainer}>  
                        <Text style={styles.title}>Email:</Text>
                        <TextInput 
                            style={styles.input}
                            value={email}
                            onChangeText={text=>setEmail(text)}    
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={styles.inputContainer}>  
                        <Text style={styles.title}>Webpage:</Text>
                        <TextInput 
                            style={styles.input}
                            value={webpage}
                            onChangeText={text=>setWebpage(text)}    
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        {isLoading ? (<ActivityIndicator size="small" color={Colors.primary}/>) 
                        : 
                        (<Button title="Submit" onPress={pushData} color={Colors.primary}/>)
                        }
                    </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Gradient> 
    );
}

EditContactsScreen.navigationOptions = {
    headerTitle: "Edit contacts"
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },  
    title: {
        fontSize: 16,
        color: Colors.accent
    },  
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        padding: 1
    },
    inputContainer: {
        margin: 10
    },
    buttonContainer: {
        margin: 10
    }
});

export default EditContactsScreen;