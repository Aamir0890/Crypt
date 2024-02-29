import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image} from 'react-native';
import axios from 'axios';
import "./shim";
import { useEffect,useState } from 'react';
import Polygon from './Wallet/Polygon';
let bip39 = require('bip39')
let bip32 = require('bip32')
let bitcoin = require('bitcoinjs-lib')
let seed = bip39.mnemonicToSeedSync("mnemonic goes here")
let hdNode = bip32.fromSeed(seed)
import { Picker } from '@react-native-picker/picker';
import Transfer from './Wallet/Transfer';
let childNode = hdNode.deriveHardened(0)
let external = childNode.derive(1)
console.log(bitcoin.payments.p2pkh({pubkey: external.publicKey}))
import { observer } from 'mobx-react-lite';
import CryptoStore from './UserStore'
import { reaction } from 'mobx';

const App=observer(()=> {
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const press=async()=>{
    let address='n3zTfZe28CP83fCs558JxqaR57qMz2STkg'
    const response = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`);
    let data = response.data
   
    console.log(data.final_balance)  // Convert satoshis to BTC
   }
    
    
 
    useEffect(()=>{
  //  fun()
   press()
    },[])


    const [usdt,setUsdt]=useState(null)
    const [bit,setBit]=useState(null)
    useEffect(() => {
      CryptoStore.fetchBitcoinValue();
      CryptoStore.fetchUsdtValue();
  
      // Create a reaction that listens for changes in bitcoinValue and usdtValue
      const dispose1 = reaction(
        () => CryptoStore.bitcoinValue,
        (newValue, prevValue) => {
          setBit(newValue);
        }
      );
  
      const dispose2 = reaction(
        () => CryptoStore.usdtValue,
        (newValue, prevValue) => {
          setUsdt(newValue);
        }
      );
  
      
      return () => {
        dispose1();
        dispose2();
      };
    }, []);

  return (
    <View style={styles.container}>
      <View style={{marginHorizontal:'20%'}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:'10%'}}>
      <Image source={require('./assets/bitcoin.png')} style={{height:30,width:30}}/>
    <View>
        <Text>Rate : 1Btc =$ {CryptoStore.bitcoinValue}</Text>
      </View>
     
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
      <Image source={require('./assets/usdt.png')} style={{height:30,width:30}}/>
      <View>
        <Text>Rate : 1Btc =$ {CryptoStore.usdtValue}</Text>
      </View>
      </View>

      </View>
      
      <View style={{marginHorizontal:'10%',marginTop:'5%'}}>
        <Text style={{fontSize:15,marginLeft:'20%'}}> Select Wallet</Text>
      <Picker
        selectedValue={selectedCrypto}
        onValueChange={(itemValue) => setSelectedCrypto(itemValue)}
      >
        <Picker.Item label="Bitcoin" value="bitcoin" />
        <Picker.Item label="Polygon" value="polygon" />
      </Picker>
     
    </View>
    {selectedCrypto==='bitcoin'?<Transfer/>:<Polygon/>}
     {/* <Polygon/> */}
    </View>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   marginTop:60
  },
});
export default App;