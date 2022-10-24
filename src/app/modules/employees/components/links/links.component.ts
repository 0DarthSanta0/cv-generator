import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { languagesList, responsibilitiesList } from '@ourStore/main/main-actions';
import { getProjectsList } from '@ourStore/projects/projects.actions';
import { SELECTED_CV_COMPONENT, SELECTED_INFO_COMPONENT } from '@constants/employee';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinksComponent implements OnInit {

  public readonly infoComponentName: string = SELECTED_INFO_COMPONENT;
  public readonly cvComponentName: string = SELECTED_CV_COMPONENT;

  public selectedComponent: string;
  public isSelected = true;

  constructor(private store: Store) {
  }

  public selectComponent(componentName: string) {
    this.selectedComponent = componentName;
    if (componentName === this.cvComponentName) {
      this.isSelected = !this.isSelected;
    }else {
      this.isSelected = true;
    }
  }

  public ngOnInit(): void {
    this.store.dispatch(responsibilitiesList());
    this.store.dispatch(getProjectsList());
    this.store.dispatch(languagesList());
  }

}
