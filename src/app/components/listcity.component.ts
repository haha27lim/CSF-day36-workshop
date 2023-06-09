import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-listcity',
  templateUrl: './listcity.component.html',
  styleUrls: ['./listcity.component.css']
})
export class ListcityComponent implements OnInit{
  // Define the 'cities' property as of type any.
  cities: any;

  // Inject the WeatherService instance.
  constructor(private weatherSvc: WeatherService){

  }

  // Implement OnInit interface
  ngOnInit(): void {
      // Set the 'cities' property to the countries data from the WeatherService.
      this.cities = this.weatherSvc.countries;
  }
}
