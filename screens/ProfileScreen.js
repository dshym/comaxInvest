import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    Button, 
    ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import Input from '../components/Input';
import * as authActions from '../store/actions/auth';
import Colors from '../constants/Colors';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Gradient from '../components/Gradient';
import * as authAction from '../store/actions/auth';
import database from '@react-native-firebase/database';
import { useDispatch } from 'react-redux';
import vars from '../env';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues
      };
    }
    return state;
  };

const ProfileScreen = props => {
    const [error, setError] = useState();
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userName, setUserName] = useState();
    const [userPhone, setUserPhone] = useState();
    const [userEmail, setUserEmail] = useState();

    const uId = useSelector(state => state.auth.userId);
    const [userId, setUserId] = useState(uId);


    const getUserInfo = async () => {
        setIsLoading(true);
        if(userId === vars.admin) {
            setUserEmail("comax.invest.dev@gmail.com");
            setIsLoading(false);
            return;
        }
        let userInfo;
        await database().ref(`/users/${userId}`).once('value').then(snapShot => userInfo = snapShot.val());
        let {email, name, phoneNumber} = userInfo;
        setUserPhone(phoneNumber);
        setUserEmail(email);
        setUserName(name);
        props.navigation.setParams({userName: name, userPhone: phoneNumber, userEmail: email, userId: userId});
        setIsLoading(false);
    }
    if(userId) {
        useEffect(() => {
            getUserInfo();
        }, []);
    
    }
    const dispatch = useDispatch();
    
    const logout = () => {
        dispatch(authAction.logout());
        props.navigation.navigate({routeName: 'Signals', params: {
            logout: true
        }});
    }
     
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            name: '',
            tel: '',
            email: '',
            password: ''
        },
        inputValidities: {
            name: false,
            tel: false,
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if(error) {
            Alert.alert('An error occured.', error, [{text: 'Ok'}]);
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        if(isSignUp) {
            action = authActions.signup(
                formState.inputValues.name,
                formState.inputValues.tel,
                formState.inputValues.email, 
                formState.inputValues.password
            );
        } else {
            action = authActions.login(
                formState.inputValues.email, 
                formState.inputValues.password
            );
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate({routeName: 'Signals', params: {
                isReg: true
            }});
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }  
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
          dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },
        [dispatchFormState]
    );


    if(!uId) {
        return (
            <Gradient>
            <KeyboardAvoidingView style={styles.authScreen}>
            <ScrollView>
                <View style={styles.authInputContainer}>
                    {isSignUp ? <View><Input 
                        id="name"
                        label="Name"
                        keyboardType="default"
                        required
                        autoCapitalize="none"
                        errorText="Please enter a name we can call you."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                    />
                    <Input 
                        id="tel"
                        label="Phone number"
                        keyboardType="phone-pad"
                        required
                        autoCapitalize="none"
                        errorText="Please enter a phone number."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                    />
                    </View>
                    : 
                    <View></View>}
                    <Input 
                        id="email"
                        label="E-mail"
                        keyboardType="email-address"
                        required
                        email
                        autoCapitalize="none"
                        errorText="Please enter a valid e-mail address."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                    />
                    <Input 
                        id="password"
                        label="Password"
                        keyboardType="default"
                        secureTextEntry
                        required
                        minLength={5}
                        autoCapitalize="none"
                        errorText="Please enter a valid password."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                    />
                    <View style={styles.authButtonContainer}>
                        {isLoading ? 
                        (<ActivityIndicator size="small" color={Colors.primary}/>) 
                            : 
                        (<Button 
                            title={isSignUp ? 'Sign Up' : 'Login'} 
                            color={Colors.primary} 
                            onPress={authHandler}
                        />)}
                        <Button 
                            title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`} 
                            color={Colors.accent} 
                            onPress={()=> {
                                setIsSignUp(prevState => !prevState);
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        </Gradient>
        );
    }

    return (
        <Gradient>
            <View style={styles.screen}>
            <View style={styles.infoContainer}>
                {isLoading ? 
                    <ActivityIndicator size="small" color={Colors.primary}/> 
                :
                    <Text style={styles.title}>Wellcome, <Text style={styles.info}>{userName}</Text></Text>
                }
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>Phone</Text>
                    {isLoading ? 
                        <ActivityIndicator size="small" color={Colors.primary}/> 
                    : 
                        <Text style={styles.info}>{userPhone}</Text>
                    }
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>Email</Text>
                    {isLoading ? 
                        <ActivityIndicator size="small" color={Colors.primary}/> 
                    :
                        <Text style={styles.info}>{userEmail}</Text>
                    }
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    title="Log out"
                    color={Colors.accent}
                    onPress={logout}
                />
            </View>
        </Gradient>
       
    );
}

ProfileScreen.navigationOptions = navData => {
    const userName = navData.navigation.getParam('userName');
    const userPhone = navData.navigation.getParam('userPhone');
    const userEmail = navData.navigation.getParam('userEmail');
    const userId = navData.navigation.getParam('userId');
    let isEnabled = true;
    if(userId === vars.admin || userId === undefined) {
        isEnabled = false;
    }
    return {
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            {isEnabled ? <Item title="Edit" iconName='md-create' onPress={()=>{
                navData.navigation.navigate({routeName: 'EditProfile', params: {
                    userName: userName,
                    userPhone: userPhone,
                    userEmail: userEmail,
                    userId: userId
                }});
            }}/> 
            : 
                <Text></Text>
            }
            
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
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
    info: {
        fontSize: 18,
        color: 'black'
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'flex-end',
        margin: 10
    },
    authScreen: {
        flex: 1,
        justifyContent: 'center'
    },
    authInputContainer: {
        padding: 10
    },  
    authButtonContainer: {
        flex: 1,
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default ProfileScreen;