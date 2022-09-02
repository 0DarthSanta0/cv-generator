import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-registr',
  templateUrl: './registr.component.html',
  styleUrls: ['./registr.component.scss']
})
export class RegistrComponent implements OnInit{

  constructor(
      private fb: FormBuilder,
  ) {
  }

  public form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required,]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]]
    });

  }

}
