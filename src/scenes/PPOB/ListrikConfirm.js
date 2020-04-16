import React from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, Divider, Input } from '_atoms';
import { color, style } from '_styles';
import { SelectPayment, PinModal, Loading } from '_molecules'
import { convertToRp, convertToGram } from '_utils';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

class ListrikConfirm extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Pembelian Listrik`,
        }
    }
    constructor(props) {
        super(props),
            this.state = {
                loading: false,
                data: props.navigation.getParam('data'),
                produk: props.navigation.getParam('produk'),
                pembayaran: {
                    'icon': require('_assets/icons/wadiah.png'),
                    'name': 'Wadiah',
                    'code': 'wadiah',
                },
                modalPayment: false,
                modalPin: false

            }
    }

    onComplete = (pin) => {
        this.setState({ modalPin: false })
        setTimeout(() => {
            this.pay(pin)
        }, 500)
    }

    pay = async (pin) => {
        this.setState({ loading: true })
        const { data, produk, pembayaran } = this.state
        const token = await AsyncStorage.getItem('token')
        axios.post(`/spending/ppob_tagihan?token=${token}`, {
            'produk': 'PLN/PREPAID',
            'pin': pin,
            'idpel': produk.idpel,
            'nominal': produk.denom,
            'traceId': data.traceId,
            'pembayaran': pembayaran.code,
        }).finally(() => this.setState({ loading: false })
        ).then(res => {
            if (res.data.response.status == 'Transaksi Gagal') {
                Toast.show(res.data.response.pesan, Toast.LONG)
            } else if (res.data.response.status === 'Transaksi Berhasil') {
                this.props.navigation.navigate('WadiahInvoice', { data: res.data.response })
            }
        }).catch(err => {
            Toast.show(err.response.data.message, Toast.LONG)
        })
    }

    render() {
        const { produk, data, loading, modalPayment, pembayaran, modalPin } = this.state
        return (
            <View style={{ flex: 1 }} >
                <View style={{ flex: 1, padding: 5 }}>
                    <Card style={styles.flexRow}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Text style={styles.title}>Saldo Wadiah</Text>
                            <Text style={styles.value}>{convertToRp(this.props.wallet.wadiah)}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.title}>Saldo Emas</Text>
                            <Text style={styles.value}>{convertToGram(this.props.wallet.emas)} gram</Text>
                        </View>
                    </Card>
                    <Divider style={{ marginBottom: 10 }} />
                    <View style={{ padding: 10 }}>
                        <Text style={[styles.title, { marginBottom: 10 }]}>PLN</Text>
                        <Text style={[styles.param, { fontWeight: 'bold' }]}>{data.ket1}</Text>
                        <Text style={[styles.param, { fontWeight: 'bold' }]}>{data.idpel}</Text>
                    </View>
                    <Divider style={{ marginBottom: 10 }} />
                    <Text style={[styles.title, { marginHorizontal: 10 }]}>Detail Transaksi</Text>
                    <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.param}>Nominal</Text>
                            <Text style={styles.param}>Harga Rupiah</Text>
                            <Text style={styles.param}>Harga Emas</Text>
                        </View>
                        <View>
                            <Text style={styles.value}>{produk.denom}</Text>
                            <Text style={styles.value}>{produk.harga_rp}</Text>
                            <Text style={styles.value}>{produk.harga_emas}</Text>
                        </View>
                    </View>
                    <Divider />
                    <Text style={[styles.title, { margin: 10 }]}>Metode Pembayaran</Text>
                    <Card style={styles.flexRow} onPress={() => this.setState({ modalPayment: true })}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={pembayaran.icon} style={{ height: 30, width: 50, marginRight: 10 }} resizeMode='contain' />
                            <Text style={styles.title}>{pembayaran.name}</Text>
                        </View>
                        <Icon name='chevron-right' />
                    </Card>
                </View>
                <View style={styles.footer}>
                    <Button title='Bayar' disabled={!produk} onPress={() => this.setState({ modalPin: true })} />
                </View>
                <PinModal visible={modalPin} toggle={() => this.setState({ modalPin: false })} onComplete={this.onComplete} />
                <SelectPayment onSelect={(pembayaran) => this.setState({ pembayaran })} selected={pembayaran} visible={modalPayment} toggle={() => this.setState({ modalPayment: false })} />
                <Loading isLoading={loading} />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        color: color.g900
    },
    footer: {
        backgroundColor: '#fff',
        padding: 10,
        borderTopWidth: 1,
        borderColor: color.g300
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5
    },
    value: {
        color: color.g700,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 5
    },
    param: {
        color: color.g700,
        marginBottom: 5
    }
})


const mapStateToProps = state => {
    return {
        user: state.user.data,
        wallet: state.user.wallet,
        gold: state.user.gold,
        silver: state.user.silver,
    }
}

export default connect(mapStateToProps)(ListrikConfirm);