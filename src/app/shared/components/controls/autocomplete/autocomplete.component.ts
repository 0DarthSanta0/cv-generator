import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseControl} from '../../../models/base-control';
import {debounceTime, map, Observable, Subject} from "rxjs";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteComponent extends BaseControl {

  @Input() public isMultiple: boolean = false;
  @Input() public dataList: string[] = [];

  public input$ = new Subject<string>();
  public output$ = new Observable<string[]>();

  override ngOnInit() {
    this.output$ = this.input$.pipe(
        debounceTime(500),
        map((text: string) =>
            this.dataList.filter(c => c.startsWith(text))
        )
    )
  }

  search(text: string) {
    this.input$.next(text);
  }
}
