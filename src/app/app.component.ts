import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'recipe_and_shopping_app';
  loadedFeature: string = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
    console.log(feature);
  }
}
