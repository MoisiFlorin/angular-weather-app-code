import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { UserInput } from './userInput';


@Injectable({ providedIn: 'root' })

export class WeatherService {
  urlWeather = 'https://api.openweathermap.org/data/2.5/weather';
  urlForecast = 'https://api.openweathermap.org/data/2.5/forecast';
  apiKey = '286ba68feaa26a45be803bedbee2157e';

  constructor(private http: HttpClient) { }

  getWeatherDataByCoords(userInput) {
    const params = new HttpParams()
    .set('lat', userInput.lat)
    .set('lon', userInput.lon)
    .set('units', 'metric')
    .set('appid', this.apiKey);

    return this.http.get(this.urlWeather, { params });

  }

  dailyForecast(userInput) {
    const params = new HttpParams()
    .set('lat', userInput.lat)
    .set('lon', userInput.lon)
    .set('units', 'metric')
    .set('appid', this.apiKey);

    return this.http.get(this.urlForecast, { params });

  }

}
