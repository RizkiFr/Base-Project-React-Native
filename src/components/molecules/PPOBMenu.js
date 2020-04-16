import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, Image, Dimensions } from 'react-native';
import { color } from '_styles';

const PPOBMenu = (props) => {

    const renderItem = ({ item }) => {
        return (
            <TouchableHighlight underlayColor='transparent' onPress={()=>props.navigate(item.route, item.param)}>
                <View style={styles.menu}>
                    <Image source={item.icon} style={styles.icon} />
                    <Text style={{color: color.g700}}>{item.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    return (
        <View style={styles.wraper}>
            <FlatList
                data={data}
                keyExtractor={item => item.name}
                renderItem={renderItem}
                numColumns={4} />
        </View>
    )
}

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    wraper: {
        padding: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -40,
        backgroundColor: '#fff',
    },
    icon:{
        width: (width-50)/8,
        height: (width-50)/8,
    },
    menu:{
        alignItems: 'center',
        margin: 5,
        width: (width-50)/4,
        height: (width-50)/4,
        justifyContent: 'center'
    }
})


const data = [
    {
        name: 'Pulsa',
        icon: require('_assets/icons/pulsa.png'),
        route: 'Pulsa',
        param: {type: 'Pulsa' }
    },
    {
        name: 'GoPay',
        icon: require('_assets/icons/gopay.png'),
        route: 'Pulsa',
        param: {type: 'GoPay'}
    },
    {
        name: 'OVO',
        icon: require('_assets/icons/ovo.png'),
        route: 'Pulsa',
        param: {type: 'OVO'}
    },
    {
        name: 'Listrik',
        icon: require('_assets/icons/listrik.png'),
        route: 'Listrik',
        param: {}
    },
]

export default PPOBMenu;