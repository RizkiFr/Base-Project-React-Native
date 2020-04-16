import React from 'react';
import { View, Text, StyleSheet, Alert, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, Divider, Input } from '_atoms';
import { color, style } from '_styles';
import { Loading, PulsaDenom } from '_molecules'
import axios from 'axios';
import Contacts from 'react-native-contacts';

class Pulsa extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Pembelian ${navigation.getParam('type')}`,
        }
    }
    constructor(props) {
        super(props),
            this.state = {
                loading: false,
                phone: '',
                provider: '',
                logo: '',
                status: false,
                packet: [],
                produk: ''

            }
    }

    componentDidMount() {
        this.getPulsaPrice()
        this.checkStatus()
    }

    getPulsaPrice = () => {
        this.setState({ loading: true })
        axios.get(`/Shariacoin/get_merchant_paket/perak`)
            .finally(() => this.setState({ loading: false }))
            .then(res => {
                console.log(res.data.response)
                this.setState({ packet: res.data.response[1].paket })
            }).catch(err => {
                console.log(err.response)
            })
    }

    checkStatus = () => {
        const type = this.props.navigation.getParam('type')
        if (type == 'GoPay') {
            this.setState({ provider: 'SALDO/GJK', status: true, logo: require('_assets/icons/gopay.png') })
        } else if (type == 'OVO') {
            this.setState({ provider: 'SALDO/GRB', status: true, logo: require('_assets/icons/ovo.png') })
        }
    }

    getContact = () => {

        Contacts.getAll((err, contacts) => {
            if (err) {
                console.log(err)
            }
            console.log(contacts)
        })
    }

    autoProvider(phone) {
        this.setState({ phone })
        if (this.props.navigation.getParam('type') != 'Pulsa') return;
        if (phone.length >= 4) {
            phone = phone.slice(0, 4);
            if (
                phone == '0811' ||
                phone == '0812' ||
                phone == '0813' ||
                phone == '0821' ||
                phone == '0822' ||
                phone == '0823' ||
                phone == '0851' ||
                phone == '0852' ||
                phone == '0853'
            ) {
                this.setState({ provider: 'PULSA/TELKOMSEL', status: true, logo: require('_assets/icons/telkomsel.png') })
            }
            else if (
                phone == '0855' ||
                phone == '0856' ||
                phone == '0857' ||
                phone == '0858' ||
                phone == '0814' ||
                phone == '0815' ||
                phone == '0816'
            ) {
                this.setState({ provider: 'PULSA/INDOSAT', status: true, logo: require('_assets/icons/indosat.png') })

            }
            else if (
                phone == '0838' ||
                phone == '0831' ||
                phone == '0832' ||
                phone == '0833' ||
                phone == '0817' ||
                phone == '0818' ||
                phone == '0819' ||
                phone == '0859' ||
                phone == '0877' ||
                phone == '0878'
            ) {
                this.setState({ provider: 'PULSA/XL', status: true, logo: require('_assets/icons/xl.png') })
            }
            else if (
                phone == '0895' ||
                phone == '0896' ||
                phone == '0897' ||
                phone == '0898' ||
                phone == '0899'
            ) {
                this.setState({ provider: 'PULSA/THREE', status: true, logo: require('_assets/icons/three.jpg') })

            }
            else if (
                phone == '0881' ||
                phone == '0882' ||
                phone == '0883' ||
                phone == '0884' ||
                phone == '0885' ||
                phone == '0886' ||
                phone == '0887' ||
                phone == '0888' ||
                phone == '0889'
            ) {
                this.setState({ provider: 'PULSA/SMARTFREN', status: true, logo: require('_assets/icons/smartfren.png') })

            }
            else {
                this.setState({ provider: '', status: false, logo: '' })
            }
        } else {
            this.setState({ provider: '', status: false, logo: '' })
        }
    }

    render() {
        const { phone, produk, status, provider, logo, packet, loading } = this.state
        return (
            <View style={{ flex: 1 }} >
                <View style={{ flex: 1, padding: 5 }}>
                    <Card style={{ margin: 5 }}>
                        <Input value={phone} label='Nomor Telepon' icon='address-book' onChangeText={(v) => this.autoProvider(v)} keyboardType='number-pad' placeholder='0821XXXXXXXX' />
                    </Card>
                    <Divider style={{ marginBottom: 10 }} />
                    {
                        status ? <PulsaDenom provider={provider} produk={produk} logo={logo} data={packet.filter((x) => x.nama_paket.includes(provider))} onPress={(produk) => this.setState({ produk })} /> : null
                    }
                </View>
                <View style={styles.footer}>
                    <Button title='Selanjutnya' disabled={phone.length < 10 || !produk} onPress={() => this.props.navigation.navigate('PPOBPayment', { phone, produk })} />
                </View>
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
})


const mapStateToProps = state => {
    return {
        user: state.user.data,
        wallet: state.user.wallet,
        gold: state.user.gold,
        silver: state.user.silver,
    }
}

export default connect(mapStateToProps)(Pulsa);