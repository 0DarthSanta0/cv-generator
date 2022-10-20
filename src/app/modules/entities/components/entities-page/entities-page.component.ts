import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AppRoutes } from '@constants/app-routes';
import { ISearchInputForm } from '@models/interfaces/search-input-form.interface';
import { ENTITIES } from '@constants/entities';

@Component({
  selector: 'app-entities-page',
  templateUrl: './entities-page.component.html',
  styleUrls: ['./entities-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesPageComponent implements OnInit, OnDestroy {

  public searchInput: FormGroup<ISearchInputForm>;

  public searchingText: string = '';
  public entities: string[] = ENTITIES;
  public pathBreadcrumb: MenuItem[] = [{label: ''}, {}]
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.defineForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public redirectToAddEntity(name: string): void {
    this.router.navigate([AppRoutes.MAIN_ROUTE + '/' + AppRoutes.ENTITIES_ROUTE, name]);
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
