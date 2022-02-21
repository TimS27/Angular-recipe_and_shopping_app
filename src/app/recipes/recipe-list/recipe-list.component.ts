import { Component, OnInit } from '@angular/core';
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
  ];

  constructor() {}

  ngOnInit(): void {}
}
