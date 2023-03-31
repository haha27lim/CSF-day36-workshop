import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Define a public property called title and set its value to 'openweather-routing'
  title = 'openweather-routing';

  // Define a constructor that takes a 'Router' object as a parameter, and 
  // assigns it to a private member variable called 'router'
  constructor(private router: Router){

  }

  // Define a method called goHome that will navigate to the home page when called
  goHome(){
    this.router.navigate(['/']);
  }

  // Define a method called goAddCity that will navigate to the Add City page when called
  goAddCity(){
    this.router.navigate(['/add-city']);
  }
}
