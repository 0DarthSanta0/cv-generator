import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomButtonComponent {

  @Input() public label: string = 'Default';
  @Input() public disabled: boolean = false;
}
