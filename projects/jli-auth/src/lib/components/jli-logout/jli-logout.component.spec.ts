import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JliLogoutComponent } from './jli-logout.component';

describe('LogoutComponent', () => {
  let component: JliLogoutComponent;
  let fixture: ComponentFixture<JliLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JliLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JliLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
