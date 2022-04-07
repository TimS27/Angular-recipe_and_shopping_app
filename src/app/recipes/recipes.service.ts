import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipes.model';
import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Big Boy Burrito',
      'A burrito that fills up any belly.',
      'https://image.essen-und-trinken.de/11951714/t/E2/v10/w1440/r1/-/burritos-jpg--64716-.jpg',
      [new Ingredient('Beans', 10), new Ingredient('Avocado', 1)]
    ),
    new Recipe(
      'Supreme Pizza',
      'A Pizza made with love.',
      'https://www.coolibri.de/wp-content/uploads/2019/11/Pizza_Igor_Ovsyannykov.jpg',
      [new Ingredient('Tomato', 3), new Ingredient('Cheese', 1)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice(); //so only copy of recipes array can be accessed
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
