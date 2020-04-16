import React from 'react';
import { View, ImageBackground, Dimensions, Image, StyleSheet, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { saveUser } from '_states/actions/user';
import { connect } from 'react-redux';
import { Button, Input } from '_atoms'
import { color } from '_styles';
import axios from 'axios';
import base64 from 'react-native-base64';

class Login extends React.Component {
    constructor(props){
        super(props),
        this.state={
            loading: false,
            email: 'rizkifr0497@gmail.com',
            password: 'empatdua97',
            token: ''
        }
    }

    login = async () => {
        const { loading, email, password, token } = this.state
        const user = await base64.encode(email + ':' + password)
        this.setState({loading: true})
        axios.get('https://ibank.shariacoin.co.id/api/shariacoin/get_token',
        {
            headers: {
                'User-Agent': 'shariacoin-api',
                'Auth': user,
            }
        }).finally(()=>
            this.setState({loading: false})
        ).then(async res=>{
            await AsyncStorage.multiSet([['token', res.data.token], ['bearer', res.data.bearer]])
            this.props.navigation.navigate('MiddleWare')
        }).catch(err=>{
            Alert.alert('', err.response.data.message)
            console.log(err.response)
        })
    }

    render() {
        const { loading, email, password } = this.state
        return (
            <ImageBackground source={require('_assets/images/bg.jpg')} style={{height: height}} resizeMode='cover'>
                <StatusBar hidden />
                <View style={styles.wraper}>
                    <Image source={require('_assets/images/logo.png')} style={styles.logo} resizeMode='contain' />
                    <Input value={email} placeholder='Email' icon='user' onChangeText={(email=>this.setState({email}))} />
                    <Input value={password} placeholder='Password' onChangeText={(password)=>this.setState({password})} icon='eye-slash' password />
                    <Button loading={loading} disabled={loading} title='LOGIN' onPress={this.login} style={{marginTop: 20}} />
                </View>
            </ImageBackground>
        )
    }
}

const { height } = Dimensions.get('screen')

const styles =StyleSheet.create({
    wraper:{
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    logo:{
        width: 120,
        height: 120,
        marginBottom: 50,
        alignSelf: 'center'
    }
})

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps)(Login);