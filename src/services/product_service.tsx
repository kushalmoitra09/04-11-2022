import {FC, useEffect, useState} from 'react';
import Service from './service';

class ProductService extends Service{
  constructor() {
    super();
  }
  getProducts = async (pageNumber:number)=>{
    return await fetch(this.baseUrl+'/products/getList?product_category_id=1&limit=10&page='+ pageNumber, {method: 'GET'})
    .then(response => response.json())
    .then(result => {
      return result.data;
    });
  }
  getProduct = async (productId:number)=>{
    return await fetch(this.baseUrl+'/products/getDetail?product_id='+ productId, {method: 'GET'})
    .then(response => response.json())
    .then(result => {
      return result.data;
    });
  }
}

export default ProductService
