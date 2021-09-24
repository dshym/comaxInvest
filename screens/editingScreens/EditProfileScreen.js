import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Button, 
    ScrollView, 
    KeyboardAvoidingView, 
    Alert 
} from 'react-native';
import Gradient from '../../components/Gradient';
import Colors from '../../constants/Colors';
import validator from 'validator';
import database from '@react-native-firebase/database';

const EditProfileScreen = props => {
    const [userName, setUserName] = useState(props.navigation.getParam('userName'));
    const [userPhone, setUserPhone] = useState(props.navigation.getParam('userPhone'));
    const [userEmail, setUserEmail] = useState(props.navigation.getParam('userEmail'));
    const userId = props.navigation.getParam('userId');
    const submitHandler = () => {
        if(validator.isEmpty(userName)) {
            Alert.alert("Empty name", "Please enter name we can call you.", [{text: "OK"}]);
            return;
        }
        if(validator.isEmpty(userPhone)) {
            Alert.alert("Empty phone number", "Please enter phone number.", [{text: "OK"}]);
            return;
        }
        if(validator.isEmpty(userEmail)) {
            Alert.alert("Empty email", "Please enter phone email.", [{text: "OK"}]);
            return;
        }
        if(!validator.isMobilePhone(userPhone)) {
            Alert.alert("Invalid phone number", "Please enter a valid one.", [{text: "OK"}]);
            return;
        }
        if(!validator.isEmail(userEmail)) {
            Alert.alert("Invalid email", "Please enter a valid one.", [{text: "OK"}]);
            return;
        }
        try {
            database().ref(`/users/${userId}`).update({
                email: userEmail,
                name: userName,
                phoneNumber: userPhone
            }).then(() => Alert.alert(
                "Data updated", 
                "User data updated successfully",
                [{text: "OK", onPress: ()=> {props.navigation.navigate('Signals')}}]));
        } catch (error) {
            Alert.alert("An error occured", `${error}`, [{text: "OK"}]);
        }
    }

    return (
        <Gradient>
            <KeyboardAvoidingView behavior="height">
            <ScrollView>
            <View style={styles.screen}>
            <View style={styles.infoContainer}>
                    <Text style={styles.title}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={userName}
                        onChangeText={text=>setUserName(text)}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>Phone</Text>
                    <TextInput
                        style={styles.input}
                        value={userPhone}
                        onChangeText={text=>setUserPhone(text)}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={userEmail}
                        onChangeText={text=>setUserEmail(text)}
                    />
                </View>
            </View>
            <View style={styles.submitButtonContainer}>
            <Button
                title="Submit"
                onPress={submitHandler}
                color={Colors.primary}
            />
            </View>
            </ScrollView>
            </KeyboardAvoidingView>
        </Gradient>
    );
}

EditProfileScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Edit profile'
    }
}

const styles = StyleSheet.create({
    screen: {
        margin: 10
    },
    infoContainer: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        padding: 2,
        marginVertical: 8
    },  
    title: {
        fontSize: 16,
        color: Colors.accent
    },
    input: {
        padding: 1,
        fontSize: 18
    },
    submitButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
        margin: 10
    }
});

export default EditProfileScreen;