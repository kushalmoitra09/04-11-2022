import {FC, useEffect} from 'react';
import { StatusBar, Text, View } from 'react-native';

const Header = ()=>{
  return (
  <>
    <StatusBar
      backgroundColor="#E57373"
      barStyle="light-content"
    />
    <View style={{
      paddingHorizontal:16,
      paddingVertical:16,
      backgroundColor:'red'
    }}>
      <Text style={{color:'white', fontWeight:'bold', fontSize:20, textAlign:'center'}}>Products</Text>
    </View>
  </>
  )
}

export default Header;
