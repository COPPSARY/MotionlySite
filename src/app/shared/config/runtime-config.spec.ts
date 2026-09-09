import {
  editorUrlForReturnPath,
  motionlyApiUrl,
  motionlyEditorUrl,
} from './runtime-config';

describe('Motionly runtime config', () => {
  afterEach(() => {
    delete window.__MOTIONLY_CONFIG__;
  });

  it('uses configured API and editor origins', () => {
    window.__MOTIONLY_CONFIG__ = {
      motionlyApiUrl: 'https://api.example.test/',
      motionlyEditorUrl: 'https://editor.example.test/app',
    };

    expect(motionlyApiUrl()).toBe('https://api.example.test');
    expect(motionlyEditorUrl()).toBe('https://editor.example.test/app');
  });

  it('carries Unicode prompts to the editor without changing their content', () => {
    window.__MOTIONLY_CONFIG__ = {
      motionlyEditorUrl: 'https://editor.example.test/',
    };
    const prompt = 'Create a launch — សួស្តី & crisp typography';

    const target = new URL(motionlyEditorUrl(prompt));

    expect(target.searchParams.get('prompt')).toBe(prompt);
  });

  it('rebuilds a safe editor URL after login', () => {
    window.__MOTIONLY_CONFIG__ = {
      motionlyEditorUrl: 'https://editor.example.test/',
    };

    expect(editorUrlForReturnPath('/editor?prompt=Make%20it%20move')).toBe(
      'https://editor.example.test/?prompt=Make+it+move',
    );
  });
});
