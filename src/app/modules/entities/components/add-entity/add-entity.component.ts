import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEntityComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    const nameEntity = this.route.snapshot.paramMap.get('name');

    if (nameEntity) {

    }
  }

}
