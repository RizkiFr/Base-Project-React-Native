import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Denom } from '_molecules';
import { Card, Button, Divider } from '_atoms';
import { color, style } from '_styles';
import { convertToRp } from '_utils';
import { SelectBank, PinModal, PromoModal } from '_molecules'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

class Payment extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Pembayaran',
        }
    }
    constructor(props) {
        super(props),
            this.state = {
                modalPin: false,
                modalBank: false,
                loading: false,
                modalPromo: false,
                bankSelected: {
                    'icon': require('_assets/icons/bni.png'),
                    'name': 'Transfer Bank BNI',
                    'code': 'bni',
                },
                voucher: '',
                paymentMethod: ''
            }
    }
    onComplete = (pin) => {
        this.setState({ modalPin: false })
        setTimeout(() => {
            this.buyGold(pin)
        }, 500)
    }

    buyGold = async (pin) => {
        const nominal = this.props.navigation.getParam('nominal')
        const token = await AsyncStorage.getItem('token')
        const { bankSelected, voucher, paymentMethod } = this.state
        this.setState({ loading: true })
        axios.post(`/v2/transaksi/beli/emas?token=${token}`,
            {
                'pin': pin,
                'nominal': nominal,
                'pembayaran': paymentMethod== 'wadiah'? 'wadiah' : bankSelected.code,
                'voucher': voucher
            },
        ).finally(() => this.setState({ loading: false })
        ).then(res => {
            console.log(res.data.response)
            if(res.data.response.status=='Transaksi Menunggu Pembayaran'){
                this.props.navigation.navigate('BankInvoice', {data: res.data.response, bankSelected})
            }else if(res.data.response.status=='Transaksi Berhasil'){
                this.props.navigation.navigate('WadiahInvoice', {data: res.data.response})
            }
            else{
                Toast.show(res.data.response.pesan, Toast.LONG)
            }
        }).catch(err => {
            Toast.show(err.response.data.message, Toast.LONG)
        })
    }
    render() {
        const nominal = this.props.navigation.getParam('nominal')
        const { modalBank, bankSelected, modalPin, loading, modalPromo , voucher} = this.state
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: color.g100 }}>
                    <View style={styles.wrapper}>
                        <Card style={styles.flexRow}>
                            <Text style={styles.title}>Total Tagihan</Text>
                            <Text style={styles.value}>{convertToRp(nominal)}</Text>
                        </Card>
                        <Card onPress={() => this.setState({modalPromo: true})} style={styles.flexRow}>
                            <Text style={styles.title}>Gunakan Voucher Promo</Text>
                            <Icon name='ticket' color={color.primary} size={20} />
                        </Card>
                        {
                            voucher? <Text style={{fontSize: 12, color: color.g700}}>{`Kode voucher ${voucher} digunakan`}</Text> : null
                        }
                    </View>
                    <View style={styles.wadiah}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 12, color: color.g900 }}>Rekomendasi Pembayaran</Text>
                        <Card>
                            <View style={[styles.flexRow, styles.saldo]}>
                                <Text style={{ color: color.g700 }}>Saldo</Text>
                                <Text style={styles.title}>{convertToRp(parseInt(this.props.wallet.wadiah))}</Text>
                            </View>
                            <View style={styles.flexRow}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.subTitle}>Total Pembelian</Text>
                                    <Text style={styles.value}>{convertToRp(nominal)}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button title='Bayar' onPress={() => this.setState({ modalPin: true, paymentMethod: 'wadiah' })} />
                                </View>
                            </View>
                        </Card>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={[styles.title, { marginBottom: 10, fontSize: 12 }]}>Metode Pembayaran</Text>
                        <Card style={styles.flexRow} onPress={() => this.setState({ modalBank: true })}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={bankSelected.icon} style={{ height: 30, width: 50, marginRight: 10 }} resizeMode='contain' />
                                <Text style={styles.title}>{bankSelected.name}</Text>
                            </View>
                            <Icon name='chevron-right' />
                        </Card>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Button title='Bayar' loading={loading} disabled={loading} onPress={() => this.setState({ modalPin: true, paymentMethod: 'bank' })} />
                </View>
                <PromoModal nominal={nominal} setVoucher={(voucher)=>this.setState({voucher})} visible={modalPromo} toggle={()=>this.setState({modalPromo: !modalPromo})} />
                <SelectBank onSelect={(bankSelected) => this.setState({ bankSelected })} selected={bankSelected} visible={modalBank} toggle={() => this.setState({ modalBank: false })} />
                <PinModal visible={modalPin} toggle={() => this.setState({ modalPin: false })} onComplete={this.onComplete} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        color: color.g900
    },
    subTitle: {
        color: color.g700,
        fontSize: 12
    },
    value: {
        fontWeight: 'bold',
        color: color.primary
    },
    wadiah: {
        backgroundColor: color.p200,
        padding: 10
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    saldo: {
        borderBottomWidth: 1.5,
        paddingBottom: 10,
        marginBottom: 10,
        borderColor: color.g500
    },
    footer: {
        backgroundColor: '#fff',
        padding: 10,
        borderTopWidth: 1,
        borderColor: color.g300
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

export default connect(mapStateToProps)(Payment);