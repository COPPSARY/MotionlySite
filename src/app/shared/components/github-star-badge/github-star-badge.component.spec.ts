import { ApplicationRef, WritableSignal, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EXTERNAL_LINKS } from '../../constants/external-links';
import { GithubStarsService } from '../../services/github-stars.service';
import { GithubStarBadgeComponent } from './github-star-badge.component';

describe('GithubStarBadgeComponent', () => {
  let starsSignal: WritableSignal<number | null>;
  let starsService: jasmine.SpyObj<Pick<GithubStarsService, 'load'>> & {
    stars: () => number | null;
  };

  beforeEach(async () => {
    starsSignal = signal<number | null>(null);
    starsService = jasmine.createSpyObj<Pick<GithubStarsService, 'load'>>(
      'GithubStarsService',
      ['load'],
    ) as jasmine.SpyObj<Pick<GithubStarsService, 'load'>> & {
      stars: () => number | null;
    };
    starsService.stars = starsSignal.asReadonly();

    await TestBed.configureTestingModule({
      imports: [GithubStarBadgeComponent],
      providers: [{ provide: GithubStarsService, useValue: starsService }],
    }).compileComponents();
  });

  it('renders the GitHub link and fallback star count before the API responds', async () => {
    const fixture = TestBed.createComponent(GithubStarBadgeComponent);
    fixture.detectChanges();
    TestBed.inject(ApplicationRef).tick();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const anchor = compiled.querySelector<HTMLAnchorElement>('a.star-badge');
    const stars = compiled.querySelector<HTMLElement>('.star-badge__stars');

    expect(anchor?.getAttribute('href')).toBe(EXTERNAL_LINKS.github);
    expect(anchor?.getAttribute('target')).toBe('_blank');
    expect(anchor?.getAttribute('rel')).toBe('noopener noreferrer');
    expect(stars).withContext('star slot should render before the API responds').not.toBeNull();
    expect(stars?.getAttribute('aria-label')).toBe('61 GitHub stars');
    expect(compiled.querySelector('.star-badge__count')?.textContent?.trim()).toBe('61');
    expect(starsService.load).toHaveBeenCalled();
  });

  it('renders the live star count once the GitHub service has loaded it', () => {
    starsSignal.set(57);

    const fixture = TestBed.createComponent(GithubStarBadgeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const stars = compiled.querySelector<HTMLElement>('.star-badge__stars');
    const count = compiled.querySelector<HTMLElement>('.star-badge__count');

    expect(stars?.getAttribute('aria-label')).toBe('57 GitHub stars');
    expect(count?.textContent?.trim()).toBe('57');
  });
});
