import React,{ Component } from 'react';
import { PermissionsAndroid, StyleSheet, StatusBar, AsyncStorage, Text, Alert, TouchableOpacity, TextInput, View } from 'react-native';

import firebase from 'firebase';
import LinearGradient from 'react-native-linear-gradient';

import User from '../User';

export default class LoginScreen extends Component {
  static navigationOptions = {
      header : null,
  }

  state = {
    email: '',
    password: '',
    errorMessage: null
  }

  handleChange = (key) => val => {
    this.setState({ [key]: val });
  }

  handleLogin = async() => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then( async (response) => {
      await AsyncStorage.setItem('uid', response.user.uid)
      User.uid = response.user.uid
      this.props.navigation.navigate('App');
    })
    .catch(()=>{
      Alert.alert('Error','Please check again your email and password !')
    })

  }

  componentDidMount = async() => {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  }


  render() {
    return (
      <LinearGradient colors={['#EE4B60', '#EF5090']} style={styles.container}>
        <StatusBar backgroundColor="#EE4B60" barStyle="light-content" />
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>
        }
        <Text style={styles.title}>LOGIN</Text>
        <TextInput
        placeholder='email'
        style={styles.input}
        value={this.state.email}
        onChangeText={this.handleChange('email')}
        />
        <TextInput
        placeholder='Password'
        style={styles.input}
        value={this.state.password}
        secureTextEntry={true}
        onChangeText={this.handleChange('password')}
        />
        <TouchableOpacity style={styles.btnForm} onPress={this.handleLogin}>
          <Text style={{fontSize:12}}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
          
          <Text style={{color:'#FFF'}}>or Register </Text>
        </TouchableOpacity>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#FFF'
  },
  title:{
    margin:20,
    fontSize:18,
    fontWeight:'500',
    color:'#FFF'
  },
  input:{
    padding:10,
    borderWidth:1,
    borderColor:'#F1F1F1',
    backgroundColor:'#FFF',
    width:'90%',
    marginBottom:10,
    borderRadius:5
  },
  btnForm:{
    padding:10,
    borderWidth:1,
    borderColor:'#F1F1F1',
    backgroundColor:'#F5F5F5',
    width:'90%',
    alignItems:'center',
    marginBottom:10,
    borderRadius:5
  }
})