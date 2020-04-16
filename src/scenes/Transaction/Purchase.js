import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Denom } from '_molecules';
import { Card, Button, Divider } from '_atoms';
import { color, style } from '_styles';
import { convertToRp, convertToGram } from '_utils';

class Purchase extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const type = navigation.getParam('type')
        return {
            title: `Beli ${type}`
        }
    }
    constructor(props) {
        super(props),
            this.state = {
                nominal: 0
            }
    }
    render() {
        const type = this.props.navigation.getParam('type')
        const buyPrice = type == 'Emas'? this.props.gold.harga_beli : this.props.silver.harga_beli
        const { nominal } = this.state
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.wrapper}>
                    <Card style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.title}>Saldo Emas</Text>
                            <Text style={styles.value}>{convertToGram(type=='Emas'? this.props.wallet.emas : this.props.wallet.perak)} gram</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.title}>Harga Beli</Text>
                            <Text style={styles.value}>{convertToRp(parseInt(type=='Emas'? this.props.gold.harga_beli : this.props.silver.harga_beli))}</Text>
                        </View>
                    </Card>
                    <Divider />
                    <Denom data={type=='Emas'? goldDenom : silverDenom} buyPrice={buyPrice} onPress={(item) => this.setState({ nominal: item * buyPrice })} selected={nominal} />
                </View>
                {
                    nominal ?
                        <View style={[styles.footer, style.shadow]}>
                            <View>
                                <Text style={styles.title}>Total Pembelian</Text>
                                <Text style={styles.value}>{convertToRp(nominal)}</Text>
                            </View>
                            <Button title='Selanjutnya' onPress={()=>this.props.navigation.navigate('Payment', {nominal})} />
                        </View> : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 10,
        // backgroundColor: color.g100
    },
    title: {
        fontSize: 12,
        color: color.g700
    },
    value: {
        color: color.g900,
        fontWeight: 'bold'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderTopWidth: 1,
        borderColor: color.g300
    }
})

const goldDenom = [
    '0.05', '0.1', '0.5', '1', '2', '3', '5', '10', '25', '50'
]

const silverDenom =[
    '2.975', '14.879'
]

const mapStateToProps = state => {
    return {
        user: state.user.data,
        wallet: state.user.wallet,
        gold: state.user.gold,
        silver: state.user.silver,
    }
}

export default connect(mapStateToProps)(Purchase);