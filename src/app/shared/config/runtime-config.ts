export interface MotionlyRuntimeConfig {
  readonly motionlyApiUrl?: string;
  readonly motionlyEditorUrl?: string;
}

declare global {
  interface Window {
    __MOTIONLY_CONFIG__?: MotionlyRuntimeConfig;
  }
}

const LOCAL_API_URL = 'http://localhost:3000';
const LOCAL_EDITOR_URL = 'http://localhost:5173/';
const PRODUCTION_EDITOR_URL = 'https://app.motionly.site/';

function isLocalBrowser(): boolean {
  return typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
}

export function motionlyApiUrl(): string {
  const configured = typeof window === 'undefined'
    ? undefined
    : window.__MOTIONLY_CONFIG__?.motionlyApiUrl;
  // Production deployments must provide MOTIONLY_API_URL through the
  // generated runtime config; never silently target an old API origin.
  return trimTrailingSlash(configured || (isLocalBrowser() ? LOCAL_API_URL : ''));
}

export function motionlyEditorUrl(prompt?: string): string {
  const configured = typeof window === 'undefined'
    ? undefined
    : window.__MOTIONLY_CONFIG__?.motionlyEditorUrl;
  const url = new URL(configured || (isLocalBrowser() ? LOCAL_EDITOR_URL : PRODUCTION_EDITOR_URL));
  const normalizedPrompt = prompt?.trim();
  if (normalizedPrompt) url.searchParams.set('prompt', normalizedPrompt);
  return url.toString();
}

export function editorUrlForReturnPath(returnUrl: string): string {
  const returnPath = new URL(returnUrl, 'https://motionly.invalid');
  return motionlyEditorUrl(returnPath.searchParams.get('prompt') ?? undefined);
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/$/, '');
}
