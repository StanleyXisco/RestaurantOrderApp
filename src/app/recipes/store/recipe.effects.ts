import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { map, switchMap } from "rxjs/operators";

import * as RecipeActions from "../store/recipe.actions";
import { Recipe } from "../Recipe.model";

@Injectable()
export class RecipeEffect {
  @Effect()
  recipeFetch = this.actions$
    .pipe(ofType(RecipeActions.FETCH_RECIPE))
    .pipe(
      switchMap((action: RecipeActions.FetchRecipe) => {
        return this.httpClient.get<Recipe[]>(
          "https://ng-recipe-book-af5f8.firebaseio.com/recipes.json",
          {
            observe: "body",
            responseType: "json",
          }
        );
      })
    )
    .pipe(
      map((recipes) => {
        // console.log(recipes);
        for (let recipe of recipes) {
          if (!recipe["ingredients"]) {
            recipe["ingredients"] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes,
        };
      })
    );

  constructor(private actions$: Actions, private httpClient: HttpClient) {}
}
