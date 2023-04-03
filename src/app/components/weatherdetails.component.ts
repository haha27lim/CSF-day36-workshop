import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Weather } from '../model/weather';
import { WeatherService } from '../services/weather.service';
import { CitiesRepository } from '../services/cities.repo';

@Component({
  selector: 'app-weatherdetails',
  templateUrl: './weatherdetails.component.html',
  styleUrls: ['./weatherdetails.component.css']
})
export class WeatherdetailsComponent implements OnInit, OnDestroy{
  // Initialize the API Key
  OPENWEATHER_API_KEY= environment.openWeatherApiKey;

  // Declare private variables
  private city: string = "Singapore";
  private country?: string;
  private imageUrl?: string;
  params$ ! : Subscription;
  model = new Weather("Singapore", 0,0,0,"", "", 0,0 );

  // Constructor with dependencies injection
  constructor(private weatherSvc: WeatherService, private router:Router,
      private activatedRoute: ActivatedRoute, private citiesRepo: CitiesRepository) {}

  // Method called when the component is initialized
  ngOnInit(): void {
      // Subscribe to params to get current city name
      this.params$ = this.activatedRoute.params.subscribe(
        (params) => {
          this.city = params['city'];
        }
      );
      // Get the weather details for the current city
      this.getWeatherFromAPI(this.city);
  }

  // Method called when the component is destroyed
  ngOnDestroy(){
    // Unsubscribe from params subscription
    this.params$.unsubscribe();
  }

  // Method to get the weather details from the API
  getWeatherFromAPI(city: string){
    // Call the weather service to get weather details for the city
    this.weatherSvc.getWeather(city, this.OPENWEATHER_API_KEY)
      .then( async (result) => {
          // Get the city image URL asynchronously
          const cityImageUrl = await this.citiesRepo
                      .getCityImageUrl(city);
          console.log(cityImageUrl);
          // Create a new Weather object with the retrieved data
          this.model= new Weather(
            city,
            result.main.temp,
            result.main.pressure,
            result.main.humidity,
            result.weather[0].description,
            cityImageUrl,
            result.wind.speed,
            result.wind.deg
          )
      }).catch((err)=> {
         // Handle errors by logging to the console and navigating to the listcity.component view
        console.log(err);
        this.router.navigate([''])
      })
  }
}
