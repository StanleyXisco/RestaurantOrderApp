import { Action } from "@ngrx/store";

import { Recipe } from "../Recipe.model";

export const ADD_RECIPE = "ADD_RECIPE";
export const SET_RECIPES = "SET_RECIPES";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const STORE_RECIPE = "STORE_RECIPE";
export const FETCH_RECIPE = "FETCH_RECIPE";

export class AddRecipe implements Action {
  readonly type = "ADD_RECIPE";

  constructor(public payload: Recipe) {}
}

export class SetRecipes implements Action {
  readonly type = "SET_RECIPES";

  constructor(public payload: Recipe[]) {}
}

export class UpdateRecipe implements Action {
  readonly type = "UPDATE_RECIPE";

  constructor(public payload: { index: number; updatedRecipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type = "DELETE_RECIPE";

  constructor(public payload: number) {}
}

export class StoreRecipe implements Action {
  readonly type = "STORE_RECIPE";
}

export class FetchRecipe implements Action {
  readonly type = "FETCH_RECIPE";
}

export type RecipeAction =
  | AddRecipe
  | SetRecipes
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipe
  | FetchRecipe;
