import { TestBed } from '@angular/core/testing';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListService } from './shopping-list.service';
// import { ShoppingListService } from './shopping-list.service';

describe('Component: ShoppingList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingListComponent],
    });
  });

  it('should create the component', () => {
    let fixture = TestBed.createComponent(ShoppingListComponent);
    let component = fixture.debugElement.componentInstance;
    // let shoppingListService =
    //   fixture.debugElement.injector.get(ShoppingListService);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should use ingredients array from shopping-list service', () => {
    let fixture = TestBed.createComponent(ShoppingListComponent);
    let component = fixture.debugElement.componentInstance;
    let shoppingListService =
      fixture.debugElement.injector.get(ShoppingListService);
    fixture.detectChanges();
    expect(shoppingListService.getIngredients()).toEqual(component.ingredients);
  });

  it('should display first ingredient name and amount correctly', () => {
    let fixture = TestBed.createComponent(ShoppingListComponent);
    let component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain(
      component.ingredients[0].name +
        ' (' +
        component.ingredients[0].amount +
        ')'
    );
  });
});
