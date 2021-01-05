// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

const authenticate = (userId, token) => {
    return disptach => {
      disptach({ type: AUTHENTICATE, userId: userId, token: token});
    };
  };

export const signup = (email, password) => {
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
        //console.log(resData);
        dispatch(authenticate(resData.localId, resData.idToken));
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
        //console.log(resData);
        dispatch(authenticate(resData.localId, resData.idToken));
    };
};

export const logout = () => {
    return { type: LOGOUT };
};  