import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Recipe } from '../Recipe.model';
import { RecipeService } from '../recipe.service';
import { AuthService } from 'src/app/auth/auth.service';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router,
    private authservice: AuthService, private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipes(this.id);
      }
    )
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients))
    // this.recipeService.addIngredientToShoppingList(this.recipe.ingredients)
  }

  onEditRecipe() {
    if(!this.authservice.isAuthenticated()) {
      this.router.navigate(['/signin'])
    } else {
      this.router.navigate(['edit'], {relativeTo: this.route})
    }
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
