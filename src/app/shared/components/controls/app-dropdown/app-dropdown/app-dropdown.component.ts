import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseControl } from '@models/base-control';

@Component({
    selector: 'app-dropdown',
    templateUrl: './app-dropdown.component.html',
    styleUrls: ['./app-dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppDropdownComponent extends BaseControl {
    @Input() listData: string[] = [];
}
