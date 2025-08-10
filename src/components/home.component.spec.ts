import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SEOService } from '../services/seo.service';
import { PortfolioService } from '../services/portfolio.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let seoService: jasmine.SpyObj<SEOService>;
  let portfolioService: jasmine.SpyObj<PortfolioService>;

  beforeEach(async () => {
    const seoSpy = jasmine.createSpyObj('SEOService', ['updateSEO', 'addPersonStructuredData']);
    const portfolioSpy = jasmine.createSpyObj('PortfolioService', ['data']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule],
      providers: [
        { provide: SEOService, useValue: seoSpy },
        { provide: PortfolioService, useValue: portfolioSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    seoService = TestBed.inject(SEOService) as jasmine.SpyObj<SEOService>;
    portfolioService = TestBed.inject(PortfolioService) as jasmine.SpyObj<PortfolioService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call SEO service on initialization', () => {
    component.ngOnInit();
    
    expect(seoService.updateSEO).toHaveBeenCalledWith({
      title: 'Arunabh Priyadarshi - Senior Software Engineer & Technical Leader',
      description: 'Senior Software Engineer specializing in enterprise solutions, AI integration, and blockchain. Built systems serving 2,500+ users with $M+ revenue impact.',
      keywords: 'senior software engineer, technical leader, enterprise architecture, AI integration, blockchain, remote work, full stack developer, competitive programming',
      canonicalUrl: 'https://arunabh.me/'
    });

    expect(seoService.addPersonStructuredData).toHaveBeenCalled();
  });

  it('should render all section components in template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('app-hero')).toBeTruthy();
    expect(compiled.querySelector('app-story')).toBeTruthy();
    expect(compiled.querySelector('app-achievements')).toBeTruthy();
    expect(compiled.querySelector('app-projects')).toBeTruthy();
    expect(compiled.querySelector('app-blog')).toBeTruthy();
    expect(compiled.querySelector('app-contact')).toBeTruthy();
  });

  it('should have hero section with correct id', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const heroSection = compiled.querySelector('app-hero');
    
    expect(heroSection?.getAttribute('id')).toBe('hero');
  });

  it('should have main content wrapper with correct class', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const mainContent = compiled.querySelector('main');
    
    expect(mainContent?.classList.contains('main-content')).toBe(true);
  });

  it('should contain all imported components in imports array', () => {
    const imports = (HomeComponent as any).ɵcmp?.imports || [];
    const importNames = imports.map((imp: any) => imp.name || imp.ɵcmp?.exportAs);
    
    expect(imports.length).toBeGreaterThan(0);
  });

  it('should be a standalone component', () => {
    expect((HomeComponent as any).ɵcmp?.standalone).toBe(true);
  });

  it('should have app-home selector', () => {
    expect((HomeComponent as any).ɵcmp?.selectors[0][0]).toBe('app-home');
  });

  it('should have proper component metadata', () => {
    const componentMetadata = (HomeComponent as any).ɵcmp;
    
    expect(componentMetadata.standalone).toBe(true);
    expect(componentMetadata.type).toBe(HomeComponent);
  });

  it('should implement OnInit interface', () => {
    expect(component.ngOnInit).toBeDefined();
    expect(typeof component.ngOnInit).toBe('function');
  });

  it('should inject SEOService correctly', () => {
    expect(component['seoService']).toBeTruthy();
    expect(component['seoService']).toBe(seoService);
  });

  it('should handle SEO service errors gracefully', () => {
    seoService.updateSEO.and.throwError('SEO error');
    
    expect(() => component.ngOnInit()).not.toThrow();
  });

  it('should call SEO methods in correct order', () => {
    let callOrder: string[] = [];
    
    seoService.updateSEO.and.callFake(() => {
      callOrder.push('updateSEO');
    });
    
    seoService.addPersonStructuredData.and.callFake(() => {
      callOrder.push('addPersonStructuredData');
    });
    
    component.ngOnInit();
    
    expect(callOrder).toEqual(['updateSEO', 'addPersonStructuredData']);
  });

  it('should have consistent SEO data structure', () => {
    component.ngOnInit();
    
    const seoCall = seoService.updateSEO.calls.mostRecent();
    const seoData = seoCall.args[0];
    
    expect(seoData.title).toContain('Arunabh Priyadarshi');
    expect(seoData.title).toContain('Senior Software Engineer');
    expect(seoData.description).toContain('enterprise solutions');
    expect(seoData.keywords).toContain('senior software engineer');
    expect(seoData.canonicalUrl).toBe('https://arunabh.me/');
  });
});