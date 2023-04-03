import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { City } from "../model/city";

@Injectable({
    providedIn: 'root'
})
export class CitiesRepository extends Dexie {

    // Define the city table
    city!: Dexie.Table<City, string>

    constructor(){
        super('citiesdb');
        this.version(1).stores({
            city: 'city' // Define the city table schema
        })
        this.city = this.table('city');
    }

    // Define the method to add a city
    addCity(city: City): Promise<string> {
        return this.city.add(city); // add a city to the city table
    }

    // Define the method to get all cities
    async getAllCities() : Promise<City[]>{
        const cities  = await this.city.orderBy('city').toArray(); // Retrieve all cities from the city table
        return cities; // Return the list of cities
    }

    // Define the method to get a city's image URL
    async getCityImageUrl(city: string) : Promise<any> {
        const cityResult = await this.city.get(city); // Retrieve a city from the city table
        return cityResult?.imageUrl; // Return the city's image URL (if it exists)
    }
}