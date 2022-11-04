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
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { REQUIRED_FIELD } from '@constants/validation-errors';
import {
  addLanguage,
  addResponsibility,
  addSkill,
  deleteLanguage,
  deleteResponsibility,
  deleteSkill,
  updateLanguage,
  updateResponsibility,
  updateSkill
} from '@ourStore/entities/entities-actions';
import { IAddEntityForm } from '../../models/add-entity-form.interface';
import { IChangeEntityForm } from '../../models/i-change-entity.form';
import { selectLoadingEntities } from '@ourStore/entities/entities-selectors';

@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEntityComponent implements OnInit, OnDestroy {

  public searchInput: FormControl<string>;
  public addEntityForm: FormGroup<IAddEntityForm>;
  public changeEntityForm: FormGroup<IChangeEntityForm>;

  public readonly entities = ENTITIES_ITEMS;
  public readonly requiredField = REQUIRED_FIELD;

  public readonly entitiesName: string[] = Object.keys(this.entities);

  public searchingText: string = '';
  public entityName: string = '';

  public entities$: Observable<SkillInterface[] | LanguageInterface[] | IResponsibility[]>
  public isLoadingEntitiesData$: Observable<boolean> = this.store.pipe(select(selectLoadingEntities));

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
      this.defineForm();
      this.chooseEntity();
    }

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public trackByFn(index: number, item: any): number {
    return item.id;
  }

  public deleteEntity(id: number): void {

    switch (this.entityName) {
      case this.entitiesName[0]: {
        this.store.dispatch(deleteSkill({id}));
        break;
      }
      case this.entitiesName[1]: {
        this.store.dispatch(deleteLanguage({id}));
        break;
      }
      case this.entitiesName[2]: {
        this.store.dispatch(deleteResponsibility({id}))
        break;
      }
    }
  }

  public createNewEntity() {
    const newEntityName = this.addEntityForm.controls.name.value;

    if (newEntityName) {
      switch (this.entityName) {
        case this.entitiesName[0]: {
          this.store.dispatch(addSkill({name: newEntityName}));
          break;
        }
        case this.entitiesName[1]: {
          this.store.dispatch(addLanguage({name: newEntityName}));
          break;
        }
        case this.entitiesName[2]: {
          this.store.dispatch(addResponsibility({name: newEntityName}))
          break;
        }
      }
      this.addEntityForm.controls.name.reset();
      this.addEntityForm.controls.name.markAsPristine();
      this.addEntityForm.controls.name.markAsUntouched();
      this.addEntityForm.controls.name.setErrors(null);
      this.addEntityForm.controls.name.setValidators(null);

    }
  }

  public updateEntity(id: number, newName: string): void {

    switch (this.entityName) {
      case this.entitiesName[0]: {
        this.store.dispatch(updateSkill({id: id, name: newName}));
        break;
      }
      case this.entitiesName[1]: {
        this.store.dispatch(updateLanguage({id: id, name: newName}));
        break;
      }
      case this.entitiesName[2]: {
        this.store.dispatch(updateResponsibility({id: id, name: newName}))
        break;
      }
    }
  }

  public chooseEntity(): void {
    const entitiesName: string[] = Object.keys(this.entities);
    switch (this.entityName) {
      case entitiesName[0]: {
        this.getSkillsFromStore();
        break;
      }
      case entitiesName[1]: {
        this.getLanguagesFromStore();
        break;
      }
      case entitiesName[2]: {
        this.getResponsibilitiesFromStore();
        break;
      }
    }
  }

  private setBreadcrumbs() {
    const pathBreadcrumb: MenuItem[] = [
      {label: 'entities', routerLink: AppRoutes.ENTITIES_ROUTE},
      {label: this.entityName}
    ];

    this.store.dispatch(setBreadcrumbs({breadcrumbs: pathBreadcrumb}));
  }

  private defineForm(): void {
    this.searchInput = this.formBuilder.control<string>('')

    this.addEntityForm = this.formBuilder.group<IAddEntityForm>({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(3)])
    })

    this.changeEntityForm = this.formBuilder.group<IChangeEntityForm>({
      entities: this.formBuilder.group({})
    })

    this.searchInput.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((text) => {
      this.searchingText = text;
    });
  }

  private getSkillsFromStore(): void {
    this.entities$ = this.store.pipe(select(selectSkills));
    this.entities$.subscribe((skills) => this.initializeEntityName(skills));
  }

  private getLanguagesFromStore(): void {
    this.entities$ = this.store.pipe(select(selectLanguages))
    this.entities$.subscribe((languages) => this.initializeEntityName(languages));
  }

  private getResponsibilitiesFromStore(): void {
    this.entities$ = this.store.pipe(select(selectResponsibilities))
    this.entities$.subscribe((responsibilities) => this.initializeEntityName(responsibilities));
  }

  private initializeEntityName(entities: SkillInterface[] | LanguageInterface[] | IResponsibility[]): void {

    entities.forEach((entity: SkillInterface | LanguageInterface | IResponsibility) => {
      const entityControl = this.formBuilder.control(
        entity.name, [Validators.required]
      )

      this.changeEntityForm.controls.entities.addControl(entity.name, entityControl);
    })

  }
}