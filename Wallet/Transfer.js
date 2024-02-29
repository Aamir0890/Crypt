import { View, Text, TouchableOpacity, TextInput,Button,Alert } from 'react-native'
import React,{useEffect, useState} from 'react'
import axios from 'axios';
import ".././shim";
let bip39 = require('bip39')
let bip32 = require('bip32')
import * as bitcoin from 'bitcoinjs-lib';
import {validate,getAddressInfo} from 'bitcoin-address-validation';
const ECPair=require('bitcoinjs-lib').ECPair
import * as Clipboard from 'expo-clipboard'
const network = bitcoin.networks.testnet;
import * as Crypto from 'expo-crypto';
import { address } from 'bitcoinjs-lib';

const Transfer = () => {
    const [To,setTo]=useState(0)
    useEffect(()=>{
        getBalance()
    },[To])
    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(transe);
      };
async function getTransactionId(rawTx) {
  // Hash the raw transaction twice
  const firstHash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    rawTx,
    { encoding: Crypto.CryptoEncoding.HEX }
  );
  const txid = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    firstHash,
    { encoding: Crypto.CryptoEncoding.HEX }
  );

  // Reverse the bytes to get the transaction ID
  const txidBytes = [];
  for (let i = 0; i < txid.length; i += 2) {
    txidBytes.unshift(txid.slice(i, i + 2));
  }
  const txidFinal = txidBytes.join('');
   setTrans(txidFinal)
  console.log('Transaction ID:', txidFinal);
  let config = {
    headers: {
      'Content-Type': 'application/json'
    }
};

fetch('https://api.blockcypher.com/v1/btc/test3/txs/push', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    tx: rawTx,
  }),
})
.then((response) => response.json())
.then((data) => {

  console.log('Success:', data);
  if(data.address){
    Alert.alert(`Trasction successfull to : ${data.address}`)
    useEffect(()=>{
     setTo(value => value+1)
      console.log(balance)
       },[])
  }
})
.catch((error) => {
  console.error('Error:', error);
});
useEffect(()=>{
    setTo(value => value+1)
     console.log(balance)
      },[])
}

   const press=()=>{
   
    const hexPrivateKey = 'cQp49RRy67FSSEMiYzn2tHwyNN2gAzCqkTwWMwFqucwsGMk3os6x';

// Convert hex to buffer
const privateKey = 'cQp49RRy67FSSEMiYzn2tHwyNN2gAzCqkTwWMwFqucwsGMk3os6x';

// Create a key pair
const keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'), { network: bitcoin.networks.testnet });

// Get the corresponding address
const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: bitcoin.networks.testnet });

console.log(address);

   }

    const sendBitcoin = async (privateKey, destinationAddress, amountToSend,sourceAddress) => {
      const keyPair = bitcoin.ECPair.fromWIF(privateKey, network);
   
    // console.log(amountToSend,'amt')
      const utxos = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${sourceAddress}?unspentOnly=true`);
      console.log(utxos.data)
      if(utxos.data?.unconfirmed_txrefs){
        Alert.alert('You have unconiforded balance')
      }
      const utxo = utxos.data.txrefs[0];
      console.log(utxo)
      const txb = new bitcoin.TransactionBuilder(network);
     console.log('das')
    // Add the UTXO 
    txb.addInput(utxo.tx_hash, utxo.tx_output_n);
    const feeRate = 1; // Adjust this value based on the current network conditions
  
    const left=balance-feeRate-amountToSend
     
    // Add the recipient address as an output
    txb.addOutput(destinationAddress, amountToSend);
    
    // Sign the transaction
    txb.sign(0, keyPair);
  
    // Build and broadcast the transaction
    const tx = txb.build();
    const txHex = tx.toHex();
  console.log(txHex)
         getTransactionId(txHex)
      };
      
    const onpress=()=>{
         
    }
    
    const [add, setAdd] = useState('');
    const [transe,setTrans]=useState(null)
    const validateAddress = () => {
      console.log(add)
     
        
       console.log(balance,'fsd')

      try{
        const result = validate(add);
        const info=getAddressInfo(add)
        let num = parseFloat(amt);
        console.log(num)
        if(num>balance||amt===''||isNaN(num)){
          Alert.alert('Enter valid amt')
          console.log('da')
        }
        
       else if (result  === true&&info.network==='testnet') {
        num=num*100000000
          Alert.alert(`${num}`);
          console.log(num)
          if(num===NaN){
            console.log('errro')
          }
          sendBitcoin("cQp49RRy67FSSEMiYzn2tHwyNN2gAzCqkTwWMwFqucwsGMk3os6x",add,num,'mhkYW4EzBJuyrmGBz3GZvyQtUdnWvQKKU1')
        } 
      }catch(error){
        Alert.alert('Invalid Address', 'This is not a valid Bitcoin Testnet address.');
      }

     
    };
    const getBalance=async()=>{
      const utxoData = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/mhkYW4EzBJuyrmGBz3GZvyQtUdnWvQKKU1/full`);
      let bal=utxoData.data.balance/ 100000000
      const eax=bal.toFixed(9)
      console.log(eax)
      setBalance(eax)
    }
     
    const [amt,setAmt]=useState('')
    const [balance,setBalance]=useState(null)

    useEffect(()=>{
   getBalance()
   console.log(balance)
    },[])
    useEffect(()=>{
  console.log(balance)
    },[balance])
  return (
    <View style={{flex:1,marginTop:'5%',alignItems:'center'}}>
       
      
       {balance!==null?<View style={{width:270,flexDirection:'row'}}>
              <Text style={{fontSize:20,marginHorizontal:10}}>Balance - </Text>
              <Text style={{fontSize:20}}>{balance} BTC</Text>
              
        </View>:null}
      <Text style={{fontSize:25,marginBottom:'5%',marginTop:'5%'}}>Enter Address</Text>
      <TextInput
        style={{ height: 50, borderColor: 'gray', borderWidth: 1,width:283,padding:10,borderRadius:10,marginBottom:10 }}
        onChangeText={text => setAdd(text)}
        value={add}
      /> 
      <Text style={{fontSize:25,marginBottom:'5%',marginTop:'5%'}}>Enter Bitcoin Amount</Text>
      <TextInput
        style={{ height: 50, borderColor: 'gray', borderWidth: 1,width:283,padding:10,borderRadius:10 }}
        onChangeText={text => setAmt(text)}
        value={amt}
      />

       
      <TouchableOpacity style={{backgroundColor:'#841584',alignItems:'center',marginTop:'10%',borderRadius:20}} onPress={validateAddress}>
        <Text style={{color:'white',fontSize:20,padding:10}}>Make Payment</Text>
      </TouchableOpacity>
    
      <View style={{margin:30}}/>
     
        {transe!==null?<View style={{width:'90%'}}>
          <Text>Your transaction Id</Text>
          <TouchableOpacity onPress={copyToClipboard}>
          <Text>{transe}</Text>
          </TouchableOpacity>
         
        </View>:null}
    </View>
  )
}

export default Transfer