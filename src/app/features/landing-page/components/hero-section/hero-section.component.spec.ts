import { TestBed } from '@angular/core/testing';
import { HeroSectionComponent } from './hero-section.component';
import { EXTERNAL_LINKS } from '../../../../shared/constants/external-links';
import { CopyInstallCommandComponent } from '../../../../shared/components/copy-install-command/copy-install-command.component';
import { ProductHuntBadgeComponent } from '../../../../shared/components/product-hunt-badge/product-hunt-badge.component';

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

  it('should render the secondary CTA with EXTERNAL_LINKS.editor, target="_blank" and rel="noopener noreferrer"', () => {
    const fixture = TestBed.createComponent(HeroSectionComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const secondaryCta = compiled.querySelector<HTMLAnchorElement>(
      `a[href="${EXTERNAL_LINKS.editor}"]`,
    );

    expect(secondaryCta).withContext('secondary CTA anchor should exist').not.toBeNull();
    expect(secondaryCta?.getAttribute('href')).toBe(EXTERNAL_LINKS.editor);
    expect(secondaryCta?.getAttribute('target')).toBe('_blank');
    expect(secondaryCta?.getAttribute('rel')).toBe('noopener noreferrer');
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

  // Property 11: Demo video fidelity & graceful degradation
  it('should render the hero <video> sourcing project.mp4 with muted/loop/playsinline/autoplay (Property 11)', () => {
    const fixture = TestBed.createComponent(HeroSectionComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const video = compiled.querySelector<HTMLVideoElement>('video.hero__preview-video');
    expect(video).withContext('hero <video> should exist').not.toBeNull();

    // src resolves to project.mp4 (both the declared attribute and the resolved absolute URL)
    expect(video?.getAttribute('src')).toBe('project.mp4');
    expect(video?.src.endsWith('project.mp4'))
      .withContext(`resolved src "${video?.src}" should end with project.mp4`)
      .toBe(true);

    // Required boolean attributes must be present (asserted via attribute presence,
    // since the `muted` DOM property is not reflected reliably).
    expect(video?.hasAttribute('muted')).withContext('muted attribute').toBe(true);
    expect(video?.hasAttribute('loop')).withContext('loop attribute').toBe(true);
    expect(video?.hasAttribute('playsinline')).withContext('playsinline attribute').toBe(true);
    expect(video?.hasAttribute('autoplay')).withContext('autoplay attribute').toBe(true);
  });

  it('should still render the featured Product Hunt badge alongside the existing CTAs unchanged', () => {
    const fixture = TestBed.createComponent(HeroSectionComponent);
    fixture.detectChanges();

    // Product Hunt badge present (exactly one) and configured as the featured hero badge.
    const compiled = fixture.nativeElement as HTMLElement;
    const badgeEls = compiled.querySelectorAll('app-product-hunt-badge');
    expect(badgeEls.length).withContext('exactly one Product Hunt badge in the hero').toBe(1);

    const badgeDebugEl = fixture.debugElement.query(
      (el) => el.componentInstance instanceof ProductHuntBadgeComponent,
    );
    const badgeInstance = badgeDebugEl.componentInstance as ProductHuntBadgeComponent;
    expect(badgeInstance.size).toBe('featured');

    // Existing editor CTA still present and unchanged.
    const editorCta = compiled.querySelector<HTMLAnchorElement>(
      `a[href="${EXTERNAL_LINKS.editor}"]`,
    );
    expect(editorCta).withContext('Try the Editor CTA should still exist').not.toBeNull();
    expect(editorCta?.getAttribute('target')).toBe('_blank');
    expect(editorCta?.getAttribute('rel')).toBe('noopener noreferrer');

    // Install command component still present with the exact unchanged command.
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
