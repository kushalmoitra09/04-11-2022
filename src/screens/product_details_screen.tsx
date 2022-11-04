import {FC, useEffect, useState} from 'react';
import { Dimensions, Image, ScrollView, StatusBar, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';

import Realm from 'realm';
import ProductModel from '../model/product_model';
import ProductImageModel from  '../model/product_image_model';
import ProductService from '../services/product_service';
import Loading from '../components/loading';
import { useNavigation } from '@react-navigation/native';

const ProductDetailsScreen :FC=(props)=>{
  const [product, setProduct] = useState<ProductModel>();
  const [selectedImage, setSelectedImage] = useState<ProductImageModel>();
  const {route}: any = props;

  const [fav, setFav] = useState(false);
  const realm= new Realm({
    path: 'neo.realm'
  });
  const productService = new ProductService();
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();

  useEffect(()=>{
    setLoading(true)

    productService.getProduct(route.params.productId).then((p:any)=>{
      console.log(p);
      const data : ProductModel =p;
      setProduct(data)
      if(data.product_images.length>0){
        setSelectedImage(data.product_images[0]);
      }
      const already = realm.objects('product_fav').filtered('product_id ='+p.id)
      if(already.length>0){
        setFav(true);
      }
      setLoading(false)
    }).catch(error => console.log('error', error));
    
    
    // fetch('http://staging.php-dev.in:8844/trainingapp/api/products/getDetail?product_id='+ route.params.productId, {method: 'GET'})
    // .then(response => response.json())
    // .then(result => {
    //   // setProduct(result.data)
    //   console.log(result.data);  
    //   const data : ProductModel =result.data;
    //   setProduct(data)
      
    //   console.log(data.product_images.length);
    //   if(data.product_images.length>0){
    //     setSelectedImage(data.product_images[0]);
    //   }
    //   const already = realm.objects('product_fav').filtered('product_id ='+result.data.id)
    //   if(already.length>0){
    //     setFav(true);
    //   }
    // })
    // .catch(error => console.log('error', error));
  },[])

  const toggleFav = ()=>{
    if(product==null)return;

    const a = realm.objects('product_fav').filtered('product_id ='+product.id);
    console.log(a);

    if(a.length==0){

      realm.write(() => {
        realm.create('product_fav', {
          product_id: product.id,
        });
      });
      setFav(true)
    }else{
      realm.write(() => {
        realm.delete(
          realm.objects('product_fav').filtered('product_id ='+product.id)
        )
      });
      setFav(false)
    }
    
    

  }
  return <ScrollView>
    <StatusBar
      backgroundColor="#E57373"
      barStyle="light-content"
    />
    <View style={{
      paddingHorizontal:16,
      paddingVertical:16,
      backgroundColor:'red',
      flexDirection:'row'
    }}>
      <TouchableOpacity onPress={()=>{
        navigation.goBack();
      }}>
        <Image source={require('../../assets/back.png')}  style={{ width:32, height:32, marginRight:16}}/>
      </TouchableOpacity>
      
      <Text style={{color:'white', fontWeight:'bold', fontSize:20, textAlign:'center'}}>Products Details</Text>
    </View>


    
    {
      product!=null && <View style={{padding:16}}>
        {
          selectedImage!=null && <View>
            <Image
                style={{width:'100%',resizeMode: 'contain', height:Dimensions.get('window').width/1.5}}
                source={{
                  uri:selectedImage.image+'',
                }}

              />
          </View>
        }
        
        <ScrollView
        style={{marginTop:16}}
          horizontal={true}>
          {
            product.product_images.map(p=>{
              return (
              <View key={p.id} style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>{
                  setSelectedImage(p);
                }}>
                  <View style={{ height:64, width:64,}} >
                    <Image
                      style={{width:64, height:64}}
                      source={{
                        uri:p.image,
                      }}
                    />
                  </View> 
                </TouchableOpacity>
                <View style={{width:16,}}/>
              </View>)
              
            })
          }
          
        </ScrollView>
          
        <View style={{flexDirection:'row', marginTop:16}}>
          <View style={{flex:1}}>
            <Text style={{color:'black', fontWeight:'bold', fontSize:18}}>{product.name}</Text>
            <Text style={{ fontSize:14,color:'gray'}}>{product.producer}</Text>
          </View>
          <TouchableOpacity onPress={()=>{
            toggleFav();
          }}>
            <View style={{ height:32, width:32,}}>
              <Image source={fav?require('../../assets/heart_filled.png'):require('../../assets/heart.png')}  style={{ width:32, height:32}}/>
            </View>
          </TouchableOpacity>
        </View>
      
        <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:8  }}>
          <Text style={{color:'red', fontSize:16, fontWeight:'bold'}}>Rs. {product.cost}</Text>
          <Text style={{color:'red', fontSize:16, fontWeight:'bold', }}>Rating. {product.rating}</Text>
        </View>
        <Text style={{fontSize:16, marginTop:8 ,color:'gray' }}>{product.description}</Text>
      </View>
    }

    {
      loading && <Loading/>
    }
   
  </ScrollView>
}

export default ProductDetailsScreen;
