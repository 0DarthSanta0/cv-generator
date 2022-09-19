import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-custom-table',
    templateUrl: './custom-table.component.html',
    styleUrls: ['./custom-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomTableComponent<T> {
    @Input() set tableData(inputListData: T[] | null) {
        if (inputListData) {
            this.listData = inputListData;
        }
    };

    public get tableData(): T[] {
        return this.listData;
    }
    private listData: T[];

    @Input() globalFilteredFields: string[] = [];
    @Input() columnName: string[] = [];
    @Output() clickByRow = new EventEmitter<string>();

    public emitIdRow(value: string): void {
        this.clickByRow.emit(value);
    }
}

