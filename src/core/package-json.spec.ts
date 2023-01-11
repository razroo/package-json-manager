import { determineLanguagesUsed, determineLanguageWithVersionUsed } from "./package-json";

describe('determineLanguagesUsed', () => {
  it('should loop through core programming languages and return array of languages used', async() => {
    const packageJsonMap = new Map([
      ['@angular/core', {name: '@angular/core', version: '7.0.1'}],
      ['react', {name: 'react', version: '16.7.0'}],
      ['vue', {name: 'vue', version: '15.0.0'}]
    ]) as any;

    expect(await determineLanguagesUsed(packageJsonMap)).toEqual(['angular', 'react', 'vue']);
  });
});

describe('determineLanguageWithVersionUsed', () => {
    it('should loop through core programming languages and return array of languages used with version', async() => {
      const packageJsonMap = new Map([
        ['@angular/core', {name: '@angular/core', version: '7.0.1'}],
        ['react', {name: 'react', version: '16.7.0'}],
        ['vue', {name: 'vue', version: '15.0.0'}],
        ['garbage', {name: 'garbage', version: '1.2.3'}]
      ]) as any;
  
      expect(await determineLanguageWithVersionUsed(packageJsonMap)).toEqual(['angular-7.0.1', 'react-16.7.0', 'vue-15.0.0']);
    });
  });