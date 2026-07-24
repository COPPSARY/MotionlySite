import { TestBed } from '@angular/core/testing';
import { HeroSectionComponent } from './hero-section.component';
import { CopyInstallCommandComponent } from '../../../../shared/components/copy-install-command/copy-install-command.component';

describe('HeroSectionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionComponent],
    }).compileComponents();
  });

  it('should create the hero section', () => {
    const fixture = TestBed.createComponent(HeroSectionComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should not render hero CTA buttons', () => {
    const fixture = TestBed.createComponent(HeroSectionComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.hero__ctas')).toBeNull();
  });

  it('should highlight AI Agents in the headline', () => {
    const fixture = TestBed.createComponent(HeroSectionComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('animations with AI Agents');
    expect(compiled.querySelector('.hero__pointer-highlight')?.textContent).toContain(
      'AI Agents',
    );
  });

  it('should pass the exact install command string to CopyInstallCommandComponent', () => {
    const fixture = TestBed.createComponent(HeroSectionComponent);
    fixture.detectChanges();

    const copyInstallDebugEl = fixture.debugElement.query(
      (el) => el.componentInstance instanceof CopyInstallCommandComponent,
    );

    expect(copyInstallDebugEl).withContext('app-copy-install-command should exist').not.toBeNull();

    const copyInstallInstance = copyInstallDebugEl.componentInstance as CopyInstallCommandComponent;
    expect(copyInstallInstance.command).toBe('npx @coppsary/motionly init my-video');

    const codeEl = (copyInstallDebugEl.nativeElement as HTMLElement).querySelector('code');
    expect(codeEl?.textContent?.trim()).toBe('npx @coppsary/motionly init my-video');
  });

  it('should not render the npm downloads badge in the hero', () => {
    const fixture = TestBed.createComponent(HeroSectionComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('a.hero__npm-badge')).toBeNull();
    expect(compiled.textContent).not.toContain('/month');
    expect(compiled.textContent).not.toContain('npm downloads');
  });

  // Property 11: Product showcase fidelity
  it('should render the hero gif sourcing project-showcase.gif with descriptive alt text (Property 11)', () => {
    const fixture = TestBed.createComponent(HeroSectionComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const image = compiled.querySelector<HTMLImageElement>('img.hero__preview-image');
    expect(image).withContext('hero showcase image should exist').not.toBeNull();
    expect(image?.getAttribute('src')).toBe('project-showcase.gif');
    expect(image?.src.endsWith('project-showcase.gif'))
      .withContext(`resolved src "${image?.src}" should end with project-showcase.gif`)
      .toBe(true);
    expect(image?.alt).toContain('Motionly editing workflow');
  });

  it('should render the install command without duplicating the Product Hunt badge', () => {
    const fixture = TestBed.createComponent(HeroSectionComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-product-hunt-badge')).toBeNull();

    const copyInstallDebugEl = fixture.debugElement.query(
      (el) => el.componentInstance instanceof CopyInstallCommandComponent,
    );
    expect(copyInstallDebugEl)
      .withContext('app-copy-install-command should still exist')
      .not.toBeNull();
    expect((copyInstallDebugEl.componentInstance as CopyInstallCommandComponent).command).toBe(
      'npx @coppsary/motionly init my-video',
    );
  });
});
