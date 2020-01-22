import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

import { UserInput } from '../userInput';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})

export class SearchFormComponent implements OnInit {
  isValidFormSubmitted = false;
  userInput = new UserInput();
  lat;
  lon;
  showHide: false;

  constructor(private weatherService: WeatherService,
              private router: Router) {
  }

  ngOnInit() {
  }

  @Output() inputSubmit = new EventEmitter<UserInput>();

  onFormSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
       return;
    }
    this.isValidFormSubmitted = true;
    this.userInput = form.value;
    this.inputSubmit.emit(this.userInput);
  }
}


