import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesCreatePageComponent } from './categories-create-page.component';

describe('CategoriesCreatePageComponent', () => {
  let component: CategoriesCreatePageComponent;
  let fixture: ComponentFixture<CategoriesCreatePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesCreatePageComponent]
    });
    fixture = TestBed.createComponent(CategoriesCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
