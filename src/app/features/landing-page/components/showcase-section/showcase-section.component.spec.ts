import { TestBed } from '@angular/core/testing';
import { ShowcaseSectionComponent } from './showcase-section.component';
import { EXTERNAL_LINKS } from '../../../../shared/constants/external-links';

describe('ShowcaseSectionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseSectionComponent],
    }).compileComponents();
  });

  it('should render the CTA anchor with EXTERNAL_LINKS.editor, target="_blank" and rel="noopener noreferrer"', () => {
    const fixture = TestBed.createComponent(ShowcaseSectionComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const cta = compiled.querySelector('a.btn--primary') as HTMLAnchorElement;

    expect(cta).not.toBeNull();
    expect(cta.getAttribute('href')).toBe(EXTERNAL_LINKS.editor);
    expect(cta.getAttribute('target')).toBe('_blank');
    expect(cta.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should render exactly one step per entry in the steps data source', () => {
    const fixture = TestBed.createComponent(ShowcaseSectionComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const steps = compiled.querySelectorAll('.showcase__step');

    expect(steps.length).toBe(fixture.componentInstance.steps.length);
  });

  it('should not render a demo video in the showcase section (no duplicate of the hero video)', () => {
    const fixture = TestBed.createComponent(ShowcaseSectionComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('video')).toBeNull();
  });
});
