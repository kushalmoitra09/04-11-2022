
import {CommonActions, useIsFocused, useNavigation} from '@react-navigation/native';
import {FC, useEffect, useState} from 'react';
import {View, ScrollView, Text, TouchableNativeFeedback, Image, StatusBar, ProgressBarAndroid} from 'react-native';
import Header from '../components/header';
import Loading from '../components/loading';
import Product from '../components/product_item';
import ProductService from '../services/product_service';

const HomeScreen =()=>{
  const [products, setProducts] = useState([]);
  const productService = new ProductService();
  let currentPage = 1;
  const [loading, setLoading] = useState(false)
  

  const isFocused = useIsFocused();
 
  useEffect(() => {
    currentPage=1;
    
    setProducts([]);
    productService.getProducts(currentPage).then((a)=>{
      setProducts(a)
     }) .catch(error => console.log('error', error));
    console.log('OInasd');
    
  }, [isFocused]);

  useEffect(()=>{
    setLoading(true);
    productService.getProducts(currentPage).then((a)=>{
      setProducts(a)
      setLoading(false);
     }) .catch(error => console.log('error', error));
  },[])

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}:any) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  
  return <ScrollView
    style={{
      backgroundColor: 'white',
    }}
    onScroll={({nativeEvent}) => {
      if (isCloseToBottom(nativeEvent)) {
        console.log('End');
        
      }
    }}
    scrollEventThrottle={400}
    >
      <View style={{flex:1}}>

        <Header/>
        <View>
        {
          products.map((product, index)=>{
            return <View key={product['id']}>
              <Product name={product['name']} producer={product['producer']} cost={product['cost']} image={product['product_images']} id={product['id']}/>
              <View style={{ height:1, width:'100%' , backgroundColor:'lightgray', }}/>
            </View>;
          })
        }
        {
          loading && <Loading/>
        }
        </View>
      </View>
      
      
    </ScrollView>
}
export default HomeScreen;