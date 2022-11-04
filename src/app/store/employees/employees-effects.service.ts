import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeesService } from '@services/http/employees.service';
import { catchError, combineLatestWith, filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  deleteEmployeeCv,
  deleteEmployeeCvFailure,
  deleteEmployeeCvSuccess,
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
  setCvTemplateToEmployee,
  setCvTemplateToEmployeeFailure,
  setCvTemplateToEmployeeSuccess,
  updateCv,
  updateCvFailure,
  updateCvSuccess,
} from './employees.actions';
import { SkillsService } from '@services/http/skills.service';
import { select, Store } from '@ngrx/store';
import { employeeCvsListSelector, employeeDtoSelector, listPositionsSelector } from './employees.selectors';
import { EmployeesMapperService } from '@services/employees-mapper.service';
import { EmplLanguageService } from '@services/http/empl-language.service';
import { EmployeesInterface } from '@models/employees.interface';
import { PositionService } from '@services/http/position.service';
import { selectLanguages, selectResponsibilities, selectSkills } from '@ourStore/main/main-selectors';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
  CV_UPDATE_FAILURE,
  CV_UPDATE_SUCCESS,
  EMPLOYEE_CV_DELETE_FAILURE,
  EMPLOYEE_CV_DELETE_SUCCESS,
  EMPLOYEE_UPDATE_FAILURE,
  EMPLOYEE_UPDATE_SUCCESS,
  SET_CV_TEMPLATE_TO_EMPLOYEE_FAILURE,
  SET_CV_TEMPLATE_TO_EMPLOYEE_SUCCESS
} from '@constants/toast-messages';
import { FakeCvsService } from '@services/fake-cvs.service';
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
      ),
      filter(([_, langs, skills]) => !!langs.length && !!skills.length),
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
    map(() => {
      this.messageService.add({severity: 'success', summary: EMPLOYEE_UPDATE_SUCCESS});
      return employeeUpdateSuccessAction()
    }),
    catchError((errorResponse: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', summary: EMPLOYEE_UPDATE_FAILURE});
        return of(employeeUpdateFailureAction({errors: errorResponse.error}))
      }
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
    ),
    map(([{
      idCv,
      employee
    }, langs, skills]) => this.employeeMappers.getEmployeeCvDto(idCv, employee, langs, skills)),
    map((employeeCv) =>
      openCvSuccess({employeeCv})
    ),
    catchError((errorResponse: HttpErrorResponse) =>
      of(openCvFailure({errors: errorResponse.error}))
    )
  ));

  public cvUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(updateCv),
    withLatestFrom(
      this.store.pipe(select(employeeCvsListSelector)),
      this.store.pipe(select(selectLanguages)),
      this.store.pipe(select(selectSkills)),
      this.store.pipe(select(selectResponsibilities)),
      this.store.pipe(select(employeeDtoSelector)),
    ),
    map(([{
      newCv,
    }, listCv, languages, skills, responsibilities, currentEmployee]) => this.employeeMappers.updateCv(newCv, listCv, languages, skills, responsibilities, currentEmployee.employee.id)),
    switchMap(({jsonCvs, employeeId}) => this.employeesService.updateEmployeeCvs(jsonCvs, employeeId)),
    withLatestFrom(
      this.store.pipe(select(selectSkills)),
      this.store.pipe(select(selectLanguages)),
    ),
    map(([employee, skills, languages]) => this.employeeMappers.getEmployeeDto(employee, skills, languages)),
    map((updatedEmployee) => {
      this.messageService.add({severity: 'success', summary: CV_UPDATE_SUCCESS});
      return updateCvSuccess({updatedEmployee: updatedEmployee});
    }),
    catchError((errorResponse: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', summary: CV_UPDATE_FAILURE});
        return of(updateCvFailure({errors: errorResponse.error}))
      }
    )
  ));

  public setCvTemplateToEmployee$ = createEffect(() => this.actions$.pipe(
    ofType(setCvTemplateToEmployee),
    switchMap(({idCv}) => this.fakeCvsService.getCVById(idCv)),
    withLatestFrom(
      this.store.pipe(select(employeeCvsListSelector)),
      this.store.pipe(select(employeeDtoSelector)),
      this.store.pipe(select(projectsListSelector)),
    ),
    map(([cvTemplate, employeeCvs, currentEmployee, projects]) => this.employeeMappers.setCvTemplateToEmployeeCvs(cvTemplate, employeeCvs, currentEmployee.employee,projects)),
    switchMap(({cvsList, employeeId}) => this.employeesService.updateEmployeeCvs(cvsList, employeeId)),
    withLatestFrom(
      this.store.pipe(select(selectSkills)),
      this.store.pipe(select(selectLanguages)),
    ),
    map(([employee, skills, languages]) => this.employeeMappers.getEmployeeDto(employee, skills, languages)),
    map((updatedEmployee) => {
        this.messageService.add({severity: 'success', summary: SET_CV_TEMPLATE_TO_EMPLOYEE_SUCCESS});
        return setCvTemplateToEmployeeSuccess({updatedEmployee: updatedEmployee});
      }
    ),
    catchError((errorResponse: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', summary: SET_CV_TEMPLATE_TO_EMPLOYEE_FAILURE});
        return of(setCvTemplateToEmployeeFailure({errors: errorResponse.error}))
      }
    )
  ));

  public deleteEmployeeCv$ = createEffect(() => this.actions$.pipe(
    ofType(deleteEmployeeCv),
    withLatestFrom(
      this.store.pipe(select(employeeDtoSelector))
    ),
    map(([{idCv}, employee]) => this.employeeMappers.filteredEmployeeCvs(idCv, employee)),
    switchMap(({jsonCvs, employeeId}) => this.employeesService.updateEmployeeCvs(jsonCvs, employeeId)),
    withLatestFrom(
      this.store.pipe(select(selectSkills)),
      this.store.pipe(select(selectLanguages)),
    ),
    map(([employee, skills, languages]) => this.employeeMappers.getEmployeeDto(employee, skills, languages)),
    map((updatedEmployee) => {
        this.messageService.add({severity: 'success', summary: EMPLOYEE_CV_DELETE_SUCCESS});
        return deleteEmployeeCvSuccess({updatedEmployee: updatedEmployee});
      }
    ),
    catchError((errorResponse: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', summary: EMPLOYEE_CV_DELETE_FAILURE});
        return of(deleteEmployeeCvFailure({errors: errorResponse.error}));
      }
    )
  ));

  constructor(private actions$: Actions,
              private store: Store,
              private employeesService: EmployeesService,
              private skillsService: SkillsService,
              private languageService: EmplLanguageService,
              private positionService: PositionService,
              private employeeMappers: EmployeesMapperService,
              private fakeCvsService: FakeCvsService,
              private _routes: ActivatedRoute,
              private messageService: MessageService
  ) {
  }
}