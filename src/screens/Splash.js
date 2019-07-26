import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export default class Splash extends Component {
    render (){
        return (
                <LinearGradient colors={['#EE4B60', '#EF5090']} style={styles.linearGradient}>
                    <StatusBar backgroundColor="#EE4B60" barStyle="light-content" />
                    <Image source={require('../assets/images/teaGlass.png')} style={styles.logoSplash}/>
                    <Text style={{color:'#FFF'}}>It's Tea Time</Text>
                </LinearGradient>
        );
    }

};

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    },
    logoSplash: {
        width: 100,
        height: 100,
    }
});
