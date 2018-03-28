import { Injectable } from '@angular/core';
import * as WC from 'virtuemart-api';

@Injectable()
export class WooCommerceProvider {

  WooCommerce: any;

  constructor() {
    this.WooCommerce = WC({
   // url: 'http://localhost/virtuemart/v3212',
      url: 'https://www.cisupplystore.com/newvm',
      consumerKey: 'abc', // Your consumer key
      consumerSecret: 'abc', // Your consumer secret
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
