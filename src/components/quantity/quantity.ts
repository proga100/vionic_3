import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
/**
 * Generated class for the QuantityComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'quantity',
  templateUrl: 'quantity.html'
})
export class QuantityComponent {

  text: string;

  constructor(public viewCtrl: ViewController) {
    console.log('Hello QuantityComponent Component');
    this.text = 'Hello World';
  }
  closeModal() {

    this.viewCtrl.dismiss();
  }
}
