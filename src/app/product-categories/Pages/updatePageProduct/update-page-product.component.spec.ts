import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePageProductComponent } from './update-page-product.component';

describe('UpdatePageProductComponent', () => {
  let component: UpdatePageProductComponent;
  let fixture: ComponentFixture<UpdatePageProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePageProductComponent]
    });
    fixture = TestBed.createComponent(UpdatePageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
