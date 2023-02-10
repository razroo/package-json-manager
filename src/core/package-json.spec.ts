import fs from 'fs';
import path from 'path';

import { determineLanguagesUsed, determineLanguagesWithVersionUsed, searchForPackageJson } from "./package-json";

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
        ['react', {name: 'react', version: '16.7.9'}],
        ['vue', {name: 'vue', version: '15.0.5'}],
        ['garbage', {name: 'garbage', version: '1.2.3'}]
      ]) as any;
  
      expect(await determineLanguagesWithVersionUsed(packageJsonMap)).toEqual(['angular-7.0.0', 'react-16.7.0', 'vue-15.0.0']);
    });
  });

jest.mock('fs');
jest.mock('path');

describe('searchForPackageJson', () => {
  it('should return the path to the package.json file', () => {
    (fs.readdirSync as jest.Mock).mockReturnValueOnce(['package.json', 'src', 'public']);
    (fs.statSync as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath === 'package.json') {
        return {
          isDirectory: jest.fn().mockReturnValue(false),
        };
      }
      return {
        isDirectory: jest.fn().mockReturnValue(true),
      };
    });
    (path.join as jest.Mock).mockImplementation((dir: string, file: string) => `${dir}/${file}`);
    (path.relative as jest.Mock).mockReturnValue('/path/to/package.json');

    expect(searchForPackageJson()).toEqual('/path/to/');
  });

  it('should return null if the package.json file is not found', () => {
    (fs.readdirSync as jest.Mock).mockReturnValueOnce(['src', 'public']);
    (fs.statSync as jest.Mock).mockReturnValue({
      isDirectory: jest.fn().mockReturnValue(true),
    });

    expect(searchForPackageJson()).toBeNull();
  });
});