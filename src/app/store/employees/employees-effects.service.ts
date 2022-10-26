import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeesService } from '@services/http/employees.service';
import { catchError, combineLatestWith, map, of, switchMap, withLatestFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  employeeByIdAction,
  employeeByIdFailureAction,
  employeeByIdSuccessAction,
  employeeCvsList,
  employeeCvsListSuccess,
  employeesListAction,
  employeesListFailureAction,
  employeesListSuccessAction,
  employeeUpdateAction,
  employeeUpdateFailureAction,
  employeeUpdateSuccessAction,
  openCv,
  openCvFailure,
  openCvSuccess,
  positionsListAction,
  positionsListFailureAction,
  positionsListSuccessAction,
} from './employees.actions';
import { SkillsService } from '@services/http/skills.service';
import { select, Store } from '@ngrx/store';
import { employeeDtoSelector, listPositionsSelector } from './employees.selectors';
import { EmployeesMapperService } from '@services/employees-mapper.service';
import { EmplLanguageService } from '@services/http/empl-language.service';
import { EmployeesInterface } from '@models/employees.interface';
import { PositionService } from '@services/http/position.service';
import { selectLanguages, selectResponsibilities, selectSkills } from '@ourStore/main/main-selectors';
import { ActivatedRoute } from '@angular/router';
import { projectsListSelector } from '@ourStore/projects/projects.selectors';

@Injectable()
export class EmployeesEffects {

  public employeesList$ = createEffect(() => this.actions$.pipe(
    ofType(employeesListAction),
    switchMap(() => this.employeesService.getListEmployees()),
    withLatestFrom(this.store.pipe(select(selectSkills))),
    map(([listEmployees, skills]) => (this.employeeMappers.getEmployeesWithSkills(listEmployees, skills))),
    map((listEmployees) =>
      employeesListSuccessAction({listEmployees})
    ),
    catchError((errorResponse: HttpErrorResponse) =>
      of(employeesListFailureAction({errors: errorResponse.error}))
    )
  ));

  public positionsList$ = createEffect(() => this.actions$.pipe(
    ofType(positionsListAction),
    switchMap(() =>
      this.positionService.getListPositions()),
    map((listPositions) =>
      positionsListSuccessAction({listPositions})
    ),
    catchError((errorResponse: HttpErrorResponse) =>
      of(positionsListFailureAction({errors: errorResponse.error}))
    )
  ));

  public employeeById$ = createEffect(() => this.actions$.pipe(
      ofType(employeeByIdAction),
      switchMap(({id}) => this.employeesService.getEmployeeById(id)),
      combineLatestWith(
        this.store.pipe(select(selectLanguages)),
        this.store.pipe(select(selectSkills)),
        // pipe(
        //   // filter(([, langs, skills]) => !!langs.length && !!skills.length)
        //   filter(() => )
        // )
      ),
      map(([employee, languages, skills]) => this.employeeMappers.getEmployeeDto(employee, skills, languages)),
      map((employeeDto) => {
        return employeeByIdSuccessAction({employeeDto: employeeDto});
      }),
      catchError((errorResponse: HttpErrorResponse) =>
        of(employeeByIdFailureAction({errors: errorResponse.error}))
      )
    )
  );

  public employeeUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(employeeUpdateAction),
    withLatestFrom(
      this.store.pipe(select(selectLanguages)),
      this.store.pipe(select(selectSkills)),
      this.store.pipe(select(listPositionsSelector)),
    ),
    map(([{newEmployee}, languages, skills, positions]) => this.employeeMappers.employeeDtoToEmployee(newEmployee, skills, languages, positions)),
    switchMap((mappedEmployee: EmployeesInterface) => this.employeesService.updateEmployee(mappedEmployee)),
    map(() => employeeUpdateSuccessAction()),
    catchError((errorResponse: HttpErrorResponse) =>
      of(employeeUpdateFailureAction({errors: errorResponse.error}))
    )
  ));

  public employeeCvsList$ = createEffect(() => this.actions$.pipe(
    ofType(employeeCvsList),
    switchMap(() =>
      this.store.pipe(select(employeeDtoSelector))
    ),
    map((employee) =>
      this.employeeMappers.getCvsListFormEmployee(employee)),
    map((cvsList) =>
      employeeCvsListSuccess({cvsList})
    ),
  ));

  public openCv$ = createEffect(() => this.actions$.pipe(
    ofType(openCv),
    withLatestFrom(
      this.store.pipe(select(selectLanguages)),
      this.store.pipe(select(selectSkills)),
      this.store.pipe(select(projectsListSelector)),
      this.store.pipe(select(selectResponsibilities)),
    ),
    map(([{
      idCv,
      employee
    }, langs, skills, projects, responsibilities]) => this.employeeMappers.getEmployeeCvDto(idCv, employee,langs, skills, projects, responsibilities)),
    map((employeeCv) =>
      openCvSuccess({employeeCv})
    ),
    catchError((errorResponse: HttpErrorResponse) =>
      of(openCvFailure({errors: errorResponse.error}))
    )
  ));

  constructor(private actions$: Actions,
              private store: Store,
              private employeesService: EmployeesService,
              private skillsService: SkillsService,
              private languageService: EmplLanguageService,
              private positionService: PositionService,
              private employeeMappers: EmployeesMapperService,
              private _routes: ActivatedRoute
  ) {
  }
}