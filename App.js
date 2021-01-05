import React from 'react';
import { StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import SignalsNavigator from './navigation/MainNavigator';
import authReducer from './store/reducers/auth';
import videoReducer from './store/reducers/video';
enableScreens();

const rootReducer = combineReducers({
  videos: videoReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <SignalsNavigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});