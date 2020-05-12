import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/Recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor (
        private httpClient: HttpClient, 
        private recipeService: RecipeService,
        private authservice: AuthService) {}
    
    storeRecipe() {
        const token = this.authservice.getToken();

        return this.httpClient.put('https://ng-recipe-book-af5f8.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipe());
    }

    getRecipe() {
        const token = this.authservice.getToken();

        this.httpClient.get<Recipe[]>('https://ng-recipe-book-af5f8.firebaseio.com/recipes.json?auth=' + token)
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