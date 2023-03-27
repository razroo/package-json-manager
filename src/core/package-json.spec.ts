import fs from 'fs';
import path from 'path';
import os from 'os';

import { determineLanguagesUsed, determineLanguagesWithVersionUsed, getAllDependencies, searchForPackageJson, PackageJson } from "./package-json";

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

describe('getAllDependencies', () => {
  test('returns the union of all dependencies in the provided package.json', () => {
    // Arrange
    const pkg: PackageJson = {
      name: 'test',
      version: '123',
      dependencies: {
        react: '^16.0.0',
        'react-dom': '^16.0.0',
      },
      devDependencies: {
        '@types/react': '^16.0.0',
        '@types/react-dom': '^16.0.0',
        jest: '^26.6.0',
      },
      peerDependencies: {
        lodash: '^4.0.0',
      },
      optionalDependencies: {
        'my-optional-dependency': '^1.0.0',
      },
    };
    const result = getAllDependencies(pkg);
    const expected = new Set([["react", "^16.0.0"], ["react-dom", "^16.0.0"], ["@types/react", "^16.0.0"], ["@types/react-dom", "^16.0.0"], ["jest", "^26.6.0"], ["lodash", "^4.0.0"], ["my-optional-dependency", "^1.0.0"]])
    expect(result).toEqual(expected);
  });
});

describe('determineLanguagesWithVersionUsed', () => {
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

describe('searchForPackageJson', () => {
  let tmpDir;
  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'my-tmp-dir-'));
  });
  afterEach(() => {
    fs.rmdirSync(tmpDir, { recursive: true });
  });

  it('should return the path to the package.json file if it exists', () => {
    fs.writeFileSync(path.join(tmpDir, 'package.json'), '{}');
    const result = searchForPackageJson(tmpDir);
    expect(result).toEqual(tmpDir);
  });

  it('should return null if the package.json file is not found', () => {
    const result = searchForPackageJson(tmpDir);
    expect(result).toBeNull();
  });
}); 
