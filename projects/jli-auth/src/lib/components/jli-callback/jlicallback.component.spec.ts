import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JliCallbackComponent } from './jli-callback.component';

describe('JliCallbackComponent', () => {
  let component: JliCallbackComponent;
  let fixture: ComponentFixture<JliCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JliCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JliCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
