import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageProductAdminComponent } from './list-page-product-admin.component';

describe('ListPageProductAdminComponent', () => {
  let component: ListPageProductAdminComponent;
  let fixture: ComponentFixture<ListPageProductAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPageProductAdminComponent]
    });
    fixture = TestBed.createComponent(ListPageProductAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
