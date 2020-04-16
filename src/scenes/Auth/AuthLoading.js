import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { color } from '_styles';
import { BarIndicator } from 'react-native-indicators';
import Axios from 'axios';
import { saveUser, saveWallet, getGoldPrice, getSilverPrice } from '_states/actions/user';
import { connect } from 'react-redux';

const AuthLoading = (props) => {

    useEffect(() => {
        AsyncStorage.getItem('bearer')
            .then(val => {
                Axios.defaults.headers.common['Bearer'] = val;
                Axios.defaults.baseURL = 'https://ibank.shariacoin.co.id/api';
                if (val) {
                    getData()
                    props.navigation.navigate('App')
                } else {
                    props.navigation.navigate('Auth')
                }
            })
    }, [])

    const getData = async () => {
        const token = await AsyncStorage.getItem('token')
        props.dispatch(saveWallet(token))
        props.dispatch(saveUser(token))
        props.dispatch(getGoldPrice(token))
        props.dispatch(getSilverPrice(token))
    }

    return (
        <View style={styles.wrap}>
            <BarIndicator color={'#fff'} size={30} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        backgroundColor: color.primary,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps)(AuthLoading);