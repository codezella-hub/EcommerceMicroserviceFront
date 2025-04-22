import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorisListPageAdminComponent } from './categoris-list-page-admin.component';

describe('CategorisListPageAdminComponent', () => {
  let component: CategorisListPageAdminComponent;
  let fixture: ComponentFixture<CategorisListPageAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorisListPageAdminComponent]
    });
    fixture = TestBed.createComponent(CategorisListPageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
