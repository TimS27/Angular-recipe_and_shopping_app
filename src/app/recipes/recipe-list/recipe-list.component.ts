import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Big Boy Burrito',
      'A burrito that fills up any belly.',
      'https://image.essen-und-trinken.de/11951714/t/E2/v10/w1440/r1/-/burritos-jpg--64716-.jpg'
    ),
    new Recipe(
      'Supreme Pizza',
      'A Pizza made with love.',
      'https://www.coolibri.de/wp-content/uploads/2019/11/Pizza_Igor_Ovsyannykov.jpg'
    ),
  ];

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

  constructor() {}

  ngOnInit(): void {}
}
