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

  public searchData$ = new Subject<string>();
  public suggestedOptionsList$ = new Observable<string[]>();

  override ngOnInit(): void {
    this.suggestedOptionsList$ = this.searchData$.pipe(
        debounceTime(500),
        map((text: string) =>
            this.dataList.filter(c => c.startsWith(text))
        )
    );
    super.ngOnInit();
  }

  public search(text: string): void {
    this.searchData$.next(text);
  }
}
