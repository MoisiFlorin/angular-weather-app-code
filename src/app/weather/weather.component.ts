import { Component, OnInit } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';


import { Chart } from 'chart.js';
import { UserInput } from '../userInput';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  providers: [WeatherService],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-360deg)' })),
      transition('rotated => default', animate('5500ms ease-out')),
      transition('default => rotated', animate('5500ms ease-in'))
    ])
  ]
})
export class WeatherComponent implements OnInit {
  public chart: any = [];
  // tslint:disable-next-line: typedef
  public isValidFormSubmitted = false;
  public userInput: any = new UserInput();
  public lat: string;
  public lon: string;
  public res: string;
  public state: string = 'default';

  constructor(private weatherService: WeatherService) { }

  public ngOnInit(): void {
  }

  public rotate(): void {
    this.state = (this.state === 'default' ? 'rotated' : 'default');

}

  public onFormSubmited(userInput: any): void {
    console.log(userInput);
    this.weatherService.getWeatherDataByCoords(userInput)
      .subscribe((data: any) => {
        this.userInput = data;

        this.lat = data.coord.lat;
        this.lon = data.coord.lon;

        /* form.resetForm();  */
      });

    this.weatherService.dailyForecast(userInput)
      .subscribe((res: any) => {
        const tempMax: any = res.list.map((res: { main: { temp_max: number; }; }) => res.main.temp_max);
        const tempMin: any = res.list.map((res: { main: { temp_min: number; }; }) => res.main.temp_min);
        const alldates: any = res.list.map((res: { dt: any; }) => res.dt);

        const weatherDates: string[] = [];
        alldates.forEach((res: number) => {
          const jsdate: any = new Date(res * 1000);
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
        });
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: tempMax,
                borderColor: '#DD744D',
                fill: false
              },
              {
                data: tempMin,
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
