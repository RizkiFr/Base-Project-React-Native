import React from 'react';
import { View, StyleSheet, Text, Image, FlatList, TouchableHighlight } from 'react-native';
import { Header } from 'react-navigation-stack';
import Modal from 'react-native-modal';
import { color, style } from '_styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '_atoms';

const SelectBank = (props) => {

    const renderBank = ({ item }) => {
        const selected = props.selected.name == item.name
        return (
            <TouchableHighlight underlayColor='transparent' onPress={()=>props.onSelect(item)}>
                <View style={styles.renderBank}>
                    <Image source={item.icon} style={{height: 30, width: 50}} resizeMode='contain' />
                    <Text style={{marginLeft: 10, color: selected? color.g900 : color.g700, fontWeight: selected? 'bold' : 'normal'}}>{item.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }
    return (
        <Modal
            isVisible={props.visible}
            style={{ margin: 0 }}
            swipeDirection='down'
            animationInTiming={500}
            animationOutTiming={400}
            onBackdropPress={props.toggle}
            onBackButtonPress={props.toggle}
            onSwipeComplete={props.toggle}
        >
            <View style={styles.wraper}>
                <View style={[styles.header, style.shadow]}>
                    <Icon name='times' size={24} onPress={props.toggle} />
                    <Text style={styles.textHeader}>Pilih Bank</Text>
                </View>
                <FlatList
                    data={bank}
                    keyExtractor={item => item.name}
                    renderItem={renderBank}
                />
                <Button title='Selesai' onPress={props.toggle} style={{margin: 10, marginBottom: 10}} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wraper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: Header.HEIGHT,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: color.g300,
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    textHeader: {
        marginLeft: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
    renderBank:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: color.g300,
        backgroundColor: '#fff'
    }
})

const bank = [
    {
        'icon': require('_assets/icons/wadiah.png'),
        'name': 'Wadiah',
        'code': 'wadiah',
    },
    {
        'icon': require('_assets/icons/buy-gold.png'),
        'name': 'Emas',
        'code': 'emas',
    },
]

export default SelectBank;