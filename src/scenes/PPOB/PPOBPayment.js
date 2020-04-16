import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { Card, Button, Divider } from '_atoms';
import { color } from '_styles';
import { PinModal } from '_molecules'
import { convertToRp, convertToGram } from '_utils';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

class PPOBPayment extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Konfirmasi Pembelian',
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            pembayaran: '',
            modalPin: false,
            loading: false

        };
    }

    onComplete = (pin) => {
        this.setState({ modalPin: false })
        setTimeout(() => {
            this.pay(pin)
        }, 500)
    }

    pay = async (pin) => {
        const pembayaran = this.state.pembayaran
        const { phone, produk } = this.props.navigation.state.params
        const token = await AsyncStorage.getItem('token')
        this.setState({ loading: true })
        axios.post(`/spending/ppob?token=${token}`, {
            'pin': pin,
            'idpel': phone,
            'pembayaran': pembayaran,
            'produk': produk.nama_paket,
        }).finally(() => this.setState({ loading: false })
        ).then(res => {
            if (res.data.response.status === 'Transaksi Berhasil') {
                this.props.navigation.navigate('WadiahInvoice', { data: res.data.response })
            } else {
                Toast.show(res.data.response.pesan, Toast.LONG);
            }
        }).catch(err => {
            Toast.show(err.response.data.message, Toast.LONG);
        })
    }

    render() {
        const { pembayaran, modalPin, loading } = this.state
        const state = this.props.navigation.state.params
        return (
            <View style={{ flex: 1, padding: 10 }}>
                <View style={{ flex: 1 }}>
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
                    <Divider />
                    <Text style={{marginVertical: 10, fontWeight: 'bold', color: color.g900}}>Detail Transaksi</Text>
                    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>Jenis Layanan</Text>
                            <Text style={styles.title}>Nomor Tujuan</Text>
                            <Text style={styles.title}>Harga Rupiah</Text>
                            <Text style={styles.title}>Harga Emas</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Text style={[styles.value]}>{state.produk.nama_paket}</Text>
                            <Text style={[styles.value]}>{state.phone}</Text>
                            <Text style={[styles.value]}>{convertToRp(state.produk.harga_rp)}</Text>
                            <Text style={[styles.value]}>{state.produk.harga_gram} gram</Text>
                        </View>
                    </View>
                    <Divider />
                    <View>
                        <Text style={{ fontWeight: 'bold', color: color.g900, marginTop: 10 }}>Metode Pembayaran</Text>
                        <View style={{ paddingVertical: 10 }}>
                            <Card style={{ backgroundColor: pembayaran == 'wadiah' ? color.p100 : '#fff' }} onPress={() => this.setState({ pembayaran: 'wadiah' })}>
                                <Text style={[styles.title, { fontWeight: 'bold' }]}>Wadiah</Text>
                                <Text style={[styles.title, { fontSize: 12 }]}>Pilihan pembayaran dengan melalui potong Saldo Wadiah atau saldo Rupiah. Pastikan nilai saldo Wadiah anda mencukupi atau lebih besar dari nilai pembayaran rupiah yang dipilih.</Text>
                            </Card>
                            <Card style={{ backgroundColor: pembayaran == 'emas' ? color.p100 : '#fff' }} onPress={() => this.setState({ pembayaran: 'emas' })}>
                                <Text style={[styles.title, { fontWeight: 'bold' }]}>Emas</Text>
                                <Text style={[styles.title, { fontSize: 12 }]}>Pilihan pembayaran dengan melalui potong Saldo Emas Reguler, nilai gram yang dipotong akan sesuai dengan jumlah gram yang tertera, equivalent dengan harga rupiah yang dipilih.</Text>
                            </Card>
                        </View>
                    </View>
                </View>
                <Button title='Bayar' loading={loading} disabled={loading || !pembayaran} onPress={() => this.setState({ modalPin: true })} />
                <PinModal visible={modalPin} toggle={() => this.setState({ modalPin: false })} onComplete={this.onComplete} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: color.g700,
        marginBottom: 5
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
})

const mapStateToProps = state => {
    return {
        user: state.user.data,
        wallet: state.user.wallet,
        gold: state.user.gold,
        silver: state.user.silver,
    }
}

export default connect(mapStateToProps)(PPOBPayment);