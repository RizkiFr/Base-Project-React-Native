import React from 'react';
import { View, Text, StyleSheet, AsyncStorage, Image, Alert, Dimensions, ScrollView } from 'react-native';
import { color, style } from '_styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import moment from 'moment';
import HTML from 'react-native-render-html';
import { Button, Divider, Input } from '_atoms';
import Modal from 'react-native-modal';
import { Header } from 'react-navigation-stack';

export default class Promo extends React.Component {
    state = {
        voucher: '',
        loading: false,
        error: false,
        valid: false,
        data: {}
    }

    checkPromo = async () => {
        this.setState({ loading: true, error: false, valid: false })
        const voucher = this.state.voucher
        const nominal_rp = this.props.nominal
        const token = await AsyncStorage.getItem('token')
        axios.post(`/v2/voucher/check_voucher?token=${token}`, {
            voucher,
            nominal_rp
        }).finally(() => this.setState({ loading: false }))
            .then(res => {
                if (res.data.data.detail) {
                    this.setState({ data: res.data.data, valid: true })
                } else {
                    this.setState({ error: true })
                }
                console.log(res.data)
            }).catch(err => {
                console.log(err.response)
            })
    }

    promoResponse = () => {
        const data = this.state.data
        this.props.toggle()
        if (data.detail.max_pemakaian <= data.sudah_pakai) {
            setTimeout(() => {
                Alert.alert('Upps', 'Kamu sudah melebihi batas maksimal untuk menggunakan kode promo ini')
            }, 500)
        } else {
            this.props.setVoucher(data.detail.kode_voucher)
            setTimeout(() => {
                Alert.alert('', data.pesan)
            }, 500)
        }
    }

    validate = () => {
        const data = this.state.data
        // if (data.detail.max_pemakaian <= data.sudah_pakai) return false
        if (data.detail.expired_date <= moment().format('YYYY-MM-DD HH:mm:ss')) return true
        if (data.detail.minimum_pembayaran > this.props.nominal) return true
        return false
    }

    convertToRp = (val) => {
        if (val) {
            const rp = new Intl.NumberFormat('id-ID', {
            }).format(val)

            return 'Rp. ' + rp
        }
    }

    render() {
        const { data } = this.state
        return (
            <Modal
                isVisible={this.props.visible}
                style={{ margin: 0 }}
                swipeDirection='down'
                onBackdropPress={this.props.toggle}
                onBackButtonPress={this.props.toggle}
                onSwipeComplete={this.props.toggle}
            >
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={[styles.header, style.shadow]}>
                        <Icon name='times' size={24} onPress={this.props.toggle} />
                        <Text style={styles.textHeader}>Voucher Promo</Text>
                    </View>
                    <View style={styles.promoWraper}>
                        <Input placeholder='Masukan Kode Promo' onChangeText={(val) => this.setState({ voucher: val })} />
                        <Button style={{ width: 70, marginLeft: 10 }} loading={this.state.loading} disabled={this.state.loading} title='Cek' onPress={this.checkPromo} />
                    </View>
                    {
                        this.state.error ? <Text style={{ marginHorizontal: 10, color: 'red', fontWeight: 'bold' }}>Kode promo tidak tersedia</Text> : null
                    }
                    {
                        this.state.valid ?
                            <View style={{ flex: 1 }}>
                                <ScrollView style={{ flex: 1 }}>
                                    <Image source={{ uri: data.detail.foto }} style={{ height: 200, margin: 10 }} borderRadius={10} />
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>{data.detail.judul}</Text>
                                    <View style={{ padding: 10 }}>
                                        <HTML html={data.detail.deskripsi} imagesMaxWidth={Dimensions.get('window').width} />
                                    </View>
                                    <Divider />
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1, alignItems: 'center', borderBottomWidth: 1, borderRightWidth: 0.5, padding: 10, borderColor: color.g300 }}>
                                            <Text style={{ color: color.g700 }}>Berlaku Sampai</Text>
                                            <Text style={{ color: color.g700, fontWeight: 'bold' }}>{moment(data.detail.expired_date).locale('id').format('DD MMMM YYYY HH:mm')}</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'center', borderBottomWidth: 1, borderLeftWidth: 0.5, padding: 10, borderColor: color.g300 }}>
                                            <Text style={{ color: color.g700 }}>Minimum Transaksi</Text>
                                            <Text style={{ color: color.g700, fontWeight: 'bold' }}>{this.convertToRp(data.detail.minimum_pembayaran)}</Text>
                                        </View>
                                    </View>
                                </ScrollView>
                                <View style={{ padding: 10 }}>
                                    <Button title={'GUNAKAN'} disabled={this.validate()} onPress={this.promoResponse} />
                                </View>
                            </View> : null
                    }
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        padding: 5,
        marginVertical: 10,
        height: 35,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textBtn: {
        color: '#fff',
        fontWeight: 'bold'
    },
    wraper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: color.g200,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: color.g100,
        flex: 1
    },
    input: {
        flex: 1,
        borderRadius: 10,
        height: 40,
        color: color.g700,
        paddingHorizontal: 10
    },
    promoWraper: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
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
})