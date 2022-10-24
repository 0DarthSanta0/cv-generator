import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AppRoutes } from '@constants/app-routes';
import { ISearchInputForm } from '@models/interfaces/search-input-form.interface';
import { ENTITIES_ITEMS } from '@constants/entities';
import { Store } from '@ngrx/store';
import { setBreadcrumbs } from '@ourStore/breadcrumbs/breadcrumbs.actions';
import { EMPLOYEES, ENTITIES, MAIN } from '@constants/breadcrumbs';

@Component({
  selector: 'app-entities-page',
  templateUrl: './entities-page.component.html',
  styleUrls: ['./entities-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesPageComponent implements OnInit, OnDestroy {

  public searchInput: FormGroup<ISearchInputForm>;

  public pathBreadcrumb: MenuItem[] = [{label: 'entities',routerLink:AppRoutes.ENTITIES_ROUTE}]

  public searchingText: string = '';
  public entities = ENTITIES_ITEMS;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private router: Router,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.defineForm();
    this.setBreadcrumbs();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public redirectToAddEntity(name: string): void {
    this.router.navigate([AppRoutes.MAIN_ROUTE + '/' + AppRoutes.ENTITIES_ROUTE, name]);
  }

  private setBreadcrumbs(): void {
    const breadcrumbs: MenuItem[] = [
      {label: MAIN, routerLink: AppRoutes.EMPLOYEES_ROUTE},
      {label: ENTITIES, routerLink: AppRoutes.ENTITIES_ROUTE},
    ];
    this.store.dispatch(setBreadcrumbs({breadcrumbs}));
  }

  private defineForm(): void {
    this.searchInput = this.formBuilder.group<ISearchInputForm>({
      text: this.formBuilder.control('', []),
    });

    this.searchInput.controls.text.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((text) => {
      this.searchingText = text;
    });
  }

}
