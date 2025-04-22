import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesUpdatePageComponent } from './categories-update-page.component';

describe('CategoriesUpdatePageComponent', () => {
  let component: CategoriesUpdatePageComponent;
  let fixture: ComponentFixture<CategoriesUpdatePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesUpdatePageComponent]
    });
    fixture = TestBed.createComponent(CategoriesUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
