import { Component, OnInit } from '@angular/core';
import { CitiesRepository } from '../services/cities.repo';

@Component({
  selector: 'app-listcity',
  templateUrl: './listcity.component.html',
  styleUrls: ['./listcity.component.css']
})
export class ListcityComponent implements OnInit{
  // Define the 'cities' property as of type any.
  cities: any;

  // Inject the CitiesRepository instance.
  constructor(private citiesRepo: CitiesRepository){}

  // Implement OnInit interface
  async ngOnInit() {
    // Get all the cities from the cities repository.
    this.cities = await this.citiesRepo.getAllCities();
    console.log(this.cities); // Log the cities to the console.
  }
}
