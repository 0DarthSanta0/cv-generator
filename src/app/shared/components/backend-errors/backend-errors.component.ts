import { Component, Input } from '@angular/core';
import { BackendErrorsInterface } from '@models/backend-errors.interface';
import { INVALID_IDENTIFIER_OR_PASSWORD } from '@constants/backend-errors';

@Component({
  selector: 'app-backend-errors',
  templateUrl: './backend-errors.component.html',
  styleUrls: ['./backend-errors.component.scss']
})
export class BackendErrorsComponent {
  @Input() public backendError: BackendErrorsInterface | null;

  public readonly backendErrors: { [key: string]: string } = INVALID_IDENTIFIER_OR_PASSWORD;
}
