import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { 
    View, 
    StyleSheet,
    ScrollView, 
    KeyboardAvoidingView, 
    TouchableNativeFeedback,
    Keyboard,
    Button,
    Alert,
    ActivityIndicator
} from 'react-native';

import Gradient from '../../components/Gradient';
import Input from '../../components/Input'; 
import Colors from '../../constants/Colors';

import { useDispatch } from 'react-redux';
import * as videoAction from '../../store/actions/video';

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

const AddVideoScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
          title: '',
          link: '',
          description: ''
        },
        inputValidities: {
          title: false,
          link: false,
          description: false
        },
        formIsValid: false
      });

    useEffect(() => {
        if (error) {
          Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the form.', [
              { text: 'Okay' }
            ]);
            return;
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch (
                videoAction.addVideo(
                    formState.inputValues.title,
                    formState.inputValues.link,
                    formState.inputValues.description,
                )
            );
            props.navigation.goBack();
        } catch (error) {
            setError(error.message);
        }

        setIsLoading(false);
    }, [dispatch, formState]);

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

    if (isLoading) {
        return (
            <Gradient>
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            </Gradient>
        );
    }  

    return (
        <Gradient>
            <KeyboardAvoidingView 
                style={{ flex: 1 }}
                behavior="height"
            >
                <TouchableNativeFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <View style={styles.form}>
                    <Input
                        id="title"
                        label="Title"
                        errorText="Please enter a valid title."
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        initiallyValid={true}
                        required
                    />
                    <Input
                        id="link"
                        label="Link"
                        errorText="Please enter a valid link."
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        initiallyValid={true}
                        required
                    />
                    <Input
                        id="description"
                        label="Description"
                        errorText="Please enter a valid description."
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        initiallyValid={true}
                        required
                        minLength={5}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Add" color={Colors.primary} onPress={submitHandler}/>
                    </View>
                    </View>
                </ScrollView>
                </TouchableNativeFeedback>
            </KeyboardAvoidingView>
        </Gradient>
    );
};


const styles = StyleSheet.create({
    form: {
        margin: 10
    },
    buttonContainer: {
        marginTop: 10
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default AddVideoScreen;