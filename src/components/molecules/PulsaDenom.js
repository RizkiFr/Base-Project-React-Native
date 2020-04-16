import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { style, color } from '_styles';
import { convertToRp, convertToGram } from '_utils';
const PulsaDenom =(props)=> {

    const renderNominal = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.denom, style.shadow, {backgroundColor: props.produk.nama_paket == item.nama_paket? color.p100 : '#fff'}]} onPress={() => props.onPress(item)}>
                <Text style={styles.title}>{item.nama_paket.replace(`${props.provider}`, ``)}</Text>
                <Text style={{ color: '#616161' }}>{convertToRp(item.harga_rp)}/</Text>
                <Text style={{ color: '#FBB829' }}>{item.harga_gram} gram</Text>
            </TouchableOpacity>
        )
    }

    const renderHeader = ({ item }) => {
        return (
            <View style={styles.imgWrapper}>
                <Image source={props.logo} style={{ width: 100, height: 50 }} resizeMode='contain' />
            </View>
        )
    }
        return (
            <View>
                <FlatList
                    data={props.data}
                    keyExtractor={item => item.id}
                    renderItem={renderNominal}
                    numColumns={2}
                    ListHeaderComponent={renderHeader} />
            </View>
        )
}

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    denom: {
        width: (width-30)/2,
        margin: 5,
        borderRadius: 5,
        padding: 10
    },
    title:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212121'
    },
    imgWrapper:{
        borderColor: '#a9a9a9',
        paddingHorizontal: 10,
        alignItems: 'center',
        marginVertical: 10
    }
})

export default PulsaDenom;