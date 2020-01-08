# Ionic 4 Autocomplete

Autocomplete component for ionic 4.

## Support
* @ionic/angular `4.0.0`

## Usage
### Installation
```BASH
npm i ionic4-autocomplete
```
### Import Module
```TYPESCRIPT
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
...
import { AutocompleteModule } from "ionic4-calendar";
 
@NgModule({
  declarations: [
    MyApp,
    ...
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AutocompleteModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ...
  ]
})
export class AppModule {}
```

### NgModel mode
```HTML
<ion-autocomplete [suggestions]="customers"
                  (itemSelected)="customerSelected($event)"
                  [ngModel]="customerId">
</ion-autocomplete>
```
```TYPESCRIPT
import { Component } from '@angular/core';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  customers: any[];
  customerId: number;
  selectedCustomer: any;
  constructor() { }
  
  customerSelected(customer) {
    this.selectedCustomer = customer;
  }
  
}
```

### Reactive Forms
```HTML
<ion-autocomplete [suggestions]="customers"
                  (itemSelected)="customerSelected($event)"
                  formControlName="customerId">
</ion-autocomplete>
```

```TYPESCRIPT
import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  customers: any[];
  selectedCustomer: any;
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
    customerId: []
    ...
    });
   }
  
  customerSelected(customer) {
    this.selectedCustomer = customer;
  }
  
}
```

### Input Properties

| Name          | Type          | Default   | Description             |
| --------------|:-------------:| ---------:|------------------------:|
| suggestions   | any[]         | null      |List to search           |
| labelField    | string        | 'name'    |Label property           |
| idField       | string        | 'id'      |Id property              |
| placeholder   | string        | 'Search'  |Placeholder              |
| input value   | string        | ''        |Original value  of input |
| readonly      | boolean       | false     |Disable component        |


## Output Properties

| Name          | Type          | Description             |
| --------------|:-------------:|------------------------:|
| itemSelected  | EventEmitter  |Item Selected            |

## Thanks for reading
