import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseControl} from "../../../models/base-control";

@Component({
   selector: 'app-autocomplete',
   templateUrl: './autocomplete.component.html',
   styleUrls: ['./autocomplete.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteComponent extends BaseControl {

   @Input() public isMultiple: boolean = false;
   @Input() public dataList: string[] = [];

   public output: string[] = [];

   search(event: any) {
      this.output = this.dataList.filter(c => c.startsWith(event.query));
   }
}
