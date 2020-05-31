import * as RecipeAction from "./recipe.actions";
import { Recipe } from "../Recipe.model";
import { Ingredient } from "src/app/shared/ingredients.model";
import * as fromApp from "../../store/app.reducers";

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe(
      "Egusi",
      "This is The Recipe for Egbusi",
      "https://www.allnigerianrecipes.com/wp-content/uploads/2019/03/egusi-soup.jpg",
      [new Ingredient("Meat", 1), new Ingredient("Melon Seed", 2)]
    ),
    new Recipe(
      "Amala",
      "It depends on how you want it",
      "https://cdn.thenigerianvoice.com/story/XGltYWdlc1xjb250ZW50XDExMTkyMDE3MjU3MTBfbWF4cmVzZGVmYXVsdF8xLmpwZ3wxMDI0fDcyOA==.jpg",
      [
        new Ingredient("Meat", 3),
        new Ingredient("Ogbono", 1),
        new Ingredient("ewedu", 2),
      ]
    ),
    new Recipe(
      "Jollof Rice",
      "Everything you need to know about Nigerian Jollof",
      "https://demandafrica-4741.kxcdn.com/wp-content/uploads/2018/06/Nigerian-jollof.jpeg",
      [
        new Ingredient("Rice", 3),
        new Ingredient("Meat", 3),
        new Ingredient("Groundnut Oil", 1),
      ]
    ),
  ],
};

export function recipeReducer(
  state = initialState,
  actions: RecipeAction.RecipeAction
) {
  switch (actions.type) {
    case RecipeAction.SET_RECIPES:
      return {
        ...state,
        recipes: [...actions.payload],
      };
    case RecipeAction.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, actions.payload],
      };
    case RecipeAction.UPDATE_RECIPE:
      const recipe = state.recipes[actions.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...actions.payload.updatedRecipe,
      };
      const recipes = [...state.recipes];
      recipes[actions.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes,
      };
    case RecipeAction.DELETE_RECIPE:
      const oldrecipes = [...state.recipes];
      oldrecipes.splice(actions.payload, 1);
      return {
        ...state,
        recipes: oldrecipes,
      };
    default:
      return state;
  }
}
