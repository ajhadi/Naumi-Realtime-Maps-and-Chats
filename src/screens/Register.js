import React,{ Component } from 'react';
import { StyleSheet, StatusBar, AsyncStorage, Text, TouchableOpacity, TextInput, View } from 'react-native';
import firebase from 'firebase';
import LinearGradient from 'react-native-linear-gradient';

import User from '../User';

export default class RegisterScreen extends Component {
  static navigationOptions = {
      header : null,
  }

  state = {
    email: '',
    name: '',
    phone: '',
    password:'',
    avatar:'',
    latitude:'',
    longitude:'',
    errorMessage: null 
  }

  handleChange = (key) => val => {
    this.setState({ [key]: val });
  }

  handleSignUp = () => {
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(
        ({user}) => firebase.database().ref('users/' + user.uid).set({
          email: this.state.email,
          name: this.state.name,
          phone: this.state.phone,
          avatar:'https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg',
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        })
      )
      .then(() => this.props.navigation.navigate('Login'))
    // .then(({user})=> AsyncStorage.setItem('uid',user.uid))
    .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <LinearGradient colors={['#EE4B60', '#EF5090']}  style={styles.container}>
        <StatusBar backgroundColor="#EE4B60" barStyle="light-content" />
        {this.state.errorMessage &&
        <Text style={{ color: 'red' }}>
        {this.state.errorMessage}
        </Text>}
        <Text style={styles.title}>REGISTER</Text>
        <TextInput
        placeholder='Name'
        style={styles.input}
        autoCapitalize="none"
        value={this.state.name}
        onChangeText={this.handleChange('name')}
        />

        <TextInput
        placeholder='Email'
        style={styles.input}
        autoCapitalize="none"
        value={this.state.email}
        onChangeText={this.handleChange('email')}
        />

        <TextInput
        placeholder='Phone Number'
        style={styles.input}
        keyboardType='number-pad'
        autoCapitalize="none"
        value={this.state.phone}
        onChangeText={this.handleChange('phone')}
        />

        <TextInput
        placeholder='Password'
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        value={this.state.password}
        onChangeText={this.handleChange('password')}
        />

        <TouchableOpacity style={styles.btnForm} onPress={this.handleSignUp}>
          <Text style={{fontSize:12}}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
          <Text style={{color:'#FFF'}}> Already have an account? Login </Text>
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