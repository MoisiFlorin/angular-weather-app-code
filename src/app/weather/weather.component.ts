import { Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';

import { Chart } from 'chart.js';
import { UserInput } from '../userInput';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  providers: [WeatherService]
})
export class WeatherComponent implements OnInit {
  chart = [];
  isValidFormSubmitted = false;
  userInput = new UserInput();
  lat;
  lon;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
  }


onFormSubmited(userInput) {
    console.log(userInput);
    this.weatherService.getWeatherDataByCoords(userInput)
    .subscribe((data: any) => {
     this.userInput = data;

     this.lat = data.coord.lat;
     this.lon = data.coord.lon;

     /* form.resetForm();  */
   });

    this.weatherService.dailyForecast(userInput)
      .subscribe(res => {
        const temp_max = res['list'].map(res => res.main.temp_max);
        const temp_min = res['list'].map(res => res.main.temp_min);
        const alldates = res['list'].map(res => res.dt)

        const weatherDates = []
        alldates.forEach((res) => {
        const jsdate = new Date(res * 1000)
        weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
        });
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temp_max,
                borderColor: '#DD744D',
                fill: false
              },
              {
                data: temp_min,
                borderColor: '#70BFCA',
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });
      });

 }
}
