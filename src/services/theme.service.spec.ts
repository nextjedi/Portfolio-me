import { TestBed } from '@angular/core/testing';
import { ThemeService, ColorScheme, TypographyMode, LayoutMode } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let originalMatchMedia: any;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    
    window.matchMedia = jasmine.createSpy('matchMedia').and.returnValue({
      matches: false,
      media: '',
      onchange: null,
      addListener: jasmine.createSpy('addListener'),
      removeListener: jasmine.createSpy('removeListener'),
      addEventListener: jasmine.createSpy('addEventListener'),
      removeEventListener: jasmine.createSpy('removeEventListener'),
      dispatchEvent: jasmine.createSpy('dispatchEvent'),
    });

    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      writable: true
    });

    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default theme', () => {
    const theme = service.theme();
    expect(theme).toBeTruthy();
    expect(theme?.colors.primary).toBe('#1a472a');
    expect(service.currentColorScheme()).toBe('enterprise');
    expect(service.currentTypographyMode()).toBe('standard');
    expect(service.currentLayoutMode()).toBe('standard');
  });

  it('should set color scheme', () => {
    service.setColorScheme('techBlue');
    expect(service.currentColorScheme()).toBe('techBlue');
    expect(service.theme()?.colors.primary).toBe('#2563eb');
  });

  it('should set typography mode', () => {
    service.setTypographyMode('large');
    expect(service.currentTypographyMode()).toBe('large');
    expect(service.theme()?.typography.heroTitle).toBe('64px');
  });

  it('should set layout mode', () => {
    service.setLayoutMode('spacious');
    expect(service.currentLayoutMode()).toBe('spacious');
    expect(service.theme()?.spacing.sectionPadding).toBe('120px');
  });

  it('should detect dark color scheme preference', () => {
    window.matchMedia = jasmine.createSpy('matchMedia').and.callFake(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: jasmine.createSpy('addListener'),
      removeListener: jasmine.createSpy('removeListener'),
      addEventListener: jasmine.createSpy('addEventListener'),
      removeEventListener: jasmine.createSpy('removeEventListener'),
      dispatchEvent: jasmine.createSpy('dispatchEvent'),
    }));

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
    service = TestBed.inject(ThemeService);

    expect(service.currentColorScheme()).toBe('executive');
  });

  it('should detect mobile device', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      writable: true
    });

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
    service = TestBed.inject(ThemeService);

    expect(service.currentLayoutMode()).toBe('mobile');
  });

  describe('Color Schemes', () => {
    it('should apply enterprise color scheme', () => {
      service.setColorScheme('enterprise');
      const theme = service.theme();
      expect(theme?.colors.primary).toBe('#1a472a');
      expect(theme?.colors.accent).toBe('#e74c3c');
    });

    it('should apply techBlue color scheme', () => {
      service.setColorScheme('techBlue');
      const theme = service.theme();
      expect(theme?.colors.primary).toBe('#2563eb');
      expect(theme?.colors.accent).toBe('#f59e0b');
    });

    it('should apply creative color scheme', () => {
      service.setColorScheme('creative');
      const theme = service.theme();
      expect(theme?.colors.primary).toBe('#6366f1');
      expect(theme?.colors.accent).toBe('#f59e0b');
    });

    it('should apply executive color scheme', () => {
      service.setColorScheme('executive');
      const theme = service.theme();
      expect(theme?.colors.primary).toBe('#1f2937');
      expect(theme?.colors.accent).toBe('#3b82f6');
    });
  });

  describe('Typography Modes', () => {
    it('should apply compact typography', () => {
      service.setTypographyMode('compact');
      const theme = service.theme();
      expect(theme?.typography.heroTitle).toBe('48px');
      expect(theme?.typography.body).toBe('14px');
    });

    it('should apply standard typography', () => {
      service.setTypographyMode('standard');
      const theme = service.theme();
      expect(theme?.typography.heroTitle).toBe('52px');
      expect(theme?.typography.body).toBe('16px');
    });

    it('should apply large typography', () => {
      service.setTypographyMode('large');
      const theme = service.theme();
      expect(theme?.typography.heroTitle).toBe('64px');
      expect(theme?.typography.body).toBe('20px');
    });

    it('should apply display typography', () => {
      service.setTypographyMode('display');
      const theme = service.theme();
      expect(theme?.typography.heroTitle).toBe('72px');
      expect(theme?.typography.body).toBe('22px');
    });
  });

  describe('Layout Modes', () => {
    it('should apply compact layout', () => {
      service.setLayoutMode('compact');
      const theme = service.theme();
      expect(theme?.spacing.sectionPadding).toBe('60px');
      expect(theme?.spacing.cardPadding).toBe('20px');
    });

    it('should apply standard layout', () => {
      service.setLayoutMode('standard');
      const theme = service.theme();
      expect(theme?.spacing.sectionPadding).toBe('80px');
      expect(theme?.spacing.cardPadding).toBe('30px');
    });

    it('should apply spacious layout', () => {
      service.setLayoutMode('spacious');
      const theme = service.theme();
      expect(theme?.spacing.sectionPadding).toBe('120px');
      expect(theme?.spacing.cardPadding).toBe('40px');
    });

    it('should apply mobile layout', () => {
      service.setLayoutMode('mobile');
      const theme = service.theme();
      expect(theme?.spacing.sectionPadding).toBe('40px');
      expect(theme?.spacing.cardPadding).toBe('20px');
    });
  });

  describe('Industry Themes', () => {
    it('should apply finance industry theme', () => {
      service.applyIndustryTheme('finance');
      expect(service.currentColorScheme()).toBe('executive');
      expect(service.currentTypographyMode()).toBe('compact');
      expect(service.currentLayoutMode()).toBe('standard');
    });

    it('should apply startup industry theme', () => {
      service.applyIndustryTheme('startup');
      expect(service.currentColorScheme()).toBe('creative');
      expect(service.currentTypographyMode()).toBe('large');
      expect(service.currentLayoutMode()).toBe('spacious');
    });

    it('should apply enterprise industry theme', () => {
      service.applyIndustryTheme('enterprise');
      expect(service.currentColorScheme()).toBe('enterprise');
      expect(service.currentTypographyMode()).toBe('standard');
      expect(service.currentLayoutMode()).toBe('standard');
    });

    it('should apply consulting industry theme', () => {
      service.applyIndustryTheme('consulting');
      expect(service.currentColorScheme()).toBe('techBlue');
      expect(service.currentTypographyMode()).toBe('standard');
      expect(service.currentLayoutMode()).toBe('spacious');
    });
  });

  it('should reset theme to defaults', () => {
    service.setColorScheme('creative');
    service.setTypographyMode('large');
    service.setLayoutMode('spacious');

    service.resetTheme();

    expect(service.currentColorScheme()).toBe('enterprise');
    expect(service.currentTypographyMode()).toBe('standard');
    expect(service.currentLayoutMode()).toBe('standard');
  });

  it('should apply theme to document', () => {
    const mockSetProperty = jasmine.createSpy('setProperty');
    const mockDocumentElement = {
      style: {
        setProperty: mockSetProperty
      }
    };
    
    Object.defineProperty(document, 'documentElement', {
      value: mockDocumentElement,
      writable: true
    });

    service.setColorScheme('techBlue');

    expect(mockSetProperty).toHaveBeenCalledWith('--color-primary', '#2563eb');
    expect(mockSetProperty).toHaveBeenCalledWith('--color-accent', '#f59e0b');
    expect(mockSetProperty).toHaveBeenCalledWith('--font-primary', "Inter, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif");
  });

  it('should have consistent font definitions', () => {
    const theme = service.theme();
    expect(theme?.fonts.primary).toBe("Inter, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif");
    expect(theme?.fonts.heading).toBe("Inter Tight, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif");
  });

  it('should maintain theme reactivity', () => {
    service.setColorScheme('creative');
    service.setTypographyMode('large');
    service.setLayoutMode('spacious');

    expect(service.theme()?.colors.primary).toBe('#6366f1');
    expect(service.theme()?.typography.heroTitle).toBe('64px');
    expect(service.theme()?.spacing.sectionPadding).toBe('120px');
  });
});