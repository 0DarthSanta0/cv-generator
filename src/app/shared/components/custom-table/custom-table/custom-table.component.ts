import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-custom-table',
    templateUrl: './custom-table.component.html',
    styleUrls: ['./custom-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomTableComponent<T> {
    @Input() set tableData(dataList: T[] | null) {
        if (dataList) {
            this.dataList = dataList;
        }
    };

    public get tableData(): T[] {
        return this.dataList;
    }
    private dataList: T[];

    @Input() globalFilteredFields: string[] = [];
    @Input() columnNames: string[] = [];
    @Output() rowClicked = new EventEmitter<string>();

    public emitIdRow(value: string): void {
        this.rowClicked.emit(value);
    }
}

