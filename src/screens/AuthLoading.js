import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  AsyncStorage,
  View,
} from 'react-native';
import { 
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID
} from 'react-native-dotenv';

import firebase from 'firebase';

import User from'../User';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      uid:''
    }
    this._bootstrapAsync();
  }
 componentDidMount(){
    var firebaseConfig = {
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
      databaseURL: DATABASE_URL,
      projectId: PROJECT_ID,
      storageBucket: "",
      messagingSenderId: MESSAGING_SENDER_ID,
      appId: APP_ID
    };
    
    if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    }
 }
 _bootstrapAsync =  async () => {
  await AsyncStorage.getItem('uid').then(response => 
    this.state.uid = response);
    this.props.navigation.navigate(this.state.uid ? 'App' : 'Auth');
};

  render() {
    return (
      <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
        <ActivityIndicator styl={{alignSelf:'center'}}/>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}