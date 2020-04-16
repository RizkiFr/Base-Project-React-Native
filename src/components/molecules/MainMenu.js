import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { color } from '_styles';
import { convertToRp, convertToGram } from '_utils';

const MainMenu = (props) => {

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.iconWraper} onPress={() => props.navigate(item.route, item.params)} >
                <Image source={item.icon} style={styles.icon} resizeMode='contain' />
                <Text style={[styles.iconText, { fontSize: 12 }]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }


    return (
        <View>
            <View style={styles.cardName}>
                <TouchableOpacity style={styles.nameWrapper}>
                    <Image source={{uri: props.user.foto?? 'https://kodim-0818.id/wp-content/uploads/2018/08/profile-icon.png'}} style={styles.ava} resizeMode='cover' />
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: color.g900 }}>{props.user.nama}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.walletWrapper}>
                    <Text style={{ color: color.g700 }}>Wadiah Balance</Text>
                    <Text style={{ color: color.g900, fontWeight: 'bold', fontSize: 18 }}>{convertToRp(props.wallet.wadiah)?? 0}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.wraper}>
                <View style={styles.asetWrap}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.iconText}>Asset Emas</Text>
                        <Text style={styles.iconText}>{convertToGram(props.wallet.emas)?? 0} gram</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.iconText}>Asset Perak</Text>
                        <Text style={styles.iconText}>{convertToGram(props.wallet.perak)?? 0} gram</Text>
                    </View>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.menu}>
                    <FlatList
                        data={menu}
                        keyExtractor={item => item.name}
                        renderItem={renderItem}
                        horizontal />
                </View>
            </View>
        </View>
    )
}

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    cardName:{
        flexDirection: 'row',
        height: 60,
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 10
    },
    nameWrapper:{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    walletWrapper:{
        justifyContent: 'center',
        alignItems: 'flex-end',
        zIndex: 1
    },
    wraper: {
        backgroundColor: color.primary,
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 50
    },
    ava:{
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 20
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        width: 50,
        height: 50,
        tintColor: '#fff'
    },
    iconWraper: {
        width: (width - 20) / 4,
        alignItems: 'center',
        padding: 5
    },
    iconText: {
        textAlign: 'center',
        color: '#fff'
    },
    divider:{
        height: 2,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        alignSelf: 'center',
        marginVertical: 10
    }

})

const menu = [
    {
        name: 'Beli Emas',
        icon: require('_assets/icons/buy-gold.png'),
        route: 'Purchase',
        params: {type: 'Emas'}
    },
    {
        name: 'Beli Perak',
        icon: require('_assets/icons/buy-silver.png'),
        route: 'Purchase',
        params: {type: 'Perak'}
    },
    {
        name: 'Kirim',
        icon: require('_assets/icons/kirim.png'),
        route: 'Transfer',
        params: {}
    },
    {
        name: 'Top Up',
        icon: require('_assets/icons/topup.png'),
        route: 'TopUp',
        params: {}
    },
]

export default MainMenu;