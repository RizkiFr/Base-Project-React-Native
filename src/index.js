/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native'
import AppContainer from '_navigations';
import { Provider } from 'react-redux';
import store from '_states/store';
import { color } from '_styles';

const App: () => React$Node = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar backgroundColor={'#fff'} barStyle='dark-content' />
        <AppContainer />
      </Provider>
    </>
  );
};

export default App;
