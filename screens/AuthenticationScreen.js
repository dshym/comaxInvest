import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Button,
    KeyboardAvoidingView, 
    ScrollView ,
    ActivityIndicator,
    Alert
} from 'react-native';

import { useDispatch } from 'react-redux';

import Input from '../components/Input';
import Colors from '../constants/Colors';
import Gradient from '../components/Gradient';

import * as authActions from '../store/actions/auth';

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

const AuthenticationScreen = props => {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
          email: '',
          password: ''
        },
        inputValidities: {
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

    return (
        <Gradient>
            <KeyboardAvoidingView style={styles.screen}>
            <ScrollView>
                <View style={styles.inputContainer}>
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
                    <View style={styles.buttonContainer}>
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

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center'
    },
    inputContainer: {
        padding: 10
    },  
    buttonContainer: {
        flex: 1,
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default AuthenticationScreen;