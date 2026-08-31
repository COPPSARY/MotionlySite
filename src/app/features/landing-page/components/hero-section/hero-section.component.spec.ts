import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeroSectionComponent } from './hero-section.component';

describe('HeroSectionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the hero section', () => {
    const fixture = TestBed.createComponent(HeroSectionComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the product-focused prompt composer', () => {
    const fixture = TestBed.createComponent(HeroSectionComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Launch your product professionally.');
    expect(compiled.querySelector('.hero__composer')).not.toBeNull();
    expect(compiled.querySelector('textarea[placeholder*="product"]')).not.toBeNull();
    expect(compiled.querySelector('.hero__submit')).not.toBeNull();
  });
});
