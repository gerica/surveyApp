import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { AppRegistry, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';

class SurveyApp extends Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.navigateBack);
  }

  navigateBack() {
    const navigatorState = store.getState().get('navigatorState');

    const currentStackScreen = navigatorState.get('index');
    const currentTab = navigatorState.getIn(['routes', 0, 'index']);

    if (currentTab !== 0 || currentStackScreen !== 0) {
      store.dispatch(NavigationActions.back());
      return true;
    }

    // otherwise let OS handle the back button action
    return false;
  }

  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
}


AppRegistry.registerComponent('surveyApp', () => SurveyApp);
