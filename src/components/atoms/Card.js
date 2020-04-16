import React from 'react';
import { TouchableHighlight, Text, StyleSheet, View } from 'react-native';
import { BallIndicator } from 'react-native-indicators';
import { color, style } from '_styles';


const Card = (props) => {
    return (
        <TouchableHighlight underlayColor='transparent' onPress={props.onPress} disabled={props.disabled} >
            <View style={[styles.wraper, props.style, style.shadow]}>
                {props.children}
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    wraper: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 10,
    }
})

export default Card