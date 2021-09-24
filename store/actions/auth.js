import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (userId, token) => {
    return disptach => {
      disptach({ type: AUTHENTICATE, userId: userId, token: token});
    };
};

export const signup = (name, tel, email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3R8jyTq4Z_U7OxJjZdaT7MOH2Mv5Huqg',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if(!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong.';
            if(errorId === 'EMAIL_EXISTS') {
                message = 'This email exists already.';
            }
            throw new Error(message);
        }

        const resData = await response.json();

        try {
            database().ref(`/users/${resData.localId}`).set({
                name: name,
                phoneNumber: tel,
                email: resData.email,
            });
        } catch (error) {
            throw new Error(error);
        }
        
        dispatch(authenticate(resData.localId, resData.idToken));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3R8jyTq4Z_U7OxJjZdaT7MOH2Mv5Huqg',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if(!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong.';
            if(errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found.';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'Invalid password.';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        dispatch(authenticate(resData.localId, resData.idToken));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
        
    };
};

export const logout = () => {
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
};  

const saveDataToStorage = async (token, userId, expirationDate) => {
    await AsyncStorage.setItem('userData', JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    }));
  }