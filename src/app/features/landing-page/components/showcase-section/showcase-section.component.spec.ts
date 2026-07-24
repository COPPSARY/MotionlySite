import { TestBed } from '@angular/core/testing';
import { ShowcaseSectionComponent } from './showcase-section.component';

describe('ShowcaseSectionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseSectionComponent],
    }).compileComponents();
  });

  it('should render the supported agent logos without extra step cards', () => {
    const fixture = TestBed.createComponent(ShowcaseSectionComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.showcase__agent').length).toBe(4);
    expect(compiled.textContent).toContain('More providers');
    const skillLink = compiled.querySelector<HTMLAnchorElement>('.showcase__skill-link');
    expect(skillLink?.textContent).toContain('Read the skill install docs');
    expect(skillLink?.href).toContain('/agents/ai-authoring#install-the-skill');
    expect(compiled.textContent).not.toContain('npx @coppsary/motionly skills add');
    expect(compiled.querySelector('.showcase__step')).toBeNull();
    expect(compiled.querySelector('.showcase__install')).toBeNull();
  });

  it('should not render a demo video in the showcase section (no duplicate of the hero video)', () => {
    const fixture = TestBed.createComponent(ShowcaseSectionComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('video')).toBeNull();
  });

  it('should not duplicate the hero showcase gif', () => {
    const fixture = TestBed.createComponent(ShowcaseSectionComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('img[src="showcase-2.gif"]')).toBeNull();
  });
});
