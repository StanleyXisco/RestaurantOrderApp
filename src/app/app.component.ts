import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Project';
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
    apiKey: "AIzaSyBQulp83DKK9GuW6xMNywQoFzGe_tmQA48",
    authDomain: "ng-recipe-book-af5f8.firebaseapp.com"
    })
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
