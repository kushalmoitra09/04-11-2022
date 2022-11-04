import { CommonActions, useNavigation } from '@react-navigation/native';
import {FC, useEffect, useState} from 'react';
import { Image, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import Realm from 'realm';

interface ProductProps {
  id: String
  name: String,
  producer:String,
  cost:String,
  image:String
}
const Product :FC<ProductProps>=(props):JSX.Element=>{
  const navigation = useNavigation();
  const [fav, setFav] = useState(false);
  const realm= new Realm({
    path: 'neo.realm'
  });
  useEffect(()=>{

    const already = realm.objects('product_fav').filtered('product_id ='+props.id)
    if(already.length>0){
      setFav(true);
    }

  },[])

  const toggleFav = ()=>{

    const a = realm.objects('product_fav').filtered('product_id ='+props.id);
    console.log(a);

    if(a.length==0){

      realm.write(() => {
        realm.create('product_fav', {
          product_id: props.id,
        });
      });
      setFav(true)
    }else{
      realm.write(() => {
        realm.delete(
          realm.objects('product_fav').filtered('product_id ='+props.id)
        )
      });
      setFav(false)
    }
    
    

  }
  return <TouchableNativeFeedback
  background={TouchableNativeFeedback.Ripple('#90CAF9', false)}
  onPress={() => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'ProductDetailsScreen',
        params: {
          productId: props.id,
        },
      }),
    );
  }}>
  <View  style={{flexDirection:'row', paddingVertical:12, paddingHorizontal:16,  }}>
    <Image
      style={{width:64, height:64}}
      source={{
        uri:props.image+'',
      }}
    />
    <View style={{
        marginLeft:16,
        flex:1
      }}>
        <Text style={{color:'black', fontSize:16, fontWeight:'600'}}>{props.name}</Text>
        <Text style={{fontSize:12, color:'gray'}}>{props.producer}</Text>
        <Text style={{color:'red', fontSize:16 , fontWeight:'bold'}}>Rs. {props.cost}</Text>
    </View>
    <TouchableOpacity onPress={() => {
        toggleFav();
      }}>
      <View style={{ height:32, width:32,}}>
        <Image source={fav?require('../../assets/heart_filled.png'):require('../../assets/heart.png') }  style={{ width:32, height:32}}/>
      </View>
    </TouchableOpacity>
   
  
  </View>
</TouchableNativeFeedback>
}

export default Product;
