import { Component } from '@angular/core';

/**
 * Generated class for the VendorComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'vendor',
  templateUrl: 'vendor.html'
})
export class VendorComponent {

  text: string;

  constructor() {
    console.log('Hello VendorComponent Component');
    this.text = 'Hello World';
  }

}
