import { Injectable } from '@angular/core';

import { Recipe } from './Recipe.model';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

   private recipes: Recipe[] = [
        new Recipe(
            'Egbusi', 
            'This is The Recipe for Egbusi', 
            'https://www.allnigerianrecipes.com/wp-content/uploads/2019/03/egusi-soup.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Melon Seed', 2)
            ]),
        new Recipe(
            'Amala', 
            'It depends on how you want it', 
            'https://cdn.thenigerianvoice.com/story/XGltYWdlc1xjb250ZW50XDExMTkyMDE3MjU3MTBfbWF4cmVzZGVmYXVsdF8xLmpwZ3wxMDI0fDcyOA==.jpg',
            [
                new Ingredient('Meat', 3),
                new Ingredient('Ogbono', 1),
                new Ingredient('ewedu', 2)
            ]),
        new Recipe(
            'Jollof Rice', 
            'Everything you need to know about Nigerian Jollof', 
            'https://demandafrica-4741.kxcdn.com/wp-content/uploads/2018/06/Nigerian-jollof.jpeg',
            [
                new Ingredient('Rice', 3),
                new Ingredient('Meat', 3),
                new Ingredient('Groundnut Oil', 1)
            ])
      ];

      constructor(private slService: ShoppingListService) {}

      getRecipe(){
          return this.recipes.slice();
      }

      getRecipes(id: number){
          return this.recipes[id];
      }

      addIngredientToShoppingList(ingredient: Ingredient[]) {
          this.slService.addIngredients(ingredient);                      
      }
}