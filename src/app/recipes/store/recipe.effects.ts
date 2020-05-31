import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";

import * as RecipeActions from "../store/recipe.actions";
import { Recipe } from "../Recipe.model";
import * as fromRecipe from "../store/recipe.reducers";

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

  @Effect({ dispatch: false })
  recipeStore = this.actions$
    .pipe(ofType(RecipeActions.STORE_RECIPE))
    .pipe(withLatestFrom(this.store.select("recipes")))
    .pipe(
      switchMap(([action, state]) => {
        const req = new HttpRequest(
          "PUT",
          "https://ng-recipe-book-af5f8.firebaseio.com/recipes.json",
          state.recipes,
          { reportProgress: true }
        );
        return this.httpClient.request(req);
      })
    );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromRecipe.FeatureState>
  ) {}
}
