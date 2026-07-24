export interface Feature {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  /** Icon identifier resolved by an icon component/pipe; not a raw URL. */
  readonly icon: string;
}

export type ResourceKind = 'docs' | 'github' | 'productHunt' | 'npm';

export interface ResourceLink {
  readonly id: ResourceKind;
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly icon: string;
}
