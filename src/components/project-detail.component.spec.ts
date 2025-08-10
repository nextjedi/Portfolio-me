import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectDetailComponent } from './project-detail.component';
import { PortfolioService } from '../services/portfolio.service';
import { SEOService } from '../services/seo.service';
import { Project } from '../models/portfolio.interface';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockPortfolioService: jasmine.SpyObj<PortfolioService>;
  let mockSeoService: jasmine.SpyObj<SEOService>;

  const mockProject: Project = {
    id: 'test-project',
    title: 'Test Project',
    description: 'A comprehensive test project description',
    longDescription: 'A detailed description of the test project',
    image: 'test-image.jpg',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/test/project',
    techStack: ['Angular', 'TypeScript', 'Material'],
    highlights: ['Feature 1', 'Feature 2', 'Feature 3'],
    metrics: {
      users: '1000+',
      performance: '95%',
      uptime: '99.9%'
    },
    technologies: ['Angular', 'TypeScript'],
    features: ['Authentication', 'Dashboard'],
    achievements: ['Award winning'],
    links: {
      github: 'https://github.com/test',
      live: 'https://test.com'
    }
  };

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['paramMap'], {
      paramMap: of(new Map([['projectSlug', 'test-project']]))
    });
    const portfolioSpy = jasmine.createSpyObj('PortfolioService', ['getProjectBySlug']);
    const seoSpy = jasmine.createSpyObj('SEOService', ['updateProjectSEO', 'addProjectStructuredData']);

    // Mock paramMap as a proper observable
    Object.defineProperty(activatedRouteSpy, 'paramMap', {
      value: of({
        get: (key: string) => key === 'projectSlug' ? 'test-project' : null
      })
    });

    await TestBed.configureTestingModule({
      imports: [ProjectDetailComponent, BrowserAnimationsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: PortfolioService, useValue: portfolioSpy },
        { provide: SEOService, useValue: seoSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockActivatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    mockPortfolioService = TestBed.inject(PortfolioService) as jasmine.SpyObj<PortfolioService>;
    mockSeoService = TestBed.inject(SEOService) as jasmine.SpyObj<SEOService>;

    mockRouter.navigate.and.returnValue(Promise.resolve(true));
    mockPortfolioService.getProjectBySlug.and.returnValue(mockProject);

    // Mock window methods
    window.open = jasmine.createSpy('open');
    window.history = { length: 2, back: jasmine.createSpy('back') } as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load project on initialization', fakeAsync(() => {
    component.ngOnInit();
    tick();

    expect(component['projectSlug']).toBe('test-project');
    expect(component['isLoading']()).toBe(true);
    
    tick(500); // Wait for setTimeout
    
    expect(component['project']()).toEqual(mockProject);
    expect(component['isLoading']()).toBe(false);
    expect(mockPortfolioService.getProjectBySlug).toHaveBeenCalledWith('test-project');
  }));

  it('should update SEO when project is found', fakeAsync(() => {
    component.ngOnInit();
    tick(500);

    expect(mockSeoService.updateProjectSEO).toHaveBeenCalledWith(mockProject);
    expect(mockSeoService.addProjectStructuredData).toHaveBeenCalledWith(mockProject);
  }));

  it('should handle project not found', fakeAsync(() => {
    mockPortfolioService.getProjectBySlug.and.returnValue(null);
    
    component.ngOnInit();
    tick(500);

    expect(component['project']()).toBeNull();
    expect(component['isLoading']()).toBe(false);
    expect(mockSeoService.updateProjectSEO).not.toHaveBeenCalled();
  }));

  it('should detect if project has metrics', () => {
    component['project'].set(mockProject);
    expect(component['hasMetrics']()).toBe(true);

    const projectWithoutMetrics = { ...mockProject };
    delete projectWithoutMetrics.metrics;
    component['project'].set(projectWithoutMetrics);
    expect(component['hasMetrics']()).toBe(false);

    component['project'].set(null);
    expect(component['hasMetrics']()).toBe(false);
  });

  it('should return metrics as array', () => {
    component['project'].set(mockProject);
    const metricsArray = component['getMetricsArray']();
    
    expect(metricsArray).toEqual([
      { key: 'users', value: '1000+' },
      { key: 'performance', value: '95%' },
      { key: 'uptime', value: '99.9%' }
    ]);
  });

  it('should return empty array when no metrics', () => {
    component['project'].set(null);
    expect(component['getMetricsArray']()).toEqual([]);
  });

  it('should handle image error by setting placeholder', () => {
    const mockImg = { src: 'original.jpg' } as HTMLImageElement;
    const mockEvent = { target: mockImg } as Event;
    
    component['onImageError'](mockEvent);
    
    expect(mockImg.src).toBe('assets/images/project-placeholder.jpg');
  });

  it('should open demo URL in new window', () => {
    component['project'].set(mockProject);
    
    component['openDemo']();
    
    expect(window.open).toHaveBeenCalledWith(
      'https://demo.example.com',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('should not open demo if URL is not available', () => {
    const projectWithoutDemo = { ...mockProject };
    delete projectWithoutDemo.demoUrl;
    component['project'].set(projectWithoutDemo);
    
    component['openDemo']();
    
    expect(window.open).not.toHaveBeenCalled();
  });

  it('should open GitHub URL in new window', () => {
    component['project'].set(mockProject);
    
    component['openGithub']();
    
    expect(window.open).toHaveBeenCalledWith(
      'https://github.com/test/project',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('should not open GitHub if URL is not available', () => {
    const projectWithoutGithub = { ...mockProject };
    delete projectWithoutGithub.githubUrl;
    component['project'].set(projectWithoutGithub);
    
    component['openGithub']();
    
    expect(window.open).not.toHaveBeenCalled();
  });

  it('should navigate to contact section', fakeAsync(() => {
    const mockContactElement = document.createElement('div');
    mockContactElement.scrollIntoView = jasmine.createSpy('scrollIntoView');
    spyOn(document, 'getElementById').and.returnValue(mockContactElement);
    
    component['contactMe']();
    tick();
    tick(100);
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    expect(mockContactElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  }));

  it('should navigate to projects section', fakeAsync(() => {
    const mockProjectsElement = document.createElement('div');
    mockProjectsElement.scrollIntoView = jasmine.createSpy('scrollIntoView');
    spyOn(document, 'getElementById').and.returnValue(mockProjectsElement);
    
    component['viewAllProjects']();
    tick();
    tick(100);
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    expect(mockProjectsElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should go back in history when available', () => {
    component['goBack']();
    
    expect(window.history.back).toHaveBeenCalled();
  });

  it('should go home when no history available', () => {
    window.history.length = 1;
    
    component['goBack']();
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should go home directly', () => {
    component['goHome']();
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should render project details when loaded', fakeAsync(() => {
    component['project'].set(mockProject);
    component['isLoading'].set(false);
    fixture.detectChanges();
    tick();

    const projectTitle = fixture.nativeElement.querySelector('.project-title');
    const projectDescription = fixture.nativeElement.querySelector('.project-description');
    
    expect(projectTitle.textContent).toContain('Test Project');
    expect(projectDescription.textContent).toContain('A comprehensive test project description');
  }));

  it('should render loading state', () => {
    component['project'].set(null);
    component['isLoading'].set(true);
    fixture.detectChanges();

    const loadingElement = fixture.nativeElement.querySelector('.detail-loading');
    const spinner = fixture.nativeElement.querySelector('.loading-spinner');
    
    expect(loadingElement).toBeTruthy();
    expect(spinner).toBeTruthy();
  });

  it('should render error state when project not found', () => {
    component['project'].set(null);
    component['isLoading'].set(false);
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.detail-error');
    const errorIcon = fixture.nativeElement.querySelector('.error-icon');
    
    expect(errorElement).toBeTruthy();
    expect(errorIcon).toBeTruthy();
  });

  it('should render demo button when demo URL exists', () => {
    component['project'].set(mockProject);
    component['isLoading'].set(false);
    fixture.detectChanges();

    const demoButton = fixture.nativeElement.querySelector('button:contains("View Live Demo")');
    expect(demoButton).toBeTruthy();
  });

  it('should render GitHub button when GitHub URL exists', () => {
    component['project'].set(mockProject);
    component['isLoading'].set(false);
    fixture.detectChanges();

    const githubButton = fixture.nativeElement.querySelector('button:contains("View Source")');
    expect(githubButton).toBeTruthy();
  });

  it('should render tech stack chips', () => {
    component['project'].set(mockProject);
    component['isLoading'].set(false);
    fixture.detectChanges();

    const techChips = fixture.nativeElement.querySelectorAll('mat-chip');
    expect(techChips.length).toBeGreaterThan(0);
  });

  it('should render highlights when available', () => {
    component['project'].set(mockProject);
    component['isLoading'].set(false);
    fixture.detectChanges();

    const highlightsList = fixture.nativeElement.querySelector('.highlights-list');
    const highlights = fixture.nativeElement.querySelectorAll('.highlights-list li');
    
    expect(highlightsList).toBeTruthy();
    expect(highlights.length).toBe(3);
  });

  it('should render metrics when available', () => {
    component['project'].set(mockProject);
    component['isLoading'].set(false);
    fixture.detectChanges();

    const metricsGrid = fixture.nativeElement.querySelector('.metrics-grid');
    const metricItems = fixture.nativeElement.querySelectorAll('.metric-item');
    
    expect(metricsGrid).toBeTruthy();
    expect(metricItems.length).toBe(3);
  });

  it('should handle route parameter changes', fakeAsync(() => {
    spyOn(component as any, 'loadProject');
    
    component.ngOnInit();
    tick();
    
    expect(component['loadProject']).toHaveBeenCalled();
  }));

  it('should be a standalone component', () => {
    expect((ProjectDetailComponent as any).ɵcmp?.standalone).toBe(true);
  });

  it('should have correct selector', () => {
    expect((ProjectDetailComponent as any).ɵcmp?.selectors[0][0]).toBe('app-project-detail');
  });
});