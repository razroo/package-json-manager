import { determineLanguagesUsed } from "./package-json";

describe('determineLanguagesUsed', () => {
  it('should loop through core programming languages and return array of languages used', async() => {
    const packageJsonMap = new Map([
      ['@angular/core', {name: '@angular/core', version: '7.0.1'}],
      ['react', {name: 'react', version: '16.7.0'}]
    ]) as any;

    expect(await determineLanguagesUsed(packageJsonMap)).toEqual(['angular', 'react']);
  });
});