import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseControl} from "../../../models/base-control";

@Component({
   selector: 'app-textarea',
   templateUrl: './textarea.component.html',
   styleUrls: ['./textarea.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent extends BaseControl {
   @Input() public rows: number = 5;

   public autoResize: boolean = true;
}
