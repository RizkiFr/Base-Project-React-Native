import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Alert, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Denom } from '_molecules';
import { Card, Button, Divider, Input } from '_atoms';
import { color, style } from '_styles';
import { convertToRp, convertFromRp } from '_utils';
import { SelectBank, PinModal } from '_molecules'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

class TopUp extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'TopUp',
        }
    }
    constructor(props) {
        super(props),
            this.state = {
                modalPin: false,
                modalBank: false,
                loading: false,
                bankSelected: {
                    'icon': require('_assets/icons/bni.png'),
                    'name': 'Transfer Bank BNI',
                    'code': 'bni',
                },
                nominal: ''
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
        const { bankSelected } = this.state
        this.setState({ loading: true })
        axios.post(`/shariacoin_pay/topup_wadiah?token=${token}`,
            {
                'pin': pin,
                'nominal': nominal,
                'pembayaran': bankSelected.code,
            },
        ).finally(() => this.setState({ loading: false })
        ).then(res => {
            console.log(res.data.response)
            if (res.data.response.status == 'Transaksi Menunggu Pembayaran') {
                this.props.navigation.navigate('BankInvoice', { data: res.data.response, bankSelected })
            }else {
                Toast.show(res.data.response.pesan, Toast.LONG)
            }
        }).catch(err => {
            Toast.show(err.response.data.message, Toast.LONG)
        })
    }

    renderDenom = ({ item }) => {
        return (
            <TouchableHighlight underlayColor='transparent' onPress={()=>this.setState({nominal: item})}>
                <View style={[styles.denom, style.shadow]}>
                    <Text style={styles.title}>{convertToRp(item)}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        const { modalBank, bankSelected, modalPin, loading, nominal } = this.state
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: color.g100, padding: 10 }}>
                    <Card>
                        <Input value={convertToRp(nominal)} onChangeText={(val)=>this.setState({nominal: convertFromRp(val)})} keyboardType='number-pad' placeholder='Masukinan Nominal TopUp' />
                        <Text style={{ fontSize: 10, color: color.g500 }}>*Minimal Rp. 50.000</Text>
                        <FlatList
                            data={denom}
                            keyExtractor={item => item.toString()}
                            renderItem={this.renderDenom}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </Card>
                    <View>
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
                    <Button title='Bayar' loading={loading} disabled={loading || nominal<50000} onPress={() => this.setState({ modalPin: true })} />
                </View>
                <SelectBank onSelect={(bankSelected) => this.setState({ bankSelected })} selected={bankSelected} visible={modalBank} toggle={() => this.setState({ modalBank: false })} />
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
    wadiah: {
        backgroundColor: color.p200,
        padding: 10
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
    denom:{
        padding: 10,
        backgroundColor: '#fff',
        margin: 5,
        borderRadius: 5
    }
})

const denom = [50000, 100000, 200000, 500000, 1000000]


const mapStateToProps = state => {
    return {
        user: state.user.data,
        wallet: state.user.wallet,
        gold: state.user.gold,
        silver: state.user.silver,
    }
}

export default connect(mapStateToProps)(TopUp);