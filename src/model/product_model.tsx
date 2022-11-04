import {FC, useEffect, useState} from 'react';
import ProductImageModel from './product_image_model';

interface ProductModel {
  id: number;
  product_category_id: number;
  name:string;
  producer:string;
  description:string
  cost:number,
  rating:number,
  product_images: ProductImageModel[]
}

export default ProductModel