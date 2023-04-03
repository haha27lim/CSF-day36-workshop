import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from '../model/city';
import { CitiesRepository } from '../services/cities.repo';

@Component({
  selector: 'app-addcity',
  templateUrl: './addcity.component.html',
  styleUrls: ['./addcity.component.css']
})
export class AddcityComponent implements OnInit, OnDestroy{
  form!: FormGroup; // define form property
  countryName?: string; // optional property for the country name
  city? : string; // optional property for the city name 
  imageUrl? : string; // optional property for an image URL
  cityObj?: City; // optional property for a City object 

  // constructor to inject dependencies 
  constructor(private formBuilder: FormBuilder, private router: Router,
    private citiesRepo: CitiesRepository){
    
  }

  // lifecycle hook that runs after the component is created
  ngOnInit(): void {
      // creates a FormGroup and sets it as the value of the component's form property 
      this.form = this.createForm();
  }

  // lifecycle hook that runs before the component is destroyed
  ngOnDestroy(): void {
      
  }

  // method called when the user clicks the "Add" button
  add(){
    const countryName = this.form?.value['countryName']; // get the value of the country name input field from the form 
    const city = this.form?.value['city']; // get the value of the city name input field from the form 
    const imageUrl = this.form?.value['imageUrl']; // get the value of the image URL input field from the form 
    this.cityObj = { country: countryName, city: city, imageUrl: imageUrl}; // create a City object with the input values 
    this.citiesRepo.addCity(this.cityObj); // uses the city repository to add the created City object 
    this.router.navigate(['/']); // navigates to the home page
  }

  // helper method to create a FormGroup
  private createForm(): FormGroup{
    // using the FormBuilder to create form fields
    return this.formBuilder.group({
      countryName : this.formBuilder.control(''),
      city : this.formBuilder.control(''),
      imageUrl : this.formBuilder.control(''),
      
    })
  }
}
