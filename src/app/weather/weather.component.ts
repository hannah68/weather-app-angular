import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  cityName: string = '';
  temperature: string = '';
  description: string = "";
  errorMessage: string = "";

  constructor(private http: HttpClient) {}

  submitCityHandler() {
    if (this.cityName.trim() === '') {
      this.errorMessage = "Please provide a valid city name."
    }
    try {
      const apiKey = '30fadb55e22e834fe312ae8c137e76d4';

      this.http
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${apiKey}`
        )
        .subscribe((data: any) => {
          this.temperature = data.main.temp;
          this.description = data.weather.map((weather: any) => weather.description);
          this.errorMessage = "";
          this.cityName="";
        });
    } catch (err) {
      console.log(err)
    }
  }
}
