import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonsComponent } from './bons.component';

describe('BonsComponent', () => {
  let component: BonsComponent;
  let fixture: ComponentFixture<BonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
