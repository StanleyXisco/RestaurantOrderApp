import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Store } from '@ngrx/store';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/Recipe.model';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';


@Injectable()
export class DataStorageService {
    constructor (
        private httpClient: HttpClient, 
        private recipeService: RecipeService,
        private authservice: AuthService, private store: Store<fromApp.AppState>) {}
    
    storeRecipe() {

        // return this.httpClient.put('https://ng-recipe-book-af5f8.firebaseio.com/recipes.json', this.recipeService.getRecipe() ,
        // {
        //     observe: 'body',
        //     params: new HttpParams().set('auth', token)
        // });
        const req = new HttpRequest('PUT', 'https://ng-recipe-book-af5f8.firebaseio.com/recipes.json', this.recipeService.getRecipe(),
        {reportProgress: true});
        return this.httpClient.request(req);
    }

    getRecipe() {
        
        this.httpClient.get<Recipe[]>('https://ng-recipe-book-af5f8.firebaseio.com/recipes.json',
        {observe: 'body',responseType: 'json'})
        .pipe(map(
            (recipes) => {
                for( let recipe of recipes) {
                    if(!recipe['ingredients']){
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;                 
            }
        ))
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipe(recipes);
                }
            );
    }
}