import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PortfolioData } from '../models/portfolio.interface';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private portfolioData = signal<PortfolioData | null>(null);
  private loading = signal<boolean>(false);
  private error = signal<string | null>(null);

  constructor(private http: HttpClient) {
    this.loadPortfolioData();
  }

  get data() {
    return this.portfolioData.asReadonly();
  }

  get isLoading() {
    return this.loading.asReadonly();
  }

  get hasError() {
    return this.error.asReadonly();
  }

  private loadPortfolioData(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<PortfolioData>('/data/portfolio.json').pipe(
      map(data => {
        this.portfolioData.set(data);
        this.loading.set(false);
        return data;
      }),
      catchError(error => {
        console.error('Failed to load portfolio data:', error);
        this.error.set('Failed to load portfolio data');
        this.loading.set(false);
        return of(null);
      })
    ).subscribe();
  }

  getPersonalInfo() {
    return this.portfolioData()?.personal || null;
  }

  getMetrics() {
    return this.portfolioData()?.metrics || [];
  }

  getStory() {
    return this.portfolioData()?.story || null;
  }

  getProjects() {
    return this.portfolioData()?.projects || [];
  }

  getFeaturedProjects(limit: number = 3) {
    return this.getProjects().slice(0, limit);
  }

  getProjectById(id: string) {
    return this.getProjects().find(project => project.id === id) || null;
  }

  getSkills() {
    return this.portfolioData()?.skills || null;
  }

  getContact() {
    return this.portfolioData()?.contact || null;
  }

  getNavigation() {
    return this.portfolioData()?.navigation || [];
  }

  getBlog() {
    return this.portfolioData()?.blog || null;
  }

  getSEO() {
    return this.portfolioData()?.seo || null;
  }

  getTheme() {
    return this.portfolioData()?.theme || null;
  }

  refreshData(): Observable<PortfolioData | null> {
    this.loadPortfolioData();
    return of(this.portfolioData());
  }

  // Utility method to generate URL-friendly slugs from project titles
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim() // Remove leading/trailing spaces
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }

  // Get project by URL slug
  getProjectBySlug(slug: string) {
    const projects = this.getProjects();
    return projects.find(project => {
      const projectSlug = this.generateSlug(project.title);
      return projectSlug === slug;
    }) || null;
  }

  // Get all projects with their generated slugs
  getProjectsWithSlugs() {
    return this.getProjects().map(project => ({
      ...project,
      slug: this.generateSlug(project.title)
    }));
  }
}