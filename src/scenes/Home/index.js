import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { MainMenu, PPOBMenu } from '_molecules';
import { color } from '_styles';

const Home = (props) => {

    const navigate=(route, param)=>{
        props.navigation.navigate(route, param)
    }

    return (
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
            <MainMenu user={props.user} wallet={props.wallet} navigate={navigate} />
            <PPOBMenu navigate={navigate} />
            <View style={{height: 800}} />
        </ScrollView>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.data,
        wallet: state.user.wallet
    }
}

export default connect(mapStateToProps)(Home);