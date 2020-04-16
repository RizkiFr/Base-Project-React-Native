import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { Button } from '_atoms';
import { color, style } from '_styles';
import { convertToRp } from '_utils';
import { connect } from 'react-redux'

class WadiahInvoice extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'PEMBAYARAN',
            headerLeft: null,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.navigation.getParam('data'),
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'column', padding: 20 }}>

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: 200, height: 150 }} resizeMode={'contain'} source={require('_assets/icons/sc_logo.png')} />
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#434343', textAlign: 'center' }}>{this.state.item.status + '\r\n' + this.state.item.pesan}</Text>
                        </View>

                        <View style={{ height: 12 }} />

                        <View style={{ paddingVertical: 8, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ flex: 1, fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Nominal Pembelian</Text>
                             <Text style={{ flex: 0, textAlignVertical: 'center', fontSize: 14, fontWeight: 'bold', color: '#434343' }}>{convertToRp(parseInt(this.state.item.nominal_rp))}</Text>

                        </View>

                        <View style={{ height: 0.5, width: '100%', backgroundColor: '#d3d3d3' }} />

                        <View style={{ paddingVertical: 8, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ flex: 1, fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Jumlah Emas</Text>
                            <Text style={{ flex: 0, textAlignVertical: 'center', fontSize: 14, fontWeight: 'bold', color: '#434343' }}>{convertToRp(parseInt(this.state.item.nominal_gram))}</Text>
                        </View>

                        <View style={{ height: 0.5, width: '100%', backgroundColor: '#d3d3d3' }} />

                        <View style={{ paddingVertical: 8, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ flex: 1, fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Harga Beli Emas saat Transaksi</Text>
                            <Text style={{ flex: 0, textAlignVertical: 'center', fontSize: 14, fontWeight: 'bold', color: '#434343' }}>{convertToRp(parseInt(this.props.gold.harga_beli))}</Text>
                        </View>

                        <View style={{ height: 0.5, width: '100%', backgroundColor: '#d3d3d3' }} />

                        <View style={{ paddingVertical: 8, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ flex: 1, fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Nomor Transaksi</Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434343', textAlign: 'right' }}>{this.state.item.nomor_transaksi}</Text>
                        </View>

                        <View style={{ height: 0.5, width: '100%', backgroundColor: '#d3d3d3' }} />

                        <View style={{ paddingVertical: 8, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ flex: 1, fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Waktu Transaksi</Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434343', textAlign: 'right' }}>{this.state.item.waktu_transaksi}</Text>
                        </View>

                        <View style={{ height: 0.5, width: '100%', backgroundColor: '#d3d3d3' }} />

                        <View style={{ paddingVertical: 8, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ flex: 1, fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Metode Pembayaran</Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434343', textAlign: 'right' }}>{this.state.item.bank_transfer}</Text>
                        </View>

                        <View style={{ height: 0.5, width: '100%', backgroundColor: '#d3d3d3' }} />

                        <View style={{ paddingVertical: 8, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ flex: 1, fontSize: 14, fontWeight: 'normal', color: '#434343' }}>TOTAL PEMBAYARAN</Text>
                            <Text style={{ flex: 0, textAlignVertical: 'center', fontSize: 14, fontWeight: 'bold', color: '#434343' }}>{convertToRp(parseInt(this.state.item.total_bayar))}</Text>
                        </View>

                        <View style={{ height: 0.5, width: '100%', backgroundColor: '#d3d3d3' }} />

                        <View style={{ paddingVertical: 8, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, fontWeight: 'normal', color: '#434343', textAlign: 'center' }}>Pantau perkembangan Investasi Emas anda di dashboard Sharia Coin Emas.</Text>
                        </View>

                    </View>
                    <View style={{ height: 10 }} />
                </ScrollView>
                <View style={[style.shadow, { padding: 10, backgroundColor: '#fff', borderTopWidth: 1, borderColor: color.g300 }]}>
                    <Button title='Selesai' onPress={() => this.props.navigation.navigate('Home')} />
                </View>
            </View>
        );
    }
};

const mapStateToProps = state => {
    return {
        user: state.user.data,
        wallet: state.user.wallet,
        gold: state.user.gold,
        silver: state.user.silver,
    }
}

export default connect(mapStateToProps)(WadiahInvoice);