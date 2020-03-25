import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { map } from 'rxjs/operators'

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/Recipe.model';

@Injectable()
export class DataStorageService {
    constructor (private http: Http, private recipeService: RecipeService) {}
    
    storeRecipe() {
        return this.http.put('https://ng-recipe-book-af5f8.firebaseio.com/recipes.json', this.recipeService.getRecipe());
    }

    getRecipe() {
        return this.http.get('https://ng-recipe-book-af5f8.firebaseio.com/recipes.json')
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