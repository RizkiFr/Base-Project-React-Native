import React from 'react';
import { View, Text, StyleSheet, Alert, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, Divider, Input } from '_atoms';
import { color, style } from '_styles';
import { Loading, TokenDenom } from '_molecules'
import { convertToRp, convertToGram } from '_utils';
import axios from 'axios';
import Contacts from 'react-native-contacts';
import ScrollableTabBar from 'react-native-scrollable-tab-view'

class Listrik extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Pembelian Listrik`,
        }
    }
    constructor(props) {
        super(props),
            this.state = {
                loading: false,
                packet: [],
                produk: ''

            }
    }

    componentDidMount() {
        this.getListrikPrice()
    }

    getListrikPrice = () => {
        this.setState({ loading: true })
        axios.post(`/spending/list_nominal`, { produk: "PLN/PREPAID" })
            .finally(() => this.setState({ loading: false }))
            .then(res => {
                console.log(res.data)
                this.setState({ packet: res.data.data })
            }).catch(err => {
                console.log(err.response)
            })
    }

    render() {
        const { produk, packet, loading } = this.state
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
                    <ScrollableTabBar>
                        <TokenDenom tabLabel='Prabayar' produk={produk} data={packet} onPress={(produk) => this.setState({ produk })} />
                        <TokenDenom tabLabel='Prabayar' produk={produk} data={packet} onPress={(produk) => this.setState({ produk })} />
                    </ScrollableTabBar>
                </View>
                <View style={styles.footer}>
                    <Button title='Selanjutnya' disabled={!produk} onPress={() => this.props.navigation.navigate('InputListrik', { produk, type: 'P' })} />
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
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5
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

export default connect(mapStateToProps)(Listrik);