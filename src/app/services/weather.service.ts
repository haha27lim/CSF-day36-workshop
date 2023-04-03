import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  // Get weather data for a given city and API key
  getWeather(city: string, apiKey: string): Promise<any>{
  
    console.log("get weather"); // Log a message to the console
    
    // Set up HTTP parameters for the API request
    const params = new HttpParams()
      .set("q", city)
      .set("appid", apiKey);
      
    // Use Angular's HttpClient to make an HTTP GET request to the OpenWeatherMap API
    return lastValueFrom(this.httpClient
      .get("https://api.openweathermap.org/data/2.5/weather", {params: params}));
  }
}