import { Component } from '@angular/core';

/**
 * Generated class for the FillterComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'fillter',
  templateUrl: 'fillter.html'
})
export class FillterComponent {

  brightness: number = 20;
  contrast: number = 0;
  warmth: number = 1300;
  structure: any = { lower: 33, upper: 60 };

  text: string;

  constructor() {
    console.log('Hello FillterComponent Component');
    this.text = 'Hello World';
  }

}
