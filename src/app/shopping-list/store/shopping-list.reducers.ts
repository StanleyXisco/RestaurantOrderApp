import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from '../../shared/ingredients.model';

export interface AppState {
    shoppingList: State;
}

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Abacha', 10),
        new Ingredient('Ugba', 20),
    ],
    editedIngredient : null,
    editedIngredientIndex: -1
};

export function ShoppingListReducer (state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
            case ShoppingListActions.ADD_INGREDIENTS:
                return {
                    ...state,
                    ingredients: [...state.ingredients, ...action.payload]
                }; 
            case ShoppingListActions.UPDATE_INGREDIENT:
                const ingredient = state.ingredients[state.editedIngredientIndex];
                const updatedIngredient = {
                    ...ingredient,
                    ...action.payload.ingredient
                };
                const ingredients = [...state.ingredients];
                ingredients[state.editedIngredientIndex] = updatedIngredient;
                return {
                    ...state,
                    ingredients: ingredients,
                    editedIngredient: null,
                    editedIngredientIndex: -1
                };
            case ShoppingListActions.DELETE_INGREDIENT:
                const oldIngredients = [...state.ingredients];
                oldIngredients.splice(state.editedIngredientIndex, 1);
                return {
                    ...state,
                    ingredients: oldIngredients,
                    editedIngredient: null,
                    editedIngredientIndex: -1
                };
            case ShoppingListActions.START_EDIT:
                const editedIngredient = {...state.ingredients[action.payload]};
                return {
                    ...state,
                    editedIngredient: editedIngredient,
                    editedIngredientIndex: action.payload

                };
            case ShoppingListActions.STOP_EDIT:
                return {
                    ...state,
                    editedIngredientIndex: -1,
                    editedIngredient: null
                };
        default:
            return state;
    }
} 