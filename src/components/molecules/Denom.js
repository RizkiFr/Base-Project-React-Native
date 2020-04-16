import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableHighlight } from 'react-native';
import { convertToRp } from '_utils';
import { color, style} from '_styles';

const Denom = (props) => {

    const renderNominal = ({ item }) => {
        const nominal = item * props.buyPrice
        return (
            <TouchableHighlight underlayColor='transparent' onPress={() => props.onPress(item)}>
                <View style={[styles.denom, style.shadow, { backgroundColor: props.selected == nominal ? color.p100 : '#fff' }]}>
                    <Text style={{ color: '#FBB829', fontWeight: 'bold' }}>{item} gram</Text>
                    <Text style={{ color: '#616161' }}>{convertToRp(nominal)}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    return (
        <View style={styles.wraper}>
            <FlatList
                data={props.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderNominal}
                numColumns={2}
            />
        </View>
    )
}

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    wraper:{
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: -5
    },
    denom:{
        width: (width - 30) / 2,
        borderRadius: 5,
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 0.2,
        borderColor: '#a9a9a9',
        margin: 5,
    }
})

export default Denom;