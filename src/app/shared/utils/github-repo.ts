export interface GithubRepoRef {
  readonly owner: string;
  readonly name: string;
}

/**
 * Parses a GitHub repository URL (e.g. "https://github.com/{owner}/{repo}")
 * into its owner/name parts. Returns `null` for malformed URLs instead of
 * throwing, so callers can degrade gracefully.
 */
export function parseGithubRepo(url: string): GithubRepoRef | null {
  try {
    const { pathname } = new URL(url);
    const [, owner, name] = pathname.split('/');
    if (!owner || !name) {
      return null;
    }
    return { owner, name };
  } catch {
    return null;
  }
}
