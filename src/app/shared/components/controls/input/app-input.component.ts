import { ChangeDetectionStrategy, Component } from '@angular/core';
import {BaseControl} from "../../../models/base-control";

@Component({
   selector: 'app-input',
   templateUrl: './app-input.component.html',
   styleUrls: ['./app-input.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppInput extends BaseControl {

}