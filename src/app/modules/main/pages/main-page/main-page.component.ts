import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setBreadcrumbs } from '@ourStore/breadcrumbs/breadcrumbs.actions';
import { SelectEvent } from '@models/interfaces/select.event';
import { Router } from '@angular/router';
import { MainModulesTitles } from '@constants/main-modules-titles';
import { ListElement } from '@models/interfaces/list-element.interface';
import { FIRST_SELECTED_ELEMENT, MAIN_PAGE_ELEMENTS_LIST } from '@constants/main-page-list';
import { languagesList, responsibilitiesList, skillsList } from '@ourStore/main/main-actions';
import { positionsListAction } from '@ourStore/employees/employees.actions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {

  public listElements: ListElement[] = MAIN_PAGE_ELEMENTS_LIST;

  public selected: ListElement | undefined = FIRST_SELECTED_ELEMENT;

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.setSelectedAndBreadcrumbs();
    this.store.dispatch(skillsList());
    this.store.dispatch(languagesList());
    this.store.dispatch(responsibilitiesList());
    this.store.dispatch(positionsListAction());
  }

  public onSelect(event: SelectEvent): void {
    this.router.navigate([`/${MainModulesTitles.MAIN_VALUE}/${event.value.value}`]);
  }

  private setSelectedAndBreadcrumbs(): void {
    this.selected = MAIN_PAGE_ELEMENTS_LIST.find(element => element.value === this.router.url.split('/')[2]);
    this.store.dispatch(setBreadcrumbs({
      breadcrumbs: [
        { label: MainModulesTitles.MAIN_LABEL },
      ]
    }));
  }

}
