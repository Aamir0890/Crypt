import { View, Text, TouchableOpacity, TextInput,StyleSheet, Alert,Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import "@ethersproject/shims"
import { ethers } from 'ethers';
import * as Clipboard from 'expo-clipboard'
const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.polygon.technology');
const wallet = new ethers.Wallet('b4fbdcb6142b8cd2f6d9b1057403e0804c7e7045b4a9d248b013673bc20bb533', provider);
const { width: screenWidth } = Dimensions.get('window');
const maxTextInputWidth = screenWidth * 0.8; // 80% of screen width


const Polygon = () => {
    const [copiedText, setCopiedText] = React.useState('');

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(cd);
  };


  const fetchCopiedText = async () => {
   await Clipboard.setStringAsync(textToCopy);
  };
  
    const [bal,setBal]=useState(null)
  const balance=async()=>{
    

    const balance = await wallet.provider.getBalance(wallet.address);

    // Convert the balance from Wei to Ether
    const balanceInEther = ethers.utils.formatEther(balance);
    const amt=balanceInEther.slice(0,6)
    setBal(amt)
    console.log(`The balance is: ${balanceInEther} Ether`);
  }
  useEffect(()=>{
  balance()
  },[])

    const trans=()=>{
 
    const transaction = {
        to: '0xBB428a6c7C20668A06e2ce084b05529d46DC7f1f',
        value: ethers.utils.parseEther(number), // Sends 1 Ether
        gasPrice: ethers.utils.parseUnits('10', 'gwei'), // Sets the gas price to 10 Gwei
        gasLimit: ethers.BigNumber.from('21000') // Sets the gas limit to 21000
    
      };
     
  
      wallet.sendTransaction(transaction)
        .then((tx) => {
          console.log(tx);
         setCd(tx.hash)
         useEffect(()=>{
           balance()
         },[])
        })
        .catch((error) => {
          console.error(error);
        });
    }
    const [cd,setCd]=useState(null)
const [text, setText] = useState('');

  const onChangeText = (inputText) => {
    setText(inputText);
  };
  const [inputWidth, setInputWidth] = useState('auto');
  const handleContentSizeChange = (event) => {
    const newWidth = event.nativeEvent.contentSize.width;
   setInputWidth(Math.min(newWidth, maxTextInputWidth));
  };
  const [number, setNumber] = useState('');

  const handleNumberChange = (text) => {
    // Remove non-numeric characters
    
    setNumber(text);

  };
  const send=()=>{
    const numericValue = parseFloat(number);

    console.log(numericValue)
    console.log(text)
    if(ethers.utils.isAddress(text)&& number<bal){
        console.log(text)
        trans()
        }
        else {
        Alert.alert('Please enter a valid address')
        }
         if(number>bal){
            Alert.alert('Please enter a valid amt')
        }
       
      
  }


  return (
    <View style={{flex:1,marginTop:'10%',width:'90%',alignItems:'center',marginLeft:'10%'}}>

        {bal!==null?<View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
             <Text style={{marginRight:20,fontSize:16}}>Your wallet balance :</Text>
            <Text style={{fontSize:16}}>{bal} Matic</Text>
            </View>:null}
        <Text style={{fontSize:20,marginBottom:20}}>Enter Address</Text>
<View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Enter Address....."
        onContentSizeChange={handleContentSizeChange}
      />
    </View>
    <View>
        <TouchableOpacity onPress={copyToClipboard}>
        <Text style={{fontSize:20,marginBottom:20}}>Enter Amount</Text>
        </TouchableOpacity>
        
</View>
 <View style={styles.container}>
      <TextInput
        style={styles.input}
          
        onChangeText={handleNumberChange}
        value={number}
      />
    </View>
      
      {
          cd!==null?<View style={{width:'90%',marginBottom:'10%'}}>
            <TouchableOpacity onPress={copyToClipboard}>
            <Text style={{fontSize:20}}>Tx id: {cd}</Text>
            </TouchableOpacity>
           
          </View>:null
      }
  <TouchableOpacity style={{backgroundColor:'#841584',alignItems:'center',marginTop:'10%',borderRadius:20}} onPress={send}>
        <Text style={{color:'white',fontSize:20,padding:10}}>Make Payment</Text>
      </TouchableOpacity>
       
    </View>
  )
}

export default Polygon
const styles = StyleSheet.create({
  container: {
   marginBottom:'15%',
    width:'90%'
   
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius:10,
    width:283
 
  },
});