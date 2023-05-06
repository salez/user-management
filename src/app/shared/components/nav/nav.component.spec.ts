import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { AuthService } from '@core/auth/services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let breakpointObserverSpy: jasmine.SpyObj<BreakpointObserver>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    breakpointObserverSpy = jasmine.createSpyObj('BreakpointObserver', ['observe']);
    await TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: BreakpointObserver, useValue: breakpointObserverSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;

    // breakpointObserverSpy.observe.and.returnValue(
    //   of({ matches: true, breakpoints: Breakpoints.Handset })
    // );
  });

  it('should create the component', () => { 
    expect(component).toBeTruthy();
  }); 

  it('should have a logout method that calls AuthService.logout and navigates to /login', () => {
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(component['router'].navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should have an isHandset$ observable that emits a boolean', () => {
    component.isHandset$.subscribe((result) => {
      expect(typeof result).toBe('boolean');
    });
  });
});