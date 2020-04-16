import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { style, color } from '_styles';
import { convertToRp, convertToGram } from '_utils';
const TokenDenom =(props)=> {

    const renderNominal = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.denom, style.shadow, {backgroundColor: props.produk.denom == item.denom? color.p100 : '#fff'}]} onPress={() => props.onPress(item)}>
                <Text style={styles.title}>{item.denom}</Text>
                <Text style={{ color: '#616161' }}>{item.harga_rp}/</Text>
                <Text style={{ color: '#FBB829' }}>{item.harga_emas}</Text>
            </TouchableOpacity>
        )
    }
        return (
            <View>
                <FlatList
                    data={props.data}
                    keyExtractor={item => item.denom.toString()}
                    renderItem={renderNominal}
                    numColumns={2} />
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

export default TokenDenom;