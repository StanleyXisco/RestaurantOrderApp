import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import * as RecipeActions from "../store/recipe.actions";
import * as fromRecipe from "../store/recipe.reducers";
import { take } from "rxjs/operators/take";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editmode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.FeatureState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.id = +param["id"];
      this.editmode = param["id"] != null;
      this.initForm();
    });
  }

  onSubmit() {
    // const newRecipe = new Recipe (
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['amount'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editmode) {
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.store.dispatch(
        new RecipeActions.UpdateRecipe({
          index: this.id,
          updatedRecipe: this.recipeForm.value,
        })
      );
    } else {
      // this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  getControls() {
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  private initForm() {
    let recipeName = "";
    let recipeImgPath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    if (this.editmode) {
      // const recipe = this.recipeService.getRecipes(this.id);
      this.store
        .select("recipes")
        .pipe(take(1))
        .subscribe((recipeState: fromRecipe.State) => {
          const recipe = recipeState.recipes[this.id];
          recipeName = recipe.name;
          recipeImgPath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe["ingredients"]) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/),
                  ]),
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImgPath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }
}
