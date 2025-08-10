import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { PortfolioService } from '../services/portfolio.service';
import { ThemeService } from '../services/theme.service';
import { PersonalInfo, Metric } from '../models/portfolio.interface';
import { signal } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let mockPortfolioService: jasmine.SpyObj<PortfolioService>;
  let mockThemeService: jasmine.SpyObj<ThemeService>;

  const mockPersonalInfo: PersonalInfo = {
    name: 'John Doe',
    title: 'Senior Software Engineer',
    tagline: 'Building amazing digital experiences',
    email: 'john@example.com',
    location: 'San Francisco, CA',
    profileImage: 'profile.jpg',
    resumeUrl: 'https://example.com/resume.pdf',
    availability: {
      status: 'available',
      message: 'Open to new opportunities'
    }
  };

  const mockMetrics: Metric[] = [
    { id: '1', label: 'Years Experience', value: '5+', icon: 'work', description: 'Years of professional experience' },
    { id: '2', label: 'Projects Completed', value: '50+', icon: 'code', description: 'Successful projects delivered' },
    { id: '3', label: 'Happy Clients', value: '25+', icon: 'people', description: 'Satisfied clients worldwide' }
  ];

  beforeEach(async () => {
    const portfolioSpy = jasmine.createSpyObj('PortfolioService', [
      'getPersonalInfo',
      'getMetrics',
      'isLoading',
      'hasError'
    ]);
    const themeSpy = jasmine.createSpyObj('ThemeService', ['theme']);

    await TestBed.configureTestingModule({
      imports: [HeroComponent, BrowserAnimationsModule],
      providers: [
        { provide: PortfolioService, useValue: portfolioSpy },
        { provide: ThemeService, useValue: themeSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    mockPortfolioService = TestBed.inject(PortfolioService) as jasmine.SpyObj<PortfolioService>;
    mockThemeService = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;

    // Setup default mocks
    mockPortfolioService.getPersonalInfo.and.returnValue(mockPersonalInfo);
    mockPortfolioService.getMetrics.and.returnValue(mockMetrics);
    mockPortfolioService.isLoading.and.returnValue(false);
    mockPortfolioService.hasError.and.returnValue(null);

    // Mock window.open
    window.open = jasmine.createSpy('open');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with data from portfolio service', () => {
    component.ngOnInit();
    
    expect(component['personalInfo']()).toEqual(mockPersonalInfo);
    expect(component['metrics']()).toEqual(mockMetrics);
  });

  it('should handle loading state', () => {
    mockPortfolioService.isLoading.and.returnValue(true);
    mockPortfolioService.getPersonalInfo.and.returnValue(null);
    mockPortfolioService.getMetrics.and.returnValue([]);
    
    component.ngOnInit();
    fixture.detectChanges();

    const loadingElement = fixture.nativeElement.querySelector('.hero-loading');
    expect(loadingElement).toBeTruthy();
  });

  it('should handle error state', () => {
    mockPortfolioService.hasError.and.returnValue('Error loading data');
    mockPortfolioService.getPersonalInfo.and.returnValue(null);
    mockPortfolioService.getMetrics.and.returnValue([]);
    
    component.ngOnInit();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.hero-error');
    expect(errorElement).toBeTruthy();
  });

  it('should get availability class based on status', () => {
    component['personalInfo'].set(mockPersonalInfo);
    expect(component['getAvailabilityClass']()).toBe('available');

    const unavailableInfo = { ...mockPersonalInfo, availability: { status: 'busy', message: 'Currently unavailable' } };
    component['personalInfo'].set(unavailableInfo as PersonalInfo);
    expect(component['getAvailabilityClass']()).toBe('busy');
  });

  it('should scroll to section when method called', () => {
    const mockElement = document.createElement('div');
    mockElement.scrollIntoView = jasmine.createSpy('scrollIntoView');
    spyOn(document, 'getElementById').and.returnValue(mockElement);
    
    component['scrollToSection']('projects');
    
    expect(document.getElementById).toHaveBeenCalledWith('projects');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ 
      behavior: 'smooth',
      block: 'start'
    });
  });

  it('should handle section not found gracefully', () => {
    spyOn(document, 'getElementById').and.returnValue(null);
    spyOn(console, 'warn');
    
    component['scrollToSection']('nonexistent');
    
    expect(console.warn).toHaveBeenCalledWith('Section not found: nonexistent');
  });

  it('should download resume when method called', () => {
    component['personalInfo'].set(mockPersonalInfo);
    
    component['downloadResume']();
    
    expect(window.open).toHaveBeenCalledWith(
      'https://example.com/resume.pdf',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('should handle image error by setting placeholder', () => {
    const mockImg = { src: 'original.jpg' } as HTMLImageElement;
    const mockEvent = { target: mockImg } as Event;
    
    component['onImageError'](mockEvent);
    
    expect(mockImg.src).toBe('/assets/images/profile-placeholder.jpg');
  });

  it('should render hero content when data is loaded', () => {
    component['personalInfo'].set(mockPersonalInfo);
    component['metrics'].set(mockMetrics);
    fixture.detectChanges();

    const heroTitle = fixture.nativeElement.querySelector('.hero-title');
    const heroSubtitle = fixture.nativeElement.querySelector('.hero-subtitle');
    const heroTagline = fixture.nativeElement.querySelector('.hero-tagline');

    expect(heroTitle.textContent).toContain('John Doe');
    expect(heroSubtitle.textContent).toContain('Senior Software Engineer');
    expect(heroTagline.textContent).toContain('Building amazing digital experiences');
  });

  it('should render availability status', () => {
    component['personalInfo'].set(mockPersonalInfo);
    component['metrics'].set(mockMetrics);
    fixture.detectChanges();

    const availabilityChip = fixture.nativeElement.querySelector('mat-chip');
    expect(availabilityChip.textContent.trim()).toContain('Open to new opportunities');
  });

  it('should render metrics cards', () => {
    component['personalInfo'].set(mockPersonalInfo);
    component['metrics'].set(mockMetrics);
    fixture.detectChanges();

    const metricCards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(metricCards.length).toBe(3);

    const firstMetricValue = metricCards[0].querySelector('.metric-value');
    const firstMetricLabel = metricCards[0].querySelector('.metric-label');
    
    expect(firstMetricValue.textContent).toContain('5+');
    expect(firstMetricLabel.textContent).toContain('Years Experience');
  });

  it('should render CTA buttons', () => {
    component['personalInfo'].set(mockPersonalInfo);
    component['metrics'].set(mockMetrics);
    fixture.detectChanges();

    const ctaButtons = fixture.nativeElement.querySelectorAll('.cta-group button');
    expect(ctaButtons.length).toBe(3);
    
    expect(ctaButtons[0].textContent.trim()).toBe('View My Work');
    expect(ctaButtons[1].textContent.trim()).toBe("Let's Talk");
    expect(ctaButtons[2].textContent.trim()).toBe('Download Resume');
  });

  it('should render profile image', () => {
    component['personalInfo'].set(mockPersonalInfo);
    component['metrics'].set(mockMetrics);
    fixture.detectChanges();

    const profileImage = fixture.nativeElement.querySelector('.profile-image img');
    expect(profileImage).toBeTruthy();
    expect(profileImage.src).toContain('profile.jpg');
    expect(profileImage.alt).toContain('John Doe - Senior Software Engineer');
  });

  it('should handle button clicks', () => {
    spyOn(component as any, 'scrollToSection');
    spyOn(component as any, 'downloadResume');
    
    component['personalInfo'].set(mockPersonalInfo);
    component['metrics'].set(mockMetrics);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('.cta-group button');
    
    buttons[0].click(); // View My Work
    expect(component['scrollToSection']).toHaveBeenCalledWith('projects');
    
    buttons[1].click(); // Let's Talk
    expect(component['scrollToSection']).toHaveBeenCalledWith('contact');
    
    buttons[2].click(); // Download Resume
    expect(component['downloadResume']).toHaveBeenCalled();
  });

  it('should be a standalone component', () => {
    expect((HeroComponent as any).ɵcmp?.standalone).toBe(true);
  });

  it('should have app-hero selector', () => {
    expect((HeroComponent as any).ɵcmp?.selectors[0][0]).toBe('app-hero');
  });

  it('should implement OnInit interface', () => {
    expect(component.ngOnInit).toBeDefined();
    expect(typeof component.ngOnInit).toBe('function');
  });

  it('should have computed properties for reactive data', () => {
    expect(component['personalInfo']).toBeDefined();
    expect(component['metrics']).toBeDefined();
    expect(typeof component['personalInfo']).toBe('function');
    expect(typeof component['metrics']).toBe('function');
  });

  it('should handle missing personal info gracefully', () => {
    component['personalInfo'].set(null);
    
    expect(component['getAvailabilityClass']()).toBe('');
    expect(() => component['downloadResume']()).not.toThrow();
  });

  it('should apply correct availability class styling', () => {
    component['personalInfo'].set(mockPersonalInfo);
    component['metrics'].set(mockMetrics);
    fixture.detectChanges();

    const availabilityChip = fixture.nativeElement.querySelector('mat-chip');
    expect(availabilityChip.classList.contains('available')).toBe(true);
  });

  it('should handle empty metrics array', () => {
    component['personalInfo'].set(mockPersonalInfo);
    component['metrics'].set([]);
    fixture.detectChanges();

    const metricCards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(metricCards.length).toBe(0);
  });
});