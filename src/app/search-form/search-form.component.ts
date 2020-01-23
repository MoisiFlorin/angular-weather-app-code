import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserInput } from '../userInput';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})

export class SearchFormComponent implements OnInit {

  constructor(private weatherService: WeatherService) {
  }
  // tslint:disable-next-line: typedef
  public isValidFormSubmitted = false;
  public userInput: any = new UserInput();
  public lat: string;
  public lon: string;
  public showHide: false;

  @Output() public inputSubmit: any = new EventEmitter<UserInput>();

  public ngOnInit(): void {
  }

  public onFormSubmit(form: NgForm): void {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.userInput = form.value;
    this.inputSubmit.emit(this.userInput);
  }
}


