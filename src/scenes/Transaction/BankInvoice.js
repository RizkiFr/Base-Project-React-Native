import React from 'react';
import { Text, View, Image, ScrollView, Platform, TouchableOpacity, Clipboard } from 'react-native';
import { Button } from '_atoms';
import { color, style } from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';

export default class BankInvoice extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Pembayaran',
            headerLeft: null
        }
    };

    constructor(props) {
        super(props);
    }

    copyToClipboard(val) {
        Clipboard.setString(val);
        Toast.show('Copied to clipboard.');
    }

    getIcon() {
        const bank = this.props.navigation.getParam('bankSelected')
        if (bank.code == 'wadiah') {
            return require('_assets/icons/wadiah.png');
        } else if (bank.code == 'bni' || bank.code == 'va_bni') {
            if (bank.name == 'Transfer Bank BNI Syariah') {
                return require('_assets/icons/bni_syariah.png');
            } else {
                return require('_assets/icons/bni.png');
            }
        }
        else if (bank.code == 'mandiri' || bank.code == 'va_mandiri') {
            return require('_assets/icons/mandiri.png');
        } else if (bank.code == 'bri' || bank.code == 'va_bri') {
            return require('_assets/icons/bri.png');
        } else if (bank.code == 'bca' || bank.code == 'va_bca') {
            return require('_assets/icons/bca.png');
        }
    }

    getInstructions() {
        const bank = this.props.navigation.getParam('bankSelected')
        if (bank.code == 'bni' || bank.code == 'va_bni') {
            return (
                <View>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434343' }}>PEMBAYARAN MELALUI ATM BNI</Text>
                    <View style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>1. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Pada ATM, Pilih opsi Transaksi Lainnya, lalu pilih opsi Transfer.</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>2. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Kemudian pilih Rekening Tabungan kemudian pilih Rekening BNI.</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>3. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan nomor rekening tujuan.</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>4. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Konfirmasi dan selesaikan pembayaran.</Text>
                        </View>
                    </View>
                    <View style={{ height: 12 }} />

                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434343' }}>PEMBAYARAN MELALUI INTERNET BANKING BNI</Text>
                    <View style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>1. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Login ke iBanking BNI, pilih Transfer, lalu atur & tambah Rekening Tujuan.</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>2. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan nomor rekening tujuan, dan kode Otentifikasi Token.</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>3. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Pilih Transfer Antar Rekening BNI, pilih Rek. Tujuan, dan pilih Rek. Debit.</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>4. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan nominal bayar, kode otentikasi token, dan selesaikan pembayaran.</Text>
                        </View>
                    </View>
                    <View style={{ height: 12 }} />

                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434343' }}>PEMBAYARAN MELALUI MOBILE BANKING BNI</Text>
                    <View style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>1. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Login ke Mobile banking BNI kemudian pilih Transfer</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>2. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Pilih menu Antar Rekening BNI, kemudian menu Input Rekening Baru.</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>3. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan nomor Rekening Debit dan Rekening Tujuan.</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>4. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan Password, dan selesaikan pembayaran.</Text>
                        </View>
                    </View>
                    <View style={{ height: 12 }} />

                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434343' }}>ATM BERSAMA</Text>
                    <View style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>1. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan kartu ke mesin ATM bersama</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>2. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Pilih Transaksi Lainnya</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>3. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Pilih menu Transfer</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>4. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Pilih Transfer ke Bank Lain</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>5. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan kode bank BNI (009) dan nomor rekening tujuan</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>6. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan nominal transfer sesuai tagihan atau kewajiban Anda. Nominal yang berbeda tidak dapat diproses</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>7. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Konfirmasi rincian Anda akan tampil di layar, cek dan tekan 'Ya' untuk melanjutkan</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>8. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Transaksi Berhasil</Text>
                        </View>
                    </View>
                    <View style={{ height: 12 }} />

                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434343' }}>TRANSFER DARI BANK LAIN</Text>
                    <View style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>1. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Pilih menu Transfer antar bank atau Transfer online antar bank</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>2. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan kode bank BNI (009) atau pilih bank yang dituju yaitu BNI</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>3. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukan nomor rekening tujuan</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>4. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan jumlah pembayaran</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>5. </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Konfirmasi rincian Anda akan tampil di layar, cek dan apabila sudah sesuai silahkan lanjutkan transaksi sampai dengan selesai</Text>
                        </View>
                    </View>
                    <View style={{ height: 12 }} />
                </View>
            );
        }
        else
            if (bank.code == 'mandiri' || bank.code == 'va_mandiri') {
                return (
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434343' }}>PEMBAYARAN MELALUI ATM MANDIRI</Text>
                        <View style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>1. </Text>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Pilih Bayar/Beli.</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>2. </Text>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Pilih Transfer > Pilih Ke Rekening Mandiri</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>3. </Text>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan nomor rekening tujuan.</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>4. </Text>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Konfirmasi dan selesaikan pembayaran.</Text>
                            </View>
                        </View>
                        <View style={{ height: 12 }} />

                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434343' }}>PEMBAYARAN MELALUI INTERNET BANKING MANDIRI</Text>
                        <View style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>1. </Text>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Pilih Transfer > Rekening Mandiri.</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>2. </Text>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan nomor rekening tujuan.</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>3. </Text>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan PIN token dan selesaikan pembayaran.</Text>
                            </View>
                        </View>
                        <View style={{ height: 12 }} />

                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434343' }}>PEMBAYARAN MELALUI MOBILE BANKING MANDIRI</Text>
                        <View style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>1. </Text>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Pilih Transfer > Rekening Mandiri.</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>2. </Text>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan nomor rekening tujuan.</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>3. </Text>
                                <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Konfirmasi dan selesaikan pembayaran.</Text>
                            </View>
                        </View>
                        <View style={{ height: 12 }} />
                    </View>
                );
            }
            else
                if (bank.code == 'bri' || bank.code == 'va_bri') {
                    return (
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434343' }}>PEMBAYARAN MELALUI ATM BRI</Text>
                            <View style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>1. </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Pilih Transfer > BRI.</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>2. </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan nomor rekening tujuan.</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>3. </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Konfirmasi dan selesaikan pembayaran.</Text>
                                </View>
                            </View>
                            <View style={{ height: 12 }} />

                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434343' }}>PEMBAYARAN MELALUI INTERNET BANKING BRI</Text>
                            <View style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}></Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Pilih menu Transfer > Sesama BRI</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}></Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan nomor rekening tujuan.</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}></Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Konfirmasi dan selesaikan pembayaran.</Text>
                                </View>
                            </View>
                            <View style={{ height: 12 }} />

                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434343' }}>PEMBAYARAN MELALUI MOBILE BANKING BRI</Text>
                            <View style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>1. </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Pilih menu Transfer > Sesama BRI</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>2. </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan nomor rekening tujuan.</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>3. </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Konfirmasi dan selesaikan pembayaran.</Text>
                                </View>
                            </View>
                            <View style={{ height: 12 }} />
                        </View>
                    );
                }
                else
                    if (bank.code == 'bca' || bank.code == 'va_bca') {
                        return (
                            <View>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434343' }}>PEMBAYARAN MELALUI ATM BCA</Text>
                                <View style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>1. </Text>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Pilih Transfer > BCA.</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>2. </Text>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan nomor rekening tujuan.</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>3. </Text>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Konfirmasi dan selesaikan pembayaran.</Text>
                                    </View>
                                </View>
                                <View style={{ height: 12 }} />

                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434343' }}>PEMBAYARAN MELALUI INTERNET BANKING BCA</Text>
                                <View style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>1. </Text>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Pilih menu Transfer > Sesama BCA</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>2. </Text>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan nomor rekening tujuan.</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>3. </Text>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Konfirmasi dan selesaikan pembayaran.</Text>
                                    </View>
                                </View>
                                <View style={{ height: 12 }} />

                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434343' }}>PEMBAYARAN MELALUI MOBILE BANKING BCA</Text>
                                <View style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>1. </Text>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Pilih menu Transfer > Sesama BCA</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>2. </Text>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Masukkan nomor rekening tujuan.</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>3. </Text>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Konfirmasi dan selesaikan pembayaran.</Text>
                                    </View>
                                </View>
                                <View style={{ height: 12 }} />

                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434343' }}></Text>
                                <View style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}></Text>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}></Text>
                                    </View>
                                </View>
                                <View style={{ height: 12 }} />
                            </View>
                        );
                    }

    }

    render() {
        const data = this.props.navigation.getParam('data')
        console.log(data)
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, padding: 20, }}>
                    <View style={{ borderWidth: 1, borderColor: 'lightgray', borderRadius: (Platform.OS == 'ios') ? 8 : 10, padding: 10 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: 200, height: 80 }} resizeMode={'contain'} source={this.getIcon()} />
                            {/* <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#434343' }}>{this.state.paymentTitle}</Text> */}
                        </View>
                        <View style={{ height: 8 }} />
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ flex: 1, fontSize: 14, fontWeight: 'bold', color: '#434343' }}>Kode Pembayaran</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ flex: 0, fontSize: 14, fontWeight: 'normal', color: '#434343' }}>{data.wallet.rek}</Text>
                                <View style={{ width: 8 }} />
                                <TouchableOpacity onPress={() => this.copyToClipboard(data.wallet.rek)}>
                                    <View style={{ width: 32, height: 32, justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name='ios-copy' size={18} />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <Text style={{ flex: 0, fontSize: 14, fontWeight: 'bold', color: '#434343', textAlign: 'center' }}>{data.wallet.nama}</Text>

                            <View style={{ height: 8 }} />
                            <Text style={{ flex: 1, textAlignVertical: 'center', fontSize: 14, fontWeight: 'normal', color: '#434343' }}>Total Pembelian</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ flex: 0, textAlignVertical: 'center', fontSize: 14, fontWeight: 'bold', color: '#434343' }}>Rp {data.wallet.total_nominal}</Text>
                                <View style={{ width: 8 }} />
                                <TouchableOpacity onPress={() => this.copyToClipboard(data.wallet.total_nominal)}>
                                    <View style={{ width: 32, height: 32, justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name='ios-copy' size={18} />
                                    </View>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>

                    {
                        this.getInstructions()
                    }
                <View style={{height: 10}} />
                </ScrollView>
                <View style={[style.shadow,{padding: 10, backgroundColor: '#fff', borderTopWidth: 1, borderColor: color.g300}]}>
                    <Button title='Selesai' onPress={() => this.props.navigation.navigate('Home')} />
                </View>
            </View>
        );
    }
};
