import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleRecipesComponent } from './simple-recipes.component';

describe('SimpleRecipesComponent', () => {
  let component: SimpleRecipesComponent;
  let fixture: ComponentFixture<SimpleRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleRecipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
