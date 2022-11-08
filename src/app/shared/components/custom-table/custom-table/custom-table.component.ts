import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-custom-table',
    templateUrl: './custom-table.component.html',
    styleUrls: ['./custom-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomTableComponent<T> implements OnInit{
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
    @Input() columnNames: {[key: string] : string} = {};
    @Input() scrollHeight: number = 250;
    @Input() virtualRowHeight: number = 30;
    @Input() isScrollable: boolean = true;
    @Input() isVirtualScroll: boolean = true;
    @Output() rowClicked = new EventEmitter<string>();

    public columnNamesKey: string[] = [];

    public emitIdRow(value: string): void {
        this.rowClicked.emit(value);
    }

    public ngOnInit(): void {
        this.columnNamesKey = Object.keys(this.columnNames);
    }
}

