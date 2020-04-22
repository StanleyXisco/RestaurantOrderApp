import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { map } from 'rxjs/operators'

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/Recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor (
        private http: Http, 
        private recipeService: RecipeService,
        private authservice: AuthService) {}
    
    storeRecipe() {
        const token = this.authservice.getToken();

        return this.http.put('https://ng-recipe-book-af5f8.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipe());
    }

    getRecipe() {
        const token = this.authservice.getToken();

        this.http.get('https://ng-recipe-book-af5f8.firebaseio.com/recipes.json?auth=' + token)
        .pipe(map(
            (response: Response) => {
                const recipes: Recipe[] = response.json(); 
                for( let recipe of recipes) {
                    if(!recipe['ingredients']){
                        console.log(recipe);
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