import {FC, useEffect} from 'react';
import { StatusBar, Text, View } from 'react-native';

const Loading = ()=>{
  return (
    <View style={{paddingHorizontal:16,paddingVertical:8, backgroundColor:'lightgray'}}>
    <Text style={{textAlign:'center', color:'black'}}>Loading...</Text>
  </View>
  )
}

export default Loading;
