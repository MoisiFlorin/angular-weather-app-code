import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class WeatherService {
  private urlWeather = 'https://api.openweathermap.org/data/2.5/weather';
  private urlForecast = 'https://api.openweathermap.org/data/2.5/forecast';
  private apiKey = '286ba68feaa26a45be803bedbee2157e';

  constructor(private http: HttpClient) { }

  public getWeatherDataByCoords(userInput: { lat: string; lon: string; }) {
    const params = new HttpParams()
      .set('lat', userInput.lat)
      .set('lon', userInput.lon)
      .set('units', 'metric')
      .set('appid', this.apiKey);

    return this.http.get(this.urlWeather, { params });

  }

  public dailyForecast(userInput: { lat: string; lon: string; }) {
    const params = new HttpParams()
      .set('lat', userInput.lat)
      .set('lon', userInput.lon)
      .set('units', 'metric')
      .set('appid', this.apiKey);

    return this.http.get(this.urlForecast, { params });

  }

}
