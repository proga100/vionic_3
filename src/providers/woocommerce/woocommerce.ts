import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';

@Injectable()
export class WooCommerceProvider {

  WooCommerce: any;

  constructor() {
    this.WooCommerce = WC({
      url: 'http://localhost/virtuemart/v3212',
      // url: 'https://www.cisupplystore.com/newvm',
      consumerKey: 'ck_ef3bd2f8c132ee1119ac9e605149236e09be7381', // Your consumer key
      consumerSecret: 'cs_10c9a6be970fe201900cfdd6cd5f7f50826fc373', // Your consumer secret
      wpAPI: true, // Enable the WP REST API integration
      queryStringAuth: true,
      verifySsl: false,
      version: 'wc/v2' // WooCommerce WP REST API version
    });
  }

  initialize(){
    return new Promise((resolve, reject) => {
      this.WooCommerce;
    });
  }
}
