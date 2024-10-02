import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubArtistFestivalComponent } from './add-sub-artist-festival.component';

describe('AddSubArtistFestivalComponent', () => {
  let component: AddSubArtistFestivalComponent;
  let fixture: ComponentFixture<AddSubArtistFestivalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSubArtistFestivalComponent]
    });
    fixture = TestBed.createComponent(AddSubArtistFestivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
