import { TestBed } from '@angular/core/testing';
import { ResourcesSectionComponent } from './resources-section.component';
import { RESOURCE_LINKS } from '../../../../shared/constants/external-links';

describe('ResourcesSectionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesSectionComponent],
    }).compileComponents();
  });

  it('should render exactly one app-external-link-card per entry in RESOURCE_LINKS', () => {
    const fixture = TestBed.createComponent(ResourcesSectionComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('app-external-link-card');

    expect(cards.length).toBe(RESOURCE_LINKS.length);
  });
});
