import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
/**
 * Generated class for the SizeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'size',
  templateUrl: 'size.html'
})
export class SizeComponent {

  text: string;

  constructor(public viewCtrl: ViewController) {
    console.log('Hello SizeComponent Component');
    this.text = 'Hello World';
  }
  closeModal() {

    this.viewCtrl.dismiss();
  }
}
