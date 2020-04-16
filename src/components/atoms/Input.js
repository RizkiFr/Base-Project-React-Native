import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { color } from '_styles';

Icon.loadFont()


const Input = (props) => {
    return (
        <>
            {
                props.label ? <Text style={styles.label}>{props.label}</Text> : null
            }
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.wraper}>
                    <TextInput onChangeText={props.onChangeText} placeholder={props.placeholder} style={styles.input} secureTextEntry={props.password} {...props} />
                    {
                        props.icon ? <Icon name={props.icon} onPress={props.onIconPress} color={color.g400} size={20} style={styles.icon} /> : null
                    }
                </View>
            </View>
            {
                props.subtitle? <Text style={styles.subtitle}>{props.subtitle}</Text> : null
            }
        </>
    )
}

const styles = StyleSheet.create({
    wraper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: color.g300,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        flex: 1
    },
    input: {
        flex: 1,
        borderRadius: 10,
        height: 40,
        color: color.g700,
        paddingHorizontal: 10
    },
    icon: {
        padding: 10
    },
    label:{
        fontSize: 12,
        fontWeight: 'bold',
        color: color.g800,
        marginTop: 5,
        marginLeft: 5
    },
    subtitle:{
        fontSize: 10,
        color: color.g500,
        marginLeft: 5
    }
})

export default Input