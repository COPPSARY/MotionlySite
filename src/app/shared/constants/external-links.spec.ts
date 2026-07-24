import { RESOURCE_LINKS } from './external-links';
import { ResourceKind } from '../models/landing.models';

describe('RESOURCE_LINKS', () => {
  /**
   * Property 3: Resource link completeness and uniqueness
   * Validates: Requirements 6.6
   *
   * RESOURCE_LINKS is a fixed, compile-time constant, so this is checked
   * as a static assertion rather than a generative property: it must
   * contain exactly one entry per ResourceKind, with no duplicates.
   */
  it('contains exactly one entry per ResourceKind with no duplicates (Property 3)', () => {
    expect(RESOURCE_LINKS.length).toBe(4);

    const ids = RESOURCE_LINKS.map((resource) => resource.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(4);

    const expectedKinds: ResourceKind[] = ['docs', 'github', 'productHunt', 'npm'];
    for (const kind of expectedKinds) {
      const matches = ids.filter((id) => id === kind);
      expect(matches.length).withContext(`expected exactly one "${kind}" entry`).toBe(1);
    }
  });
});
