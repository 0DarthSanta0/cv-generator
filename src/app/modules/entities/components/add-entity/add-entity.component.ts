import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { AppRoutes } from '@constants/app-routes';
import { setBreadcrumbs } from '@ourStore/breadcrumbs/breadcrumbs.actions';
import { ENTITIES_ITEMS } from '@constants/entities';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IResponsibility } from '@models/interfaces/responsibility.interface';
import { SkillInterface } from '@models/skill.interface';
import { LanguageInterface } from '@models/interfaces/language.interface';
import { selectLanguages, selectResponsibilities, selectSkills } from '@ourStore/main/main-selectors';
import { ISearchInputForm } from '@models/interfaces/search-input-form.interface';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { REQUIRED_FIELD } from '@constants/validation-errors';
import {
  addLanguage,
  addResponsibility,
  addSkill,
  deleteLanguage,
  deleteResponsibility,
  deleteSkill
} from '@ourStore/entities/entities-actions';
import { AddEntityForm } from '../../models/add-entity-form.interface';
import { languagesList, responsibilitiesList, skillsList } from '@ourStore/main/main-actions';
import { ENTITIES, MAIN } from '@constants/breadcrumbs';

@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEntityComponent implements OnInit, OnDestroy {

  public searchInput: FormGroup<ISearchInputForm>;
  public addEntityForm: FormGroup<AddEntityForm>;

  public entities = ENTITIES_ITEMS;
  public searchingText: string = '';
  public entityName: string = '';
  public requiredField = REQUIRED_FIELD;

  public entities$: Observable<IResponsibility[] | SkillInterface[] | LanguageInterface[]>;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private formBuilder: NonNullableFormBuilder,
  ) {
  }

  ngOnInit(): void {
    const nameEntity = this.route.snapshot.paramMap.get('name');

    if (nameEntity) {
      this.entityName = nameEntity;
      this.setBreadcrumbs();
      this.chooseDataStore();
    }
    this.defineForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public deleteEntity(id: number): void {
    this.chooseDataStore(id);
  }

  public onSubmit() {
    const newEntityName = this.addEntityForm.controls.name.value;
    this.chooseDataStore(0, newEntityName);
    this.addEntityForm.reset();

  }

  public trackByFn(index: number, item: any) {
    return item.id;
  }

  private setBreadcrumbs() {
    const breadcrumbs: MenuItem[] = [
      {label: MAIN, routerLink: AppRoutes.EMPLOYEES_ROUTE},
      {label: ENTITIES, routerLink: AppRoutes.ENTITIES_ROUTE},
      {label: this.entityName},
    ];
    this.store.dispatch(setBreadcrumbs({breadcrumbs}));
  }

  private chooseDataStore(deleteId?: number, newEntityName?: string) {
    const entitiesName: string[] = Object.keys(this.entities);

    switch (this.entityName) {
      case entitiesName[0]: {

        if (deleteId) {
          this.store.dispatch(deleteSkill({id: deleteId}));
          this.store.dispatch(skillsList());
        }
        if (newEntityName) {
          this.store.dispatch(addSkill({name: newEntityName}));
          this.store.dispatch(skillsList());
        }

        this.entities$ = this.store.pipe(select(selectSkills));

        break
      }
      case entitiesName[1]: {

        if (deleteId) {
          this.store.dispatch(deleteLanguage({id: deleteId}));
          this.store.dispatch(languagesList());
        }
        if (newEntityName) {
          this.store.dispatch(addLanguage({name: newEntityName}));
          this.store.dispatch(languagesList());
        }

        this.entities$ = this.store.pipe(select(selectLanguages));
        break
      }
      case entitiesName[2]: {

        if (deleteId) {
          this.store.dispatch(deleteResponsibility({id: deleteId}));
          this.store.dispatch(responsibilitiesList());
        }
        if (newEntityName) {
          this.store.dispatch(addResponsibility({name: newEntityName}));
          this.store.dispatch(responsibilitiesList());
        }

        this.entities$ = this.store.pipe(select(selectResponsibilities));

        break
      }
    }
  }

  private defineForm(): void {
    this.searchInput = this.formBuilder.group<ISearchInputForm>({
      text: this.formBuilder.control('', []),
    });

    this.addEntityForm = this.formBuilder.group<AddEntityForm>({
      name: this.formBuilder.control('', [Validators.required])
    })

    this.searchInput.controls.text.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((text) => {
      this.searchingText = text;
    });
  }
}
