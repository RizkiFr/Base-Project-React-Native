import React from 'react';
import { View } from 'react-native';
import { color, style } from '_styles';

export const Divider = (props) => {
    return (
        <View style={[{ height: 5, backgroundColor: color.g200, marginHorizontal: -10 }, props.style]} />
    )
}