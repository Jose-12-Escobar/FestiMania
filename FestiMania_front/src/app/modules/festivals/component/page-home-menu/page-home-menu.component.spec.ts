import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHomeMenuComponent } from './page-home-menu.component';

describe('PageHomeMenuComponent', () => {
  let component: PageHomeMenuComponent;
  let fixture: ComponentFixture<PageHomeMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageHomeMenuComponent]
    });
    fixture = TestBed.createComponent(PageHomeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
