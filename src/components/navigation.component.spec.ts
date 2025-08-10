import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NavigationComponent } from './navigation.component';
import { PortfolioService } from '../services/portfolio.service';
import { NavigationItem, PersonalInfo, PortfolioData } from '../models/portfolio.interface';
import { signal } from '@angular/core';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockPortfolioService: jasmine.SpyObj<PortfolioService>;

  const mockPersonalInfo: PersonalInfo = {
    name: 'John Doe',
    title: 'Software Engineer',
    tagline: 'Building amazing things',
    email: 'john@example.com',
    location: 'San Francisco',
    resumeUrl: 'https://example.com/resume.pdf',
    profileImage: 'profile.jpg',
    availability: {
      status: 'available',
      message: 'Open to opportunities'
    }
  };

  const mockNavigationItems: NavigationItem[] = [
    { label: 'Home', path: '/', section: 'hero' },
    { label: 'About', path: '/', section: 'about' },
    { label: 'Projects', path: '/', section: 'projects' },
    { label: 'Contact', path: '/', section: 'contact' }
  ];

  const mockPortfolioData: PortfolioData = {
    personal: mockPersonalInfo,
    navigation: mockNavigationItems
  } as PortfolioData;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate'], { url: '/' });
    const portfolioSpy = jasmine.createSpyObj('PortfolioService', ['data']);

    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: PortfolioService, useValue: portfolioSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockPortfolioService = TestBed.inject(PortfolioService) as jasmine.SpyObj<PortfolioService>;

    mockPortfolioService.data.and.returnValue(mockPortfolioData);
    mockRouter.navigate.and.returnValue(Promise.resolve(true));

    // Mock IntersectionObserver
    (window as any).IntersectionObserver = jasmine.createSpy('IntersectionObserver').and.callFake((callback: any) => ({
      observe: jasmine.createSpy('observe'),
      disconnect: jasmine.createSpy('disconnect'),
      unobserve: jasmine.createSpy('unobserve')
    }));

    // Mock window methods
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true
    });
    
    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      writable: true
    });

    window.scrollTo = jasmine.createSpy('scrollTo');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with data from portfolio service', () => {
    component.ngOnInit();
    
    expect(component['navItems']()).toEqual(mockNavigationItems);
    expect(component['personalInfo']()).toEqual(mockPersonalInfo);
  });

  it('should set scrolled state based on scroll position', () => {
    Object.defineProperty(window, 'scrollY', { value: 30 });
    component.onWindowScroll();
    expect(component['isScrolled']()).toBe(true);

    Object.defineProperty(window, 'scrollY', { value: 10 });
    component.onWindowScroll();
    expect(component['isScrolled']()).toBe(false);
  });

  it('should close mobile menu on window resize when width > 768', () => {
    component['isMobileMenuOpen'].set(true);
    Object.defineProperty(window, 'innerWidth', { value: 1024 });
    
    component.onWindowResize();
    expect(component['isMobileMenuOpen']()).toBe(false);
  });

  it('should not close mobile menu on window resize when width <= 768', () => {
    component['isMobileMenuOpen'].set(true);
    Object.defineProperty(window, 'innerWidth', { value: 480 });
    
    component.onWindowResize();
    expect(component['isMobileMenuOpen']()).toBe(true);
  });

  it('should generate correct initials', () => {
    component['personalInfo'].set(mockPersonalInfo);
    expect(component['getInitials']()).toBe('JD');
  });

  it('should return default initials when no personal info', () => {
    component['personalInfo'].set(null);
    expect(component['getInitials']()).toBe('AP');
  });

  it('should get first name correctly', () => {
    component['personalInfo'].set(mockPersonalInfo);
    expect(component['getFirstName']()).toBe('John');
  });

  it('should return default name when no personal info', () => {
    component['personalInfo'].set(null);
    expect(component['getFirstName']()).toBe('Portfolio');
  });

  it('should determine active section correctly on home page', () => {
    mockRouter.url = '/';
    component['activeSection'].set('about');
    
    expect(component['isActiveSection']('about')).toBe(true);
    expect(component['isActiveSection']('projects')).toBe(false);
  });

  it('should return false for active section when not on home page', () => {
    mockRouter.url = '/project/detail';
    component['activeSection'].set('about');
    
    expect(component['isActiveSection']('about')).toBe(false);
  });

  it('should default to about section when active section is empty', () => {
    mockRouter.url = '/';
    component['activeSection'].set('');
    
    expect(component['isActiveSection']('about')).toBe(true);
  });

  it('should navigate to home when brand is clicked', fakeAsync(() => {
    const event = new Event('click');
    spyOn(event, 'preventDefault');

    component['goToHome'](event);
    tick();

    expect(event.preventDefault).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    expect(component['isMobileMenuOpen']()).toBe(false);
  }));

  it('should scroll to section when on home page', () => {
    mockRouter.url = '/';
    const mockElement = { offsetTop: 500 } as HTMLElement;
    spyOn(document, 'getElementById').and.returnValue(mockElement);
    
    const event = new Event('click');
    spyOn(event, 'preventDefault');

    component['navigateToSection'](event, 'about');

    expect(event.preventDefault).toHaveBeenCalled();
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 430, // 500 - 70 (nav height)
      behavior: 'smooth'
    });
  });

  it('should navigate to home then scroll when not on home page', fakeAsync(() => {
    mockRouter.url = '/project/detail';
    const mockElement = { offsetTop: 500 } as HTMLElement;
    spyOn(document, 'getElementById').and.returnValue(mockElement);
    
    const event = new Event('click');
    spyOn(event, 'preventDefault');

    component['navigateToSection'](event, 'about');
    tick();
    tick(100);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 430,
      behavior: 'smooth'
    });
  }));

  it('should toggle mobile menu', () => {
    expect(component['isMobileMenuOpen']()).toBe(false);
    
    component['toggleMobileMenu']();
    expect(component['isMobileMenuOpen']()).toBe(true);
    
    component['toggleMobileMenu']();
    expect(component['isMobileMenuOpen']()).toBe(false);
  });

  it('should close mobile menu', () => {
    component['isMobileMenuOpen'].set(true);
    component['closeMobileMenu']();
    expect(component['isMobileMenuOpen']()).toBe(false);
  });

  it('should track resume click', () => {
    spyOn(console, 'log');
    component['trackResumeClick']();
    expect(console.log).toHaveBeenCalledWith('Resume download clicked from navigation');
  });

  it('should setup intersection observer', () => {
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    
    component.ngOnInit();
    
    expect(IntersectionObserver).toHaveBeenCalled();
  });

  it('should disconnect intersection observer on destroy', () => {
    const mockObserver = {
      observe: jasmine.createSpy('observe'),
      disconnect: jasmine.createSpy('disconnect'),
      unobserve: jasmine.createSpy('unobserve')
    };
    
    component['intersectionObserver'] = mockObserver as any;
    component.ngOnDestroy();
    
    expect(mockObserver.disconnect).toHaveBeenCalled();
  });

  it('should handle portfolio service data changes', fakeAsync(() => {
    mockPortfolioService.data.and.returnValue(null);
    component.ngOnInit();
    
    expect(component['navItems']()).toBeNull();
    
    // Simulate data loading after some time
    tick(200);
    mockPortfolioService.data.and.returnValue(mockPortfolioData);
    tick(200);
    
    // Data should be updated after the interval check
    expect(component['navItems']()).toEqual(mockNavigationItems);
  }));

  it('should render navigation items in template', () => {
    component['navItems'].set(mockNavigationItems);
    component['personalInfo'].set(mockPersonalInfo);
    fixture.detectChanges();

    const navLinks = fixture.nativeElement.querySelectorAll('.nav-link');
    expect(navLinks.length).toBeGreaterThanOrEqual(mockNavigationItems.length);
  });

  it('should render mobile navigation items', () => {
    component['navItems'].set(mockNavigationItems);
    fixture.detectChanges();

    const mobileNavLinks = fixture.nativeElement.querySelectorAll('.mobile-nav-link');
    expect(mobileNavLinks.length).toBeGreaterThanOrEqual(mockNavigationItems.length);
  });

  it('should render resume button when resume URL exists', () => {
    component['personalInfo'].set(mockPersonalInfo);
    fixture.detectChanges();

    const resumeButton = fixture.nativeElement.querySelector('.nav-cta');
    expect(resumeButton).toBeTruthy();
    expect(resumeButton.href).toBe(mockPersonalInfo.resumeUrl);
  });

  it('should render brand initials and name', () => {
    component['personalInfo'].set(mockPersonalInfo);
    fixture.detectChanges();

    const brandInitials = fixture.nativeElement.querySelector('.brand-initials');
    const brandName = fixture.nativeElement.querySelector('.brand-name');
    
    expect(brandInitials.textContent.trim()).toBe('JD');
    expect(brandName.textContent.trim()).toBe('John');
  });

  it('should handle missing navigation data gracefully', () => {
    component['navItems'].set(null);
    fixture.detectChanges();

    // Should render default navigation items
    const defaultNavLinks = fixture.nativeElement.querySelectorAll('.nav-link');
    expect(defaultNavLinks.length).toBeGreaterThan(0);
  });

  it('should apply correct CSS classes based on state', () => {
    component['isScrolled'].set(true);
    component['isMobileMenuOpen'].set(true);
    fixture.detectChanges();

    const navigation = fixture.nativeElement.querySelector('.navigation');
    expect(navigation.classList.contains('scrolled')).toBe(true);
    expect(navigation.classList.contains('mobile-menu-open')).toBe(true);
  });

  it('should render mobile backdrop when menu is open', () => {
    component['isMobileMenuOpen'].set(true);
    fixture.detectChanges();

    const backdrop = fixture.nativeElement.querySelector('.mobile-backdrop');
    expect(backdrop).toBeTruthy();
  });

  it('should not render mobile backdrop when menu is closed', () => {
    component['isMobileMenuOpen'].set(false);
    fixture.detectChanges();

    const backdrop = fixture.nativeElement.querySelector('.mobile-backdrop');
    expect(backdrop).toBeFalsy();
  });
});