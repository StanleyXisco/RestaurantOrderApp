import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../Recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from 'src/app/auth/auth.service';

import { map } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  recipes: Recipe[];
  subscription: Subscription;
  authstate: Observable<fromAuth.State>


  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute, 
    private authservice: AuthService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipeChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipe();
  }

  onNewRecipe() {
    if(!this.authservice.isAuthenticated()){
      this.router.navigate(['/signin']);
    } else {
      this.router.navigate(['new'], {relativeTo: this.route});
    }
  }
  
  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

}
