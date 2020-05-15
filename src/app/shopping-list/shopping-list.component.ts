import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Ingredient } from '../shared/ingredients.model';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  // private subscription: Subscription;

  constructor( private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
    // this.subscription = this.slService.ingredientChanged
    // .subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients  = ingredients;
    //   }
    // );
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    // this.slService.startedEditing.next(index);
  }

  // ngOnDestroy () {
  //   this.subscription.unsubscribe();
  // }

}
