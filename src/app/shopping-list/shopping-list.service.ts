
import { Ingredient } from '../shared/ingredients.model'
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Abacha', 10),
        new Ingredient('Ugba', 20)
      ];

      getIngredient() {
          return this.ingredients.slice();
      }

      getIngredients(index: number) {
          return this.ingredients[index];
      }

      addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
      }

      updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index: number) {
       this.ingredients.splice(index, 1);
       this.ingredientChanged.next(this.ingredients.slice());
      }
}