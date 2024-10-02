import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsFestivalComponent } from './details-festival.component';

describe('DetailsFestivalComponent', () => {
  let component: DetailsFestivalComponent;
  let fixture: ComponentFixture<DetailsFestivalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsFestivalComponent]
    });
    fixture = TestBed.createComponent(DetailsFestivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
