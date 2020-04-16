import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/FontAwesome";
import ReactNativePinView from "react-native-pin-view";
import { Header } from 'react-navigation-stack';
import Modal from 'react-native-modal';
import { color, style } from '_styles';

const PinModal = (props) => {
    const pinView = useRef(null)
    const [showRemoveButton, setShowRemoveButton] = useState(false)
    const [enteredPin, setEnteredPin] = useState("")
    const [showCompletedButton, setShowCompletedButton] = useState(false)
    useEffect(() => {
        if (enteredPin.length > 0) {
            setShowRemoveButton(true)
        } else {
            setShowRemoveButton(false)
        }
        if (enteredPin.length === 6) {
            props.onComplete(enteredPin)
        }
    }, [enteredPin])
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
                    <Icons name='times' size={24} onPress={props.toggle} />
                    <Text style={styles.textHeader}>Pilih Bank</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ReactNativePinView
                        inputSize={32}
                        ref={pinView}
                        pinLength={6}
                        buttonSize={60}
                        onValueChange={value => setEnteredPin(value)}
                        buttonAreaStyle={{
                            marginTop: 24,
                        }}
                        inputAreaStyle={{
                            marginBottom: 24,
                        }}
                        inputViewEmptyStyle={{
                            backgroundColor: color.g300,
                        }}
                        inputViewFilledStyle={{
                            backgroundColor: color.primary,
                        }}
                        buttonViewStyle={{
                            borderWidth: 1,
                            borderColor: color.g800,
                        }}
                        buttonTextStyle={{
                            color: color.g800,
                        }}
                        onButtonPress={key => {
                            if (key === "custom_left") {
                                pinView.current.clear()
                            }
                        }}
                        customLeftButton={showRemoveButton ? <Icon name={"ios-backspace"} size={36} color={color.g800} /> : undefined}
                    />
                </View>
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
    renderBank: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: color.g300,
        backgroundColor: '#fff'
    }
})

export default PinModal;