import {Component, Input} from '@angular/core';
import {BackendErrorsInterface} from "../../models/backend-errors.interface";

@Component({
  selector: 'app-backend-errors',
  templateUrl: './backend-errors.component.html',
  styleUrls: ['./backend-errors.component.scss']
})
export class BackendErrorsComponent {
  @Input() public backendError: BackendErrorsInterface | null;
}
