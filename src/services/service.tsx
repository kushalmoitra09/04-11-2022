import {FC, useEffect, useState} from 'react';

abstract class Service {
  baseUrl:String;
  
  constructor() {
      this.baseUrl = 'http://staging.php-dev.in:8844/trainingapp/api';
  }

}
export default Service