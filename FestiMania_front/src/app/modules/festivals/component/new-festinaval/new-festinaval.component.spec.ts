import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFestinavalComponent } from './new-festinaval.component';

describe('NewFestinavalComponent', () => {
  let component: NewFestinavalComponent;
  let fixture: ComponentFixture<NewFestinavalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewFestinavalComponent]
    });
    fixture = TestBed.createComponent(NewFestinavalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
