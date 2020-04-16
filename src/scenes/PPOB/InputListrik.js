import React from 'react';
import { View, Text, StyleSheet, Alert, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, Divider, Input } from '_atoms';
import { color, style } from '_styles';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class InputListrik extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const type = navigation.getParam('type')
        return {
            title: `Listrik ${type?? 'Pascabayar'}`,
        }
    }
    constructor(props) {
        super(props),
            this.state = {
                loading: false,
                idPelanggan: ''

            }
    }

    componentDidMount() {

    }

    inquiry = async () => {
        this.setState({loading: true})
        const token = await AsyncStorage.getItem('token')
        axios.post(`/spending/inquiry_tagihan?token=${token}`, {
            produk: 'PLN/PREPAID',
            idpel: this.state.idPelanggan
        }).finally(()=>this.setState({loading: false}))
        .then(res=>{
            if(res.data.response.response_code!='0000'){
                Toast.show(res.data.response.response_message, Toast.LONG)
            }else{
                console.log(res.data.response)
                const produk = this.props.navigation.getParam('produk')
                this.props.navigation.navigate('ListrikConfirm', {data: res.data.response, produk})
            }
        }).catch(err=>{
            Toast.show(err.response.data.message, Toast.LONG)
        })
    }

    request

    render() {
        const { produk, idPelanggan, loading } = this.state
        return (
            <View style={{ flex: 1 }} >
                <View style={{ flex: 1, padding: 5 }}>
                    <Card style={{ margin: 5 }}>
                        <Input value={idPelanggan} label='Id Pelanggan' icon='address-book' onChangeText={(v) => this.setState({ idPelanggan: v })} keyboardType='number-pad' placeholder='Masukan Id Pelanggan' />
                    </Card>
                    <Divider style={{ marginBottom: 10 }} />
                </View>
                <View style={styles.footer}>
                    <Button title='Selanjutnya' loading={loading} disabled={!idPelanggan || loading} onPress={this.inquiry} />
                </View>
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

export default connect(mapStateToProps)(InputListrik);