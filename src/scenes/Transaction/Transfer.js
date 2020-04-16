import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, Divider, Input } from '_atoms';
import { color, style } from '_styles';
import { convertToRp, convertFromRp, convertToGram } from '_utils';
import { PinModal } from '_molecules'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class Transfer extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Transfer',
        }
    }
    constructor(props) {
        super(props),
            this.state = {
                modalPin: false,
                loading: false,
                nominal: '',
                destination: ''

            }
    }
    onComplete = (pin) => {
        this.setState({ modalPin: false })
        setTimeout(() => {
            this.transfer(pin)
        }, 500)
    }

    transfer = async (pin) => {
        const token = await AsyncStorage.getItem('token')
        const { nominal, destination } = this.state
        this.setState({ loading: true })
        axios.post(`/shariacoin/transfer_anggota/token=${token}`,
            {
                'pin': pin,
                'gram': nominal,
                'username': destination,
            },
        ).finally(() => this.setState({ loading: false })
        ).then(res => {
            console.log(res.data)
            // if (res.data.response.status == 'Transaksi Menunggu Pembayaran') {
            //     this.props.navigation.navigate('BankInvoice', { data: res.data.response, bankSelected })
            // } else {
            //     Alert.alert('', res.data.response.pesan)
            // }
        }).catch(err => {
            console.log(err.response)
            Alert.alert('', err.response.data.message)
        })
    }

    render() {
        const { modalPin, loading, nominal, destination } = this.state
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, padding: 10 }}>
                    <Card style={styles.flexRow}>
                        <View>
                            <Text style={styles.title}>Saldo Emas</Text>
                            <Text style={styles.value}>{convertToGram(this.props.wallet.emas)} gram</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.title}>Harga Beli</Text>
                            <Text style={styles.value}>{convertToRp(parseInt(this.props.gold.harga_beli))}</Text>
                        </View>
                    </Card>
                    <Divider style={{ marginBottom: 10 }} />
                    <Card>
                        <Input value={destination} label='Email/No Tujuan' onChangeText={(v) => this.setState({ destination: v })} keyboardType='email-address' placeholder='***@gmail.com' />
                        <Input value={nominal} label='Nominal (gram)' subtitle='*Minimal 0.01 gram' onChangeText={(v) => this.setState({ nominal: v })} keyboardType='number-pad' placeholder='0 gram' />
                    </Card>
                </View>
                <View style={styles.footer}>
                    <Button title='Bayar' loading={loading} disabled={loading || nominal>0.01} onPress={() => this.setState({ modalPin: true })} />
                </View>
                <PinModal visible={modalPin} toggle={() => this.setState({ modalPin: false })} onComplete={this.onComplete} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        color: color.g900
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    footer: {
        backgroundColor: '#fff',
        padding: 10,
        borderTopWidth: 1,
        borderColor: color.g300
    },
})


const mapStateToProps = state => {
    return {
        user: state.user.data,
        wallet: state.user.wallet,
        gold: state.user.gold,
        silver: state.user.silver,
    }
}

export default connect(mapStateToProps)(Transfer);