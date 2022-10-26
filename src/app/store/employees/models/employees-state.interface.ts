import { BackendErrorsInterface } from '@models/backend-errors.interface';
import { IEmployeesWithSkills } from '@models/employees.interface';
import { EmployeeInfoDtoInterface } from '@models/interfaces/employee-info-dto.interface';
import { PositionInterface } from '@models/interfaces/position.interface';
import { CVsInterface } from '@services/fake-cvs.service';
import { JsonEmployeeCv, JsonResponse } from '@models/interfaces/json-data-response.interface';
import { EmployeeCvDtoInterface } from '@models/interfaces/employee-cv-dto.interface';

export interface EmployeesStateInterface {
    isLoading: boolean,
    employeesList: IEmployeesWithSkills[],
    positionsList: PositionInterface[],
    employeeDto: EmployeeInfoDtoInterface,
    errors: BackendErrorsInterface | null,
    cvsList: JsonEmployeeCv[],
    employeeCvDto: EmployeeCvDtoInterface
}