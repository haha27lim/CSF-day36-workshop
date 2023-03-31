import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../model/city';

// Define the countries and associated images as arrays
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  countries = [
    { country: 'Singapore', city: 'Singapore'},
    { country: 'United Kingdom', city: 'London'},
    { country: 'Malaysia', city: 'Kuala Lumpur'},
    { country: 'China', city: 'Beijing'},
    { country: 'India', city: 'New Delhi'}, 
  ]

  imageBasedCity = [
    {city: 'Singapore', imageUrl: 'https://bit.ly/3nqmL4p'},
    {city: 'London', imageUrl: 'https://bit.ly/3ZkaziU'},
    {city: 'Kuala Lumpur', imageUrl: 'https://bit.ly/40hW28X'},
    {city: 'Beijing', imageUrl: 'https://bit.ly/3lHoUZh'},
    {city: 'New Delhi', imageUrl: 'https://bit.ly/3JOLdnE'},
  ]

  // Inject the HttpClient dependency
  constructor(private httpClient: HttpClient) { }

  // Define a method to fetch weather data from the OpenWeatherMap API
  // using the HttpClient to make an HTTP GET request with the specified city name and API key
  //https://api.openweathermap.org/data/2.5/weather?q=<city>&appid=<API key>
  getWeather(city: string, apiKey: string): Promise<any>{
    console.log("get weather");

    // Construct the query parameters required for the API call
    const params = new HttpParams()
        .set("q", city)
        .set("appid", apiKey);

    // Return the result of the API call as a Promise
    return lastValueFrom(this.httpClient
        .get("https://api.openweathermap.org/data/2.5/weather", {params: params}));
  }

  // Define a method to look up the URL for a given city name in the imageBasedCity array
  getCityUrl(city: string){
    // Call the "find" method on an array called "this.imageBasedCity", passing in an arrow function as the argument
    const w = this.imageBasedCity.find(v => v.city == city);
    // Log the result of the "find" method to the console
    console.log(w);
    // Return the result of the "find" method
    return w;
  }

  // Define a method to add a new city to the list of countries and associated images that takes a "City" object as a parameter
  addCity(city: City){
    // Add an object with "country" and "city" properties to an array called "countries"
    this.countries.push({country: city.country, city: city.city});
    // Sort the "countries" array alphabetically by "country" property
    this.countries.sort((a,b)=> (a.country > b.country)? 1 : -1);
    // Add an object with "city" and "imageUrl" properties to an array called "imageBasedCity"
    this.imageBasedCity.push({city: city.city, imageUrl: city.imageUrl})    
  }
}
