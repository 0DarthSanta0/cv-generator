import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseControl} from "../../../models/base-control";

@Component({
   selector: 'app-date-picker',
   templateUrl: './date-picker.component.html',
   styleUrls: ['./date-picker.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent extends BaseControl {

   @Input() dateFormat: string = 'yy-mm-dd';

}
